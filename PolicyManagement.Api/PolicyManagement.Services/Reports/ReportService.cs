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
            var dataRecon =  new List<dynamic>();
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
                if(reportModel.InsuranceCompanyId != null)
                {
                    dataRecon =_dataContext.Usp_ReconDataDownloadRetailCommerceWithCom(reportModel.InsuranceCompanyId,reportModel.BranchId,reportModel.MonthCycle).ToList<dynamic>(); ;

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

            if (dataRecon.Count>0)
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
                Response  = "No Data"
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

                for (int rowNum = range.FirstRow().RowNumber() + 1 ; rowNum <= range.LastRow().RowNumber(); rowNum++)
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

                    tblMotorPolicyData policyData = await _dataContext.tblMotorPolicyData.FirstOrDefaultAsync(f => f.PolicyId == policyId);
                  
                    short irdaCommissionReceived, irDaCommMonthCycleId, policyNoOD;
                    decimal od, addonOD, endroseOD, grossPremium, endroseGrossPremium;
            
                   
                    if (policyData != null)
                    {
                        endroseOD = decimal.TryParse(cell[14], out endroseOD) ? endroseOD : default;
                        endroseGrossPremium = decimal.TryParse(cell[15], out endroseGrossPremium) ? endroseOD : default;
                        policyData.OD = decimal.TryParse(cell[9], out od) ? od : default(decimal);
                        policyData.AddonOD = decimal.TryParse(cell[16], out addonOD) ? addonOD : default(decimal);
                        policyData.TotalOD =  Convert.ToInt32(od + addonOD + endroseOD);
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

            var dataRecon = _dataContext.usp_GetMotorPolicyData(motherReport.BranchId, dateto, datefrom, motherReport.InsuranceCompanyId,motherReport.PackageTypeId,motherReport.ManufacturerId,motherReport.ModelId,motherReport.RtoZoneId, motherReport.PosNameId, motherReport.BusinessDoneBy,motherReport.AddonRideId,motherReport.Ncb1,motherReport.Ncb2,motherReport.Ncb3,motherReport.PolicyType1,motherReport.PolicyType2,motherReport.PolicyType3,motherReport.PolicyType4,motherReport.PolicyType5,0,0,0,0 ).ToList<dynamic>();
            return new CommonDto<object>
            {
                Message = "No Data",
                IsSuccess = true,
                Response = dataRecon
            };

        }
    }
}