using AutoMapper;
using PolicyManagement.Dtos.Common;
using PolicyManagement.Infrastructures.EntityFramework;

namespace PolicyManagement.Api.Mapper
{
    public class AutoMapperConfiguration
    {
        public static MapperConfiguration Register()
        {
            MapperConfiguration config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<tblBank, DropDownDto<string>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.BankName))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.BankCode));

            cfg.CreateMap<tblPolicyType, DropDownDto<int>>()
            .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.PolicyType))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.PolicyTypeId));

                cfg.CreateMap<tblVehicleClass, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.VehicleClass))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.VehicleClassId));

                cfg.CreateMap<tblPolicyTerm, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.PolicyTermName))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.PolicyTermId));

                cfg.CreateMap<tblInsuranceCompany, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.InsuranceCompanyName))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.InsuranceCompanyId));

                cfg.CreateMap<tblNoofYear, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.NoofYear))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.NoofYearId));

                cfg.CreateMap<tblFinancer, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.FinancerName))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.FinancerId));

                cfg.CreateMap<tblInspectionCompany, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.InspectionCompanyName))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.InspectionCompanyId));

                cfg.CreateMap<tblManufacturer, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.ManufacturerName))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.ManufacturerId));

                cfg.CreateMap<tblModel, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.ModelName))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.ModelId));

                cfg.CreateMap<tblVariant, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.VariantName))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.VariantId));

                cfg.CreateMap<tblMakeYear, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.MakeYear))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.MakeYearId));

                cfg.CreateMap<tblVehicleUsage, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.VehicleUsageName))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.VehicleUsageId));

                cfg.CreateMap<tblNCB, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.NCBPercentage))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.NCBId));

                cfg.CreateMap<tblCommissionPayType, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.CommissionPayTypeName))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.CommissionPayTypeId));

                cfg.CreateMap<tblAddonRider, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.AddonRiderName))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.AddonRiderId));

                cfg.CreateMap<tblRelationShip, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.RelationShipName))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.RelationShipId));

                //cfg.CreateMap<TblTelecallerInfo, DropDownDto<int>>()
                //.ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.Remark))
                //.ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.TeleCallerID));

                cfg.CreateMap<tblReference, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.ReferenceName))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.ReferenceId));

                cfg.CreateMap<tblUser, DropDownDto<int>>()
                .ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.UserFullName))
                .ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.UserId));

                //cfg.CreateMap<tblDSAMsgCampaign, DropDownDto<int>>()
                //.ForMember(destination => destination.Name, opts => opts.MapFrom(source => source.DSACampaignName))
                //.ForMember(destination => destination.Value, opts => opts.MapFrom(source => source.DSACampaignId));

            });

            return config;
        }
    }
}