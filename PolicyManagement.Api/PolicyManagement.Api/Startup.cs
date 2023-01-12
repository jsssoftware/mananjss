using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using PolicyManagement.Api;
using PolicyManagement.Api.Provider;
using PolicyManagement.Api.Swagger;
using Swashbuckle.Application;
using Swashbuckle.Swagger;
using System;
using System.Web.Http;
using System.Web.Http.Description;

[assembly: OwinStartup(typeof(Startup))]

namespace PolicyManagement.Api
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            ConfigureOAuth(app);

            WebApiConfig.Register(config);
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            app.UseWebApi(config);

            config.EnableSwagger(x =>
            {
                x.SingleApiVersion("v1", "Policy Management Api");
                x.DocumentFilter<OAuthTokenOperation>();
                x.OperationFilter<AddAuthorizationHeaderParameterOperationFilter>();
            }).EnableSwaggerUi();

            UnityConfig.RegisterComponents(config);
        }

        private void ConfigureOAuth(IAppBuilder app)
        {
            app.UseOAuthAuthorizationServer(new OAuthAuthorizationServerOptions
            {
                TokenEndpointPath = new PathString("/api/oauth/token"),
                Provider = new AppAuthorizationServerProvider(),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(2),
                AllowInsecureHttp = true
            });
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }


        public class AddAuthorizationHeaderParameterOperationFilter : IOperationFilter
        {
            public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
            {
                if (operation.parameters != null)
                {
                    operation.parameters.Add(new Parameter
                    {
                        name = "Authorization",
                        @in = "header",
                        description = "access token",
                        required = false,
                        type = "string"
                    });
                }
            }
        }
    }

    
}