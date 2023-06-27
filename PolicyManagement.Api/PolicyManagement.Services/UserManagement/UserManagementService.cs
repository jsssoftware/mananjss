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
using PolicyManagement.Services.UserManagement.Interface;
using PolicyManagement.Models.UserManagement;
using AutoMapper.Configuration.Annotations;

namespace PolicyManagement.Services.UserManagement
{
    public class UserManagementService : BaseService, IUserManagementService
    {
        private readonly ILog log = LogManager.GetLogger("API Logger");

        public UserManagementService(DataContext dataContext,
                            IMapper mapper) : base(dataContext, mapper)
        {
        }
        public async Task<CommonDto<object>> CreateUser(tblUser user, BaseModel baseModel)
        {
            try
            {
                user.CreatedBy = baseModel.LoginUserId;
                user.CreatedTime = DateTime.Now;
                _dataContext.tblUser.AddOrUpdate(user);
                await _dataContext.SaveChangesAsync();
                //   var users = await _dataContext.tblUser.ToListAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"User is created or edited successfully",
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

        public async Task<CommonDto<object>> DeleteUser(tblUser user, BaseModel baseModel)
        {
            try
            {
                _dataContext.tblUser.Remove(user);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"User is Delete successfully",
                    // Response = users
                };
            }
            catch(Exception ex)
            {
                log.Error(ex);
                return new CommonDto<object>
                {

                    Message = ex.Message
                };
            }
        }

        public async Task<DataTableDto<List<RoleDetailDto>>> GetRoles(int branchId)
        {
            List<RoleDetailDto> result = await (from userole in _dataContext.tblUserRole.Where(x => x.BranchId == branchId)
                                                join branch in _dataContext.tblBranch on userole.BranchId equals branch.BranchId into branchs
                                                from branch in branchs.DefaultIfEmpty()
                                                select new RoleDetailDto
                                                {
                                                    RoleId = userole.UserRoleId,
                                                    BranchName = branch.BranchName,
                                                    RoleName = userole.UserRoleName,
                                                    IsActive = userole.IsActive,
                                                    UserRoleDescription = userole.UserRoleDescription,
                                                    BranchId = branch.BranchId

                                                }).ToListAsync();
            return new DataTableDto<List<RoleDetailDto>>
            {
                TotalCount = result.Count(),
                Data = result
            };
        }

        public async Task<CommonDto<object>> CreateRole(tblUserRole userRole, BaseModel baseModel)
        {
            try
            {
                userRole.CreatedBy = baseModel.LoginUserId;
                userRole.CreatedTime = DateTime.Now;
                _dataContext.tblUserRole.AddOrUpdate(userRole);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"Role is created or edited successfully",
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

        public async Task<List<tblFormList>> GetFormList()
        {
           var result = await _dataContext.tblFormList.ToListAsync();
            return result;
        }

        public async Task<CommonDto<object>> CreateUserRights(List<tblUserRights> userRights, BaseModel baseModel)
        {
            try
            {
                userRights.ForEach(x => { 
                    x.CreatedBy = baseModel.LoginUserId;
                    x.CreatedTime = DateTime.Now;                    
                });
                _dataContext.tblUserRights.AddRange(userRights);
                await _dataContext.SaveChangesAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"User Rights is created or edited successfully",
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




    }
}