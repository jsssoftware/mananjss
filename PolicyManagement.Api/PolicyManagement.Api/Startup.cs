using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using PolicyManagement.Api;
using PolicyManagement.Api.Provider;
using PolicyManagement.Api.Swagger;
using Swashbuckle.Application;
using System;
using System.Web.Http;

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
    }
}