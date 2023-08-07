using AutoMapper;
using Newtonsoft.Json;
using PolicyManagement.Dtos.Common;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Customer;
using PolicyManagement.Services.Base;
using PolicyManagement.Services.Common.Interface;
using PolicyManagement.Utilities.Constants;
using PolicyManagement.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Migrations;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.Remoting.Contexts;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using log4net;
using System.Security.Cryptography;
using PolicyManagement.Models.Health;
using PolicyManagement.Models.Motor;
using System.Xml.Linq;
using System.Reflection;
using System.Numerics;
using PolicyManagement.Models.Commercial;
using PolicyManagement.Services.Commercial.Interface;
using System.Data.Entity.Infrastructure;

namespace PolicyManagement.Services.Commercial
{
    public class CommercialService : BaseService, ICommercialService
    {
        private readonly ICommonService _commonService;
        private readonly ILog log = LogManager.GetLogger("API Logger");

        public CommercialService(DataContext dataContext,
                            ICommonService commonService,
                            IMapper mapper) : base(dataContext, mapper)
        {
            _commonService = commonService;
        }
        public async Task<CommonDto<object>> CreateCommercialPolicy(CommercialPolicyFormDataModel model, BaseModel baseModel)
        {
            short DefaultRToZoneId = 1;
            using (var dbContextTransaction = _dataContext.Database.BeginTransaction())
            {
                try
                {
                    CommonDto<object> dataValidation = await ValidateData(model);
                    if (!dataValidation.IsSuccess) return dataValidation;

                    string controlNumber = await _commonService.GenerateControlNumber(model.BranchId, model.VerticalCode);
                    if (string.IsNullOrEmpty(controlNumber))
                        return new CommonDto<object>
                        {
                            Message = "System Generate Invalid Control Number"
                        };


                    #region Insert Policy Data
                    tblMotorPolicyData motorPolicyData = new tblMotorPolicyData
                    {
                        PolicyId = model.PolicyId,
                        NameInPolicy = model.Customer.NameInPolicy,
                        AddressInPolicy = model.Customer.AddressInPolicy,
                        CustomerType = model.Customer.CustomerType,
                        PAN = model.Customer.Pan,
                        GSTIN = model.Customer.Gstin,
                        CustomerId = model.Customer.CustomerId,
                        PolicyTypeId = model.PolicyTerm.PolicyType,
                        VehicleClassId = model.PolicyTerm.VehicleClass,
                        PolicyPackageTypeId = model.PolicyTerm.PackageTypeId,
                        PolicyPackageType = model.PolicyTerm.PackageType,
                        PolicyTermId = model.PolicyTerm.PolicyTerm,
                        AkgSlipNo = model.PolicyTerm.AcknowledgementSlipNumber,
                        InsuranceCompanyId = model.TpPolicy.InsuranceCompany,
                        PolicyNo = model.TpPolicy.PolicyNumber,
                        NoofYearId = model.TpPolicy.NumberOfYear,
                        InsuranceCompanyODId = model.OdPolicy.InsuranceCompany,
                        PolicyNoOD = model.OdPolicy.PolicyNumber,
                        NoofYearODId = model.OdPolicy.NumberOfYear,
                        PreviousInsuranceCompanyId = model.PreviousPolicy.LastYearInsuranceCompany,
                        PreviousPolicyNo = model.PreviousPolicy.PreviousPolicyNumber,
                        PreviousSumInsured = model.PreviousPolicy.PreviousPolicySumInsured,
                        PreviousPolicyPlan = model.PreviousPolicy.PreviousPolicyPlan,
                        NomineeName = model.Nomination.Name,
                        NomineeRelationShipId = model.Nomination.Relation,
                        NomineeAge = model.Nomination.Age,
                        NomineeGuardian = model.Nomination.GuardianName,
                        ControlNo = controlNumber,
                        ManufacturerId = model.Vehicle.Manufacturer,
                        ModelId = model.Vehicle.Model,
                        VariantId = model.Vehicle.Varient,
                        FuelType = model.Vehicle.FuelType,
                        CubicCapacity = model.Vehicle.Cc,
                        SeatingCapacity = model.Vehicle.Seating,
                        GVW = model.Vehicle.Gvw,
                        KW = model.Vehicle.Kw,
                        Exshowroom = model.Vehicle.ExShowRoomValue,
                        RegistrationNo = model.Vehicle.RegistrationNumber,
                        EngineNo = model.Vehicle.EngineNumber,
                        ChassisNo = model.Vehicle.ChassisNumber,
                        RTOZoneId = (model.Vehicle.RtoZone == 0) ? DefaultRToZoneId : model.Vehicle.RtoZone,
                        MakeYearId = model.Vehicle.MakeYear,
                        VehicleUsageId = model.Vehicle.Usage,
                        SpecialRegistrationNo = model.Vehicle.IsSpecialRegistrationNumber,
                        TeleCallerId = model.PolicySource.TeleCaller,
                        FOSId = model.PolicySource.Fos,
                        POSId = model.PolicySource.Pos,
                        ReferenceId = model.PolicySource.Reference,
                        BusinessDoneBy = model.PolicySource.BusinessDoneBy,
                        POSManageBy = model.PolicySource.PosManagedBy,
                        PolicyRemarks = model.PolicySource.PolicyRemarks,
                        VehicleIDV = model.Premium.VehicleIdv,
                        ElectricAssessoriesIDV = model.Premium.ElectricAccessoriesIdv,
                        NonElectricAssessoriesIDV = model.Premium.NonElectricAccessoriesIdv,
                        CNGIDV = model.Premium.CngLpgIdv,
                        TotalIDV = model.Premium.TotalIdv,
                        OD = model.Premium.Od,
                        AddonOD = model.Premium.AddOnRiderOd,
                        EndorseOD = model.Premium.EndorseOd,
                        TotalOD = model.Premium.TotalOd,
                        TPPremium = model.Premium.Tp,
                        PassengerCover = model.Premium.PassengerCover,
                        EndorseTP = model.Premium.EndorseTp,
                        TotalTP = model.Premium.TotalTp,
                        GSTRate = model.Premium.GstPercentage,
                        TotalGST = Convert.ToInt32(model.Premium.GstValue),
                        GrossPremium = Convert.ToInt32(model.Premium.GrossPremium),
                        EndorseGrossPremium = model.Premium.EndorseGrossPremium,
                        TotalGrossPremium = model.Premium.TotalGrossPremium,
                        SpecialDiscount = model.Premium.SpecialDiscount,
                        Loading = model.Premium.Loading,
                        NCBId = model.Premium.Ncb,
                        CommissionPayTypeId = model.Premium.CommissionPaidOn,
                        CommissionablePremium = Convert.ToInt32(model.Premium.CommissionablePremium),
                        NonCommissionComponentPremium = Convert.ToInt32(model.Premium.NonCommissionComponentPremium),
                        CoverNoteNo = model.CoverNoteNumber,
                        BranchId = byte.Parse(model.BranchId),
                        KMCovered = model.NumberOfKiloMeterCovered,
                        ExtendedKMCovered = model.ExtendedKiloMeterCovered,
                        VerticalCode = model.VerticalCode,
                        AddonRiderId = model.AddOnRider.AddOnRiderId,
                        CreatedBy = baseModel.LoginUserId,
                        CreatedTime = DateTime.Now,
                        PolicyStatusId = 1, // Active
                        AgentChange = model.IsChangeAgent,
                        BlockAgentReassignment = model.IsBlockAgent,
                        VerticalId = model.VerticalId,
                        VerticalSegmentId = model.VerticalSegmentId,
                        LoyaltyCounter = model.RenewalCounter,
                        IsActive = true,
                        InsuranceBranchId = model.InsuranceBranch,
                        BasicTpGstPercentage = model.Premium.BasicTpGstPercentage,
                        NetPremium = model.Premium.NetPremium,
                        //  AddOnSelected = !string.IsNullOrEmpty(model.AddOnSelected) ? model.AddOnSelected : null,
                        RenewalPOSId = (model.PolicyTerm.PolicyType == 2 || model.PolicyTerm.PolicyType == 4) ? model.PolicySource.Pos : 0,
                        VehicleSegment = model.Vehicle.VehicleSegment,
                        Flag1 = true,
                        IsPreviousPolicyApplicable = model.IsPreviousPolicyApplicable,
                        FamilyDiscount = model.Premium.FamilyDiscount,
                        SectionDiscount = model.Premium.SectionDiscount,
                        LongTermDiscount = model.Premium.LongtermDiscount,
                        AdditionalDiscount = model.Premium.AdditionalDiscount,
                        ProductId = model.ProductPlan.ProductId,
                        PlanId = (short)(model.ProductPlan != null ? model.ProductPlan.Plan : 0),
                        PlanTypeId = (short)(model.ProductPlan != null ? model.ProductPlan.PlanTypes : 0),
                        PortabilityId = model.Portabality,
                        CBStartDate = model.ContinueStartDate,
                        NoAdult = model.NumberOfAdult,
                        NoChild = model.NumberOfAdult,
                        TotalSumInsured = model.TotalSumInsured,
                        NoofDays = model.TpPolicy.NumberOfDays,
                        MaxDaysSingleTrip = model.Premium.MaxDaysSingleTrip,
                        CoverageId = model.TpPolicy.Coverage,
                        LineofBusiness = model.TpPolicy.LineofBusiness,
                        Occupancy= model.TpPolicy.Occupancy,
                        BasementExposerId =  model.TpPolicy.BasementExposure,
                        RiskLocation= model.TpPolicy.RiskLocation,
                        NumberofLocation= model.TpPolicy.NumberofLocation, 
                        LocationType  = model.TpPolicy.LocationType,
                        TerrorismPremium =  model.Premium.TerrorimsPremium.Value,
                        VoyageTypeId = model.Marine.VoyageType,
                        CoverageInlandId =  model.Marine.CoverageInland,
                        TransitFromDomestic = model.Marine.FromTransitDomestic,
                        TransitToDomestic = model.Marine.ToTransitDomestic,
                        MarineRate =  model.Marine.Rate,
                        MarineEndroseSumInsured = model.Marine.EndroseSumInsured,
                        MarineSumInsured =  model.Marine.SumInsured,
                        MarineTotalSumInsured= model.Marine.TotalSumInsured,
                        StorageRiskId = model.TpPolicy.StorageRiskId,
                        FinancerId = model.TpPolicy.Hypothentication,
                        MiscRate = model.Misc.MiscRate,
                        MiscInfo1 = model.Misc.Misc1,
                        MiscInfo2 = model.Misc.Misc2,
                        MiscInfo3 = model.Misc.Misc3,   
                        MiscInfo4 = model.Misc.Misc4,
                        
                    };
                    

                    if ( model.PolicyTerm != null && (model.PolicyTerm.PolicyType == 2 || model.PolicyTerm.PolicyType == 4))
                    {
                        motorPolicyData.PreviousPolicyId = model.PreviousPolicyId;
                        motorPolicyData.PolicyId = 0;
                    }


                        if (model.PolicyTerm != null && string.IsNullOrEmpty(model.PolicyTerm.AcknowledgementSlipIssueDateString))
                        motorPolicyData.AkgSlipIssueDate = null;
                    else
                        motorPolicyData.AkgSlipIssueDate = DateTime.ParseExact(model.PolicyTerm.AcknowledgementSlipIssueDateString, "MM/dd/yyyy", CultureInfo.InvariantCulture);

                    if (string.IsNullOrEmpty(model.CoverNoteIssueDateString))
                        motorPolicyData.CoverNoteDate = null;
                    else
                        motorPolicyData.CoverNoteDate = DateTime.ParseExact(model.CoverNoteIssueDateString, "MM/dd/yyyy", CultureInfo.InvariantCulture);

                
                    if (string.IsNullOrEmpty(model.PreviousPolicy.LastPolicyExpiryDateString))
                        motorPolicyData.PreviousPolicyEndDate = null;
                    else
                        motorPolicyData.PreviousPolicyEndDate = DateTime.ParseExact(model.PreviousPolicy.LastPolicyExpiryDateString, "MM/dd/yyyy", CultureInfo.InvariantCulture);

                    if (string.IsNullOrEmpty(model.OdPolicy.StartDateString))
                        motorPolicyData.PolicyStartDateOD = null;
                    else
                        motorPolicyData.PolicyStartDateOD = DateTime.ParseExact(model.OdPolicy.StartDateString, "MM/dd/yyyy", CultureInfo.InvariantCulture);

                    if (string.IsNullOrEmpty(model.TpPolicy.ExpiryDateString))
                        motorPolicyData.PolicyEndDate = null;
                    else
                        motorPolicyData.PolicyEndDate = DateTime.ParseExact(model.TpPolicy.ExpiryDateString, "MM/dd/yyyy", CultureInfo.InvariantCulture);

                    if (string.IsNullOrEmpty(model.TpPolicy.StartDateString))
                        motorPolicyData.PolicyStartDate = null;
                    else
                        motorPolicyData.PolicyStartDate = DateTime.ParseExact(model.TpPolicy.StartDateString, "MM/dd/yyyy", CultureInfo.InvariantCulture);

                    //motorPolicyData.Flag1 = IsFlag1True(model);
                    motorPolicyData.Flag2 = IsFlag2True(model);

                    _dataContext.tblMotorPolicyData.AddOrUpdate(motorPolicyData);
                    await _dataContext.SaveChangesAsync();

                    // Renewal Case
                    if (model.PolicyTerm.PolicyType == 2 || model.PolicyTerm.PolicyType == 4)
                    {
                        tblMotorPolicyData data = await _dataContext.tblMotorPolicyData.FirstOrDefaultAsync(f => model.PreviousPolicyId.HasValue && f.PolicyId == model.PreviousPolicyId.Value);
                        if (data == null)
                        {
                            return new CommonDto<object>
                            {
                                IsSuccess = false,
                                Message = "Previous Policy Number not found"
                            };
                        }
                        data.RenewalDone = true;
                        data.RenewalPolicyId = motorPolicyData.PolicyId;

                        await _dataContext.SaveChangesAsync();
                    }

                    #endregion

                    #region Insert Payment Data
                    /*if (model.PolicyId != 0) {
                        List<tblPolicyPaymentData> previousPaymentDatas = await _dataContext.tblPolicyPaymentData.Where(w => w.PolicyId == model.PolicyId).ToListAsync();
                        if (previousPaymentDatas.Any())
                        {
                            _dataContext.tblPolicyPaymentData.RemoveRange(previousPaymentDatas);
                            await _dataContext.SaveChangesAsync();
                        }
                    }*/
                    if (model.PaymentData.Any())
                    {
                        List<tblPolicyPaymentData> payments = new List<tblPolicyPaymentData>();
                        model.PaymentData.ForEach(f => payments.Add(new tblPolicyPaymentData
                        {
                            BankId = f.Bank,
                            BranchId = short.Parse(model.BranchId),
                            ChequeDate = !string.IsNullOrEmpty(f.DatedString) ? DateTime.ParseExact(f.DatedString, "MM/dd/yyyy", CultureInfo.InvariantCulture) : (DateTime?)null,
                            CreatedBy = baseModel.LoginUserId, //later change by token
                            CreatedTime = DateTime.Now,
                            PaymentAmount = f.Amount,
                            PaymentModeId = f.Mode,
                            ChequeNo = f.InstrumentNumber,
                            PolicyId = motorPolicyData.PolicyId
                        }));

                        _dataContext.tblPolicyPaymentData.AddRange(payments);
                        await _dataContext.SaveChangesAsync();
                    }
                    #endregion

                    #region Insert Document Data
                    if (model.Document.Any())
                    {
                        string documentDirectory = ConfigurationManager.AppSettings[AppConstant.DocumentFolder];
                        if (!Directory.Exists(documentDirectory)) Directory.CreateDirectory(documentDirectory);

                        List<tblUploadedDocuments> documents = new List<tblUploadedDocuments>();

                        model.Document.ForEach( f =>
                        {
                            string fileName = "";
                            List<tblUploadedDocuments> previousDocuments =  _dataContext.tblUploadedDocuments.Where(w => w.PolicyId == motorPolicyData.PolicyId && w.DocumentId == f.DocumentId).ToList();
                            if (previousDocuments.Count() == 0)
                            {

                                fileName = $"{Guid.NewGuid()}.{f.FileName.Split('.').LastOrDefault()}";
                                if (!string.IsNullOrEmpty(f.DocumentBase64)&& f.DocumentBase64.Contains(","))
                                {
                                    f.DocumentBase64 = f.DocumentBase64.Substring(f.DocumentBase64.IndexOf(",") + 1);
                                   
                                    byte[] bytes = Convert.FromBase64String(f.DocumentBase64);

                                    using (FileStream fileStream = new FileStream($"{documentDirectory}/{fileName}", FileMode.OpenOrCreate))
                                    {
                                        fileStream.Write(bytes, 0, bytes.Length);
                                        fileStream.Close();
                                    }
                                }


                                documents.Add(new tblUploadedDocuments
                                {
                                    CreatedBy = baseModel.LoginUserId,
                                    CreatedTime = DateTime.Now,
                                    CustomerId = model.Customer.CustomerId,
                                    Directory = documentDirectory,
                                    DocId = f.DocumentTypeId,
                                    FileName = fileName,
                                    OriginalFileName = f.FileName,
                                    PolicyId = motorPolicyData.PolicyId,
                                    Remarks = f.Remarks,
                                    DocumentBase64 = f.DocumentBase64
                                });
                            }
                        });

                        _dataContext.tblUploadedDocuments.AddRange(documents);
                        await _dataContext.SaveChangesAsync();
                    }
                    #endregion

                    #region Insert Add-On Rider Option Data
                    if (model.AddOnRider.AddOnRiderOptionId.Any())
                    {
                        var addOnValue = model.AddOnRider.AddOnValue;
                        var addPlanOptionId = model.AddOnRider.AddOnRiderOptionId;
                        var length = model.AddOnRider.AddOnRiderOptionId.Count();
                        List<tblPolicyAddonOptionDetails> addOnOptionDetails = new List<tblPolicyAddonOptionDetails>();

                        for (int i = 0; i < length; i++)
                        {
                            addOnOptionDetails.Add(new tblPolicyAddonOptionDetails
                            {
                                AddonPlanOptionId = addPlanOptionId[i],
                                AddonValue = addOnValue[i],
                                PolicyId = motorPolicyData.PolicyId,
                            });

                        }


                        _dataContext.tblPolicyAddonOptionDetails.AddRange(addOnOptionDetails);
                        await _dataContext.SaveChangesAsync();
                    }
                    #endregion

                    #region Insert Insurance Person Details
                    if (model.InsuredPersonData.Any())
                    {
                        List<tblInsuredPerson> tblInsuredPersons = new List<tblInsuredPerson>();
                        foreach (var f in model.InsuredPersonData)
                        {

                            var customer = await AddorUpdateCustomerDetails(f, baseModel);
                            tblInsuredPersons.Add(new tblInsuredPerson
                            {
                                PolicyId = motorPolicyData.PolicyId,
                                CustomerId = customer.CustomerId,
                                InsuredPersonName = f.Name,
                                InsuredGenderId = f.GenderId,
                                InsuredDOB = f.DateOfBirth,
                                InsuredAge = CalculateAge(f.DateOfBirth),
                                SumInsuredIndividual = f.SumInsuredIndividual,
                                SumInsuredFloater = f.SumInsuredFloater,
                                CummulativeBonus = f.CumulativeBonus,
                                Deductable = f.Deductable,
                                Loading = f.Loading,
                                LoadingReason = f.LoadingReason,
                                NomineeName = f.NomineeName,
                                NomineeRelationId = f.NomineeRelationship,
                                PEDId = f.Ped,
                                PEDExclusion = f.PedExclusion,
                                AnnualIncome = f.AnualIncome,
                                RiskClassId = f.RiskClass,
                                CreatedBy = baseModel.LoginUserId,
                                CreatedTime = DateTime.Now,
                                PassportNo = f.PassportNumber,
                                BranchId= f.BranchId,
                                IsActive = true,
                                PPCId = f.Ped,
                                InsuredRelationId = f.RelationProposer

                            });
                        }
                       
                        _dataContext.tblInsuredPerson.AddRange(tblInsuredPersons);
                        await _dataContext.SaveChangesAsync();

                    }
                    #endregion

                    #region Insert FireDetail
                        model.FireCoverage.PolicyId = motorPolicyData.PolicyId;
                        model.FireCoverage.BranchId = motorPolicyData.BranchId;
                        _dataContext.tblFireCoverage.Add(model.FireCoverage);
                        await _dataContext.SaveChangesAsync();
                    #endregion

                    dbContextTransaction.Commit();


                    return new CommonDto<object>
                    {
                        IsSuccess = true,
                        Message = $"Policy is created successfully with Control Number {motorPolicyData.ControlNo}"
                    };
                }

                catch (Exception ex)
                {
                    dbContextTransaction.Rollback(); 
                    log.Error(ex);
                    return new CommonDto<object>
                    {

                        Message = ex.Message
                    };

                }
            }
        }
        public static int CalculateAge(DateTime? dob)
        {
            int age = 0;
            age = DateTime.Now.Subtract(dob.GetValueOrDefault()).Days;
            age = age / 365;
            return age;
        }

        public async Task<CommercialPolicyFormDataModel> FindCommercialPolicyByPolicyId(int policyId)
        {
            CommercialPolicyFormDataModel motorPolicy = await _dataContext.tblMotorPolicyData.Join(_dataContext.tblCustomer, T1 => T1.CustomerId, T2 => T2.CustomerId, (T1, T2) => new { T1, T2 })
                                                    .GroupJoin(_dataContext.tblRTOZone, T3 => T3.T1.RTOZoneId, T4 => T4.RTOZoneId, (T3, T4) => new { T3, T4 })
                                                    .SelectMany(s => s.T4.DefaultIfEmpty(), (policy, rtoZone) => new { policy.T3, T4 = rtoZone })
                                                    .GroupJoin(_dataContext.tblCluster, T5 => T5.T3.T2.ClusterId, T6 => T6.ClusterId, (T5, T6) => new { T5, T6 })
                                                  .SelectMany(s => s.T6.DefaultIfEmpty(), (policyWithCustomer, cluster) => new { policyWithCustomer.T5, T6 = cluster })
                                                  .Where(w => w.T5.T3.T1.PolicyId == policyId)
                                                  .Select(s => new CommercialPolicyFormDataModel
                                                  {
                                                      PolicyId = s.T5.T3.T1.PolicyId,
                                                      BranchId = s.T5.T3.T1.BranchId.ToString(),
                                                      CoverNoteIssueDate = s.T5.T3.T1.CoverNoteDate,
                                                      CoverNoteNumber = s.T5.T3.T1.CoverNoteNo,
                                                      AddOnRider = new AddOnRiderModel
                                                      {
                                                          AddOnRiderId = s.T5.T3.T1.AddonRiderId
                                                      },
                                                      CreatedBy = _dataContext.tblUser.Join(_dataContext.tblTeamMember, user => user.TeamMemberId, teammember => teammember.TeamMemberId,
                                                      (user, teammember) => new { user, teammember }).Where(x => x.user.UserId == s.T5.T3.T1.CreatedBy).Select(x => x.teammember.TeamMemberName).FirstOrDefault(),
                                                      VerifiedBy = _dataContext.tblUser.Join(_dataContext.tblTeamMember, user => user.TeamMemberId, teammember => teammember.TeamMemberId,
                                                      (user, teammember) => new { user, teammember }).Where(x => x.user.UserId == s.T5.T3.T1.VerifiedBy).Select(x => x.teammember.TeamMemberName).FirstOrDefault(),
                                                      CreatedTime = s.T5.T3.T1.CreatedTime,
                                                      VerifiedTime = s.T5.T3.T1.VerifiedTime,
                                                      ModifiedBy = _dataContext.tblUser.Join(_dataContext.tblTeamMember, user => user.TeamMemberId, teammember => teammember.TeamMemberId,
                                                      (user, teammember) => new { user, teammember }).Where(x => x.user.UserId == s.T5.T3.T1.ModifiedBy).Select(x => x.teammember.TeamMemberName).FirstOrDefault(),
                                                      ModifiedTime = s.T5.T3.T1.ModifiedTime,

                                                      Customer = new CustomerFormDataModel
                                                      {
                                                          AddressInPolicy = s.T5.T3.T1.AddressInPolicy,
                                                          Cluster = s.T6.ClusterName,
                                                          ClusterCode = s.T6.ClusterCode,
                                                          ContactNumber = s.T5.T3.T2.DefaultContactNo == 1 ? s.T5.T3.T2.CustomerMobile1 : s.T5.T3.T2.DefaultContactNo == 2 ? s.T5.T3.T2.CustomerMobile2 : s.T5.T3.T2.DefaultContactNo == 3 ? s.T5.T3.T2.CustomerPhone1 : s.T5.T3.T2.CustomerPhone2,
                                                          ContactPerson = s.T5.T3.T2.CustomerContact,
                                                          CustomerCode = s.T5.T3.T2.CustomerCode,
                                                          CustomerId = s.T5.T3.T2.CustomerId,
                                                          CustomerType = s.T5.T3.T2.IsCompany.HasValue && s.T5.T3.T2.IsCompany.Value ? "Company/Firm" : "Individual",
                                                          Email = string.IsNullOrEmpty(s.T5.T3.T2.CustomerEmail1) ? s.T5.T3.T2.CustomerEmail2 : s.T5.T3.T2.CustomerEmail1,
                                                          Gstin = !string.IsNullOrEmpty(s.T5.T3.T2.GSTIN1) ? s.T5.T3.T2.GSTIN1 : !string.IsNullOrEmpty(s.T5.T3.T2.GSTIN2) ? s.T5.T3.T2.GSTIN2 : s.T5.T3.T2.GSTIN3,
                                                          NameInPolicy = s.T5.T3.T1.NameInPolicy,
                                                          Pan = s.T5.T3.T2.PAN,
                                                          Gender = _dataContext.tblGender.Where(x => x.GenderId == s.T5.T3.T2.GenderId).Select(x => x.Gender).FirstOrDefault(),
                                                          DateOfBirth = s.T5.T3.T2.CustomerDOB,
                                                          PassportNumber = s.T5.T3.T2.PassportNo,
                                                          ClusterId =  s.T5.T3.T2.ClusterId
                                                      },
                                                      ExtendedKiloMeterCovered = s.T5.T3.T1.ExtendedKMCovered ?? 0,
                                                      FinanceBy = s.T5.T3.T1.FinancerId ?? 0,
                                                      //InspectionData = new InspectionFormDataModel
                                                      //{
                                                      //    InspectionCompany = s.T5.T3.T1.InspectionCompanyId,
                                                      //    InspectionDate = s.T5.T3.T1.InspectionDate,
                                                      //    InspectionNumber = s.T5.T3.T1.InspectionNo,
                                                      //    InspectionRemarks = s.T5.T3.T1.InspectionRemark,
                                                      //    InspectionTime = s.T5.T3.T1.InspectionTime.HasValue ? s.T5.T3.T1.InspectionTime.Value.ToString() : string.Empty
                                                      //},
                                                      Nomination = new NominationFormDataModel
                                                      {
                                                          Age = s.T5.T3.T1.NomineeAge ?? 0,
                                                          GuardianName = s.T5.T3.T1.NomineeGuardian,
                                                          Name = s.T5.T3.T1.NomineeName,
                                                          Relation = s.T5.T3.T1.NomineeRelationShipId
                                                      },
                                                      NumberOfKiloMeterCovered = s.T5.T3.T1.KMCovered ?? 0,
                                                      PolicySource = new PolicySourceFormDataModel
                                                      {
                                                          BusinessDoneBy = s.T5.T3.T1.BusinessDoneBy,
                                                          Fos = s.T5.T3.T1.FOSId,
                                                          PolicyRemarks = s.T5.T3.T1.PolicyRemarks,
                                                          Pos = s.T5.T3.T1.POSId,
                                                          PosManagedBy = s.T5.T3.T1.POSManageBy,
                                                          Reference = s.T5.T3.T1.ReferenceId,
                                                          TeleCaller = s.T5.T3.T1.TeleCallerId
                                                      },
                                                      PolicyTerm = new PolicyTermFormDataModel
                                                      {
                                                          AcknowledgementSlipIssueDate = s.T5.T3.T1.AkgSlipIssueDate,
                                                          AcknowledgementSlipNumber = s.T5.T3.T1.AkgSlipNo,
                                                          PackageType = s.T5.T3.T1.PolicyPackageType,
                                                          PackageTypeId = s.T5.T3.T1.PolicyPackageTypeId,
                                                          PolicyTerm = s.T5.T3.T1.PolicyTermId,
                                                          PolicyType = s.T5.T3.T1.PolicyTypeId,
                                                      },
                                                      Premium = new PremiumFormDataModel
                                                      {
                                                          AddOnRiderOd = s.T5.T3.T1.AddonOD ?? 0,
                                                          CngLpgIdv = s.T5.T3.T1.CNGIDV ?? 0,
                                                          CommissionablePremium = s.T5.T3.T1.CommissionablePremium ?? 0,
                                                          CommissionPaidOn = s.T5.T3.T1.CommissionPayTypeId ?? 0,
                                                          ElectricAccessoriesIdv = s.T5.T3.T1.ElectricAssessoriesIDV ?? 0,
                                                          EndorseGrossPremium = s.T5.T3.T1.EndorseGrossPremium ?? 0,
                                                          EndorseOd = s.T5.T3.T1.EndorseOD ?? 0,
                                                          EndorseTp = s.T5.T3.T1.EndorseTP ?? 0,
                                                          GrossPremium = s.T5.T3.T1.GrossPremium ?? 0,
                                                          GstPercentage = s.T5.T3.T1.GSTRate ?? 0M,
                                                          GstValue = s.T5.T3.T1.TotalGST ?? 0,
                                                          Loading = s.T5.T3.T1.Loading ?? 0M,
                                                          Ncb = s.T5.T3.T1.NCBId,
                                                          NonCommissionComponentPremium = s.T5.T3.T1.NonCommissionComponentPremium ?? 0,//ask later
                                                          NonElectricAccessoriesIdv = s.T5.T3.T1.NonElectricAssessoriesIDV ?? 0,
                                                          Od = s.T5.T3.T1.OD ?? 0,
                                                          PassengerCover = s.T5.T3.T1.PassengerCover ?? 0,
                                                          SpecialDiscount = s.T5.T3.T1.SpecialDiscount ?? 0M,
                                                          TotalGrossPremium = s.T5.T3.T1.TotalGrossPremium ?? 0,
                                                          TotalIdv = s.T5.T3.T1.TotalIDV ?? 0,
                                                          TotalOd = s.T5.T3.T1.TotalOD ?? 0,
                                                          TotalTp = s.T5.T3.T1.TotalTP ?? 0,
                                                          Tp = s.T5.T3.T1.TPPremium ?? 0,
                                                          VehicleIdv = s.T5.T3.T1.VehicleIDV ?? 0,
                                                          BasicTpGstPercentage = s.T5.T3.T1.BasicTpGstPercentage ?? 0,
                                                          NetPremium = s.T5.T3.T1.NetPremium ?? 0,
                                                          FamilyDiscount = s.T5.T3.T1.FamilyDiscount ?? 0,
                                                          LongtermDiscount = s.T5.T3.T1.LongTermDiscount?? 0,
                                                          AdditionalDiscount = s.T5.T3.T1.AdditionalDiscount ?? 0,
                                                          SectionDiscount = s.T5.T3.T1.SectionDiscount ?? 0,
                                                          MaxDaysSingleTrip  = s.T5.T3.T1.MaxDaysSingleTrip?? 0,
                                                          TerrorimsPremium = s.T5.T3.T1.TerrorismPremium ?? 0
                                                      },
                                                      PreviousPolicy = new PreviousPolicyFormDataModel
                                                      {
                                                          LastPolicyExpiryDate = s.T5.T3.T1.PreviousPolicyEndDate,
                                                          LastYearInsuranceCompany = s.T5.T3.T1.PreviousInsuranceCompanyId ?? 0,
                                                          PreviousPolicyNumber = s.T5.T3.T1.PreviousPolicyNo,
                                                          PreviousPolicyPlan = s.T5.T3.T1.PreviousPolicyPlan,
                                                          PreviousPolicySumInsured = s.T5.T3.T1.PreviousSumInsured ?? 0,
                                                      },
                                                      VerticalCode = s.T5.T3.T1.VerticalCode,
                                                      TpPolicy = new TpOdPolicyFormDataModel
                                                      {
                                                          ExpiryDate = s.T5.T3.T1.PolicyEndDate,
                                                          InsuranceCompany = s.T5.T3.T1.InsuranceCompanyId ?? 0,
                                                          NumberOfYear = s.T5.T3.T1.NoofYearId ?? 0,
                                                          PolicyNumber = s.T5.T3.T1.PolicyNo,
                                                          StartDate = s.T5.T3.T1.PolicyStartDate,
                                                          NumberOfDays = s.T5.T3.T1.NoofDays,
                                                          Coverage = s.T5.T3.T1.CoverageId?? 0,
                                                          LineofBusiness = s.T5.T3.T1.LineofBusiness,
                                                          Occupancy = s.T5.T3.T1.Occupancy,
                                                          BasementExposure = s.T5.T3.T1.BasementExposerId,
                                                          RiskLocation = s.T5.T3.T1.RiskLocation,
                                                          NumberofLocation = s.T5.T3.T1.NumberofLocation,
                                                          LocationType = s.T5.T3.T1.LocationType,
                                                          StorageRiskId = s.T5.T3.T1.StorageRiskId,
                                                          Hypothentication = s.T5.T3.T1.FinancerId?? 0,

                                                      },
                                                      ProductPlan = new ProductPlanModel
                                                      {
                                                          ProductId = s.T5.T3.T1.ProductId,
                                                          Plan = s.T5.T3.T1.PlanId,
                                                          PlanTypes = s.T5.T3.T1.PlanTypeId
                                                      },
                                                      Marine = new MarineFormDataModel
                                                      {
                                                          CoverageInland = s.T5.T3.T1.CoverageInlandId,
                                                          EndroseSumInsured = s.T5.T3.T1.MarineEndroseSumInsured?? 0,
                                                          TotalSumInsured = s.T5.T3.T1.MarineTotalSumInsured ?? 0,
                                                          SumInsured = s.T5.T3.T1.MarineSumInsured ?? 0,
                                                          FromTransitDomestic = s.T5.T3.T1.TransitFromDomestic,
                                                          ToTransitDomestic = s.T5.T3.T1.TransitToDomestic,
                                                          VoyageType = s.T5.T3.T1.VoyageTypeId,
                                                          Rate = s.T5.T3.T1.MarineRate??0
                                                      },
                                                      Misc = new MiscFromDataModel
                                                      {
                                                          Misc1 = s.T5.T3.T1.MiscInfo1,
                                                          Misc2 = s.T5.T3.T1.MiscInfo2,
                                                          Misc3 = s.T5.T3.T1.MiscInfo3,
                                                          Misc4 = s.T5.T3.T1.MiscInfo4,
                                                          MiscRate= s.T5.T3.T1.MiscRate
                                                      },
                                                      InsuranceBranch = s.T5.T3.T1.InsuranceBranchId ?? 0,
                                                      ControlNumber = s.T5.T3.T1.ControlNo,
                                                      VerticalId = s.T5.T3.T1.VerticalId,
                                                      VerticalSegmentId = s.T5.T3.T1.VerticalSegmentId ?? 0,
                                                      RenewalCounter = s.T5.T3.T1.LoyaltyCounter ?? 0,
                                                      PreviousPolicyId = s.T5.T3.T1.PreviousPolicyId ?? 0,
                                                      PolicyStatusId = s.T5.T3.T1.PolicyStatusId,
                                                      PolicyCancelReasonId = s.T5.T3.T1.PolicyCancelReasonId ?? 0,
                                                      DataEntryStatus = s.T5.T3.T1.Flag1 == false && s.T5.T3.T1.Flag2 == false ? "Data Entry In-Process" : s.T5.T3.T1.Flag1 && s.T5.T3.T1.Flag2 && s.T5.T3.T1.IsVerified == false ? "Data Entry Complete but QC Pending" : s.T5.T3.T1.Flag1 && s.T5.T3.T1.Flag2 && s.T5.T3.T1.IsVerified ? "Data Entry Complete and QC Done" : null,
                                                      DataEntryStatusColor = s.T5.T3.T1.Flag1 == false && s.T5.T3.T1.Flag2 == false ? HtmlColor.LightPink : s.T5.T3.T1.Flag1 && s.T5.T3.T1.Flag2 && s.T5.T3.T1.IsVerified == false ? HtmlColor.LightPink : s.T5.T3.T1.Flag1 && s.T5.T3.T1.Flag2 && s.T5.T3.T1.IsVerified ? HtmlColor.LightGreen : HtmlColor.White,
                                                      PolicyStatusColor = s.T5.T3.T1.PolicyStatusId == 2 ? HtmlColor.LightRed : HtmlColor.LightYellow,
                                                      PolicyCancelReasonColor = s.T5.T3.T1.PolicyStatusId == 2 ? HtmlColor.LightPink : HtmlColor.White,
                                                      IsReconDone = s.T5.T3.T1.IRDACommissionReceived,
                                                      IsPreviousPolicyApplicable = s.T5.T3.T1.IsPreviousPolicyApplicable,
                                                      IsCommissionReceived = s.T5.T3.T1.POSCommissionReceived,
                                                      IRDACommMonthCycleId = s.T5.T3.T1.IRDACommMonthCycleId,
                                                      POSCommMonthCycleId = s.T5.T3.T1.POSCommMonthCycleId,
                                                      CommissionStatusColor = HtmlColor.White,
                                                      ReconStatusColor = HtmlColor.White,
                                                      AddOnSelected = s.T5.T3.T1.AddOnSelected,
                                                      IsVerified = s.T5.T3.T1.IsVerified,
                                                      Flag2 = s.T5.T3.T1.Flag2,
                                                      Flag1 = s.T5.T3.T1.Flag1,
                                                      Portabality = s.T5.T3.T1.PortabilityId,
                                                      ContinueStartDate = s.T5.T3.T1.CBStartDate,

                                                     
                                                  })
                                                  .FirstOrDefaultAsync();

            try
            {
                var fireCoverage = await _dataContext.tblFireCoverage.Where(w => w.PolicyId == policyId).FirstOrDefaultAsync();
                motorPolicy.FireCoverage = fireCoverage;
            }
            catch
            {

            }
            try
            {
                var data = await _dataContext.tblPolicyPaymentData.Where(w => w.PolicyId == policyId).ToListAsync();

                if (data != null && data.Count > 0)
                {
                    var dataPaymentFormDataModel = data.Select(s => new PaymentFormDataModel
                    {
                        Amount = s.PaymentAmount,
                        Bank = s.BankId ?? 0,
                        Dated = s.ChequeDate,
                        InstrumentNumber = s.ChequeNo,
                        Mode = s.PaymentModeId
                    }).ToList();

                    motorPolicy.PaymentData = dataPaymentFormDataModel;
                }

           
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message.ToString());

            }

            try
            {
                var data = await _dataContext.tblUploadedDocuments.Join(_dataContext.tblDocmentType, T1 => T1.DocId, T2 => T2.DocId, (T1, T2) => new { T1, T2 })
                                                                                  .Where(w => w.T1.PolicyId == policyId).ToListAsync();

                if (data != null && data.Count > 0)
                {
                    motorPolicy.Document = data.Select(s => new DocumentModel
                    {
                        DocumentId = s.T1.DocumentId,
                        DocumentTypeId = s.T1.DocId,
                        DocumentTypeName = s.T2.Name,
                        FileName = s.T1.OriginalFileName,
                        Remarks = s.T1.Remarks
                    }).ToList();

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message.ToString());

            }

            try
            {
                var data = await _dataContext.tblPolicyAddonOptionDetails.Where(w => w.PolicyId == policyId).ToListAsync();
                var addOnRiderId = motorPolicy.AddOnRider.AddOnRiderId;

                if (data != null && data.Count > 0)
                {
                    motorPolicy.AddOnRider = new AddOnRiderModel
                    {
                        AddOnRiderId = addOnRiderId,
                        AddOnRiderOptionId = data.Distinct().Select(x => x.AddonPlanOptionId).ToList(),
                        AddOnValue = data.Distinct().Select(x => x.AddonValue).ToList(),

                    };
                }
            }
            catch (Exception ex)
            {
                log.Error("FindMotoPolicyByPolicyId -", ex);
                Console.WriteLine(ex.Message.ToString());

            }

            motorPolicy.CoverNoteIssueDateDto = _commonService.GetDate(motorPolicy.CoverNoteIssueDate);
            //motorPolicy.InspectionData.InspectionDateDto = _commonService.GetDate(motorPolicy.InspectionData.InspectionDate);
            motorPolicy.TpPolicy.StartDateDto = _commonService.GetDate(motorPolicy.TpPolicy.StartDate);
            motorPolicy.TpPolicy.ExpiryDateDto = _commonService.GetDate(motorPolicy.TpPolicy.ExpiryDate);
            motorPolicy.PolicyTerm.AcknowledgementSlipIssueDateDto = _commonService.GetDate(motorPolicy.PolicyTerm.AcknowledgementSlipIssueDate);
            motorPolicy.PreviousPolicy.LastPolicyExpiryDateDto = _commonService.GetDate(motorPolicy.PreviousPolicy.LastPolicyExpiryDate);
            motorPolicy.PaymentData.ForEach(f => f.DatedDto = _commonService.GetDate(f.Dated));
            motorPolicy.ContinueStartDateDTO = _commonService.GetDate(motorPolicy.ContinueStartDate);
            motorPolicy.PolicyStatus = (await _dataContext.tblPolicyStatus.AsNoTracking().FirstOrDefaultAsync(s => s.PolicyStatusId == motorPolicy.PolicyStatusId))?.PolicyStatus;

            if (motorPolicy.PreviousPolicyId != null && motorPolicy.PreviousPolicyId > 0)
                motorPolicy.PreviousControlNumber = (await _dataContext.tblMotorPolicyData.AsNoTracking().FirstOrDefaultAsync(f => f.PolicyId == motorPolicy.PreviousPolicyId))?.ControlNo;

            if (motorPolicy.PolicyCancelReasonId > 0)
                motorPolicy.PolicyCancelReason = (await _dataContext.tblEndorsementReason.AsNoTracking().FirstOrDefaultAsync(f => f.EndorsementReasonId == motorPolicy.PolicyCancelReasonId && f.IsActive.HasValue && f.IsActive.Value)).EndorsementReason;

            if (motorPolicy.VerticalId > 0 && motorPolicy.VerticalSegmentId > 0)
                motorPolicy.Vertical = (await _dataContext.tblVertical.AsNoTracking().FirstOrDefaultAsync(f => f.VerticalId == motorPolicy.VerticalId && f.VerticalSegmentId == motorPolicy.VerticalSegmentId && f.IsActive)).VerticalName;

            if (motorPolicy.IsReconDone == 1)
            {
                string month = (await _dataContext.tblMonthCycle.AsNoTracking().FirstOrDefaultAsync(f => f.MonthCycleId == motorPolicy.IRDACommMonthCycleId && f.IsActive.HasValue && f.IsActive.Value))?.MonthCycle;
                motorPolicy.ReconStatus = $"Recon Done in {month}";
                motorPolicy.ReconStatusColor = HtmlColor.LightGreen;
            }
            else if (motorPolicy.IsReconDone == 0)
            {
                motorPolicy.ReconStatus = "Recon Pending";
                motorPolicy.ReconStatusColor = HtmlColor.LightPink;
            }

            if (motorPolicy.IsCommissionReceived == 1)
            {
                string month = (await _dataContext.tblMonthCycle.AsNoTracking().FirstOrDefaultAsync(f => f.MonthCycleId == motorPolicy.POSCommMonthCycleId && f.IsActive.HasValue && f.IsActive.Value))?.MonthCycle;
                motorPolicy.CommissionStatus = $"Commission Processed in {month}";
                motorPolicy.CommissionStatusColor = HtmlColor.LightGreen;
            }
            else if (motorPolicy.IsCommissionReceived == 0)
            {
                motorPolicy.CommissionStatus = "Commission not Processed";
                motorPolicy.CommissionStatusColor = HtmlColor.LightPink;
            }

            return motorPolicy;
        }

        public async Task<CommonDto<object>> UpdateCommercialPolicy(int policyId, CommercialPolicyFormDataModel model, BaseModel baseModel)
        {

            tblMotorPolicyData motorPolicyData = await _dataContext.tblMotorPolicyData.FirstOrDefaultAsync(f => f.PolicyId == policyId);

            if (motorPolicyData == null) return new CommonDto<object>
            {
                Message = "Invalid Policy Id"
            };

           

            #region Update Policy Data
            motorPolicyData.NameInPolicy = model.Customer.NameInPolicy;
            motorPolicyData.AddressInPolicy = model.Customer.AddressInPolicy;
            motorPolicyData.CustomerType = model.Customer.CustomerType;
            motorPolicyData.PAN = model.Customer.Pan;
            motorPolicyData.GSTIN = model.Customer.Gstin;
            motorPolicyData.CustomerId = model.Customer.CustomerId;
            motorPolicyData.PolicyTypeId = model.PolicyTerm.PolicyType;
            motorPolicyData.VehicleClassId = model.PolicyTerm.VehicleClass;
            motorPolicyData.PolicyPackageTypeId = model.PolicyTerm.PackageTypeId;
            motorPolicyData.PolicyPackageType = model.PolicyTerm.PackageType;
            motorPolicyData.PolicyTermId = model.PolicyTerm.PolicyTerm;
            motorPolicyData.AkgSlipNo = model.PolicyTerm.AcknowledgementSlipNumber;
            motorPolicyData.InsuranceCompanyId = model.TpPolicy.InsuranceCompany;
            motorPolicyData.PolicyNo = model.TpPolicy.PolicyNumber;
            motorPolicyData.NoofYearId = model.TpPolicy.NumberOfYear;
            motorPolicyData.InsuranceCompanyODId = model.OdPolicy.InsuranceCompany;
            motorPolicyData.PolicyNoOD = model.OdPolicy.PolicyNumber;
            motorPolicyData.NoofYearODId = model.OdPolicy.NumberOfYear;
            motorPolicyData.PreviousInsuranceCompanyId = model.PreviousPolicy.LastYearInsuranceCompany;
            motorPolicyData.PreviousPolicyNo = model.PreviousPolicy.PreviousPolicyNumber;
            motorPolicyData.PreviousSumInsured = model.PreviousPolicy.PreviousPolicySumInsured;
            motorPolicyData.PreviousPolicyPlan = model.PreviousPolicy.PreviousPolicyPlan;
            motorPolicyData.NomineeName = model.Nomination.Name;
            motorPolicyData.NomineeRelationShipId = model.Nomination.Relation;
            motorPolicyData.NomineeAge = model.Nomination.Age;
            motorPolicyData.NomineeGuardian = model.Nomination.GuardianName;

            motorPolicyData.TeleCallerId = model.PolicySource.TeleCaller;
            motorPolicyData.FOSId = model.PolicySource.Fos;
            motorPolicyData.POSId = model.PolicySource.Pos;
            motorPolicyData.ReferenceId = model.PolicySource.Reference;
            motorPolicyData.BusinessDoneBy = model.PolicySource.BusinessDoneBy;
            motorPolicyData.POSManageBy = model.PolicySource.PosManagedBy;
            motorPolicyData.PolicyRemarks = model.PolicySource.PolicyRemarks;
            
            motorPolicyData.TPPremium = model.Premium.Tp;
            motorPolicyData.PassengerCover = model.Premium.PassengerCover;
            motorPolicyData.EndorseTP = model.Premium.EndorseTp;
            motorPolicyData.TotalTP = model.Premium.TotalTp;
            motorPolicyData.GSTRate = model.Premium.GstPercentage;
            motorPolicyData.TotalGST = Convert.ToInt32(model.Premium.GstValue);
            motorPolicyData.GrossPremium = Convert.ToInt32(model.Premium.GrossPremium);
            motorPolicyData.EndorseGrossPremium = model.Premium.EndorseGrossPremium;
            motorPolicyData.TotalGrossPremium = model.Premium.TotalGrossPremium;
            motorPolicyData.SpecialDiscount = model.Premium.SpecialDiscount;
            motorPolicyData.Loading = model.Premium.Loading;
            motorPolicyData.NCBId = model.Premium.Ncb;
            motorPolicyData.CommissionPayTypeId = model.Premium.CommissionPaidOn;
            motorPolicyData.CommissionablePremium = Convert.ToInt32(model.Premium.CommissionablePremium);
            motorPolicyData.NonCommissionComponentPremium = Convert.ToInt32(model.Premium.NonCommissionComponentPremium);
            motorPolicyData.CoverNoteNo = model.CoverNoteNumber;
            motorPolicyData.KMCovered = model.NumberOfKiloMeterCovered;
            motorPolicyData.ExtendedKMCovered = model.ExtendedKiloMeterCovered;
            motorPolicyData.VerticalCode = model.VerticalCode;
            motorPolicyData.AddonRiderId = model.AddOnRider.AddOnRiderId;
            motorPolicyData.ModifiedBy = baseModel.LoginUserId;
            motorPolicyData.ModifiedTime = DateTime.Now;
            motorPolicyData.InsuranceBranchId = model.InsuranceBranch;
            motorPolicyData.BasicTpGstPercentage = model.Premium.BasicTpGstPercentage;
            motorPolicyData.NetPremium = model.Premium.NetPremium;
            motorPolicyData.IsVerified = model.IsVerified;
            if(motorPolicyData.IsVerified == true) {
                motorPolicyData.VerifiedBy = baseModel.LoginUserId;
                motorPolicyData.VerifiedTime= DateTime.Now;
            }
            motorPolicyData.IsPreviousPolicyApplicable = model.IsPreviousPolicyApplicable;
            motorPolicyData.Flag2 =  model.IsVerified  == false ? IsFlag2True(model) : true;
            motorPolicyData.Flag1 = true;
            motorPolicyData.FamilyDiscount = model.Premium.FamilyDiscount;
            motorPolicyData.SectionDiscount = model.Premium.SectionDiscount;
            motorPolicyData.LongTermDiscount = model.Premium.LongtermDiscount;
            motorPolicyData.AdditionalDiscount = model.Premium.AdditionalDiscount;
            motorPolicyData.ProductId = (short)(model.ProductPlan != null ? model.ProductPlan.ProductId : 0);
            motorPolicyData.PlanId = (short)(model.ProductPlan != null ? model.ProductPlan.Plan : 0);
            motorPolicyData.PlanTypeId = (short)(model.ProductPlan != null ? model.ProductPlan.PlanTypes : 0);
            motorPolicyData.PortabilityId = model.Portabality;
            motorPolicyData.CBStartDate = model.ContinueStartDate;
            motorPolicyData.NoAdult = model.NumberOfAdult;
            motorPolicyData.NoChild = model.NumberOfAdult;
            motorPolicyData.TotalSumInsured = model.TotalSumInsured;
            motorPolicyData.NoofDays = model.TpPolicy.NumberOfDays;
            motorPolicyData.MaxDaysSingleTrip = model.Premium.MaxDaysSingleTrip;
            motorPolicyData.CoverageId = model.TpPolicy.Coverage;
            motorPolicyData.LineofBusiness = model.TpPolicy.LineofBusiness;
            motorPolicyData.Occupancy = model.TpPolicy.Occupancy;
            motorPolicyData.BasementExposerId = model.TpPolicy.BasementExposure;
            motorPolicyData.RiskLocation = model.TpPolicy.RiskLocation;
            motorPolicyData.NumberofLocation = model.TpPolicy.NumberofLocation;
            motorPolicyData.LocationType = model.TpPolicy.LocationType;
            motorPolicyData.TerrorismPremium = model.Premium.TerrorimsPremium;
            motorPolicyData.VoyageTypeId = model.Marine.VoyageType;
            motorPolicyData.CoverageInlandId = model.Marine.CoverageInland;
            motorPolicyData.TransitFromDomestic = model.Marine.FromTransitDomestic;
            motorPolicyData.TransitToDomestic = model.Marine.ToTransitDomestic;
            motorPolicyData.MarineRate = model.Marine.Rate;
            motorPolicyData.MarineEndroseSumInsured = model.Marine.EndroseSumInsured;
            motorPolicyData.MarineSumInsured = model.Marine.SumInsured;
            motorPolicyData.MarineTotalSumInsured = model.Marine.TotalSumInsured;
            motorPolicyData.StorageRiskId = model.TpPolicy.StorageRiskId;
            motorPolicyData.FinancerId = model.TpPolicy.Hypothentication;
            motorPolicyData.MiscRate = model.Misc.MiscRate;
            motorPolicyData.MiscInfo1 = model.Misc.Misc1;
            motorPolicyData.MiscInfo2 = model.Misc.Misc2;
            motorPolicyData.MiscInfo3 = model.Misc.Misc3;
            motorPolicyData.MiscInfo4 = model.Misc.Misc4;
            if (string.IsNullOrEmpty(model.PolicyTerm.AcknowledgementSlipIssueDateString))
                motorPolicyData.AkgSlipIssueDate = null;
            else
                motorPolicyData.AkgSlipIssueDate = DateTime.ParseExact(model.PolicyTerm.AcknowledgementSlipIssueDateString, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            if (string.IsNullOrEmpty(model.CoverNoteIssueDateString))
                motorPolicyData.CoverNoteDate = null;
            else
                motorPolicyData.CoverNoteDate = DateTime.ParseExact(model.CoverNoteIssueDateString, "MM/dd/yyyy", CultureInfo.InvariantCulture);

          
            if (string.IsNullOrEmpty(model.PreviousPolicy.LastPolicyExpiryDateString))
                motorPolicyData.PreviousPolicyEndDate = null;
            else
                motorPolicyData.PreviousPolicyEndDate = DateTime.ParseExact(model.PreviousPolicy.LastPolicyExpiryDateString, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            if (string.IsNullOrEmpty(model.TpPolicy.ExpiryDateString))
                motorPolicyData.PolicyEndDate = null;
            else
                motorPolicyData.PolicyEndDate = DateTime.ParseExact(model.TpPolicy.ExpiryDateString, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            if (string.IsNullOrEmpty(model.TpPolicy.StartDateString))
                motorPolicyData.PolicyStartDate = null;
            else
                motorPolicyData.PolicyStartDate = DateTime.ParseExact(model.TpPolicy.StartDateString, "MM/dd/yyyy", CultureInfo.InvariantCulture);
            #endregion
            try
            {
                await _dataContext.SaveChangesAsync();
            } catch (Exception ex)
            {
                log.Error(ex);
                Console.WriteLine(ex.Message.ToString());

            }
            #region Update Payment Data
            List<tblPolicyPaymentData> previousPaymentDatas = await _dataContext.tblPolicyPaymentData.Where(w => w.PolicyId == policyId).ToListAsync();
            if (previousPaymentDatas.Any())
            {
                _dataContext.tblPolicyPaymentData.RemoveRange(previousPaymentDatas);
                await _dataContext.SaveChangesAsync();
            }
            if (model.PaymentData.Any())
            {
             
                List<tblPolicyPaymentData> payments = new List<tblPolicyPaymentData>();
                model.PaymentData.ForEach(f => payments.Add(new tblPolicyPaymentData
                {
                    BankId = f.Bank,
                    BranchId = short.Parse(model.BranchId),
                    ChequeDate = !string.IsNullOrEmpty(f.DatedString) ? DateTime.ParseExact(f.DatedString, "MM/dd/yyyy", CultureInfo.InvariantCulture) : (DateTime?)null,
                    ChequeNo = f.InstrumentNumber,
                    CreatedBy = 1, //later change by token
                    CreatedTime = DateTime.Now,
                    PaymentAmount = f.Amount,
                    PaymentModeId = f.Mode,
                    PolicyId = motorPolicyData.PolicyId
                }));

                _dataContext.tblPolicyPaymentData.AddRange(payments);

                await _dataContext.SaveChangesAsync();
            }
            #endregion

            #region Update Document Data
            List<tblUploadedDocuments> previousUploadDocument = await _dataContext.tblUploadedDocuments.Where(w => w.PolicyId == policyId).ToListAsync();
            if (previousUploadDocument.Any())
            {
                previousUploadDocument.ForEach(f =>
                {
                    f.IsDelete = true;
                });
                await _dataContext.SaveChangesAsync();

            }
            if (model.Document.Any())
            {
               

                string documentDirectory = ConfigurationManager.AppSettings[AppConstant.DocumentFolder];
                if (!Directory.Exists(documentDirectory)) Directory.CreateDirectory(documentDirectory);

                List<tblUploadedDocuments> documents = new List<tblUploadedDocuments>();
                string fileName = "";
                model.Document.ForEach( f =>
                {
                   
                        
                         fileName = $"{Guid.NewGuid()}.{f.FileName.Split('.').LastOrDefault()}";
                        if (string.IsNullOrEmpty(f.DocumentBase64) && f.DocumentBase64.Contains(","))
                        {
                            f.DocumentBase64 = f.DocumentBase64.Substring(f.DocumentBase64.IndexOf(",") + 1);

                            byte[] bytes = Convert.FromBase64String(f.DocumentBase64);

                            using (FileStream fileStream = new FileStream($"{documentDirectory}/{fileName}", FileMode.OpenOrCreate))
                            {
                                fileStream.Write(bytes, 0, bytes.Length);
                                fileStream.Close();
                            }
                        }



                        documents.Add(new tblUploadedDocuments
                        {
                            CreatedBy = baseModel.LoginUserId,
                            CreatedTime = DateTime.Now,
                            CustomerId = model.Customer.CustomerId,
                            Directory = documentDirectory,
                            DocId = f.DocumentTypeId,
                            FileName = fileName,
                            OriginalFileName = f.FileName,
                            PolicyId = policyId,
                            Remarks = f.Remarks,
                            DocumentBase64= f.DocumentBase64,
                        });
                    
                });

                _dataContext.tblUploadedDocuments.AddRange(documents);
                await _dataContext.SaveChangesAsync();
            }
            #endregion

            #region Update Add-On Rider Option Data
            if (model.AddOnRider.AddOnRiderOptionId.Any())
            {

                List<tblPolicyAddonOptionDetails> previousAddOnRiderOption = await _dataContext.tblPolicyAddonOptionDetails.Where(w => w.PolicyId == policyId).ToListAsync();
                if (previousAddOnRiderOption.Any())
                {
                    _dataContext.tblPolicyAddonOptionDetails.RemoveRange(previousAddOnRiderOption);
                    await _dataContext.SaveChangesAsync();
                }

                List<tblPolicyAddonOptionDetails> addOnOptionDetails = new List<tblPolicyAddonOptionDetails>();
                var addOnValue = model.AddOnRider.AddOnValue;
                var addPlanOptionId = model.AddOnRider.AddOnRiderOptionId;
                var length = model.AddOnRider.AddOnRiderOptionId.Count();
                for (int i = 0; i < length; i++)
                {
                    addOnOptionDetails.Add(new tblPolicyAddonOptionDetails
                    {
                        AddonPlanOptionId = addPlanOptionId[i],
                        AddonValue = addOnValue[i],
                        PolicyId = motorPolicyData.PolicyId,
                    });

                }

                _dataContext.tblPolicyAddonOptionDetails.AddRange(addOnOptionDetails);
                await _dataContext.SaveChangesAsync();
            }
            #endregion

            #region Update Insurance Person detail
            List<tblInsuredPerson> tblInsuredPerson = await _dataContext.tblInsuredPerson.Where(w => w.PolicyId == policyId).ToListAsync();
            if (tblInsuredPerson.Any())
            {
                _dataContext.tblInsuredPerson.RemoveRange(tblInsuredPerson);
                await _dataContext.SaveChangesAsync();
            }
            if (model.InsuredPersonData.Any())
            {
                List<tblInsuredPerson> tblInsuredPersons = new List<tblInsuredPerson>();
                foreach (var f in model.InsuredPersonData)
                {

                    var customer = await AddorUpdateCustomerDetails(f, baseModel);
                    tblInsuredPersons.Add(new tblInsuredPerson
                    {
                        PolicyId = motorPolicyData.PolicyId,
                        CustomerId = customer.CustomerId,
                        InsuredPersonName = f.Name,
                        InsuredGenderId = f.GenderId,
                        InsuredDOB = f.DateOfBirth,
                        InsuredAge = CalculateAge(f.DateOfBirth),
                        SumInsuredIndividual = f.SumInsuredIndividual,
                        SumInsuredFloater = f.SumInsuredFloater,
                        CummulativeBonus = f.CumulativeBonus,
                        Deductable = f.Deductable,
                        Loading = f.Loading,
                        LoadingReason = f.LoadingReason,
                        NomineeName = f.NomineeName,
                        NomineeRelationId = f.NomineeRelationship,
                        PEDId = f.Ped,
                        PEDExclusion = f.PedExclusion,
                        AnnualIncome = f.AnualIncome,
                        RiskClassId = f.RiskClass,
                        CreatedBy = baseModel.LoginUserId,
                        CreatedTime = DateTime.Now,
                        PassportNo = f.PassportNumber,
                        BranchId = f.BranchId,
                        IsActive = true,
                        PPCId = f.Ped,
                        InsuredRelationId = f.RelationProposer

                    });
                }

                _dataContext.tblInsuredPerson.AddRange(tblInsuredPersons);
                await _dataContext.SaveChangesAsync();

            }

            #endregion


            return new CommonDto<object>
            {
                IsSuccess = true,
                Message = "Policy is updated successfully"
            };
        }

        private bool IsFlag2True(CommercialPolicyFormDataModel model)
        {
                if( ValidatePolicyDetail(model) && ValidatePremiumDetail(model) && ValidatePolicySourceDetail(model) && ValidatePaymentData(model) ) { 
                return true; 
            } 
            return false;
        }
       
   
        private bool ValidatePolicyDetail(CommercialPolicyFormDataModel model)
        {
            if (model.PolicyTerm.PackageTypeId == (short)PackageType.TP_ONLY)
            {
                //22 IS ZERO YEAR IN TP
                if (string.IsNullOrEmpty(model.TpPolicy.PolicyNumber) || (model.TpPolicy.ExpiryDateString == null) 
                    && (model.TpPolicy.NumberOfYear != 22 && model.VerticalId != (short)Vertical.Travel) 
                    && (model.TpPolicy.NumberOfDays == null && model.VerticalId == (short)Vertical.Travel)  || 
                    (model.TpPolicy.NumberOfYear == 0 && model.VerticalId != (short)Vertical.Travel) 
                    || model.TpPolicy.StartDateString == null || model.TpPolicy.InsuranceCompany == 0)
                {
                    return false;
                }
            }
            
            return true;
        }

        private bool ValidatePremiumDetail(CommercialPolicyFormDataModel model)
        {
            if (model.Premium.Tp == 0 || model.Premium.GstPercentage == 0 || model.Premium.CommissionPaidOn == 0)
            {
                return false;
            }
            return true;
        }

        private bool ValidateInsuredPersonDetail(CommercialPolicyFormDataModel model)
        {
            if (model.InsuredPersonData.Count == 0)
            {
                return false;
            }
            return true;
        }

        private bool ValidatePolicySourceDetail(CommercialPolicyFormDataModel model)
        {
            if (model.PolicySource.TeleCaller == 0 && model.PolicySource.Fos == 0 && model.PolicySource.Pos == 0 && model.PolicySource.Reference == 0 )
            {
                return false;
            }
            return true;
        }

        private bool ValidatePaymentData(CommercialPolicyFormDataModel model)
        {

            if ( model.PaymentData.Count == 0)
            {
                return false;
            }
            return true;
        }


        private async Task<CommonDto<object>> ValidateData(CommercialPolicyFormDataModel model)
        {
            //Check Amount
            if (model.Premium != null && model.PaymentData.Sum(s => s.Amount) < model.Premium.TotalGrossPremium && model.PaymentData != null && model.PaymentData.Count>0)
                return new CommonDto<object>
                {
                    Message = "Amount should be greater than or equal to Total Gross Premium"
                };

            return new CommonDto<object>
            {
                IsSuccess = true
            };
        }

        public async Task<tblCustomer> AddorUpdateCustomerDetails(InsuredPersonModel insuredPersonModel, BaseModel baseModel)
        {
            tblCustomer tblCustomers = new tblCustomer();
            
                   
            if(insuredPersonModel.CustomerId == 0)
            {

                tblCustomers.CustomerId = insuredPersonModel.CustomerId;
                tblCustomers.CustomerName = insuredPersonModel.Name;
                tblCustomers.GenderId = insuredPersonModel.GenderId;
                tblCustomers.CustomerDOB = insuredPersonModel.DateOfBirth;
                tblCustomers.CustomerMobile1 = insuredPersonModel.Mobile;
                tblCustomers.CustomerEmail1 = insuredPersonModel.Email;
                tblCustomers.CustomerAddress1 = insuredPersonModel.Address;
                tblCustomers.CreatedBy = baseModel.LoginUserId;
                tblCustomers.CreatedTime = DateTime.Now;
                tblCustomers.PassportNo = insuredPersonModel.PassportNumber;
                tblCustomers.PAN = insuredPersonModel.Pan;
                tblCustomers.IsCompany = true;
                tblCustomers.DefaultAddress = 1;
                tblCustomers.DefaultWhatsAppNo = 1;
                tblCustomers.DefaultContactNo = 1;
                tblCustomers.BranchId = insuredPersonModel.BranchId;
                tblCustomers.ClusterId = insuredPersonModel.ClusterId;
                tblCustomers.CustomerCityId1 = insuredPersonModel.CityId;
                tblCustomers.IsActive = true;
                tblCustomers.CustomerCode =  GenerateCustomerCode();
                tblCustomers.ReferById = insuredPersonModel.ReferById;
                tblCustomers.ReferenceId= insuredPersonModel.ReferenceId;
                tblCustomers.POSId = insuredPersonModel.PosId;
                tblCustomers.TeamMemberId = insuredPersonModel.TeamMemberId;
                tblCustomers.AadhaarNo = insuredPersonModel.Aadhar;

            }
            else
            {
                tblCustomers  = await _dataContext.tblCustomer.FirstOrDefaultAsync(f => f.CustomerId == insuredPersonModel.CustomerId);
                tblCustomers.CustomerId = insuredPersonModel.CustomerId;
                tblCustomers.CustomerName = insuredPersonModel.Name;
                tblCustomers.GenderId = insuredPersonModel.GenderId;
                tblCustomers.CustomerDOB = insuredPersonModel.DateOfBirth;
                tblCustomers.CustomerMobile1 = insuredPersonModel.Mobile;
                tblCustomers.CustomerEmail1 = insuredPersonModel.Email;
                tblCustomers.CustomerAddress1 = insuredPersonModel.Address;
                tblCustomers.ModifiedBy = baseModel.LoginUserId;
                tblCustomers.ModifiedTime = DateTime.Now;
                tblCustomers.PassportNo = insuredPersonModel.PassportNumber;
                tblCustomers.PAN = insuredPersonModel.Pan;
                tblCustomers.AadhaarNo = insuredPersonModel.Aadhar;


            }
            _dataContext.tblCustomer.AddOrUpdate(tblCustomers);
            try
            {
                await _dataContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw;
            }
            return  tblCustomers;
        }

        public  string GenerateCustomerCode()
        {
            string lastCutomerCode =  _dataContext.tblCustomer.OrderByDescending(o => o.CustomerId).Select(s => s.CustomerCode).FirstOrDefault();
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

    }
}