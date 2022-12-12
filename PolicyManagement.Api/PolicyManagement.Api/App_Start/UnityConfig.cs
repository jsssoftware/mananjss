using AutoMapper;
using PolicyManagement.Api.Mapper;
using PolicyManagement.Infrastructures.EntityFramework;
using PolicyManagement.Services.Claims;
using PolicyManagement.Services.Claims.Interface;
using PolicyManagement.Services.Common;
using PolicyManagement.Services.Common.Interface;
using PolicyManagement.Services.Customer;
using PolicyManagement.Services.Customer.Interface;
using PolicyManagement.Services.Inspection;
using PolicyManagement.Services.Inspection.Interface;
using PolicyManagement.Services.Motor;
using PolicyManagement.Services.Motor.Interface;
using PolicyManagement.Services.Voucher;
using PolicyManagement.Services.Voucher.Interface;
using System.Data.Entity;
using System.Web.Http;
using Unity;
using Unity.Lifetime;
using Unity.WebApi;

namespace PolicyManagement.Api
{
    public static class UnityConfig
    {
        public static void RegisterComponents(HttpConfiguration config)
        {
            IUnityContainer container = BuildUnityContainer();
            config.DependencyResolver = new UnityDependencyResolver(container);
        }

        private static IUnityContainer BuildUnityContainer()
        {
            UnityContainer container = new UnityContainer();

            //Register services
            container.RegisterType<DbContext, DataContext>(new HierarchicalLifetimeManager());
            container.RegisterType<ICommonService, CommonService>(new HierarchicalLifetimeManager());
            container.RegisterType<ICustomerService, CustomerService>(new HierarchicalLifetimeManager());
            container.RegisterType<IMotorService, MotorService>(new HierarchicalLifetimeManager());
            container.RegisterType<IVoucherService, VoucherService>(new HierarchicalLifetimeManager());
            container.RegisterType<IClaimsService, ClaimsService>(new HierarchicalLifetimeManager());
            container.RegisterType<IInspectionService, InspectionService>(new HierarchicalLifetimeManager());

            //Register Mapper
            IMapper mapper = AutoMapperConfiguration.Register().CreateMapper();
            container.RegisterInstance(mapper);

            //Returning container
            return container;
        }
    }
}