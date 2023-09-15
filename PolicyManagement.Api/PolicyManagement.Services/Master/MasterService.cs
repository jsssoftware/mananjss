﻿using AutoMapper;
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
       
            List<tblInsuranceCompanyBranch> insuranceCompanyBranches = await _dataContext.tblInsuranceCompanyBranch.Where(w => w.BranchId == branchId && w.IsActive == true).ToListAsync();
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

            var tblTeamMembers = await _dataContext.tblTeamMember.Where(w => w.BranchId == branchId && w.IsActive == true).ToListAsync<dynamic>();
            return new DataTableDto<List<dynamic>>
            {
                TotalCount = tblTeamMembers.Count(),
                Data = tblTeamMembers
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
                 _dataContext.SaveChanges();
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
    }
}