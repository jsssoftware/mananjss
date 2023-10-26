using AutoMapper;
using Newtonsoft.Json;
using PolicyManagement.Dtos.Common;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Models.Common;
using PolicyManagement.Models.Customer;
using PolicyManagement.Models.Motor;
using PolicyManagement.Services.Base;
using PolicyManagement.Services.Common.Interface;
using PolicyManagement.Services.Motor.Interface;
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
using PolicyManagement.Services.Master.Interface;
using PolicyManagement.Dtos.Customer;
using PolicyManagement.Models.Master;
using System.Numerics;

namespace PolicyManagement.Services.Master
{
    public class MasterService : BaseService, IMasterService
    {
        private readonly ILog log = LogManager.GetLogger("API Logger");

        public MasterService(DataContext dataContext,
                            
                            IMapper mapper) : base(dataContext, mapper)
        {
            dataContext.Configuration.ProxyCreationEnabled = false;

        }

        public async Task<DataTableDto<List<dynamic>>> GetInsuranceBranch(int branchId)
        {
       
            List<tblInsuranceCompanyBranch> insuranceCompanyBranches = await _dataContext.tblInsuranceCompanyBranch.Where(w => w.BranchId == branchId)
                .OrderBy(x=>x.IsActive == false).ThenBy(x => x.InsuranceCompanyBranchName).ToListAsync();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount= insuranceCompanyBranches.Count(),
                Data = insuranceCompanyBranches.ToList<dynamic>()
            };
        }

        public async Task<CommonDto<object>> CreateInsuranceBranch(tblInsuranceCompanyBranch insuranceCompanyBranch, BaseModel baseModel)
        {
            try
            {
                insuranceCompanyBranch.CreatedBy = baseModel.LoginUserId;
                insuranceCompanyBranch.CreatedDateTime = DateTime.Now;
                _dataContext.tblInsuranceCompanyBranch.AddOrUpdate(insuranceCompanyBranch);
                await _dataContext.SaveChangesAsync();
                //   var users = await _dataContext.tblUser.ToListAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Insurance Branch is created or edited successfully",
                    // Response = users
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

        public async Task<DataTableDto<List<dynamic>>> GetTeamMember(int branchId)
        {

            var tblTeamMembers = await _dataContext.tblTeamMember.Where(w => w.BranchId == branchId)
                .OrderBy(x => x.IsActive == false).ThenBy(x => x.TeamMemberName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = tblTeamMembers.Count(),
                Data = tblTeamMembers
            };
        }

        public async Task<DataTableDto<List<dynamic>>> GetPos(int branchId)
        {

            var pos = await _dataContext.tblPOS.Where(w => w.BranchId == branchId)
                .OrderBy(x => x.IsActive == false).ThenBy(x => x.POSName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateTeamMember(tblTeamMember teamMember, BaseModel baseModel)
        {
            try
            {
                tblUser tblUser =  new tblUser();

                teamMember.CreatedBy = baseModel.LoginUserId;
                teamMember.CreatedTime = DateTime.Now;
                teamMember.ModifiedBy = baseModel.LoginUserId;
                teamMember.ModifiedTime = DateTime.Now;
                 tblUser = teamMember.tblUser.FirstOrDefault();
                teamMember.tblUser = null;
                 _dataContext.tblTeamMember.AddOrUpdate(teamMember);
                 await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Team member is created or edited successfully",
                    // Response = users
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
        public async Task<CommonDto<object>> CreatePos(tblPOS pos, BaseModel baseModel)
        {
            try
            {
                pos.CreatedBy = baseModel.LoginUserId;
                pos.CreatedTime = DateTime.Now;
                pos.ModifiedBy = baseModel.LoginUserId;
                pos.ModifiedTime = DateTime.Now;
                _dataContext.tblPOS.AddOrUpdate(pos);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"POS is created or edited successfully",
                    // Response = users
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

        public async Task<DataTableDto<List<dynamic>>> GetPosContact(int branchId)
        {

            var pos = await _dataContext.tblPOSContact
                .OrderBy(x => x.IsActive == false).ThenBy(x => x.POSContactName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreatePosContact(tblPOSContact posContact, BaseModel baseModel)
        {
            try
            {
                posContact.CreatedBy = baseModel.LoginUserId;
                posContact.CreatedDateTime = DateTime.Now;
                posContact.ModifiedBy = baseModel.LoginUserId;
                posContact.ModifiedDateTime = DateTime.Now;
                _dataContext.tblPOSContact.AddOrUpdate(posContact);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"POS Contact is created or edited successfully",
                    // Response = users
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

        public async Task<DataTableDto<List<dynamic>>> GetInusranceCompany(int branchId)
        {
            var pos = await _dataContext.tblInsuranceCompany
                .OrderBy(x => x.IsActive == false).ThenBy(x => x.InsuranceCompanyName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateInsuranceCompany(tblInsuranceCompany insuranceCompany, BaseModel baseModel)
        {
            try
            {
                insuranceCompany.CreatedBy = baseModel.LoginUserId;
                insuranceCompany.CreatedTime = DateTime.Now;
                insuranceCompany.ModifiedBy = baseModel.LoginUserId;
                insuranceCompany.ModifiedTime = DateTime.Now;
                _dataContext.tblInsuranceCompany.AddOrUpdate(insuranceCompany);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Insurance Company is created or edited successfully",
                    // Response = users
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

        public async Task<DataTableDto<List<dynamic>>> GetCluster(int branchId)
        {
            var pos = await _dataContext.tblCluster.Where(w => w.BranchId == branchId)
                .OrderBy(x => x.IsActive == false).ThenBy(x => x.ClusterName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateCluster(tblCluster cluster, BaseModel baseModel)
        {
            try
            {
                cluster.CreatedBy = baseModel.LoginUserId;
                cluster.CreatedTime = DateTime.Now;
                cluster.ModifiedBy = baseModel.LoginUserId;
                cluster.ModifiedTime = DateTime.Now;
                _dataContext.tblCluster.AddOrUpdate(cluster);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Cluster is created or edited successfully",
                    // Response = users
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
        public async Task<DataTableDto<List<dynamic>>> GetPlan(int branchId)
        {
            var pos = await _dataContext.tblPlan
                .OrderBy(x => x.IsActive == false).ThenBy(x => x.PlanName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreatePlan(tblPlan plan, BaseModel baseModel)
        {
            try
            {
                plan.CreatedBy = baseModel.LoginUserId;
                plan.CreatedTime = DateTime.Now;
                plan.ModifiedBy = baseModel.LoginUserId;
                plan.ModifiedTime = DateTime.Now;
                _dataContext.tblPlan.AddOrUpdate(plan);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Plan is created or edited successfully",
                    // Response = users
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

        public async Task<DataTableDto<List<dynamic>>> GetAddonPlan(int branchId)
        {
            var pos = await _dataContext.tblAddonPlanOption.OrderBy(x => x.IsActive == false).ThenBy(x => x.AddonPlanOptionName).ThenBy(x=>x.VerticalId).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateAddonPlan(tblAddonPlanOption plan, BaseModel baseModel)
        {
            try
            {
    
                _dataContext.tblAddonPlanOption.AddOrUpdate(plan);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Add on Plan is created or edited successfully",
                    // Response = users
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

        public async Task<DataTableDto<List<dynamic>>> GetManufacture(int branchId)
        {
            var pos = await _dataContext.tblManufacturers.OrderBy(x => x.IsActive == false).ThenBy(x => x.ManufacturerName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateManufacture(tblManufacturer manufacturer, BaseModel baseModel)
        {
            try
            {
                manufacturer.CreatedBy = baseModel.LoginUserId;
                manufacturer.CreatedTime = DateTime.Now;
                manufacturer.ModifiedBy = baseModel.LoginUserId;
                manufacturer.ModifiedTime = DateTime.Now;
                _dataContext.tblManufacturers.AddOrUpdate(manufacturer);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Manufacture is created or edited successfully",
                    // Response = users
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

        public async Task<DataTableDto<List<dynamic>>> GetVehicleModel(int branchId)
        {
            var pos = await _dataContext.tblModel.OrderBy(x => x.IsActive == false).ThenBy(x=>x.ModelName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateVehicleModel(tblModel model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblModel.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Model is created or edited successfully",
                    // Response = users
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

        public async Task<DataTableDto<List<dynamic>>> GetAddOnRiderCombo(int branchId)
        {
            var addonPlan = await (from T1 in _dataContext.tblAddonRider
                                   join T3  in _dataContext.tblInsuranceCompany on T1.InsuranceCompanyId equals T3.InsuranceCompanyId 
                                   join T4 in _dataContext.tblVertical on T1.VerticalId equals T4.VerticalId into verticalJoin
                                   from T9 in verticalJoin.DefaultIfEmpty()
                                   select new 
                                     {
                                       InsuranceCompanyId = T1.InsuranceCompanyId,
                                       InsuranceCompanyName = T3.InsuranceCompanyName,
                                       VerticalId =  T1.VerticalId,
                                       VerticalName = T9.VerticalName,
                                       AddonRiderName = T1.AddonRiderName,
                                       IsActive = T1.IsActive,
                                       AddonRiderId =  T1.AddonRiderId,
                                       AddOnPlanOptionList = (from tbladdonplan in _dataContext.tblAddonPlanOption
                                                             join tbladdonplanmapping in _dataContext.tblAddonPlanOptionMapping.Where(x=>x.AddonPlanRiderId == T1.AddonRiderId) on tbladdonplan.AddonPlanOptionId equals tbladdonplanmapping.AddonPlanOptionId into planOptionMapping
                                                             from tbladdonplanmappings in planOptionMapping.DefaultIfEmpty() select new
                                                             {
                                                                 AddonPlanOptionName =  tbladdonplan.AddonPlanOptionName,
                                                                 AddonPlanOptionId = tbladdonplan.AddonPlanOptionId,
                                                                 IsPlanAvailable = tbladdonplanmappings.AddonPlanRiderId == null ? false : true,
                                                                 AddonPlanOptionDescripation=tbladdonplan.AddonPlanOptionDescripation                                                             
                                                             }).Distinct().ToList(),
                                   }).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = addonPlan.Count(),
                Data = addonPlan
            };
        }

        public async Task<CommonDto<object>> CreateAddOnRiderCombo(AddOnRider model, BaseModel baseModel)
        {
            try
            {
                var tblAddonRider = new tblAddonRider
                {
                    AddonRiderId = model.AddonRiderId,
                    InsuranceCompanyId = model.InsuranceCompanyId,
                    AddonRiderName = model.AddonRiderName,
                    VerticalId = model.VerticalId,
                    IsActive = model.IsActive,
                    CreatedBy = baseModel.LoginUserId,
                    CreatedTime = DateTime.Now,
                    ModifiedBy = baseModel.LoginUserId,
                    ModifiedTime = DateTime.Now
            };
               _dataContext.tblAddonRider.AddOrUpdate(tblAddonRider);
                await _dataContext.SaveChangesAsync();
                List<tblAddonPlanOptionMapping> addonPlanOptionMappings = new List<tblAddonPlanOptionMapping>();
                var length = model.AddOnPlanOptionList.Count();
                var addPlanOptions = model.AddOnPlanOptionList;
                if (length > 0)
                {
                    List<tblAddonPlanOptionMapping> previousAddOnPlanOption = await _dataContext.tblAddonPlanOptionMapping.Where(w => w.AddonPlanRiderId == tblAddonRider.AddonRiderId).ToListAsync();
                    if (previousAddOnPlanOption.Any())
                    {
                        _dataContext.tblAddonPlanOptionMapping.RemoveRange(previousAddOnPlanOption);
                        await _dataContext.SaveChangesAsync();
                    }
                    foreach (var item in addPlanOptions)
                    {
                        if (item.IsPlanAvailable ==  true)
                        {
                            var data = new tblAddonPlanOptionMapping();
                            data.AddonPlanRiderId = tblAddonRider.AddonRiderId;
                            data.AddonPlanOptionId = item.AddonPlanOptionId;
                            data.IsActive= true;
                            _dataContext.tblAddonPlanOptionMapping.Add(data);
                        }

                    }
                }


                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Add on Rider is created or edited successfully",
                    // Response = users
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

        public async Task<DataTableDto<List<dynamic>>> GetVarient(int branchId)
        {
            var pos = await _dataContext.tblVariant.OrderBy(x => x.IsActive == false).ThenBy(x=>x.VariantName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateVarient(tblVariant model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblVariant.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Bank is created or edited successfully",
                    // Response = users
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


        public async Task<DataTableDto<List<dynamic>>> GetBank(int branchId)
        {
            var pos = await _dataContext.tblBank.OrderBy(x => x.IsActive == false).ThenBy(x => x.BankName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateBank(tblBank model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblBank.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Varient is created or edited successfully",
                    // Response = users
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

        public async Task<DataTableDto<List<dynamic>>> GetCity(int branchId)
        {
            var pos = await _dataContext.tblCity.OrderBy(x => x.IsActive == false).ThenBy(x => x.CityName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateCity(tblCity model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblCity.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"City is created or edited successfully",
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

        public async Task<DataTableDto<List<dynamic>>> GetProduct(int branchId)
        {
            var pos = await _dataContext.tblProduct.OrderBy(x => x.IsActive == false).ThenBy(x => x.ProductName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateProduct(tblProduct model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblProduct.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Product is created or edited successfully",
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

        public async Task<DataTableDto<List<dynamic>>> GetInspectionCompany(int branchId)
        {
            var pos = await _dataContext.tblInspectionCompany.OrderBy(x => x.IsActive == false).ThenBy(x => x.InspectionCompanyName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateInspectionCompany(tblInspectionCompany model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblInspectionCompany.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Inspection Company is created or edited successfully",
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

        public async Task<DataTableDto<List<dynamic>>> GetPosType(int branchId)
        {
            var pos = await _dataContext.tblType.OrderBy(x => x.IsActive == false).ThenBy(x => x.TypeName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreatePosType(tblType model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblType.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Pos Type is created or edited successfully",
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


        public async Task<DataTableDto<List<dynamic>>> GetPosCategory(int branchId)
        {
            var pos = await _dataContext.tblCategory.OrderBy(x => x.IsActive == false).ThenBy(x => x.CategoryName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreatePosCategory(tblCategory model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblCategory.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Pos Category is created or edited successfully",
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


        public async Task<DataTableDto<List<dynamic>>> GetRtoZone(int branchId)
        {
            var pos = await _dataContext.tblRTOZone.OrderBy(x => x.IsActive == false).ThenBy(x => x.RTOZoneName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateRtoZone(tblRTOZone model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblRTOZone.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"RTO Zone is created or edited successfully",
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


        public async Task<DataTableDto<List<dynamic>>> GetFinance(int branchId)
        {
            var pos = await _dataContext.tblFinancer.OrderBy(x => x.IsActive == false).ThenBy(x => x.FinancerName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateFinance(tblFinancer model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblFinancer.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Finance is created or edited successfully",
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


        public async Task<CommonDto<object>> CreateIndustry(tblIndustry model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblIndustry.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Indusry is created or edited successfully",
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


        public async Task<DataTableDto<List<dynamic>>> GetIndustry(int branchId)
        {
            var pos = await _dataContext.tblIndustry.OrderBy(x => x.IsActive == false).ThenBy(x => x.IndustryName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateDepartment(tblDepartment model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblDepartment.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Department is created or edited successfully",
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

        public async Task<DataTableDto<List<dynamic>>> GetDepartment(int branchId)
        {
            var pos = await _dataContext.tblDepartment.OrderBy(x => x.IsActive == false).ThenBy(x => x.DepartmentName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateDesignation(tblDesignation model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblDesignation.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Designation is created or edited successfully",
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

        public async Task<DataTableDto<List<dynamic>>> GetDesignation(int branchId)
        {
            var pos = await _dataContext.tblDesignation.OrderBy(x => x.IsActive == false).ThenBy(x => x.DesignationName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }

        public async Task<CommonDto<object>> CreateProfession(tblProfession model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblProfession.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Profession is created or edited successfully",
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

        public async Task<DataTableDto<List<dynamic>>> GetProfession(int branchId)
        {
            var pos = await _dataContext.tblProfession.OrderBy(x => x.IsActive == false).ThenBy(x => x.ProfessionName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }


        public async Task<CommonDto<object>> CreateOccupation(tblOccupation model, BaseModel baseModel)
        {
            try
            {
                model.CreatedBy = baseModel.LoginUserId;
                model.CreatedTime = DateTime.Now;
                model.ModifiedBy = baseModel.LoginUserId;
                model.ModifiedTime = DateTime.Now;
                _dataContext.tblOccupation.AddOrUpdate(model);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Occupation is created or edited successfully",
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

        public async Task<DataTableDto<List<dynamic>>> GetOccupation(int branchId)
        {
            var pos = await _dataContext.tblOccupation.OrderBy(x => x.IsActive == false).ThenBy(x => x.OccupationName).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = pos.Count(),
                Data = pos
            };
        }
    }
}