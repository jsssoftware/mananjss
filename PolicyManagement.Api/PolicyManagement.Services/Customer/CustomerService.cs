using AutoMapper;
using PolicyManagement.Dtos.Common;
using PolicyManagement.Dtos.Customer;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.Customer;
using PolicyManagement.Services.Base;
using PolicyManagement.Services.Common.Interface;
using PolicyManagement.Services.Customer.Interface;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Web.UI.WebControls;

namespace PolicyManagement.Services.Customer
{
    public class CustomerService : BaseService, ICustomerService
    {
        private readonly ICommonService _commonService;
        public CustomerService(DataContext dataContext,
                               ICommonService commonService,
                               IMapper mapper) : base(dataContext, mapper)
        {
            _commonService = commonService;
        }

        public async Task<List<DropDownDto<int>>> FindAllDesignations() => await _dataContext.tblDesignation.Select(s => new DropDownDto<int>
        {
            Name = s.DesignationName,
            Value = s.DesignationId
        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllIndustries() => await _dataContext.tblIndustry.Select(s => new DropDownDto<int>
        {
            Name = s.IndustryName,
            Value = s.IndustryId
        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllLineOfBusinesses() => await _dataContext.tblBusinessType.Select(s => new DropDownDto<int>
        {
            Name = s.BusinessTypeName,
            Value = s.BusinessTypeId
        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllMaritalStatus() => await _dataContext.tblMaritalStatus.Select(s => new DropDownDto<int>
        {
            Name = s.MaritalStatus,
            Value = s.CustomerMaritalStatusId
        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllProfessions() => await _dataContext.tblProfession.Select(s => new DropDownDto<int>
        {
            Name = s.ProfessionName,
            Value = s.ProfessionId
        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllTerritories(int branchId) => await _dataContext.tblTerritory.Where(w => w.BranchId == branchId).Select(s => new DropDownDto<int>
        {
            Name = s.TerritoryName,
            Value = s.TerritoryId
        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllTitles() => await _dataContext.tblTitle.Select(s => new DropDownDto<int>
        {
            Name = s.TitleName,
            Value = s.TitleId
        })
        .OrderBy(o => o.Value)
        .ToListAsync();

        public async Task<DataTableDto<List<CustomerDto>>> FindCustomrByName(string name, int pageNumber, int pageSize)
        {

            int totalCount = await _dataContext.tblCustomer.CountAsync(c => c.CustomerName.ToLower().StartsWith(name.ToLower()));

            List<CustomerDto> customers = await _dataContext.tblCustomer.GroupJoin(_dataContext.tblCluster, T1 => T1.ClusterId, T2 => T2.ClusterId, (T1, T2) => new { T1, T2 })
                                                    .SelectMany(s => s.T2.DefaultIfEmpty(), (customer, cluster) => new { customer.T1, T2 = cluster })
                                                    .GroupJoin(_dataContext.tblCity, T3 => T3.T1.CustomerCityId1, T4 => T4.CityId, (T3, T4) => new { T3, T4 })
                                                    .SelectMany(s => s.T4.DefaultIfEmpty(), (customerWithCity, city) => new { customerWithCity.T3, T4 = city })
                                                    .Where(w => w.T3.T1.CustomerName.ToLower().StartsWith(name.ToLower()))
                                                    .OrderBy(o => o.T3.T1.CustomerName)
                                                    .Skip(pageNumber * pageSize)
                                                    .Select(s => new CustomerDto
                                                    {
                                                        Address = s.T3.T1.DefaultAddress == 1 ? s.T3.T1.CustomerAddress1 : s.T3.T1.DefaultAddress == 2 ? s.T3.T1.CustomerAddress2 : s.T3.T1.CustomerAddress3,
                                                        City = s.T4.CityName,
                                                        ClusterName = s.T3.T2.ClusterName,
                                                        Code = s.T3.T1.CustomerCode,
                                                        Id = s.T3.T1.CustomerId,
                                                        Mobile = s.T3.T1.DefaultContactNo == 1 ? s.T3.T1.CustomerMobile1 : s.T3.T1.DefaultContactNo == 2 ? s.T3.T1.CustomerMobile2 : s.T3.T1.DefaultContactNo == 3 ? s.T3.T1.CustomerPhone1 : s.T3.T1.CustomerPhone2,
                                                        Name = s.T3.T1.CustomerName,
                                                        PinCode = s.T3.T1.DefaultAddress == 1 ? s.T3.T1.CustomerPinCode1 : s.T3.T1.DefaultAddress == 2 ? s.T3.T1.CustomerPinCode2 : s.T3.T1.CustomerPinCode3,
                                                        Type = s.T3.T1.IsCompany.HasValue ? (s.T3.T1.IsCompany.Value ? "Company / Firm" : "Individual") : "NA"
                                                    })
                                                   .Take(pageSize)
                                                   .ToListAsync();

            return new DataTableDto<List<CustomerDto>>
            {
                TotalCount = totalCount,
                Data = customers
            };
        }

        public async Task<CommonDto<AddUpdateCustomerModel>> FindCustomerByCode(string customerCode)
        {
            tblCustomer customer = await _dataContext.tblCustomer.FirstOrDefaultAsync(f => f.CustomerCode.ToLower() == customerCode.ToLower());

            if (customer == null)
                return new CommonDto<AddUpdateCustomerModel>
                {
                    Message = "Record not found"
                };

            var customerData = CreateCustomerData(customer);
            return customerData;
        }

        public async Task<CommonDto<AddUpdateCustomerModel>> FindCustomerById(int customerId)
        {
            tblCustomer customer = await _dataContext.tblCustomer.FirstOrDefaultAsync(f => f.CustomerId == customerId);

            if (customer == null)
                return new CommonDto<AddUpdateCustomerModel>
                {
                    Message = "Record not found"
                };

            var customerData = CreateCustomerData(customer);
            return customerData;
        }

        public async Task<CommonDto<object>> AddCustomer(AddUpdateCustomerModel model)
        {
            try
            {
                var checkAadharExist = await _dataContext.tblCustomer.Select(s => new { s.AadhaarNo, s.CustomerName, s.CustomerCode,s.CustomerId}).AsNoTracking().FirstOrDefaultAsync(f => !string.IsNullOrEmpty(model.Aadhaar) && f.AadhaarNo == model.Aadhaar);
                if (model.Id ==0 && checkAadharExist != null && checkAadharExist.CustomerId != model.Id)
                    return new CommonDto<object>
                    {
                        Message = $"Aadhar Number {model.Aadhaar} is already exists with Customer {checkAadharExist.CustomerName} ({checkAadharExist.CustomerCode})"
                    };


                var checkPanExist = await _dataContext.tblCustomer.Select(s => new { s.PAN, s.CustomerName, s.CustomerCode, s.CustomerId }).AsNoTracking().FirstOrDefaultAsync(f => !string.IsNullOrEmpty(model.Pan) && !string.IsNullOrEmpty(f.PAN) && f.PAN.ToLower() == model.Pan.ToLower());
                if (model.Id == 0 && checkPanExist != null && checkPanExist.CustomerId != model.Id)
                    return new CommonDto<object>
                    {
                        Message = $"PAN Number {model.Pan} is already exists with Customer {checkPanExist.CustomerName} ({checkPanExist.CustomerCode})"
                    };
                if (model.Id == 0)
                {
                    CommonDto<object> validation = await ValidateCustomerCluster(model);
                    if (!validation.IsSuccess) return validation;
                }


                string customerCode = await _commonService.GenerateCustomerCode();

                if (string.IsNullOrEmpty(customerCode))
                    return new CommonDto<object>
                    {
                        Message = "System Generate Invalid Customer Code"
                    };

                DateTime? customerAnniversery = null;
                DateTime? customerDateOfBirth = null;

              /*  if (!string.IsNullOrEmpty(model.DateOfAnniversary.ToString()))
                    customerAnniversery = DateTime.ParseExact(model.DateOfAnniversary.ToString(), "MM/dd/yyyy", CultureInfo.InvariantCulture);

                if (!string.IsNullOrEmpty(model.DateOfBirth.ToString()))
                    customerDateOfBirth = DateTime.ParseExact(model.DateOfBirth.ToString(), "MM/dd/yyyy", CultureInfo.InvariantCulture);
              */
                customerDateOfBirth = model.DateOfBirth;
                customerAnniversery = model.DateOfAnniversary;

                tblCustomer customer = new tblCustomer
                {
                    CustomerId = model.Id,
                    AadhaarNo = model.Aadhaar,
                    BranchId = model.BranchId,
                    BusinessTypeId = model.LineOfBusiness,
                    ClusterId = model.CustomerCluster,
                    CreatedBy = 1, // Change later... means get from token
                    CreatedTime = DateTime.Now,
                    CustomerAddress1 = model.Address1,
                    CustomerAddress2 = model.Address2,
                    CustomerAddress3 = model.Address3,
                    CustomerAnniversery = customerAnniversery,
                    CustomerCityId1 = model.City1,
                    CustomerCityId2 = model.City2,
                    CustomerCityId3 = model.City3,
                    CustomerCode = customerCode,
                    CustomerContact = model.CustomerContact,
                    CustomerContactTitleId = model.CustomerContactSalutation,
                    CustomerDOB = customerDateOfBirth,
                    CustomerEmail1 = model.Email1,
                    CustomerEmail2 = model.Email2,
                    CustomerMobile1 = model.Mobile1,
                    CustomerMobile2 = model.Mobile2,
                    CustomerName = model.CustomerName,
                    CustomerNoofDependent = model.NumberOfDependent,
                    CustomerPhone1 = model.Phone1,
                    CustomerPhone2 = model.Phone2,
                    CustomerPinCode1 = model.Pincode1,
                    CustomerPinCode2 = model.Pincode2,
                    CustomerPinCode3 = model.Pincode3,
                    CustomerTitleId = model.CustomerNameSalutation,
                    DesignationId = model.Designation,
                    GSTIN1 = model.Gstin1,
                    GSTIN2 = model.Gstin2,
                    GSTIN3 = model.Gstin3,
                    IndustryId = model.Industry,
                    IsDecisionMaker = model.DecisionMaker,
                    IsActive = true,
                    MaritalStatusId = model.MaritalStatus,
                    PAN = model.Pan,
                    POSId = model.Pos,
                    ReferById = model.ReferBy,
                    ProfessionId = model.Profession,
                    ReferenceId = model.Reference,
                    TeamMemberId = model.TeamMember,
                    TerritoryId = model.CompanyTerritory,
                    DefaultAddress = model.SelectedPolicyAddress ,
                    DefaultContactNo = model.SelectedMobileCommunication,
                    DefaultWhatsAppNo = model.SelectedWhatsAppCommunication,
                    IsCompany = model.CustomerType == 1 , // 1 for Company
                    IsCommunicationOptOut1 = model.CommunicationOptOut1,
                    IsCommunicationOptOut2 = model.CommunicationOptOut2,
                    IsCommunicationOptOut3 = model.CommunicationOptOut3,
                    IsCommunicationOptOut4 = model.CommunicationOptOut4,
                    GenderId = model.Gender,
                    IsTeamMember =  model.IsTeamMember,
                    PassportNo = model.PassportNumber,
                    IsPos=  model.IsPos 

                };

                _dataContext.tblCustomer.AddOrUpdate(customer);

                await _dataContext.SaveChangesAsync();
                var Message = "Customer added successfully";
                if(model.Id != 0)
                {
                    Message = "Customer Modified successfully";
                }
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = Message
                };
            }
            catch (Exception ex)
            {
                return new CommonDto<object>
                {
                    Message = $"Server Error:- {ex.Message}"
                };
            }
        }

        private async Task<CommonDto<object>> ValidateCustomerCluster(AddUpdateCustomerModel model)
        {

            List<ClusterErrorDto> clusterErrorDtos = new List<ClusterErrorDto>();

            #region POS Mobile Validation
            if (model.IsPos !=null &&(bool)model.IsPos)
            {
                if (!string.IsNullOrEmpty(model.Mobile1))
                {
                    var posByMobile1 = await _dataContext.tblPOS.Where(w => w.POSMobile1 == model.Mobile1
                                                                         || w.POSMobile2 == model.Mobile1
                                                                         || w.POSPhone1 == model.Mobile1
                                                                         || w.POSPhone2 == model.Mobile1)
                                                                .Select(s => new
                                                                {
                                                                    s.POSName,
                                                                    s.POSCode
                                                                })
                                                                .ToListAsync();
                    if (posByMobile1.Any())
                    {
                        posByMobile1.ForEach(f => clusterErrorDtos.Add(new ClusterErrorDto
                        {
                            Code = f.POSCode,
                            Name = f.POSName,
                            Mobile = model.Mobile1,
                            MobileFoundIn = "POS",
                            SelectedMobile = "Mobile 1",
                            Description = ""
                        }));
                    }
                }

                if (!string.IsNullOrEmpty(model.Mobile2))
                {
                    var posByMobile2 = await _dataContext.tblPOS.Where(w => w.POSMobile1 == model.Mobile2
                                                                                || w.POSMobile2 == model.Mobile2
                                                                                || w.POSPhone1 == model.Mobile2
                                                                                || w.POSPhone2 == model.Mobile2)
                                                                              .Select(s => new
                                                                              {
                                                                                  s.POSName,
                                                                                  s.POSCode
                                                                              })
                                                                              .ToListAsync();

                    if (posByMobile2.Any())
                    {
                        posByMobile2.ForEach(f => clusterErrorDtos.Add(new ClusterErrorDto
                        {
                            Code = f.POSCode,
                            Name = f.POSName,
                            Mobile = model.Mobile2,
                            MobileFoundIn = "POS",
                            SelectedMobile = "Mobile 2",
                            Description = ""
                        }));
                    }
                }

                if (!string.IsNullOrEmpty(model.Phone1))
                {
                    var posByPhone1 = await _dataContext.tblPOS.Where(w => w.POSMobile1 == model.Phone1
                                                                             || w.POSMobile2 == model.Phone1
                                                                             || w.POSPhone1 == model.Phone1
                                                                             || w.POSPhone2 == model.Phone1)
                                                                           .Select(s => new
                                                                           {
                                                                               s.POSName,
                                                                               s.POSCode
                                                                           })
                                                                           .ToListAsync();

                    if (posByPhone1.Any())
                    {
                        posByPhone1.ForEach(f => clusterErrorDtos.Add(new ClusterErrorDto
                        {
                            Code = f.POSCode,
                            Name = f.POSName,
                            Mobile = model.Phone1,
                            MobileFoundIn = "POS",
                            SelectedMobile = "Phone 1",
                            Description = ""
                        }));
                    }
                }

                if (!string.IsNullOrEmpty(model.Phone2))
                {
                    var posByPhone2 = await _dataContext.tblPOS.Where(w => w.POSMobile1 == model.Phone2
                                                                            || w.POSMobile2 == model.Phone2
                                                                            || w.POSPhone1 == model.Phone2
                                                                            || w.POSPhone2 == model.Phone2)
                                                                          .Select(s => new
                                                                          {
                                                                              s.POSName,
                                                                              s.POSCode
                                                                          })
                                                                          .ToListAsync();

                    if (posByPhone2.Any())
                    {
                        posByPhone2.ForEach(f => clusterErrorDtos.Add(new ClusterErrorDto
                        {
                            Code = f.POSCode,
                            Name = f.POSName,
                            Mobile = model.Phone2,
                            MobileFoundIn = "POS",
                            SelectedMobile = "Phone 2",
                            Description = ""
                        }));
                    }
                }
            }
            #endregion

            #region TeamMember Mobile Validation
            if (model.IsTeamMember != null && (bool)model.IsTeamMember)
            {
                var teamMemberByMobile1 = await _dataContext.tblTeamMember.Where(w => w.TeamMemberMobile1 == model.Mobile1
                                                                                    || w.TeamMemberMobile2 == model.Mobile1
                                                                                    || w.TeamMemberPhone1 == model.Mobile1
                                                                                    || w.TeamMemberPhone2 == model.Mobile1)
                                                                   .Select(s => new
                                                                   {
                                                                       s.TeamMemberName,
                                                                       s.TeamMemberCode
                                                                   })
                                                                   .ToListAsync();

                if (teamMemberByMobile1.Any())
                {
                    teamMemberByMobile1.ForEach(f => clusterErrorDtos.Add(new ClusterErrorDto
                    {
                        Code = f.TeamMemberCode,
                        Name = f.TeamMemberName,
                        Mobile = model.Mobile1,
                        MobileFoundIn = "Team Member",
                        SelectedMobile = "Mobile 1",
                        Description = ""
                    }));
                }

                var teamMemberByMobile2 = await _dataContext.tblTeamMember.Where(w => w.TeamMemberMobile1 == model.Mobile2
                                                                                   || w.TeamMemberMobile2 == model.Mobile2
                                                                                   || w.TeamMemberPhone1 == model.Mobile2
                                                                                   || w.TeamMemberPhone2 == model.Mobile2)
                                                                  .Select(s => new
                                                                  {
                                                                      s.TeamMemberName,
                                                                      s.TeamMemberCode
                                                                  })
                                                                  .ToListAsync();

                if (teamMemberByMobile2.Any())
                {
                    teamMemberByMobile2.ForEach(f => clusterErrorDtos.Add(new ClusterErrorDto
                    {
                        Code = f.TeamMemberCode,
                        Name = f.TeamMemberName,
                        Mobile = model.Mobile2,
                        MobileFoundIn = "Team Member",
                        SelectedMobile = "Mobile 2",
                        Description = ""
                    }));
                }

                var teamMemberByPhone1 = await _dataContext.tblTeamMember.Where(w => w.TeamMemberMobile1 == model.Phone1
                                                                               || w.TeamMemberMobile2 == model.Phone1
                                                                               || w.TeamMemberPhone1 == model.Phone1
                                                                               || w.TeamMemberPhone2 == model.Phone1)
                                                              .Select(s => new
                                                              {
                                                                  s.TeamMemberName,
                                                                  s.TeamMemberCode
                                                              })
                                                              .ToListAsync();

                if (teamMemberByPhone1.Any())
                {
                    teamMemberByPhone1.ForEach(f => clusterErrorDtos.Add(new ClusterErrorDto
                    {
                        Code = f.TeamMemberCode,
                        Name = f.TeamMemberName,
                        Mobile = model.Phone1,
                        MobileFoundIn = "Team Member",
                        SelectedMobile = "Phone 1",
                        Description = ""
                    }));
                }

                var teamMemberByPhone2 = await _dataContext.tblTeamMember.Where(w => w.TeamMemberMobile1 == model.Phone2
                                                                             || w.TeamMemberMobile2 == model.Phone2
                                                                             || w.TeamMemberPhone1 == model.Phone2
                                                                             || w.TeamMemberPhone2 == model.Phone2)
                                                            .Select(s => new
                                                            {
                                                                s.TeamMemberName,
                                                                s.TeamMemberCode
                                                            })
                                                            .ToListAsync();

                if (teamMemberByPhone2.Any())
                {
                    teamMemberByPhone2.ForEach(f => clusterErrorDtos.Add(new ClusterErrorDto
                    {
                        Code = f.TeamMemberCode,
                        Name = f.TeamMemberName,
                        Mobile = model.Phone2,
                        MobileFoundIn = "Team Member",
                        SelectedMobile = "Phone 2",
                        Description = ""
                    }));
                }
            }
            #endregion

            if (clusterErrorDtos.Any())
                return new CommonDto<object>
                {
                    Response = clusterErrorDtos
                };

            #region Customer Mobile Validation

            List<CustomerClusterErrorDto> customerClusterErrorDtos = new List<CustomerClusterErrorDto>();

            if (!string.IsNullOrEmpty(model.Mobile1))
            {
                List<CustomerClusterErrorDto> customerByMobile1 = await _dataContext.tblCustomer.Where(w => w.CustomerMobile1 == model.Mobile1
                                                                                                          || w.CustomerMobile2 == model.Mobile1
                                                                                                          || w.CustomerPhone1 == model.Mobile1
                                                                                                          || w.CustomerPhone2 == model.Mobile1)
                                                                                                  .Select(s => new CustomerClusterErrorDto
                                                                                                  {
                                                                                                      Name = s.CustomerName,
                                                                                                      ClusterId = s.ClusterId ?? 0,
                                                                                                      Code = s.CustomerCode,
                                                                                                      Id = s.CustomerId,
                                                                                                      Mobile = model.Mobile1,
                                                                                                      SelectedMobile = "Mobile 1"
                                                                                                  })
                                                                                                  .ToListAsync();

                customerClusterErrorDtos.AddRange(customerByMobile1);

                foreach (var item in customerByMobile1)
                {
                    var clusterByMobile1 = await _dataContext.tblCluster.Where(w => w.ClusterId == item.ClusterId)
                                                                        .Select(s => new
                                                                        {
                                                                            s.ClusterName,
                                                                            s.ClusterCode
                                                                        })
                                                                        .FirstOrDefaultAsync();
                    if (clusterByMobile1 != null)
                    {
                        clusterErrorDtos.Add(new ClusterErrorDto
                        {
                            ClusterCode = clusterByMobile1.ClusterCode,
                            ClusterName = clusterByMobile1.ClusterName,
                            Mobile = model.Mobile1,
                            SelectedMobile = "Mobile 1",
                            Name = item.Name,
                            Code = item.Code,
                            MobileFoundIn = "Customer",
                            ClusterId = item.ClusterId
                        });
                    }
                }
            }

            if (!string.IsNullOrEmpty(model.Mobile2))
            {
                List<CustomerClusterErrorDto> customerByMobile2 = await _dataContext.tblCustomer.Where(w => w.CustomerMobile1 == model.Mobile2
                                                                                                          || w.CustomerMobile2 == model.Mobile2
                                                                                                          || w.CustomerPhone1 == model.Mobile2
                                                                                                          || w.CustomerPhone2 == model.Mobile2)
                                                                                                  .Select(s => new CustomerClusterErrorDto
                                                                                                  {
                                                                                                      Name = s.CustomerName,
                                                                                                      ClusterId = s.ClusterId ?? 0,
                                                                                                      Code = s.CustomerCode,
                                                                                                      Id = s.CustomerId,
                                                                                                      Mobile = model.Mobile2,
                                                                                                      SelectedMobile = "Mobile 2"
                                                                                                  })
                                                                                                  .ToListAsync();

                customerClusterErrorDtos.AddRange(customerByMobile2);

                foreach (var item in customerByMobile2)
                {
                    var clusterByMobile2 = await _dataContext.tblCluster.Where(w => w.ClusterId == item.ClusterId)
                                                                        .Select(s => new
                                                                        {
                                                                            s.ClusterName,
                                                                            s.ClusterCode
                                                                        })
                                                                        .FirstOrDefaultAsync();
                    if (clusterByMobile2 != null)
                    {
                        clusterErrorDtos.Add(new ClusterErrorDto
                        {
                            ClusterCode = clusterByMobile2.ClusterCode,
                            ClusterName = clusterByMobile2.ClusterName,
                            Mobile = model.Mobile2,
                            SelectedMobile = "Mobile 2",
                            Name = item.Name,
                            Code = item.Code,
                            MobileFoundIn = "Customer",
                            ClusterId = item.ClusterId
                        });
                    }
                }
            }

            if (!string.IsNullOrEmpty(model.Phone1))
            {
                var customerByPhone1 = await _dataContext.tblCustomer.Where(w => w.CustomerMobile1 == model.Phone1
                                                                                    || w.CustomerMobile2 == model.Phone1
                                                                                    || w.CustomerPhone1 == model.Phone1
                                                                                    || w.CustomerPhone2 == model.Phone1)
                                                                            .Select(s => new CustomerClusterErrorDto
                                                                            {
                                                                                Name = s.CustomerName,
                                                                                ClusterId = s.ClusterId ?? 0,
                                                                                Code = s.CustomerCode,
                                                                                Id = s.CustomerId,
                                                                                Mobile = model.Phone1,
                                                                                SelectedMobile = "Phone 1"
                                                                            })
                                                                            .ToListAsync();

                customerClusterErrorDtos.AddRange(customerByPhone1);

                foreach (var item in customerByPhone1)
                {
                    var clusterByPhone1 = await _dataContext.tblCluster.Where(w => w.ClusterId == item.ClusterId)
                                                                        .Select(s => new
                                                                        {
                                                                            s.ClusterName,
                                                                            s.ClusterCode
                                                                        })
                                                                        .FirstOrDefaultAsync();
                    if (clusterByPhone1 != null)
                    {
                        clusterErrorDtos.Add(new ClusterErrorDto
                        {
                            ClusterCode = clusterByPhone1.ClusterCode,
                            ClusterName = clusterByPhone1.ClusterName,
                            Mobile = model.Phone1,
                            SelectedMobile = "Phone 1",
                            Name = item.Name,
                            Code = item.Code,
                            MobileFoundIn = "Customer",
                            ClusterId = item.ClusterId
                        });
                    }
                }
            }

            if (!string.IsNullOrEmpty(model.Phone2))
            {
                var customerByPhone2 = await _dataContext.tblCustomer.Where(w => w.CustomerMobile1 == model.Phone2
                                                                                   || w.CustomerMobile2 == model.Phone2
                                                                                   || w.CustomerPhone1 == model.Phone2
                                                                                   || w.CustomerPhone2 == model.Phone2)
                                                                            .Select(s => new CustomerClusterErrorDto
                                                                            {
                                                                                Name = s.CustomerName,
                                                                                ClusterId = s.ClusterId ?? 0,
                                                                                Code = s.CustomerCode,
                                                                                Id = s.CustomerId,
                                                                                Mobile = model.Phone2,
                                                                                SelectedMobile = "Phone 2"
                                                                            })
                                                                            .ToListAsync();
                customerClusterErrorDtos.AddRange(customerByPhone2);

                foreach (var item in customerByPhone2)
                {
                    var clusterByPhone2 = await _dataContext.tblCluster.Where(w => w.ClusterId == item.ClusterId)
                                                                        .Select(s => new
                                                                        {
                                                                            s.ClusterName,
                                                                            s.ClusterCode
                                                                        })
                                                                        .FirstOrDefaultAsync();
                    if (clusterByPhone2 != null)
                    {
                        clusterErrorDtos.Add(new ClusterErrorDto
                        {
                            ClusterCode = clusterByPhone2.ClusterCode,
                            ClusterName = clusterByPhone2.ClusterName,
                            Mobile = model.Phone2,
                            SelectedMobile = "Phone 2",
                            Name = item.Name,
                            Code = item.Code,
                            MobileFoundIn = "Customer",
                            ClusterId = item.ClusterId
                        });
                    }
                }
            }
            #endregion

            customerClusterErrorDtos = customerClusterErrorDtos.Distinct(new CustomerClusterErrorDtoComparer()).ToList();

            clusterErrorDtos = clusterErrorDtos.Distinct(new ClusterErrorDtoComparer()).ToList();

            if ((clusterErrorDtos.Count == 0 && customerClusterErrorDtos.Count == 0) || (clusterErrorDtos.Count == 1 && clusterErrorDtos.FirstOrDefault().ClusterId == model.CustomerCluster))
                return new CommonDto<object>
                {
                    IsSuccess = true
                };

            if (clusterErrorDtos.Count == 1 && clusterErrorDtos.FirstOrDefault().ClusterId != model.CustomerCluster)
                return new CommonDto<object>
                {
                    Message = "Sorry, You have select wrong Cluster.",
                    Response = new
                    {
                        Type = 2,
                        Data = clusterErrorDtos
                    }
                };

            if (clusterErrorDtos.Count == 0 && customerClusterErrorDtos.Count > 0)
                return new CommonDto<object>
                {
                    Message = "We found Customer with this mobile number without Cluster. Please review and correct it.",
                    Response = new
                    {
                        Type = 1,
                        Data = customerClusterErrorDtos
                    }
                };

            if (clusterErrorDtos.Count > 1)
                return new CommonDto<object>
                {
                    Message = "We found more than one Clusters. Please review and correct it.",
                    Response = new
                    {
                        Type = 2,
                        Data = clusterErrorDtos
                    }
                };

            return new CommonDto<object>
            {
                Message = "UnKnown Error",
            };
        }

        public async Task<CustomerShortDetailDto> FindCustomerShortDetailById(int customerId) { 
         var retVal = await _dataContext.tblCustomer.
                                GroupJoin(_dataContext.tblCluster, T1 => T1.ClusterId, T2 => T2.ClusterId, (T1, T2) => new { T1, T2 })
                .SelectMany(s => s.T2.DefaultIfEmpty(), (customer, cluster) => new CustomerShortDetailDto
                {
                    AddressInPolicy = customer.T1.DefaultAddress == 1 ? customer.T1.CustomerAddress1 : customer.T1.DefaultAddress == 2 ? customer.T1.CustomerAddress2 : customer.T1.CustomerAddress3,
                    ContactNumber = customer.T1.DefaultContactNo == 1 ? customer.T1.CustomerMobile1  : customer.T1.DefaultContactNo == 2 ? customer.T1.CustomerMobile2 : customer.T1.DefaultContactNo == 3 ? customer.T1.CustomerPhone1 : customer.T1.CustomerPhone2,
                    ContactPerson = customer.T1.CustomerContact,
                    CustomerCode = customer.T1.CustomerCode,
                    CustomerId = customer.T1.CustomerId,
                    NameInPolicy = customer.T1.CustomerName,
                    Email = string.IsNullOrEmpty(customer.T1.CustomerEmail1) ? customer.T1.CustomerEmail2 : customer.T1.CustomerEmail1,
                    CustomerType = customer.T1.IsCompany.HasValue && customer.T1.IsCompany.Value ? "Company/Firm" : "Individual",
                    Gstin = !string.IsNullOrEmpty(customer.T1.GSTIN1) ? customer.T1.GSTIN1 : !string.IsNullOrEmpty(customer.T1.GSTIN2) ? customer.T1.GSTIN2 : customer.T1.GSTIN3,
                    Pan = customer.T1.PAN,
                    Cluster = !string.IsNullOrEmpty(cluster.ClusterName) ? cluster.ClusterName : "NA",
                    ClusterCode = !string.IsNullOrEmpty(cluster.ClusterCode) ? cluster.ClusterCode : "NA",
                    GenderId = customer.T1.GenderId,
                    ClusterId =  customer.T1.ClusterId,
                    CityId = customer.T1.CustomerCityId1.HasValue ? customer.T1.CustomerCityId1.Value : 0,   
                    ReferById = customer.T1.ReferById,
                    ReferenceId = customer.T1.ReferenceId,
                    PosId = customer.T1.POSId,
                    TeamMemberId =  customer.T1.TeamMemberId,
                })
                .FirstOrDefaultAsync(f => f.CustomerId == customerId);

            var cusDetail = await _dataContext.tblCustomer.Where(x => x.CustomerId == customerId).FirstOrDefaultAsync();

            if (cusDetail != null)
            {
                var gen = await _dataContext.tblGender.Where(x => x.GenderId == cusDetail.GenderId).FirstOrDefaultAsync();
                retVal.PassportNumber = (cusDetail.PassportNo!=null) ? cusDetail.PassportNo : "NA";
                retVal.DateOfBirth = (cusDetail.CustomerDOB!=null)? Convert.ToDateTime(cusDetail.CustomerDOB).ToString("dd/MM/yyyy") : "NA";
                retVal.Gender = (gen != null) ? gen.Gender : "NA";
            }  
            return retVal;
        }
            

        private CommonDto<AddUpdateCustomerModel> CreateCustomerData(tblCustomer customer) {
            try
            {

                return new CommonDto<AddUpdateCustomerModel>
                {
                    IsSuccess = true,
                    Message = "Record found",
                    Response = new AddUpdateCustomerModel
                    {
                        Aadhaar = customer.AadhaarNo ?? "",
                        Address1 = customer.CustomerAddress1 ?? "",
                        Address2 = customer.CustomerAddress2 ?? "",
                        Address3 = customer.CustomerAddress3 ?? "",
                       City1 = customer.CustomerCityId1 ?? 0,
                         City2 = customer.CustomerCityId2 ?? 0,
                         City3 = customer.CustomerCityId3 ?? 0,
                         Pincode1 = customer.CustomerPinCode1 ?? "",
                         Pincode2 = customer.CustomerPinCode2 ?? "",
                         Pincode3 = customer.CustomerPinCode3 ?? ""    ,
                         CompanyTerritory = customer.TerritoryId ?? 0,
                         CustomerCluster = customer.ClusterId ?? 0,
                        CustomerContact = customer.CustomerContact,
                        CustomerContactSalutation = customer.CustomerContactTitleId ?? 0,
                        CustomerName = customer.CustomerName,
                        CustomerNameSalutation = customer.CustomerTitleId ?? 0,
                        CustomerType = customer.IsCompany.HasValue && customer.IsCompany == true ? 1:2,
                        DateOfAnniversary = customer.CustomerAnniversery,
                        DateOfBirth =  customer.CustomerDOB,
                        DecisionMaker = customer.IsDecisionMaker ?? false,
                        Designation = customer.DesignationId ?? 0,
                        Email1 = customer.CustomerEmail1 ??  "",
                        Email2 = customer.CustomerEmail2 ?? "",
                        Gstin1 = customer.GSTIN1 ?? "",
                        Gstin2 = customer.GSTIN2 ?? "",
                        Gstin3 = customer.GSTIN3 ?? "",
                         Id = customer.CustomerId,
                        Industry = customer.IndustryId ?? 0,
                        LineOfBusiness = customer.BusinessTypeId ?? 0,
                        MaritalStatus = customer.MaritalStatusId ?? 0,
                        Mobile1 = customer.CustomerMobile1,
                        Mobile2 = customer.CustomerMobile2 ?? "",
                        NumberOfDependent = customer.CustomerNoofDependent ?? 0,
                        Pan = customer.PAN ?? "",
                        Phone1 = customer.CustomerPhone1 ?? "",
                        Phone2 = customer.CustomerPhone2 ?? "",
                        Pos = customer.POSId ?? 0,
                        Profession = customer.ProfessionId ?? 0,
                        ReferBy = customer.ReferById ??0,
                        Reference = customer.ReferenceId ?? 0,
                        SelectedMobileCommunication = customer.DefaultContactNo ?? 0,
                        SelectedPolicyAddress = customer.DefaultAddress ?? 0,
                        SelectedWhatsAppCommunication = customer.DefaultWhatsAppNo ?? 0,
                        TeamMember = customer.TeamMemberId ?? 0,
                        PassportNumber = customer.PassportNo,
                        Gender = customer.GenderId ?? 0,
                        IsPos = customer.IsPos ?? false,
                        CommunicationOptOut1 = customer.IsCommunicationOptOut1 ?? false,
                        CommunicationOptOut2 = customer.IsCommunicationOptOut2 ?? false,
                        CommunicationOptOut3 = customer.IsCommunicationOptOut3 ?? false,
                        CommunicationOptOut4 = customer.IsCommunicationOptOut4 ?? false,
                        IsTeamMember = customer.IsTeamMember ?? false

                    }
                };
            }catch(Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<List<DropDownDto<int>>> FindAllTitlesWithoutMS() => await _dataContext.tblTitle.Where(w => w.TitleId != 3).Select(s => new DropDownDto<int>
        {
            Name = s.TitleName,
            Value = s.TitleId
        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllClusters(int branchId) => await _dataContext.tblCluster.Where(w => w.IsActive && w.BranchId == branchId).Select(s => new DropDownDto<int>
        {
            Name = s.ClusterName,
            Value = s.ClusterId
        })
        .OrderBy(o => o.Name)
        .ToListAsync();

        public async Task<List<DropDownDto<int>>> FindAllCustomerNames() => await _dataContext.tblCustomer.Where(w => w.IsActive)
                                                                                                           .Select(s => new DropDownDto<int>
                                                                                                           {
                                                                                                               Name = s.CustomerName,
                                                                                                               Value = s.CustomerId
                                                                                                           })
                                                                                                           .ToListAsync();

        public async Task<DataTableDto<List<ClusterCustomerDto>>> FindCustomrByClusterCode(int? clusterId)
        {
            int max = 100, min = 10;

            List<ClusterCustomerDto> customers = await (from customer in _dataContext.tblCustomer.Where(w => w.ClusterId == clusterId && w.IsActive == true && w.IsCompany == false)
                                                        join cluster in _dataContext.tblCluster on customer.ClusterId equals cluster.ClusterId
                                                        join profesional in _dataContext.tblProfession on customer.ProfessionId equals profesional.ProfessionId into profession
                                                        from profesional in profession.DefaultIfEmpty()
                                                        join gender in _dataContext.tblGender on customer.GenderId equals gender.GenderId into genders
                                                        from gender in genders.DefaultIfEmpty()
                                                        orderby customer.CustomerName
                                                        select new ClusterCustomerDto
                                                        {
                                                            Address = customer.DefaultAddress == 1 ? customer.CustomerAddress1 : customer.DefaultAddress == 2 ? customer.CustomerAddress2 : customer.CustomerAddress3,
                                                            ClusterName = cluster.ClusterName,
                                                            Code = customer.CustomerCode,
                                                            CustomerId = customer.CustomerId,
                                                            Mobile = customer.DefaultContactNo == 1 ? customer.CustomerMobile1 : customer.DefaultContactNo == 2 ? customer.CustomerMobile2 : customer.DefaultContactNo == 3 ? customer.CustomerPhone1 : customer.CustomerPhone2,
                                                            Name = customer.CustomerName,
                                                            PinCode = customer.DefaultAddress == 1 ? customer.CustomerPinCode1 : customer.DefaultAddress == 2 ? customer.CustomerPinCode2 : customer.CustomerPinCode3,
                                                            DateOfBirth = customer.CustomerDOB,
                                                            Gender = gender.Gender,
                                                            Pan = customer.PAN,
                                                            Aadhar = customer.AadhaarNo,
                                                            Profession = profesional.ProfessionName,
                                                            Email = customer.CustomerEmail1,
                                                            Passport = customer.PassportNo,
                                                            GenderId = customer.GenderId,
                                                            City = customer.CustomerCityId1,
                                                            BranchId = customer.BranchId,
                                                            ClusterId = customer.ClusterId
                                                        }).ToListAsync();



            return new DataTableDto<List<ClusterCustomerDto>>
            {
                Data = customers
            };
        }
    }
}
