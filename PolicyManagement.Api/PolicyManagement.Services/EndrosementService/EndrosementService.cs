using AutoMapper;
using DocumentFormat.OpenXml.Office.Word;
using log4net;
using PolicyManagement.Dtos.Common;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Endrosement;
using PolicyManagement.Models.Report;
using PolicyManagement.Services.Base;
using PolicyManagement.Services.EndrosementService.Interface;
using PolicyManagement.Services.Reports.Interface;
using PolicyManagement.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Data.Entity.Migrations;
using System.Globalization;
using DocumentFormat.OpenXml.EMMA;

namespace PolicyManagement.Services.EndrosementService
{
    public class EndrosementService : BaseService, IEndrosementService
    {
        private readonly ILog log = LogManager.GetLogger("API Logger");

        public EndrosementService(DataContext dataContext,

                            IMapper mapper) : base(dataContext, mapper)
        {
            dataContext.Configuration.ProxyCreationEnabled = false;

        }

        public async Task<DataTableDto<List<dynamic>>> FindPolicyData(EndrosementModalFilter agentSwapFilter)
        {


            var filteredResult = (from policy in _dataContext.tblMotorPolicyDatas
                                  join c in _dataContext.tblCustomer on policy.CustomerId equals c.CustomerId

                                  join vertical in _dataContext.tblVertical on policy.VerticalId equals vertical.VerticalId
                                  join policyType in _dataContext.tblPolicyType on policy.PolicyTypeId equals policyType.PolicyTypeId
                                  join branch in _dataContext.tblBranch on policy.BranchId equals branch.BranchId into branchJoin
                                  from branch in branchJoin.DefaultIfEmpty()
                                  join pos in _dataContext.tblPOS on policy.POSId equals pos.POSId into posJoin
                                  from pos in posJoin.DefaultIfEmpty()
                                  join manufacturer in _dataContext.tblManufacturers on policy.ManufacturerId equals manufacturer.ManufacturerId into manufacturerJoin
                                  from manufacturer in manufacturerJoin.DefaultIfEmpty()
                                  join varient in _dataContext.tblVariant on policy.ManufacturerId equals varient.VariantId into varientJoin
                                  from varient in varientJoin.DefaultIfEmpty()
                                  join insuranceCompany in _dataContext.tblInsuranceCompany on policy.InsuranceCompanyId equals insuranceCompany.InsuranceCompanyId into insuranceCompanyJoin
                                  from insuranceCompany in insuranceCompanyJoin.DefaultIfEmpty()
                                  join model in _dataContext.tblModel on policy.ModelId equals model.ModelId into modelJoin
                                  from model in modelJoin.DefaultIfEmpty()

                                  join product in _dataContext.tblProduct on policy.ProductId equals product.ProductId into productJoin
                                  from product in productJoin.DefaultIfEmpty()

                                  join plan in _dataContext.tblPlan on policy.PlanId equals plan.ProductId into planJoin
                                  from plan in planJoin.DefaultIfEmpty()

                                  join ncb in _dataContext.tblNCB on policy.NCBId equals ncb.NCBId into ncbs
                                  from ncb in ncbs.DefaultIfEmpty()

                                  join planType in _dataContext.tblPlanType on policy.PlanTypeId equals (short)planType.PlanTypeId into planTypeJoin
                                  from planType in planTypeJoin.DefaultIfEmpty()

                                  where (agentSwapFilter.InsuranceCompany == 0 || insuranceCompany.InsuranceCompanyId == agentSwapFilter.InsuranceCompany) &&
                                  (string.IsNullOrEmpty(agentSwapFilter.CustomerName) || policy.NameInPolicy == agentSwapFilter.CustomerName) &&
                                  (agentSwapFilter.PosNameId == 0 || pos.POSId == agentSwapFilter.PosNameId)

                                  && branch.BranchId == agentSwapFilter.BranchId
                                  && (agentSwapFilter.VerticalId == (int)Vertical.Motor ? policy.VerticalId == (short)Vertical.Motor : policy.VerticalId != (short)Vertical.Motor)
                                  && policy.IsVerified == true

                                  select new PolicyResult
                                  {
                                      PolicyId = policy.PolicyId,
                                      ControlNo = policy.ControlNo,
                                      VerticalId = policy.VerticalId,
                                      NameInPolicy = policy.NameInPolicy,
                                      RegistrationNo = policy.RegistrationNo,
                                      GrossPremium = policy.GrossPremium,
                                      BranchCode = branch != null ? branch.BranchCode : null,
                                      ManufacturerName = manufacturer != null ? manufacturer.ManufacturerName : null,
                                      POSName = pos != null ? pos.POSName : null,
                                      PolicyStartDate = policy.PolicyStartDate,
                                      PolicyEndDate = policy.PolicyEndDate,
                                      ExpiryDate = policy.PolicyPackageTypeId == 1 ? policy.PolicyEndDate :                         policy.PolicyEndDateOD,
                                      StartDate = policy.PolicyPackageTypeId == 1 ? policy.PolicyStartDate :policy.PolicyStartDateOD,
                                      PolicyNumber = policy.PolicyNo,
                                      InsuranceCompanyName = insuranceCompany != null ? insuranceCompany.InsuranceCompanyName : null,
                                      PolicyRemarks = policy.PolicyRemarks,
                                      CreatedBy = policy.CreatedBy,
                                      RenewalDone = policy.RenewalDone ?? false,
                                      VerticalSegmentId = policy.VerticalSegmentId,
                                      ModelName = model != null ? model.ModelName : null,
                                      TotalIDV = policy.TotalIDV,
                                      VariantName = varient != null ? varient.VariantName : null,
                                      ReferenceId = policy.ReferenceId,
                                      TeleCallerId = policy.TeleCallerId,
                                      FOSId = policy.FOSId,
                                      POSId = policy.POSId,
                                      PlanName = plan != null ? plan.PlanName : null,
                                      ProductName = product != null ? product.ProductName : null,
                                      VerticalName = vertical.VerticalName,
                                      InsuranceCompanyId = policy.InsuranceCompanyId,
                                      ProductId = policy.ProductId,
                                      CustomerName = c.CustomerName,
                                      NCBPercentage = ncb != null ? ncb.NCBPercentage : 0,
                                      CoverNoteNo = policy.CoverNoteNo,
                                      PolicyTypeId = policy.PolicyTypeId,
                                      PlanTypeName = planType != null ? planType.PlanTypeName : null,
                                      controlNumberDigit = 0 // Default value

                                  }
                                 ).ToList<dynamic>();

            if (!string.IsNullOrEmpty(agentSwapFilter.number))
            {
                filteredResult.ForEach(x => { x.controlNumberDigit = convertToDigit(x.ControlNo); });
                if (agentSwapFilter.number.Length < 7)
                {
                    var lastdigit = Convert.ToDouble(agentSwapFilter.number) % 100000;
                   
                    filteredResult = filteredResult.Where(x => x.controlNumberDigit == lastdigit).ToList();
                }
                else
                {
                    filteredResult = filteredResult.Where(x => x.ControlNo == agentSwapFilter.number).ToList();

                }
            }
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = filteredResult.Count(),
                Data = filteredResult,
            };
        }
        public double convertToDigit(string ControlNo)
        {
            return Convert.ToDouble(ControlNo.Substring(ControlNo.Length - 6)); 
        }
        public async Task<CommonDto<object>> AddUpdateEndrosementMaster(EndorsementMasterModel model, BaseModel baseModel)
        {
            try
            {
               // var EndrosementDate = DateTime.ParseExact(model.EndrosementDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);


                tblMotorPolicyData motorPolicyData = await _dataContext.tblMotorPolicyDatas.FirstOrDefaultAsync(f => f.PolicyId == model.PolicyId);
                var endrosementData = new tblEndorsementData();

                endrosementData.PolicyId =  model.PolicyId;
                endrosementData.EndorsementTypeId = model.EndrosementType;
                endrosementData.EndorsementReasonId = model.EndrosementReason;
                endrosementData.BranchId = model.BranchId;
                endrosementData.CreatedBy = baseModel.LoginUserId;
                endrosementData.CreatedTime =  DateTime.Now;
                endrosementData.EndorsementEntryDate = DateTime.Now;
                endrosementData.EndorsementDate = DateTime.Now;

                endrosementData.IsActive = true;
                endrosementData.PolicyTypeId = model.PolicyTypeId;
                if (model.EndorsementId != 0)
                {
                    endrosementData.EndorsementId = model.EndorsementId;

                }
                var totalIdv = 0;
                if (motorPolicyData == null) return new CommonDto<object>
                {
                    Message = "Invalid Policy Id"
                };

                

                

                if (model.ManufactureId != 0)
                {
                    motorPolicyData.ManufacturerId = model.ManufactureId;
                    endrosementData.NewManufacturerId = model.ManufactureId;
                }

                if (model.OD.HasValue)
                {

                    motorPolicyData.EndorseOD = model.OD;
                    endrosementData.AmtODChange = model.OD;
                    motorPolicyData.TotalOD = model.OD + motorPolicyData.TotalOD;

                }

                if (model.GrossPremium.HasValue)
                {
                    motorPolicyData.EndorseGrossPremium = model.GrossPremium;
                    endrosementData.AmtGrossPremiumChange = model.GrossPremium;
                    motorPolicyData.TotalGrossPremium = model.GrossPremium + motorPolicyData.TotalGrossPremium;
                }

                if (model.ShortfallAmount.HasValue || !string.IsNullOrEmpty(model.ShortfallVoucherNo))
                {
                   
                    var existingtblVoucher = _dataContext.tblVoucherDetails.Where(x=>x.PolicyId == model.PolicyId).FirstOrDefault();
                    var tblVoucherDetails = new tblVoucherDetails();
                    if (existingtblVoucher != null)
                    {
                        tblVoucherDetails.VoucherId = existingtblVoucher.VoucherId ;
                    }
                    endrosementData.EndoresementShortfallAmt = model.ShortfallAmount;
                    endrosementData.EndoresementShortfallVoucherNo = model.ShortfallVoucherNo;
                    tblVoucherDetails.PolicyId = model.PolicyId;
                    tblVoucherDetails.PolicyNo = motorPolicyData.PolicyNo;
                    tblVoucherDetails.BranchId = model.BranchId;
                    tblVoucherDetails.VoucherAmount = (int)model.ShortfallAmount;
                    tblVoucherDetails.VoucherNo = model.ShortfallVoucherNo;
                    tblVoucherDetails.InsuranceCompanyId = motorPolicyData.InsuranceCompanyId ?? 0;
                    tblVoucherDetails.CustomerId= motorPolicyData.CustomerId;
                    tblVoucherDetails.CustomerName = motorPolicyData.NameInPolicy;
                    tblVoucherDetails.VoucherTypeId = 1;
                    tblVoucherDetails.VoucherStatusId = 1;
                    tblVoucherDetails.POSId = motorPolicyData.POSId;
                    tblVoucherDetails.ReferenceId = motorPolicyData.ReferenceId;
                    tblVoucherDetails.ControlNo = motorPolicyData.ControlNo;
                    tblVoucherDetails.CreatedBy = baseModel.LoginUserId;
                    tblVoucherDetails.CreatedTime = DateTime.Now;
                    tblVoucherDetails.VoucherDate =  DateTime.Now;
                   _dataContext.tblVoucherDetails.AddOrUpdate(tblVoucherDetails);

                }

                if (model.ElectricAccessoriesIDV.HasValue)
                {
                    motorPolicyData.ElectricAssessoriesIDV = model.ElectricAccessoriesIDV;
                    totalIdv += model.ElectricAccessoriesIDV ?? 0;

                }

                if (model.NonElectricAccessoriesIDV.HasValue)
                {
                    motorPolicyData.NonElectricAssessoriesIDV = model.NonElectricAccessoriesIDV;
                    totalIdv += model.NonElectricAccessoriesIDV ?? 0;
                }

                if (model.Cngidv.HasValue)
                {
                    if(endrosementData.EndorsementReasonId == (short)EndorsementReason.RemovalOfCNGLPG || endrosementData.EndorsementReasonId == (short)EndorsementReason.RemovalOfIDV)
                    {
                        motorPolicyData.CNGIDV  = motorPolicyData.CNGIDV -  model.Cngidv;
                        totalIdv -= model.Cngidv?? 0;
                    }
                    else
                    {
                        motorPolicyData.CNGIDV = model.Cngidv;
                        totalIdv += model.Cngidv ?? 0;

                    }
                }

                if (model.VehicleIdv.HasValue)
                {
                    if (endrosementData.EndorsementReasonId == (short)EndorsementReason.RemovalOfCNGLPG || endrosementData.EndorsementReasonId == (short)EndorsementReason.RemovalOfIDV)
                    {
                        motorPolicyData.VehicleIDV = motorPolicyData.VehicleIDV - model.VehicleIdv;
                        totalIdv -= model.VehicleIdv ?? 0;
                    }
                    else
                    {
                        motorPolicyData.VehicleIDV = model.VehicleIdv;
                        totalIdv += model.VehicleIdv ?? 0;
                    }
                }

                if (model.NcbPercentage.HasValue)
                {
                    motorPolicyData.NCBId = model.NcbPercentage ?? 0;
                    endrosementData.NewNCBId = model.NcbPercentage;
                }

                if (model.BounceReason != 0)
                    endrosementData.BounceReasonId = model.BounceReason;

                if (model.ChequeBounceDate.HasValue)
                    endrosementData.BounceDate = model.ChequeBounceDate.Value.ToLocalTime();

                if (model.OdRecoverable.HasValue)
                {
                    motorPolicyData.EndorseOD = model.OdRecoverable;
                    endrosementData.AmtODChange = model.OdRecoverable;
                }

                if (model.PremiumRecoverable.HasValue)
                {
                    motorPolicyData.EndorseGrossPremium = model.PremiumRecoverable;
                    endrosementData.AmtGrossPremiumChange = model.PremiumRecoverable;
                }

                if (model.VehicleClassId.HasValue)
                {
                    motorPolicyData.VehicleClassId = model.VehicleClassId ?? 0;
                    endrosementData.NewVehicleClassId = model.VehicleClassId;
                }

                if (model.ModelId.HasValue)
                {
                    motorPolicyData.ModelId = model.ModelId ?? 0;
                    endrosementData.NewModelId = model.ModelId;
                }

                if (model.Variant.HasValue)
                {
                    motorPolicyData.VariantId = model.Variant ?? 0;
                    endrosementData.NewVariantId = model.Variant;
                }

                if (!string.IsNullOrWhiteSpace(model.Remark))
                {
                    endrosementData.EndorsementRemark = model.Remark;
                    motorPolicyData.PolicyRemarks = motorPolicyData.PolicyRemarks + " " + model.Remark;
                }

                if (model.AddOnRiderId.HasValue)
                {
                    motorPolicyData.AddonRiderId = model.AddOnRiderId ?? 0;
                    endrosementData.NewAddOnPlanId = model.AddOnRiderId;
                }

                if (model.RiskExpireDate.HasValue)
                {
                    if(motorPolicyData.PolicyPackageTypeId == 1)
                    {
                        motorPolicyData.PolicyEndDate = model.RiskExpireDate.Value.ToLocalTime();
                    }
                    else
                    {
                        motorPolicyData.PolicyEndDateOD = model.RiskExpireDate.Value.ToLocalTime();
                    }
                }

                if (model.RtoZone.HasValue)
                {
                    motorPolicyData.RTOZoneId = model.RtoZone ?? 0;
                    endrosementData.RTOZoneId = model.RtoZone;
                }

                if (model.RiskZone.HasValue)
                {
                  //  endrosementData.Ris = model.RtoZone;
                }

                if(model.AlternateInceptionDate.HasValue)
                {
                    endrosementData.AlternateInceptionDate = model.AlternateInceptionDate.Value.ToLocalTime();
                }

                if (model.AlternateInsuranceCompanyId.HasValue)
                {
                    endrosementData.AlternateInsureCompanyId = model.AlternateInsuranceCompanyId;
                }

                if (!string.IsNullOrEmpty(model.AlternatePolicyNumber))
                {
                    endrosementData.AlternatePolicyNo = model.AlternatePolicyNumber;
                }

                if (model.PolicyReinstate)
                {
                    endrosementData.PolicyReinstate = model.PolicyReinstate;
                    endrosementData.EndorsementReasonId = (short)EndorsementReason.PolicyReinstateChequeBounce;
                    motorPolicyData.Flag1 = true;
                    motorPolicyData.PolicyCancelReasonId = null;
                    motorPolicyData.PolicyCancelDate= null;
                }
                 if (model.CancelledNCBRecoverable)
                {
                    endrosementData.NCBRecoveredCancel = (short?)((bool)model.CancelledNCBRecoverable ? 1 : 0);
                    endrosementData.EndorsementReasonId = (short)EndorsementReason.NCBRecoverableCancel;
                }
                  if (model.NCBRecovered)
                {
                    endrosementData.NCBRecovered = model.NCBRecovered;
                    endrosementData.EndorsementReasonId = (short)EndorsementReason.NCBRecoveredCancel;

                }
                motorPolicyData.TotalIDV = motorPolicyData.TotalIDV + totalIdv;


                if (!string.IsNullOrWhiteSpace(model.RegistrationNumber))
                    motorPolicyData.RegistrationNo = model.RegistrationNumber;

                endrosementData.IDVChange = totalIdv;
                motorPolicyData.ModifiedBy = baseModel.LoginUserId;
                motorPolicyData.ModifiedTime = DateTime.Now;
                
                if (( !model.PolicyReinstate ||  !model.NCBRecovered || !model.CancelledNCBRecoverable) && !model.IsModified
                    && (model.EndrosementReason  != (int)EndorsementReason.NCBRecovered &&
              model.EndrosementReason != (int)EndorsementReason.NCBRecoverable &&
              model.EndrosementReason != (int)EndorsementReason.CancellationChequeBounce))
                {
                    var endrosementDataList = _dataContext.tblEndorsementData.Where(x => x.PolicyId == model.PolicyId).ToList();
                    var isduplicateEndroement = endrosementDataList.Select(x => x.EndorsementReasonId == model.EndrosementReason).Count();
                    if (isduplicateEndroement > 0)
                    {
                        return new CommonDto<object>
                        {
                            Message = "Selected Endrosement Reason entry already present"
                        };
                    }
                }
                else if ((model.PolicyReinstate || model.NCBRecovered || model.CancelledNCBRecoverable) && model.IsModified
                    && (model.EndrosementReason == (int)EndorsementReason.NCBRecovered ||
                      model.EndrosementReason == (int)EndorsementReason.NCBRecoverable ||
                      model.EndrosementReason == (int)EndorsementReason.CancellationChequeBounce))
                {
                    endrosementData.EndorsementId = 0;
                }
                _dataContext.tblEndorsementData.AddOrUpdate(endrosementData);
                if (isCancellationReason(model.EndrosementReason) && !model.PolicyReinstate)
                {
                    motorPolicyData.PolicyCancelReasonId = model.EndrosementReason;
                    motorPolicyData.Flag1 = false;
                    motorPolicyData.PolicyCancelDate= DateTime.Now;

                }

                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = model.IsModified ?  $"Endrosement successfully Modified": $"Endrosement Successfully Saved",
                };
            }
            catch (DbUpdateException ex)
            {
                log.Error(ex.GetBaseException());
                return new CommonDto<object>
                {

                    Message = ex.GetBaseException().Message,
                };
            }
            catch (Exception ex)
            {
                log.Error(ex);
                return new CommonDto<object>
                {

                    Message = ex.Message
                };
            }

        }


        public async Task<dynamic> GetPreviousEndromentInfo(int policyId)
        {
            var res = await _dataContext.tblEndorsementData.Join(_dataContext.tblEndorsementReason, T1 => T1.EndorsementReasonId, T2 => T2.EndorsementReasonId, (T1, T2) => new { T1, T2.EndorsementReason }).Select(x=>new
            {
                x.T1.AmtGrossPremiumChange, x.T1.AmtODChange,x.T1.EndorsementEntryDate,x.EndorsementReason,x.T1.IsActive,x.T1.PolicyId,x.T1.EndorsementRemark,x.T1
            }).Where(w => w.T1.IsActive == true && w.T1.PolicyId == policyId).ToListAsync();
            return res;
        }

        public bool isCancellationReason(short endorsementReason) {
            var cancellationReasons = new int[]{
              (int)EndorsementReason.CancellationChequeBounce,
              (int)EndorsementReason.CancellationTheft,
              (int)EndorsementReason.CancellationTotalLoss,
              (int)EndorsementReason.CancellationNCBFalsificationForfeit,
               (int)EndorsementReason.CancellationCustomerRequest,
               (int)EndorsementReason.CancellationDoubleInsuranceByInsCo,
               (int)EndorsementReason.CancellationVehicleNotDelivered,
              (int)EndorsementReason.CancellationByInsuranceCompany,
              (int)EndorsementReason.CancellationNCBReservingFalsificationRefund,
               (int)EndorsementReason.CancellationDoubleEntryMistakeInSoftware,
               (int)EndorsementReason.CancellationWrongRiskDate,
               (int)EndorsementReason.CancellationVehicleSold,
              (int)EndorsementReason.CancellationAsPerCommissionStatementSMS,
               (int)EndorsementReason.CancellationNonDisclosureHealth,
               (int)EndorsementReason.CancellationChangeOfPlanTravel,
               (int)EndorsementReason.CancellationTripCancelledTravel,
               (int)EndorsementReason.CancellationCaseRejectedByCompany,
               (int)EndorsementReason.CancellationNCBFalsificationShortScale
            };

            return cancellationReasons.Contains(endorsementReason);
        }
    }
}

