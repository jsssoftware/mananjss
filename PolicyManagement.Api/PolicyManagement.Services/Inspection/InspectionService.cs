using AutoMapper;
using PolicyManagement.Dtos.Common;
using PolicyManagement.Dtos.Inspection;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.Inspection;
using PolicyManagement.Services.Base;
using PolicyManagement.Services.Inspection.Interface;
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

namespace PolicyManagement.Services.Inspection
{
    public class InspectionService : BaseService, IInspectionService
    {

        public InspectionService(DataContext dataContext,
                                 IMapper mapper) : base(dataContext, mapper) { }

        public async Task<CommonDto<string>> AddInspection(AddUpdateInspectionModel model)
        {
            tblInspectionData inspection = new tblInspectionData
            {
                InspectionAddress = model.LocationAddress,
                BranchId = (short)model.LoginUserBranchId,
                ContactPerson = model.ContactPerson,
                PreviousControlNo = model.ControlNumber, // ask to sir
                CreatedBy = model.LoginUserId,
                CreatedDatetime = DateTime.Now,
                CustomerName = model.CustomerName,
                EmailId = model.Email,
                InspectionCompanyId = model.InspectionCompanyId,
                InspectionReferNo = model.InspectionLeadNumber,
                InspectionReasonId = model.InspectionReasonId,
                InspectionRemark = model.Remarks,
                InspectionStatusId = model.InspectionStatusId,
                InspectionSubStatusId = model.InspectionSubStatusId,
                ChassisNo = model.ChassisNumber,
                EngineNo = model.EngineNumber,
                InspectionEntryDate = DateTime.Now,
                MakeYearId = model.MakeYearId,
                ManufacturerId = model.ManufactureId,
                MobileNo = model.MobileNumber,
                ModelId = model.ModelId,
                RegistrationNo = model.RegistrationNumber,
                POSId = model.PosId,
                TeamMemberId = model.TeamMemberId,
                ReqInsuranceCompanyId = model.InsuranceCompanyId,
                SourcofRequestId = model.ReferTypeId,
                SurveyorEmail = model.SurveyorEmail,
                SurveyorMobile = model.SurveyorMobile,
                SurvyorName = model.SurveyorName
            };

            //ask InspectionDate and InspectionRequestDate
            if (!string.IsNullOrEmpty(model.InspectionDate))
                inspection.InspectionDate = DateTime.ParseExact(model.InspectionDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            _dataContext.tblInspectionData.Add(inspection);
            await _dataContext.SaveChangesAsync();

            await AddInspectionDocuments(model.InspectionDocuments, inspection.InspectionId, model.PolicyId, model.CustomerId, model.RegistrationNumber, model.LoginUserId);

            return new CommonDto<string>
            {
                IsSuccess = true,
                Message = "Inspection created successfully."
            };
        }

        public async Task<CommonDto<string>> UpdateInspection(int inspectionId, AddUpdateInspectionModel model)
        {
            tblInspectionData inspectionDetails = await _dataContext.tblInspectionData.FirstOrDefaultAsync(f => f.InspectionId == inspectionId);

            if (inspectionDetails == null)
                return new CommonDto<string>
                {
                    Message = $"Invalid Inspection Id."
                };

            inspectionDetails.InspectionAddress = model.LocationAddress;
            inspectionDetails.BranchId = (short)model.LoginUserBranchId;
            inspectionDetails.ContactPerson = model.ContactPerson;
            inspectionDetails.PreviousControlNo = model.ControlNumber; // ask to sir
            inspectionDetails.CreatedBy = model.LoginUserId;
            inspectionDetails.CreatedDatetime = DateTime.Now;
            inspectionDetails.CustomerName = model.CustomerName;
            inspectionDetails.EmailId = model.Email;
            inspectionDetails.InspectionCompanyId = model.InspectionCompanyId;
            inspectionDetails.InspectionReferNo = model.InspectionLeadNumber;
            inspectionDetails.InspectionReasonId = model.InspectionReasonId;
            inspectionDetails.InspectionRemark = model.Remarks;
            inspectionDetails.InspectionStatusId = model.InspectionStatusId;
            inspectionDetails.InspectionSubStatusId = model.InspectionSubStatusId;
            inspectionDetails.ChassisNo = model.ChassisNumber;
            inspectionDetails.EngineNo = model.EngineNumber;
            inspectionDetails.InspectionEntryDate = DateTime.Now;
            inspectionDetails.MakeYearId = model.MakeYearId;
            inspectionDetails.ManufacturerId = model.ManufactureId;
            inspectionDetails.MobileNo = model.MobileNumber;
            inspectionDetails.ModelId = model.ModelId;
            inspectionDetails.RegistrationNo = model.RegistrationNumber;
            inspectionDetails.POSId = model.PosId;
            inspectionDetails.TeamMemberId = model.TeamMemberId;
            inspectionDetails.ReqInsuranceCompanyId = model.InsuranceCompanyId;
            inspectionDetails.SourcofRequestId = model.ReferTypeId;
            inspectionDetails.SurveyorEmail = model.SurveyorEmail;
            inspectionDetails.SurveyorMobile = model.SurveyorMobile;
            inspectionDetails.SurvyorName = model.SurveyorName;

            //ask InspectionDate and InspectionRequestDate
            if (!string.IsNullOrEmpty(model.InspectionDate))
                inspectionDetails.InspectionDate = DateTime.ParseExact(model.InspectionDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            await _dataContext.SaveChangesAsync();

            await AddInspectionDocuments(model.InspectionDocuments, inspectionId, model.PolicyId, model.CustomerId, model.RegistrationNumber, model.LoginUserId);

            return new CommonDto<string>
            {
                IsSuccess = true,
                Message = "Inspection updated successfully."
            };
        }

        public async Task<InspectionDto> FindInspectionById(int inspectionId)
        {
            InspectionDto inspectionDto = await _dataContext.tblInspectionData.Where(w => w.InspectionId == inspectionId)
                                                        .Select(s => new InspectionDto
                                                        {
                                                            ChassisNumber = s.ChassisNo,
                                                            ContactPerson = s.ContactPerson,
                                                            ControlNumber = s.PreviousControlNo,
                                                            CustomerName = s.CustomerName,
                                                            Email = s.EmailId,
                                                            EngineNumber = s.EngineNo,
                                                            InspectionCompanyId = s.InspectionCompanyId ?? 0,
                                                            InspectionDate = s.InspectionDate,
                                                            InspectionLeadNumber = s.InspectionReferNo,
                                                            InspectionReasonId = s.InspectionReasonId,
                                                            InspectionStatusId = s.InspectionStatusId ?? 0,
                                                            InspectionSubStatusId = s.InspectionSubStatusId ?? 0,
                                                            InsuranceCompanyId = s.ReqInsuranceCompanyId ?? 0,
                                                            LocationAddress = s.InspectionAddress,
                                                            MakeYearId = s.MakeYearId ?? 0,
                                                            ManufactureId = s.ManufacturerId ?? 0,
                                                            MobileNumber = s.MobileNo,
                                                            ModelId = s.ModelId ?? 0,
                                                            PosId = s.POSId,
                                                            ReferTypeId = s.SourcofRequestId ?? 0,
                                                            RegistrationNumber = s.RegistrationNo,
                                                            Remarks = s.InspectionRemark,
                                                            SurveyorEmail = s.SurveyorEmail,
                                                            SurveyorMobile = s.SurveyorMobile,
                                                            SurveyorName = s.SurvyorName,
                                                            TeamMemberId = s.TeamMemberId
                                                        })
                                                        .AsNoTracking()
                                                        .FirstOrDefaultAsync();

            if (inspectionDto != null)
            {
                inspectionDto.InspectionStatus = await _dataContext.tblInspectionStatus.Where(w => w.InspectionStatusId == inspectionDto.InspectionStatusId).Select(s => s.InspectionStatus.ToUpper()).AsNoTracking().FirstOrDefaultAsync();
                inspectionDto.InspectionSubStatus = await _dataContext.tblInspectionSubStatus.Where(w => w.InspectionSubStatusId == inspectionDto.InspectionSubStatusId).Select(s => s.InspectionSubStatus.ToUpper()).AsNoTracking().FirstOrDefaultAsync();
            }

            return inspectionDto;
        }

        public async Task<List<InspectionSearchPolicyDto>> SearchPolicies(InspectionSearchPolicyModel model)
        {
            if (!string.IsNullOrEmpty(model.ControlNumber)
                || !string.IsNullOrEmpty(model.CustomerName)
                || (model.CustomerId.HasValue && model.CustomerId.Value > 0)
                || (model.InsuranceCompanyId.HasValue && model.InsuranceCompanyId.Value > 0)
                || (model.PosId.HasValue && model.PosId.Value > 0)
                || !string.IsNullOrEmpty(model.PolicyNumber)
                || !string.IsNullOrEmpty(model.RegistrationNumber)
                || !string.IsNullOrEmpty(model.CustomerPhone)
                || (model.ManufacturerId.HasValue && model.ManufacturerId.Value > 0)
                || (model.ModelId.HasValue && model.ModelId.Value > 0)
                || (!string.IsNullOrEmpty(model.PolicyStartFromDate) && !string.IsNullOrEmpty(model.PolicyStartToDate)))
            {
                IQueryable<View_SearchForm> query = _dataContext.View_SearchForm.Where(w => w.BranchId == model.BranchId && w.VerticalId == (int)Vertical.Motor);

                if (!string.IsNullOrEmpty(model.ControlNumber))
                {
                    if (int.TryParse(model.ControlNumber, out int number))
                        query = query.Where(w => w.ControlNumberDigit == number);
                    else
                        query = query.Where(w => w.ControlNo.Equals(model.ControlNumber));
                }

                if (model.CustomerId.HasValue && model.CustomerId.Value > 0)
                    query = query.Where(w => w.CustomerId == model.CustomerId);

                if (!string.IsNullOrEmpty(model.CustomerName))
                    query = query.Where(w => w.NameInPolicy.ToLower().StartsWith(model.CustomerName.ToLower()));

                if (!string.IsNullOrEmpty(model.PolicyNumber))
                    query = query.Where(w => w.ControlNo.Equals(model.PolicyNumber));

                if (!string.IsNullOrEmpty(model.RegistrationNumber))
                    query = query.Where(w => w.RegistrationNo.Equals(model.RegistrationNumber));

                if (!string.IsNullOrEmpty(model.CustomerPhone))
                    query = query.Where(w => w.Mobile1.Equals(model.CustomerPhone)
                                            || w.Mobile2.Equals(model.CustomerPhone)
                                            || w.Phone1.Equals(model.CustomerPhone)
                                            || w.Phone2.Equals(model.CustomerPhone));

                if (model.InsuranceCompanyId.HasValue && model.InsuranceCompanyId.Value > 0)
                    query = query.Where(w => w.InsuranceCompanyIdNumber == model.InsuranceCompanyId);

                if (model.ManufacturerId.HasValue && model.ManufacturerId.Value > 0)
                    query = query.Where(w => w.ManufacturerId == model.ManufacturerId);

                if (model.ModelId.HasValue && model.ModelId.Value > 0)
                    query = query.Where(w => w.ModelId == model.ModelId);

                if (model.PosId.HasValue && model.PosId.Value > 0)
                    query = query.Where(w => w.POSId == model.PosId);

                if (!string.IsNullOrEmpty(model.PolicyStartFromDate) && !string.IsNullOrEmpty(model.PolicyStartToDate))
                {
                    DateTime from = DateTime.ParseExact(model.PolicyStartFromDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                    DateTime to = DateTime.ParseExact(model.PolicyStartToDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                    query = query.Where(w => w.StartDate >= from && w.StartDate <= to);
                }

                return await query.Select(s => new InspectionSearchPolicyDto
                {
                    ControlNumber = s.ControlNo,
                    Customer = s.CustomerName,
                    InsuranceCompany = s.InsuranceCompany,
                    InsuranceCompanyId = s.InsuranceCompanyIdNumber ?? 0,
                    MakeYear = s.MakeYear,
                    Manufacturer = s.ManufacturerName,
                    ManufacturerId = s.ManufacturerId,
                    Model = s.ModelName,
                    ModelId = s.ModelId,
                    PolicyExpiry = s.ExpiryDate,
                    Pos = s.POSName,
                    PosId = s.POSId,
                    RegistrationNumber = s.RegistrationNo,
                    ChassisNumber = s.ChassisNumber,
                    EngineNumber = s.EngineNumber,
                    MakeYearId = s.MakeYearId ?? 0
                })
                .AsNoTracking()
                .ToListAsync();
            }

            return new List<InspectionSearchPolicyDto>();
        }

        public async Task<List<SearchInspectionDto>> SearchInspections(SearchInspectionModel model)
        {
            if (!string.IsNullOrEmpty(model.CustomerName)
                || !string.IsNullOrEmpty(model.ContactNumber)
                || !string.IsNullOrEmpty(model.InspectionReferenceNumber)
                || !string.IsNullOrEmpty(model.InspectionDate)
                || !string.IsNullOrEmpty(model.RegistrationNumber)
                || model.InsuranceCompanyId.HasValue
                || model.PosId.HasValue
                || model.InspectionReasonId.HasValue
                || model.ManufacturerId.HasValue
                || model.ModelId.HasValue
                || (!string.IsNullOrEmpty(model.InspectionEntryFromDate) && !string.IsNullOrEmpty(model.InspectionEntryToDate)))
            {
                IQueryable<SearchInspection> query = _dataContext.SearchInspection.Where(w => w.BranchId == model.BranchId);

                if (!string.IsNullOrEmpty(model.CustomerName))
                    query = query.Where(w => w.CustomerName.ToLower().StartsWith(model.CustomerName.ToLower()));

                if (!string.IsNullOrEmpty(model.ContactNumber))
                    query = query.Where(w => w.MobileNumber.Equals(model.ContactNumber));

                if (!string.IsNullOrEmpty(model.InspectionReferenceNumber))
                    query = query.Where(w => w.InspectionReferNumber.Equals(model.InspectionReferenceNumber));

                if (!string.IsNullOrEmpty(model.RegistrationNumber))
                    query = query.Where(w => w.RegistrationNumber.Equals(model.RegistrationNumber));

                if (model.InsuranceCompanyId.HasValue && model.InsuranceCompanyId.Value > 0)
                    query = query.Where(w => w.InsuranceCompanyId == model.InsuranceCompanyId.Value);

                if (model.PosId.HasValue && model.PosId.Value > 0)
                    query = query.Where(w => w.PosId == model.PosId.Value);

                if (model.InspectionReasonId.HasValue && model.InspectionReasonId.Value > 0)
                    query = query.Where(w => w.InspectionReasonId == model.InspectionReasonId.Value);

                if (model.ManufacturerId.HasValue && model.ManufacturerId.Value > 0)
                    query = query.Where(w => w.ManufacturerId == model.ManufacturerId.Value);

                if (model.ModelId.HasValue && model.ModelId.Value > 0)
                    query = query.Where(w => w.ModelId == model.ModelId.Value);

                if (!string.IsNullOrEmpty(model.InspectionDate))
                {
                    DateTime from = DateTime.ParseExact(model.InspectionDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                    DateTime to = DateTime.ParseExact(model.InspectionDate, "MM/dd/yyyy", CultureInfo.InvariantCulture).AddHours(23).AddMinutes(59).AddSeconds(59);
                    query = query.Where(w => w.InspectionDate >= from && w.InspectionDate <= to);
                }

                if (!string.IsNullOrEmpty(model.InspectionEntryFromDate) && !string.IsNullOrEmpty(model.InspectionEntryToDate))
                {
                    DateTime from = DateTime.ParseExact(model.InspectionEntryFromDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                    DateTime to = DateTime.ParseExact(model.InspectionEntryToDate, "MM/dd/yyyy", CultureInfo.InvariantCulture).AddHours(23).AddMinutes(59).AddSeconds(59);
                    query = query.Where(w => w.InspectionEntryDate >= from && w.InspectionEntryDate <= to);
                }

                return await query.Select(s => new SearchInspectionDto
                {
                    InspectionId = s.InspectionId,
                    CustomerName = s.CustomerName,
                    InspectionDate = s.InspectionDate,
                    InspectionReason = s.InspectionReason,
                    InsuranceCompany = s.InsuranceCompanyName,
                    Manufacturer = s.ManufacturerName,
                    Model = s.ModelName,
                    RegistrationNumber = s.RegistrationNumber,
                    Status = s.InspectionStatus,
                    SubStatus = s.InspectionSubStatus
                })
                .AsNoTracking()
                .ToListAsync();
            }

            return new List<SearchInspectionDto>();
        }

        private async Task AddInspectionDocuments(List<InspectionDocumentModel> model, int inspectionId, int policyId, int customerId, string registrationNumber, int loggedInUser)
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
                        RegistrationNo = registrationNumber,
                        Directory = documentDirectory,
                        DocId = f.DocumentTypeId,
                        FileName = fileName,
                        OriginalFileName = f.FileName,
                        PolicyId = policyId,
                        InspectionId = inspectionId,
                        Remarks = f.Remarks,
                    });
                });

                _dataContext.tblUploadedDocuments.AddRange(documents);
                await _dataContext.SaveChangesAsync();
            }
        }

        public async Task<List<InspectionDocumentDto>> FindInspectionDocumentsByInspectionId(int inspectionId)
            => await Task.FromResult(_dataContext.Usp_UploadedDocuments(inspectionId)
            .Select(s => new InspectionDocumentDto
            {
                Id = s.Id ?? 0,
                DocumentTypeName = s.DocumentType,
                FileName = s.FileName,
                Remarks = s.Remarks,
                UniqueId = Guid.NewGuid().ToString()
            })
            .ToList());

        public async Task<CommonDto<string>> DeleteInspectionDocument(int documentId, int loggedInUser)
        {
            tblUploadedDocuments document = await _dataContext.tblUploadedDocuments.FirstOrDefaultAsync(f => f.DocumentId == documentId);

            if (document == null)
                return new CommonDto<string>
                {
                    Message = "Document not found."
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