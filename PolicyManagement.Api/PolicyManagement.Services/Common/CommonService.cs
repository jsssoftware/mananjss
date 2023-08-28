using AutoMapper;
using PolicyManagement.Dtos.Common;
using PolicyManagement.Dtos.Customer;
using PolicyManagement.Dtos.Motor;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.Common;
using PolicyManagement.Services.Base;
using PolicyManagement.Services.Common.Interface;
using PolicyManagement.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI;

namespace PolicyManagement.Services.Common
{
    public class CommonService : BaseService, ICommonService
    {
        public CommonService(DataContext dataContext,
                             IMapper mapper) : base(dataContext, mapper)
        {
        }

        public async Task<List<DropDownDto<int>>> FindAllBanks() => await _dataContext.tblBank.Where(w => w.IsActive.HasValue && w.IsActive.Value)
                                                                                               .Select(s => new DropDownDto<int>
                                                                                               {
                                                                                                   Name = s.BankName,
                                                                                                   Value = s.BankId
                                                                                               })
                                                                                               .OrderBy(o => o.Name)
                                                                                               .ToListAsync();

        public async Task<VerticalDto> FindVerticalById(int verticalId) => await _dataContext.tblVertical.Join(_dataContext.tblVerticalSegment, T1 => T1.VerticalSegmentId, T2 => T2.VerticalSegmentId, (T1, T2) => new { T1, T2 })
                                                                                                          .Where(w => w.T1.VerticalId == verticalId && w.T1.IsActive)
                                                                                                          .Select(s => new VerticalDto
                                                                                                          {
                                                                                                              VerticalId = s.T1.VerticalId,
                                                                                                              VerticalName = s.T1.VerticalName,
                                                                                                              VerticalSegmentId = s.T2.VerticalSegmentId,
                                                                                                              VerticalSegmentName = s.T2.VerticalSegment,
                                                                                                              VerticalCode = s.T1.VerticalCode
                                                                                                          })
                                                                                                          .FirstOrDefaultAsync();

        public async Task<List<PreviousClaimDto>> FindClaimsByPolicyId(int policyId) =>
            await _dataContext.tblClaimData
                              .Join(_dataContext.tblClaimStatus, T1 => T1.ClaimStatusId, T2 => T2.ClaimStatusId, (T1, T2) => new { T1, T2 })
                              .Where(w => w.T1.PolicyId == policyId)
                              .Select(s => new PreviousClaimDto
                              {
                                  ClaimReason = s.T1.ClaimReason,
                                  ClaimNumber = s.T1.ClaimNo,
                                  ClaimSubmissionDate = s.T1.ClaimSubmissionDate,
                                  AmountApproved = s.T1.ClaimAmtApproved,
                                  ClaimStatus = s.T2.ClaimStatus,
                                  Remark = s.T1.FinalRemark,
                                  ClaimId = s.T1.ClaimId
                              })
                              .AsNoTracking()
                              .ToListAsync();

        public async Task<List<PolicyVoucherDto>> FindVoucherByPolicyId(int policyId) =>
            await _dataContext.tblVoucherDetails.Join(_dataContext.tblVoucherType, T1 => T1.VoucherTypeId, T2 => T2.VoucherTypeId, (T1, T2) => new { T1, T2 })
                                                .Join(_dataContext.tblVoucherStatus, T3 => T3.T1.VoucherStatusId, T4 => T4.VoucherStatusId, (T3, T4) => new { T3, T4 })
                                                .Where(w => w.T3.T1.PolicyId == policyId)
                                                .Select(s => new PolicyVoucherDto
                                                {
                                                    VoucherAmount = s.T3.T1.VoucherAmount,
                                                    VoucherDate = s.T3.T1.VoucherDate,
                                                    VoucherId = s.T3.T1.VoucherId,
                                                    VoucherNumber = s.T3.T1.VoucherNo,
                                                    VoucherRemark = s.T3.T1.VoucherRemark,
                                                    VoucherStatus = s.T4.VoucherStatus,
                                                    VoucherType = s.T3.T2.VoucherTypeName
                                                })
                                                .AsNoTracking()
                                                .ToListAsync();

        public async Task<List<PolicyInspectionDto>> FindInspectionByPolicyId(int policyId) =>
            await Task.FromResult(_dataContext.Usp_InspectionByPolicyId(policyId)
            .Select(s => new PolicyInspectionDto
            {
                Date = s.InspectionDate,
                Id = s.InspectionId,
                Reason = s.InspectionReason,
                Status = s.InspectionStatus,
                SubStatus = s.InspectionSubStatus
            })
            .ToList());

        public async Task<PolicyInspectionDto> FindInspectionById(int inspectionId)
        {
            return await _dataContext.tblInspectionData.Join(_dataContext.tblInspectionReason, T1 => T1.InspectionReasonId, T2 => T2.InspectionReasonId, (T1, T2) => new { T1, T2 })
                                                        .Join(_dataContext.tblUser, T3 => T3.T1.CreatedBy, T4 => T4.UserId, (T3, T4) => new { T3, T4 })
                                                        .GroupJoin(_dataContext.tblInspectionCompany, T5 => T5.T3.T1.InspectionCompanyId, T6 => T6.InspectionCompanyId, (T5, T6) => new { T5, T6 })
                                                        .SelectMany(x => x.T6.DefaultIfEmpty(), (x, y) => new { T7 = x, T8 = y })
                                                        .GroupJoin(_dataContext.tblInspectionStatus, T9 => T9.T7.T5.T3.T1.InspectionStatusId, T10 => T10.InspectionStatusId, (T9, T10) => new { T9, T10 })
                                                        .SelectMany(x => x.T10.DefaultIfEmpty(), (x, y) => new { T11 = x, T12 = y })
                                                        .GroupJoin(_dataContext.tblInspectionSubStatus, T13 => T13.T11.T9.T7.T5.T3.T1.InspectionSubStatusId, T14 => T14.InspectionSubStatusId, (T13, T14) => new { T13, T14 })
                                                        .SelectMany(x => x.T14.DefaultIfEmpty(), (x, y) => new { T15 = x, T16 = y })
                                                        .Where(w => w.T15.T13.T11.T9.T7.T5.T3.T1.InspectionId == inspectionId)
                                                        .Select(s => new PolicyInspectionDto
                                                        {
                                                            Date = s.T15.T13.T11.T9.T7.T5.T3.T1.InspectionDate,
                                                            Reason = s.T15.T13.T11.T9.T7.T5.T3.T2.InspectionReason,
                                                            LeadNumber = !string.IsNullOrEmpty(s.T15.T13.T11.T9.T7.T5.T3.T1.InspectionReferNo) ? s.T15.T13.T11.T9.T7.T5.T3.T1.InspectionReferNo : "N/A",
                                                            InspectionCompany = !string.IsNullOrEmpty(s.T15.T13.T11.T9.T8.InspectionCompanyName) ? s.T15.T13.T11.T9.T8.InspectionCompanyName : "N/A",
                                                            SurveyorName = !string.IsNullOrEmpty(s.T15.T13.T11.T9.T7.T5.T3.T1.SurvyorName) ? s.T15.T13.T11.T9.T7.T5.T3.T1.SurvyorName : "N/A",
                                                            ContactPerson = !string.IsNullOrEmpty(s.T15.T13.T11.T9.T7.T5.T3.T1.ContactPerson) ? s.T15.T13.T11.T9.T7.T5.T3.T1.ContactPerson : "N/A",
                                                            Status = s.T15.T13.T12.InspectionStatus,
                                                            SubStatus = s.T16.InspectionSubStatus,
                                                            Remarks = !string.IsNullOrEmpty(s.T15.T13.T11.T9.T7.T5.T3.T1.InspectionRemark) ? s.T15.T13.T11.T9.T7.T5.T3.T1.InspectionRemark : "N/A",
                                                            CreatedBy = s.T15.T13.T11.T9.T7.T5.T4.UserFullName
                                                        })
                                                        .AsNoTracking()
                                                        .FirstOrDefaultAsync();
        }

        public async Task<PolicyVoucherDto> FindVoucherById(int voucherId)
        {
            return await _dataContext.tblVoucherDetails.Join(_dataContext.tblVoucherType, T1 => T1.VoucherTypeId, T2 => T2.VoucherTypeId, (T1, T2) => new { T1, T2 })
                                                       .Join(_dataContext.tblPaymentMode, T3 => T3.T1.PaymentModeId, T4 => (short)T4.PaymentModeId, (T3, T4) => new { T3, T4 })
                                                       .Join(_dataContext.tblVoucherStatus, T5 => T5.T3.T1.VoucherStatusId, T6 => T6.VoucherStatusId, (T5, T6) => new { T5, T6 })
                                                       .GroupJoin(_dataContext.tblBank, T7 => T7.T5.T3.T1.BankId, T8 => T8.BankId, (T7, T8) => new { T7, T8 })
                                                       .SelectMany(x => x.T8.DefaultIfEmpty(), (x, y) => new { T9 = x, T10 = y })
                                                       .Where(w => w.T9.T7.T5.T3.T1.VoucherId == voucherId)
                                                       .Select(s => new PolicyVoucherDto
                                                       {
                                                           Bank = !string.IsNullOrEmpty(s.T10.BankName) ? s.T10.BankName : "N/A",
                                                           BoucneDate = s.T9.T7.T5.T3.T1.BounceDate,
                                                           BounceAmount = s.T9.T7.T5.T3.T1.BounceAmt ?? 0,
                                                           CancelReason = !string.IsNullOrEmpty(s.T9.T7.T5.T3.T1.CancelReason) ? s.T9.T7.T5.T3.T1.CancelReason : "N/A",
                                                           InstrumentNumber = !string.IsNullOrEmpty(s.T9.T7.T5.T3.T1.TxnInstrumentNo) ? s.T9.T7.T5.T3.T1.TxnInstrumentNo : "N/A",
                                                           PaymentAmount = s.T9.T7.T5.T3.T1.VoucherAmount,
                                                           PaymentDate = s.T9.T7.T5.T3.T1.TxnInstrumentDate,
                                                           PaymentMode = s.T9.T7.T5.T4.PaymentMode,
                                                           VoucherAmount = s.T9.T7.T5.T3.T1.VoucherAmount,
                                                           VoucherDate = s.T9.T7.T5.T3.T1.VoucherDate,
                                                           VoucherId = s.T9.T7.T5.T3.T1.VoucherId,
                                                           VoucherNumber = s.T9.T7.T5.T3.T1.VoucherNo,
                                                           VoucherRemark = s.T9.T7.T5.T3.T1.VoucherRemark,
                                                           VoucherStatus = s.T9.T7.T6.VoucherStatus,
                                                           VoucherType = s.T9.T7.T5.T3.T2.VoucherTypeName,
                                                           Verification = s.T9.T7.T5.T3.T1.IsVerified.HasValue ? "VERIFIED" : "NOT VERIFIED"
                                                       })
                                                       .AsNoTracking()
                                                       .FirstOrDefaultAsync();
        }

        public async Task<List<PolicyDocumentDto>> FindPolicyDocumentsById(int policyId)
        {
            var data = _dataContext.Usp_PolicyDocuments(policyId);
            return await Task.FromResult(_dataContext.Usp_PolicyDocuments(policyId)
                        .Select(s => new PolicyDocumentDto
                        {
                            DocumentTypeName = s.DocumentType,
                            FileName = s.FileName,
                            Id = s.Id ?? 0,
                            Remarks = s.Remarks,
                            UniqueId = Guid.NewGuid().ToString(),
                            DocumentTypeId =  s.DocId,
                            DocumentBase64  = s.DocumentBase64
                        })
                        .ToList());
        }

        public async Task<List<DropDownDto<int>>> FindAllPolicyTypes(int type)
        {
            //1 for New Policy
            if (type == 1)
                return await _dataContext.tblPolicyType.Where(w => w.PolicyTypeId == 1 && w.IsActive).Select(s => new DropDownDto<int>
                {
                    Name = s.PolicyType,
                    Value = s.PolicyTypeId
                })
                .OrderBy(o => o.Name)
                .ToListAsync();
            else if (type == 8 || type ==3 ) //Rollover
                return await _dataContext.tblPolicyType.Where(w => w.PolicyTypeId == 3 && w.IsActive).Select(s => new DropDownDto<int>
                {
                    Name = s.PolicyType,
                    Value = s.PolicyTypeId
                })
                .OrderBy(o => o.Name)
                .ToListAsync();
            else if (type == 6) //Modify
                return await _dataContext.tblPolicyType.Select(s => new DropDownDto<int>
                {
                    Name = s.PolicyType,
                    Value = s.PolicyTypeId
                })
                .OrderBy(o => o.Name)
                .ToListAsync();
            else
                return await _dataContext.tblPolicyType.Where(w => w.PolicyTypeId != 1 && w.PolicyTypeId != 3 && w.IsActive).Select(s => new DropDownDto<int>
                {
                    Name = s.PolicyType,
                    Value = s.PolicyTypeId
                })
                .OrderBy(o => o.Name)
                .ToListAsync();
        }

        public async Task<List<DropDownDto<int>>> FindAllVehicleClasses() => await _dataContext.tblVehicleClass.Where(w => w.IsActive.HasValue && w.IsActive.Value).Select(s => new DropDownDto<int>
        {
            Name = s.VehicleClass,
            Value = s.VehicleClassId

        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllPackageTypes() => await _dataContext.tblPolicyPackageType.Where(w => w.IsActive).Select(s => new DropDownDto<int>
        {
            Name = s.PolicyPackageTypeName,
            Value = s.PolicyPackageTypeId

        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        //public async Task<List<PolicyTermDto>> FindAllPolicyTerms(int policyTypeId, int vehicleClassId, int policyPackageTypeId) =>
        //    await _dataContext.tblPolicyTerms.Where(w => w.PolicyTypeId == policyTypeId && w.VehicleClassId == vehicleClassId && w.PolicyPackageTypeId == policyPackageTypeId && w.IsActive)
        //    .Select(s => new PolicyTermDto
        //    {
        //        Id = s.PolicyTermId,
        //        OdYear = s.ODYear,
        //        PolicyTermName = s.PolicyTermName,
        //        TpYear = s.TPYear
        //    })
        //    .OrderBy(o => o.PolicyTermName)
        //    .ToListAsync();
        public async Task<List<PolicyTermDto>> FindAllPolicyTerms(int policyTypeId, int vehicleClassId, int policyPackageTypeId)
        {
            if (policyTypeId > 1) policyTypeId = 2;

            return await _dataContext.tblPolicyTerm.Where(w => w.PolicyTypeId == policyTypeId && w.VehicleClassId == vehicleClassId && w.PolicyPackageTypeId == policyPackageTypeId && w.IsActive)
             .Select(s => new PolicyTermDto
             {
                 Id = s.PolicyTermId,
                 OdYear = s.ODYear,
                 PolicyTermName = s.PolicyTermName,
                 TpYear = s.TPYear
             })
             .OrderBy(o => o.PolicyTermName)
             .ToListAsync();
        }
        public async Task<List<DropDownDto<int>>> FindAllInsuranceCompanies(Vertical vertical)
        {
            switch (vertical)
            {
                case Vertical.Motor:
                    return await _dataContext.tblInsuranceCompany.Where(w => w.IsMotor.HasValue && w.IsMotor.Value && w.IsActive.HasValue && w.IsActive.Value)
                    .Select(s => new DropDownDto<int>
                    {
                        Name = s.InsuranceCompanyName,
                        Value = s.InsuranceCompanyId
                    })
                    .OrderBy(o => o.Name)
                    .ToListAsync();
                case Vertical.Health:
                case Vertical.Travel:
                case Vertical.PersonalAccident:
                    return await _dataContext.tblInsuranceCompany.Where(w => w.IsHealth.HasValue && w.IsHealth.Value && w.IsActive.HasValue && w.IsActive.Value)
                    .Select(s => new DropDownDto<int>
                    {
                        Name = s.InsuranceCompanyName,
                        Value = s.InsuranceCompanyId
                    })
                    .OrderBy(o => o.Name)
                    .ToListAsync();
                case Vertical.GroupHealth:
                case Vertical.Engineering:
                case Vertical.Fire:
                case Vertical.Liablity:
                case Vertical.Marine:
                case Vertical.Miscellaneous:
                    return await _dataContext.tblInsuranceCompany.Where(w => w.IsCommercial.HasValue && w.IsCommercial.Value && w.IsActive.HasValue && w.IsActive.Value)
                    .Select(s => new DropDownDto<int>
                    {
                        Name = s.InsuranceCompanyName,
                        Value = s.InsuranceCompanyId
                    })
                    .OrderBy(o => o.Name)
                    .ToListAsync();
                default:
                    return await _dataContext.tblInsuranceCompany.Where(w => w.IsActive.HasValue && w.IsActive.Value)
                   .Select(s => new DropDownDto<int>
                   {
                       Name = s.InsuranceCompanyName,
                       Value = s.InsuranceCompanyId
                   })
                   .OrderBy(o => o.Name)
                   .ToListAsync();
            }
        }

        public async Task<List<DropDownDto<int>>> FindAllInsuranceCompanyBranches(Vertical vertical, int insuranceCompanyId, int branchId)
        {
            switch (vertical)
            {
                case Vertical.Motor:
                    if (branchId > 0)
                        return await _dataContext.tblInsuranceCompanyBranch.Where(w => w.InsuranceCompanyId == insuranceCompanyId && w.BranchId == branchId && w.IsMotor.HasValue && w.IsMotor.Value && w.IsActive.HasValue && w.IsActive.Value)
                        .Select(s => new DropDownDto<int>
                        {
                            Name = s.InsuranceCompanyBranchName,
                            Value = s.InsuranceCompanyBranchId
                        })
                        .OrderBy(o => o.Name)
                        .ToListAsync();
                    else
                        return await _dataContext.tblInsuranceCompanyBranch.Where(w => w.InsuranceCompanyId == insuranceCompanyId && w.IsMotor.HasValue && w.IsMotor.Value && w.IsActive.HasValue && w.IsActive.Value)
                        .Select(s => new DropDownDto<int>
                        {
                            Name = s.InsuranceCompanyBranchName,
                            Value = s.InsuranceCompanyBranchId
                        })
                        .OrderBy(o => o.Name)
                        .ToListAsync();
                case Vertical.Travel:
                case Vertical.PersonalAccident:
                case Vertical.Health:
                    if (branchId > 0)
                        return await _dataContext.tblInsuranceCompanyBranch.Where(w => w.InsuranceCompanyId == insuranceCompanyId && w.BranchId == branchId && w.IsHealth.HasValue && w.IsHealth.Value && w.IsActive.HasValue && w.IsActive.Value)
                        .Select(s => new DropDownDto<int>
                        {
                            Name = s.InsuranceCompanyBranchName,
                            Value = s.InsuranceCompanyBranchId
                        })
                        .OrderBy(o => o.Name)
                        .ToListAsync();
                    else
                        return await _dataContext.tblInsuranceCompanyBranch.Where(w => w.InsuranceCompanyId == insuranceCompanyId && w.IsHealth.HasValue && w.IsHealth.Value && w.IsActive.HasValue && w.IsActive.Value)
                        .Select(s => new DropDownDto<int>
                        {
                            Name = s.InsuranceCompanyBranchName,
                            Value = s.InsuranceCompanyBranchId
                        })
                        .OrderBy(o => o.Name)
                        .ToListAsync();
                case Vertical.Fire:
                case Vertical.Marine:
                case Vertical.Miscellaneous:
                case Vertical.Engineering:
                case Vertical.Liablity:
                case Vertical.GroupHealth:

                    if (branchId > 0)
                        return await _dataContext.tblInsuranceCompanyBranch.Where(w => w.InsuranceCompanyId == insuranceCompanyId && w.BranchId == branchId && w.IsCommercial.HasValue && w.IsCommercial.Value && w.IsActive.HasValue && w.IsActive.Value)
                        .Select(s => new DropDownDto<int>
                        {
                            Name = s.InsuranceCompanyBranchName,
                            Value = s.InsuranceCompanyBranchId
                        })
                        .OrderBy(o => o.Name)
                        .ToListAsync();
                    else
                        return await _dataContext.tblInsuranceCompanyBranch.Where(w => w.InsuranceCompanyId == insuranceCompanyId && w.IsCommercial.HasValue && w.IsCommercial.Value && w.IsActive.HasValue && w.IsActive.Value)
                        .Select(s => new DropDownDto<int>
                        {
                            Name = s.InsuranceCompanyBranchName,
                            Value = s.InsuranceCompanyBranchId
                        })
                        .OrderBy(o => o.Name)
                        .ToListAsync();
                default:
                    return new List<DropDownDto<int>>();
            }
        }

        public async Task<List<YearDto>> FindAllNumberOfYears() => await _dataContext.tblNoofYear.Where(w => w.IsActive).Select(s => new YearDto
        {
            Name = s.NoofYear,
            Value = s.NoofYearId,
            Year = s.YearNo
        })
        .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllFinancers() => await _dataContext.tblFinancer.Where(w => w.IsActive).Select(s => new DropDownDto<int>
        {
            Name = s.FinancerName,
            Value = s.FinancerId
        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllInspectionCompanies()
        {
            List<tblInspectionCompany> result = await _dataContext.tblInspectionCompany.Where(w => w.IsActive).OrderBy(o => o.InspectionCompanyName).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<List<DropDownDto<int>>> FindAllManufacturers()
        {
            List<tblManufacturer> result = await _dataContext.tblManufacturer.Where(w => w.IsActive).OrderBy(o => o.ManufacturerName).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<List<DropDownDto<int>>> FindAllModels(int manufacturerId) =>
            await _dataContext.tblModel.Where(w => w.ManufacturerId == manufacturerId)
                                        .Select(s => new DropDownDto<int>
                                        {
                                            Name = s.ModelName,
                                            Value = s.ModelId
                                        })
                                        .OrderBy(o => o.Name)
                                        .ToListAsync();

        public async Task<List<VarientDto>> FindAllVarients(int manufacturerId, int modelId, int vehicleClassId) =>
            await _dataContext.tblVariant.Join(_dataContext.tblFuelType, T1 => T1.FuelTypeId, T2 => T2.FuelTypeId, (T1, T2) => new { T1, T2 })
                                          .Where(w => w.T1.ManufacturerId == manufacturerId && w.T1.ModelId == modelId && w.T1.VehicleClassId == vehicleClassId)
                                          .Select(s => new VarientDto
                                          {
                                              CubicCapacity = s.T1.CubicCapacity ?? 0,
                                              ExShowroomValue = s.T1.ExShowroomValue,
                                              FuelType = s.T2.FuelTypeName,
                                              Gvw = s.T1.GVW ?? 0,
                                              Kw = s.T1.KW ?? 0,
                                              SeatCapacity = s.T1.SeatCapacity ?? 0,
                                              VarientId = s.T1.VariantId,
                                              VarientName = s.T1.VariantName
                                          })
                                          .OrderBy(o => o.VarientName)
                                          .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllVehicles(int vehicleClassId) => await _dataContext.tblVariant.Where(w => w.VehicleClassId == vehicleClassId)
                                                                                                                       .Select(s => new DropDownDto<int>
                                                                                                                       {
                                                                                                                           Name = !string.IsNullOrEmpty(s.SearchVehicle) ? s.SearchVehicle : string.Empty,
                                                                                                                           Value = s.VariantId
                                                                                                                       })
                                                                                                                       .OrderBy(o => o.Name)
                                                                                                                       .ToListAsync();

        public async Task<VehicleDto> FindVehicleDetailByVariantId(int variantId) => await _dataContext.tblVariant.Join(_dataContext.tblFuelType, T1 => T1.FuelTypeId, T2 => T2.FuelTypeId, (T1, T2) => new { T1, T2 })
                                          .Where(w => w.T1.VariantId == variantId)
                                          .Select(s => new VehicleDto
                                          {
                                              CubicCapacity = s.T1.CubicCapacity ?? 0,
                                              ExShowroomValue = s.T1.ExShowroomValue,
                                              FuelType = s.T2.FuelTypeName,
                                              Gvw = s.T1.GVW ?? 0,
                                              Kw = s.T1.KW ?? 0,
                                              SeatCapacity = s.T1.SeatCapacity ?? 0,
                                              VarientId = s.T1.VariantId,
                                              VarientName = s.T1.VariantName,
                                              ManufacturerId = s.T1.ManufacturerId,
                                              ModelId = s.T1.ModelId
                                          })
                                          .FirstOrDefaultAsync();

        public async Task<List<DropDownDto<int>>> FindAllMakeYears(int type)
        {
            List<YearDto> years = await _dataContext.tblMakeYear.Select(s => new YearDto
            {
                Value = s.MakeYearId,
                Name = s.MakeYear
            })
            .ToListAsync();

            years.ForEach(f => f.Year = Convert.ToInt32(f.Name.Trim()));

            years = years.OrderByDescending(o => o.Year).ToList();

            if (type == 1)
                return years.Take(2).Select(s => new DropDownDto<int>
                {
                    Name = $"{s.Year}",
                    Value = s.Value
                })
                                    .ToList();

            return years.Select(s => new DropDownDto<int>
            {
                Name = $"{s.Year}",
                Value = s.Value
            })
                        .ToList();
        }

        public async Task<List<DropDownDto<int>>> FindAllUsages()
        {
            List<tblVehicleUsage> result = await _dataContext.tblVehicleUsage.OrderBy(o => o.VehicleUsageName).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<List<DropDownDto<int>>> FindAllNcbs()
        {
            List<tblNCB> result = await _dataContext.tblNCB.ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<List<DropDownDto<int>>> FindAllCommissionPaidOn(int verticalId)
        {
            List<tblCommissionPayType> result = await _dataContext.tblCommissionPayType.Where(x=>x.VerticalId == verticalId).OrderBy(o => o.CommissionPayTypeId).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<List<DropDownDto<int>>> FindAllAddOnRiders(int insuranceCompanyId, int verticalId) =>
            await _dataContext.tblAddonRider.Where(w => w.InsuranceCompanyId == insuranceCompanyId && w.VerticalId == verticalId)
                .Select(s => new DropDownDto<int>
                {
                    Name = s.AddonRiderName,
                    Value = s.AddonRiderId
                })
                .OrderBy(o => o.Name)
                .ToListAsync();

        public async Task<List<AddOnPlanOptionDto>> FindAllAddOnPlanOptions(int addOnRiderId, int verticalId,int policyId)
        {
            List<AddOnPlanOptionDto> addOnPlanOptionDtos = new List<AddOnPlanOptionDto>();
            //List<tblAddonPlanOption> addOnPlanOptions = await _dataContext.tblAddonPlanOptions.Where(w => w.VerticalId == verticalId && w.IsActive).OrderBy(o => o.DisplayOrder).ToListAsync();
            List<tblAddonPlanOption> addOnPlanOptions = await _dataContext.tblAddonPlanOption.Where(w => w.VerticalId == verticalId && w.IsActive).ToListAsync();
            List<tblAddonPlanOptionMapping> addOnPlanOptionMappings = await _dataContext.tblAddonPlanOptionMapping.Where(w => w.AddonPlanRiderId == addOnRiderId && w.IsActive).ToListAsync();
            List<tblPolicyAddonOptionDetails> policyAddonOptionDetails = await _dataContext.tblPolicyAddonOptionDetails.Where(x => x.PolicyId == (policyId == 0 ? (int?)null : policyId)).ToListAsync();
            
            addOnPlanOptions.ForEach(f => addOnPlanOptionDtos.Add(new AddOnPlanOptionDto
            {
                AddonPlanOptionDescripation = f.AddonPlanOptionDescripation,
                AddonPlanOptionId = f.AddonPlanOptionId,
                AddonPlanOptionName = f.AddonPlanOptionName,
                IsPlanAvailable = addOnPlanOptionMappings.Any(a => a.AddonPlanOptionId == f.AddonPlanOptionId),
                AddonValue = policyAddonOptionDetails.FirstOrDefault(x=>x.AddonPlanOptionId==f.AddonPlanOptionId)?.AddonValue 
            }));

            return addOnPlanOptionDtos;
        }

        public async Task<List<DropDownDto<int>>> FindAllRelations()
        {
            List<tblRelationShip> result = await _dataContext.tblRelationShip.OrderBy(o => o.RelationShipName).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<List<DropDownDto<int>>> FindAllTeleCallers(Vertical vertical, int branchId)
        {
            switch (vertical)
            {
                case Vertical.Motor:
                    if (branchId > 0)
                        return await _dataContext.tblTeamMember.Where(w => w.BranchId == branchId && w.IsMotor.HasValue && w.IsMotor.Value && w.ISTelecaller.HasValue && w.ISTelecaller.Value)
                                                                .Select(s => new DropDownDto<int>
                                                                {
                                                                    Name = s.TeamMemberName,
                                                                    Value = s.TeamMemberId
                                                                })
                                                                .OrderBy(o => o.Name)
                                                                .ToListAsync();

                    return await _dataContext.tblTeamMember.Where(w => w.IsMotor.HasValue && w.IsMotor.Value && w.ISTelecaller.HasValue && w.ISTelecaller.Value)
                                                            .Select(s => new DropDownDto<int>
                                                            {
                                                                Name = s.TeamMemberName,
                                                                Value = s.TeamMemberId
                                                            })
                                                            .OrderBy(o => o.Name)
                                                            .ToListAsync();
                case Vertical.Health :
                case Vertical.Travel:
                case Vertical.PersonalAccident:
                    if (branchId > 0)
                        return await _dataContext.tblTeamMember.Where(w => w.BranchId == branchId && w.IsHealth.HasValue && w.IsHealth.Value && w.ISTelecaller.HasValue && w.ISTelecaller.Value)
                                                                .Select(s => new DropDownDto<int>
                                                                {
                                                                    Name = s.TeamMemberName,
                                                                    Value = s.TeamMemberId
                                                                })
                                                                .OrderBy(o => o.Name)
                                                                .ToListAsync();

                    return await _dataContext.tblTeamMember.Where(w => w.IsHealth.HasValue && w.IsHealth.Value && w.ISTelecaller.HasValue && w.ISTelecaller.Value)
                                                            .Select(s => new DropDownDto<int>
                                                            {
                                                                Name = s.TeamMemberName,
                                                                Value = s.TeamMemberId
                                                            })
                                                            .OrderBy(o => o.Name)
                                                            .ToListAsync();
                case Vertical.GroupHealth:
                case Vertical.Engineering:
                case Vertical.Fire:
                case Vertical.Liablity:
                case Vertical.Marine:
                case Vertical.Miscellaneous:
                    if (branchId > 0)
                        return await _dataContext.tblTeamMember.Where(w => w.BranchId == branchId && w.IsCommercial.HasValue && w.IsCommercial.Value && w.ISTelecaller.HasValue && w.ISTelecaller.Value)
                                                                .Select(s => new DropDownDto<int>
                                                                {
                                                                    Name = s.TeamMemberName,
                                                                    Value = s.TeamMemberId
                                                                })
                                                                .OrderBy(o => o.Name)
                                                                .ToListAsync();

                    return await _dataContext.tblTeamMember.Where(w => w.IsCommercial.HasValue && w.IsCommercial.Value && w.ISTelecaller.HasValue && w.ISTelecaller.Value)
                                                            .Select(s => new DropDownDto<int>
                                                            {
                                                                Name = s.TeamMemberName,
                                                                Value = s.TeamMemberId
                                                            })
                                                            .OrderBy(o => o.Name)
                                                            .ToListAsync();
                default:
                    return new List<DropDownDto<int>>();
            }
        }

        public async Task<List<DropDownDto<int>>> FindAllReferences(int branchId) => await _dataContext.tblReference.Where(w => w.BranchId == branchId).Select(s => new DropDownDto<int>
        {
            Name = s.ReferenceName,
            Value = s.ReferenceId
        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllFosNames(Vertical vertical, int branchId)
        {
            switch (vertical)
            {
                case Vertical.Motor:
                    if (branchId > 0)
                        return await _dataContext.tblTeamMember.Where(w => w.BranchId == branchId && w.IsMotor.HasValue && w.IsMotor.Value && w.ISFOS.HasValue && w.ISFOS.Value && w.IsActive)
                                                                .Select(s => new DropDownDto<int>
                                                                {
                                                                    Name = s.TeamMemberName,
                                                                    Value = s.TeamMemberId
                                                                })
                                                                .OrderBy(o => o.Name)
                                                                .ToListAsync();

                    return await _dataContext.tblTeamMember.Where(w => w.IsMotor.HasValue && w.IsMotor.Value && w.ISFOS.HasValue && w.ISFOS.Value && w.IsActive)
                                                            .Select(s => new DropDownDto<int>
                                                            {
                                                                Name = s.TeamMemberName,
                                                                Value = s.TeamMemberId
                                                            })
                                                            .OrderBy(o => o.Name)
                                                            .ToListAsync();
                case Vertical.Health:
                case Vertical.Travel:
                case Vertical.PersonalAccident:
                    if (branchId > 0)
                        return await _dataContext.tblTeamMember.Where(w => w.BranchId == branchId && w.IsHealth.HasValue && w.IsHealth.Value && w.ISFOS.HasValue && w.ISFOS.Value && w.IsActive)
                                                                .Select(s => new DropDownDto<int>
                                                                {
                                                                    Name = s.TeamMemberName,
                                                                    Value = s.TeamMemberId
                                                                })
                                                                .OrderBy(o => o.Name)
                                                                .ToListAsync();

                    return await _dataContext.tblTeamMember.Where(w => w.IsHealth.HasValue && w.IsHealth.Value && w.ISFOS.HasValue && w.ISFOS.Value && w.IsActive)
                                                            .Select(s => new DropDownDto<int>
                                                            {
                                                                Name = s.TeamMemberName,
                                                                Value = s.TeamMemberId
                                                            })
                                                            .OrderBy(o => o.Name)
                                                            .ToListAsync();
                case Vertical.Fire:
                case Vertical.Liablity:
                case Vertical.Marine:
                case Vertical.Engineering:
                case Vertical.Miscellaneous:
                case Vertical.GroupHealth:

                    if (branchId > 0)
                        return await _dataContext.tblTeamMember.Where(w => w.BranchId == branchId && w.IsCommercial.HasValue && w.IsCommercial.Value && w.ISFOS.HasValue && w.ISFOS.Value && w.IsActive)
                                                                .Select(s => new DropDownDto<int>
                                                                {
                                                                    Name = s.TeamMemberName,
                                                                    Value = s.TeamMemberId
                                                                })
                                                                .OrderBy(o => o.Name)
                                                                .ToListAsync();

                    return await _dataContext.tblTeamMember.Where(w => w.IsCommercial.HasValue && w.IsCommercial.Value && w.ISFOS.HasValue && w.ISFOS.Value && w.IsActive)
                                                            .Select(s => new DropDownDto<int>
                                                            {
                                                                Name = s.TeamMemberName,
                                                                Value = s.TeamMemberId
                                                            })
                                                            .OrderBy(o => o.Name)
                                                            .ToListAsync();

                default:
                    return new List<DropDownDto<int>>();
            }
        }

        public async Task<List<DropDownDto<int>>> FindAllTeamMembers(Vertical vertical, int branchId)
        {
            switch (vertical)
            {
                case Vertical.Motor:
                    if (branchId > 0)
                        return await _dataContext.tblTeamMember.Where(w => w.BranchId == branchId && w.IsMotor.HasValue && w.IsMotor.Value && w.IsActive)
                                                                .Select(s => new DropDownDto<int>
                                                                {
                                                                    Name = s.TeamMemberName,
                                                                    Value = s.TeamMemberId
                                                                })
                                                                .OrderBy(o => o.Name)
                                                                .ToListAsync();

                    return await _dataContext.tblTeamMember.Where(w => w.IsMotor.HasValue && w.IsMotor.Value && w.IsActive)
                                                            .Select(s => new DropDownDto<int>
                                                            {
                                                                Name = s.TeamMemberName,
                                                                Value = s.TeamMemberId
                                                            })
                                                            .OrderBy(o => o.Name)
                                                            .ToListAsync();

                case Vertical.Health:
                case Vertical.Travel:
                case Vertical.PersonalAccident:
                    if (branchId > 0)
                        return await _dataContext.tblTeamMember.Where(w => w.BranchId == branchId && w.IsHealth.HasValue && w.IsHealth.Value && w.IsActive)
                                                                .Select(s => new DropDownDto<int>
                                                                {
                                                                    Name = s.TeamMemberName,
                                                                    Value = s.TeamMemberId
                                                                })
                                                                .OrderBy(o => o.Name)
                                                                .ToListAsync();

                    return await _dataContext.tblTeamMember.Where(w => w.IsHealth.HasValue && w.IsHealth.Value && w.IsActive)
                                                            .Select(s => new DropDownDto<int>
                                                            {
                                                                Name = s.TeamMemberName,
                                                                Value = s.TeamMemberId
                                                            })
                                                            .OrderBy(o => o.Name)
                                                            .ToListAsync();

                case Vertical.Engineering:
                case Vertical.Fire:
                case Vertical.Liablity:
                case Vertical.Marine:
                case Vertical.Miscellaneous:
                case Vertical.GroupHealth:
                    if (branchId > 0)
                        return await _dataContext.tblTeamMember.Where(w => w.BranchId == branchId && w.IsCommercial.HasValue && w.IsCommercial.Value && w.IsActive)
                                                                .Select(s => new DropDownDto<int>
                                                                {
                                                                    Name = s.TeamMemberName,
                                                                    Value = s.TeamMemberId
                                                                })
                                                                .OrderBy(o => o.Name)
                                                                .ToListAsync();

                    return await _dataContext.tblTeamMember.Where(w => w.IsCommercial.HasValue && w.IsCommercial.Value && w.IsActive)
                                                            .Select(s => new DropDownDto<int>
                                                            {
                                                                Name = s.TeamMemberName,
                                                                Value = s.TeamMemberId
                                                            })
                                                            .OrderBy(o => o.Name)
                                                            .ToListAsync();

                case Vertical.Life:
                    if (branchId > 0)
                        return await _dataContext.tblTeamMember.Where(w => w.BranchId == branchId && w.IsLife.HasValue && w.IsLife.Value && w.IsActive)
                                                                .Select(s => new DropDownDto<int>
                                                                {
                                                                    Name = s.TeamMemberName,
                                                                    Value = s.TeamMemberId
                                                                })
                                                                .OrderBy(o => o.Name)
                                                                .ToListAsync();

                    return await _dataContext.tblTeamMember.Where(w => w.IsLife.HasValue && w.IsLife.Value && w.IsActive)
                                                            .Select(s => new DropDownDto<int>
                                                            {
                                                                Name = s.TeamMemberName,
                                                                Value = s.TeamMemberId
                                                            })
                                                            .OrderBy(o => o.Name)
                                                            .ToListAsync();

                default:
                    if (branchId > 0)
                        return await _dataContext.tblTeamMember.Where(w => w.BranchId == branchId && w.IsActive)
                                                                .Select(s => new DropDownDto<int>
                                                                {
                                                                    Name = s.TeamMemberName,
                                                                    Value = s.TeamMemberId
                                                                })
                                                                .OrderBy(o => o.Name)
                                                                .ToListAsync();

                    return await _dataContext.tblTeamMember.Where(w => w.IsActive)
                                                            .Select(s => new DropDownDto<int>
                                                            {
                                                                Name = s.TeamMemberName,
                                                                Value = s.TeamMemberId
                                                            })
                                                            .OrderBy(o => o.Name)
                                                            .ToListAsync();
            }
        }

        public async Task<List<DropDownDto<string>>> FindAllBranchs() => await _dataContext.tblBranch.Select(s => new DropDownDto<string>
        {
            Name = s.BranchName,
            Value = s.BranchCode
        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        public async Task<List<DropDownDto<short>>> FindAllCities() => await _dataContext.tblCity.Select(s => new DropDownDto<short>
        {
            Name = s.CityName,
            Value = s.CityId
        })
       .OrderBy(o => o.Name)
       .ToListAsync();

        public DateDto CalculateDate(string dateString, int year, int days)
        {
            DateTime? date = null;
            if (!string.IsNullOrEmpty(dateString)){
                date =  DateTime.ParseExact(dateString, "MM/dd/yyyy", CultureInfo.InvariantCulture) ;
                date = date.Value.AddYears(year);
                date = date.Value.AddDays(days);
            }
          
            return new DateDto
            {
                Day = date.HasValue ? date.Value.Day : 0,
                Month = date.HasValue ? date.Value.Month : 0,
                Year = date.HasValue ? date.Value.Year:0
            };
        }

        public async Task<string> GenerateCustomerCode()
        {
            string lastCutomerCode = await _dataContext.tblCustomer.OrderByDescending(o => o.CustomerId).Select(s => s.CustomerCode).FirstOrDefaultAsync();
            if (!string.IsNullOrEmpty(lastCutomerCode) && lastCutomerCode.Length == 7)
            {
                lastCutomerCode = lastCutomerCode.Substring(1);
                int.TryParse(lastCutomerCode, out int code);
                return $"C{(code + 1).ToString().PadLeft(6, '0')}";
            }
            else if (string.IsNullOrEmpty(lastCutomerCode) || lastCutomerCode.Length < 7)
            {
                return "C000001";
            }
            else
                return null;
        }

        public async Task<string> GenerateControlNumber(string branchCode, string verticalCode)
        {
            string lastControlNumber = await _dataContext.tblMotorPolicyData.OrderByDescending(o => o.PolicyId).Select(s => s.ControlNo).FirstOrDefaultAsync();

            if (lastControlNumber == null)
                return $"{DateTime.Now:yy}{branchCode}{verticalCode}000001";

            if (int.TryParse(lastControlNumber.Substring(6), out int number))
                return $"{DateTime.Now:yy}{branchCode}{verticalCode}{(number + 1).ToString().PadLeft(6, '0')}";

            return null;
        }

        public async Task<List<RtoZoneDto>> FindAllRtoZones() => await _dataContext.tblRTOZone.Select(s => new RtoZoneDto
        {
            Name = s.RTOZoneName,
            Value = s.RTOZoneId,
            RiskZone = s.RiskZone,
            RtoZoneCode = s.RTOZoneCode
        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        public async Task<decimal> FindGstPercentage() => await _dataContext.tblGST.Select(s => s.GSTRate).FirstOrDefaultAsync();

        public async Task<List<DropDownDto<int>>> FindAllDocumentTypes(string code)
        {
            IQueryable<tblDocmentType> query = _dataContext.tblDocmentType.OrderBy(o => o.DocId).Where(w => w.IsActive);
            if (code.ToLower().Equals("all"))
                return await query.Select(s => new DropDownDto<int>
                {
                    Name = s.Name,
                    Value = s.DocId
                })
                .OrderBy(o => o.Name)
                .ToListAsync();
            else if (code.ToLower().Equals("inspection"))
                return await query.Where(w => w.Code.ToLower().Equals(code.ToLower())
                                            || w.Code.ToLower().Equals("rc")
                                            || w.Code.ToLower().Equals("invoice")
                                            || w.Code.ToLower().Equals("pyp"))
                                  .Select(s => new DropDownDto<int>
                                  {
                                      Name = s.Name,
                                      Value = s.DocId
                                  })
                                  .OrderBy(o => o.Name)
                                  .ToListAsync();
            else
                return await query.Where(w => w.Code.ToLower().Equals(code.ToLower())).Select(s => new DropDownDto<int>
                {
                    Name = s.Name,
                    Value = s.DocId
                })
               .OrderBy(o => o.Name)
               .ToListAsync();
        }

        public async Task<List<DropDownDto<int>>> FindAllPaymentModes() => await _dataContext.tblPaymentMode.Select(s => new DropDownDto<int>
        {
            Name = s.PaymentMode,
            Value = s.PaymentModeId
        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllPos(Vertical vertical, int branchId)
        {

            switch (vertical)
            {
                case Vertical.Motor:
                    if (branchId > 0)
                        return await _dataContext.tblPOS.Where(w => w.BranchId == branchId && w.IsMotor.HasValue && w.IsMotor.Value && w.IsActive).Select(s => new DropDownDto<int>
                        {
                            Name = s.POSName,
                            Value = s.POSId
                        })
                        .OrderBy(o => o.Name)
                        .ToListAsync();
                    return await _dataContext.tblPOS.Where(w => w.IsMotor.HasValue && w.IsMotor.Value && w.IsActive).Select(s => new DropDownDto<int>
                    {
                        Name = s.POSName,
                        Value = s.POSId
                    })
                    .OrderBy(o => o.Name)
                    .ToListAsync();

                case Vertical.Health:
                case Vertical.Travel:
                case Vertical.PersonalAccident:
                    if (branchId > 0)
                        return await _dataContext.tblPOS.Where(w => w.BranchId == branchId && w.IsHealth.HasValue && w.IsHealth.Value && w.IsActive).Select(s => new DropDownDto<int>
                        {
                            Name = s.POSName,
                            Value = s.POSId
                        })
                        .OrderBy(o => o.Name)
                        .ToListAsync();
                    return await _dataContext.tblPOS.Where(w => w.IsHealth.HasValue && w.IsHealth.Value && w.IsActive).Select(s => new DropDownDto<int>
                    {
                        Name = s.POSName,
                        Value = s.POSId
                    })
                    .OrderBy(o => o.Name)
                    .ToListAsync();
                case Vertical.GroupHealth:
                case Vertical.Engineering:
                case Vertical.Fire:
                case Vertical.Liablity:
                case Vertical.Marine:
                case Vertical.Miscellaneous:
                    if (branchId > 0)
                        return await _dataContext.tblPOS.Where(w => w.BranchId == branchId && w.IsCommercial.HasValue && w.IsCommercial.Value && w.IsActive).Select(s => new DropDownDto<int>
                        {
                            Name = s.POSName,
                            Value = s.POSId
                        })
                        .OrderBy(o => o.Name)
                        .ToListAsync();
                    return await _dataContext.tblPOS.Where(w => w.IsCommercial.HasValue && w.IsCommercial.Value && w.IsActive).Select(s => new DropDownDto<int>
                    {
                        Name = s.POSName,
                        Value = s.POSId
                    })
                    .OrderBy(o => o.Name)
                    .ToListAsync();

                case Vertical.Life:
                    if (branchId > 0)
                        return await _dataContext.tblPOS.Where(w => w.BranchId == branchId && w.IsLife.HasValue && w.IsLife.Value && w.IsActive).Select(s => new DropDownDto<int>
                        {
                            Name = s.POSName,
                            Value = s.POSId
                        })
                        .OrderBy(o => o.Name)
                        .ToListAsync();
                    return await _dataContext.tblPOS.Where(w => w.IsLife.HasValue && w.IsLife.Value && w.IsActive).Select(s => new DropDownDto<int>
                    {
                        Name = s.POSName,
                        Value = s.POSId
                    })
                    .OrderBy(o => o.Name)
                    .ToListAsync();

                default:
                    if (branchId > 0)
                        return await _dataContext.tblPOS.Where(w => w.BranchId == branchId && w.IsActive).Select(s => new DropDownDto<int>
                        {
                            Name = s.POSName,
                            Value = s.POSId
                        })
                        .OrderBy(o => o.Name)
                        .ToListAsync();
                    return await _dataContext.tblPOS.Where(w => w.IsActive).Select(s => new DropDownDto<int>
                    {
                        Name = s.POSName,
                        Value = s.POSId
                    })
                    .OrderBy(o => o.Name)
                    .ToListAsync();

            }
        }

        public async Task<DropDownDto<int>> FindPosManagedByPosId(int posId) => await _dataContext.tblPOS.Join(_dataContext.tblTeamMember, T1 => T1.POSManagedBy, T2 => T2.TeamMemberId, (T1, T2) => new { T1, T2 })
                                                                                                        .Where(w => w.T1.POSId == posId)
                                                                                                        .Select(s => new DropDownDto<int>
                                                                                                        {
                                                                                                            Name = s.T2.TeamMemberName,
                                                                                                            Value = s.T1.POSManagedBy
                                                                                                        })
                                                                                                        .FirstOrDefaultAsync();

        public async Task<DataTableDto<List<SearchPolicyDto>>> FindAllPolicies(SearchPolicyModel model)
        {
            string query = PreparePolicySearchQuery(model);
            
            int totalCount = await _dataContext.Database.SqlQuery<int>(string.Format(query, "count(1)"), string.Empty).FirstOrDefaultAsync();
            try
            {
                var result = await _dataContext.Database.SqlQuery<SearchPolicyDto>(string.Format(query, "*"), string.Empty).ToListAsync();
                result.ToList().ForEach(f =>
                {
                    f.StartDateInString = f.StartDate.HasValue ? f.StartDate.Value.ToString("dd-MM-yyyy").Replace('-', '/'):"";
                    f.ExpiryDateInString = f.ExpiryDate.HasValue ? f.ExpiryDate.Value.ToString("dd-MM-yyyy").Replace('-', '/'):"";
                });
                  

                return new DataTableDto<List<SearchPolicyDto>>
                {
                    TotalCount = totalCount,
                    Data = result
                };
            }
            catch (Exception)
            {

                throw;
            }


        }

        private List<SearchPolicyFinalDownloadDto> convertToFinalDownloadDto(List<SearchPolicyDownloadDto> result)
        {
            List<SearchPolicyFinalDownloadDto> objList = new List<SearchPolicyFinalDownloadDto>();
            foreach (var item in result)
            {
                objList.Add(new SearchPolicyFinalDownloadDto()
                {
                    ControlNo = item.ControlNo,
                    NameInPolicy = item.NameInPolicy,
                    RegistrationNo = item.RegistrationNo,
                    GrossPremium = item.GrossPremium,
                    PolicyType = item.PolicyType,
                    VerticalName = item.VerticalName,
                    ProductName = item.ProductName,
                    ManufacturerName = item.ManufacturerName,
                    ModelName = item.ModelName,
                    POSName = item.POSName,
                    PolicyStatus = item.PolicyStatus,
                    StartDate = item.StartDateInString,
                    ExpiryDate = item.ExpiryDateInString,
                    PolicyNumber = item.PolicyNumber,
                    InsuranceCompanyIdNumber = item.InsuranceCompanyIdNumber,
                    InsuranceCompany = item.InsuranceCompany,
                    PolicyRemarks = item.PolicyRemarks
                });
            }
            return objList;
        }

        public async Task<DataTableDto<List<SearchPolicyFinalDownloadDto>>> FindAllPoliciesDownload(SearchPolicyModel model)
        {
            string query = PreparePolicySearchQuery(model);
            int totalCount = await _dataContext.Database.SqlQuery<int>(string.Format(query, "count(1)"), string.Empty).FirstOrDefaultAsync();
            try
            {
                var result = await _dataContext.Database.SqlQuery<SearchPolicyDownloadDto>(string.Format(query, "*"), string.Empty).ToListAsync();
                result.ForEach(f =>
                {
                    f.StartDateInString = f.StartDate.ToString("dd-MM-yyyy").Replace('-', '/');
                    f.ExpiryDateInString = f.ExpiryDate.ToString("dd-MM-yyyy").Replace('-', '/');
                });
                var fnlResult = convertToFinalDownloadDto(result);
                return new DataTableDto<List<SearchPolicyFinalDownloadDto>>
                {
                    TotalCount = totalCount,
                    Data = fnlResult
                };
            }
            catch (Exception)
            {

                throw;
            }
        }

        public DateDto GetDate(DateTime? date)
        {
            if (date.HasValue)
                return new DateDto
                {
                    Day = date.Value.Day,
                    Month = date.Value.Month,
                    Year = date.Value.Year
                };
            return null;
        }

        public async Task<List<DropDownDto<int>>> FindAllGenders() => await _dataContext.tblGender.Where(w => w.IsActive)
                                                                                                   .Select(s => new DropDownDto<int>
                                                                                                   {
                                                                                                       Name = s.Gender,
                                                                                                       Value = s.GenderId
                                                                                                   })
                                                                                                   .OrderBy(o => o.Name)
                                                                                                   .ToListAsync();

        private string PreparePolicySearchQuery(SearchPolicyModel model)
        {
            StringBuilder query = new StringBuilder("select {0} from [dbo].[View_SearchForm_Policies] WITH(NOLOCK) ");
            // basic condition
            switch (model.PolicyManagementType)
            {
                case PolicyManagementType.New:
                    break;
                case PolicyManagementType.Renew:
                    {
                        const string whereQuery = "where RenewalDone = 0 and PolicyStatusId = 1 and IsVerified = 1";
                        query.Append(whereQuery);
                    }
                    break;
                case PolicyManagementType.InComplete:
                    {
                        const string whereQuery = "where (Flag1 = 0 or Flag2 = 0) ";
                        query.Append(whereQuery);
                    }
                    break;
                case PolicyManagementType.Correction:
                    {
                        const string whereQuery = "where Flag1 = 1 and Flag2 = 1 and IsVerified = 0 ";
                        query.Append(whereQuery);
                    }
                    break;
                case PolicyManagementType.Verify:
                    {
                        string whereQuery = $"where Flag1 = 1 and Flag2 = 1 and IsVerified = 0 and CreatedBy != {model.LoginUserId} ";
                        query.Append(whereQuery);
                    }
                    break;
                case PolicyManagementType.Modify:
                    {
                        const string whereQuery = "where Flag1 = 1 and Flag2 = 1 and IsVerified= 1 and PolicyStatusId = 1 ";
                        query.Append(whereQuery);
                    }
                    break;
                case PolicyManagementType.View:
                    {
                        const string whereQuery = "where Flag1 = 1 and Flag2 = 1 and IsVerified = 1 ";
                        query.Append(whereQuery);
                    }
                    break;
                default:
                    break;
            }


            if (!string.IsNullOrEmpty(model.ControlNumber.Year)
               && !string.IsNullOrEmpty(model.ControlNumber.BranchCode)
               && !string.IsNullOrEmpty(model.ControlNumber.VerticalCode)
               && !string.IsNullOrEmpty(model.ControlNumber.Number))
            {
                model.ControlNumber.Number = model.ControlNumber.Number.Length < 6 ? model.ControlNumber.Number.PadLeft(6, '0') : model.ControlNumber.Number;

                string controlNumber = $"{model.ControlNumber.Year}{model.ControlNumber.BranchCode}{model.ControlNumber.VerticalCode}{model.ControlNumber.Number}";

                query.Append($"and ControlNo = '{controlNumber}' ");

                return query.ToString();
            }
            if (!string.IsNullOrEmpty(model.ControlNumber.Year))
            {
                query.Append($"and ControlNumberYear = {model.ControlNumber.Year} ");
            }
            if (!string.IsNullOrEmpty(model.ControlNumber.BranchCode))
            {
                query.Append($"and BranchCode = {model.ControlNumber.BranchCode} ");
            }
            if (!string.IsNullOrEmpty(model.ControlNumber.VerticalCode))
            {
                query.Append($"and VerticalId = {model.ControlNumber.VerticalCode} ");
            }
            // for show all 
            if (model.IsForShowAll)
            {
                return query.ToString();
            }
            // for special case of conrol no digit 
            if (!string.IsNullOrEmpty(model.ControlNumber.Number))
            {
                query.Append($"and ControlNumberDigit = {model.ControlNumber.Number} ");
            }

            // start and condition
            if (!string.IsNullOrEmpty(model.CustomerName))
                query.Append($"and NameInPolicy like '{model.CustomerName}%' ");

            if (model.InsuranceCompany > 0)
                query.Append($"and InsuranceCompanyIdNumber = {model.InsuranceCompany} ");

            if (!string.IsNullOrEmpty(model.PolicyNumber))
                query.Append($"and PolicyNumber like '%{model.PolicyNumber}%' ");

            if (!string.IsNullOrEmpty(model.RegistrationNumber))
                query.Append($"and RegistrationNo like '%{model.RegistrationNumber}%' ");

            if (model.Manufacture > 0)
                query.Append($"and ManufacturerId = {model.Manufacture} ");

            if (model.Model > 0)
                query.Append($"and ModelId = {model.Model} ");

            if (model.Pos > 0)
                query.Append($"and POSId = {model.Pos} ");

            if (model.Vertical > 0)
                query.Append($"and VerticalId = {model.Vertical} ");

            if (model.Product > 0)
                query.Append($"and ProductId = {model.Product} ");

            if (!string.IsNullOrEmpty(model.MobileNumber))
                query.Append($"and (CustomerMobile1 = '{model.MobileNumber}' or CustomerMobile2 = '{model.MobileNumber}' or CustomerPhone1 = '{model.MobileNumber}' or CustomerPhone2 = '{model.MobileNumber}') ");

            if (!string.IsNullOrEmpty(model.PolicyStartDateFrom) && !string.IsNullOrEmpty(model.PolicyStartDateTo))
            {
                DateTime policyStartDateFrom = DateTime.ParseExact(model.PolicyStartDateFrom, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                DateTime policyStartDateTo = DateTime.ParseExact(model.PolicyStartDateTo, "MM/dd/yyyy", CultureInfo.InvariantCulture);

                query.Append($"and StartDate between convert(date,'{policyStartDateFrom.Date}', 103) and convert(date,'{policyStartDateTo.Date}', 103) ");
            }

            if (!string.IsNullOrEmpty(model.PolicyEndDateFrom) && !string.IsNullOrEmpty(model.PolicyEndDateTo))
            {
                DateTime policyEndDateFrom = DateTime.ParseExact(model.PolicyEndDateFrom, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                DateTime policyEndDateTo = DateTime.ParseExact(model.PolicyEndDateTo, "MM/dd/yyyy", CultureInfo.InvariantCulture);

                query.Append($"and ExpiryDate between convert(date,'{policyEndDateFrom.Date}', 103) and convert(date,'{policyEndDateTo.Date}' , 103) ");
            }

            return query.ToString();
        }

        public async Task<string> GenerateVoucherNumber(string branchCode, int branchId)
        {
            string lastVoucherNumber = await _dataContext.tblVoucherDetails.Where(w => w.BranchId == branchId).OrderByDescending(o => o.VoucherId).Select(s => s.VoucherNo).FirstOrDefaultAsync();
            if (!string.IsNullOrEmpty(lastVoucherNumber))
            {
                string voucherNumberString = lastVoucherNumber.Split('/').LastOrDefault();
                int.TryParse(voucherNumberString, out int voucherNumber);

                string yearString = lastVoucherNumber.Split('/').FirstOrDefault() ?? string.Empty;
                DateTime currentDate = DateTime.Now;
                if (currentDate.Month < 4)
                {
                    currentDate = currentDate.AddYears(-1);
                }
                string newPossibleYearString = $"{currentDate:yy}-{currentDate.AddYears(1):yy}";

                if (yearString.Equals(newPossibleYearString))
                {
                    return $"{currentDate:yy}-{currentDate.AddYears(1):yy}/{branchCode}/{(voucherNumber + 1).ToString().PadLeft(5, '0')}";
                }
                else
                {
                    voucherNumber = 0;
                    return $"{currentDate:yy}-{currentDate.AddYears(1):yy}/{branchCode}/{(voucherNumber + 1).ToString().PadLeft(5, '0')}";
                }
            }
            else if (string.IsNullOrEmpty(lastVoucherNumber))
            {
                DateTime currentDate = DateTime.Now;
                return $"{currentDate:yy}-{currentDate.AddYears(1):yy}/{currentDate:MM}/00001"; ;
            }
            else
                return null;
        }

        public async Task<List<VerticalDto>> FindAllVerticals() => await _dataContext.tblVertical.Where(w => w.IsActive).Select(s => new VerticalDto
        {
            VerticalId = s.VerticalId,
            VerticalName = s.VerticalName,
        })
        .OrderBy(o => o.VerticalName)
        .AsNoTracking()
        .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllProducts(int verticalId) => await _dataContext.tblProduct.Where(w => w.VerticalId == verticalId && w.IsActive)
                                                                                                                   .Select(s => new DropDownDto<int>
                                                                                                                   {
                                                                                                                       Name = s.ProductName,
                                                                                                                       Value = s.ProductId
                                                                                                                   })
                                                                                                                   .OrderBy(o => o.Name)
                                                                                                                   .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindClaimsType(int verticalId) => await _dataContext.tblClaimType.Where(w => w.VerticalId == verticalId && w.IsActive)
                                                                                                                    .Select(s => new DropDownDto<int>
                                                                                                                    {
                                                                                                                        Name = s.ClaimType,
                                                                                                                        Value = s.ClaimTypeId
                                                                                                                    })
                                                                                                                    .OrderBy(o => o.Name)
                                                                                                                    .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllClaimsStatus() => await _dataContext.tblClaimStatus.Where(w => w.IsActive)
                                                                                                                   .Select(s => new DropDownDto<int>
                                                                                                                   {
                                                                                                                       Name = s.ClaimStatus,
                                                                                                                       Value = s.ClaimStatusId
                                                                                                                   })
                                                                                                                   .OrderBy(o => o.Name)
                                                                                                                   .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllClaimsSubStatus(int claimsStatusId) => await _dataContext.tblClaimSubStatus.Where(w => w.ClaimStatusId == claimsStatusId && w.IsActive)
                                                                                                                  .Select(s => new DropDownDto<int>
                                                                                                                  {
                                                                                                                      Name = s.ClaimSubStatus,
                                                                                                                      Value = s.ClaimSubStatusId
                                                                                                                  })
                                                                                                                  .OrderBy(o => o.Name)
                                                                                                                  .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllInspectionStatus() => await _dataContext.tblInspectionStatus.Where(w => w.IsActive)
                                                                                                                     .Select(s => new DropDownDto<int>
                                                                                                                     {
                                                                                                                         Name = s.InspectionStatus,
                                                                                                                         Value = s.InspectionStatusId
                                                                                                                     })
                                                                                                                     .OrderBy(o => o.Name)
                                                                                                                     .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllInspectionSubStatus(int inspectionStatusId) => await _dataContext.tblInspectionSubStatus.Where(w => w.InspectionStatusId == inspectionStatusId && w.IsActive)
                                                                                                                  .Select(s => new DropDownDto<int>
                                                                                                                  {
                                                                                                                      Name = s.InspectionSubStatus,
                                                                                                                      Value = s.InspectionSubStatusId
                                                                                                                  })
                                                                                                                  .OrderBy(o => o.Name)
                                                                                                                  .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllInspectionReasons() => await _dataContext.tblInspectionReason.Where(w => w.IsActive.HasValue && w.IsActive.Value)
                                                                                                                       .Select(s => new DropDownDto<int>
                                                                                                                       {
                                                                                                                           Name = s.InspectionReason,
                                                                                                                           Value = s.InspectionReasonId
                                                                                                                       })
                                                                                                                       .OrderBy(o => o.Name)
                                                                                                                       .ToListAsync();

        public async Task<List<tblMenuItem>> GetMenus()
        {
            List<tblMenuItem> lst = new List<tblMenuItem>();
            lst = await _dataContext.tblMenuItem.Where(x=>x.ParentNode==null).ToListAsync();
            return lst;
        }

        public async Task<List<DropDownDto<int>>> FindAllProducts() => await _dataContext.tblProduct.Where(w => w.IsActive)
                                                                                           .Select(s => new DropDownDto<int>
                                                                                           {
                                                                                               Name = s.ProductName,
                                                                                               Value = s.ProductId
                                                                                           })
                                                                                           .OrderBy(o => o.Name)
                                                                                           .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllPlans(int _productId, int insuranceCompanyId, int verticalId)
        {
            var data = new List<DropDownDto<int>>();
            if (insuranceCompanyId != 0)
            {
                 data = await _dataContext.tblPlan.
                     Where(w => w.IsActive && w.ProductId == _productId && w.InsuranceCompanyId == insuranceCompanyId && w.VerticalId == verticalId)
                .Select(s => new DropDownDto<int>
                {
                    Name = s.PlanName,
                    Value = s.PlanId
                })
                .OrderBy(o => o.Name)
                .ToListAsync();
            }
            else
            {
                 data = await _dataContext.tblPlan.
                         Where(w => w.IsActive && w.ProductId == _productId  && w.VerticalId == verticalId)
                    .Select(s => new DropDownDto<int>
                    {
                        Name = s.PlanName,
                        Value = s.PlanId
                    })
                    .OrderBy(o => o.Name)
                    .ToListAsync();
            }
            return data;
        }

        public async Task<List<DropDownDto<int>>> FindAllPlanTypes() => await _dataContext.tblPlanType.Where(w => w.IsActive)
                                                                                           .Select(s => new DropDownDto<int>
                                                                                           {
                                                                                               Name = s.PlanTypeName,
                                                                                               Value = s.PlanTypeId
                                                                                           })
                                                                                           .OrderBy(o => o.Name)
                                                                                           .ToListAsync();
        public async Task<List<DropDownDto<int>>> FindAllPortability() => await _dataContext.tblPortability.Where(w => w.IsActive)
                                                                                           .Select(s => new DropDownDto<int>
                                                                                           {
                                                                                               Name = s.Portability,
                                                                                               Value = s.PortabilityId
                                                                                           })
                                                                                           .OrderBy(o => o.Name)
                                                                                           .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllRisks() => await _dataContext.tblRiskClass.Where(w => w.IsActive)
                                                                                          .Select(s => new DropDownDto<int>
                                                                                          {
                                                                                              Name = s.RiskClassName,
                                                                                              Value = s.RiskClassId
                                                                                          })
                                                                                          .OrderBy(o => o.Name)
                                                                                          .ToListAsync();
        public async Task<List<DropDownDto<int>>> FindAllPpcData()
        {
            List<DropDownDto<int>> result = await _dataContext.tblPPC.Select(s => new DropDownDto<int>
            {
                Name = s.PPC,
                Value = s.PPCId
            }).OrderBy(o => o.Value).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

                                                                                          
        public async Task<List<DropDownDto<int>>> FindAllPedData()
        {
            List<DropDownDto<int>> result = await _dataContext.tblPED.Select(s => new DropDownDto<int>
            {
                Name = s.PED,
                Value = s.PEDId
            }).OrderBy(o =>o.Value).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<List<DropDownDto<int>>> FindAllCoverage()
        {
            List<DropDownDto<int>> result = await _dataContext.tblCoverage.Select(s => new DropDownDto<int>
            {
                Name = s.CoverageName,
                Value = s.CoverageId
            }).OrderBy(o => o.Value).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<List<DropDownDto<int>>> FindAllOccupancy()
        {
            List<DropDownDto<int>> result = await _dataContext.tblOccupation.Select(s => new DropDownDto<int>
            {
                Name = s.OccupationName,
                Value = s.OccupationId
            }).OrderBy(o => o.Value).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<List<DropDownDto<int>>> FindAllBasementExposure()
        {
            List<DropDownDto<int>> result = await _dataContext.tblBasementExposer.Select(s => new DropDownDto<int>
            {
                Name = s.BasementExposer,
                Value = s.BasementExposerId
            }).OrderBy(o => o.Value).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<List<DropDownDto<int>>> FindAllProfession()
        {
            List<DropDownDto<int>> result = await _dataContext.tblProfession.Select(s => new DropDownDto<int>
            {
                Name = s.ProfessionName,
                Value = s.ProfessionId
            }).OrderBy(o => o.Value).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<List<DropDownDto<int>>> FindVoyageType()
        {
            List<DropDownDto<int>> result = await _dataContext.tblVoyageType.Select(s => new DropDownDto<int>
            {
                Name = s.VoyageType,
                Value = s.VoyageTypeId            
            }).OrderBy(o => o.Value).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<List<DropDownDto<int>>> FindCoverageInland()
        {
            List<DropDownDto<int>> result = await _dataContext.tblCoverageInland.Select(s => new DropDownDto<int>
            {
                Name = s.CoverageInland,
                Value = s.CoverageInlandId
            }).OrderBy(o => o.Value).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }
        

        public async Task<List<DropDownDto<int>>> FindStorageRiskId()
        {
            List<DropDownDto<int>> result = await _dataContext.tblStorageRisk.Select(s => new DropDownDto<int>
            {
                Name = s.StorageRisk,
                Value = s.StorageRiskId
            }).OrderBy(o => o.Value).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<List<DropDownDto<int>>> FindAllUserRole(int branchId)
        {
            List<DropDownDto<int>> result = await _dataContext.tblUserRole.Where(x => x.BranchId == branchId).Select(s => new DropDownDto<int>
            {
                Name = s.UserRoleName,
                Value = s.UserRoleId
            }).OrderBy(o => o.Value).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<List<DropDownDto<int>>> FindAllUserType()
        {
            List<DropDownDto<int>> result = await _dataContext.tblUserType.Select(s => new DropDownDto<int>
            {
                Name = s.UserTypeName,
                Value = s.UserTypeId
            }).OrderBy(o => o.Value).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<DataTableDto<List<UserDetailDto>>> FindAllUser(int branchId)
        {
            List<UserDetailDto> result = await (from user in _dataContext.tblUser
                                           join teamMember in _dataContext.tblTeamMember on user.TeamMemberId equals teamMember.TeamMemberId
                                           join userRole in _dataContext.tblUserRole on user.UserRoleId equals userRole.UserRoleId into userrole
                                           join branch in _dataContext.tblBranch on user.BranchId equals branch.BranchId into branchs
                                           join reportedTo in _dataContext.tblTeamMember on user.ReportedTo equals reportedTo.TeamMemberId into reportedto
                                            from userRole in userrole.DefaultIfEmpty()
                                            from branch in branchs.DefaultIfEmpty()
                                            from reportedTo in reportedto.DefaultIfEmpty()
                                                select new UserDetailDto
                                           {
                                               BranchName =  branch.BranchName,
                                               UserName = user.UserName,
                                               TeamMember =  teamMember.TeamMemberName,
                                               UserRole =  userRole.UserRoleName,
                                               EmailId =  teamMember.TeamMemberEmail1,
                                               MobileNumber =  teamMember.TeamMemberPhone1,
                                               Seniority =  teamMember.LevelNumber,
                                               IsActive = teamMember.IsActive,
                                               IsLocked  = user.IsLocked,
                                               TeamMemberId = user.TeamMemberId,
                                               UserRoleId = user.UserRoleId,
                                               UserId = user.UserId,
                                               UserPassword = user.UserPassword,
                                               BranchId = user.BranchId,
                                               ReportedTo = user.ReportedTo,
                                               ReportedToName =  reportedTo.TeamMemberName
                                                }).Where(x=>x.BranchId == branchId).OrderBy(x=>x.IsActive).ThenBy(x => x.UserRole).ThenBy(x => x.TeamMember).ToListAsync();
            return new DataTableDto<List<UserDetailDto>>
            {
                TotalCount = result.Count(),
                Data = result
            };
        }

        public async Task<List<DropDownDto<int>>> FindAllTeamMember(int branchId)
        {
            List<DropDownDto<int>> result = await _dataContext.tblTeamMember.Where(x => x.BranchId == branchId).Select(s => new DropDownDto<int>
            {
                Name = s.TeamMemberName,
                Value = s.TeamMemberId
            }).OrderBy(o => o.Value).ToListAsync();
            return _mapper.Map<List<DropDownDto<int>>>(result);
        }

        public async Task<dynamic> FindTeamMemberById(int teamMemberId)
        {
           var team =  await _dataContext.tblTeamMember.Where(w => w.IsActive && w.TeamMemberId == teamMemberId).Select(s => new{
               s.TeamMemberEmail1,s.TeamMemberMobile1
               }).FirstOrDefaultAsync();
           return team;
        }
    }
}