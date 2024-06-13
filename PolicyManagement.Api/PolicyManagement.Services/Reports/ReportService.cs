using AutoMapper;
using Newtonsoft.Json;
using PolicyManagement.Dtos.Common;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Customer;
using PolicyManagement.Models.Report;
using PolicyManagement.Services.Base;
using PolicyManagement.Services.Common.Interface;
using PolicyManagement.Services.Reports.Interface;
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
using System.Data.SqlClient;
using ClosedXML.Excel;
using System.Data;
using DocumentFormat.OpenXml.EMMA;
using DocumentFormat.OpenXml.Office2010.Ink;
using DocumentFormat.OpenXml.InkML;
using System.Data.Entity.Infrastructure;

namespace PolicyManagement.Services.Reports
{
    public class ReportService : BaseService, IReportService
    {
        private readonly ILog log = LogManager.GetLogger("API Logger");

        public ReportService(DataContext dataContext,

                            IMapper mapper) : base(dataContext, mapper)
        {
            dataContext.Configuration.ProxyCreationEnabled = false;

        }

        private async Task<CommonDto<object>> GenrateReconExcel(DataTable data, string filename)
        {

            string base64String;
            using (var wb = new XLWorkbook())
            {
                var sheet = wb.AddWorksheet(data, "IRDA");

                // Apply font color to columns 1 to 5
                sheet.Columns(1, 5).Style.Font.FontColor = XLColor.Black;

                using (var ms = new MemoryStream())
                {
                    wb.SaveAs(ms);

                    // Convert the Excel workbook to a base64-encoded string
                    base64String = Convert.ToBase64String(ms.ToArray());
                }
            }

            return new CommonDto<object>
            {
                Message = filename,
                IsSuccess = true,
                Response = base64String
            };
        }
        public async Task<CommonDto<object>> GetMotorReconDownload(ReportModel reportModel)
        {
            var dataRecon = new List<dynamic>();
            DataTable data = new DataTable();
            data.TableName = "Recon List";
            data.Columns.Add("PolicyId", typeof(string));
            data.Columns.Add("ControlNo", typeof(string));
            data.Columns.Add("TPPremium", typeof(string));
            data.Columns.Add("RegistrationDate", typeof(string));
            data.Columns.Add("MakeYear", typeof(string));
            data.Columns.Add("InsuranceCompanyName", typeof(string));
            data.Columns.Add("NameInPolicy", typeof(string));
            data.Columns.Add("PolicyNo", typeof(string));
            data.Columns.Add("OD", typeof(string));
            data.Columns.Add("GrossPremium", typeof(string));
            data.Columns.Add("EndorsementReason", typeof(string));
            data.Columns.Add("ModelName", typeof(string));
            data.Columns.Add("RegistrationNo", typeof(string));
            data.Columns.Add("EndorseOD", typeof(string));
            data.Columns.Add("TotalOD", typeof(string));
            data.Columns.Add("AddonOD", typeof(string));
            data.Columns.Add("EndorseGrossPremium", typeof(string));
            data.Columns.Add("TotalGrossPremium", typeof(string));
            data.Columns.Add("EngineNo", typeof(string));
            data.Columns.Add("ChassisNo", typeof(string));
            data.Columns.Add("VehicleClass", typeof(string));
            data.Columns.Add("PolicyStatus", typeof(string));
            data.Columns.Add("PolicyType", typeof(string));
            data.Columns.Add("PolicyStartDate", typeof(string));
            data.Columns.Add("PolicyTypeId", typeof(string));
            data.Columns.Add("BusinessDoneBy", typeof(string));
            data.Columns.Add("CommRecived", typeof(string));
            data.Columns.Add("MonthCycle", typeof(string));
            data.Columns.Add("MonthCycleId", typeof(string));
            data.Columns.Add("PolicyEndDate", typeof(string));
            data.Columns.Add("PolicyNoOD", typeof(string));
            data.Columns.Add("PolicyPackageType", typeof(string));
            data.Columns.Add("PolicyTermName", typeof(string));
            data.Columns.Add("PolicyStartDateOD", typeof(string));
            data.Columns.Add("PolicyEndDateOD", typeof(string));
            data.Columns.Add("ODCompany", typeof(string));
            data.Columns.Add("InsuranceCompanyODId", typeof(string));
            if (reportModel.DataType == 1)
            {
                if (reportModel.InsuranceCompanyId != null)
                {
                    dataRecon = _dataContext.Usp_ReconDataDownloadRetailCommerceWithCom(reportModel.InsuranceCompanyId, reportModel.BranchId, reportModel.MonthCycle).ToList<dynamic>(); ;

                }
                else
                {
                    dataRecon = _dataContext.Usp_ReconDataDownloadRetailCommerceWithoutCom(reportModel.BranchId, reportModel.MonthCycle).ToList<dynamic>(); ;
                }

            }
            else if (reportModel.DataType == 2)
            {
                if (reportModel.InsuranceCompanyId != null)
                {
                    dataRecon = _dataContext.Usp_ReconDataDownloadWithEndrosmentCompany(reportModel.InsuranceCompanyId, reportModel.BranchId, reportModel.MonthCycle).ToList<dynamic>(); ;
                }
                else
                {
                    dataRecon = _dataContext.Usp_ReconDataDownloadWithEndrosmentRecon(reportModel.BranchId, reportModel.MonthCycle).ToList<dynamic>(); ;
                }
            }
            else
            {
                dataRecon = _dataContext.Usp_ReconDataDownload(reportModel.MonthCycle, reportModel.BranchId).ToList<dynamic>();

            }

            if (dataRecon.Count > 0)
            {
                dataRecon.ForEach(x =>
                {
                    data.Rows.Add(x.PolicyId, x.ControlNo, x.TPPremium, x.RegistrationDate, x.MakeYear, x.InsuranceCompanyName, x.NameInPolicy, x.PolicyNo
                    , x.OD, x.GrossPremium, x.EndorsementReason, x.ModelName, x.RegistrationNo, x.EndorseOD, x.TotalOD, x.AddonOD, x.EndorseGrossPremium
                    , x.TotalGrossPremium, x.EngineNo, x.ChassisNo, x.VehicleClass, x.PolicyStatus, x.PolicyType, x.PolicyStartDate, x.PolicyTypeId, x.BusinessDoneBy
                    , x.CommRecived, x.MonthCycle, x.MonthCycleId, x.PolicyEndDate, x.PolicyNoOD, x.PolicyPackageType, x.PolicyTermName
                    , x.PolicyStartDateOD, x.PolicyEndDateOD, x.ODCompany, x.InsuranceCompanyODId);
                });
                var response = await GenrateReconExcel(data, "MotorRecon.xlsx");
                return response;
            }
            return new CommonDto<object>
            {
                Message = "No Data",
                IsSuccess = true,
                Response = "No Data"
            };

        }

        public async Task<CommonDto<object>> GetMotorReconUpload(UploadReconFile uploadReconFile)
        {
            // Convert the Base64 data to bytes
            uploadReconFile.Data = uploadReconFile.Data.Substring(uploadReconFile.Data.IndexOf(",") + 1);

            byte[] bytes = Convert.FromBase64String(uploadReconFile.Data);

            using (var stream = new MemoryStream(bytes))
            using (var workbook = new XLWorkbook(stream))
            {
                var worksheet = workbook.Worksheet(1);
                // Modify the worksheet data as needed
                List<List<string>> allCellValues = new List<List<string>>();

                var rows = worksheet.RowsUsed().Skip(1); // Skip the first row (header row)

                var range = worksheet.RangeUsed();

                for (int rowNum = range.FirstRow().RowNumber() + 1; rowNum <= range.LastRow().RowNumber(); rowNum++)
                {
                    var row = worksheet.Row(rowNum);
                    List<string> rowValues = new List<string>();

                    for (int colNum = range.FirstColumn().ColumnNumber(); colNum <= range.LastColumn().ColumnNumber(); colNum++)
                    {
                        var cell = row.Cell(colNum);
                        string cellValue = cell.GetString();

                        // Check if the cell value is null or empty
                        if (string.IsNullOrEmpty(cellValue))
                        {
                            // Add your default value here
                            cellValue = null;
                        }

                        // Add the cell value to the rowValues list
                        rowValues.Add(cellValue);
                    }

                    // Add the rowValues list to allCellValues
                    allCellValues.Add(rowValues);
                }
                foreach (var cell in allCellValues)
                {

                    int policyId = int.TryParse(cell[0], out policyId) ? policyId : default;

                    tblMotorPolicyData policyData = await _dataContext.tblMotorPolicyDatas.FirstOrDefaultAsync(f => f.PolicyId == policyId);

                    short irdaCommissionReceived, irDaCommMonthCycleId, policyNoOD;
                    decimal od, addonOD, endroseOD, grossPremium, endroseGrossPremium;


                    if (policyData != null)
                    {
                        endroseOD = decimal.TryParse(cell[14], out endroseOD) ? endroseOD : default;
                        endroseGrossPremium = decimal.TryParse(cell[15], out endroseGrossPremium) ? endroseOD : default;
                        policyData.OD = decimal.TryParse(cell[9], out od) ? od : default(decimal);
                        policyData.AddonOD = decimal.TryParse(cell[16], out addonOD) ? addonOD : default(decimal);
                        policyData.TotalOD = Convert.ToInt32(od + addonOD + endroseOD);
                        policyData.GrossPremium = decimal.TryParse(cell[10], out grossPremium) ? grossPremium : default(decimal);
                        policyData.TotalGrossPremium = Convert.ToInt32(grossPremium + endroseGrossPremium);
                        policyData.PolicyNo = cell[8];
                        policyData.PolicyNoOD = cell[31];
                        policyData.IRDACommissionReceived = short.TryParse(cell[26], out irdaCommissionReceived) ? irdaCommissionReceived : default(short);
                        policyData.IRDACommMonthCycleId = short.TryParse(cell[27], out irDaCommMonthCycleId) ? irDaCommMonthCycleId : default(short);

                        _dataContext.Entry(policyData).State = EntityState.Modified;
                    }

                }

                await _dataContext.SaveChangesAsync();


                return new CommonDto<object>
                {
                    IsSuccess = true,
                };

            }

        }

        public async Task<CommonDto<object>> GetMotorMotherReport(MotherReport motherReport)
        {

            var dateto = DateTime.ParseExact(motherReport.PolicyInspectionDateTo, "MM/dd/yyyy", CultureInfo.InvariantCulture);
            var datefrom = DateTime.ParseExact(motherReport.PolicyInspectionDateFrom, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            var dataRecon = _dataContext.usp_GetMotorPolicyData(motherReport.BranchId, dateto, datefrom, motherReport.InsuranceCompanyId, motherReport.PackageTypeId, motherReport.ManufacturerId, motherReport.ModelId, motherReport.RtoZoneId, motherReport.PosNameId, motherReport.BusinessDoneBy, motherReport.AddonRideId, motherReport.Ncb1, motherReport.Ncb2, motherReport.Ncb3, motherReport.PolicyType1, motherReport.PolicyType2, motherReport.PolicyType3, motherReport.PolicyType4, motherReport.PolicyType5, 0, 0, 0, 0).ToList<dynamic>();
            return new CommonDto<object>
            {
                Message = "No Data",
                IsSuccess = true,
                Response = dataRecon
            };

        }

        public async Task<CommonDto<object>> GetRetailCommercialMotherReport(RetailMotherReport motherReport)
        {


            var dateto = DateTime.ParseExact(motherReport.PolicyInspectionDateTo, "MM/dd/yyyy", CultureInfo.InvariantCulture);
            var datefrom = DateTime.ParseExact(motherReport.PolicyInspectionDateFrom, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            var dataRecon = _dataContext.Usp_GetRetailCommercialPolicyData_NEW(motherReport.BranchId, datefrom, dateto, motherReport.InsuranceCompanyId, motherReport.Product, motherReport.Plan, motherReport.PlanTypes, motherReport.PosNameId, null, motherReport.PosmanagedBy, motherReport.FosId, motherReport.TeleCallerId, motherReport.ReferenceId, motherReport.BusinessDoneBy, motherReport.PolicyType1, motherReport.PolicyType2, motherReport.PolicyType3, motherReport.PolicyType4, motherReport.Vertical1, motherReport.Vertical2, motherReport.Vertical3, motherReport.Vertical4, motherReport.Vertical5, motherReport.Vertical6).ToList();
            if (dataRecon.Any())
            {
                return new CommonDto<object>
                {
                    Message = "Record present",
                    IsSuccess = true,
                    Response = dataRecon
                };
            }

            return new CommonDto<object>
            {
                Message = "No Data",
                IsSuccess = true,
                Response = null
            };

        }

        public async Task<CommonDto<object>> GetRenewPerfomanceReport(RenewPerfomance renewPerfomance)
        {


            var dateto = DateTime.ParseExact(renewPerfomance.ExpiryDateTo, "MM/dd/yyyy", CultureInfo.InvariantCulture);
            var datefrom = DateTime.ParseExact(renewPerfomance.ExpiryDateFrom, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            var results = _dataContext.Usp_Report_RenewalPerfomanceReport(datefrom, dateto, renewPerfomance.BranchId, renewPerfomance.TeamMemberId, renewPerfomance.BusinessType, renewPerfomance.InsuranceCompanyId).ToList();
            if (results.Any())
            {
                return new CommonDto<object>
                {
                    Message = "Record present",
                    IsSuccess = true,
                    Response = results
                };
            }

            return new CommonDto<object>
            {
                Message = "No Data",
                IsSuccess = true,
                Response = null
            };

        }




        public async Task<DataTableDto<List<dynamic>>> FindMotorPolicyData(AgentSwapFilter agentSwapFilter)
        {
            var filteredResult = (from policy in _dataContext.tblMotorPolicyDatas
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

                                  where (agentSwapFilter.InsuranceCompany == 0 || insuranceCompany.InsuranceCompanyId == agentSwapFilter.InsuranceCompany) &&
                                  (string.IsNullOrEmpty(agentSwapFilter.number) || policy.ControlNo == agentSwapFilter.number) &&
                                  (agentSwapFilter.PosNameId == 0 || pos.POSId == agentSwapFilter.PosNameId)
                                  && (string.IsNullOrEmpty(agentSwapFilter.RegistrationNumber) || policy.RegistrationNo == agentSwapFilter.RegistrationNumber)
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
                                      ExpiryDate = policy.PolicyPackageTypeId == 1 ? policy.PolicyEndDate : policy.PolicyEndDateOD,
                                      StartDate = policy.PolicyPackageTypeId == 1 ? policy.PolicyStartDate : policy.PolicyStartDateOD,
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
                                      policy.ProductId
                                  }
                                 ).ToList<dynamic>();

            return new DataTableDto<List<dynamic>>
            {
                TotalCount = filteredResult.Count(),
                Data = filteredResult,
            };

            // Replace "YourInsuranceCompanyName", "YourControlNo", and "YourPOSName" with the actual filter values.

        }

        public async Task<CommonDto<object>> UpdateAgentsData(AgentSwapUpdate model, BaseModel baseModel)
        {
            try
            {
                tblMotorPolicyData motorPolicyData = await _dataContext.tblMotorPolicyDatas.FirstOrDefaultAsync(f => f.PolicyId == model.PolicyId);

                if (motorPolicyData == null) return new CommonDto<object>
                {
                    Message = "Invalid Policy Id"
                };
                motorPolicyData.ReferenceId = model.ReferenceId;
                motorPolicyData.TeleCallerId = model.TeleCallerId;
                motorPolicyData.FOSId = model.FosId;
                motorPolicyData.POSId = model.PosNameId;
                motorPolicyData.PolicyRemarks = model.PolicyRemarks;
                motorPolicyData.CreatedTime = DateTime.Now;
                motorPolicyData.ModifiedBy = baseModel.LoginUserId;
                motorPolicyData.ModifiedTime = DateTime.Now;
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Agent Swapped successfully",
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

        public async Task<CommonDto<object>> GetRenewalDump(RenewDump renewDump)
        {


            var dateto = DateTime.ParseExact(renewDump.ExpiryDateTo, "MM/dd/yyyy", CultureInfo.InvariantCulture);
            var datefrom = DateTime.ParseExact(renewDump.ExpiryDateFrom, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            var results = _dataContext.Usp_Report_RenewalDump(renewDump.BranchId, datefrom, dateto, renewDump.InsuranceCompanyId, renewDump.VerticalId).ToList();
            if (results.Any())
            {
                return new CommonDto<object>
                {
                    Message = "Record present",
                    IsSuccess = true,
                    Response = results
                };
            }

            return new CommonDto<object>
            {
                Message = "No Data",
                IsSuccess = true,
                Response = null
            };

        }


        public async Task<CommonDto<object>> GetCustomerCluster(CustomerCluster customerCluster)
        {
            var todayDate = DateTime.Today.Date;
            var results = new List<dynamic>();
            if (customerCluster.Filter == 1)
            {
                results =
                 await (from user in _dataContext.tblCustomer
                        join policydata in _dataContext.tblMotorPolicyDatas on user.CustomerId equals policydata.CustomerId
                        join insurancecompany in _dataContext.tblInsuranceCompany on policydata.InsuranceCompanyId equals insurancecompany.InsuranceCompanyId
                        join cluster in _dataContext.tblCluster on user.ClusterId equals cluster.ClusterId into clusters
                        join manufacture in _dataContext.tblManufacturers on policydata.ManufacturerId equals manufacture.ManufacturerId into manufactures
                        join product in _dataContext.tblProduct on policydata.ProductId equals product.ProductId into products
                        join plan in _dataContext.tblPlan on policydata.PlanId equals plan.PlanId into plans
                        join model in _dataContext.tblModel on policydata.ModelId equals model.ModelId into models
                        join makeyear in _dataContext.tblMakeYear on policydata.MakeYearId equals makeyear.MakeYearId into makeyears
                        join vehicleclass in _dataContext.tblVehicleClass on policydata.VehicleClassId equals vehicleclass.VehicleClassId into vehicleclasses
                        join portabality in _dataContext.tblPortability on policydata.PortabilityId equals portabality.PortabilityId into portabalitys
                        join ncb in _dataContext.tblNCB on policydata.NCBId equals ncb.NCBId into ncbs
                        join vertical in _dataContext.tblVertical on policydata.VerticalId equals vertical.VerticalId into verticals

                        from cluster in clusters.DefaultIfEmpty()
                        from manufacture in manufactures.DefaultIfEmpty()
                        from product in products.DefaultIfEmpty()
                        from plan in plans.DefaultIfEmpty()
                        from model in models.DefaultIfEmpty()
                        from makeyear in makeyears.DefaultIfEmpty()
                        from vehicleclass in vehicleclasses.DefaultIfEmpty()
                        from portabality in portabalitys.DefaultIfEmpty()
                        from ncb in ncbs.DefaultIfEmpty()
                        from vertical in verticals.DefaultIfEmpty()

                        where (string.IsNullOrEmpty(customerCluster.Number) || policydata.ControlNo == customerCluster.Number) &&
                       (string.IsNullOrEmpty(customerCluster.ClusterName) || cluster.ClusterName == customerCluster.ClusterName) &&
                       (string.IsNullOrEmpty(customerCluster.ClusterCode) || cluster.ClusterCode == customerCluster.ClusterCode) &&
                       (string.IsNullOrEmpty(customerCluster.ClusterPhoneNumber) || cluster.ClusterPhone1 == customerCluster.ClusterPhoneNumber) &&
                       (string.IsNullOrEmpty(customerCluster.CustomerName) || user.CustomerName == customerCluster.CustomerName) &&
                       (string.IsNullOrEmpty(customerCluster.CustomerPhoneNo) || user.CustomerPhone1 == customerCluster.CustomerPhoneNo) &&
                       (string.IsNullOrEmpty(customerCluster.CustomerCode) || user.CustomerCode == customerCluster.CustomerCode)
                        && (customerCluster.PolicyActivation == 0 || (customerCluster.PolicyActivation == 2 && policydata.PolicyStartDate > todayDate))
                        && (customerCluster.PolicyActivation == 0 || (customerCluster.PolicyActivation == 1 && policydata.IsActive == true))
                        select new
                        {
                            CustomerName = user.CustomerName,
                            CustomerCode = user.CustomerCode,
                            ClusterName = cluster.ClusterName,
                            cluster.ClusterCode,
                            user.CustomerPhone1,
                            user.CustomerAddress1,
                            policydata.ControlNo,
                            insurancecompany.InsuranceCompanyName,
                            policydata.PolicyNo,
                            policydata.RegistrationNo,
                            manufacture.ManufacturerName,
                            product.ProductName,
                            model.ModelName,
                            plan.PlanName,
                            policydata.EngineNo,
                            policydata.ChassisNo,
                            makeyear.MakeYear,
                            policydata.CubicCapacity,
                            policydata.SeatingCapacity,
                            vehicleclass.VehicleClass,
                            policydata.VehicleIDV,
                            policydata.CNGIDV,
                            policydata.ElectricAssessoriesIDV,
                            policydata.CoverNoteDate,
                            policydata.CoverNoteNo,
                            policydata.PolicyStartDate,
                            policydata.PolicyEndDate,
                            policydata.PolicyStartDateOD,
                            policydata.PolicyEndDateOD,
                            policydata.PolicyPackageType,
                            portabality.Portability,
                            NCBPercentage = ncb.NCBPercentage == null ? 0 : ncb.NCBPercentage,
                            policydata.OD,
                            policydata.TPPremium,
                            policydata.GrossPremium,
                            vertical.VerticalName
                        }).ToListAsync<dynamic>();
            }
            else
            {
                results =
                await (from user in _dataContext.tblCustomer
                       join policydata in _dataContext.tblMotorPolicyDatas on user.CustomerId equals policydata.CustomerId into policyDatas
                       join cluster in _dataContext.tblCluster on user.ClusterId equals cluster.ClusterId into clusters
                       from cluster in clusters.DefaultIfEmpty()
                       from policydata in policyDatas.DefaultIfEmpty()
                       where
                       (string.IsNullOrEmpty(customerCluster.Number) || policydata.ControlNo == customerCluster.Number) &&
                      (string.IsNullOrEmpty(customerCluster.ClusterName) || cluster.ClusterName == customerCluster.ClusterName) &&
                      (string.IsNullOrEmpty(customerCluster.ClusterCode) || cluster.ClusterCode == customerCluster.ClusterCode) &&
                      (string.IsNullOrEmpty(customerCluster.ClusterPhoneNumber) || cluster.ClusterPhone1 == customerCluster.ClusterPhoneNumber) &&
                      (string.IsNullOrEmpty(customerCluster.CustomerName) || user.CustomerName == customerCluster.CustomerName) &&
                      (string.IsNullOrEmpty(customerCluster.CustomerPhoneNo) || user.CustomerPhone1 == customerCluster.CustomerPhoneNo) &&
                      (string.IsNullOrEmpty(customerCluster.CustomerCode) || user.CustomerCode == customerCluster.CustomerCode)
                       && (customerCluster.PolicyActivation == 0 || (customerCluster.PolicyActivation == 2 && policydata.PolicyStartDate > todayDate))
                       && (customerCluster.PolicyActivation == 0 || (customerCluster.PolicyActivation == 1 && policydata.IsActive == true))
                       select new
                       {
                           user.CustomerName,
                           user.CustomerCode,
                           cluster.ClusterName,
                           cluster.ClusterCode,
                           user.CustomerPhone1,
                           user.CustomerAddress1,

                       }).ToListAsync<dynamic>();
            }
            if (results.Any())
            {
                return new CommonDto<object>
                {
                    Message = "Record present",
                    IsSuccess = true,
                    Response = results
                };
            }

            return new CommonDto<object>
            {
                Message = "No Data",
                IsSuccess = true,
                Response = null
            };

        }




        public async Task<CommonDto<object>> GetPosPerfomanceReports(POSPerfomance pOSPerfomance)
        {

            var query = _dataContext.tblMotorPolicyDatas
                .Where(m => m.PolicyStatusId == 1 && m.IsVerified && m.VerticalId == 1 && m.POSId > 6 && m.PolicyStartDate >= pOSPerfomance.policyStartDateFrom.Date && m.PolicyStartDate <= pOSPerfomance.policyStartDateTo.Date).ToList();

            if (pOSPerfomance.reportType == 0)
            {
                var result = query
                    .Join(_dataContext.tblPOS, m => m.POSId, d => d.POSId, (m, d) => new { m, d })
                    .Join(_dataContext.tblTeamMember, md => md.d.POSManagedBy, e => e.TeamMemberId, (md, e) => new { md.m, md.d, e })
                    .Join(_dataContext.tblPolicyType, mde => mde.m.PolicyTypeId, pt => pt.PolicyTypeId, (mde, pt) => new { mde.m, mde.d, mde.e, pt })
                    .Join(_dataContext.tblCategory, mde => mde.d.CategoryId, dc => dc.CategoryId, (mde, dc) => new { mde.m, mde.d, mde.e, dc, mde.pt });

                if (pOSPerfomance.insureCompanyId.HasValue)
                {
                    result = result.Where(x => x.m.InsuranceCompanyId == pOSPerfomance.insureCompanyId.Value);
                }

                if (pOSPerfomance.posId.HasValue)
                {
                    result = result.Where(x => x.d.POSId == pOSPerfomance.posId.Value);
                }

                if (pOSPerfomance.teamMemberId.HasValue)
                {
                    result = result.Where(x => x.e.TeamMemberId == pOSPerfomance.teamMemberId.Value);
                }

                var finalResult = result
                    .GroupBy(x => new { x.e.TeamMemberName, x.d.POSCode, x.d.POSName, x.dc.CategoryName, x.pt.PolicyType })
                    .Select(g => new POSPerfomanceReport
                    {
                        TeamMemberName = g.Key.TeamMemberName,
                        POSCode = g.Key.POSCode,
                        POSName = g.Key.POSName,
                        CategoryName = g.Key.CategoryName,
                        PolicyType = g.Key.PolicyType,
                        ODSum = g.Sum(x => x.m.OD),
                        NoOfPolicies = g.Count()
                    })
                    .OrderBy(r => r.TeamMemberName)
                    .ThenBy(r => r.CategoryName)
                    .ThenBy(r => r.POSName)
                    .ThenBy(r => r.PolicyType)
                    .ToList();
                return new CommonDto<object>
                {
                    Message = "No Data",
                    IsSuccess = true,
                    Response = finalResult
                };
            }
            else if (pOSPerfomance.reportType == 1)
            {
                var result = query
                    .Join(_dataContext.tblPOS, m => m.POSId, d => d.POSId, (m, d) => new { m, d })
                    .Join(_dataContext.tblTeamMember, md => md.d.POSManagedBy, e => e.TeamMemberId, (md, e) => new { md.m, md.d, e })
                    .Join(_dataContext.tblInsuranceCompany, mde => mde.m.InsuranceCompanyId, ic => ic.InsuranceCompanyId, (mde, ic) => new { mde.m, mde.d, mde.e, ic })
                    .Join(_dataContext.tblCategory, mde => mde.d.CategoryId, dc => dc.CategoryId, (mde, dc) => new { mde.m, mde.d, mde.e, dc, mde.ic });


                if (pOSPerfomance.insureCompanyId.HasValue)
                {
                    result = result.Where(x => x.m.InsuranceCompanyId == pOSPerfomance.insureCompanyId.Value);
                }

                if (pOSPerfomance.posId.HasValue)
                {
                    result = result.Where(x => x.d.POSId == pOSPerfomance.posId.Value);
                }

                if (pOSPerfomance.teamMemberId.HasValue)
                {
                    result = result.Where(x => x.e.TeamMemberId == pOSPerfomance.teamMemberId.Value);
                }

                var finalResult = result
                    .GroupBy(x => new { x.e.TeamMemberName, x.d.POSCode, x.d.POSName, x.dc.CategoryName, x.ic.InsuranceCompanyName })
                    .Select(g => new POSPerfomanceReport
                    {
                        TeamMemberName = g.Key.TeamMemberName,
                        POSCode = g.Key.POSCode,
                        POSName = g.Key.POSName,
                        CategoryName = g.Key.CategoryName,
                        CompanyName = g.Key.InsuranceCompanyName,
                        ODSum = g.Sum(x => x.m.OD),
                        NoOfPolicies = g.Count()
                    })
                    .OrderBy(r => r.TeamMemberName)
                    .ThenBy(r => r.CategoryName)
                    .ThenBy(r => r.POSName)
                    .ThenBy(r => r.PolicyType)
                    .ToList();

                return new CommonDto<object>
                {
                    Message = "No Data",
                    IsSuccess = true,
                    Response = finalResult
                };
            }
            else if (pOSPerfomance.reportType == 2)
            {
                var result = query
                    .Join(_dataContext.tblPOS, m => m.POSId, d => d.POSId, (m, d) => new { m, d })
                    .Join(_dataContext.tblTeamMember, md => md.d.POSManagedBy, e => e.TeamMemberId, (md, e) => new { md.m, md.d, e })
                    .Join(_dataContext.tblCategory, mde => mde.d.CategoryId, dc => dc.CategoryId, (mde, dc) => new { mde.m, mde.d, mde.e, dc })
                    .Select(x => new
                    {
                        x.e.TeamMemberName,
                        x.d.POSCode,
                        x.d.POSName,
                        x.dc.CategoryName,
                        Month = x.m.PolicyStartDate.Value.Month,
                        Year = x.m.PolicyStartDate.Value.Year,
                        ODSum = x.m.OD,
                        NoOfPolicies = 1,
                        x.m.InsuranceCompanyId,
                        x.d.POSId,
                        x.e.TeamMemberId
                    });

                if (pOSPerfomance.insureCompanyId.HasValue)
                {
                    result = result.Where(x => x.InsuranceCompanyId == pOSPerfomance.insureCompanyId.Value);
                }

                if (pOSPerfomance.posId.HasValue)
                {
                    result = result.Where(x => x.POSId == pOSPerfomance.posId.Value);
                }

                if (pOSPerfomance.teamMemberId.HasValue)
                {
                    result = result.Where(x => x.TeamMemberId == pOSPerfomance.teamMemberId.Value);
                }

                var finalResult = result
                    .GroupBy(x => new { x.TeamMemberName, x.POSCode, x.POSName, x.CategoryName, x.Year, x.Month })
                    .Select(g => new POSPerfomanceReport
                    {
                        TeamMemberName = g.Key.TeamMemberName,
                        POSCode = g.Key.POSCode,
                        POSName = g.Key.POSName,
                        CategoryName = g.Key.CategoryName,
                        Year = g.Key.Year,
                        Month = g.Key.Month,
                        ODSum = g.Sum(x => x.ODSum),
                        NoOfPolicies = g.Count()
                    })
                    .OrderBy(r => r.TeamMemberName)
                    .ThenBy(r => r.POSCode)
                    .ThenBy(r => r.Year)
                    .ThenBy(r => r.Month)
                    .ToList();

                return new CommonDto<object>
                {
                    Message = "No Data",
                    IsSuccess = true,
                    Response = finalResult
                };
            }

            return new CommonDto<object>
            {
                Message = "No Data",
                IsSuccess = true,
                Response = null
            };
        }



        /* public async Task<CommonDto<object>> GetDataEntryPerformance(DataEntryPerfomance dataEntryPerfomance)
         {

             if (dataEntryPerfomance.reportType == 1)
             {
                 // Client ID creation summary
                 var clientSummary = _dataContext.tblCustomer
                     .Where(c => c.CreatedTime >= dataEntryPerfomance.policyStartDateFrom && c.CreatedTime <= dataEntryPerfomance.policyStartDateTo)
                     .GroupBy(c => new { c.CreatedBy, c.CreatedBySession.LoginComputer })
                     .Select(g => new
                     {
                         NoEntry = g.Count(),
                         UserFullName = g.Key.UserFullName,
                         LoginComputer = g.Key.LoginComputer
                     })
                     .ToList();
             }
             else
             {
                 // Client ID creation date-wise
                 var clientDatewise = _dataContext.tblCustomer
                     .Where(c => c.CreatedTime >= dataEntryPerfomance.policyStartDateFrom && c.CreatedTime <= dataEntryPerfomance.policyStartDateTo)
                     .GroupBy(c => new { c.CreatedBySession.User.UserFullName, c.CreatedBySession.LoginComputer, Workdate = c.CreatedTime.Date })
                     .Select(g => new
                     {
                         NoEntry = g.Count(),
                         UserFullName = g.Key.UserFullName,
                         LoginComputer = g.Key.LoginComputer,
                         Workdate = g.Key.Workdate
                     })
                     .OrderBy(x => x.Workdate)
                     .ToList();
             }

             if (dataEntryPerfomance.reportType == 1)
             {
                 // Data entry ID creation summary
                 var dataEntrySummary = _dataContext.tblMotorPolicyDatas
                     .Where(m => m.CreatedTime >= dataEntryPerfomance.policyStartDateFrom && m.CreatedTime <= dataEntryPerfomance.policyStartDateTo)
                     .GroupBy(m => m.CreatedBy)
                     .Select(g => new
                     {
                         NoEntry = g.Count(),
                         UserFullName = g.Key
                     })
                     .ToList();
             }
             else
             {
                 // Data entry ID creation date-wise
                 var dataEntryDatewise = _dataContext.tblMotorPolicyDatas
                     .Where(m => m.CreatedTime >= dataEntryPerfomance.policyStartDateFrom && m.CreatedTime <= dataEntryPerfomance.policyStartDateTo)
                     .GroupBy(m => new { m.CreatedBy, Workdate = m.CreatedTime.Value.Date})
                     .Select(g => new
                     {
                         NoEntry = g.Count(),
                         UserFullName = g.Key.UserFullName,
                         Workdate = g.Key.Workdate
                     })
                     .OrderBy(x => x.Workdate)
                     .ToList();
             }

             if (dataEntryPerfomance.reportType == 1)
             {
                 // QC entry ID summary
                 var qcEntrySummary = _dataContext.tblMotorPolicyDatas
                     .Where(m => m.VerifiedTime >= dataEntryPerfomance.policyStartDateFrom && m.VerifiedTime <= dataEntryPerfomance.policyStartDateTo)
                     .GroupBy(m => m.VerifiedBySession.User.UserFullName)
                     .Select(g => new
                     {
                         NoEntry = g.Count(),
                         UserFullName = g.Key
                     })
                     .ToList();
             }
             else
             {
                 // QC entry ID date-wise
                 var qcEntryDatewise = _data_dataContext.tblMotorPolicyDatas
                     .Where(m => m.VerifiedTime >= dataEntryPerfomance.policyStartDateFrom && m.VerifiedTime <= dataEntryPerfomance.policyStartDateTo)
                     .GroupBy(m => new { m.VerifiedBySession.User.UserFullName, Workdate = m.VerifiedTime.Date })
                     .Select(g => new
                     {
                         NoEntry = g.Count(),
                         UserFullName = g.Key.UserFullName,
                         Workdate = g.Key.Workdate
                     })
                     .OrderBy(x => x.Workdate)
                     .ToList();
             }


             return new CommonDto<object>
             {
                 Message = "No Data",
                 IsSuccess = true,
                 Response = null
             };
         }*/
        public async Task<CommonDto<object>> GetLostDataEntry(LostDataCalling lostDataCalling)
        {
            var todayDate = DateTime.Today.Date;

            var vardtpFrom = lostDataCalling.policyStartDateFrom; // Replace with actual date
            var vardtpTo = lostDataCalling.policyStartDateTo;   // Replace with actual date
            int varBranchId = lostDataCalling.BranchId; // Replace with actual branch ID
            int? varInsureCompanyId = lostDataCalling.InsuranceCompanyId; // Replace with actual Insurance Company ID
            int varTeamemberId = lostDataCalling.TeamMemberId; // Replace with actual Employee ID

            var query = from mpd in _dataContext.tblMotorPolicyDatas
                        join ic in _dataContext.tblInsuranceCompany on mpd.InsuranceCompanyId equals ic.InsuranceCompanyId
                        join c in _dataContext.tblCustomer on mpd.CustomerId equals c.CustomerId
                        join city in _dataContext.tblCity on c.CustomerCityId1 equals city.CityId
                        join bt in _dataContext.tblBusinessType on c.BusinessTypeId equals bt.BusinessTypeId into btGroup
                        from bt in btGroup.DefaultIfEmpty()
                        join ind in _dataContext.tblIndustry on c.IndustryId equals ind.IndustryId into indGroup
                        from ind in indGroup.DefaultIfEmpty()
                        join cl in _dataContext.tblCluster on c.ClusterId equals cl.ClusterId
                        join t in _dataContext.tblTerritory on c.TerritoryId equals t.TerritoryId
                        join ny in _dataContext.tblNoofYear on mpd.NoofYearId equals ny.NoofYearId
                        join fi in _dataContext.tblFinancer on mpd.FinancerId equals fi.FinancerId into fiGroup
                        from fi in fiGroup.DefaultIfEmpty()
                        join icomp in _dataContext.tblInsuranceCompany on mpd.PreviousInsuranceCompanyId equals icomp.InsuranceCompanyId into icompGroup
                        from icomp in icompGroup.DefaultIfEmpty()
                            //  join icompany in _dataContext.tblInspectionCompany on mpd.InspectionCompanyId equals icompany.InspectionCompanyId into icompanyGroup
                            // from icompany in icompanyGroup.DefaultIfEmpty()
                        join pt in _dataContext.tblPolicyType on mpd.PolicyTypeId equals pt.PolicyTypeId
                        join rt in _dataContext.tblRelationShip on mpd.NomineeRelationShipId equals rt.RelationShipId into rtGroup
                        from rt in rtGroup.DefaultIfEmpty()
                        join m in _dataContext.tblManufacturers on mpd.ManufacturerId equals m.ManufacturerId
                        join mdl in _dataContext.tblModel on mpd.ModelId equals mdl.ModelId
                        join v in _dataContext.tblVariant on mpd.VariantId equals v.VariantId
                        join my in _dataContext.tblMakeYear on mpd.MakeYearId equals my.MakeYearId
                        join rz in _dataContext.tblRTOZone on mpd.RTOZoneId equals rz.RTOZoneId into rzGroup
                        from rz in rzGroup.DefaultIfEmpty()
                        join vc in _dataContext.tblVehicleClass on mpd.VehicleClassId equals vc.VehicleClassId
                        join ncb in _dataContext.tblNCB on mpd.NCBId equals ncb.NCBId into ncbGroup
                        from ncb in ncbGroup.DefaultIfEmpty()
                        join ar in _dataContext.tblAddonRider on mpd.AddonRiderId equals ar.AddonRiderId into arGroup
                        from ar in arGroup.DefaultIfEmpty()
                        join d in _dataContext.tblPOS on mpd.POSId equals d.POSId into dGroup
                        from d in dGroup.DefaultIfEmpty()
                        join tc in _dataContext.tblTeamMember on mpd.TeleCallerId equals tc.TeamMemberId into tcGroup
                        from tc in tcGroup.DefaultIfEmpty()
                        join fos in _dataContext.tblTeamMember on mpd.FOSId equals fos.TeamMemberId into fosGroup
                        from fos in fosGroup.DefaultIfEmpty()
                        join ps in _dataContext.tblPolicyStatus on mpd.PolicyStatusId equals ps.PolicyStatusId
                        join er in _dataContext.tblEndorsementReason on mpd.PolicyCancelReasonId equals er.EndorsementReasonId into erGroup
                        from er in erGroup.DefaultIfEmpty()
                        join r in _dataContext.tblReference on mpd.ReferenceId equals r.ReferenceId into rGroup
                        from r in rGroup.DefaultIfEmpty()
                        join mcs in _dataContext.tblMonthCycle on mpd.IRDACommMonthCycleId equals (short)mcs.MonthCycleId into mcGroup
                        from mc in mcGroup.DefaultIfEmpty()
                        join cmc in _dataContext.tblMonthCycle on mpd.POSCommMonthCycleId equals (short)cmc.MonthCycleId into cmcGroup
                        from cmc in cmcGroup.DefaultIfEmpty()
                        join dsc in _dataContext.tblCategory on d.CategoryId equals dsc.CategoryId into dscGroup
                        from dsc in dscGroup.DefaultIfEmpty()
                        join dsam in _dataContext.tblTeamMember on d.POSManagedBy equals dsam.TeamMemberId into dsamGroup
                        from dsam in dsamGroup.DefaultIfEmpty()
                        join gd in _dataContext.tblGender on mpd.NomineeGenderId equals gd.GenderId into gendergroup
                        from gd in gendergroup.DefaultIfEmpty()
                        where mpd.BranchId == varBranchId                            //&&
                        && mpd.RenewalDone ==  false        
                        && ((mpd.PolicyEndDate.Value.AddMonths(6) <= todayDate && mpd.PolicyPackageType == "TP only") ||
                                           (mpd.PolicyEndDateOD.Value.AddMonths(6) <= todayDate && (mpd.PolicyPackageType == "OD only" || mpd.PolicyPackageType == "Comprehensive")))
            //   (mpd == "Lost Case" || mpd.RenewalStatus == "Not Renew due to Cheque Bounce")
            select new
                        {
                            mpd.ControlNo,
                            mpd.LoyaltyCounter,
                            mpd.POSId,
                            c.CustomerCode,
                            ic.InsCompShortName,
                            mpd.PolicyTypeId,
                            pt.PolicyType,
                            mpd.NameInPolicy,
                            mpd.CustomerType,
                            c.CustomerAddress1,
                            city.CityName,
                            c.CustomerPinCode1,
                            cl.ClusterName,
                            cl.ClusterCode,
                            t.TerritoryName,
                            c.CustomerPhone1,
                            c.CustomerPhone2,
                            c.CustomerMobile1,
                            c.CustomerMobile2,
                            c.CustomerEmail1,
                            c.AadhaarNo,
                            c.CustomerEmail2,
                            mpd.CoverNoteNo,
                            //  mpd.IssueDate,
                            //mpd.IssueTime,
                            mpd.PolicyNo,
                            mpd.PolicyStartDate,
                            mpd.PolicyEndDate,
                            ny.NoofYear,
                            fi.FinancerName,
                            PrevInsCompany = icomp.InsuranceCompanyName,
                            mpd.PreviousPolicyNo,
                            mpd.PreviousPolicyEndDate,
                            //  icompany.InspectionCompanyName,
                            // mpd.InspectionNo,
                            //mpd.InspectionDate,
                            //mpd.InspectionTime,
                            mpd.NomineeName,
                            mpd.NomineeAge,
                            gd.Gender,
                            NomineeRelation = rt.RelationShipName,
                            m.ManufacturerName,
                            mdl.ModelName,
                            v.VariantName,
                            mpd.FuelType,
                            mpd.EngineNo,
                            mpd.ChassisNo,
                            mpd.CubicCapacity,
                            mpd.SeatingCapacity,
                            my.MakeYear,
                            mpd.RegistrationNo,
                            rz.RTOZoneName,
                            vc.VehicleClass,
                            mpd.GrossPremium,
                            mpd.VehicleIDV,
                            mpd.CNGIDV,
                            mpd.ElectricAssessoriesIDV,
                            mpd.TotalIDV,
                            mpd.OD,
                            ncb.NCBPercentage,
                            mpd.SpecialDiscount,
                            mpd.TotalOD,
                            mpd.TotalGrossPremium,
                            mpd.Loading,
                            //mpd.FVoucherNo,
                            //mpd.ShortAmt1,
                            //mpd.SVoucherNo,
                            //mpd.ShortAmt2,
                            //mpd.TVoucherNo,
                            //mpd.ShortAmt3,
                            //mpd.ShortFallTotal,
                            AddonRiderName = ar.AddonRiderName,
                            mpd.PAN,
                            mpd.GSTIN,
                            TeleCaller = tc.TeamMemberName,
                            DSAName = d.POSName,
                            FOS = fos.TeamMemberName,
                            mpd.BusinessDoneBy,
                            mpd.PolicyRemarks,
                            ps.PolicyStatus,
                            er.EndorsementReason,
                            mpd.PolicyCancelDate,
                            r.ReferenceName,
                            mpd.EndorseGrossPremium,
                            mpd.EndorseOD,
                            mpd.AddonOD,
                            mpd.GVW,
                            mpd.Exshowroom,
                            mpd.RegistrationDate,
                            // mpd.CDVoucherNo,
                            //mpd.CashDiscountAmt,
                            mpd.IRDACommissionReceived,
                            MonthCycle = mc.MonthCycle,
                            mpd.POSCommissionReceived,
                            CommMonth = cmc.MonthCycle,
                            dsc.CategoryName,
                            DSAManageByName = dsam.TeamMemberName,
                            c.CustomerContact,
                            c.CustomerDOB,
                            c.ClusterId,
                            c.TerritoryId,
                            c.IsDecisionMaker,
                            bt.BusinessTypeName,
                            ind.IndustryName,
                            PolicyPackageType = pt.PolicyType,
                            mpd.PolicyStartDateOD, mpd.PolicyEndDateOD, mpd.InsuranceCompanyId,
                            mpd.InsuranceCompanyODId,
                            mpd.FOSId, mpd.TeleCallerId,

                        };

            if (vardtpFrom != new DateTime(2020, 1, 1) || vardtpTo != new DateTime(2020, 1, 1))
            {
                query = query.Where(mpd => (mpd.PolicyEndDate >= vardtpFrom && mpd.PolicyEndDate <= vardtpTo && mpd.PolicyPackageType == "TP only") ||
                                           (mpd.PolicyEndDateOD >= vardtpFrom && mpd.PolicyEndDateOD <= vardtpTo && (mpd.PolicyPackageType == "OD only" || mpd.PolicyPackageType == "Comprehensive")));
            }

            // Apply other filters based on the user's selection
            if (lostDataCalling.InsuranceCompanyId.HasValue)
            {


                query = query.Where(mpd => (mpd.InsuranceCompanyId == varInsureCompanyId && mpd.PolicyPackageType == "TP only") ||
                                           (mpd.InsuranceCompanyODId == varInsureCompanyId && (mpd.PolicyPackageType == "OD only" || mpd.PolicyPackageType == "Comprehensive")));

            }

            if (lostDataCalling.PosNameId.HasValue)
            {

                query = query.Where(vrp => vrp.POSId == lostDataCalling.PosNameId);


            }

            if (lostDataCalling.Inhouse.HasValue)
            {

                query = query.Where(vrp => vrp.FOSId == varTeamemberId || vrp.TeleCallerId == varTeamemberId);


            }

            

            var result = query.OrderBy(vrp => vrp.ControlNo).ToList();
            return new CommonDto<object>
            {
                Message = "No Data",
                IsSuccess = true,
                Response = result
            };

        }

    }
}