using AutoMapper;
using DocumentFormat.OpenXml.Office.Word;
using log4net;
using PolicyManagement.Dtos.Common;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.Endrosement;
using PolicyManagement.Models.Report;
using PolicyManagement.Services.Base;
using PolicyManagement.Services.EndrosementService.Interface;
using PolicyManagement.Services.Reports.Interface;
using PolicyManagement.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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


                                  where (agentSwapFilter.InsuranceCompany == 0 || insuranceCompany.InsuranceCompanyId == agentSwapFilter.InsuranceCompany) &&
                                  (string.IsNullOrEmpty(agentSwapFilter.number) || policy.ControlNo == agentSwapFilter.number) &&
                                  (agentSwapFilter.PosNameId == 0 || pos.POSId == agentSwapFilter.PosNameId)
                                 
                                  && branch.BranchId == agentSwapFilter.BranchId
                                  && (agentSwapFilter.VerticalId == (int)Vertical.Motor ? policy.VerticalId == (short)Vertical.Motor : policy.VerticalId != (short)Vertical.Motor)
                                  && policy.IsVerified == true

                                  select new
                                  {
                                      policy.PolicyId,
                                      policy.ControlNo,
                                      policy.VerticalId,
                                      policy.NameInPolicy,
                                      policy.RegistrationNo,
                                      policy.GrossPremium,
                                      BranchCode = branch != null ? branch.BranchCode : null,
                                      ManufacturerName = manufacturer != null ? manufacturer.ManufacturerName : null,
                                      POSName = pos != null ? pos.POSName : null,
                                      policy.PolicyStartDate,
                                      policy.PolicyEndDate,
                                      ExpiryDate = policy.PolicyPackageTypeId == 1 ? policy.PolicyEndDate :                       policy.PolicyEndDateOD,
                                      StartDate = policy.PolicyPackageTypeId == 1 ? policy.PolicyStartDate :        policy.PolicyStartDateOD,
                                      PolicyNumber = policy.PolicyNo,
                                      insuranceCompany.InsuranceCompanyName,
                                      policy.PolicyRemarks,
                                      policy.CreatedBy,
                                      RenewalDone = policy.RenewalDone ?? false,
                                      policy.VerticalSegmentId,
                                      model.ModelName,
                                      policy.TotalIDV,
                                      varient.VariantName,
                                      policy.ReferenceId,
                                      policy.TeleCallerId,
                                      policy.FOSId,
                                      policy.POSId,
                                      plan.PlanName,
                                      product.ProductName,
                                      vertical.VerticalName,
                                      policy.InsuranceCompanyId,
                                      policy.ProductId,
                                      c.CustomerName,
                                      NCBPercentage = ncb.NCBPercentage == null ? 0 : ncb.NCBPercentage,
                                      policy.CoverNoteNo
                                  }
                                 ).ToList<dynamic>();

            return new DataTableDto<List<dynamic>>
            {
                TotalCount = filteredResult.Count(),
                Data = filteredResult,
            };

            // Replace "YourInsuranceCompanyName", "YourControlNo", and "YourPOSName" with the actual filter values.

        }
    }
}
