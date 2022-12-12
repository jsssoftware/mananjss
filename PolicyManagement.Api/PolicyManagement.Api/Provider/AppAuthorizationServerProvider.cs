using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json;
using PolicyManagement.Dtos.Common;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Utilities.Constants;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Api.Provider
{
    public class AppAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {

            //if (context.TryGetBasicCredentials(out string clientId, out string clientSecret))
            //{
            //    context.Validated();
            //}
            //else
            //{
            //    context.SetError("invalid_client", "Client credentials could not be retrieved from the Authorization header");
            //    context.Rejected();
            //}

            context.Validated();

            await Task.CompletedTask;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            IFormCollection form = await context.Request.ReadFormAsync();
            int.TryParse(form.FirstOrDefault(f => f.Key == "branchId").Value.FirstOrDefault(), out int branchId);

            if (string.IsNullOrEmpty(context.UserName) || string.IsNullOrEmpty(context.Password) || branchId == 0)
            {
                context.SetError("invalid_grant", "Username and Password required");
                context.Rejected();
                await Task.CompletedTask;
                return;
            }

            tblUser user = null;
            string role = string.Empty;
            string branchName = string.Empty;

            using (DataContext dataContext = new DataContext())
            {
                user = await dataContext.tblUser.FirstOrDefaultAsync(f => f.UserName.ToLower() == context.UserName.ToLower()
                                                                          && f.UserPassword == context.Password
                                                                          && f.BranchId == branchId
                                                                          && f.IsActive);

                if (user != null)
                {
                    role = await dataContext.tblUserRole.Where(w => w.UserRoleId == user.UserRoleId).Select(s => s.UserRoleName).FirstOrDefaultAsync();
                    branchName = await dataContext.tblBranch.Where(w => w.BranchId == user.BranchId).Select(s => s.BranchName).FirstOrDefaultAsync();
                }
            }

            if (user != null)
            {
                if (user.IsLocked.HasValue && !user.IsLocked.Value)
                {
                    var claimsIdentity = new ClaimsIdentity(context.Options.AuthenticationType);

                    List<Claim> claims = new List<Claim>
                    {
                        new Claim(ClaimsConstant.Username, user.UserName),
                        new Claim(ClaimsConstant.UserFullName, user.UserFullName),
                        new Claim(ClaimsConstant.Role, role),
                        new Claim(ClaimsConstant.BranchName, branchName),
                        new Claim(ClaimsConstant.UserId, user.UserId.ToString()),
                        new Claim(ClaimsConstant.BranchId, user.BranchId.ToString()),
                        new Claim(ClaimsConstant.RoleId, user.UserRoleId.ToString()),
                        new Claim(ClaimsConstant.UserTypeId, user.UserTypeId.ToString()),
                        new Claim(ClaimsConstant.TeamMemberId, user.TeamMemberId.HasValue ? user.TeamMemberId.Value.ToString() : string.Empty),
                        new Claim(ClaimsConstant.IsLocked, user.IsLocked.HasValue ? user.IsLocked.Value.ToString() : true.ToString())
                    };

                    claimsIdentity.AddClaims(claims);
                    context.Validated(claimsIdentity);
                    await Task.CompletedTask;
                    return;
                }
                else
                {
                    context.SetError("invalid_grant", "User Locked");
                    context.Rejected();
                    await Task.CompletedTask;
                    return;
                }
            }
            else
            {
                context.SetError("invalid_grant", "Invalid Credentials");
                context.Rejected();
                await Task.CompletedTask;
                return;
            }
        }
    }
}