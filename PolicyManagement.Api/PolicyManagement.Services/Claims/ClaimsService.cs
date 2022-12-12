using AutoMapper;
using PolicyManagement.Dtos.Claims;
using PolicyManagement.Dtos.Common;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.Claims;
using PolicyManagement.Services.Base;
using PolicyManagement.Services.Claims.Interface;
using PolicyManagement.Utilities.Constants;
using PolicyManagement.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace PolicyManagement.Services.Claims
{
    public class ClaimsService : BaseService, IClaimsService
    {
        public ClaimsService(DataContext dataContext,
                             IMapper mapper) : base(dataContext, mapper) { }

        public async Task<CommonDto<string>> AddClaims(AddUpdateClaimsModel model)
        {
            tblClaimData claims = new tblClaimData
            {
                PolicyId = model.PolicyId,
                VerticalId = model.VerticalId,
                ClaimEntryBranchId = model.BranchId,
                PatientName = model.PatientName,

                AccidentDetails = model.AccidentDateTimePlace,
                PendngConcerns = model.PendingConcerns,
                VisibleDamage = model.VisibleDamages,
                ServiceAdvisorName = model.ServiceAdvisorName,
                ServiceAdvisorNo = model.ServiceAdvisorNumber,
                SurveyorEmail = model.SurveyorEmail,
                SurveyorName = model.SurveyorName,
                SurveyorNo = model.SurveyorNumber,
                WorkshopName = model.WorkshopName,
                WorkshopNo = model.WorkshopNumber,

                NatureofClaim = model.ClaimNature,


                ContactPerson = model.ContactPerson,
                ContactPersonNo = model.ContactNumber,
                ClaimNo = model.ClaimNumber,
                ClaimTypeId = model.ClaimTypeId,
                ClaimSubmittedBy = model.ClaimSubmittedBy,
                ClaimReason = model.VerticalId > 2 ? model.PersonLocation : model.ClaimReason,
                HospitalName = model.HospitalName,
                ClaimAmtSubmitted = model.AmountClaimed,
                ClaimAmtApproved = model.AmountApproved,
                ClaimRemarkbyCompany = model.InsuranceCompanyRemark,
                ClaimStatusId = model.ClaimStatusId,
                ClaimSubStatusId = model.ClaimSubStatusId,
                FollowupReason = model.FollowingReason,
                FinalRemark = model.Remark,
                ClaimEntryDate = DateTime.Now,
                CreatedBy = model.LoginUserId,
                CreatedDatetime = DateTime.Now
            };

            if (model.VerticalId <= 2 && !string.IsNullOrEmpty(model.AdmissionDate))
                claims.DateOfAdmission = DateTime.ParseExact(model.AdmissionDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            if (model.VerticalId > 2 && !string.IsNullOrEmpty(model.DateOfIncident))
                claims.DateOfAdmission = DateTime.ParseExact(model.DateOfIncident, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            if (!string.IsNullOrEmpty(model.DischargeDate))
                claims.DateOfDischarge = DateTime.ParseExact(model.DischargeDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            if (!string.IsNullOrEmpty(model.DocumentSubmissionDate))
                claims.DocumentSubmitDate = DateTime.ParseExact(model.DocumentSubmissionDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            if (!string.IsNullOrEmpty(model.FollowUpDate))
                claims.FollowupDate = DateTime.ParseExact(model.FollowUpDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            if (!string.IsNullOrEmpty(model.ClaimRegistrationDate))
                claims.ClaimSubmissionDate = DateTime.ParseExact(model.ClaimRegistrationDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            _dataContext.tblClaimData.Add(claims);
            await _dataContext.SaveChangesAsync();

            if (model.ClaimStatusId == (int)ClaimsStatus.FollowUp)
            {
                _dataContext.tblClaimFollowupDetails.Add(new tblClaimFollowupDetails
                {
                    ClaimId = claims.ClaimId,
                    FollowupDate = DateTime.ParseExact(model.FollowUpDate, "MM/dd/yyyy", CultureInfo.InvariantCulture),
                    FollowupReason = model.FollowingReason
                });
                await _dataContext.SaveChangesAsync();
            }

            await AddClaimsDocuments(model.ClaimsDocuments, claims.ClaimId, model.PolicyId, model.CustomerId, model.LoginUserId);

            return new CommonDto<string>
            {
                IsSuccess = true,
                Message = "Claims created successfully."
            };
        }

        public async Task<CommonDto<string>> UpdateClaims(int claimsId, AddUpdateClaimsModel model)
        {
            tblClaimData claimsDetail = await _dataContext.tblClaimData.FirstOrDefaultAsync(f => f.ClaimId == claimsId);

            if (claimsDetail == null)
                return new CommonDto<string>
                {
                    Message = $"Invalid Claims Id."
                };

            if (model.VerticalId == (int)Vertical.Motor)
            {
                claimsDetail.AccidentDetails = model.AccidentDateTimePlace;
                claimsDetail.PendngConcerns = model.PendingConcerns;
                claimsDetail.VisibleDamage = model.VisibleDamages;
                claimsDetail.ServiceAdvisorName = model.ServiceAdvisorName;
                claimsDetail.ServiceAdvisorNo = model.ServiceAdvisorNumber;
                claimsDetail.SurveyorEmail = model.SurveyorEmail;
                claimsDetail.SurveyorName = model.SurveyorName;
                claimsDetail.SurveyorNo = model.SurveyorNumber;
                claimsDetail.WorkshopName = model.WorkshopName;
                claimsDetail.WorkshopNo = model.WorkshopNumber;
            }

            if (model.VerticalId == (int)Vertical.Health)
            {
                claimsDetail.PatientName = model.PatientName;
                claimsDetail.ClaimReason = model.ClaimReason;
                claimsDetail.HospitalName = model.HospitalName;

                if (!string.IsNullOrEmpty(model.AdmissionDate))
                    claimsDetail.DateOfAdmission = DateTime.ParseExact(model.AdmissionDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);

                if (!string.IsNullOrEmpty(model.DischargeDate))
                    claimsDetail.DateOfDischarge = DateTime.ParseExact(model.DischargeDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);

                if (!string.IsNullOrEmpty(model.DocumentSubmissionDate))
                    claimsDetail.DocumentSubmitDate = DateTime.ParseExact(model.DocumentSubmissionDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);
            }

            if (model.VerticalId > 2)
            {
                claimsDetail.NatureofClaim = model.ClaimNature;
                claimsDetail.ClaimReason = model.PersonLocation;

                if (!string.IsNullOrEmpty(model.DateOfIncident))
                    claimsDetail.DateOfAdmission = DateTime.ParseExact(model.DateOfIncident, "MM/dd/yyyy", CultureInfo.InvariantCulture);

                if (!string.IsNullOrEmpty(model.DocumentSubmissionDate))
                    claimsDetail.DocumentSubmitDate = DateTime.ParseExact(model.DocumentSubmissionDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);
            }

            claimsDetail.ContactPerson = model.ContactPerson;
            claimsDetail.ContactPersonNo = model.ContactNumber;
            claimsDetail.ClaimNo = model.ClaimNumber;
            claimsDetail.ClaimTypeId = model.ClaimTypeId;
            claimsDetail.ClaimSubmittedBy = model.ClaimSubmittedBy;
            claimsDetail.ClaimAmtSubmitted = model.AmountClaimed;
            claimsDetail.ClaimAmtApproved = model.AmountApproved;
            claimsDetail.ClaimRemarkbyCompany = model.InsuranceCompanyRemark;
            claimsDetail.ClaimStatusId = model.ClaimStatusId;
            claimsDetail.ClaimSubStatusId = model.ClaimSubStatusId;
            claimsDetail.FollowupReason = model.FollowingReason;
            claimsDetail.FinalRemark = model.Remark;
            claimsDetail.ModifiedBy = model.LoginUserId;
            claimsDetail.ModifiedDatetime = DateTime.Now;

            if (!string.IsNullOrEmpty(model.FollowUpDate))
                claimsDetail.FollowupDate = DateTime.ParseExact(model.FollowUpDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            if (!string.IsNullOrEmpty(model.ClaimRegistrationDate))
                claimsDetail.ClaimSubmissionDate = DateTime.ParseExact(model.ClaimRegistrationDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            await _dataContext.SaveChangesAsync();

            if (model.ClaimStatusId == (int)ClaimsStatus.FollowUp)
            {
                _dataContext.tblClaimFollowupDetails.Add(new tblClaimFollowupDetails
                {
                    ClaimId = claimsId,
                    FollowupDate = DateTime.ParseExact(model.FollowUpDate, "MM/dd/yyyy", CultureInfo.InvariantCulture),
                    FollowupReason = model.FollowingReason
                });
                await _dataContext.SaveChangesAsync();
            }

            await AddClaimsDocuments(model.ClaimsDocuments, claimsId, model.PolicyId, model.CustomerId, model.LoginUserId);

            return new CommonDto<string>
            {
                IsSuccess = true,
                Message = "Claims updated successfully."
            };
        }

        public async Task<List<SearchClaimsDto>> SearchClaims(SearchClaimsModel model)
        {
            if (!string.IsNullOrEmpty(model.CustomerName)
                || !string.IsNullOrEmpty(model.ControlNumber)
                || !string.IsNullOrEmpty(model.MobileNumber)
                || (model.PosId.HasValue && model.PosId.Value > 0)
                || (model.InsuranceCompanyId.HasValue && model.InsuranceCompanyId.Value > 0)
                || !string.IsNullOrEmpty(model.PolicyNumber)
                || !string.IsNullOrEmpty(model.ClaimsNumber)
                || model.IsShowAll
                || (!string.IsNullOrEmpty(model.ClaimsEntryFromDate) && !string.IsNullOrEmpty(model.ClaimsEntryToDate)))
            {
                IQueryable<SearchClaims> query = _dataContext.SearchClaims.AsQueryable();

                if (!model.IsShowAll)
                {
                    if (!string.IsNullOrEmpty(model.CustomerName))
                        query = query.Where(w => w.CustomerName.ToLower().StartsWith(model.CustomerName.ToLower()));

                    if (!string.IsNullOrEmpty(model.ControlNumber))
                    {
                        if (int.TryParse(model.ControlNumber, out int number))
                            query = query.Where(w => w.ControlNumberDigit == number);
                        else
                            query = query.Where(w => w.ControlNumber.Equals(model.ControlNumber));
                    }

                    if (!string.IsNullOrEmpty(model.PolicyNumber))
                        query = query.Where(w => w.PolicyNumber.Equals(model.PolicyNumber));

                    if (!string.IsNullOrEmpty(model.MobileNumber))
                        query = query.Where(w => w.Mobile1.Equals(model.MobileNumber)
                                                || w.Mobile2.Equals(model.MobileNumber)
                                                || w.Phone1.Equals(model.MobileNumber)
                                                || w.Phone2.Equals(model.MobileNumber));

                    if (!string.IsNullOrEmpty(model.ClaimsNumber))
                        query = query.Where(w => w.ClaimsNumber.Equals(model.ClaimsNumber));

                    if (model.PosId.HasValue && model.PosId.Value > 0)
                        query = query.Where(w => w.PosId == model.PosId);

                    if (model.InsuranceCompanyId.HasValue && model.InsuranceCompanyId.Value > 0)
                        query = query.Where(w => w.InsuranceCompanyId == model.InsuranceCompanyId);

                    if (!string.IsNullOrEmpty(model.RegistrationNumber))
                        query = query.Where(w => w.RegistrationNumber.Equals(model.RegistrationNumber));

                    if (!string.IsNullOrEmpty(model.ClaimsEntryFromDate) && !string.IsNullOrEmpty(model.ClaimsEntryToDate))
                    {
                        DateTime from = DateTime.ParseExact(model.ClaimsEntryFromDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                        DateTime to = DateTime.ParseExact(model.ClaimsEntryToDate, "MM/dd/yyyy", CultureInfo.InvariantCulture).AddHours(23).AddMinutes(59).AddSeconds(59);
                        query = query.Where(w => w.ClaimsEntryDate >= from && w.ClaimsEntryDate <= to);
                    }
                }

                return await query.Select(s => new SearchClaimsDto
                {
                    ClaimsEntryDate = s.ClaimsEntryDate,
                    ClaimsId = s.ClaimsId,
                    ClaimsNumber = s.ClaimsNumber,
                    ClaimsStatus = s.ClaimsStatus,
                    ControlNumber = s.ControlNumber,
                    CustomerName = s.CustomerName,
                    InsuranceCompany = s.InsuranceCompany,
                    Model = s.Model,
                    PolicyId = s.PolicyId,
                    Product = s.Product,
                    RegistrationNumber = s.RegistrationNumber,
                    Vertical = s.Vertical,
                    VerticalId = s.VerticalId
                })
                .AsNoTracking()
                .ToListAsync();
            }

            return new List<SearchClaimsDto>();
        }

        public async Task<List<ClaimsSearchPolicyDto>> SearchPolicies(ClaimsSearchPolicyModel model)
        {
            if (!string.IsNullOrEmpty(model.ControlNumber)
               || !string.IsNullOrEmpty(model.RegistrationNumber)
               || !string.IsNullOrEmpty(model.PolicyNumber)
               || !string.IsNullOrEmpty(model.CustomerName)
               || !string.IsNullOrEmpty(model.CustomerPhone)
               || (model.VerticalId.HasValue && model.VerticalId.Value > 0)
               || (model.ProductId.HasValue && model.ProductId.Value > 0)
               || (model.ManufactureId.HasValue && model.ManufactureId.Value > 0)
               || (model.ModelId.HasValue && model.ModelId.Value > 0)
               || (model.PosId.HasValue && model.PosId.Value > 0)
               || (model.InsuranceCompanyId.HasValue && model.InsuranceCompanyId.Value > 0)
               || (!string.IsNullOrEmpty(model.PolicyStartFromDate) && !string.IsNullOrEmpty(model.PolicyStartToDate)))
            {
                DateTime tillDate = DateTime.Now;
                if (model.HasExpiredData)
                    tillDate = DateTime.Now.AddDays(-260);

                IQueryable<View_SearchForm> query = _dataContext.View_SearchForm.Where(w => w.ExpiryDate >= tillDate).AsQueryable();

                if (!string.IsNullOrEmpty(model.ControlNumber))
                {
                    if (int.TryParse(model.ControlNumber, out int number))
                        query = query.Where(w => w.ControlNumberDigit == number);
                    else
                        query = query.Where(w => w.ControlNo.Equals(model.ControlNumber));
                }

                if (!string.IsNullOrEmpty(model.RegistrationNumber))
                    query = query.Where(w => w.RegistrationNo.ToLower().StartsWith(model.RegistrationNumber.ToLower()));

                if (!string.IsNullOrEmpty(model.PolicyNumber))
                    query = query.Where(w => w.PolicyNumber.ToLower().StartsWith(model.PolicyNumber.ToLower()));

                if (!string.IsNullOrEmpty(model.CustomerName))
                    query = query.Where(w => w.NameInPolicy.ToLower().StartsWith(model.CustomerName.ToLower()));

                if (!string.IsNullOrEmpty(model.CustomerPhone))
                    query = query.Where(w => w.Mobile1.Equals(model.CustomerPhone)
                                            || w.Mobile2.Equals(model.CustomerPhone)
                                            || w.Phone1.Equals(model.CustomerPhone)
                                            || w.Phone2.Equals(model.CustomerPhone));

                if (model.VerticalId.HasValue && model.VerticalId.Value > 0)
                    query = query.Where(w => w.VerticalId == model.VerticalId);

                if (model.ProductId.HasValue && model.ProductId.Value > 0)
                    query = query.Where(w => w.ProductId == model.ProductId);

                if (model.ManufactureId.HasValue && model.ManufactureId.Value > 0)
                    query = query.Where(w => w.ManufacturerId == model.ManufactureId);

                if (model.ModelId.HasValue && model.ModelId.Value > 0)
                    query = query.Where(w => w.ModelId == model.ModelId);

                if (model.PosId.HasValue && model.PosId.Value > 0)
                    query = query.Where(w => w.POSId == model.PosId);

                if (model.InsuranceCompanyId.HasValue && model.InsuranceCompanyId.Value > 0)
                    query = query.Where(w => w.InsuranceCompanyIdNumber == model.InsuranceCompanyId);

                if (!string.IsNullOrEmpty(model.PolicyStartFromDate) && !string.IsNullOrEmpty(model.PolicyStartToDate))
                {
                    DateTime from = DateTime.ParseExact(model.PolicyStartFromDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                    DateTime to = DateTime.ParseExact(model.PolicyStartToDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                    query = query.Where(w => w.StartDate >= from && w.StartDate <= to);
                }

                return await query.Select(s => new ClaimsSearchPolicyDto
                {
                    PolicyId = s.PolicyId,
                    ControlNumber = s.ControlNo,
                    Customer = s.NameInPolicy,
                    InsuranceCompany = s.InsuranceCompany,
                    Model = s.ModelName,
                    PolicyExpiry = s.ExpiryDate,
                    Pos = s.POSName,
                    Product = s.ProductName,
                    RegistrationNumber = s.RegistrationNo,
                    Vertical = s.VerticalName,
                    VerticalId = s.VerticalId
                })
              .AsNoTracking()
              .ToListAsync();
            }

            return new List<ClaimsSearchPolicyDto>();
        }

        public async Task<SearchClaimsPolicyDto> SearchClaimsPolicyById(int policyId) => await _dataContext.SearchClaimsPolicy.Select(s => new SearchClaimsPolicyDto
        {
            PolicyId = s.PolicyId,
            Branch = s.Branch,
            ControlNumber = s.ControlNumber,
            Customer = s.Customer,
            InsuranceCompany = s.InsuranceCompany,
            Plan = s.Plan,
            PlanType = s.PlanType,
            PolicyExpiryDate = s.PolicyExpiryDate,
            PolicyNumber = s.PolicyNumber,
            Pos = s.Pos,
            Product = s.Product,
            CustomerId = s.CustomerId,
            MakeYear = s.MakeYear,
            Manufacture = s.ManufacturerName,
            Model = s.ModelName,
            RegistrationNumber = s.RegistrationNumber,
            VerticalName = s.Vertical
        })
        .AsNoTracking()
        .FirstOrDefaultAsync(f => f.PolicyId == policyId);

        public async Task<ClaimsDto> FindClaimsById(int claimsId)
        {
            ClaimsDto data = await _dataContext.tblClaimData.Select(s => new ClaimsDto
            {
                ClaimsId = s.ClaimId,
                PolicyId = s.PolicyId,
                AdmissionDate = s.DateOfAdmission,
                AmountApproved = s.ClaimAmtApproved ?? 0,
                AmountClaimed = s.ClaimAmtSubmitted ?? 0,
                ClaimsNumber = s.ClaimNo,
                ClaimsReason = s.ClaimReason,
                ClaimsRegistrationDate = s.ClaimSubmissionDate,
                ClaimsStatusId = s.ClaimStatusId,
                ClaimsSubStatusId = s.ClaimSubStatusId ?? 0,
                ClaimsSubmittedBy = s.ClaimSubmittedBy,
                ClaimsTypeId = s.ClaimTypeId ?? 0,
                ContactNumber = s.ContactPersonNo,
                ContactPerson = s.ContactPerson,
                DischargeDate = s.DateOfDischarge,
                FollowUpDate = s.FollowupDate,
                FollowUpReason = s.FollowupReason,
                HospitalName = s.HospitalName,
                InsuranceComapnyRemarks = s.ClaimRemarkbyCompany,
                PatientName = s.PatientName,
                Remarks = s.FinalRemark,
                DocumentSubmissionDate = s.DocumentSubmitDate,
                WorkshopNumber = s.WorkshopNo,
                WorkshopName = s.WorkshopName,
                AccidentDateTimePlace = s.AccidentDetails,
                PendingConcerns = s.PendngConcerns,
                ServiceAdvisorName = s.ServiceAdvisorName,
                ServiceAdvisorNumber = s.ServiceAdvisorNo,
                SurveyorEmail = s.SurveyorEmail,
                SurveyorName = s.SurveyorName,
                SurveyorNumber = s.SurveyorNo,
                VisibleDamages = s.VisibleDamage,
                ClaimNature = s.NatureofClaim,
                DateOfIncident = s.DateOfAdmission,
                PersonLocation = s.ClaimReason
            })
            .AsNoTracking()
            .FirstOrDefaultAsync(f => f.ClaimsId == claimsId);

            if (data.ClaimsStatusId > 0)
            {
                data.ClaimsStatus = await _dataContext.tblClaimStatus.Where(w => w.ClaimStatusId == data.ClaimsStatusId).Select(s => s.ClaimStatus.ToUpper()).AsNoTracking().FirstOrDefaultAsync();
            }

            if (data.ClaimsSubStatusId > 0)
            {
                data.ClaimsSubStatus = await _dataContext.tblClaimSubStatus.Where(w => w.ClaimSubStatusId == data.ClaimsSubStatusId).Select(s => s.ClaimSubStatus.ToUpper()).AsNoTracking().FirstOrDefaultAsync();
            }

            data.RegistrationNumber = await _dataContext.tblMotorPolicyData.Where(w => w.PolicyId == data.PolicyId).Select(s => s.RegistrationNo).AsNoTracking().FirstOrDefaultAsync();

            return data;
        }

        public async Task<List<FollowUpDto>> FindClaimsFollowUpDataByClaimsId(int claimsId) => await _dataContext.tblClaimFollowupDetails.Where(w => w.ClaimId == claimsId)
            .Select(s => new FollowUpDto
            {
                FollowUpDate = s.FollowupDate,
                FollowUpReason = s.FollowupReason
            })
            .AsNoTracking()
            .ToListAsync();

        private async Task AddClaimsDocuments(List<ClaimsDocumentModel> model, int claimsId, int policyId, int customerId, int loggedInUser)
        {
            if (model.Any())
            {
                string documentDirectory = ConfigurationManager.AppSettings[AppConstant.DocumentFolder];
                if (!Directory.Exists(documentDirectory)) Directory.CreateDirectory(documentDirectory);

                List<tblUploadedDocuments> documents = new List<tblUploadedDocuments>();

                model.ForEach(f =>
                {
                    if (f.DocumentBase64.Contains(","))
                        f.DocumentBase64 = f.DocumentBase64.Substring(f.DocumentBase64.IndexOf(",") + 1);

                    byte[] bytes = Convert.FromBase64String(f.DocumentBase64);
                    string fileName = $"{Guid.NewGuid()}.{f.FileName.Split('.').LastOrDefault()}";

                    using (FileStream fileStream = new FileStream($"{documentDirectory}/{fileName}", FileMode.OpenOrCreate))
                    {
                        fileStream.Write(bytes, 0, bytes.Length);
                        fileStream.Close();
                    }

                    documents.Add(new tblUploadedDocuments
                    {
                        CreatedBy = loggedInUser,
                        CreatedTime = DateTime.Now,
                        CustomerId = customerId,
                        Directory = documentDirectory,
                        DocId = f.DocumentTypeId,
                        FileName = fileName,
                        OriginalFileName = f.FileName,
                        PolicyId = policyId,
                        ClaimId = claimsId,
                        Remarks = f.Remarks
                    });
                });

                _dataContext.tblUploadedDocuments.AddRange(documents);
                await _dataContext.SaveChangesAsync();
            }
        }

        public async Task<List<ClaimsDocumentDto>> FindClaimsDocumentsByPolicyId(int policyId)
            => await _dataContext.tblUploadedDocuments.Join(_dataContext.tblDocmentType, T1 => T1.DocumentId, T2 => T2.DocId, (T1, T2) => new { T1, T2 })
            .Where(w => w.T1.PolicyId == policyId && (w.T1.IsDelete == null || w.T1.IsDelete.HasValue && !w.T1.IsDelete.Value))
            .Select(s => new ClaimsDocumentDto
            {
                Id = s.T1.DocumentId,
                DocumentTypeName = s.T2.Name,
                FileName = s.T1.OriginalFileName,
                Remarks = s.T1.Remarks,
                UniqueId = Guid.NewGuid().ToString()
            })
            .AsNoTracking()
            .ToListAsync();

        public async Task<CommonDto<string>> DeleteClaimsDocument(int documentId, int loggedInUser)
        {
            tblUploadedDocuments document = await _dataContext.tblUploadedDocuments.FirstOrDefaultAsync(f => f.DocumentId == documentId);

            if (document == null)
                return new CommonDto<string>
                {
                    Message = "Document not found"
                };

            document.IsDelete = true;
            document.ModifiedBy = loggedInUser;
            document.ModifiedTime = DateTime.Now;

            await _dataContext.SaveChangesAsync();

            return new CommonDto<string>
            {
                IsSuccess = true,
                Message = "Document is deleted successfully."
            };
        }
    }
}
