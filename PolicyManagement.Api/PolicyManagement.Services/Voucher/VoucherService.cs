using AutoMapper;
using DocumentFormat.OpenXml.EMMA;
using DocumentFormat.OpenXml.Office.Word;
using DocumentFormat.OpenXml.Office2019.Drawing.Model3D;
using DocumentFormat.OpenXml.VariantTypes;
using Newtonsoft.Json;
using PolicyManagement.Dtos.Common;
using PolicyManagement.Dtos.Voucher;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Report;
using PolicyManagement.Models.Voucher;
using PolicyManagement.Services.Base;
using PolicyManagement.Services.Common.Interface;
using PolicyManagement.Services.Voucher.Interface;
using PolicyManagement.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace PolicyManagement.Services.Voucher
{
    public class VoucherService : BaseService, IVoucherService
    {
        private readonly ICommonService _commonService;
        public VoucherService(DataContext dataContext,
                             IMapper mapper,
                             ICommonService commonService) : base(dataContext, mapper)
        {
            _commonService = commonService;
        }

        public async Task<CommonDto<string>> AddVoucher(AddUpdateVoucherModel model)
        {
            string voucherNumber = await _commonService.GenerateVoucherNumber(model.BranchCode, model.LoginUserBranchId);
            if (string.IsNullOrEmpty(voucherNumber))
                return new CommonDto<string>
                {
                    Message = "System Generate Invalid Voucher Number."
                };

            tblVoucherDetails voucherDetail = new tblVoucherDetails
            {
                AccountUsedforCheque = model.AccountUsedForChequeIssue,
                BankId = model.Bank,
                BranchId = (short)model.LoginUserBranchId,
                ControlNo = model.ControlNumber,
                CustomerName = model.CustomerName,
                CustomerId = model.CustomerId,
                InsuranceCompanyId = model.InsuranceCompanyId,
                IsActive = true,
                PaymentModeId = model.PaymentModeId,
                PolicyId = model.PolicyId,
                PolicyNo = model.PolicyNumber,
                POSId = model.Pos,
                ReferTypeId = model.ReferTypeId,
                TeamMemberId = model.InHouse,
                TxnInstrumentDate = DateTime.ParseExact(model.PaymentDate, "MM/dd/yyyy", CultureInfo.InvariantCulture),
                IsPolicyMapped = !string.IsNullOrEmpty(model.ControlNumber),
                TxnInstrumentNo = model.InstrumentNumber,
                VerticalId = model.VerticalId,
                VoucherAmount = model.PaymentAmount,
                VoucherDate = DateTime.Now,
                VoucherNo = voucherNumber,
                VoucherTypeId = model.VoucherTypeId,
                CreatedBy = model.LoginUserId,
                CreatedTime = DateTime.Now,
                VoucherRemark = model.Remarks,
                VoucherStatusId = (short)VoucherStatus.Active,
                SearchCustomer =  model.SearchCustomer
            };

            _dataContext.tblVoucherDetails.Add(voucherDetail);
            await _dataContext.SaveChangesAsync();

            return new CommonDto<string>
            {
                IsSuccess = true,
                Message = $"Voucher is created successfully with Voucher Number {voucherDetail.VoucherNo}"
            };
        }

        public async Task<CommonDto<string>> UpdateVoucher(int voucherId, AddUpdateVoucherModel model)
        {
            tblVoucherDetails voucherDetail = await _dataContext.tblVoucherDetails.FirstOrDefaultAsync(f => f.VoucherId == voucherId);

            if (voucherDetail == null)
                return new CommonDto<string>
                {
                    Message = $"Invalid Voucher Id"
                };

            string errorMessage = string.Empty;

            if (voucherDetail.InsuranceCompanyId != model.InsuranceCompanyId)
                errorMessage += "Insurance Company, ";

            if (voucherDetail.VerticalId != model.VerticalId)
                errorMessage += "Vertical, ";

            if (!string.IsNullOrEmpty(voucherDetail.PolicyNo) && !voucherDetail.PolicyNo.ToLower().Equals(model.PolicyNumber.ToLower()))
                errorMessage += "Policy Number, ";

            if (voucherDetail.POSId.HasValue && voucherDetail.POSId != model.Pos)
                errorMessage += "Pos, ";

            if (!string.IsNullOrEmpty(errorMessage))
            {
                errorMessage = $"{errorMessage.Remove(errorMessage.Length - 2)} have mis-match values. We can't update.";

                return new CommonDto<string>
                {
                    Message = errorMessage
                };
            }

            voucherDetail.AccountUsedforCheque = model.AccountUsedForChequeIssue;
            voucherDetail.BankId = model.Bank;
            voucherDetail.ControlNo = model.ControlNumber;
            voucherDetail.CustomerName = model.CustomerName;
            voucherDetail.CustomerId = model.CustomerId;
            voucherDetail.InsuranceCompanyId = model.InsuranceCompanyId;
            voucherDetail.PaymentModeId = model.PaymentModeId;
            voucherDetail.PolicyId = model.PolicyId;
            voucherDetail.PolicyNo = model.PolicyNumber;
            voucherDetail.POSId = model.Pos;
            voucherDetail.ReferTypeId = model.ReferTypeId;
            voucherDetail.TeamMemberId = model.InHouse;
            voucherDetail.IsPolicyMapped = !string.IsNullOrEmpty(model.ControlNumber);
            voucherDetail.TxnInstrumentNo = model.InstrumentNumber;
            voucherDetail.VerticalId = model.VerticalId;
            voucherDetail.VoucherAmount = model.PaymentAmount;
            voucherDetail.ModifiedBy = model.LoginUserId;
            voucherDetail.ModifiedTime = DateTime.Now;
            voucherDetail.VoucherRemark = model.Remarks;
            voucherDetail.SearchCustomer = model.SearchCustomer;

            if (!string.IsNullOrEmpty(model.PaymentDate))
                voucherDetail.TxnInstrumentDate = DateTime.ParseExact(model.PaymentDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);

            if (model.UpdateMode == (int)VoucherUpdateMode.Modification)
            {
                voucherDetail.ModificationReason = model.Reason;
                voucherDetail.VoucherStatusId = (short)VoucherStatus.Active;
            }
            else if (model.UpdateMode == (int)VoucherUpdateMode.Cancel)
            {
                voucherDetail.CancelReason = model.Reason;
                voucherDetail.VoucherStatusId = (short)VoucherStatus.Cancel;
            }
            else if (model.UpdateMode == (int)VoucherUpdateMode.Bounced)
            {
                voucherDetail.BounceAmt = model.BouncedAmount;
                voucherDetail.BounceReceiptNo = model.BouncedReceiptNumber;
                voucherDetail.VoucherStatusId = (short)VoucherStatus.Bounced;
                if (!string.IsNullOrEmpty(model.BouncedDate))
                    voucherDetail.BounceDate = DateTime.ParseExact(model.BouncedDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);
            }

            if (voucherDetail.IsVerified.HasValue && voucherDetail.IsVerified.Value)
                voucherDetail.IsVerified = null;

            await _dataContext.SaveChangesAsync();

            return new CommonDto<string>
            {
                IsSuccess = true,
                Message = $"Voucher is updated successfully"
            };
        }

        public async Task<CommonDto<string>> UpdateVoucherControlNumber(int voucherId, AddUpdateVoucherModel model)
        {
            tblVoucherDetails voucherDetail = await _dataContext.tblVoucherDetails.FirstOrDefaultAsync(f => f.VoucherId == voucherId);

            if (voucherDetail == null)
                return new CommonDto<string>
                {
                    Message = $"Invalid Voucher Id"
                };

            string errorMessage = string.Empty;

            if (voucherDetail.InsuranceCompanyId != model.InsuranceCompanyId)
                errorMessage += "Insurance Company, ";

            if (voucherDetail.VerticalId != model.VerticalId)
                errorMessage += "Vertical, ";

            if (!string.IsNullOrEmpty(voucherDetail.PolicyNo) && !voucherDetail.PolicyNo.ToLower().Equals(model.PolicyNumber.ToLower()))
                errorMessage += "Policy Number, ";

            if (voucherDetail.POSId.HasValue && voucherDetail.POSId != model.Pos)
                errorMessage += "Pos, ";

            if (!string.IsNullOrEmpty(errorMessage))
            {
                errorMessage = $"{errorMessage.Remove(errorMessage.Length - 2)} have mis-match values. We can't update.";

                return new CommonDto<string>
                {
                    Message = errorMessage
                };
            }

            voucherDetail.ControlNo = model.ControlNumber;
            voucherDetail.IsPolicyMapped = true;
            voucherDetail.CustomerName = model.CustomerName;
            voucherDetail.CustomerId = model.CustomerId;
            voucherDetail.InsuranceCompanyId = model.InsuranceCompanyId;
            voucherDetail.PolicyId = model.PolicyId;
            voucherDetail.PolicyNo = model.PolicyNumber;
            voucherDetail.POSId = model.Pos;
            voucherDetail.ReferTypeId = model.ReferTypeId;
            voucherDetail.TeamMemberId = model.InHouse;
            voucherDetail.VerticalId = model.VerticalId;
            voucherDetail.ModificationReason = model.Reason;
            voucherDetail.ModifiedBy = model.LoginUserId;
            voucherDetail.ModifiedTime = DateTime.Now;
            voucherDetail.SearchCustomer = model.SearchCustomer;
            if (voucherDetail.IsVerified.HasValue && voucherDetail.IsVerified.Value)
                voucherDetail.IsVerified = null;

            await _dataContext.SaveChangesAsync();

            return new CommonDto<string>
            {
                IsSuccess = true,
                Message = $"Voucher Control Number is updated successfully"
            };
        }

        public async Task<CommonDto<string>> VerifyVoucher(int voucherId, AddUpdateVoucherModel model)
        {
            tblVoucherDetails voucherDetail = await _dataContext.tblVoucherDetails.FirstOrDefaultAsync(f => f.VoucherId == voucherId);

            if (voucherDetail == null)
                return new CommonDto<string>
                {
                    Message = $"Invalid Voucher Id"
                };

            if (voucherDetail.IsVerified.HasValue)
                return new CommonDto<string>
                {
                    Message = $"Verification is already done"
                };

            if (!model.IsVoucherVerified.HasValue)
                return new CommonDto<string>
                {
                    Message = $"Invalid Request"
                };

            if (!model.IsVoucherVerified.Value)
                voucherDetail.VoucherStatusId = (short)VoucherStatus.Reject;
            voucherDetail.VoucherRemark = model.Remarks;
            voucherDetail.IsVerified = model.IsVoucherVerified.Value;
            voucherDetail.VerifiedBy = model.LoginUserId;
            voucherDetail.VerifiedTime = DateTime.Now;

            await _dataContext.SaveChangesAsync();

            return new CommonDto<string>
            {
                IsSuccess = true,
                Message = $"Voucher is {(model.IsVoucherVerified.Value ? "approved" : "rejected")} successfully"
            };
        }

        public async Task<List<DropDownDto<int>>> FindAllVoucherTypes() => await _dataContext.tblVoucherType.Where(w => w.IsActive).Select(s => new DropDownDto<int>
        {
            Name = s.VoucherTypeName,
            Value = s.VoucherTypeId
        })
        .OrderBy(o => o.Name)
        .AsNoTracking()
        .ToListAsync();

        public async Task<List<VoucherSearchPolicyDto>> SearchPolicies(VoucherSearchPolicyModel model)
        {
            if (!string.IsNullOrEmpty(model.ControlNumber)
                || !string.IsNullOrEmpty(model.CustomerName)
                || (model.CustomerId.HasValue && model.CustomerId.Value > 0)
                || (model.InsuranceCompanyId.HasValue && model.InsuranceCompanyId.Value > 0)
                || (model.PosId.HasValue && model.PosId.Value > 0)
                || !string.IsNullOrEmpty(model.PolicyNumber)
                || (!string.IsNullOrEmpty(model.PolicyStartFromDate) && !string.IsNullOrEmpty(model.PolicyStartToDate)))
            {
                IQueryable<View_SearchForm> query = _dataContext.View_SearchForm.AsQueryable();

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

                if (model.InsuranceCompanyId.HasValue && model.InsuranceCompanyId.Value > 0)
                    query = query.Where(w => w.InsuranceCompanyIdNumber == model.InsuranceCompanyId);

                if (model.PosId.HasValue && model.PosId.Value > 0)
                    query = query.Where(w => w.POSId == model.PosId);

                if (!string.IsNullOrEmpty(model.PolicyStartFromDate) && !string.IsNullOrEmpty(model.PolicyStartToDate))
                {
                    DateTime from = DateTime.ParseExact(model.PolicyStartFromDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                    DateTime to = DateTime.ParseExact(model.PolicyStartToDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                    query = query.Where(w => w.StartDate >= from && w.StartDate <= to);
                }

                return await query.Select(s => new VoucherSearchPolicyDto
                {
                    ControlNumber = s.ControlNo,
                    CustomerName = s.NameInPolicy,
                    CustomerId = s.CustomerId,
                    GrossPremium = s.GrossPremium ?? 0,
                    PolicyId = s.PolicyId,
                    PolicyNumber = s.PolicyNumber,
                    PolicyStartDate = s.StartDate,
                    InsuranceCompany = s.InsuranceCompany,
                    InsuranceCompanyId = s.InsuranceCompanyIdNumber ?? 0,
                    Pos = s.POSName,
                    PosId = s.POSId,
                    Telecaller = "N/A",
                    Vertical = s.VerticalName,
                    VerticalId = s.VerticalId
                })
                .AsNoTracking()
                .ToListAsync();
            }

            return new List<VoucherSearchPolicyDto>();
        }

        public async Task<List<SearchVoucherDto>> SearchVouchers(SearchVoucherModel model)
        {
            if (!string.IsNullOrEmpty(model.VoucherNumber)
                || !string.IsNullOrEmpty(model.CustomerName)
                || (model.CustomerId.HasValue && model.CustomerId.Value > 0)
                || (model.InsuranceCompanyId.HasValue && model.InsuranceCompanyId.Value > 0)
                || (model.PosId.HasValue && model.PosId.Value > 0)
                || !string.IsNullOrEmpty(model.PolicyNumber)
                || model.IsShowAll
                || (!string.IsNullOrEmpty(model.VoucherStartFromDate) && !string.IsNullOrEmpty(model.VoucherStartToDate)))
            {
                DateTime tillDate = DateTime.Now.AddDays(-365);
                IQueryable<SearchVoucher> query = _dataContext.SearchVoucher.Where(w => w.BranchId == model.LoginUserBranchId && w.VoucherDate >= tillDate).AsQueryable();
                var roles = await _dataContext.tblUserRole.Where(x => x.UserRoleId == model.RoleId).FirstOrDefaultAsync();

                if (!model.IsShowAll)
                {
                    if (!string.IsNullOrEmpty(model.VoucherNumber))
                    {
                        if (int.TryParse(model.VoucherNumber, out int number))
                            query = query.Where(w => w.VoucherNumberDigit == number);
                        else
                            query = query.Where(w => w.VoucherNumber.Equals(model.VoucherNumber));
                    }

                    if (model.CustomerId.HasValue && model.CustomerId.Value > 0)
                        query = query.Where(w => w.CustomerId == model.CustomerId);

                    if (!string.IsNullOrEmpty(model.CustomerName))
                        query = query.Where(w => w.Customer.ToLower().StartsWith(model.CustomerName.ToLower()));

                    if (model.InsuranceCompanyId.HasValue && model.InsuranceCompanyId.Value > 0)
                        query = query.Where(w => w.InsuranceCompanyId == model.InsuranceCompanyId);

                    if (model.PosId.HasValue && model.PosId.Value > 0)
                        query = query.Where(w => w.PosId == model.PosId);

                    if (!string.IsNullOrEmpty(model.PolicyNumber))
                        query = query.Where(w => w.PolicyNumber.Equals(model.PolicyNumber));

                    if (!string.IsNullOrEmpty(model.VoucherStartFromDate) && !string.IsNullOrEmpty(model.VoucherStartToDate))
                    {
                        DateTime from = DateTime.ParseExact(model.VoucherStartFromDate, "MM/dd/yyyy", CultureInfo.InvariantCulture);
                        DateTime to = DateTime.ParseExact(model.VoucherStartToDate, "MM/dd/yyyy", CultureInfo.InvariantCulture).AddHours(23).AddMinutes(59).AddSeconds(59);
                        query = query.Where(w => w.VoucherDate >= from && w.VoucherDate <= to);
                    }
                }
                if (roles.VerticalData != null)
                {
                    var verticalsegments = roles.VerticalData.Split(',');

                    query = query.Where(w => verticalsegments.Contains(w.VerticalSegmentId.ToString()));
                }
                if (model.Mode == (int)VoucherFormMode.Verification)
                    query = query.Where(w => w.IsVerified == null && w.StatusId != (short)VoucherStatus.Reject && w.CreatedBy != model.LoginUserId && w.ModifiedBy != model.LoginUserId);

                if (model.Mode == (int)VoucherFormMode.Update)
                    query = query.Where(w => w.StatusId != (short)VoucherStatus.Reject && (w.IsVerified == null || (w.IsVerified.HasValue && w.IsVerified.Value)));

                if (model.Mode == (int)VoucherFormMode.UpdateControlNumber)
                    query = query.Where(w => w.VoucherTypeId <= 3 && (!w.IsPolicyMapped.HasValue || !w.IsPolicyMapped.Value));

                return await query.Select(s => new SearchVoucherDto
                {
                    VoucherId = s.VoucherId,
                    PolicyNumber = s.PolicyNumber,
                    Customer = s.Customer,
                    InstrumentNumber = s.InstrumentNumber,
                    VoucherNumber = s.VoucherNumber,
                    VoucherAmount = s.VoucherAmount,
                    VoucherDate = s.VoucherDate,
                    Pos = s.PosName,
                    Bank = s.Bank,
                    PaymentMode = s.PaymentMode,
                    VoucherType = s.VoucherType,
                    TeamMember = s.TeamMember,
                    InsuranceCompany = s.InsuranceCompany,
                })
                .AsNoTracking()
                .ToListAsync();
            }

            return new List<SearchVoucherDto>();
        }

        public async Task<VoucherDto> FindVoucherById(int voucherId)
        {
            VoucherDto voucher = await _dataContext.tblVoucherDetails.AsNoTracking()
                                                                     .Where(w => w.VoucherId == voucherId)
                                                                     .Select(s => new VoucherDto
                                                                     {
                                                                         AccountUsedForChequeIssue = s.AccountUsedforCheque,
                                                                         BankId = s.BankId ?? 0,
                                                                         ControlNumber = s.ControlNo,
                                                                         CustomerId = s.CustomerId ?? 0,
                                                                         CustomerName = s.CustomerName,
                                                                         InHouseId = s.TeamMemberId ?? 0,
                                                                         InstrumentNumber = s.TxnInstrumentNo,
                                                                         InsuranceCompanyId = s.InsuranceCompanyId,
                                                                         PaymentAmount = s.VoucherAmount,
                                                                         PaymentDate = s.TxnInstrumentDate,
                                                                         PaymentModeId = s.PaymentModeId ?? 0,
                                                                         PolicyNumber = s.PolicyNo,
                                                                         PosId = s.POSId ?? 0,
                                                                         ReferTypeId = s.ReferTypeId ?? 0,
                                                                         Remarks = s.VoucherRemark ?? "N/A",
                                                                         VerticalId = s.VerticalId ?? 0,
                                                                         VoucherTypeId = s.VoucherTypeId ?? 0,
                                                                         PolicyId = s.PolicyId ?? 0,
                                                                         VoucherNumber = s.VoucherNo,
                                                                         VoucherDate = s.CreatedTime,
                                                                         CreatedId = s.CreatedBy ?? 0,
                                                                         CreatedDate = s.CreatedTime,
                                                                         ModifiedId = s.ModifiedBy ?? 0,
                                                                         ModifiedDate = s.ModifiedTime,
                                                                         VerifiedId = s.VerifiedBy ?? 0,
                                                                         VerifiedDate = s.VerifiedTime,
                                                                         ModificationReason = s.ModificationReason ?? string.Empty,
                                                                         BouncedAmount = s.BounceAmt ?? 0,
                                                                         BouncedDate = s.BounceDate,
                                                                         BouncedReceiptNumber = s.BounceReceiptNo,
                                                                         CancellationReason = s.CancelReason ?? string.Empty,
                                                                         StatusId = s.VoucherStatusId ?? 0,
                                                                         VerificationStatus = s.IsVerified.HasValue ? "VERIFIED" : "NOT VERIFIED",
                                                                         SearchCustomer = s.SearchCustomer
                                                                     })
                                                                     .FirstOrDefaultAsync();

            voucher.CreatedBy = await _dataContext.tblUser.Where(w => w.UserId == voucher.CreatedId).Select(s => s.UserFullName).FirstOrDefaultAsync();
            voucher.Status = await _dataContext.tblVoucherStatus.Where(w => w.VoucherStatusId == voucher.StatusId).Select(s => s.VoucherStatus.ToUpper()).FirstOrDefaultAsync();
            voucher.VoucherType = await _dataContext.tblVoucherType.Where(w => w.VoucherTypeId == voucher.VoucherTypeId).Select(s => s.VoucherTypeName.ToUpper()).FirstOrDefaultAsync();

            if (voucher.ModifiedId > 0)
                voucher.ModifiedBy = await _dataContext.tblUser.Where(w => w.UserId == voucher.ModifiedId).Select(s => s.UserFullName).FirstOrDefaultAsync();

            if (voucher.VerifiedId > 0)
                voucher.VerifiedBy = await _dataContext.tblUser.Where(w => w.UserId == voucher.VerifiedId).Select(s => s.UserFullName).FirstOrDefaultAsync();

            return voucher;
        }

        public async Task<CommonDto<string>> AddCommisionSlab(List<CommisionSlabModel> model,BaseModel baseModel)
        {
            var commisionSlab =  new tblCommissionSlab();
            foreach (var v in model) {
                if (v.CommisionSlabId != 0)
                {
                    commisionSlab.ModifiedBy = baseModel.LoginUserId;
                    commisionSlab.ModifiedTime = DateTime.Now;
                }
                commisionSlab.CommissionSlabId = v.CommisionSlabId;
                  commisionSlab.ManufacturerId = JsonConvert.SerializeObject(v.ManufacturerId);
                  commisionSlab.ProductId = JsonConvert.SerializeObject(v.ManufacturerId);
                  commisionSlab.ModelId = JsonConvert.SerializeObject(v.ModelId);
                  commisionSlab.FuelTypeId = JsonConvert.SerializeObject(v.FuelTypeId);
                  commisionSlab.InsureCompanyId = JsonConvert.SerializeObject(v.InsuranceCompanyId);
                  commisionSlab.PolicyTypeId = JsonConvert.SerializeObject(v.PolicyType);
                  commisionSlab.VehicleClassId = JsonConvert.SerializeObject(v.VehicleClassTypeId);
                  commisionSlab.SlabStart = v.SlabStartRs;
                  commisionSlab.SlabEnd = v.SlabUptoRs;
                  commisionSlab.ExshowroomValueEnd = v.ExShowroomUpTo;
                  commisionSlab.ExshowroomValueStart = v.ExShowroomStart;
                  commisionSlab.SplDiscountFrom = v.SplDiscountSlab;
                  commisionSlab.SplDiscountUpTo = v.SplDiscountSlabUpto;
                  commisionSlab.IsActive = 1;
                  commisionSlab.CreatedBy = baseModel.LoginUserId;
                  commisionSlab.CreatedTime = DateTime.Now;
                  commisionSlab.BranchId = v.BranchId;
                  commisionSlab.VerticalId = v.VerticalId;
                  commisionSlab.NcbId = JsonConvert.SerializeObject(v.Ncb);
                  commisionSlab.PackageTypeId = JsonConvert.SerializeObject(v.PackageType);
                  commisionSlab.CommissionPercent = v.CommApplicable;
                  commisionSlab.VerticalId = v.VerticalId;
                  commisionSlab.CommissionSlabTypeId = v.VolumeCriteria;
                  commisionSlab.CommissionTurnoverTypeId = v.TurnOverRatio;

                _dataContext.tblCommissionSlab.AddOrUpdate(commisionSlab);
                _dataContext.SaveChanges();
            }

            return new CommonDto<string>
            {
                IsSuccess = true,
                Message = $"Commission Slab successfully"
            };

        }

        public async Task<List<dynamic>> GetCommisionSlab(int branchId,int verticalId)
        {
            var query = await _dataContext.tblCommissionSlab.Where(x=>x.BranchId == branchId && x.VerticalId ==  verticalId).ToListAsync<dynamic>();
            return query;

        }

        public async Task<CommonDto<string>> InsertCommisionSlabCalculation(PosCommisonMotorModel posCommisonMotorModel)
        {
            var datefrom = new DateTime();
            if (!string.IsNullOrEmpty(posCommisonMotorModel.MonthCycleStart) )
            {
                 datefrom = DateTime.ParseExact(posCommisonMotorModel.MonthCycleStart, "MM/dd/yyyy", CultureInfo.InvariantCulture);
            }

            var checkCommisionFreze =  _dataContext.tblMonthCycle.Where(x=>x.MonthCycleId == posCommisonMotorModel.MonthCycleId && x.CommissionFreeze == 1).Any();
            if (checkCommisionFreze)
            {
                return new CommonDto<string>
                {
                    IsSuccess = true,
                    Message = $"This Month Commission Statement (Motor) already Freeze, Can not Process Again.",
                    Response = "Ok"
                };
            }


            var commisonAlreadyPresent = _dataContext.tblCommissionCalculation.Where(x => x.CommissionMonthId == posCommisonMotorModel.MonthCycleId && x.VerticleId == 1).ToList();
            if (commisonAlreadyPresent.Count()> 0 )
            {

                return new CommonDto<string>
                {
                    IsSuccess = false,
                    Message = $"This Month Commission statement (Motor) already processed, Want to do Process Commissions again on New Commission Structure?",
                    Response = "Ok"
                };
            }

            if (commisonAlreadyPresent.Count() > 0 && posCommisonMotorModel.IsRecalculation)
            {
                _dataContext.tblCommissionCalculation.RemoveRange(commisonAlreadyPresent);
            }

            var varMonthCycleId = posCommisonMotorModel.MonthCycleId;
            var varBranchId = posCommisonMotorModel.BranchId;
            var dtpChkTo = posCommisonMotorModel.MonthCycleId;

            var combinedQuery =
                    from motorPolicy in _dataContext.tblMotorPolicyDatas
                    join insuranceCompany in _dataContext.tblInsuranceCompany on motorPolicy.InsuranceCompanyId equals insuranceCompany.InsuranceCompanyId
                    join policyType in _dataContext.tblPolicyType on motorPolicy.PolicyTypeId equals policyType.PolicyTypeId
                    join manufacturer in _dataContext.tblManufacturers on motorPolicy.ManufacturerId equals manufacturer.ManufacturerId
                    join model in _dataContext.tblModel on motorPolicy.ModelId equals model.ModelId
                    join variant in _dataContext.tblVariant on motorPolicy.VariantId equals variant.VariantId
                    join makeYear in _dataContext.tblMakeYear on motorPolicy.MakeYearId equals makeYear.MakeYearId
                    join vehicleClass in _dataContext.tblVehicleClass on motorPolicy.VehicleClassId equals vehicleClass.VehicleClassId
                    join policyStatus in _dataContext.tblPolicyStatus on motorPolicy.PolicyStatusId equals policyStatus.PolicyStatusId
                    join ncb in _dataContext.tblNCB on motorPolicy.NCBId equals ncb.NCBId into ncbJoin
                    from ncb in ncbJoin.DefaultIfEmpty()
                    join endorsementReason in _dataContext.tblEndorsementReason on motorPolicy.PolicyCancelReasonId equals endorsementReason.EndorsementReasonId into endorsementJoin
                    from endorsementReason in endorsementJoin.DefaultIfEmpty()
                    join addonRider in _dataContext.tblAddonRider on motorPolicy.AddonRiderId equals addonRider.AddonRiderId into addonRiderJoin
                    from addonRider in addonRiderJoin.DefaultIfEmpty()
                    join policyTerm in _dataContext.tblPolicyTerm on motorPolicy.PolicyTermId equals policyTerm.PolicyTermId into policyTermJoin
                    from policyTerm in policyTermJoin.DefaultIfEmpty()
                    join insuranceCompanyOD in _dataContext.tblInsuranceCompany on motorPolicy.InsuranceCompanyODId equals insuranceCompanyOD.InsuranceCompanyId into insuranceCompanyODJoin
                    from insuranceCompanyOD in insuranceCompanyODJoin.DefaultIfEmpty()
                    join voucherDetails in _dataContext.tblVoucherDetails on motorPolicy.PolicyId equals voucherDetails.PolicyId
                     into voucherDetailsJoin
                    from voucherDetails in voucherDetailsJoin.DefaultIfEmpty()

                    join pos in _dataContext.tblPOS on motorPolicy.POSId equals pos.POSId into posJoin
                    from pos in posJoin.DefaultIfEmpty()

                    join tc in _dataContext.tblTeamMember on motorPolicy.TeleCallerId equals tc.TeamMemberId into tcGroup
                    from tc in tcGroup.DefaultIfEmpty()
                    join fos in _dataContext.tblTeamMember on motorPolicy.FOSId equals fos.TeamMemberId into fosGroup
                    from fos in fosGroup.DefaultIfEmpty()

                    join r in _dataContext.tblReference on motorPolicy.ReferenceId equals r.ReferenceId into rGroup
                    from r in rGroup.DefaultIfEmpty()

                    where motorPolicy.BranchId == varBranchId
                          && motorPolicy.IsVerified == true
                         && (motorPolicy.POSCommissionReceived == (int)POSCommsisionStatus.NOTRECIEVED || !motorPolicy.POSCommissionReceived.HasValue)       && motorPolicy.VerticalId == (int)Vertical.Motor
                      && ((motorPolicy.PolicyStartDate <= datefrom && policyTerm.PolicyPackageType == "TP only")
                            || (motorPolicy.PolicyStartDateOD <= datefrom && (policyTerm.PolicyPackageType == "OD only" || policyTerm.PolicyPackageType == "Comprehensive")))
                    orderby motorPolicy.POSId, insuranceCompany.InsuranceCompanyName, policyType.PolicyType, vehicleClass.VehicleMainClass, variant.ExShowroomValue, motorPolicy.PolicyStartDate
                    select new 
                    {
                        POSName = pos.POSName,
                        POsId = motorPolicy.POSId,
                        CompanyName = insuranceCompanyOD.InsuranceCompanyName !=null ? insuranceCompanyOD.InsuranceCompanyName : insuranceCompany.InsuranceCompanyName ?? null,
                        PolicyMainType = "Motor Policy",
                        VehicleMainClass = vehicleClass.VehicleMainClass ?? null,
                        ExShowroomValue = variant.ExShowroomValue,
                        OD = motorPolicy.OD,
                        NameInPolicy =motorPolicy.NameInPolicy ?? null,
                         IssueDate = motorPolicy.PolicyStartDate,
                        PolicyId =motorPolicy.PolicyId,
                        ControlNo = motorPolicy.ControlNo ?? null,
                        RegistrationNo = motorPolicy.RegistrationNo ?? null,
                        GrossPremium = motorPolicy.GrossPremium,
                        TotalIDV = motorPolicy.TotalIDV ?? null,
                        PolicyNo = motorPolicy.PolicyNoOD != null ? motorPolicy.PolicyNoOD : motorPolicy.PolicyNo,
                        ManufacturerName = manufacturer.ManufacturerName ?? null,
                        ModelName = model.ModelName ?? null,
                        FuelType  =motorPolicy.FuelType ?? null,
                        CubicCapacity = motorPolicy.CubicCapacity ?? null,
                        SeatingCapacity=  motorPolicy.SeatingCapacity ?? null,
                        Loading = motorPolicy.Loading ?? null,
                        TeleCaller = tc.TeamMemberName,
                        FOS = fos.TeamMemberName,
                        BusinessDoneBy  = motorPolicy.BusinessDoneBy,
                       VerticleId = motorPolicy.VerticalId,
                        PolicyRemarks = motorPolicy.PolicyRemarks,
                        PolicyStatus = policyStatus.PolicyStatus ?? null,
                        EndorsementReason = endorsementReason.EndorsementReason ?? null,
                       PolicyCancelDate = motorPolicy.PolicyCancelDate,
                        ReferenceName = r.ReferenceName,
                        EndorseGrossPremium = motorPolicy.EndorseGrossPremium ?? null,
                        EndorseOD =motorPolicy.EndorseOD ?? null,
                        VehicleClass = vehicleClass.VehicleClass ?? null,
                        PolicyType = policyType.PolicyType,
                        CommissionMonthId = varMonthCycleId,
                       InsureCompanyId = motorPolicy.InsuranceCompanyODId != null ? motorPolicy.InsuranceCompanyODId :  motorPolicy.InsuranceCompanyId,
                        VehicleMainClassId = vehicleClass.VehicleMainClassId ?? null,
                        PolicyMainTypeId = policyType.PolicyMainTypeId ?? null,
                        ManufacturerId = motorPolicy.ManufacturerId,
                        ModelId = motorPolicy.ModelId,
                        AddonPlan = addonRider.AddonRiderName ?? null,
                        VehicleClassId = motorPolicy.VehicleClassId,
                        PolicyTermId = motorPolicy.PolicyTermId,
                        PolicyTermName = policyTerm.PolicyTermName ?? null,
                        BranchId = varBranchId,
                        NCBPercent = ncb!= null ? ncb.NCBPercentage : (int?)null,
                        NCBId = motorPolicy.NCBId ,
                        FuelTypeId = variant != null ? variant.FuelTypeId : (int?)null ,
                        PolicyStartDate   = motorPolicy.PolicyPackageType == "TP only" ?   motorPolicy.PolicyStartDate : motorPolicy.PolicyStartDateOD ,
                       ShortFallTotal = voucherDetails !=null ? voucherDetails.VoucherAmount : (int?)null,
                        motorPolicy.PolicyPackageType,
                        motorPolicy.SpecialDiscount,
                        motorPolicy.PolicyTypeId
                    };

            var resultList = combinedQuery.AsEnumerable().Select(x => new tblCommissionCalculation
            {
                POSName = x.POSName,
                POsId = x.POsId,
                CompanyName = x.CompanyName,
                PolicyMainType = x.PolicyMainType,
                VehicleMainClass = x.VehicleMainClass,
                ExShowroomValue = x.ExShowroomValue,
                OD = x.OD,
                NameInPolicy = x.NameInPolicy,
                IssueDate = x.IssueDate,
                PolicyId = x.PolicyId,
                ControlNo = x.ControlNo,
                RegistrationNo = x.RegistrationNo,
                GrossPremium = x.GrossPremium,
                TotalIDV = x.TotalIDV,
                PolicyNo = x.PolicyNo,
                ManufacturerName = x.ManufacturerName,
                ModelName = x.ModelName,
                FuelType = x.FuelType,
                CubicCapacity = x.CubicCapacity,
                SeatingCapacity = x.SeatingCapacity,
                Loading = x.Loading,
                TeleCaller = x.TeleCaller,
                FOS = x.FOS,
                BusinessDoneBy = x.BusinessDoneBy,
                VerticleId = x.VerticleId,
                PolicyRemarks = x.PolicyRemarks,
                PolicyStatus = x.PolicyStatus,
                EndorsementReason = x.EndorsementReason,
                PolicyCancelDate = x.PolicyCancelDate,
                ReferenceName = x.ReferenceName,
                EndorseGrossPremium = x.EndorseGrossPremium,
                EndorseOD = x.EndorseOD,
                VehicleClass = x.VehicleClass,
                PolicyType = x.PolicyType,
                CommissionMonthId = x.CommissionMonthId,
                InsureCompanyId = x.InsureCompanyId,
                VehicleMainClassId = x.VehicleMainClassId,
                PolicyMainTypeId = x.PolicyMainTypeId,
                ManufacturerId = x.ManufacturerId,
                ModelId = x.ModelId,
                AddonPlan = x.AddonPlan,
                VehicleClassId = x.VehicleClassId,
                PolicyTermId = x.PolicyTermId,
                PolicyTermName = x.PolicyTermName,
                BranchId = x.BranchId,
                NCBPercent = x.NCBPercent,
                NCBId = x.NCBId,
                FuelTypeId = x.FuelTypeId,
                PolicyStartDate = x.PolicyStartDate,
                ShortFallTotal = x.ShortFallTotal,
                PolicyPackageType= x.PolicyPackageType,
                SpecialDiscount = x.SpecialDiscount,
                PolicyTypeId = x.PolicyTypeId,
            }).ToList();
           
            await CommisionCalculationMotorPolicy(posCommisonMotorModel, resultList);
            await CommisionCalculationEndrosement(posCommisonMotorModel, resultList);

            return new CommonDto<string>
            {
                IsSuccess = true,
                Message = $"Commission Calculation Slab successfully",
                Response = "Ok"
            };

        }

        public async Task CommisionCalculationMotorPolicy(PosCommisonMotorModel posCommisonMotorModel, List<tblCommissionCalculation> tblCommissionCalculations)
        {

            _dataContext.tblCommissionCalculation.AddRange(tblCommissionCalculations);
            _dataContext.SaveChanges();
            var commissionSlabs = _dataContext.tblCommissionSlab
                            .Where(cs => cs.VerticalId == 1 && cs.BranchId == posCommisonMotorModel.BranchId)
                           .OrderBy(cs => cs.InsureCompanyId)
                            .ThenBy(cs => cs.CommissionSlabTypeId)
                            .ThenBy(cs => cs.PolicyMainTypeId)
                            .ThenBy(cs => cs.VehicleMainClassId)
                            .ThenBy(cs => cs.SplDiscountFrom)
                            .ThenBy(cs => cs.FuelTypeId)
                            .ThenBy(cs => cs.ExshowroomValueStart)
                            .ThenBy(cs => cs.ManufacturerId)
                            .ThenBy(cs => cs.ModelId)
                            .ToList();
            var tblCommisonCalculation = _dataContext.tblCommissionCalculation.ToList();
            foreach (var slab in commissionSlabs)
            {
                List<int?> insureCompanyIds = null;
                List<int?> vehicleClassIds = null;
                List<int?> policyTypeIds = null;
                List<int?> policyTermIds = null;
                List<int?> manufacturerIds = null;
                List<int?> modelIds = null;
                List<int?> fuelTypeIds = null;
                List<int?> ncbIds = null;
                // Check if the properties are not null before deserialization
                if (slab.InsureCompanyId != null)
                {
                    insureCompanyIds = JsonConvert.DeserializeObject<List<int?>>(slab.InsureCompanyId);
                }

                if (slab.VehicleClassId != null)
                {
                    vehicleClassIds = JsonConvert.DeserializeObject<List<int?>>(slab.VehicleClassId);
                }

                if (slab.PolicyTypeId != null)
                {
                    policyTypeIds = JsonConvert.DeserializeObject<List<int?>>(slab.PolicyTypeId);
                }

                if (slab.PolicyTermId != null)
                {
                    policyTermIds = JsonConvert.DeserializeObject<List<int?>>(slab.PolicyTermId);
                }

                if (slab.ManufacturerId != null)
                {
                    manufacturerIds = JsonConvert.DeserializeObject<List<int?>>(slab.ManufacturerId);
                }

                if (slab.ModelId != null)
                {
                    modelIds = JsonConvert.DeserializeObject<List<int?>>(slab.ModelId);
                }

                if (slab.FuelTypeId != null)
                {
                    fuelTypeIds = JsonConvert.DeserializeObject<List<int?>>(slab.FuelTypeId);
                }

                if (slab.NcbId != null)
                {
                    ncbIds = JsonConvert.DeserializeObject<List<int?>>(slab.NcbId);
                }

                if (slab.CommissionSlabTypeId == 1) // Volume Slab
                {
                    var tblCommisonCalculationVolumeSlab = tblCommisonCalculation;
                    var query = tblCommisonCalculationVolumeSlab
                                .Where(cc =>  insureCompanyIds.Contains(cc.InsureCompanyId) &&
                                             cc.VerticleId == (int)Vertical.Motor && cc.CommissionMonthId == posCommisonMotorModel.MonthCycleId)
                                            ;
                    var test = query.ToList();
                    if (vehicleClassIds !=  null && vehicleClassIds.Any())
                    {
                        if (slab.CommissionTurnoverTypeId == 2 || slab.CommissionTurnoverTypeId == 4)
                        {
                            query = query.Where(cc => vehicleClassIds.Contains(cc.VehicleClassId));
                        }
                    }

                    if (policyTypeIds != null && policyTypeIds.Any())
                    {
                        query = query.Where(cc => policyTypeIds.Contains(cc.PolicyTypeId));
                    }

                    if (policyTermIds != null && policyTermIds.Any())
                    {
                        query = query.Where(cc => policyTermIds.Contains(cc.PolicyTermId));
                    }

                    if (manufacturerIds != null && manufacturerIds.Any())
                    {
                        query = query.Where(cc => manufacturerIds.Contains(cc.ManufacturerId));
                    }

                    if (modelIds != null && modelIds.Any())
                    {
                        query = query.Where(cc => modelIds.Contains(cc.ModelId));
                    }

                    if (slab.CommissionTurnoverTypeId == 1 || slab.CommissionTurnoverTypeId == 4)
                    {
                        query = query.Where(cc => cc.SpecialDiscount >= slab.SplDiscountFrom && cc.SpecialDiscount <= slab.SplDiscountUpTo);
                    }

                    if (slab.ExshowroomValueEnd != 0)
                    {
                        query = query.Where(cc => cc.ExShowroomValue >= slab.ExshowroomValueStart && cc.ExShowroomValue <= slab.ExshowroomValueEnd);
                    }

                    if (fuelTypeIds != null && fuelTypeIds.Any() )
                    {
                        query = query.Where(cc => fuelTypeIds.Contains(cc.FuelTypeId));
                    }

                    if (ncbIds != null && ncbIds.Any())
                    {
                        query = query.Where(cc => ncbIds.Contains (cc.NCBId));
                    }

                    var dsaGroups = query.GroupBy(cc => cc.POsId)
                                         .Select(g => new { POSID = g.Key, ODSum = g.Sum(x => x.OD) })
                                         .ToList();

                    foreach (var group in dsaGroups)
                    {
                        if (group.ODSum >= slab.SlabStart && group.ODSum <= slab.SlabEnd)
                        {
                            var tblCommisonCalculationODSum = tblCommisonCalculation;

                            var updateQuery = tblCommisonCalculationODSum
                                .Where(cc => insureCompanyIds.Contains(cc.InsureCompanyId) &&
                                             cc.VerticleId == (int)Vertical.Motor &&
                                             cc.POsId == group.POSID &&
                                             cc.CommissionMonthId == posCommisonMotorModel.MonthCycleId);

                            if (vehicleClassIds != null && vehicleClassIds.Any())
                            {
                                updateQuery = updateQuery.Where(cc => vehicleClassIds.Contains(cc.VehicleClassId));
                            }

                            if (policyTypeIds != null && policyTypeIds.Any())
                            {
                                updateQuery = updateQuery.Where(cc => policyTypeIds.Contains(cc.PolicyTypeId));
                            }

                            if (manufacturerIds != null && manufacturerIds.Any())
                            {
                                updateQuery = updateQuery.Where(cc => manufacturerIds.Contains(cc.ManufacturerId));
                            }

                            if (modelIds != null && modelIds.Any())
                            {
                                updateQuery = updateQuery.Where(cc => modelIds.Contains(cc.ModelId));
                            }


                            if (slab.CommissionTurnoverTypeId == 1 || slab.CommissionTurnoverTypeId == 4)
                            {
                                updateQuery = updateQuery.Where(cc => cc.SpecialDiscount >= slab.SplDiscountFrom && cc.SpecialDiscount <= slab.SplDiscountUpTo);
                            }


                            if (slab.ExshowroomValueEnd !=0)
                            {
                                updateQuery = updateQuery.Where(cc => cc.ExShowroomValue >= slab.ExshowroomValueStart && cc.ExShowroomValue <= slab.ExshowroomValueEnd);
                            }

                            if (fuelTypeIds != null && fuelTypeIds.Any())
                            {
                                updateQuery = updateQuery.Where(cc => fuelTypeIds.Contains(cc.FuelTypeId));
                            }

                            updateQuery.ToList().ForEach(cc => cc.CommisionPercentage = slab.CommissionPercent);
                            _dataContext.SaveChanges();
                        }
                    }
                }
                else if (slab.CommissionSlabTypeId == 2) // Single Case
                {
                    var tblCommisonCalculationSingleCase = tblCommisonCalculation;

                    var updateQuery = tblCommisonCalculationSingleCase.Where(cc => insureCompanyIds.Contains(cc.InsureCompanyId) &&
                                     cc.VerticleId == 1 &&
                                     cc.CommissionMonthId == posCommisonMotorModel.MonthCycleId);

                    if (vehicleClassIds != null && vehicleClassIds.Any())
                    {

                        updateQuery = updateQuery.Where(cc => vehicleClassIds.Contains(cc.VehicleClassId));
                        
                    }

                    if (policyTypeIds != null && policyTypeIds.Any())
                    {
                        updateQuery = updateQuery.Where(cc => policyTypeIds.Contains(cc.PolicyTypeId));
                    }

                    if (policyTermIds != null && policyTermIds.Any())
                    {
                        updateQuery = updateQuery.Where(cc => policyTermIds.Contains(cc.PolicyTermId));
                    }

                    if (manufacturerIds != null && manufacturerIds.Any())
                    {
                        updateQuery = updateQuery.Where(cc => manufacturerIds.Contains(cc.ManufacturerId));
                    }

                    if (modelIds != null && modelIds.Any())
                    {
                        updateQuery = updateQuery.Where(cc => modelIds.Contains(cc.ModelId));
                    }

                    if (slab.ExshowroomValueEnd != 0)
                    {
                        updateQuery = updateQuery.Where(cc => cc.ExShowroomValue >= slab.ExshowroomValueStart && cc.ExShowroomValue <= slab.ExshowroomValueEnd);
                    }

                    if (fuelTypeIds != null && fuelTypeIds.Any())
                    {
                        updateQuery = updateQuery.Where(cc => fuelTypeIds.Contains(cc.FuelTypeId));
                    }
                    if (ncbIds != null && ncbIds.Any())
                    {
                        updateQuery = updateQuery.Where(cc => ncbIds.Contains(cc.NCBId));
                    }

                    if (slab.CommissionTurnoverTypeId == 1 || slab.CommissionTurnoverTypeId == 4)
                    {
                        updateQuery = updateQuery.Where(cc => cc.SpecialDiscount >= slab.SplDiscountFrom && cc.SpecialDiscount <= slab.SplDiscountUpTo);
                    }

                    updateQuery.ToList().ForEach(cc => cc.CommisionPercentage = slab.CommissionPercent);
                    _dataContext.SaveChanges();
                }
                else if (slab.CommissionSlabTypeId == 4) // Flat Slab
                {
                    var tblCommisonCalculationFlatCase = tblCommisonCalculation;

                    var updateQuery = tblCommisonCalculationFlatCase.Where( cc => insureCompanyIds.Contains(cc.InsureCompanyId) &&
                                     cc.VerticleId == 1 &&
                                     cc.CommissionMonthId == posCommisonMotorModel.MonthCycleId);
                    if (vehicleClassIds != null && vehicleClassIds.Any())
                    {

                        updateQuery = updateQuery.Where(cc => vehicleClassIds.Contains(cc.VehicleClassId));

                    }

                    if (policyTypeIds != null && policyTypeIds.Any())
                    {
                        updateQuery = updateQuery.Where(cc => policyTypeIds.Contains(cc.PolicyTypeId));
                    }

                    if (policyTermIds != null && policyTermIds.Any())
                    {
                        updateQuery = updateQuery.Where(cc => policyTermIds.Contains(cc.PolicyTermId));
                    }

                    if (manufacturerIds != null && manufacturerIds.Any())
                    {
                        updateQuery = updateQuery.Where(cc => manufacturerIds.Contains(cc.ManufacturerId));
                    }

                    if (modelIds != null && modelIds.Any())
                    {
                        updateQuery = updateQuery.Where(cc => modelIds.Contains(cc.ModelId));
                    }

                    if (slab.ExshowroomValueEnd != 0)
                    {
                        updateQuery = updateQuery.Where(cc => cc.ExShowroomValue >= slab.ExshowroomValueStart && cc.ExShowroomValue <= slab.ExshowroomValueEnd);
                    }
                    if (fuelTypeIds != null && fuelTypeIds.Any())
                    {
                        updateQuery = updateQuery.Where(cc => fuelTypeIds.Contains(cc.FuelTypeId));
                    }


                    if (slab.CommissionTurnoverTypeId == 1 || slab.CommissionTurnoverTypeId == 4)
                    {
                        updateQuery = updateQuery.Where(cc => cc.SpecialDiscount >= slab.SplDiscountFrom && cc.SpecialDiscount <= slab.SplDiscountUpTo);
                    }

                    updateQuery.ToList().ForEach(cc => cc.CommisionPercentage = slab.CommissionPercent);
                    _dataContext.SaveChanges();
                }
                //Update CommissionCalculation Where PolicyStatus is Cancel
                tblCommisonCalculation
                .Where(cc => cc.PolicyStatus == "Cancel" && cc.CommissionMonthId == posCommisonMotorModel.MonthCycleId)
                .ToList()
                .ForEach(cc =>
                {
                    cc.CommisionPercentage = 0;
                    cc.OD = 0;
                    cc.GrossPremium = 0;
                });

                //Update CommissionCalculation Where PolicyStatus is Cancel
                tblCommisonCalculation
                .Where(cc => cc.OD < 1000 && cc.VehicleClass == "Two Wheeler" && cc.CommissionMonthId == posCommisonMotorModel.MonthCycleId)
                .ToList()
                .ForEach(cc => cc.CommisionPercentage = 0);


                //Update CommissionCalculation Where OD Between 1000 and 3000 and VehicleClass is 'Two Wheeler' and PolicyStatus is 'Active'
                tblCommisonCalculation
                .Where(cc => cc.OD >= 1000 && cc.OD <= 3000 && cc.VehicleClass == "Two Wheeler" && cc.PolicyStatus == "Active" && cc.CommissionMonthId == posCommisonMotorModel.MonthCycleId)
               .ToList()
               .ForEach(cc => cc.CommisionPercentage = 5);
                // Update CommissionCalculation Where OD Between 3001 and 5000 and VehicleClass is 'Two Wheeler' and PolicyStatus is 'Active'

                tblCommisonCalculation
                .Where(cc => cc.OD >= 3001 && cc.OD <= 5000 && cc.VehicleClass == "Two Wheeler" && cc.PolicyStatus == "Active" && cc.CommissionMonthId == 
                posCommisonMotorModel.MonthCycleId)
              .ToList()
              .ForEach(cc => cc.CommisionPercentage = 7);


               // Update CommissionCalculation Where OD > 5000 and VehicleClass is 'Two Wheeler'
                tblCommisonCalculation
                .Where(cc => cc.OD > 5000 && cc.VehicleClass == "Two Wheeler" && cc.CommissionMonthId == posCommisonMotorModel.MonthCycleId)
                .ToList()
                .ForEach(cc => cc.CommisionPercentage = 10);
                _dataContext.SaveChanges();

                tblCommisonCalculation
                .Where(cc => cc.VehicleClass == "TP" && cc.PolicyStatus == "Active" && cc.CommissionMonthId == posCommisonMotorModel.MonthCycleId)
                .ToList()
                .ForEach(cc =>
                {
                    cc.CommisionPercentage = 0;
                    cc.OD = 0;
                });
                _dataContext.SaveChanges();


                var commissionCalculations = tblCommisonCalculation
                        .Where(cc => cc.CommissionMonthId == posCommisonMotorModel.MonthCycleId && cc.VerticleId == 1 )
                        .Select(cc => cc.PolicyId)
                        .ToList();

                        var motorPolicies = _dataContext.tblMotorPolicyDatas
                            .Where(mp => commissionCalculations.Contains(mp.PolicyId))
                            .ToList();

                        motorPolicies.ForEach(mp =>
                        {
                            mp.POSCommMonthCycleId = (short)posCommisonMotorModel.MonthCycleId;
                            mp.POSCommissionReceived = 2;
                        });
                _dataContext.SaveChanges();

            }

        }

        public async Task CommisionCalculationEndrosement(PosCommisonMotorModel posCommisonMotorModel, List<tblCommissionCalculation> tblCommissionCalculations)
        {
            var endrosementJoin = from comm in tblCommissionCalculations
                                  join endroseData in _dataContext.tblEndorsementData on comm.PolicyId equals endroseData.PolicyId
                                  join endroseType in _dataContext.tblEndorsementType on endroseData.EndorsementTypeId equals endroseType.EndorsementTypeId
                                  join endroseReason in _dataContext.tblEndorsementReason on endroseData.EndorsementReasonId equals endroseReason.EndorsementReasonId
                                  join altIns in _dataContext.tblInsuranceCompany on endroseData.AlternateInsureCompanyId equals altIns.InsuranceCompanyId into altInsJoin
                                  from altIns in altInsJoin.DefaultIfEmpty()
                                  select new tblCommissionCalculation
                                  {
                                      AlternateInceptionDate = endroseData.AlternateInceptionDate,
                                      AlternatePolicyNo = endroseData.AlternatePolicyNo,
                                      AlternateCompanyName = altIns.InsuranceCompanyName,
                                      EndorsementId = endroseData.EndorsementId,
                                      EndorsementReasonId = endroseData.EndorsementReasonId,
                                      PolicyMainType = "Endrosment Data",
                                      EndorseGrossPremium =  endroseData.AmtGrossPremiumChange,
                                      EndorseOD =  endroseData.AmtODChange,
                                      EndorsementReason = endroseReason.EndorsementReason,
                                      IssueDate =  endroseData.EndorsementEntryDate,
                                      PolicyRemarks =  endroseData.EndorsementRemark,
                                      ShortFallTotal =  endroseData.EndoresementShortfallAmt,
                                      OD = endroseData.AmtODChange,
                                      POSName = comm.POSName,
                                      POsId = comm.POsId,
                                      CompanyName = comm.CompanyName,
                                      VehicleMainClass = comm.VehicleMainClass,
                                      ExShowroomValue = 0,
                                      SpecialDiscount = 0,
                                      NameInPolicy = comm.NameInPolicy,
                                      PolicyStartDate = comm.PolicyStartDate,
                                      PolicyId = 0,
                                      ControlNo = comm.ControlNo,
                                      RegistrationNo = comm.RegistrationNo,
                                      GrossPremium = endroseData.AmtGrossPremiumChange,
                                      TotalIDV = 0,
                                      PolicyNo = comm.PolicyNo,
                                      ManufacturerName = comm.ManufacturerName, // Assuming ManufacturerName is not directly available in your entities
                                      ModelName = comm.ModelName,
                                      FuelType = comm.FuelType, // Assuming FuelType is not directly available in your entities
                                      CubicCapacity = 0, // Assuming CubicCapacity is not directly available in your entities
                                      SeatingCapacity = 0, // Assuming SeatingCapacity is not directly available in your entities
                                      MakeYear = comm.MakeYear,
                                      Loading = 0, // Assuming Loading is not directly available in your entities
                                      TeleCaller = comm.TeleCaller, // Assuming TeleCaller is not directly available in your entities
                                      FOS = comm.FOS, // Assuming FOS is not directly available in your entities
                                      BusinessDoneBy = comm.BusinessDoneBy,
                                      PolicyPackageType = comm.PolicyPackageType,
                                      PolicyTermName = comm.PolicyTermName,
                                      PolicyTermId = comm.PolicyTermId,
                                      PolicyStatus = comm.PolicyStatus,
                                      PolicyCancelDate = comm.PolicyCancelDate,
                                      ReferenceName = comm.ReferenceName, // Assuming ReferenceName is not directly available in your entities
                                      VehicleClass = comm.VehicleClass,
                                      PolicyType = comm.PolicyType,
                                      CommissionMonthId = posCommisonMotorModel.MonthCycleId,
                                      InsureCompanyId = comm.InsureCompanyId,
                                      VehicleMainClassId = comm.VehicleMainClassId,
                                      PolicyMainTypeId = comm.PolicyTypeId,
                                      ManufacturerId = comm.ManufacturerId,
                                      ModelId = comm.ModelId,
                                      AddonPlan = "",
                                     BranchId = posCommisonMotorModel.BranchId

                                  };


            _dataContext.tblCommissionCalculation.AddRange(endrosementJoin);
            _dataContext.SaveChanges();
            ProcessCommissions(posCommisonMotorModel.MonthCycleId);
        }

        public void ProcessCommissions(int varMonthCycleId)
        {
            var commissionCalculations = _dataContext.tblCommissionCalculation
               .Where(c => c.CommissionMonthId == varMonthCycleId && c.VerticleId == 1)
               .ToList();

            var endorsementData = _dataContext.tblEndorsementData
                .Where(e => commissionCalculations.Select(c => c.EndorsementId).Contains(e.EndorsementId))
                .ToList();
            UpdatePOSCommission(commissionCalculations, endorsementData,(short)varMonthCycleId);
            UpdateCommissionPercentage(commissionCalculations);
            ProcessEndorsementCases(commissionCalculations);
            ProcessPolicyReinstatement(commissionCalculations);
            ProcessNCBRecoverable(commissionCalculations);
            ProcessNCBRecovered(commissionCalculations);
            ProcessNCBRecoverableCancel(commissionCalculations);
            _dataContext.SaveChanges();

        }

        private void UpdatePOSCommission(List<tblCommissionCalculation> commissionCalculations, List<tblEndorsementData> endorsementData, short varMonthCycleId)
        {
            foreach (var item in commissionCalculations)
            {
                var endorsement = endorsementData.FirstOrDefault(e => e.EndorsementId == item.EndorsementId);
                if (endorsement != null)
                {
                    endorsement.DSACommMonthCycleId = varMonthCycleId;
                    endorsement.DSACommissionReceived = 2;
                }
            }
        }
        private void UpdateCommissionPercentage(List<tblCommissionCalculation> commissionCalculations)
        {
            foreach (var item in commissionCalculations.Where(c => c.EndorsementId != null))
            {
                item.CommisionPercentage = 10;
            }
        }

        private void ProcessEndorsementCases(List<tblCommissionCalculation> commissionCalculations)
        {
            var endorsementReasons = new dynamic[] { 1, 20, 21, 28, 29, 11, 13, 15, 18, 22, 25, 30, 34, 57 };

            foreach (var item in commissionCalculations.Where(c => endorsementReasons.Contains(c.EndorsementReasonId) && (c.PolicyId == null || c.PolicyId == 0)))
            {
                var relatedCommission = commissionCalculations.FirstOrDefault(rc => rc.PolicyId > 0 && rc.ControlNo == item.ControlNo);

                if (relatedCommission != null)
                {
                    item.CommisionPercentage = relatedCommission.CommisionPercentage;
                }
            }
        }

        private void ProcessPolicyReinstatement(List<tblCommissionCalculation> commissionCalculations)
        {
            foreach (var item in commissionCalculations.Where(c => c.EndorsementReasonId == 24 && (c.PolicyId == null || c.PolicyId == 0)))
            {
                var relatedCommission = commissionCalculations.FirstOrDefault(rc => rc.PolicyId > 0 && rc.ControlNo == item.ControlNo);

                item.CommisionPercentage = relatedCommission != null ? relatedCommission.CommisionPercentage : 10;
            }
        }

        private void ProcessNCBRecoverable(List<tblCommissionCalculation> commissionCalculations)
        {
            foreach (var item in commissionCalculations.Where(c => c.EndorsementReasonId == 26 && (c.PolicyId == null || c.PolicyId == 0)))
            {
                var relatedCommission = commissionCalculations.FirstOrDefault(rc => rc.PolicyId > 0 && rc.ControlNo == item.ControlNo);

                if (relatedCommission != null)
                {
                    item.CommisionPercentage = relatedCommission.CommisionPercentage;
                    item.OD = relatedCommission.OD * -1;
                }
            }
        }

        private void ProcessNCBRecovered(List<tblCommissionCalculation> commissionCalculations)
        {
            foreach (var item in commissionCalculations.Where(c => c.EndorsementReasonId == 27 && (c.PolicyId == null || c.PolicyId == 0)))
            {
                var relatedCommission = commissionCalculations.FirstOrDefault(rc => rc.PolicyId == 0 && rc.ControlNo == item.ControlNo);

                if (relatedCommission != null)
                {
                    item.CommisionPercentage = relatedCommission.CommisionPercentage;
                    item.OD = (relatedCommission.OD * -1) + item.OD;
                }
            }
        }

        private void ProcessNCBRecoverableCancel(List<tblCommissionCalculation> commissionCalculations)
        {
            foreach (var item in commissionCalculations.Where(c => c.EndorsementReasonId == 57 && (c.PolicyId == null || c.PolicyId == 0)))
            {
                var relatedCommission = commissionCalculations.FirstOrDefault(rc => rc.PolicyId == 0 && rc.ControlNo == item.ControlNo);

                if (relatedCommission != null)
                {
                    item.CommisionPercentage = relatedCommission.CommisionPercentage;
                    item.OD = relatedCommission.OD * -1;
                }
            }
        }

    }
}
