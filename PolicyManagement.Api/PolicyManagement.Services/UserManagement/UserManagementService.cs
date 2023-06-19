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

                _dataContext.tblUser.Add(user);
               await _dataContext.SaveChangesAsync();
             //   var users = await _dataContext.tblUser.ToListAsync();
                return new CommonDto<object>
                {
                    IsSuccess = true,
                    Message = $"User is created successfully",
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