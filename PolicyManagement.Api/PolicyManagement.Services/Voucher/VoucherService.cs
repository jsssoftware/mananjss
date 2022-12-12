using AutoMapper;
using PolicyManagement.Dtos.Common;
using PolicyManagement.Dtos.Voucher;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.Voucher;
using PolicyManagement.Services.Base;
using PolicyManagement.Services.Common.Interface;
using PolicyManagement.Services.Voucher.Interface;
using PolicyManagement.Utilities.Enums;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
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
                VoucherStatusId = (short)VoucherStatus.Active
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
                                                                         VerificationStatus = s.IsVerified.HasValue ? "VERIFIED" : "NOT VERIFIED"
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
    }
}
