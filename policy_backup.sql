USE [master]
GO
/****** Object:  Database [PolicyManagerQA]    Script Date: 5/4/2023 2:32:58 AM ******/
CREATE DATABASE [PolicyManagerQA]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PolicyManager', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\PolicyManagerQA.mdf' , SIZE = 116032KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'PolicyManager_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\PolicyManagerQA.ldf' , SIZE = 16576KB , MAXSIZE = 102400KB , FILEGROWTH = 10%)
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [PolicyManagerQA] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PolicyManagerQA].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PolicyManagerQA] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET ARITHABORT OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [PolicyManagerQA] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PolicyManagerQA] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PolicyManagerQA] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET  DISABLE_BROKER 
GO
ALTER DATABASE [PolicyManagerQA] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PolicyManagerQA] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [PolicyManagerQA] SET  MULTI_USER 
GO
ALTER DATABASE [PolicyManagerQA] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PolicyManagerQA] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PolicyManagerQA] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PolicyManagerQA] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [PolicyManagerQA] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [PolicyManagerQA] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [PolicyManagerQA] SET QUERY_STORE = OFF
GO
USE [PolicyManagerQA]
GO
/****** Object:  User [PolicyManager]    Script Date: 5/4/2023 2:32:58 AM ******/
CREATE USER [PolicyManager] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Gaurav]    Script Date: 5/4/2023 2:32:58 AM ******/
CREATE USER [Gaurav] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [PolicyManager]
GO
ALTER ROLE [db_owner] ADD MEMBER [Gaurav]
GO
/****** Object:  UserDefinedFunction [dbo].[checkDSAisPresent]    Script Date: 5/4/2023 2:32:58 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [dbo].[checkDSAisPresent](@Mobileno nvarchar(10),@DSAID int )

	-- Add the parameters for the function here
	     

RETURNS nvarchar(500)  
AS
BEGIN
	Declare @DSAname nvarchar(500)  ;
	
 	Select @DSAname=DSAName+'   '+DSACode from tblDSA where  IsActive=1 and DSAId<>@DSAID and  DSAMobile1=@Mobileno OR DSAMobile2=@Mobileno
	 OR DSAPhone1=@Mobileno OR DSAPhone2=@Mobileno OR ContactPhone1=@Mobileno Or ContactPhone2=@Mobileno 
	 OR ContactPhone3=@Mobileno Or ContactPhone4=@Mobileno
     return @DSAname

END


GO
/****** Object:  Table [dbo].[tblPolicyType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPolicyType](
	[PolicyTypeId] [smallint] IDENTITY(1,1) NOT NULL,
	[PolicyType] [nvarchar](50) NOT NULL,
	[PolicyMainTypeId] [smallint] NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblCustomerType] PRIMARY KEY CLUSTERED 
(
	[PolicyTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCustomer]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCustomer](
	[CustomerId] [int] IDENTITY(1,1) NOT NULL,
	[CustomerCode] [nvarchar](20) NULL,
	[CustomerName] [nvarchar](100) NOT NULL,
	[CustomerTitleId] [smallint] NULL,
	[CustomerContactTitleId] [smallint] NULL,
	[CustomerContact] [nvarchar](50) NULL,
	[ClusterId] [int] NULL,
	[TerritoryId] [smallint] NULL,
	[IsCompany] [bit] NULL,
	[IsDecisionMaker] [bit] NULL,
	[CustomerAddress1] [nvarchar](200) NULL,
	[CustomerCityId1] [smallint] NULL,
	[CustomerPinCode1] [nvarchar](6) NULL,
	[GSTIN1] [nvarchar](15) NULL,
	[CustomerAddress2] [nvarchar](100) NULL,
	[CustomerCityId2] [smallint] NULL,
	[CustomerPinCode2] [nvarchar](6) NULL,
	[GSTIN2] [nvarchar](15) NULL,
	[CustomerAddress3] [nvarchar](200) NULL,
	[CustomerCityId3] [smallint] NULL,
	[CustomerPinCode3] [nvarchar](6) NULL,
	[GSTIN3] [nvarchar](15) NULL,
	[CustomerMobile1] [nvarchar](13) NULL,
	[InactiveMobile1] [bit] NULL,
	[CustomerMobile2] [nvarchar](13) NULL,
	[InactiveMobile2] [bit] NULL,
	[CustomerPhone1] [nvarchar](13) NULL,
	[InactivePhone1] [bit] NULL,
	[CustomerPhone2] [nvarchar](13) NULL,
	[InactivePhone2] [bit] NULL,
	[DefaultAddress] [smallint] NULL,
	[DefaultContactNo] [smallint] NULL,
	[DefaultWhatsAppNo] [smallint] NULL,
	[CustomerEmail1] [nvarchar](50) NULL,
	[CustomerEmail2] [nvarchar](50) NULL,
	[CustomerDOB] [smalldatetime] NULL,
	[CustomerAnniversery] [smalldatetime] NULL,
	[MaritalStatusId] [smallint] NULL,
	[NoofDependent] [tinyint] NULL,
	[ReferTypeId] [tinyint] NULL,
	[POSId] [int] NULL,
	[TeamMemberId] [int] NULL,
	[ReferenceId] [int] NULL,
	[PAN] [nvarchar](10) NULL,
	[AadhaarNo] [nvarchar](12) NULL,
	[BusinessTypeId] [int] NULL,
	[IndustryId] [int] NULL,
	[ProfessionId] [int] NULL,
	[DesignationId] [int] NULL,
	[IsMessageSend] [bit] NULL,
	[BranchId] [smallint] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[GenderId] [smallint] NULL,
	[PassportNo] [nvarchar](20) NULL,
	[IsTeamMember] [bit] NULL,
	[IsCommunicationOptOut1] [bit] NULL,
	[IsCommunicationOptOut2] [bit] NULL,
	[IsCommunicationOptOut3] [bit] NULL,
	[ReferById] [int] NULL,
	[CustomerNoofDependent] [int] NULL,
	[IsPos] [bit] NULL,
	[IsCommunicationOptOut4] [bit] NULL,
 CONSTRAINT [PK_tblCustomer] PRIMARY KEY CLUSTERED 
(
	[CustomerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPolicyStatus]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPolicyStatus](
	[PolicyStatusId] [smallint] IDENTITY(1,1) NOT NULL,
	[PolicyStatus] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblPolicyStatus] PRIMARY KEY CLUSTERED 
(
	[PolicyStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblMotorPolicyData]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblMotorPolicyData](
	[PolicyId] [int] IDENTITY(1,1) NOT NULL,
	[ControlNo] [nvarchar](12) NOT NULL,
	[LoyaltyCounter] [smallint] NULL,
	[VerticalCode] [nvarchar](2) NULL,
	[RenewalDone] [bit] NULL,
	[PreviousPolicyId] [int] NULL,
	[RenewalPolicyId] [int] NULL,
	[ChequeBouncePolicyId] [int] NULL,
	[ReinstateAllow] [bit] NULL,
	[VerticalSegmentId] [smallint] NULL,
	[VerticalId] [smallint] NOT NULL,
	[PolicyTypeId] [smallint] NOT NULL,
	[VehicleClassId] [smallint] NOT NULL,
	[PolicyTermId] [smallint] NOT NULL,
	[PolicyPackageType] [nvarchar](20) NOT NULL,
	[PolicyPackageTypeId] [smallint] NOT NULL,
	[ProductId] [smallint] NOT NULL,
	[PlanId] [smallint] NOT NULL,
	[PlanTypeId] [smallint] NOT NULL,
	[CustomerId] [int] NOT NULL,
	[CustomerType] [nvarchar](20) NULL,
	[NameInPolicy] [nvarchar](100) NULL,
	[AddressInPolicy] [nvarchar](200) NULL,
	[PAN] [nvarchar](10) NULL,
	[GSTIN] [nvarchar](15) NULL,
	[CoverNoteNo] [nvarchar](20) NULL,
	[CoverNoteDate] [smalldatetime] NULL,
	[AkgSlipNo] [nvarchar](20) NULL,
	[AkgSlipIssueDate] [smalldatetime] NULL,
	[InsuranceCompanyId] [smallint] NULL,
	[PolicyNo] [nvarchar](50) NULL,
	[PolicyStartDate] [smalldatetime] NULL,
	[NoofYearId] [smallint] NULL,
	[PolicyEndDate] [smalldatetime] NULL,
	[InsuranceCompanyODId] [smallint] NULL,
	[PolicyNoOD] [nvarchar](50) NULL,
	[PolicyStartDateOD] [smalldatetime] NULL,
	[NoofYearODId] [smallint] NULL,
	[PolicyEndDateOD] [smalldatetime] NULL,
	[KMCovered] [int] NULL,
	[ExtendedKMCovered] [int] NULL,
	[FinancerId] [smallint] NULL,
	[BlockAgentReassignment] [bit] NULL,
	[AgentChange] [bit] NULL,
	[NoPreviousPolicy] [bit] NULL,
	[PreviousInsuranceCompanyId] [smallint] NULL,
	[PreviousPolicyNo] [nvarchar](50) NULL,
	[PreviousPolicyEndDate] [smalldatetime] NULL,
	[PreviousPolicyPlan] [nvarchar](100) NULL,
	[PreviousSumInsured] [int] NULL,
	[NomineeName] [nvarchar](30) NULL,
	[NomineeRelationShipId] [smallint] NOT NULL,
	[NomineeAge] [smallint] NULL,
	[NomineeGenderId] [smallint] NULL,
	[NomineeGuardian] [nvarchar](30) NULL,
	[ManufacturerId] [smallint] NOT NULL,
	[ModelId] [smallint] NOT NULL,
	[VariantId] [int] NOT NULL,
	[FuelType] [nvarchar](20) NULL,
	[CubicCapacity] [int] NULL,
	[SeatingCapacity] [int] NULL,
	[GVW] [int] NULL,
	[KW] [int] NULL,
	[Exshowroom] [int] NULL,
	[MakeYearId] [smallint] NOT NULL,
	[RegistrationNo] [nvarchar](12) NULL,
	[SpecialRegistrationNo] [bit] NULL,
	[RegistrationDate] [smalldatetime] NULL,
	[EngineNo] [nvarchar](20) NULL,
	[ChassisNo] [nvarchar](20) NULL,
	[RTOZoneId] [smallint] NOT NULL,
	[VehicleUsageId] [smallint] NULL,
	[VehicleSegmentId] [smallint] NULL,
	[VehicleIDV] [int] NULL,
	[ElectricAssessoriesIDV] [int] NULL,
	[NonElectricAssessoriesIDV] [int] NULL,
	[CNGIDV] [int] NULL,
	[TotalIDV] [int] NULL,
	[OD] [decimal](30, 2) NULL,
	[AddonOD] [decimal](30, 2) NULL,
	[EndorseOD] [decimal](30, 2) NULL,
	[TotalOD] [int] NULL,
	[TPPremium] [decimal](30, 2) NULL,
	[PassengerCover] [decimal](30, 2) NULL,
	[EndorseTP] [decimal](30, 2) NULL,
	[TotalTP] [int] NULL,
	[GrossPremium] [decimal](30, 2) NULL,
	[EndorseGrossPremium] [decimal](30, 2) NULL,
	[GSTRate] [decimal](30, 2) NULL,
	[TotalGST] [int] NULL,
	[TotalGrossPremium] [int] NULL,
	[CommissionPayTypeId] [smallint] NULL,
	[CommissionablePremium] [decimal](30, 2) NULL,
	[NCBId] [smallint] NOT NULL,
	[SpecialDiscount] [decimal](30, 2) NULL,
	[Loading] [decimal](30, 2) NULL,
	[AddonRiderId] [smallint] NOT NULL,
	[AddOnSelected] [nvarchar](100) NULL,
	[TeleCallerId] [smallint] NOT NULL,
	[FOSId] [smallint] NOT NULL,
	[POSId] [int] NOT NULL,
	[RenewalPOSId] [int] NOT NULL,
	[POSManageBy] [smallint] NOT NULL,
	[ReferenceId] [int] NOT NULL,
	[BusinessDoneBy] [nvarchar](20) NULL,
	[PolicyRemarks] [nvarchar](250) NULL,
	[IsActive] [bit] NULL,
	[Flag1] [bit] NOT NULL,
	[Flag2] [bit] NOT NULL,
	[IsVerified] [bit] NOT NULL,
	[IsConverted] [bit] NULL,
	[BranchId] [smallint] NOT NULL,
	[PolicyStatusId] [smallint] NOT NULL,
	[PolicyCancelReasonId] [int] NULL,
	[PolicyCancelDate] [smalldatetime] NULL,
	[ReceivedStatusId] [smallint] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[VerifiedBy] [int] NULL,
	[VerifiedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[IRDACommMonthCycleId] [smallint] NULL,
	[IRDACommissionReceived] [smallint] NULL,
	[ExpectIRDACommPersent] [decimal](30, 2) NULL,
	[ReceiveIRDACommAmt] [int] NULL,
	[ReceiveIRDACommPersent] [decimal](30, 2) NULL,
	[ExpectORCCommPersent] [decimal](30, 2) NULL,
	[ReceiveORCCommAmt] [int] NULL,
	[ReceiveORCCommPersent] [decimal](30, 2) NULL,
	[POSCommMonthCycleId] [smallint] NULL,
	[POSCommissionReceived] [smallint] NULL,
	[ReferenceNo] [nvarchar](30) NULL,
	[NoAdult] [int] NULL,
	[NoChild] [int] NULL,
	[CBStartDate] [date] NULL,
	[PortabilityId] [smallint] NULL,
	[FamilyDiscount] [decimal](30, 2) NULL,
	[LongTermDiscount] [decimal](30, 2) NULL,
	[SectionDiscount] [decimal](30, 2) NULL,
	[AdditionalDiscount] [decimal](30, 2) NULL,
	[AddonRiderPremium] [int] NULL,
	[NoofDaysHospitalCash] [int] NULL,
	[CoverageId] [int] NULL,
	[NoofDays] [int] NULL,
	[MaxDaysSingleTrip] [int] NULL,
	[Occupancy] [nvarchar](50) NULL,
	[LineofBusiness] [nvarchar](50) NULL,
	[BasementExposerId] [tinyint] NULL,
	[TerrorismPremium] [int] NULL,
	[TotalSumInsured] [bigint] NULL,
	[InsuredMaxAge] [int] NULL,
	[StorageRiskId] [tinyint] NULL,
	[VoyageTypeId] [tinyint] NULL,
	[VoyageOverseasTypeId] [tinyint] NULL,
	[CoverageInlandId] [tinyint] NULL,
	[CoverageOverseasId] [tinyint] NULL,
	[TransitFromDomestic] [nvarchar](50) NULL,
	[TransitToDomestic] [nvarchar](50) NULL,
	[TransitFromOverseas] [nvarchar](50) NULL,
	[TransitToOverseas] [nvarchar](50) NULL,
	[MarineRate] [decimal](30, 2) NULL,
	[MiscRate] [decimal](30, 2) NULL,
	[MiscInfo1] [nvarchar](50) NULL,
	[MiscInfo2] [nvarchar](50) NULL,
	[MiscInfo3] [nvarchar](50) NULL,
	[MiscInfo4] [nvarchar](50) NULL,
	[FlagPostCall] [int] NULL,
	[FlagMidCall] [int] NULL,
	[FlagPreRenewCall] [int] NULL,
	[InsuranceBranchId] [int] NULL,
	[BasicTpGstPercentage] [decimal](30, 2) NULL,
	[NetPremium] [int] NULL,
	[NonCommissionComponentPremium] [decimal](30, 2) NULL,
	[VehicleSegment] [int] NULL,
	[IsPreviousPolicyApplicable] [bit] NULL,
 CONSTRAINT [PK__tblMotor__2E1339A46F3DEC85] PRIMARY KEY CLUSTERED 
(
	[PolicyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblInsuranceCompany]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblInsuranceCompany](
	[InsuranceCompanyId] [smallint] IDENTITY(1,1) NOT NULL,
	[InsuranceCompanyName] [nvarchar](100) NULL,
	[IsMotor] [bit] NULL,
	[IsHealth] [bit] NULL,
	[IsCommercial] [bit] NULL,
	[IsLife] [bit] NULL,
	[IsActive] [bit] NULL,
	[MappedInsureCompanyId] [int] NULL,
	[MappingReasonId] [int] NULL,
	[MappingApplicableFormdt] [datetime] NULL,
	[InsCompShortName] [nvarchar](20) NULL,
	[CompanyCode] [nvarchar](50) NULL,
	[Website1] [nvarchar](50) NULL,
	[Website2] [nvarchar](50) NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblInsuranceCompany] PRIMARY KEY CLUSTERED 
(
	[InsuranceCompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVertical]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVertical](
	[VerticalId] [smallint] IDENTITY(1,1) NOT NULL,
	[VerticalName] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[VerticalCode] [nvarchar](2) NULL,
	[VerticalSegmentId] [int] NULL,
 CONSTRAINT [PK_tblVertical] PRIMARY KEY CLUSTERED 
(
	[VerticalId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblMakeYear]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblMakeYear](
	[MakeYearId] [smallint] IDENTITY(1,1) NOT NULL,
	[MakeYear] [nvarchar](4) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[YearOld] [int] NULL,
	[IDVPersent] [int] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblMakeYear] PRIMARY KEY CLUSTERED 
(
	[MakeYearId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblManufacturer]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblManufacturer](
	[ManufacturerId] [smallint] IDENTITY(1,1) NOT NULL,
	[Branch2ManufacturerId] [smallint] NULL,
	[ManufacturerName] [nvarchar](50) NULL,
	[ManufacturerCode] [nvarchar](10) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblManufacturer] PRIMARY KEY CLUSTERED 
(
	[ManufacturerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblModel]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblModel](
	[ModelId] [smallint] IDENTITY(1,1) NOT NULL,
	[Branch2ModelId] [smallint] NULL,
	[ModelName] [nvarchar](50) NOT NULL,
	[ManufacturerId] [smallint] NOT NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblModal] PRIMARY KEY CLUSTERED 
(
	[ModelId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblProduct]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblProduct](
	[ProductId] [smallint] IDENTITY(1,1) NOT NULL,
	[VerticalId] [smallint] NOT NULL,
	[ProductName] [nvarchar](50) NOT NULL,
	[ProductDescription] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__tblAddon__8F4F26CC3EF22DE0] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPOS]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPOS](
	[POSId] [int] IDENTITY(1,1) NOT NULL,
	[POSCode] [nvarchar](10) NULL,
	[POSName] [nvarchar](50) NULL,
	[POSManagedBy] [smallint] NOT NULL,
	[CommunicationSend] [bit] NULL,
	[IsBookIssue] [bit] NULL,
	[POSTitleId] [smallint] NULL,
	[POSLocationId] [smallint] NULL,
	[POSAddress1] [nvarchar](100) NULL,
	[POSCityId1] [smallint] NULL,
	[POSPinCode1] [nvarchar](6) NULL,
	[POSAddress2] [nvarchar](100) NULL,
	[POSCityId2] [smallint] NULL,
	[POSPinCode2] [nvarchar](6) NULL,
	[POSPhone1] [nvarchar](13) NULL,
	[POSPhone2] [nvarchar](13) NULL,
	[POSMobile1] [nvarchar](10) NULL,
	[POSMobile2] [nvarchar](10) NULL,
	[POSEmail1] [nvarchar](50) NULL,
	[POSEmail2] [nvarchar](50) NULL,
	[POSDOB] [smalldatetime] NULL,
	[POSDOJ] [smalldatetime] NULL,
	[CategoryId] [smallint] NULL,
	[TypeId] [smallint] NULL,
	[IsMotor] [bit] NULL,
	[IsHealth] [bit] NULL,
	[IsCommercial] [bit] NULL,
	[IsLife] [bit] NULL,
	[IsActive] [bit] NOT NULL,
	[BranchId] [int] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__tblDSA_c__F70370B620589827] PRIMARY KEY CLUSTERED 
(
	[POSId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[View_SearchForm]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[View_SearchForm]
AS
	SELECT        
		dbo.tblMotorPolicyData.PolicyId,
		dbo.tblMotorPolicyData.ControlNo,
		cast(Right(dbo.tblMotorPolicyData.ControlNo, 6 )as int) as ControlNumberDigit,
		dbo.tblMotorPolicyData.CustomerId,
		dbo.tblMotorPolicyData.PolicyPackageTypeId,
		dbo.tblMotorPolicyData.VerticalId, 
		dbo.tblMotorPolicyData.ProductId,
		dbo.tblMotorPolicyData.ManufacturerId,
		dbo.tblMotorPolicyData.ModelId,
		dbo.tblMotorPolicyData.POSId,
		dbo.tblMotorPolicyData.NameInPolicy, 
		dbo.tblMotorPolicyData.RegistrationNo,
		dbo.tblMotorPolicyData.GrossPremium,
		dbo.tblMotorPolicyData.IsActive,
		dbo.tblMotorPolicyData.Flag1,
		dbo.tblMotorPolicyData.Flag2,
		dbo.tblMotorPolicyData.IsVerified, 
		dbo.tblMotorPolicyData.BranchId,
		dbo.tblMotorPolicyData.EngineNo as EngineNumber,
		dbo.tblMotorPolicyData.ChassisNo as ChassisNumber,
		dbo.tblPolicyType.PolicyType,
		dbo.tblVertical.VerticalName,
		dbo.tblProduct.ProductName,
		dbo.tblManufacturer.ManufacturerName,
		dbo.tblModel.ModelName, 
		dbo.tblPOS.POSName,
		dbo.tblPolicyStatus.PolicyStatus,
		dbo.tblPolicyStatus.PolicyStatusId,
		CASE tblMotorPolicyData.PolicyPackageTypeId WHEN 1 THEN tblMotorPolicyData.PolicyEndDate ELSE tblMotorPolicyData.PolicyEndDateOD END AS ExpiryDate, 
		CASE tblMotorPolicyData.PolicyPackageTypeId WHEN 1 THEN tblMotorPolicyData.PolicyStartDate ELSE tblMotorPolicyData.PolicyStartDateOD END AS StartDate, 
		CASE tblMotorPolicyData.PolicyPackageTypeId WHEN 1 THEN tblMotorPolicyData.PolicyNo ELSE tblMotorPolicyData.PolicyNoOD END AS PolicyNumber, 
		CASE tblMotorPolicyData.PolicyPackageTypeId WHEN 1 THEN tblMotorPolicyData.InsuranceCompanyId ELSE tblMotorPolicyData.InsuranceCompanyODId END AS InsuranceCompanyIdNumber, 
		CASE tblMotorPolicyData.PolicyPackageTypeId WHEN 1 THEN tblInsuranceCompany.InsuranceCompanyName ELSE ODInsuranceCompany.InsuranceCompanyName END AS InsuranceCompany, 
		dbo.tblMotorPolicyData.PolicyRemarks,
		dbo.tblMotorPolicyData.CreatedBy,
		dbo.tblMotorPolicyData.RenewalDone,
		dbo.tblMotorPolicyData.VerticalSegmentId,
		[dbo].[tblCustomer].CustomerMobile1 as Mobile1,
		[dbo].[tblCustomer].CustomerMobile2 as Mobile2, 
		[dbo].[tblCustomer].CustomerPhone1 as Phone1,
		[dbo].[tblCustomer].CustomerPhone2 as Phone2,
		[dbo].[tblCustomer].CustomerName as CustomerName,
		[dbo].[tblMakeYear].MakeYear as MakeYear,
		[dbo].[tblMakeYear].MakeYearId as MakeYearId
	FROM dbo.tblMotorPolicyData 
	INNER JOIN dbo.tblVertical ON dbo.tblMotorPolicyData.VerticalId = dbo.tblVertical.VerticalId
	INNER JOIN [dbo].[tblCustomer] ON [dbo].[tblCustomer].CustomerId = dbo.tblMotorPolicyData.CustomerId
	LEFT OUTER JOIN dbo.tblPOS ON dbo.tblMotorPolicyData.POSId = dbo.tblPOS.POSId 
	INNER JOIN dbo.tblPolicyStatus ON dbo.tblMotorPolicyData.PolicyStatusId = dbo.tblPolicyStatus.PolicyStatusId
	INNER JOIN dbo.tblPolicyType ON dbo.tblMotorPolicyData.PolicyTypeId = dbo.tblPolicyType.PolicyTypeId
	LEFT OUTER JOIN dbo.tblManufacturer ON dbo.tblMotorPolicyData.ManufacturerId = dbo.tblManufacturer.ManufacturerId
	INNER JOIN dbo.tblInsuranceCompany ON dbo.tblMotorPolicyData.InsuranceCompanyId = dbo.tblInsuranceCompany.InsuranceCompanyId 
	LEFT OUTER JOIN dbo.tblInsuranceCompany AS ODInsuranceCompany ON dbo.tblMotorPolicyData.InsuranceCompanyODId = ODInsuranceCompany.InsuranceCompanyId
	LEFT OUTER JOIN dbo.tblModel ON dbo.tblMotorPolicyData.ModelId = dbo.tblModel.ModelId
	LEFT OUTER JOIN dbo.tblProduct ON dbo.tblMotorPolicyData.ProductId = dbo.tblProduct.ProductId
	LEFT OUTER JOIN [dbo].[tblMakeYear] ON [dbo].[tblMakeYear].MakeYearId =  dbo.tblMotorPolicyData.MakeYearId
GO
/****** Object:  Table [dbo].[tblPolicyTerm]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPolicyTerm](
	[PolicyTermId] [smallint] IDENTITY(1,1) NOT NULL,
	[VehicleClassId] [smallint] NOT NULL,
	[PolicyTypeId] [smallint] NOT NULL,
	[PolicyPackageTypeId] [smallint] NOT NULL,
	[PolicyPackageType] [nvarchar](50) NULL,
	[PolicyTermName] [nvarchar](30) NOT NULL,
	[TPYear] [int] NOT NULL,
	[ODYear] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblPolicyTerm] PRIMARY KEY CLUSTERED 
(
	[PolicyTermId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblAddonRider]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblAddonRider](
	[AddonRiderId] [smallint] IDENTITY(1,1) NOT NULL,
	[InsuranceCompanyId] [tinyint] NOT NULL,
	[VerticalId] [tinyint] NOT NULL,
	[AddonRiderName] [nvarchar](100) NOT NULL,
	[RiderDetails] [nvarchar](200) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblAddonRider] PRIMARY KEY CLUSTERED 
(
	[AddonRiderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPlan]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPlan](
	[PlanId] [smallint] IDENTITY(1,1) NOT NULL,
	[PlanName] [nvarchar](50) NOT NULL,
	[VerticalId] [smallint] NOT NULL,
	[ProductId] [smallint] NOT NULL,
	[InsuranceCompanyId] [smallint] NOT NULL,
	[PlanDescription] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblPlan] PRIMARY KEY CLUSTERED 
(
	[PlanId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPlanType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPlanType](
	[PlanTypeId] [int] IDENTITY(1,1) NOT NULL,
	[PlanTypeName] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblPlanType] PRIMARY KEY CLUSTERED 
(
	[PlanTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblNCB]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblNCB](
	[NCBId] [smallint] IDENTITY(1,1) NOT NULL,
	[NCBPercentage] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblNCB] PRIMARY KEY CLUSTERED 
(
	[NCBId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewMasterWithMotorPolicy]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[ViewMasterWithMotorPolicy]
AS
SELECT        Extent1.PolicyId, Extent1.ControlNo, CASE WHEN (1 = [Extent1].[PolicyPackageTypeId]) THEN [Extent1].[PolicyNo] ELSE [Extent1].[PolicyNoOD] END AS PolicyNo, Extent1.CoverNoteNo, Extent5.CustomerName, 
                         CASE WHEN (1 = [Extent1].[PolicyPackageTypeId]) THEN [Extent2].[CompanyName] ELSE [Extent3].[CompanyName] END AS InsureCompanyName, Extent1.RegistrationNo, Extent7.NCBPercentage, Extent9.DSAName, 
                         Extent1.TotalGrossPremium, Extent1.OD, Extent8.AddonRiderName, CASE WHEN (1 = [Extent1].[PolicyPackageTypeId]) THEN [Extent1].[PolicyEndDate] ELSE [Extent1].[PolicyEndDateOD] END AS PolicyEndDate, 
                         CASE WHEN (1 = [Extent1].[PolicyPackageTypeId]) THEN [Extent1].[PolicyStartDate] ELSE [Extent1].[PolicyStartDateOD] END AS PolicyStartDate, Extent6.ManufacturerName, Extent1.VerticalSegmentId,Extent10.VerticalName, Extent11.ModelName, 
                         Extent12.ProductName, Extent1.AddonPlanDetail, CASE WHEN (1 = [Extent1].[PolicyStatusId]) THEN N'Active' ELSE N'Cancel' END AS PolicyStatus, Extent5.CustomerMobile1, Extent5.CustomerMobile2, Extent5.CustomerEmail1,
                          Extent5.CustomerEmail2, Extent1.RenewalDone, Extent1.VerticleId, Extent1.PolicyTypeId, Extent1.ProductId, Extent1.PlanId, Extent1.PlanTypeId, Extent1.NameInPolicy, Extent1.ManufacturerId, Extent1.ModelId, 
                         Extent1.VariantId, Extent1.FuelType, Extent1.GrossPremium, Extent1.DSAId, Extent1.FOSId, Extent1.PolicyStatusId, CASE WHEN (1 = [Extent1].[PolicyPackageTypeId]) 
                         THEN [Extent1].[InsureCompanyId] ELSE [Extent1].[InsureCompanyODId] END AS InsureCompanyId, Extent1.BranchId, Extent1.BusinessDoneBy, Extent1.MakeYearId, dbo.tblMakeYear.MakeYear, dbo.tblPlan.PlanName, 
                         Extent1.CustomerId, Extent1.PolicyPackageType, dbo.tblPlanType.PlanTypeName, Extent5.InactiveMobile1, Extent1.ReferenceId, Extent5.IsMessageSend, Extent1.NoofYearId, Extent1.FinancerId, Extent1.AddonRiderId, 
                         Extent1.InspectionCompanyId, Extent1.NomineeRelationShipId, Extent1.PolicyCancelReasonId, Extent1.IRDACommMonthCycleId, Extent1.DSAManageBy, Extent9.DSACategoryId, Extent1.RTOZoneId, Extent1.VehicleClassId, 
                         Extent1.NCBId, Extent1.TeleCallerId, Extent1.CustomerType, Extent1.PolicyNo AS Expr1, Extent1.IssueDate, Extent1.CubicCapacity, Extent1.SeatingCapacity, Extent1.GVW, Extent1.ChassisNo, Extent1.EngineNo, 
                         Extent1.CNGIDV, Extent1.AssessoriesIDV, Extent1.LoyaltyCounter, Extent1.NoAdult, Extent1.NoChild, Extent1.SpecialDiscount, Extent1.Loading, Extent1.ServiceTax, Extent1.NomineeName, Extent1.NomineeAge, 
                         Extent1.NomineeGender, Extent1.RegistrationDate, Extent1.Exshowroom, Extent1.PAN, Extent1.VehicleIDV, Extent1.TotalIDV, Extent1.AddonOD, Extent1.PolicyRemarks, Extent1.PolicyCancelDate, Extent9.DSAManagedBy, 
                         Extent1.TotalOD, Extent1.GSTIN
FROM            dbo.tblMotorPolicyData AS Extent1 INNER JOIN
                         dbo.tblInsuranceCompany AS Extent2 ON Extent1.InsureCompanyId = CAST(Extent2.InsureCompanyId AS int) LEFT OUTER JOIN
                         dbo.tblInsuranceCompany AS Extent3 ON Extent1.InsureCompanyODId = CAST(Extent3.InsureCompanyId AS int) LEFT OUTER JOIN
                         dbo.tblPolicyTerm AS Extent4 ON Extent1.PolicyTermId = Extent4.PolicyTermId INNER JOIN
                         dbo.tblCustomer AS Extent5 ON Extent1.CustomerId = Extent5.CustomerId LEFT OUTER JOIN
                         dbo.tblManufacturer AS Extent6 ON Extent1.ManufacturerId = Extent6.ManufacturerId LEFT OUTER JOIN
                         dbo.tblNCB AS Extent7 ON Extent1.NCBId = Extent7.NCBId LEFT OUTER JOIN
                         dbo.tblAddonRider AS Extent8 ON Extent1.AddonRiderId = Extent8.AddonRiderId LEFT OUTER JOIN
                         dbo.tblDSA AS Extent9 ON Extent1.DSAId = Extent9.DSAId INNER JOIN
                         dbo.tblVertical AS Extent10 ON Extent1.VerticleId = Extent10.VerticalId LEFT OUTER JOIN
                         dbo.tblPlanType ON Extent1.PlanTypeId = dbo.tblPlanType.PlanTypeId LEFT OUTER JOIN
                         dbo.tblMakeYear ON Extent1.MakeYearId = dbo.tblMakeYear.MakeYearId LEFT OUTER JOIN
                         dbo.tblPlan ON Extent1.PlanId = dbo.tblPlan.PlanId LEFT OUTER JOIN
                         dbo.tblModel AS Extent11 ON Extent1.ModelId = Extent11.ModelId LEFT OUTER JOIN
                         dbo.tblProduct AS Extent12 ON Extent1.ProductId = CAST(Extent12.ProductId AS int)
WHERE        (Extent1.IsActive = 1) AND (Extent1.PolicyStatusId = 1) AND (Extent1.IsVerified = 1)


GO
/****** Object:  Table [dbo].[tblVoucherType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVoucherType](
	[VoucherTypeId] [smallint] IDENTITY(1,1) NOT NULL,
	[VoucherTypeName] [nvarchar](30) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblVoucherType] PRIMARY KEY CLUSTERED 
(
	[VoucherTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblTeamMember]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblTeamMember](
	[TeamMemberId] [smallint] IDENTITY(1,1) NOT NULL,
	[TeamMemberName] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[LevelNumber] [int] NULL,
	[ReportedToId] [smallint] NULL,
	[DepartmentId] [smallint] NULL,
	[DesignationId] [smallint] NULL,
	[TeamMemberCode] [nvarchar](50) NULL,
	[TeamMemberAddress] [nvarchar](100) NULL,
	[TeamMemberPhone1] [nvarchar](50) NULL,
	[TeamMemberPhone2] [nvarchar](50) NULL,
	[TeamMemberMobile1] [nvarchar](50) NULL,
	[TeamMemberMobile2] [nvarchar](50) NULL,
	[TeamMemberEmail1] [nvarchar](50) NULL,
	[TeamMemberEmail2] [nvarchar](50) NULL,
	[TeamMemberDOB] [datetime] NULL,
	[TeamMemberDOJ] [datetime] NULL,
	[IsBookIssue] [bit] NULL,
	[BranchId] [smallint] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[ISTelecaller] [bit] NULL,
	[ISFOS] [bit] NULL,
	[IsMotor] [bit] NULL,
	[IsHealth] [bit] NULL,
	[IsCommercial] [bit] NULL,
	[IsLife] [bit] NULL,
	[IsLocked] [bit] NULL,
	[IsInspection] [bit] NULL,
 CONSTRAINT [PK_tblEmployee] PRIMARY KEY CLUSTERED 
(
	[TeamMemberId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPaymentMode]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPaymentMode](
	[PaymentModeId] [int] IDENTITY(1,1) NOT NULL,
	[PaymentMode] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblPaymentMode] PRIMARY KEY CLUSTERED 
(
	[PaymentModeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblBank]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblBank](
	[BankId] [smallint] IDENTITY(1,1) NOT NULL,
	[BankName] [nvarchar](50) NOT NULL,
	[BankCode] [nvarchar](20) NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblBank] PRIMARY KEY CLUSTERED 
(
	[BankId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVoucherDetails]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVoucherDetails](
	[VoucherId] [int] IDENTITY(1,1) NOT NULL,
	[VoucherNo] [nvarchar](20) NOT NULL,
	[VoucherDate] [smalldatetime] NOT NULL,
	[PolicyId] [int] NULL,
	[InsuranceCompanyId] [smallint] NOT NULL,
	[CustomerName] [nvarchar](50) NULL,
	[PolicyNo] [nvarchar](50) NULL,
	[VerticalId] [smallint] NULL,
	[VoucherTypeId] [smallint] NULL,
	[ReferTypeId] [smallint] NULL,
	[POSId] [int] NULL,
	[TeamMemberId] [int] NULL,
	[ReferenceId] [int] NULL,
	[PaymentModeId] [smallint] NULL,
	[TxnInstrumentNo] [nvarchar](30) NULL,
	[VoucherAmount] [int] NOT NULL,
	[TxnInstrumentDate] [smalldatetime] NULL,
	[BankId] [smallint] NULL,
	[AccountUsedforCheque] [nvarchar](20) NULL,
	[VoucherRemark] [nvarchar](100) NULL,
	[ModificationReason] [nvarchar](50) NULL,
	[IsActive] [bit] NULL,
	[IsVerified] [bit] NULL,
	[VoucherStatusId] [smallint] NULL,
	[CancelReason] [nvarchar](50) NULL,
	[IsCancelVerfied] [bit] NULL,
	[IsPolicyMapped] [bit] NULL,
	[CustomerId] [int] NULL,
	[ControlNo] [nvarchar](30) NULL,
	[BounceAmt] [int] NULL,
	[BounceDate] [smalldatetime] NULL,
	[BounceReceiptNo] [nvarchar](50) NULL,
	[BranchId] [smallint] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[VerifiedBy] [int] NULL,
	[VerifiedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblVoucherDetails] PRIMARY KEY CLUSTERED 
(
	[VoucherId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[SearchVoucher]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



 CREATE view [dbo].[SearchVoucher]
  as
 select 
		tvd.VoucherId as VoucherId,
		tvd.VoucherTypeId as VoucherTypeId,
		tvd.PolicyNo as PolicyNumber,
		tvd.CustomerName as Customer,
		tvd.CustomerId as CustomerId,
		tvd.TxnInstrumentNo as InstrumentNumber,
		tvd.VoucherNo as VoucherNumber,
		cast(Right(tvd.VoucherNo, 5 )as int) as VoucherNumberDigit,
		tvd.VoucherAmount as VoucherAmount,
		tvd.VoucherDate as VoucherDate,
		tvd.IsCancelVerfied as IsCancelVerfied,
		tvd.IsPolicyMapped as IsPolicyMapped,
		tvd.IsVerified as IsVerified, 
		tvd.BranchId as BranchId,
		tvd.VoucherStatusId as StatusId,
		tvd.CreatedBy as CreatedBy,
		tvd.ModifiedBy as ModifiedBy,
		ISNULL(tp.POSName, '') as PosName,
		ISNULL(tp.POSId, 0) as PosId,
		tb.BankName as Bank,
		tpm.PaymentMode as PaymentMode,
		tvt.VoucherTypeName as VoucherType,
		ISNULL(ttm.TeamMemberName, '') as TeamMember,
		ISNULL(ttm.TeamMemberId, 0) as TeamMemberId,
		tic.InsuranceCompanyName as InsuranceCompany,
		tic.InsuranceCompanyId as InsuranceCompanyId
  from tblVoucherDetails tvd
  inner join tblPaymentMode tpm on tpm.PaymentModeId = tvd.PaymentModeId
  inner join tblVoucherType tvt on tvt.VoucherTypeId = tvd.VoucherTypeId
  inner join tblInsuranceCompany tic on tic.InsuranceCompanyId = tvd.InsuranceCompanyId
  left join tblBank tb on tb.BankId = tvd.BankId
  left join tblTeamMember ttm on ttm.TeamMemberId = tvd.TeamMemberId
  left join tblPOS tp on tp.POSId = tvd.POSId
  where tvd.IsActive = 1
GO
/****** Object:  Table [dbo].[tblUser]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUser](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](20) NOT NULL,
	[UserPassword] [nvarchar](20) NOT NULL,
	[UserFullName] [nvarchar](50) NULL,
	[BranchId] [smallint] NOT NULL,
	[UserRoleId] [int] NULL,
	[UserTypeId] [smallint] NOT NULL,
	[TeamMemberId] [smallint] NULL,
	[IsLocked] [bit] NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[CurrentSessionId] [int] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewCustomerCareCrossSell]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewCustomerCareCrossSell] AS 
SELECT     dbo.tblCustomerCareData.CustomerCallDataId, dbo.tblVertical.VerticalName, dbo.tblInsuranceCompany.CompanyName, dbo.tblCallType.CallTypeName, dbo.tblModel.ModelName, 
                      dbo.tblMakeYear.MakeYear, dbo.tblProduct.ProductName, dbo.tblCustomerCareData.Q1ResponsePost, dbo.tblCustomerCareData.Q1CommentPost, dbo.tblCustomerCareData.Q2ResponsePost, 
                      dbo.tblCustomerCareData.Q2CommentPost, dbo.tblCustomerCareData.Q3ResponsePost, dbo.tblCustomerCareData.Q3CommentPost, dbo.tblCustomerCareData.Q5CommentPost, 
                      dbo.tblCustomerCareData.CallStatusIdPost, dbo.tblCustomerCareData.SubStatusIdPost, dbo.tblCustomerCareData.FollowupDatePost, dbo.tblCustomerCareData.FinalComment, 
                      dbo.tblCustomerCareData.LastCallDate, dbo.tblCustomerCareData.CallTypeId, dbo.tblCustomerCareData.CallDurationTypeId, dbo.tblCustomerCareData.Q4ResponsePost, 
                      dbo.tblCustomerCareData.Q4CommentPost, dbo.tblCustomerCareData.Q5ResponsePost, dbo.tblCustomerCareData.PolicyId, dbo.tblCustomerCareData.ControlNo, 
                      dbo.tblCustomerCareData.CustomerId, dbo.tblCustomerCareData.NameInPolicy, dbo.tblCustomerCareData.PolicyStartDate, dbo.tblCustomerCareData.DSAId, 
                      dbo.tblCustomerCareData.RegistrationNo, dbo.tblCustomerCareData.VerticalId, dbo.tblCustomerCareData.ProductId, dbo.tblCustomerCareData.InsureCompanyId, dbo.tblCustomerCareData.ModelId, 
                      dbo.tblCustomerCareData.MakeYearId, dbo.tblUser.UserId, dbo.tblCustomerCareData.CrossSellInsureCompanyIdPost, dbo.tblCustomerCareData.CrossSellVerticalIdPost, 
                      dbo.tblCustomerCareData.CrossSellExpiryDatePost, dbo.tblCustomerCareData.CrossSellInsureCompanyId1Post, dbo.tblCustomerCareData.CrossSellVerticalId1Post, 
                      dbo.tblCustomerCareData.CrossSellExpiryDate1Post, dbo.tblDSA.DSAName, dbo.tblCustomerCareData.CrossSellTelecallerIdPost, dbo.tblCustomerCareData.CrossSellTelecallerId1Post, 
                      dbo.tblCustomerCareData.CrossSellChkNewPost, dbo.tblCustomerCareData.CrossSellChkNew1Post, dbo.tblCustomerCareData.CrossSellInsureCompanyIdMid, 
                      dbo.tblCustomerCareData.CrossSellVerticalIdMid, dbo.tblCustomerCareData.CrossSellExpiryDateMid, dbo.tblCustomerCareData.CrossSellInsureCompanyId1Mid, 
                      dbo.tblCustomerCareData.CrossSellVerticalId1Mid, dbo.tblCustomerCareData.CrossSellExpiryDate1Mid, dbo.tblCustomerCareData.CrossSellTelecallerIdMid, 
                      dbo.tblCustomerCareData.CrossSellTelecallerId1Mid, dbo.tblCustomerCareData.CrossSellChkNewMid, dbo.tblCustomerCareData.CrossSellChkNew1Mid, 
                      dbo.tblCustomerCareData.CrossSellInsureCompanyIdPreRenew, dbo.tblCustomerCareData.CrossSellVerticalIdPreRenew, dbo.tblCustomerCareData.CrossSellExpiryDatePreRenew, 
                      dbo.tblCustomerCareData.CrossSellInsureCompanyId1PreRenew, dbo.tblCustomerCareData.CrossSellVerticalId1PreRenew, dbo.tblCustomerCareData.CrossSellExpiryDate1PreRenew, 
                      dbo.tblCustomerCareData.CrossSellTelecallerIdPreRenew, dbo.tblCustomerCareData.CrossSellTelecallerId1PreRenew, dbo.tblCustomerCareData.CrossSellChkNewPreRenew, 
                      dbo.tblCustomerCareData.CrossSellChkNew1PreRenew, dbo.tblCustomerCareData.Q1ResponseMid, dbo.tblCustomerCareData.Q1CommentMid, dbo.tblCustomerCareData.Q2ResponseMid, 
                      dbo.tblCustomerCareData.Q2CommentMid, dbo.tblCustomerCareData.Q3ResponseMid, dbo.tblCustomerCareData.Q3CommentMid, dbo.tblCustomerCareData.Q4ResponseMid, 
                      dbo.tblCustomerCareData.Q4CommentMid, dbo.tblCustomerCareData.Q5ResponseMid, dbo.tblCustomerCareData.Q5CommentMid, dbo.tblCustomerCareData.Q1ResponsePrerenew, 
                      dbo.tblCustomerCareData.Q1CommentPrerenew, dbo.tblCustomerCareData.Q2ResponsePrerenew, dbo.tblCustomerCareData.Q2CommentPrerenew, dbo.tblCustomerCareData.Q3ResponsePrerenew, 
                      dbo.tblCustomerCareData.Q3CommentPrerenew, dbo.tblCustomerCareData.Q4ResponsePrerenew, dbo.tblCustomerCareData.Q4CommentPrerenew, dbo.tblCustomerCareData.Q5ResponsePrerenew, 
                      dbo.tblCustomerCareData.Q5CommentPrerenew, dbo.tblCustomerCareData.CallStatusIdMid, dbo.tblCustomerCareData.SubStatusIdMid, dbo.tblCustomerCareData.FollowupDateMid, 
                      dbo.tblCustomerCareData.FollowupTimeMid, dbo.tblCustomerCareData.CallStatusIdPrerenew, dbo.tblCustomerCareData.SubStatusIdPrerenew, dbo.tblCustomerCareData.FollowupDatePrerenew, 
                      dbo.tblCustomerCareData.FollowupTimePrerenew
FROM         dbo.tblModel RIGHT OUTER JOIN
                      dbo.tblCustomerCareData INNER JOIN
                      dbo.tblVertical ON dbo.tblCustomerCareData.VerticalId = dbo.tblVertical.VerticalId INNER JOIN
                      dbo.tblInsuranceCompany ON dbo.tblCustomerCareData.InsureCompanyId = dbo.tblInsuranceCompany.InsureCompanyId INNER JOIN
                      dbo.tblMotorPolicyData ON dbo.tblCustomerCareData.PolicyId = dbo.tblMotorPolicyData.PolicyId LEFT OUTER JOIN
                      dbo.tblUser INNER JOIN
                      dbo.tblEmployee ON dbo.tblUser.EmployeeId = dbo.tblEmployee.EmployeeId ON dbo.tblMotorPolicyData.TeleCallerId = dbo.tblEmployee.EmployeeId LEFT OUTER JOIN
                      dbo.tblDSA ON dbo.tblCustomerCareData.DSAId = dbo.tblDSA.DSAId LEFT OUTER JOIN
                      dbo.tblCallType ON dbo.tblCustomerCareData.CallTypeId = dbo.tblCallType.CallTypeId ON dbo.tblModel.ModelId = dbo.tblCustomerCareData.ModelId LEFT OUTER JOIN
                      dbo.tblMakeYear ON dbo.tblCustomerCareData.MakeYearId = dbo.tblMakeYear.MakeYearId LEFT OUTER JOIN
                      dbo.tblProduct ON dbo.tblCustomerCareData.ProductId = dbo.tblProduct.ProductId
GO
/****** Object:  Table [dbo].[tblClaimData]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblClaimData](
	[ClaimId] [int] IDENTITY(1,1) NOT NULL,
	[PolicyId] [int] NOT NULL,
	[VerticalId] [smallint] NULL,
	[ClaimEntryDate] [smalldatetime] NOT NULL,
	[ClaimNo] [nvarchar](50) NULL,
	[ClaimTypeId] [int] NULL,
	[ClaimSubmissionDate] [smalldatetime] NULL,
	[ClaimSubmittedBy] [nvarchar](50) NULL,
	[ContactPerson] [nvarchar](50) NULL,
	[ContactPersonNo] [nvarchar](50) NULL,
	[ClaimAmtSubmitted] [int] NULL,
	[ClaimReason] [nvarchar](100) NULL,
	[ClaimStatusId] [smallint] NOT NULL,
	[ClaimSubStatusId] [int] NULL,
	[FollowupDate] [smalldatetime] NULL,
	[FollowupReason] [nvarchar](100) NULL,
	[ClaimRemarkbyCompany] [nvarchar](100) NULL,
	[ClaimAmtApproved] [int] NULL,
	[FinalRemark] [nvarchar](200) NULL,
	[PatientName] [nvarchar](50) NULL,
	[DateOfAdmission] [smalldatetime] NULL,
	[DateOfDischarge] [smalldatetime] NULL,
	[HospitalName] [nvarchar](50) NULL,
	[DocumentSubmitDate] [smalldatetime] NULL,
	[AccidentDetails] [nvarchar](100) NULL,
	[WorkshopName] [nvarchar](50) NULL,
	[WorkshopNo] [nvarchar](50) NULL,
	[ServiceAdvisorName] [nvarchar](50) NULL,
	[ServiceAdvisorNo] [nvarchar](50) NULL,
	[SurveyorName] [nvarchar](50) NULL,
	[SurveyorNo] [nvarchar](50) NULL,
	[SurveyorEmail] [nvarchar](30) NULL,
	[EstimateAmount] [nvarchar](50) NULL,
	[VisibleDamage] [nvarchar](200) NULL,
	[PendngConcerns] [nvarchar](200) NULL,
	[NatureofClaim] [nvarchar](200) NULL,
	[ClaimEntryBranchId] [smallint] NULL,
	[CreatedBy] [int] NULL,
	[CreatedDatetime] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedDatetime] [datetime] NULL,
 CONSTRAINT [PK_tblClaimData] PRIMARY KEY CLUSTERED 
(
	[ClaimId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblClaimStatus]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblClaimStatus](
	[ClaimStatusId] [int] IDENTITY(1,1) NOT NULL,
	[ClaimStatus] [nvarchar](30) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblClaimStatus] PRIMARY KEY CLUSTERED 
(
	[ClaimStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[SearchClaims]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


 CREATE view [dbo].[SearchClaims]
 as
 select 
	claims.ClaimId as ClaimsId,
	claims.ClaimNo as ClaimsNumber,
	claims.ClaimEntryDate as ClaimsEntryDate,
	[status].ClaimStatus as ClaimsStatus,
	policyData.PolicyId as PolicyId,
	policyData.PolicyNo as PolicyNumber,
	policyData.ControlNo as ControlNumber,
	cast(Right(policyData.ControlNo, 6 )as int) as ControlNumberDigit,
	policyData.NameInPolicy as CustomerName,
	policyData.RegistrationNo as RegistrationNumber,
	customer.CustomerMobile1 as Mobile1,
	customer.CustomerMobile2 as Mobile2,
	customer.CustomerPhone1 as Phone1,
	customer.CustomerPhone2 as Phone2,
	model.ModelName as Model,
	insurance.InsuranceCompanyName as InsuranceCompany,
	insurance.InsuranceCompanyId as InsuranceCompanyId,
	vertical.VerticalName as Vertical,
	vertical.VerticalId as VerticalId,
	product.ProductName as Product,
	pos.POSId as PosId
 from [dbo].[tblClaimData] claims
 inner join [dbo].[tblMotorPolicyData] policyData on policyData.PolicyId= claims.PolicyId
 inner join [dbo].[tblInsuranceCompany] insurance on insurance.InsuranceCompanyId = policyData.InsuranceCompanyId
 inner join [dbo].[tblVertical] vertical on vertical.VerticalId = claims.VerticalId
 inner join [dbo].[tblClaimStatus] [status] on [status].ClaimStatusId = claims.ClaimStatusId
 inner join [dbo].[tblCustomer] customer on customer.CustomerId = policyData.CustomerId
 left join [dbo].[tblProduct] product on product.ProductId = policyData.ProductId
 left join [dbo].[tblModel] model on model.ModelId = policyData.ModelId
 left join [dbo].[tblPOS] pos on pos.POSId = policyData.POSId
GO
/****** Object:  Table [dbo].[tblBranch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblBranch](
	[BranchId] [smallint] IDENTITY(1,1) NOT NULL,
	[BranchCode] [nvarchar](2) NULL,
	[BranchName] [nvarchar](100) NOT NULL,
	[BranchLocation] [nvarchar](50) NOT NULL,
	[BranchAddress] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[DisplayOrder] [tinyint] NULL,
 CONSTRAINT [PK_Branch] PRIMARY KEY CLUSTERED 
(
	[BranchId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[SearchClaimsPolicy]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE view [dbo].[SearchClaimsPolicy]
as
select 
	policyData.PolicyId,
	policyData.ControlNo as ControlNumber,
	policyData.PolicyNo as PolicyNumber,
	policyData.RegistrationNo as RegistrationNumber,
	policyData.PolicyEndDate as PolicyExpiryDate,
	insuranceCompany.InsuranceCompanyName as InsuranceCompany,
	pos.POSName as Pos,
	branch.BranchName as Branch,
	vertical.VerticalName as Vertical,
	policyData.NameInPolicy as Customer,
	policyData.CustomerId as CustomerId,
	product.ProductName as Product,
	planData.PlanName as [Plan],
	planType.PlanTypeName as PlanType,
	manufacture.ManufacturerName as ManufacturerName,
	model.ModelName as ModelName,
	makeYear.MakeYear as MakeYear
from [dbo].[tblMotorPolicyData] policyData
inner join [dbo].[tblInsuranceCompany] insuranceCompany on insuranceCompany.InsuranceCompanyId = policyData.InsuranceCompanyId
inner join [dbo].[tblBranch] branch on branch.BranchId = policyData.BranchId
inner join [dbo].[tblVertical] vertical on vertical.VerticalId = policyData.VerticalId
left join [dbo].[tblPlan] planData on planData.PlanId = policyData.PlanId
left join [dbo].[tblPlanType] planType on planType.PlanTypeId = policyData.PlanTypeId
left join [dbo].[tblPOS] pos on pos.POSId = policyData.POSId
left join [dbo].[tblProduct] product on product.ProductId = policyData.ProductId
left join [dbo].[tblManufacturer] manufacture on manufacture.ManufacturerId = policyData.ManufacturerId
left join [dbo].[tblModel] model on model.ModelId = policyData.ModelId
left join [dbo].[tblMakeYear] makeYear on makeYear.MakeYearId = policyData.MakeYearId

GO
/****** Object:  Table [dbo].[tblReferenceLead]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblReferenceLead](
	[ReferenceLeadId] [int] IDENTITY(1,1) NOT NULL,
	[ReferenceLeadName] [nvarchar](50) NOT NULL,
	[ReferenceLeadAddress] [nvarchar](100) NULL,
	[ReferenceLeadPhone1] [nvarchar](13) NULL,
	[ReferenceLeadPhone2] [nvarchar](13) NULL,
	[ReferenceLeadMobile1] [nvarchar](10) NULL,
	[ReferenceLeadMobile2] [nvarchar](10) NULL,
	[ReferenceLeadEmail1] [nvarchar](50) NULL,
	[ReferenceLeadEmail2] [nvarchar](50) NULL,
	[ReferenceLeadTypeId] [int] NULL,
	[ReferenceLeadVerticalId] [int] NULL,
	[TentitiveExpiryDate] [smalldatetime] NULL,
	[InsuranceCompanyId] [int] NULL,
	[AssignedTelecallerId] [int] NULL,
	[LeadQualityId] [int] NULL,
	[ReferenceSourceId] [int] NULL,
	[ReferencePersonName] [nvarchar](50) NULL,
	[ReferenceLeadRemark] [nvarchar](200) NULL,
	[AssignedFOS] [int] NULL,
	[ReferBy] [int] NULL,
	[TeleCallingFlag] [int] NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[BranchId] [smallint] NULL,
	[CustType] [int] NULL,
	[CustCode] [nvarchar](10) NULL,
	[RegistrationNo] [nvarchar](11) NULL,
	[ProductId] [int] NULL,
	[VehicleClassId] [smallint] NULL,
	[ManufacturerId] [smallint] NULL,
	[ModelId] [int] NULL,
	[MakeYearId] [smallint] NULL,
	[VariantId] [int] NULL,
	[FuelTypeId] [smallint] NULL,
	[GSTNo] [nvarchar](15) NULL,
	[PANNo] [nvarchar](10) NULL,
	[ContactPerson] [nvarchar](200) NULL,
	[NCBId] [smallint] NULL,
	[IDV] [int] NULL,
	[CC] [int] NULL,
	[GVW] [int] NULL,
	[Seating] [smallint] NULL,
	[AsseCNGIDV] [int] NULL,
	[AddOnPlan] [nvarchar](100) NULL,
 CONSTRAINT [PK_tblReferenceLead] PRIMARY KEY CLUSTERED 
(
	[ReferenceLeadId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewAllDatatypeInOne]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[ViewAllDatatypeInOne]
AS
SELECT        InvitedDataId, Policy.PolicyID ReferalId, Policy.NameInPolicy AS CustomerName, Invited.DataTypeId, Invited.VerticalSegmentId, PermanentOwner, AssignDate, TemporaryOwner, TemporaryFromdate, 
                         TemporaryToDatedate, CASE Policy.PolicyPackageTypeId WHEN 1 THEN Policy.PolicyEndDate ELSE Policy.PolicyEndDateOD END ExpiryDate, Invited.BranchId, Invited.Status, Invited.FollowupDate, 
                         CONVERT(nvarchar(10), Invited.ControlNo) ControlNo, CASE WHEN (Renewal.InvitedPremium IS NULL OR
                         Renewal.InvitedPremium = 0) THEN Policy.GrossPremium ELSE Renewal.InvitedPremium END AS Premium, Invited.Premiumoffered
FROM            tblMotorPolicyData Policy INNER JOIN
                         tblInvitedData Invited ON Invited.PolicyId = Policy.PolicyId INNER JOIN
                         tblRenewalData AS Renewal ON Policy.PolicyId = Renewal.PolicyId
WHERE        Invited.IsAllocated = 2 AND Policy.PolicyStatusId = 1
UNION
SELECT        InvitedDataId, Policy.PolicyID ReferalId, Policy.NameInPolicy AS CustomerName, Invited.DataTypeId, Invited.VerticalSegmentId, PermanentOwner, AssignDate, TemporaryOwner, TemporaryFromdate, 
                         TemporaryToDatedate, CASE Policy.PolicyPackageTypeId WHEN 1 THEN Policy.PolicyEndDate ELSE Policy.PolicyEndDateOD END ExpiryDate, Invited.BranchId, Invited.Status, Invited.FollowupDate, 
                         CONVERT(nvarchar(10), Invited.ControlNo) ControlNo, Policy.GrossPremium AS Premium, Invited.Premiumoffered
FROM            tblMotorPolicyData Policy INNER JOIN
                         tblInvitedData Invited ON Invited.PolicyId = Policy.PolicyId INNER JOIN
                         tblRenewalData AS LostData ON Policy.PolicyId = LostData.PolicyId
WHERE        Invited.IsAllocated = 2 AND Policy.PolicyStatusId = 1
UNION
SELECT        InvitedDataId, Policy.MarketDataId ReferalId, Policy.CustomerName AS CustomerName, Invited.DataTypeId, Invited.VerticalSegmentId, PermanentOwner, AssignDate, TemporaryOwner, TemporaryFromdate, 
                         TemporaryToDatedate, Policy.TentativeExpirydate ExpiryDate, Invited.BranchId, Invited.Status, Invited.FollowupDate, CONVERT(nvarchar(10), Invited.TempControlNo) ControlNo, Policy.Premium AS Premium, 
                         Invited.Premiumoffered
FROM            tblMarketData Policy INNER JOIN
                         tblInvitedData Invited ON Invited.MarketDataId = Policy.MarketDataId
WHERE        Invited.IsAllocated = 2 AND Policy.IsActive=1
UNION
SELECT        InvitedDataId, Policy.ReferenceLeadId ReferalId, Policy.ReferenceLeadName AS CustomerName, Invited.DataTypeId, Invited.VerticalSegmentId, PermanentOwner, AssignDate, TemporaryOwner, 
                         TemporaryFromdate, TemporaryToDatedate, Policy.TentitiveExpiryDate ExpiryDate, Invited.BranchId, Invited.Status, Invited.FollowupDate, CONVERT(nvarchar(10), Invited.TempControlNo) ControlNo, 
                         0 AS Premium, Invited.Premiumoffered
FROM            tblReferenceLead Policy INNER JOIN
                         tblInvitedData Invited ON Invited.ReferenceLeadId = Policy.ReferenceLeadId
WHERE        Invited.IsAllocated = 2 AND Policy.IsActive = 1


GO
/****** Object:  Table [dbo].[tblMonthCycle]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblMonthCycle](
	[MonthCycleId] [int] IDENTITY(1,1) NOT NULL,
	[MonthCycle] [nvarchar](30) NOT NULL,
	[CycleStartDate] [date] NOT NULL,
	[CycleEndDate] [date] NOT NULL,
	[CommissionFreeze] [int] NULL,
	[CommissionFreezeNonMotor] [int] NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblMonthCycle] PRIMARY KEY CLUSTERED 
(
	[MonthCycleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCluster]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCluster](
	[ClusterId] [int] IDENTITY(1,1) NOT NULL,
	[ClusterCode] [nvarchar](50) NULL,
	[ClusterName] [nvarchar](50) NOT NULL,
	[ClusterContactTitleId] [tinyint] NULL,
	[ClusterContact] [nvarchar](50) NULL,
	[ClusterAddress1] [nvarchar](100) NULL,
	[ClusterCityId1] [smallint] NULL,
	[ClusterPinCode1] [nvarchar](6) NULL,
	[ClusterAddress2] [nvarchar](100) NULL,
	[ClusterCityId2] [smallint] NULL,
	[ClusterPinCode2] [nvarchar](6) NULL,
	[ClusterPhone1] [nvarchar](13) NULL,
	[ClusterPhone2] [nvarchar](13) NULL,
	[ClusterMobile1] [nvarchar](10) NULL,
	[ClusterMobile2] [nvarchar](10) NULL,
	[ClusterEmail1] [nvarchar](50) NULL,
	[ClusterEmail2] [nvarchar](50) NULL,
	[ClusterProfile] [nvarchar](200) NULL,
	[IsActive] [bit] NOT NULL,
	[BranchId] [smallint] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblCustomerCluster] PRIMARY KEY CLUSTERED 
(
	[ClusterId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[PolicyDataView]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[PolicyDataView] AS 
SELECT
dbo.tblMotorPolicyData.PolicyId,
dbo.tblMotorPolicyData.ControlNo,
dbo.tblMotorPolicyData.PolicyTypeId,
dbo.tblMotorPolicyData.CustomerId,
dbo.tblMotorPolicyData.CustomerType,
dbo.tblCustomer.CustomerCode,
dbo.tblCustomer.CustomerName,
dbo.tblMotorPolicyData.NameInPolicy,
dbo.tblMotorPolicyData.AddressInPolicy,
dbo.tblMotorPolicyData.InsureCompanyId,
dbo.tblCluster.ClusterCode,
dbo.tblCluster.ClusterName,
dbo.tblMotorPolicyData.CoverNoteIssueType,
dbo.tblMotorPolicyData.CoverNotePrefix,
dbo.tblMotorPolicyData.CoverNoteNo,
dbo.tblMotorPolicyData.PolicyNo,
dbo.tblMotorPolicyData.IssueDate,
dbo.tblMotorPolicyData.IssueTime,
dbo.tblMotorPolicyData.PolicyStartDate,
dbo.tblMotorPolicyData.PolicyEndDate,
dbo.tblMotorPolicyData.FinancerId,
dbo.tblMotorPolicyData.PreviousInsureCompanyId,
dbo.tblMotorPolicyData.PreviousPolicyNo,
dbo.tblMotorPolicyData.PreviousExpiryDate,
dbo.tblMotorPolicyData.InspectionNo,
dbo.tblMotorPolicyData.InspectionCompanyId,
dbo.tblMotorPolicyData.InspectionDate,
dbo.tblMotorPolicyData.InspectionTime,
dbo.tblMotorPolicyData.NomineeName,
dbo.tblMotorPolicyData.NomineeRelationShipId,
dbo.tblMotorPolicyData.NomineeAge,
dbo.tblMotorPolicyData.NomineeGender,
dbo.tblMotorPolicyData.EndorseGrossPremium,
dbo.tblMotorPolicyData.TotalGrossPremium,
dbo.tblMotorPolicyData.NoofYearId,
dbo.tblMotorPolicyData.ManufacturerId,
dbo.tblMotorPolicyData.ModelId,
dbo.tblMotorPolicyData.VariantId,
dbo.tblMotorPolicyData.FuelType,
dbo.tblMotorPolicyData.SeatingCapacity,
dbo.tblMotorPolicyData.CubicCapacity,
dbo.tblMotorPolicyData.RegistrationDate,
dbo.tblMotorPolicyData.GVW,
dbo.tblMotorPolicyData.Exshowroom,
dbo.tblMotorPolicyData.MakeYearId,
dbo.tblMotorPolicyData.RegistrationNo,
dbo.tblMotorPolicyData.EngineNo,
dbo.tblMotorPolicyData.ChassisNo,
dbo.tblMotorPolicyData.RTOZoneId,
dbo.tblMotorPolicyData.VehicleClassId,
dbo.tblMotorPolicyData.GrossPremium,
dbo.tblMotorPolicyData.VehicleIDV,
dbo.tblMotorPolicyData.CNGIDV,
dbo.tblMotorPolicyData.AssessoriesIDV,
dbo.tblMotorPolicyData.TotalIDV,
dbo.tblMotorPolicyData.OD,
dbo.tblMotorPolicyData.EndorseOD,
dbo.tblMotorPolicyData.TotalOD,
dbo.tblMotorPolicyData.NCBId,
dbo.tblMotorPolicyData.SpecialDiscount,
dbo.tblMotorPolicyData.FVoucherNo,
dbo.tblMotorPolicyData.SVoucherNo,
dbo.tblMotorPolicyData.TVoucherNo,
dbo.tblMotorPolicyData.ShortAmt1,
dbo.tblMotorPolicyData.ShortAmt2,
dbo.tblMotorPolicyData.ShortAmt3,
dbo.tblMotorPolicyData.ShortFallTotal,
dbo.tblMotorPolicyData.CDVoucherNo,
dbo.tblMotorPolicyData.CashDiscountAmt,
dbo.tblMotorPolicyData.Loading,
dbo.tblMotorPolicyData.AddonRiderId,
dbo.tblMotorPolicyData.AddonPlanDetail,
dbo.tblMotorPolicyData.TeleCallerId,
dbo.tblMotorPolicyData.ReferenceId,
dbo.tblMotorPolicyData.BusinessDoneBy,
dbo.tblMotorPolicyData.FOSId,
dbo.tblMotorPolicyData.DSAId,
dbo.tblMotorPolicyData.PolicyRemarks,
dbo.tblMotorPolicyData.IsActive,
dbo.tblMotorPolicyData.Flag1,
dbo.tblMotorPolicyData.Flag2,
dbo.tblMotorPolicyData.IsVerified,
dbo.tblMotorPolicyData.PolicyCancelReasonId,
dbo.tblMotorPolicyData.IRDACommissionReceived,
dbo.tblMonthCycle.MonthCycle,
dbo.tblMotorPolicyData.DSACommissionReceived,
CommMonthCycle.MonthCycle AS commMonth,
dbo.tblMotorPolicyData.IsConverted,
dbo.tblMotorPolicyData.BranchId,
dbo.tblMotorPolicyData.CreatedBy,
dbo.tblMotorPolicyData.CreatedTime,
dbo.tblMotorPolicyData.VerifiedBy,
dbo.tblMotorPolicyData.VerifiedTime,
dbo.tblMotorPolicyData.ModifiedBy,
dbo.tblMotorPolicyData.ModifiedTime,
dbo.tblMotorPolicyData.PolicyStatusId,
dbo.tblMotorPolicyData.PolicyCancelDate,
dbo.tblMotorPolicyData.ReceivedStatusId,
dbo.tblMotorPolicyData.ServiceTax,
dbo.tblCustomer.CustomerEmail1,
dbo.tblMotorPolicyData.AddonOD,
dbo.tblMotorPolicyData.LoyaltyCounter,
dbo.tblMotorPolicyData.RenewalDone,
dbo.tblMotorPolicyData.RenewControlNo,
dbo.tblMotorPolicyData.PreviousPolicyId,
dbo.tblMotorPolicyData.PreviousControlNo,
dbo.tblCustomer.CustomerPAN,
dbo.tblCustomer.GSTIN,
dbo.tblMotorPolicyData.TPPremium,
dbo.tblCustomer.AadhaarNo,
dbo.tblMotorPolicyData.DSAManageBy,
dbo.tblMotorPolicyData.ChequeBouncePolicyId,
dbo.tblMotorPolicyData.ReinstateAllow,
dbo.tblCustomer.CustomerDOB,
dbo.tblCustomer.CustomerMobile1,
dbo.tblCustomer.CustomerPhone1,
dbo.tblMotorPolicyData.PolicyStartDateOD,
dbo.tblMotorPolicyData.PolicyEndDateOD,
dbo.tblMotorPolicyData.PolicyTermId,
dbo.tblMotorPolicyData.NoofYearODId,
dbo.tblCustomer.CustomerContact,
dbo.tblMotorPolicyData.AkgSlipNo,
dbo.tblMotorPolicyData.AkgSlipIssueDate,
dbo.tblMotorPolicyData.PolicyNoOD,
dbo.tblMotorPolicyData.InsureCompanyODId,
dbo.tblMotorPolicyData.TPnotwithUs,
dbo.tblMotorPolicyData.VehicleUsageId,
dbo.tblMotorPolicyData.CommissionPayTypeId,
dbo.tblMotorPolicyData.CommissionablePremium,
dbo.tblMotorPolicyData.DiffPrevODData,
dbo.tblMotorPolicyData.PolicyPackageType,
dbo.tblMotorPolicyData.PolicyPackageTypeId

FROM
dbo.tblMotorPolicyData
LEFT OUTER JOIN dbo.tblCustomer ON dbo.tblMotorPolicyData.CustomerId = dbo.tblCustomer.CustomerId
LEFT OUTER JOIN dbo.tblCluster ON dbo.tblCustomer.ClusterId = dbo.tblCluster.ClusterId
LEFT OUTER JOIN dbo.tblMonthCycle ON dbo.tblMotorPolicyData.IRDACommMonthCycleId = dbo.tblMonthCycle.MonthCycleId
LEFT OUTER JOIN dbo.tblMonthCycle AS CommMonthCycle ON dbo.tblMotorPolicyData.DSACommMonthCycleId = CommMonthCycle.MonthCycleId
GO
/****** Object:  View [dbo].[viewRenewPerformance]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewRenewPerformance]
AS
SELECT     dbo.tblMotorPolicyData.ControlNo, dbo.tblMotorPolicyData.FOSId, dbo.tblMotorPolicyData.TeleCallerId, dbo.tblMotorPolicyData.OD, 
                      dbo.tblMotorPolicyData.InsureCompanyId AS PrevInsCompanyTPId, dbo.tblMotorPolicyData.DSAId, dbo.tblMotorPolicyData.VerticleId, dbo.tblMotorPolicyData.BranchId, 
                      dbo.tblMotorPolicyData.PolicyStartDateOD AS PrevStartDateOD, dbo.tblMotorPolicyData.PolicyEndDateOD AS PrevEndDateOD, 
                      dbo.tblInsuranceCompany.CompanyName AS PrevInsCompanyNameTP, dbo.tblMotorPolicyData.NameInPolicy, dbo.tblMotorPolicyData.EngineNo, dbo.tblMotorPolicyData.ChassisNo, 
                      dbo.tblModel.ModelName, dbo.tblMotorPolicyData.RegistrationNo, dbo.tblMakeYear.MakeYear, dbo.tblManufacturer.ManufacturerName, dbo.tblMotorPolicyData.PolicyNo AS PrevPolicyNoTP, 
                      dbo.tblDSA.DSAName, dbo.tblMotorPolicyData.RenewControlNo, RenewInsCompanyTP.CompanyName AS RenewInsCompanyNameTP, dbo.tblEmployee.EmployeeName AS Telecaller, 
                      EmployeeFOS.EmployeeName AS FOS, RenewTable.OD AS RenewOD, dbo.tblPolicyType.PolicyType AS RenewalStatus, RenewTable.BusinessDoneBy, dbo.tblMotorPolicyData.CustomerId, 
                      dbo.tblMotorPolicyData.AddressInPolicy, RenewTable.PolicyEndDateOD AS RenewEndDateOD, RenewTable.PolicyStartDateOD AS RenewStartDateOD, 
                      RenewTable.InsureCompanyODId AS RenewInsCompanyODID, RenewTable.PolicyNoOD AS RenewPolicyNoOD, RenewTable.PolicyStartDate AS RenewStartDateTP, 
                      RenewTable.ShortFallTotal As ShortFallTotalFull, RenewTable.PolicyEndDate AS RenewEndDateTP, RenewTable.PolicyNo AS RenewPolicyNoTP, RenewTable.InsureCompanyId AS RenewInsCompanyTPID, 
                      dbo.tblPolicyTerm.PolicyPackageType AS RenewPackageType, dbo.tblPolicyTerm.PolicyTermName AS RenewPolicyTerm, PrevPolicyTerm.PolicyPackageType AS PrevPackageType, 
                      PrevPolicyTerm.PolicyTermName AS PrevPolicyTerm, dbo.tblMotorPolicyData.PolicyStartDate AS PrevStartDateTP, dbo.tblMotorPolicyData.PolicyEndDate AS PrevEndDateTP, 
                      dbo.tblMotorPolicyData.PolicyNoOD AS PrevPolicyNoOD, RenewInsCompanyOD.CompanyName AS RenewInsCompanyNameOD, PrevInsCompanyOD.CompanyName AS PrevInsCompanyNameOD, 
                      dbo.tblMotorPolicyData.InsureCompanyODId AS PrevInsCompanyODId
FROM         dbo.tblMotorPolicyData INNER JOIN
                      dbo.tblInsuranceCompany ON dbo.tblMotorPolicyData.InsureCompanyId = tblInsuranceCompany.InsureCompanyId LEFT OUTER JOIN
                      dbo.tblInsuranceCompany AS PrevInsCompanyOD ON dbo.tblMotorPolicyData.InsureCompanyODId = PrevInsCompanyOD.InsureCompanyId LEFT OUTER JOIN
                      dbo.tblDSA ON dbo.tblMotorPolicyData.DSAId = dbo.tblDSA.DSAId LEFT OUTER JOIN
                      dbo.tblManufacturer ON dbo.tblMotorPolicyData.ManufacturerId = dbo.tblManufacturer.ManufacturerId LEFT OUTER JOIN
                      dbo.tblModel ON dbo.tblMotorPolicyData.ModelId = dbo.tblModel.ModelId LEFT OUTER JOIN
                      dbo.tblMakeYear ON dbo.tblMotorPolicyData.MakeYearId = dbo.tblMakeYear.MakeYearId LEFT OUTER JOIN
                      dbo.tblMotorPolicyData AS RenewTable ON RenewTable.PreviousControlNo = dbo.tblMotorPolicyData.ControlNo LEFT OUTER JOIN
                      dbo.tblInsuranceCompany AS RenewInsCompanyTP ON RenewTable.InsureCompanyId = RenewInsCompanyTP.InsureCompanyId LEFT OUTER JOIN
                      dbo.tblPolicyStatus ON RenewTable.PolicyStatusId = dbo.tblPolicyStatus.PolicyStatusId INNER JOIN
                      dbo.tblPolicyType ON RenewTable.PolicyTypeId = dbo.tblPolicyType.PolicyTypeId LEFT OUTER JOIN
                      dbo.tblEmployee ON RenewTable.TeleCallerId = dbo.tblEmployee.EmployeeId LEFT OUTER JOIN
                      dbo.tblEmployee AS EmployeeFOS ON RenewTable.FOSId = EmployeeFOS.EmployeeId LEFT OUTER JOIN
                      dbo.tblPolicyTerm ON RenewTable.PolicyTermId = dbo.tblPolicyTerm.PolicyTermId LEFT OUTER JOIN
                      dbo.tblInsuranceCompany AS RenewInsCompanyOD ON RenewTable.InsureCompanyODId = RenewInsCompanyOD.InsureCompanyId LEFT OUTER JOIN
                      dbo.tblPolicyTerm AS PrevPolicyTerm ON tblMotorPolicyData.PolicyTermId = PrevPolicyTerm.PolicyTermId
WHERE     dbo.tblMotorPolicyData.PolicyStatusId <> 2 AND RenewTable.PolicyStatusId <> 2
UNION
SELECT     tblMotorPolicyData.ControlNo, lostData.FOSId, lostData.TelecallerId, tblMotorPolicyData.OD, tblMotorPolicyData.InsureCompanyId AS PrevInsCompanyTPId, tblMotorPolicyData.DSAId, 
                      tblMotorPolicyData.VerticleId, tblMotorPolicyData.BranchId, tblMotorPolicyData.PolicyStartDateOD AS PrevStartDateOD, tblMotorPolicyData.PolicyEndDateOD AS PrevEndDateOD, 
                      tblInsuranceCompany.CompanyName AS PrevInsCompanyNameTP, tblMotorPolicyData.NameInPolicy, tblMotorPolicyData.EngineNo, tblMotorPolicyData.ChassisNo, tblModel.ModelName, 
                      tblMotorPolicyData.RegistrationNo, tblMakeYear.MakeYear, tblManufacturer.ManufacturerName, tblMotorPolicyData.PolicyNo AS PrevPolicyNoTP, tblDSA.DSAName, 
                      lostData.ControlNo AS RenewControlNo, lostInsCompanyTP.CompanyName AS RenewInsCompanyNameTP, tblEmployee.EmployeeName AS Telecaller, EmployeeFOS.EmployeeName AS FOS, 
                      lostdata.OD AS RenewOD, CASE WHEN tblMotorPolicyData.ChequeBouncePolicyId > 0 THEN 'Not Renew due to Cheque Bounce' ELSE 'Lost Case' END AS RenewalStatus, 
                      tblMotorPolicyData.businessdoneby, tblMotorPolicyData.CustomerId, tblMotorPolicyData.AddressInPolicy, '  ' AS RenewEndDateOD, '  ' AS RenewStartDateOD, 
                      lostData.InsureCompanyODId AS RenewInsCompanyODID, lostData.PolicyNoOD AS RenewPolicyNoOD, '  ' AS RenewStartDateTP, '  ' As ShortFallTotalFull, '  ' AS RenewEndDateTP, lostData.PolicyNo AS RenewPolicyNoTP, 
                      lostData.InsureCompanyId AS RenewInsCompanyID, dbo.tblPolicyTerm.PolicyPackageType AS RenewPackageType, dbo.tblPolicyTerm.PolicyTermName AS RenewPolicyTerm, 
                      PrevPolicyTerm.PolicyPackageType AS PrevPackageType, PrevPolicyTerm.PolicyTermName AS PrevPolicyTerm, dbo.tblMotorPolicyData.PolicyStartDate AS PrevStartDateTP, 
                      dbo.tblMotorPolicyData.PolicyEndDate AS PrevEndDateTP, dbo.tblMotorPolicyData.PolicyNoOD AS PrevPolicyNoOD, LostInsCompanyOD.CompanyName AS RenewInsCompanyNameOD, 
                      PrevInsCompanyOD.CompanyName AS PrevInsCompanyNameOD, dbo.tblMotorPolicyData.InsureCompanyODId AS PrevInsCompanyODId
FROM         tblMotorPolicyData INNER JOIN
                      tblInsuranceCompany ON tblMotorPolicyData.InsureCompanyId = tblInsuranceCompany.InsureCompanyId LEFT OUTER JOIN
                      dbo.tblInsuranceCompany AS PrevInsCompanyOD ON dbo.tblMotorPolicyData.InsureCompanyODId = PrevInsCompanyOD.InsureCompanyId LEFT OUTER JOIN
                      tblDSA ON tblMotorPolicyData.DSAId = tblDSA.DSAId LEFT OUTER JOIN
                      tblManufacturer ON tblMotorPolicyData.ManufacturerId = tblManufacturer.ManufacturerId LEFT OUTER JOIN
                      tblModel ON tblMotorPolicyData.ModelId = tblModel.ModelId LEFT OUTER JOIN
                      tblMakeYear ON tblMotorPolicyData.MakeYearId = tblMakeYear.MakeYearId LEFT OUTER JOIN
                      tblMotorPolicyData AS lostData ON tblMotorPolicyData.ChequeBouncePolicyId = lostdata.PolicyId LEFT OUTER JOIN
                      tblInsuranceCompany AS lostInsCompanyTP ON lostData.InsureCompanyId = lostInsCompanyTP.InsureCompanyId LEFT OUTER JOIN
                      tblEmployee ON Lostdata.TeleCallerId = tblEmployee.EmployeeId LEFT OUTER JOIN
                      tblEmployee AS EmployeeFOS ON Lostdata.FOSId = EmployeeFOS.EmployeeId LEFT OUTER JOIN
                      dbo.tblPolicyTerm ON lostData.PolicyTermId = dbo.tblPolicyTerm.PolicyTermId LEFT OUTER JOIN
                      dbo.tblInsuranceCompany AS lostInsCompanyOD ON LostData.InsureCompanyODId = lostInsCompanyOD.InsureCompanyId LEFT OUTER JOIN
                      dbo.tblPolicyTerm AS PrevPolicyTerm ON tblMotorPolicyData.PolicyTermId = PrevPolicyTerm.PolicyTermId
WHERE     tblMotorPolicyData.PolicyStatusId <> 2 AND tblMotorPolicyData.RenewalDone = 0
GO
/****** Object:  Table [dbo].[tblSession]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblSession](
	[SessionId] [int] IDENTITY(1,1) NOT NULL,
	[TempSessionId] [int] NULL,
	[BranchId] [smallint] NULL,
	[UserId] [int] NOT NULL,
	[LoginTime] [smalldatetime] NULL,
	[LogoutTime] [smalldatetime] NULL,
	[LoginComputer] [nvarchar](50) NULL,
 CONSTRAINT [PK_Session] PRIMARY KEY CLUSTERED 
(
	[SessionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[qryCustomerCarePerformance]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[qryCustomerCarePerformance] AS 
SELECT
dbo.tblCallDurationType.CallDurationTypeName,
dbo.tblCallType.CallTypeName,
dbo.tblUser.UserName,
dbo.tblCustomerCareData.ControlNo,
dbo.tblCustomerCareData.NameInPolicy,
dbo.tblCustomerCareData.PolicyStartDate,
dbo.tblCustomerCareData.RegistrationNo,
dbo.tblInsuranceCompany.CompanyName,
dbo.tblModel.ModelName,
dbo.tblMakeYear.MakeYear,
dbo.tblProduct.ProductName,
dbo.tblCustomerCareData.DSAId,
dbo.tblCustomerCareData.VerticalId,
dbo.tblCustomerCareData.InsureCompanyId,
dbo.tblCustomerCareData.CallDurationTypeId,
dbo.tblCustomerCareData.CallTypeId,
dbo.tblVertical.VerticalName,
dbo.tblCustomerCareData.LastCallDate,
dbo.tblEmployee.EmployeeId,
dbo.tblEmployee.EmployeeName

FROM
dbo.tblCustomerCareData
INNER JOIN dbo.tblSession ON dbo.tblCustomerCareData.LastCallBy = dbo.tblSession.SessionId
INNER JOIN dbo.tblUser ON dbo.tblSession.UserId = dbo.tblUser.UserId
INNER JOIN dbo.tblCallDurationType ON dbo.tblCustomerCareData.CallDurationTypeId = dbo.tblCallDurationType.CallDurationTypeId
INNER JOIN dbo.tblCallType ON dbo.tblCustomerCareData.CallTypeId = dbo.tblCallType.CallTypeId
INNER JOIN dbo.tblInsuranceCompany ON dbo.tblCustomerCareData.InsureCompanyId = dbo.tblInsuranceCompany.InsureCompanyId
LEFT OUTER JOIN dbo.tblModel ON dbo.tblCustomerCareData.ModelId = dbo.tblModel.ModelId
LEFT OUTER JOIN dbo.tblMakeYear ON dbo.tblCustomerCareData.MakeYearId = dbo.tblMakeYear.MakeYearId
LEFT OUTER JOIN dbo.tblProduct ON dbo.tblCustomerCareData.ProductId = dbo.tblProduct.ProductId
INNER JOIN dbo.tblVertical ON dbo.tblCustomerCareData.VerticalId = dbo.tblVertical.VerticalId
INNER JOIN dbo.tblEmployee ON dbo.tblUser.EmployeeId = dbo.tblEmployee.EmployeeId
GO
/****** Object:  Table [dbo].[tblInsuredPerson]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblInsuredPerson](
	[InsuredPersonId] [int] IDENTITY(1,1) NOT NULL,
	[PolicyId] [int] NOT NULL,
	[CustomerId] [int] NULL,
	[InsuredPersonName] [nvarchar](50) NULL,
	[InsuredGenderId] [smallint] NULL,
	[InsuredDOB] [smalldatetime] NULL,
	[InsuredAge] [int] NULL,
	[InsuredRelationId] [smallint] NULL,
	[SumInsuredIndividual] [int] NULL,
	[SumInsuredFloater] [int] NULL,
	[PassportNo] [nvarchar](20) NULL,
	[CummulativeBonus] [int] NULL,
	[Deductable] [int] NULL,
	[Loading] [decimal](10, 2) NULL,
	[LoadingReason] [nvarchar](50) NULL,
	[NomineeName] [nvarchar](50) NULL,
	[NomineeRelationId] [smallint] NULL,
	[PEDId] [smallint] NULL,
	[PEDExclusion] [nvarchar](100) NULL,
	[PPCId] [smallint] NULL,
	[AnnualIncome] [int] NULL,
	[OccupationId] [smallint] NULL,
	[RiskClassId] [smallint] NULL,
	[BranchId] [smallint] NOT NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblInsuredPerson] PRIMARY KEY CLUSTERED 
(
	[InsuredPersonId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewPersonDataBirthdayWish]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewPersonDataBirthdayWish]
AS
SELECT DISTINCT 
                         TOP (100) PERCENT dbo.tblInsuredPerson.InsuredPersonName, dbo.tblInsuredPerson.InsuredDOB, dbo.tblCustomer.CustomerMobile1, dbo.tblCustomer.CustomerEmail1, dbo.tblMotorPolicyData.BranchId
FROM            dbo.tblCustomer INNER JOIN
                         dbo.tblMotorPolicyData ON dbo.tblCustomer.CustomerId = dbo.tblMotorPolicyData.CustomerId INNER JOIN
                         dbo.tblInsuredPerson ON dbo.tblMotorPolicyData.PolicyId = dbo.tblInsuredPerson.PolicyId
ORDER BY dbo.tblInsuredPerson.InsuredPersonName, dbo.tblInsuredPerson.InsuredDOB
GO
/****** Object:  Table [dbo].[tblSubStatus]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblSubStatus](
	[SubStatusId] [int] IDENTITY(1,1) NOT NULL,
	[SubStatusName] [nvarchar](50) NOT NULL,
	[CallStatusId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblSubStatus] PRIMARY KEY CLUSTERED 
(
	[SubStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[viewCustomerCare_With CustomerAndPolicytable]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewCustomerCare_With CustomerAndPolicytable] AS 
SELECT        dbo.tblCustomerCareData.CustomerCallDataId, dbo.tblMotorPolicyData.ControlNo, dbo.tblMotorPolicyData.PolicyId, dbo.tblVertical.VerticalName, dbo.tblCustomer.CustomerId, dbo.tblCustomer.CustomerName, 
                         dbo.tblCustomer.CustomerContact, dbo.tblCustomer.CustomerSTD1, dbo.tblCustomer.CustomerPhone1, dbo.tblCustomer.CustomerSTD2, dbo.tblCustomer.CustomerPhone2, dbo.tblCustomer.CustomerSTD3, 
                         dbo.tblCustomer.CustomerPhone3, dbo.tblCustomer.CustomerMobile1, dbo.tblCustomer.InactiveMobile1, dbo.tblCustomer.CustomerMobile2, dbo.tblCustomer.InactiveMobile2, dbo.tblCustomer.CustomerMobile3, 
                         dbo.tblCustomer.InactiveMobile3, dbo.tblCustomer.CustomerMobile4, dbo.tblCustomer.InactiveMobile4, dbo.tblCustomer.CustomerEmail1, dbo.tblCustomer.CustomerEmail2, 
                         dbo.tblInsuranceCompany.CompanyName, dbo.tblMotorPolicyData.RegistrationNo, dbo.tblCallType.CallTypeName, dbo.tblMotorPolicyData.PolicyStartDate, dbo.tblModel.ModelName, dbo.tblMakeYear.MakeYear, 
                         dbo.tblProduct.ProductName, dbo.tblCustomerCareData.Q1Response, dbo.tblCustomerCareData.Q1Comment, dbo.tblCustomerCareData.Q2Response, dbo.tblCustomerCareData.Q2Comment, 
                         dbo.tblCustomerCareData.Q3Response, dbo.tblCustomerCareData.Q3Comment, dbo.tblCustomerCareData.Q5Comment, dbo.tblCustomerCareData.CallStatusId, dbo.tblCustomerCareData.SubStatusId, 
                         dbo.tblCustomerCareData.FollowupDate, dbo.tblCustomerCareData.FinalComment, dbo.tblMotorPolicyData.DSAId, dbo.tblSubStatus.SubStatusName, dbo.tblCustomerCareData.LastCallDate, 
                         dbo.tblCustomerCareData.CallTypeId, dbo.tblCustomerCareData.CallDurationTypeId, dbo.tblCustomerCareData.PolicyId AS Expr1, dbo.tblCustomerCareData.Q4Response, dbo.tblCustomerCareData.Q4Comment, 
                         dbo.tblCustomerCareData.Q5Response
FROM            dbo.tblCustomerCareData INNER JOIN
                         dbo.tblMotorPolicyData ON dbo.tblCustomerCareData.PolicyId = dbo.tblMotorPolicyData.PolicyId INNER JOIN
                         dbo.tblVertical ON dbo.tblMotorPolicyData.VerticleId = dbo.tblVertical.VerticalId INNER JOIN
                         dbo.tblCustomer ON dbo.tblMotorPolicyData.CustomerId = dbo.tblCustomer.CustomerId INNER JOIN
                         dbo.tblInsuranceCompany ON dbo.tblMotorPolicyData.InsureCompanyId = dbo.tblInsuranceCompany.InsureCompanyId FULL OUTER JOIN
                         dbo.tblSubStatus ON dbo.tblCustomerCareData.SubStatusId = dbo.tblSubStatus.SubStatusId FULL OUTER JOIN
                         dbo.tblCallType ON dbo.tblCustomerCareData.CallTypeId = dbo.tblCallType.CallTypeId FULL OUTER JOIN
                         dbo.tblModel ON dbo.tblMotorPolicyData.ModelId = dbo.tblModel.ModelId FULL OUTER JOIN
                         dbo.tblMakeYear ON dbo.tblMotorPolicyData.MakeYearId = dbo.tblMakeYear.MakeYearId FULL OUTER JOIN
                         dbo.tblProduct ON dbo.tblMotorPolicyData.ProductId = dbo.tblProduct.ProductId
GO
/****** Object:  View [dbo].[ViewCustomerEmailID]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[ViewCustomerEmailID]
AS
 select ISNULL(CAST((row_number() OVER (ORDER BY(Select 1))) AS int), 0) 
AS SRNo,EmailID,CustomerId from tblCustomer unpivot (
 EmailID
 for Value in (CustomerEmail1 ,CustomerEmail2 ) 
  
 )unpvt  where EmailID!=''


GO
/****** Object:  Table [dbo].[tblInspectionData]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblInspectionData](
	[InspectionId] [int] IDENTITY(1,1) NOT NULL,
	[InspectionEntryDate] [datetime] NULL,
	[PreviousControlNo] [nvarchar](20) NULL,
	[CustomerName] [nvarchar](30) NOT NULL,
	[ContactPerson] [nvarchar](100) NULL,
	[MobileNo] [nvarchar](10) NOT NULL,
	[EmailId] [nvarchar](50) NULL,
	[InspectionAddress] [nvarchar](200) NOT NULL,
	[RegistrationNo] [nvarchar](20) NOT NULL,
	[ManufacturerId] [int] NULL,
	[ModelId] [int] NULL,
	[MakeYearId] [int] NULL,
	[ReqInsuranceCompanyId] [int] NULL,
	[EngineNo] [nvarchar](20) NULL,
	[ChassisNo] [nvarchar](20) NULL,
	[InspectionDate] [datetime] NOT NULL,
	[InspectionReasonId] [int] NOT NULL,
	[SourcofRequestId] [int] NULL,
	[POSId] [int] NULL,
	[TeamMemberId] [int] NULL,
	[InspectionReferNo] [nvarchar](20) NULL,
	[InspectionCompanyId] [int] NULL,
	[SurvyorName] [nvarchar](20) NULL,
	[SurveyorMobile] [nvarchar](22) NULL,
	[SurveyorEmail] [nvarchar](30) NULL,
	[InspectionStatusId] [int] NULL,
	[InspectionSubStatusId] [int] NULL,
	[InspectionRemark] [nvarchar](200) NULL,
	[BranchId] [int] NULL,
	[CreatedBy] [int] NULL,
	[CreatedDatetime] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedDatetime] [datetime] NULL,
 CONSTRAINT [PK_tblInspectionData] PRIMARY KEY CLUSTERED 
(
	[InspectionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblInspectionReason]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblInspectionReason](
	[InspectionReasonId] [int] IDENTITY(1,1) NOT NULL,
	[InspectionReason] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [datetime] NULL,
 CONSTRAINT [PK_tblInspectionReason] PRIMARY KEY CLUSTERED 
(
	[InspectionReasonId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblInspectionStatus]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblInspectionStatus](
	[InspectionStatusId] [int] IDENTITY(1,1) NOT NULL,
	[InspectionStatus] [nvarchar](30) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblInspectionStatus] PRIMARY KEY CLUSTERED 
(
	[InspectionStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblInspectionSubStatus]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblInspectionSubStatus](
	[InspectionSubStatusId] [int] IDENTITY(1,1) NOT NULL,
	[InspectionStatusId] [int] NOT NULL,
	[InspectionSubStatus] [nvarchar](30) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblInspectionSubStatus] PRIMARY KEY CLUSTERED 
(
	[InspectionSubStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[SearchInspection]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create view [dbo].[SearchInspection]
as
select
	inspectionData.InspectionId,
	inspectionData.BranchId,
	inspectionData.CustomerName,
	inspectionData.InspectionDate,
	inspectionData.RegistrationNo as RegistrationNumber,
	inspectionData.MobileNo as MobileNumber,
	inspectionData.InspectionReferNo as InspectionReferNumber,
	inspectionData.InspectionEntryDate,
	inspectionData.POSId as PosId,
	insuranceCompany.InsuranceCompanyId,
	insuranceCompany.InsuranceCompanyName,
	manufacturer.ManufacturerId,
	manufacturer.ManufacturerName,
	model.ModelId,
	model.ModelName,
	reason.InspectionReasonId,
	reason.InspectionReason,
	[status].InspectionStatus,
	subStatus.InspectionSubStatus
from [dbo].[tblInspectionData] inspectionData
inner join [dbo].[tblInsuranceCompany] insuranceCompany on insuranceCompany.InsuranceCompanyId = inspectionData.ReqInsuranceCompanyId
inner join [dbo].[tblInspectionReason] reason on reason.InspectionReasonId = inspectionData.InspectionReasonId
left join [dbo].[tblManufacturer] manufacturer on manufacturer.ManufacturerId = inspectionData.ManufacturerId
left join [dbo].[tblModel] model on model.ModelId = inspectionData.ModelId
left join [dbo].[tblInspectionStatus] [status] on [status].InspectionStatusId = inspectionData.InspectionStatusId
left join [dbo].[tblInspectionSubStatus] subStatus on subStatus.InspectionSubStatusId = inspectionData.InspectionSubStatusId

--select * from SearchInspection
GO
/****** Object:  View [dbo].[View_SearchForm_Policies]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO










CREATE VIEW [dbo].[View_SearchForm_Policies]
AS
	SELECT        
		dbo.tblMotorPolicyData.PolicyId,
		dbo.tblMotorPolicyData.ControlNo,
		dbo.tblMotorPolicyData.VerticalId,  
		cast(Right(dbo.tblMotorPolicyData.ControlNo, 6 )as int) as ControlNumberDigit, 
		dbo.tblMotorPolicyData.NameInPolicy, 
		dbo.tblMotorPolicyData.RegistrationNo,
		dbo.tblMotorPolicyData.GrossPremium,
		dbo.tblMotorPolicyData.IsActive, --- need to check 
		dbo.tblMotorPolicyData.Flag1,
		dbo.tblMotorPolicyData.Flag2,
		dbo.tblMotorPolicyData.PolicyTypeId,
		CAST(ISNULL(dbo.tblMotorPolicyData.IsVerified,0) AS BIT) IsVerified, 
		dbo.tblMotorPolicyData.BranchId, 
		dbo.tblBranch.BranchCode,
		dbo.tblPolicyType.PolicyType,
		dbo.tblVertical.VerticalName,
		dbo.tblProduct.ProductName,
		dbo.tblManufacturer.ManufacturerName,
		dbo.tblModel.ModelName, 
		dbo.tblPOS.POSName,
		dbo.tblPolicyStatus.PolicyStatus,
		dbo.tblPolicyStatus.PolicyStatusId, -- need to check 
		CASE tblMotorPolicyData.PolicyPackageTypeId WHEN 1 THEN tblMotorPolicyData.PolicyEndDate ELSE tblMotorPolicyData.PolicyEndDateOD END AS ExpiryDate, 
		CASE tblMotorPolicyData.PolicyPackageTypeId WHEN 1 THEN tblMotorPolicyData.PolicyStartDate ELSE tblMotorPolicyData.PolicyStartDateOD END AS StartDate, 
		CASE tblMotorPolicyData.PolicyPackageTypeId WHEN 1 THEN tblMotorPolicyData.PolicyNo ELSE tblMotorPolicyData.PolicyNoOD END AS PolicyNumber, 
		CASE tblMotorPolicyData.PolicyPackageTypeId WHEN 1 THEN tblMotorPolicyData.InsuranceCompanyId ELSE tblMotorPolicyData.InsuranceCompanyODId END AS InsuranceCompanyIdNumber, 
		CASE tblMotorPolicyData.PolicyPackageTypeId WHEN 1 THEN tblInsuranceCompany.InsuranceCompanyName ELSE ODInsuranceCompany.InsuranceCompanyName END AS InsuranceCompany, 
		dbo.tblMotorPolicyData.PolicyRemarks,
		dbo.tblMotorPolicyData.CreatedBy, -- need to check
		CAST(ISNULL(dbo.tblMotorPolicyData.RenewalDone,0) AS BIT) RenewalDone, 
		dbo.tblMotorPolicyData.VerticalSegmentId, -- need to check
		[dbo].[tblMakeYear].MakeYear as MakeYear, -- need to check
		[dbo].[tblMakeYear].MakeYearId as MakeYearId -- need to check
	FROM dbo.tblMotorPolicyData 
	INNER JOIN dbo.tblVertical WITH(NOLOCK) ON dbo.tblMotorPolicyData.VerticalId = dbo.tblVertical.VerticalId 
	LEFT OUTER JOIN dbo.tblPOS WITH(NOLOCK) ON dbo.tblMotorPolicyData.POSId = dbo.tblPOS.POSId 
	INNER JOIN dbo.tblPolicyStatus WITH(NOLOCK) ON dbo.tblMotorPolicyData.PolicyStatusId = dbo.tblPolicyStatus.PolicyStatusId
	INNER JOIN dbo.tblPolicyType WITH(NOLOCK) ON dbo.tblMotorPolicyData.PolicyTypeId = dbo.tblPolicyType.PolicyTypeId
	LEFT OUTER JOIN dbo.tblManufacturer WITH(NOLOCK) ON dbo.tblMotorPolicyData.ManufacturerId = dbo.tblManufacturer.ManufacturerId
	LEFT OUTER JOIN dbo.tblInsuranceCompany WITH(NOLOCK) ON dbo.tblMotorPolicyData.InsuranceCompanyId = dbo.tblInsuranceCompany.InsuranceCompanyId 
	LEFT OUTER JOIN dbo.tblInsuranceCompany AS ODInsuranceCompany WITH(NOLOCK) ON dbo.tblMotorPolicyData.InsuranceCompanyODId = ODInsuranceCompany.InsuranceCompanyId
	LEFT OUTER JOIN dbo.tblModel WITH(NOLOCK) ON dbo.tblMotorPolicyData.ModelId = dbo.tblModel.ModelId
	LEFT OUTER JOIN dbo.tblProduct WITH(NOLOCK) ON dbo.tblMotorPolicyData.ProductId = dbo.tblProduct.ProductId
	LEFT OUTER JOIN [dbo].[tblMakeYear] WITH(NOLOCK) ON [dbo].[tblMakeYear].MakeYearId =  dbo.tblMotorPolicyData.MakeYearId -- need to check
	LEFT OUTER JOIN [dbo].[tblBranch] WITH(NOLOCK) ON [dbo].[tblBranch].BranchId =  dbo.tblMotorPolicyData.BranchId  

GO
/****** Object:  View [dbo].[ViewReferenceLeads]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewReferenceLeads]
AS
SELECT     tblCustomerCareData.CrossSellChkNewPost, tblVertical.VerticalName, tblInsuranceCompany.CompanyName, tblCustomerCareData.CrossSellExpiryDatePost AS CrossSellExpiryDate, 
                      emp1.EmployeeName AS assignee, tblCustomer.CustomerCode, tblCustomerCareData.ControlNo, tblCustomerCareData.NameInPolicy, tblCustomer.CustomerName, tblCustomer.CustomerMobile1, 
                      tblCustomer.CustomerMobile2, tblCustomer.CustomerMobile3, tblCustomer.CustomerMobile4, dbo.tblCustomerCareData.CustomerId, tblCustomer.CustomerContact, tblCustomer.CustomerAddress1, 
                      tblCallDurationType.CallDurationTypeName, tblCustomerCareData.Q5CommentPost as Q5Comment, tblCustomerCareData.LastCallDate, emp2.EmployeeName AS ReferenceProvider, 
                      tblCustomerCareData.CrossSellInsureCompanyIdPost, tblCustomerCareData.CrossSellVerticalIdPost, tblCustomerCareData.CrossSellTelecallerIdPost, emp1.EmployeeId AS AssigneeId, 
                      emp2.EmployeeId AS ReferenceProviderId, tblCustomerCareData.CallDurationTypeId
FROM         tblCustomerCareData LEFT OUTER JOIN
                      tblInsuranceCompany ON tblCustomerCareData.CrossSellInsureCompanyIdPost = tblInsuranceCompany.InsureCompanyId LEFT OUTER JOIN
                      tblVertical ON tblCustomerCareData.CrossSellVerticalIdPost = tblVertical.VerticalId LEFT OUTER JOIN
                      tblEmployee AS emp1 ON tblCustomerCareData.CrossSellTelecallerIdPost = emp1.EmployeeId LEFT OUTER JOIN
                      tblCustomer ON tblCustomerCareData.CustomerId = tblCustomer.CustomerId LEFT OUTER JOIN
                      tblCallDurationType ON tblCustomerCareData.CallDurationTypeId = tblCallDurationType.CallDurationTypeId LEFT OUTER JOIN
                      tblSession ON tblCustomerCareData.LastCallBy = tblSession.SessionId LEFT OUTER JOIN
                      tblUser ON tblSession.UserId = tblUser.UserId LEFT OUTER JOIN
                      tblEmployee AS emp2 ON tblUser.EmployeeId = emp2.EmployeeId
WHERE     tblCustomerCareData.CrossSellVerticalIdPost > 0
UNION
SELECT     tblCustomerCareData.CrossSellChkNew1Post, tblVertical.VerticalName, tblInsuranceCompany.CompanyName, tblCustomerCareData.CrossSellExpiryDate1Post AS CrossSellExpiryDate, 
                      emp1.EmployeeName AS assignee, tblCustomer.CustomerCode, tblCustomerCareData.ControlNo, tblCustomerCareData.NameInPolicy, tblCustomer.CustomerName, tblCustomer.CustomerMobile1, 
                      tblCustomer.CustomerMobile2, tblCustomer.CustomerMobile3, tblCustomer.CustomerMobile4, dbo.tblCustomerCareData.CustomerId, tblCustomer.CustomerContact, tblCustomer.CustomerAddress1, 
                      tblCallDurationType.CallDurationTypeName, tblCustomerCareData.Q5CommentPost as Q5Comment, tblCustomerCareData.LastCallDate, emp2.EmployeeName AS ReferenceProvider, 
                      tblCustomerCareData.CrossSellInsureCompanyId1Post, tblCustomerCareData.CrossSellVerticalId1Post, tblCustomerCareData.CrossSellTelecallerId1Post, emp1.EmployeeId AS AssigneeId, 
                      emp2.EmployeeId AS ReferenceProviderId, tblCustomerCareData.CallDurationTypeId
FROM         tblCustomerCareData LEFT OUTER JOIN
                      tblInsuranceCompany ON tblCustomerCareData.CrossSellInsureCompanyId1Post = tblInsuranceCompany.InsureCompanyId LEFT OUTER JOIN
                      tblVertical ON tblCustomerCareData.CrossSellVerticalId1Post = tblVertical.VerticalId LEFT OUTER JOIN
                      tblEmployee AS emp1 ON tblCustomerCareData.CrossSellTelecallerId1Post = emp1.EmployeeId LEFT OUTER JOIN
                      tblCustomer ON tblCustomerCareData.CustomerId = tblCustomer.CustomerId LEFT OUTER JOIN
                      tblCallDurationType ON tblCustomerCareData.CallDurationTypeId = tblCallDurationType.CallDurationTypeId LEFT OUTER JOIN
                      tblSession ON tblCustomerCareData.LastCallBy = tblSession.SessionId LEFT OUTER JOIN
                      tblUser ON tblSession.UserId = tblUser.UserId LEFT OUTER JOIN
                      tblEmployee AS emp2 ON tblUser.EmployeeId = emp2.EmployeeId
WHERE     tblCustomerCareData.CrossSellVerticalId1Post > 0
UNION
SELECT     tblCustomerCareData.CrossSellChkNewMid, tblVertical.VerticalName, tblInsuranceCompany.CompanyName, tblCustomerCareData.CrossSellExpiryDateMid AS CrossSellExpiryDate, 
                      emp1.EmployeeName AS assignee, tblCustomer.CustomerCode, tblCustomerCareData.ControlNo, tblCustomerCareData.NameInPolicy, tblCustomer.CustomerName, tblCustomer.CustomerMobile1, 
                      tblCustomer.CustomerMobile2, tblCustomer.CustomerMobile3, tblCustomer.CustomerMobile4, dbo.tblCustomerCareData.CustomerId, tblCustomer.CustomerContact, tblCustomer.CustomerAddress1, 
                      tblCallDurationType.CallDurationTypeName, tblCustomerCareData.Q5CommentMid as Q5Comment, tblCustomerCareData.LastCallDate, emp2.EmployeeName AS ReferenceProvider, 
                      tblCustomerCareData.CrossSellInsureCompanyIdMid, tblCustomerCareData.CrossSellVerticalIdMid, tblCustomerCareData.CrossSellTelecallerIdMid, emp1.EmployeeId AS AssigneeId, 
                      emp2.EmployeeId AS ReferenceProviderId, tblCustomerCareData.CallDurationTypeId
FROM         tblCustomerCareData LEFT OUTER JOIN
                      tblInsuranceCompany ON tblCustomerCareData.CrossSellInsureCompanyIdMid = tblInsuranceCompany.InsureCompanyId LEFT OUTER JOIN
                      tblVertical ON tblCustomerCareData.CrossSellVerticalIdMid = tblVertical.VerticalId LEFT OUTER JOIN
                      tblEmployee AS emp1 ON tblCustomerCareData.CrossSellTelecallerIdMid = emp1.EmployeeId LEFT OUTER JOIN
                      tblCustomer ON tblCustomerCareData.CustomerId = tblCustomer.CustomerId LEFT OUTER JOIN
                      tblCallDurationType ON tblCustomerCareData.CallDurationTypeId = tblCallDurationType.CallDurationTypeId LEFT OUTER JOIN
                      tblSession ON tblCustomerCareData.LastCallBy = tblSession.SessionId LEFT OUTER JOIN
                      tblUser ON tblSession.UserId = tblUser.UserId LEFT OUTER JOIN
                      tblEmployee AS emp2 ON tblUser.EmployeeId = emp2.EmployeeId
WHERE     tblCustomerCareData.CrossSellVerticalIdMid > 0
UNION
SELECT     tblCustomerCareData.CrossSellChkNew1Mid, tblVertical.VerticalName, tblInsuranceCompany.CompanyName, tblCustomerCareData.CrossSellExpiryDate1Mid AS CrossSellExpiryDate, 
                      emp1.EmployeeName AS assignee, tblCustomer.CustomerCode, tblCustomerCareData.ControlNo, tblCustomerCareData.NameInPolicy, tblCustomer.CustomerName, tblCustomer.CustomerMobile1, 
                      tblCustomer.CustomerMobile2, tblCustomer.CustomerMobile3, tblCustomer.CustomerMobile4, dbo.tblCustomerCareData.CustomerId, tblCustomer.CustomerContact, tblCustomer.CustomerAddress1, 
                      tblCallDurationType.CallDurationTypeName, tblCustomerCareData.Q5CommentMid as Q5Comment, tblCustomerCareData.LastCallDate, emp2.EmployeeName AS ReferenceProvider, 
                      tblCustomerCareData.CrossSellInsureCompanyId1Mid, tblCustomerCareData.CrossSellVerticalId1Mid, tblCustomerCareData.CrossSellTelecallerId1Mid, emp1.EmployeeId AS AssigneeId, 
                      emp2.EmployeeId AS ReferenceProviderId, tblCustomerCareData.CallDurationTypeId
FROM         tblCustomerCareData LEFT OUTER JOIN
                      tblInsuranceCompany ON tblCustomerCareData.CrossSellInsureCompanyId1Mid = tblInsuranceCompany.InsureCompanyId LEFT OUTER JOIN
                      tblVertical ON tblCustomerCareData.CrossSellVerticalId1Mid = tblVertical.VerticalId LEFT OUTER JOIN
                      tblEmployee AS emp1 ON tblCustomerCareData.CrossSellTelecallerId1Mid = emp1.EmployeeId LEFT OUTER JOIN
                      tblCustomer ON tblCustomerCareData.CustomerId = tblCustomer.CustomerId LEFT OUTER JOIN
                      tblCallDurationType ON tblCustomerCareData.CallDurationTypeId = tblCallDurationType.CallDurationTypeId LEFT OUTER JOIN
                      tblSession ON tblCustomerCareData.LastCallBy = tblSession.SessionId LEFT OUTER JOIN
                      tblUser ON tblSession.UserId = tblUser.UserId LEFT OUTER JOIN
                      tblEmployee AS emp2 ON tblUser.EmployeeId = emp2.EmployeeId
WHERE     tblCustomerCareData.CrossSellVerticalId1Mid > 0
UNION
SELECT     tblCustomerCareData.CrossSellChkNewPrerenew, tblVertical.VerticalName, tblInsuranceCompany.CompanyName, tblCustomerCareData.CrossSellExpiryDatePrerenew AS CrossSellExpiryDate, 
                      emp1.EmployeeName AS assignee, tblCustomer.CustomerCode, tblCustomerCareData.ControlNo, tblCustomerCareData.NameInPolicy, tblCustomer.CustomerName, tblCustomer.CustomerMobile1, 
                      tblCustomer.CustomerMobile2, tblCustomer.CustomerMobile3, tblCustomer.CustomerMobile4, dbo.tblCustomerCareData.CustomerId, tblCustomer.CustomerContact, tblCustomer.CustomerAddress1, 
                      tblCallDurationType.CallDurationTypeName, tblCustomerCareData.Q5CommentPrerenew as Q5Comment, tblCustomerCareData.LastCallDate, emp2.EmployeeName AS ReferenceProvider, 
                      tblCustomerCareData.CrossSellInsureCompanyIdPrerenew, tblCustomerCareData.CrossSellVerticalIdPrerenew, tblCustomerCareData.CrossSellTelecallerIdPrerenew, 
                      emp1.EmployeeId AS AssigneeId, emp2.EmployeeId AS ReferenceProviderId, tblCustomerCareData.CallDurationTypeId
FROM         tblCustomerCareData LEFT OUTER JOIN
                      tblInsuranceCompany ON tblCustomerCareData.CrossSellInsureCompanyIdPrerenew = tblInsuranceCompany.InsureCompanyId LEFT OUTER JOIN
                      tblVertical ON tblCustomerCareData.CrossSellVerticalIdPrerenew = tblVertical.VerticalId LEFT OUTER JOIN
                      tblEmployee AS emp1 ON tblCustomerCareData.CrossSellTelecallerIdPrerenew = emp1.EmployeeId LEFT OUTER JOIN
                      tblCustomer ON tblCustomerCareData.CustomerId = tblCustomer.CustomerId LEFT OUTER JOIN
                      tblCallDurationType ON tblCustomerCareData.CallDurationTypeId = tblCallDurationType.CallDurationTypeId LEFT OUTER JOIN
                      tblSession ON tblCustomerCareData.LastCallBy = tblSession.SessionId LEFT OUTER JOIN
                      tblUser ON tblSession.UserId = tblUser.UserId LEFT OUTER JOIN
                      tblEmployee AS emp2 ON tblUser.EmployeeId = emp2.EmployeeId
WHERE     tblCustomerCareData.CrossSellVerticalIdPrerenew > 0
UNION
SELECT     tblCustomerCareData.CrossSellChkNew1Prerenew, tblVertical.VerticalName, tblInsuranceCompany.CompanyName, tblCustomerCareData.CrossSellExpiryDate1Prerenew AS CrossSellExpiryDate, 
                      emp1.EmployeeName AS assignee, tblCustomer.CustomerCode, tblCustomerCareData.ControlNo, tblCustomerCareData.NameInPolicy, tblCustomer.CustomerName, tblCustomer.CustomerMobile1, 
                      tblCustomer.CustomerMobile2, tblCustomer.CustomerMobile3, tblCustomer.CustomerMobile4, dbo.tblCustomerCareData.CustomerId, tblCustomer.CustomerContact, tblCustomer.CustomerAddress1, 
                      tblCallDurationType.CallDurationTypeName, tblCustomerCareData.Q5CommentPrerenew as Q5Comment, tblCustomerCareData.LastCallDate, emp2.EmployeeName AS ReferenceProvider, 
                      tblCustomerCareData.CrossSellInsureCompanyId1Prerenew, tblCustomerCareData.CrossSellVerticalId1Prerenew, tblCustomerCareData.CrossSellTelecallerId1Prerenew, 
                      emp1.EmployeeId AS AssigneeId, emp2.EmployeeId AS ReferenceProviderId, tblCustomerCareData.CallDurationTypeId
FROM         tblCustomerCareData LEFT OUTER JOIN
                      tblInsuranceCompany ON tblCustomerCareData.CrossSellInsureCompanyId1Prerenew = tblInsuranceCompany.InsureCompanyId LEFT OUTER JOIN
                      tblVertical ON tblCustomerCareData.CrossSellVerticalId1Prerenew = tblVertical.VerticalId LEFT OUTER JOIN
                      tblEmployee AS emp1 ON tblCustomerCareData.CrossSellTelecallerId1Prerenew = emp1.EmployeeId LEFT OUTER JOIN
                      tblCustomer ON tblCustomerCareData.CustomerId = tblCustomer.CustomerId LEFT OUTER JOIN
                      tblCallDurationType ON tblCustomerCareData.CallDurationTypeId = tblCallDurationType.CallDurationTypeId LEFT OUTER JOIN
                      tblSession ON tblCustomerCareData.LastCallBy = tblSession.SessionId LEFT OUTER JOIN
                      tblUser ON tblSession.UserId = tblUser.UserId LEFT OUTER JOIN
                      tblEmployee AS emp2 ON tblUser.EmployeeId = emp2.EmployeeId
WHERE     tblCustomerCareData.CrossSellVerticalId1Prerenew > 0
GO
/****** Object:  Table [dbo].[tblVehicleClass]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVehicleClass](
	[VehicleClassId] [smallint] IDENTITY(1,1) NOT NULL,
	[VehicleClass] [nvarchar](40) NULL,
	[VehicleMainClass] [nvarchar](50) NULL,
	[VehicleMainClassId] [smallint] NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblVehicleClass] PRIMARY KEY CLUSTERED 
(
	[VehicleClassId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblEndorsementReason]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblEndorsementReason](
	[EndorsementReasonId] [smallint] IDENTITY(1,1) NOT NULL,
	[EndorsementReason] [nvarchar](100) NOT NULL,
	[EndorsementTypeId] [smallint] NULL,
	[InsuranceSegmentId] [smallint] NULL,
	[EffectonCommission] [nvarchar](20) NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblEndorsementReason] PRIMARY KEY CLUSTERED 
(
	[EndorsementReasonId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[ViewPendingCommission]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ViewPendingCommission]
AS
SELECT     tblMotorPolicyData.InsureCompanyId,  tblMotorPolicyData.InsureCompanyODId,  tblMotorPolicyData.ControlNo, tblInsuranceCompany.CompanyName, tblMotorPolicyData.NameInPolicy, tblMotorPolicyData.TPPremium, 
                      CASE WHEN tblMotorPolicyData.CoverNoteIssueType = 2 THEN 'Offline' ELSE 'Online' END AS CNType, tblMotorPolicyData.CoverNoteNo, tblMotorPolicyData.PolicyNo, tblMotorPolicyData.PolicyNoOD, tblMakeYear.MakeYear, 
                      tblModel.ModelName, tblMotorPolicyData.RegistrationNo, tblVehicleClass.VehicleClass, tblPolicyStatus.PolicyStatus, tblEndorsementReason.EndorsementReason, tblPolicyType.PolicyType, 
                      tblMotorPolicyData.PolicyStartDate, tblMotorPolicyData.PolicyStartDateOD, tblPolicyTerm.PolicyPackageType, tblMotorPolicyData.OD, tblMotorPolicyData.GrossPremium, tblMotorPolicyData.IssueDate, tblMotorPolicyData.PolicyRemarks, 
                      tblMotorPolicyData.BusinessDoneBy, tblVertical.VerticalName, tblMotorPolicyData.VerticleId,  tblMotorPolicyData.BranchId
FROM         tblMotorPolicyData Left Outer JOIN
                      tblInsuranceCompany ON tblMotorPolicyData.InsureCompanyODId = tblInsuranceCompany.InsureCompanyId INNER JOIN
                      tblPolicyType ON tblMotorPolicyData.PolicyTypeId = tblPolicyType.PolicyTypeId INNER JOIN
                      tblModel ON tblMotorPolicyData.ModelId = tblModel.ModelId INNER JOIN
                      tblMakeYear ON tblMotorPolicyData.MakeYearId = tblMakeYear.MakeYearId INNER JOIN
                      tblVertical ON tblMotorPolicyData.VerticleId = tblVertical.VerticalId INNER JOIN
                      tblPolicyStatus ON tblMotorPolicyData.PolicyStatusId = tblPolicyStatus.PolicyStatusId LEFT OUTER JOIN tblPolicyTerm ON tblMotorPolicyData.PolicyTermId = tblPolicyTerm.PolicyTermId 
                      LEFT OUTER JOIN tblEndorsementReason ON tblMotorPolicyData.PolicyCancelReasonId = tblEndorsementReason.EndorsementReasonId INNER JOIN
                      tblVehicleClass ON tblMotorPolicyData.VehicleClassId = tblVehicleClass.VehicleClassId
WHERE     tblMotorPolicyData.VerticleId = 1 AND tblMotorPolicyData.IRDACommissionReceived = 1
UNION
SELECT     tblMotorPolicyData.InsureCompanyId,  tblMotorPolicyData.InsureCompanyODId, tblMotorPolicyData.ControlNo, tblInsuranceCompany.CompanyName, tblMotorPolicyData.NameInPolicy, tblMotorPolicyData.TPPremium, 
                      tblMotorPolicyData.ReferenceNo AS CNType, '' AS CoverNoteNo, tblMotorPolicyData.PolicyNo, tblMotorPolicyData.PolicyNoOD, tblProduct.ProductName AS MakeYear, tblPlan.PlanName AS ModelName, '' AS RegistrationNo, 
                      '' AS VehicleClass, tblPolicyStatus.PolicyStatus, tblEndorsementReason.EndorsementReason, tblPolicyType.PolicyType, tblMotorPolicyData.PolicyStartDate,  tblMotorPolicyData.PolicyStartDateOD, tblPolicyTerm.PolicyPackageType,
                      tblMotorPolicyData.CommissionablePremium AS OD, tblMotorPolicyData.GrossPremium, '' AS IssueDate, tblMotorPolicyData.PolicyRemarks, tblMotorPolicyData.BusinessDoneBy, 
                      tblVertical.VerticalName, tblMotorPolicyData.VerticleId,  tblMotorPolicyData.BranchId
FROM         tblMotorPolicyData INNER JOIN
                      tblInsuranceCompany ON tblMotorPolicyData.InsureCompanyId = tblInsuranceCompany.InsureCompanyId INNER JOIN
                      tblPolicyType ON tblMotorPolicyData.PolicyTypeId = tblPolicyType.PolicyTypeId INNER JOIN
                      tblPolicyStatus ON tblMotorPolicyData.PolicyStatusId = tblPolicyStatus.PolicyStatusId LEFT OUTER JOIN tblPolicyTerm ON tblMotorPolicyData.PolicyTermId = tblPolicyTerm.PolicyTermId  LEFT OUTER JOIN
                      tblEndorsementReason ON tblMotorPolicyData.PolicyCancelReasonId = tblEndorsementReason.EndorsementReasonId INNER JOIN
                      tblVertical ON tblMotorPolicyData.VerticleId = tblVertical.VerticalId LEFT OUTER JOIN
                      tblPlan ON tblMotorPolicyData.PlanId = tblPlan.PlanId LEFT OUTER JOIN
                      tblProduct ON tblMotorPolicyData.ProductId = tblProduct.ProductId
WHERE     tblMotorPolicyData.VerticleId > 1 AND tblMotorPolicyData.IRDACommissionReceived = 1
GO
/****** Object:  View [dbo].[viewCustomerCare_With_PolicyTable]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewCustomerCare_With_PolicyTable] AS 
SELECT        dbo.tblCustomerCareData.CustomerCallDataId, dbo.tblMotorPolicyData.ControlNo, dbo.tblVertical.VerticalName, dbo.tblInsuranceCompany.CompanyName, dbo.tblMotorPolicyData.RegistrationNo, 
                         dbo.tblCallType.CallTypeName, dbo.tblMotorPolicyData.PolicyStartDate, dbo.tblModel.ModelName, dbo.tblMakeYear.MakeYear, dbo.tblProduct.ProductName, dbo.tblCustomerCareData.Q1Response, 
                         dbo.tblCustomerCareData.Q1Comment, dbo.tblCustomerCareData.Q2Response, dbo.tblCustomerCareData.Q2Comment, dbo.tblCustomerCareData.Q3Response, dbo.tblCustomerCareData.Q3Comment, 
                         dbo.tblCustomerCareData.Q5Comment, dbo.tblCustomerCareData.CallStatusId, dbo.tblCustomerCareData.SubStatusId, dbo.tblCustomerCareData.FollowupDate, dbo.tblCustomerCareData.FinalComment, 
                         dbo.tblMotorPolicyData.DSAId, dbo.tblSubStatus.SubStatusName, dbo.tblCustomerCareData.LastCallDate, dbo.tblCustomerCareData.CallTypeId, dbo.tblCustomerCareData.CallDurationTypeId, 
                         dbo.tblCustomerCareData.Q4Response, dbo.tblCustomerCareData.Q4Comment, dbo.tblCustomerCareData.Q5Response, dbo.tblMotorPolicyData.CustomerId, dbo.tblMotorPolicyData.NameInPolicy, 
                         dbo.tblCustomerCareData.PolicyId
FROM            dbo.tblCustomerCareData INNER JOIN
                         dbo.tblMotorPolicyData ON dbo.tblCustomerCareData.PolicyId = dbo.tblMotorPolicyData.PolicyId INNER JOIN
                         dbo.tblVertical ON dbo.tblMotorPolicyData.VerticleId = dbo.tblVertical.VerticalId INNER JOIN
                         dbo.tblInsuranceCompany ON dbo.tblMotorPolicyData.InsureCompanyId = dbo.tblInsuranceCompany.InsureCompanyId FULL OUTER JOIN
                         dbo.tblSubStatus ON dbo.tblCustomerCareData.SubStatusId = dbo.tblSubStatus.SubStatusId FULL OUTER JOIN
                         dbo.tblCallType ON dbo.tblCustomerCareData.CallTypeId = dbo.tblCallType.CallTypeId FULL OUTER JOIN
                         dbo.tblModel ON dbo.tblMotorPolicyData.ModelId = dbo.tblModel.ModelId FULL OUTER JOIN
                         dbo.tblMakeYear ON dbo.tblMotorPolicyData.MakeYearId = dbo.tblMakeYear.MakeYearId FULL OUTER JOIN
                         dbo.tblProduct ON dbo.tblMotorPolicyData.ProductId = dbo.tblProduct.ProductId
GO
/****** Object:  View [dbo].[viewRenewPerformanceNonMotor]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewRenewPerformanceNonMotor]
AS
SELECT     dbo.tblMotorPolicyData.ControlNo, dbo.tblMotorPolicyData.FOSId, dbo.tblMotorPolicyData.TeleCallerId, dbo.tblMotorPolicyData.InsureCompanyId, dbo.tblMotorPolicyData.DSAId, 
                      dbo.tblMotorPolicyData.ProductId, dbo.tblMotorPolicyData.VerticleId, dbo.tblMotorPolicyData.BranchId, dbo.tblMotorPolicyData.PolicyStartDate, tblMotorPolicyData.PolicyEndDate, 
                      dbo.tblInsuranceCompany.CompanyName, dbo.tblMotorPolicyData.NameInPolicy, dbo.tblDSA.DSAName, dbo.tblMotorPolicyData.RenewControlNo, 
                      RenewInsurance.CompanyName AS RenewalInsuranceCompany, dbo.tblEmployee.EmployeeName AS Telecaller, EmployeeFOS.EmployeeName AS FOS, 
                      dbo.tblPolicyType.PolicyType AS RenewalStatus, RenewTable.BusinessDoneBy, dbo.tblMotorPolicyData.CustomerId, dbo.tblMotorPolicyData.AddressInPolicy, 
                      dbo.tblMotorPolicyData.TotalGrossPremium, RenewTable.ShortFallTotal AS ShortFallTotalFull, RenewTable.TotalGrossPremium AS RenewPremium, dbo.tblVertical.VerticalName, dbo.tblProduct.ProductName
FROM         dbo.tblMotorPolicyData LEFT OUTER JOIN
                      dbo.tblInsuranceCompany ON dbo.tblMotorPolicyData.InsureCompanyId = dbo.tblInsuranceCompany.InsureCompanyId LEFT OUTER JOIN
                      dbo.tblDSA ON dbo.tblMotorPolicyData.DSAId = dbo.tblDSA.DSAId LEFT OUTER JOIN
                      dbo.tblMotorPolicyData AS RenewTable ON RenewTable.PreviousControlNo = dbo.tblMotorPolicyData.ControlNo LEFT OUTER JOIN
                      dbo.tblInsuranceCompany AS RenewInsurance ON RenewTable.InsureCompanyId = RenewInsurance.InsureCompanyId LEFT OUTER JOIN
                      dbo.tblPolicyStatus ON RenewTable.PolicyStatusId = dbo.tblPolicyStatus.PolicyStatusId LEFT OUTER JOIN
                      dbo.tblPolicyType ON RenewTable.PolicyTypeId = dbo.tblPolicyType.PolicyTypeId LEFT OUTER JOIN
                      dbo.tblEmployee ON RenewTable.TeleCallerId = dbo.tblEmployee.EmployeeId LEFT OUTER JOIN
                      dbo.tblEmployee AS EmployeeFOS ON RenewTable.FOSId = EmployeeFOS.EmployeeId LEFT OUTER JOIN
                      dbo.tblVertical ON dbo.tblMotorPolicyData.VerticleId = dbo.tblVertical.VerticalId LEFT OUTER JOIN
                      dbo.tblProduct ON dbo.tblMotorPolicyData.ProductId = dbo.tblProduct.ProductId
WHERE     dbo.tblMotorPolicyData.PolicyStatusId <> 2 AND RenewTable.PolicyStatusId <> 2
UNION
SELECT     dbo.tblMotorPolicyData.ControlNo, lostData.FOSId, lostData.TeleCallerId, dbo.tblMotorPolicyData.InsureCompanyId, dbo.tblMotorPolicyData.DSAId, tblMotorPolicyData.ProductId, 
                      dbo.tblMotorPolicyData.VerticleId, dbo.tblMotorPolicyData.BranchId, dbo.tblMotorPolicyData.PolicyStartDate, tblMotorPolicyData.PolicyEndDate, dbo.tblInsuranceCompany.CompanyName, 
                      dbo.tblMotorPolicyData.NameInPolicy, dbo.tblDSA.DSAName, lostData.ControlNo AS RenewControlNo, lostInsurance.CompanyName AS RenewalInsuranceCompany, 
                      dbo.tblEmployee.EmployeeName AS Telecaller, EmployeeFOS.EmployeeName AS FOS, 
                      CASE WHEN tblMotorPolicyData.ChequeBouncePolicyId > 0 THEN 'Not Renew due to Cheque Bounce' ELSE 'Lost Case' END AS RenewalStatus, dbo.tblMotorPolicyData.BusinessDoneBy, 
                      dbo.tblMotorPolicyData.CustomerId, dbo.tblMotorPolicyData.AddressInPolicy, dbo.tblMotorPolicyData.TotalGrossPremium, lostdata.ShortFallTotal as ShortFallTotalFull, lostdata.TotalGrossPremium AS RenewPremium, 
                      dbo.tblVertical.VerticalName, dbo.tblProduct.ProductName
FROM         dbo.tblMotorPolicyData LEFT OUTER JOIN
                      dbo.tblInsuranceCompany ON dbo.tblMotorPolicyData.InsureCompanyId = dbo.tblInsuranceCompany.InsureCompanyId LEFT OUTER JOIN
                      dbo.tblDSA ON dbo.tblMotorPolicyData.DSAId = dbo.tblDSA.DSAId LEFT OUTER JOIN
                      dbo.tblMotorPolicyData AS lostData ON dbo.tblMotorPolicyData.ChequeBouncePolicyId = lostdata.PolicyId LEFT OUTER JOIN
                      dbo.tblInsuranceCompany AS lostInsurance ON lostData.InsureCompanyId = lostInsurance.InsureCompanyId LEFT OUTER JOIN
                      dbo.tblEmployee ON Lostdata.TeleCallerId = dbo.tblEmployee.EmployeeId LEFT OUTER JOIN
                      dbo.tblEmployee AS EmployeeFOS ON Lostdata.FOSId = EmployeeFOS.EmployeeId LEFT OUTER JOIN
                      dbo.tblProduct ON dbo.tblMotorPolicyData.ProductId = dbo.tblProduct.ProductId LEFT OUTER JOIN
                      dbo.tblVertical ON dbo.tblMotorPolicyData.VerticleId = dbo.tblVertical.VerticalId
WHERE     dbo.tblMotorPolicyData.PolicyStatusId <> 2 AND dbo.tblMotorPolicyData.RenewalDone = 0
GO
/****** Object:  View [dbo].[ViewCustomerMobileNo]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create VIEW [dbo].[ViewCustomerMobileNo]
AS
 select MobileNo,CustomerId from tblCustomer unpivot (
 MobileNo
 for Value in (CustomerMobile1 ,CustomerMobile2 ,CustomerMobile3 , CustomerMobile4,CustomerPhone1, CustomerPhone2, CustomerPhone3) 
  
 )unpvt  where MobileNo!=''

GO
/****** Object:  View [dbo].[viewCustomerCare]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewCustomerCare]
AS
SELECT        dbo.tblCustomerCareData.CustomerCallDataId, dbo.tblVertical.VerticalName, dbo.tblInsuranceCompany.CompanyName, dbo.tblCallType.CallTypeName, dbo.tblModel.ModelName, dbo.tblMakeYear.MakeYear, 
                         dbo.tblProduct.ProductName, dbo.tblCustomerCareData.Q1Response, dbo.tblCustomerCareData.Q1Comment, dbo.tblCustomerCareData.Q2Response, dbo.tblCustomerCareData.Q2Comment, 
                         dbo.tblCustomerCareData.Q3Response, dbo.tblCustomerCareData.Q3Comment, dbo.tblCustomerCareData.Q5Comment, dbo.tblCustomerCareData.CallStatusId, dbo.tblCustomerCareData.SubStatusId, 
                         dbo.tblCustomerCareData.FollowupDate, dbo.tblCustomerCareData.FinalComment, dbo.tblSubStatus.SubStatusName, dbo.tblCustomerCareData.LastCallDate, dbo.tblCustomerCareData.CallTypeId, 
                         dbo.tblCustomerCareData.CallDurationTypeId, dbo.tblCustomerCareData.Q4Response, dbo.tblCustomerCareData.Q4Comment, dbo.tblCustomerCareData.Q5Response, dbo.tblCustomerCareData.PolicyId, 
                         dbo.tblCustomerCareData.ControlNo, dbo.tblCustomerCareData.CustomerId, dbo.tblCustomerCareData.NameInPolicy, dbo.tblCustomerCareData.PolicyStartDate, dbo.tblCustomerCareData.DSAId, 
                         dbo.tblCustomerCareData.RegistrationNo, dbo.tblCustomerCareData.VerticalId, dbo.tblCustomerCareData.ProductId, dbo.tblCustomerCareData.InsureCompanyId, dbo.tblCustomerCareData.ModelId, 
                         dbo.tblCustomerCareData.MakeYearId
FROM            dbo.tblCustomerCareData INNER JOIN
                         dbo.tblVertical ON dbo.tblCustomerCareData.VerticalId = dbo.tblVertical.VerticalId INNER JOIN
                         dbo.tblInsuranceCompany ON dbo.tblCustomerCareData.InsureCompanyId = dbo.tblInsuranceCompany.InsureCompanyId LEFT OUTER JOIN
                         dbo.tblSubStatus ON dbo.tblCustomerCareData.SubStatusId = dbo.tblSubStatus.SubStatusId LEFT OUTER JOIN
                         dbo.tblCallType ON dbo.tblCustomerCareData.CallTypeId = dbo.tblCallType.CallTypeId LEFT OUTER JOIN
                         dbo.tblModel ON dbo.tblCustomerCareData.ModelId = dbo.tblModel.ModelId LEFT OUTER JOIN
                         dbo.tblMakeYear ON dbo.tblCustomerCareData.MakeYearId = dbo.tblMakeYear.MakeYearId LEFT OUTER JOIN
                         dbo.tblProduct ON dbo.tblCustomerCareData.ProductId = dbo.tblProduct.ProductId
GO
/****** Object:  View [dbo].[ViewDSAAllEmailId]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



Create VIEW [dbo].[ViewDSAAllEmailId]
AS
(
Select ISNULL(CAST((row_number() OVER (ORDER BY(Select 1))) AS int), 0) 
AS SRNo,EmailId,DSAId,DSAName+'--'+EmailId AS  DSAName from ((select  EmailId,DSAId,DSAName from tblDSA AS A  
unpivot (
 EmailId
 for Value in ( A.DSAEmail1,A.DSAEmail2) 
   )AS unpvt where  EmailId!='') 
 Union ALL
(select DSAEmailID AS EmailID,DSAId,DSAContactName AS DSAName from tblDSAContact AS A  where DSAEmailID is Not null) ) AS Temp 

   )

GO
/****** Object:  View [dbo].[ViewDSAAllMobileNo]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[ViewDSAAllMobileNo]
AS
(
Select ISNULL(CAST((row_number() OVER (ORDER BY(Select 1))) AS int), 0) 
AS SRNo,MobileNo,DSAId,DSAName+'--'+ Convert(nvarchar(15),CAST(MobileNo AS decimal(20))) AS DSAName from ((select  MobileNo,DSAId,DSAName from tblDSA AS A  
unpivot (
 MobileNo
 for Value in ( A.DSAMobile1,A.DSAMobile2 ,A.DSAPhone1 , A.DSAPhone2) 
   )AS unpvt where  MobileNo!=0) 
 Union ALL
(select MobileNo,DSAId,DSAContactName AS DSAName from tblDSAContact AS A  unpivot 
(MobileNo
 for Value in ( A.DSAContactMobile1,A.DSAContactMobile2) 
   )AS unpvt) ) AS Temp 

   )

GO
/****** Object:  Table [dbo].[dbo.tblInsurancePersonDetails]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[dbo.tblInsurancePersonDetails](
	[CustomerId] [varchar](50) NULL,
	[RelationProposer] [varchar](50) NULL,
	[SumInsuredIndividual] [decimal](18, 2) NULL,
	[SumInsuredFloater] [decimal](18, 2) NULL,
	[CumulativeBonus] [decimal](18, 2) NULL,
	[Deductable] [decimal](18, 2) NULL,
	[Loading] [varchar](50) NULL,
	[LoadingReason] [varchar](250) NULL,
	[Ped] [varchar](50) NULL,
	[PedExclusion] [varchar](50) NULL,
	[AnualIncome] [varchar](50) NULL,
	[RiskClass] [varchar](50) NULL,
	[NomineeName] [varchar](50) NULL,
	[NomineeRelationship] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblAddonPlanOption]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblAddonPlanOption](
	[AddonPlanOptionId] [int] IDENTITY(1,1) NOT NULL,
	[AddonPlanOptionName] [nvarchar](20) NOT NULL,
	[AddonPlanOptionDescripation] [nvarchar](50) NULL,
	[VerticalId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[DisplayOrder] [smallint] NULL,
 CONSTRAINT [PK_tblAddonPlanOption] PRIMARY KEY CLUSTERED 
(
	[AddonPlanOptionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblAddonPlanOptionMapping]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblAddonPlanOptionMapping](
	[AddonPlanOptionMappingId] [int] IDENTITY(1,1) NOT NULL,
	[AddonPlanRiderId] [int] NOT NULL,
	[AddonPlanOptionId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_tblAddonPlanOptionMapping] PRIMARY KEY CLUSTERED 
(
	[AddonPlanOptionMappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblAgentSwapping]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblAgentSwapping](
	[AgentSwappingId] [int] IDENTITY(1,1) NOT NULL,
	[ReasonOfChange] [nvarchar](50) NULL,
	[DataChangeType] [nvarchar](50) NULL,
	[SwappingDate] [date] NULL,
	[ControlNo] [int] NULL,
	[PolicyId] [int] NULL,
	[POSId] [int] NULL,
	[POS] [nvarchar](50) NULL,
	[Telecaller] [nvarchar](50) NULL,
	[FOS] [nvarchar](50) NULL,
	[Reference] [nvarchar](50) NULL,
	[BusinessDoneBy] [nvarchar](50) NULL,
	[PolicyRemarks] [nvarchar](200) NULL,
	[OD] [int] NULL,
	[GrossPremium] [int] NULL,
	[VerticalId] [int] NULL,
	[IsActive] [bit] NULL,
	[BranchId] [smallint] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[DSACommMonthCycleIId] [smallint] NOT NULL,
	[DSACommissionReceived] [smallint] NOT NULL,
 CONSTRAINT [PK_tblAgentSwapping] PRIMARY KEY CLUSTERED 
(
	[AgentSwappingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblBasementExposer]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblBasementExposer](
	[BasementExposerId] [smallint] IDENTITY(1,1) NOT NULL,
	[BasementExposer] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblBasementExposer] PRIMARY KEY CLUSTERED 
(
	[BasementExposerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblBounceReason]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblBounceReason](
	[BounceReasonId] [smallint] IDENTITY(1,1) NOT NULL,
	[BounceReason] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblBounceReason] PRIMARY KEY CLUSTERED 
(
	[BounceReasonId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblBranchServiceProvider]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblBranchServiceProvider](
	[BranchProviderId] [int] IDENTITY(1,1) NOT NULL,
	[ApplicationId] [int] NOT NULL,
	[ProviderId] [int] NULL,
	[BranchId] [int] NULL,
	[IsDefaultProvider] [bit] NULL,
	[CommunicationType] [int] NULL,
	[EmailFolderPath] [nvarchar](200) NULL,
	[URL] [nvarchar](400) NULL,
	[URL2] [nvarchar](400) NULL,
	[URL3] [nvarchar](400) NULL,
	[UserName] [nvarchar](50) NULL,
	[Password] [nvarchar](50) NULL,
	[APIKey] [nvarchar](50) NULL,
	[Remark] [nvarchar](200) NULL,
	[EmailImgPath] [nvarchar](400) NULL,
 CONSTRAINT [PK_tblBranchServiceProvider] PRIMARY KEY CLUSTERED 
(
	[BranchProviderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblBusinessType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblBusinessType](
	[BusinessTypeId] [smallint] IDENTITY(1,1) NOT NULL,
	[BusinessTypeName] [nvarchar](30) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblBusinessType] PRIMARY KEY CLUSTERED 
(
	[BusinessTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCategory]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCategory](
	[CategoryId] [smallint] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblDSACategory] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblChequeFromAccount]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblChequeFromAccount](
	[ChequeFromAccountId] [smallint] IDENTITY(1,1) NOT NULL,
	[ChequeFromAccountName] [nvarchar](30) NOT NULL,
	[IsActive] [tinyint] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblChequeFromAccount] PRIMARY KEY CLUSTERED 
(
	[ChequeFromAccountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCity]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCity](
	[CityId] [smallint] IDENTITY(1,1) NOT NULL,
	[Branch2CityId] [smallint] NULL,
	[CityName] [nvarchar](20) NOT NULL,
	[StateId] [smallint] NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblCity] PRIMARY KEY CLUSTERED 
(
	[CityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblClaimFollowupDetails]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblClaimFollowupDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClaimId] [int] NOT NULL,
	[FollowupDate] [smalldatetime] NOT NULL,
	[FollowupReason] [nvarchar](100) NULL,
 CONSTRAINT [PK_tblClaimFollowupDetails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblClaimSubStatus]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblClaimSubStatus](
	[ClaimSubStatusId] [int] IDENTITY(1,1) NOT NULL,
	[ClaimStatusId] [int] NOT NULL,
	[ClaimSubStatus] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblClaimSubStatus] PRIMARY KEY CLUSTERED 
(
	[ClaimSubStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblClaimType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblClaimType](
	[ClaimTypeId] [int] IDENTITY(1,1) NOT NULL,
	[ClaimType] [nvarchar](50) NOT NULL,
	[VerticalId] [int] NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[DisplayOrder] [tinyint] NULL,
 CONSTRAINT [PK_tlbClaimType] PRIMARY KEY CLUSTERED 
(
	[ClaimTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCommissionPayType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCommissionPayType](
	[CommissionPayTypeId] [smallint] IDENTITY(1,1) NOT NULL,
	[CommissionPayTypeName] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[VerticalId] [int] NOT NULL,
 CONSTRAINT [PK_tblCommissionPayType] PRIMARY KEY CLUSTERED 
(
	[CommissionPayTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCommissionSlab]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCommissionSlab](
	[CommissionSlabId] [int] IDENTITY(1,1) NOT NULL,
	[InsureCompanyId] [int] NOT NULL,
	[VehicleMainClassId] [int] NULL,
	[PolicyMainTypeId] [int] NULL,
	[SplDiscountFrom] [decimal](4, 1) NULL,
	[SplDiscountUpTo] [decimal](4, 1) NULL,
	[ManufacturerId] [int] NULL,
	[ModelId] [int] NULL,
	[ExshowroomValueStart] [int] NULL,
	[ExshowroomValueEnd] [int] NULL,
	[FuelTypeId] [int] NULL,
	[CommissionSlabTypeId] [int] NULL,
	[CommissionTurnoverTypeId] [int] NULL,
	[SlabStart] [int] NULL,
	[SlabEnd] [int] NULL,
	[CommissionPercent] [decimal](5, 2) NULL,
	[IsActive] [tinyint] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[VerticalId] [int] NULL,
	[ProductId] [int] NULL,
	[PolicyTypeId] [int] NULL,
	[VehicleClassId] [int] NULL,
	[PolicyTermId] [int] NULL,
	[BranchId] [nchar](10) NULL,
 CONSTRAINT [PK_tblCommissionSlab] PRIMARY KEY CLUSTERED 
(
	[CommissionSlabId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCommissionSlabType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCommissionSlabType](
	[CommissionSlabTypeId] [int] IDENTITY(1,1) NOT NULL,
	[CommissionSlabTypeName] [nvarchar](50) NOT NULL,
	[ProcessSequance] [int] NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblCommisssionSlabType] PRIMARY KEY CLUSTERED 
(
	[CommissionSlabTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCommissionTurnoverType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCommissionTurnoverType](
	[CommissionTurnoverTypeId] [int] IDENTITY(1,1) NOT NULL,
	[CommissionTurnoverTypeName] [nvarchar](70) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblCommissionVolumeSlabType] PRIMARY KEY CLUSTERED 
(
	[CommissionTurnoverTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCompanyDetails]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCompanyDetails](
	[CompanyName] [nvarchar](50) NULL,
	[EmpGroup] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCoverage]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCoverage](
	[CoverageId] [int] IDENTITY(1,1) NOT NULL,
	[CoverageName] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblCoverage] PRIMARY KEY CLUSTERED 
(
	[CoverageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCoverageInland]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCoverageInland](
	[CoverageInlandId] [smallint] IDENTITY(1,1) NOT NULL,
	[CoverageInland] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__tblVouag__0D8688965165E3D6] PRIMARY KEY CLUSTERED 
(
	[CoverageInlandId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCoverageOverseas]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCoverageOverseas](
	[CoverageOverseasId] [smallint] IDENTITY(1,1) NOT NULL,
	[CoverageOverseas] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__tblCover__676C6EE0562A98F3] PRIMARY KEY CLUSTERED 
(
	[CoverageOverseasId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblDepartment]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblDepartment](
	[DepartmentId] [smallint] IDENTITY(1,1) NOT NULL,
	[DepartmentName] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblDepartment] PRIMARY KEY CLUSTERED 
(
	[DepartmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblDesignation]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblDesignation](
	[DesignationId] [smallint] IDENTITY(1,1) NOT NULL,
	[DesignationName] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblDesignation] PRIMARY KEY CLUSTERED 
(
	[DesignationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblDocmentType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblDocmentType](
	[DocId] [smallint] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Code] [nvarchar](50) NOT NULL,
	[IsCustomer] [bit] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__tblDocme__3EF188AD489C5F02] PRIMARY KEY CLUSTERED 
(
	[DocId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblEndorsementData]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblEndorsementData](
	[EndorsementId] [int] IDENTITY(1,1) NOT NULL,
	[PolicyId] [int] NOT NULL,
	[PolicyTypeId] [smallint] NOT NULL,
	[EndorsementEntryDate] [smalldatetime] NULL,
	[EndorsementDate] [smalldatetime] NULL,
	[EndorsementNo] [nvarchar](50) NULL,
	[EndorsementTypeId] [smallint] NULL,
	[EndorsementReasonId] [smallint] NOT NULL,
	[DocumentControlId] [int] NULL,
	[AmtODChange] [int] NULL,
	[AmtGrossPremiumChange] [int] NULL,
	[IDVChange] [int] NULL,
	[NewNCBId] [smallint] NULL,
	[NewAddOnPlanId] [smallint] NULL,
	[BounceReasonId] [smallint] NULL,
	[BounceDate] [smalldatetime] NULL,
	[PolicyReinstate] [bit] NULL,
	[NCBRecovered] [bit] NULL,
	[ReinstateAllow] [bit] NULL,
	[RTOZoneId] [smallint] NULL,
	[RegistrationNo] [nvarchar](20) NULL,
	[PremiumIncrease] [int] NULL,
	[EndoresementShortfallAmt] [int] NULL,
	[EndoresementShortfallVoucherNo] [nvarchar](10) NULL,
	[EndorsementRemark] [nvarchar](200) NULL,
	[AlternateInsureCompanyId] [int] NULL,
	[AlternatePolicyNo] [nvarchar](30) NULL,
	[AlternateInceptionDate] [smalldatetime] NULL,
	[EndorsementStatusId] [smallint] NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[CommMonthCycleId] [smallint] NULL,
	[IRDACommisionReceived] [smallint] NULL,
	[ExpectIRDACommPersent] [decimal](5, 2) NULL,
	[ReceiveIRDACommAmt] [int] NULL,
	[ReceiveIRDACommPersent] [decimal](5, 2) NULL,
	[ExpectORCCommPersent] [decimal](5, 2) NULL,
	[ReceiveORCCommAmt] [int] NULL,
	[ReceiveORCCommPersent] [decimal](5, 2) NULL,
	[BranchId] [smallint] NULL,
	[DSACommMonthCycleId] [smallint] NULL,
	[DSACommissionReceived] [smallint] NULL,
	[NewManufacturerId] [smallint] NULL,
	[NewModelId] [smallint] NULL,
	[NewVariantId] [smallint] NULL,
	[NewVehicleClassId] [smallint] NULL,
	[NCBRecoveredCancel] [smallint] NULL,
 CONSTRAINT [PK_tblPolicyEndorsementData] PRIMARY KEY CLUSTERED 
(
	[EndorsementId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblEndorsementType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblEndorsementType](
	[EndorsementTypeId] [smallint] IDENTITY(1,1) NOT NULL,
	[EndorsementType] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblEndorsementStatus] PRIMARY KEY CLUSTERED 
(
	[EndorsementTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblFinancer]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblFinancer](
	[FinancerId] [smallint] IDENTITY(1,1) NOT NULL,
	[Branch2FinancerId] [smallint] NULL,
	[FinancerName] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblFinancer] PRIMARY KEY CLUSTERED 
(
	[FinancerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblFireCoverage]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblFireCoverage](
	[FireCoverageId] [smallint] IDENTITY(1,1) NOT NULL,
	[PolicyId] [int] NOT NULL,
	[FireSA] [int] NULL,
	[FireRate] [decimal](6, 3) NULL,
	[EarthQuakeSA] [int] NULL,
	[EarthQuakeRate] [decimal](6, 3) NULL,
	[STFISA] [int] NULL,
	[STFIRate] [decimal](6, 3) NULL,
	[TerrorismSA] [int] NULL,
	[TerrorismRate] [decimal](6, 3) NULL,
	[BurglarySA] [int] NULL,
	[BurglaryRate] [decimal](6, 3) NULL,
	[MoneySA] [int] NULL,
	[MoneyRate] [decimal](6, 3) NULL,
	[BreakDownSA] [int] NULL,
	[BreakDownRate] [decimal](6, 3) NULL,
	[PlateGlassSA] [int] NULL,
	[PlateGlassRate] [decimal](6, 3) NULL,
	[BranchId] [smallint] NOT NULL,
 CONSTRAINT [PK_tblFireCoverage] PRIMARY KEY CLUSTERED 
(
	[FireCoverageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblFormList]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblFormList](
	[FormId] [int] IDENTITY(1,1) NOT NULL,
	[FormName] [nvarchar](50) NOT NULL,
	[MenuCode] [nvarchar](50) NOT NULL,
	[IsActive] [int] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[FormBelongsTo] [int] NULL,
 CONSTRAINT [PK_tblFormList] PRIMARY KEY CLUSTERED 
(
	[FormId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblFuelType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblFuelType](
	[FuelTypeId] [smallint] IDENTITY(1,1) NOT NULL,
	[FuelTypeName] [nvarchar](50) NULL,
	[FuelCode] [nvarchar](10) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblFuelType] PRIMARY KEY CLUSTERED 
(
	[FuelTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblGender]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblGender](
	[GenderId] [smallint] IDENTITY(1,1) NOT NULL,
	[Gender] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__tblPED_c__43B7FE11328C56FB] PRIMARY KEY CLUSTERED 
(
	[GenderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblGenerator]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblGenerator](
	[GeneratorId] [int] IDENTITY(1,1) NOT NULL,
	[tblFieldName] [nvarchar](50) NULL,
	[NextNo] [int] NULL,
	[BranchId] [tinyint] NULL,
	[FYId] [tinyint] NULL,
 CONSTRAINT [PK_tblGenerator] PRIMARY KEY CLUSTERED 
(
	[GeneratorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblGST]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblGST](
	[GSTId] [smallint] IDENTITY(1,1) NOT NULL,
	[GSTRate] [decimal](5, 2) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblServiceTax] PRIMARY KEY CLUSTERED 
(
	[GSTId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblIndustry]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblIndustry](
	[IndustryId] [smallint] IDENTITY(1,1) NOT NULL,
	[IndustryName] [nvarchar](30) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblIndustry] PRIMARY KEY CLUSTERED 
(
	[IndustryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblInspectionCompany]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblInspectionCompany](
	[InspectionCompanyId] [smallint] IDENTITY(1,1) NOT NULL,
	[InspectionCompanyName] [nvarchar](30) NOT NULL,
	[ContactName1] [nvarchar](50) NULL,
	[ContactName2] [nvarchar](50) NULL,
	[ContactName3] [nvarchar](50) NULL,
	[Phone1] [nvarchar](10) NULL,
	[Phone2] [nvarchar](10) NULL,
	[Phone3] [nvarchar](13) NULL,
	[Address] [nvarchar](100) NULL,
	[CityId] [smallint] NULL,
	[Pincode] [nvarchar](6) NULL,
	[Email] [nvarchar](50) NULL,
	[Website] [nvarchar](50) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblInspectionCompany] PRIMARY KEY CLUSTERED 
(
	[InspectionCompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblInsuranceCompanyBranch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblInsuranceCompanyBranch](
	[InsuranceCompanyBranchId] [int] IDENTITY(1,1) NOT NULL,
	[InsuranceCompanyId] [int] NULL,
	[InsuranceCompanyBranchName] [nvarchar](50) NULL,
	[InsuranceCompanyBranchCode] [nvarchar](20) NULL,
	[IsMotor] [bit] NULL,
	[IsHealth] [bit] NULL,
	[IsCommercial] [bit] NULL,
	[IsLife] [bit] NULL,
	[AgencyName] [nvarchar](100) NULL,
	[AgencyCode] [nvarchar](50) NULL,
	[BranchId] [int] NULL,
	[IsActive] [bit] NULL,
	[DefaultCode] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedDateTime] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedDateTime] [datetime] NULL,
 CONSTRAINT [PK_tblInsureAgency] PRIMARY KEY CLUSTERED 
(
	[InsuranceCompanyBranchId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblLog]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblLog](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Date] [datetime] NOT NULL,
	[Thread] [varchar](255) NOT NULL,
	[Level] [varchar](50) NOT NULL,
	[Logger] [varchar](255) NOT NULL,
	[Message] [varchar](4000) NOT NULL,
	[Exception] [varchar](2000) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblMaritalStatus]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblMaritalStatus](
	[CustomerMaritalStatusId] [smallint] IDENTITY(1,1) NOT NULL,
	[MaritalStatus] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblMaritalStatus] PRIMARY KEY CLUSTERED 
(
	[CustomerMaritalStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblMenuItem]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblMenuItem](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NOT NULL,
	[DisplayName] [nvarchar](500) NOT NULL,
	[Icon] [nvarchar](50) NULL,
	[ParentNode] [int] NULL,
	[Link] [nvarchar](1000) NULL,
	[IsActive] [bit] NOT NULL,
	[OrderNo] [int] NOT NULL,
 CONSTRAINT [PK_tblMenuItem] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblNoofMember]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblNoofMember](
	[NoOfMemberId] [smallint] IDENTITY(1,1) NOT NULL,
	[NoofMember] [smallint] NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__tblPED_c__43B7FE1137510C18] PRIMARY KEY CLUSTERED 
(
	[NoOfMemberId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblNoofYear]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblNoofYear](
	[NoofYearId] [smallint] IDENTITY(1,1) NOT NULL,
	[NoofYear] [nvarchar](20) NOT NULL,
	[YearNo] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblNoofYear] PRIMARY KEY CLUSTERED 
(
	[NoofYearId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblOccupation]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblOccupation](
	[OccupationId] [smallint] IDENTITY(1,1) NOT NULL,
	[OccupationName] [nvarchar](30) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblOccupation] PRIMARY KEY CLUSTERED 
(
	[OccupationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPaymentType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPaymentType](
	[PaymentTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__TblPayme__3214EC270E3AB343] PRIMARY KEY CLUSTERED 
(
	[PaymentTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPED]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPED](
	[PEDId] [smallint] IDENTITY(1,1) NOT NULL,
	[PED] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__tblPorta__CF82D2372902ECC1] PRIMARY KEY CLUSTERED 
(
	[PEDId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPolicyAddonOptionDetails]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPolicyAddonOptionDetails](
	[PolicyAddonOptionId] [int] IDENTITY(1,1) NOT NULL,
	[PolicyId] [int] NOT NULL,
	[AddonPlanOptionId] [int] NOT NULL,
	[AddonValue] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblPolicyAddonOptionDetails] PRIMARY KEY CLUSTERED 
(
	[PolicyAddonOptionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPolicyPackageType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPolicyPackageType](
	[PolicyPackageTypeId] [smallint] IDENTITY(1,1) NOT NULL,
	[PolicyPackageTypeName] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[PolicyPackageId] [int] NULL,
 CONSTRAINT [PK_tblPolicyPackageType] PRIMARY KEY CLUSTERED 
(
	[PolicyPackageTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPolicyPaymentData]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPolicyPaymentData](
	[PolicyPaymentId] [int] IDENTITY(1,1) NOT NULL,
	[PolicyId] [int] NOT NULL,
	[PaymentModeId] [smallint] NOT NULL,
	[PaymentAmount] [int] NOT NULL,
	[ChequeNo] [nvarchar](20) NULL,
	[ChequeDate] [smalldatetime] NULL,
	[BankId] [smallint] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[VerifiedBy] [int] NULL,
	[VerifiedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[BranchId] [smallint] NULL,
 CONSTRAINT [PK_tblPolicyPaymentData] PRIMARY KEY CLUSTERED 
(
	[PolicyPaymentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPortability]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPortability](
	[PortabilityId] [smallint] IDENTITY(1,1) NOT NULL,
	[Portability] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__tblFinan__905456AE243E37A4] PRIMARY KEY CLUSTERED 
(
	[PortabilityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPOSContact]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPOSContact](
	[POSContactID] [int] IDENTITY(1,1) NOT NULL,
	[POSId] [int] NOT NULL,
	[POSContactName] [nvarchar](250) NULL,
	[POSContactMobile1] [nvarchar](10) NULL,
	[POSContactMobile2] [nvarchar](10) NULL,
	[POSContactEmailID] [nvarchar](50) NULL,
	[IsMessageSend] [bit] NULL,
	[IsMotor] [bit] NULL,
	[IsHealth] [bit] NULL,
	[IsCommercial] [bit] NULL,
	[IsLife] [bit] NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedDateTime] [datetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedDateTime] [datetime] NULL,
 CONSTRAINT [PK_tblDSAContact] PRIMARY KEY CLUSTERED 
(
	[POSContactID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPPC]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPPC](
	[PPCId] [smallint] IDENTITY(1,1) NOT NULL,
	[PPC] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__tblPED_c__43B7FE112DC7A1DE] PRIMARY KEY CLUSTERED 
(
	[PPCId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblProfession]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblProfession](
	[ProfessionId] [smallint] IDENTITY(1,1) NOT NULL,
	[ProfessionName] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblProfession_1] PRIMARY KEY CLUSTERED 
(
	[ProfessionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblReceivedStatus]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblReceivedStatus](
	[ReceivedStatusId] [int] IDENTITY(1,1) NOT NULL,
	[ReceivedStatus] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblReceivedStatus] PRIMARY KEY CLUSTERED 
(
	[ReceivedStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblReference]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblReference](
	[ReferenceId] [int] IDENTITY(1,1) NOT NULL,
	[ReferenceName] [nvarchar](50) NOT NULL,
	[ReferenceCode] [nvarchar](20) NULL,
	[ReferenceAddress] [nvarchar](100) NULL,
	[ReferenceCityId] [int] NULL,
	[ReferenceMobile1] [nvarchar](10) NULL,
	[ReferenceMobile2] [nvarchar](10) NULL,
	[ReferenceEmail] [nvarchar](50) NULL,
	[ReferenceDOB] [smalldatetime] NULL,
	[ReferenceCategoryId] [smallint] NULL,
	[ReferenceTypeId] [smallint] NULL,
	[CommunicationSend] [bit] NULL,
	[IsActive] [bit] NULL,
	[BranchId] [smallint] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblRefereence] PRIMARY KEY CLUSTERED 
(
	[ReferenceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblReferType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblReferType](
	[CustomerReferId] [smallint] IDENTITY(1,1) NOT NULL,
	[CustomerReferType] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblCustomerReferType] PRIMARY KEY CLUSTERED 
(
	[CustomerReferId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblRelationShip]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRelationShip](
	[RelationShipId] [int] IDENTITY(1,1) NOT NULL,
	[RelationShipName] [nvarchar](30) NOT NULL,
	[GenderId] [smallint] NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblRelationShip] PRIMARY KEY CLUSTERED 
(
	[RelationShipId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblRiskClass]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRiskClass](
	[RiskClassId] [smallint] IDENTITY(1,1) NOT NULL,
	[RiskClassName] [nvarchar](30) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblRiskClass] PRIMARY KEY CLUSTERED 
(
	[RiskClassId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblRTOZone]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRTOZone](
	[RTOZoneId] [smallint] IDENTITY(1,1) NOT NULL,
	[RTOZoneCode] [nvarchar](20) NULL,
	[RTOZoneName] [nvarchar](50) NULL,
	[RiskZone] [nvarchar](10) NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblRTOZone] PRIMARY KEY CLUSTERED 
(
	[RTOZoneId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblServiceProvider]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblServiceProvider](
	[ProviderId] [int] IDENTITY(1,1) NOT NULL,
	[ProviderName] [nvarchar](200) NULL,
	[MessageTypeId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedDatetime] [datetime] NULL,
	[CreatedBy] [int] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedDatetime] [datetime] NULL,
 CONSTRAINT [PK_tblServiceProviderSetings] PRIMARY KEY CLUSTERED 
(
	[ProviderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblState]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblState](
	[StateId] [smallint] IDENTITY(1,1) NOT NULL,
	[StateName] [nvarchar](20) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblState] PRIMARY KEY CLUSTERED 
(
	[StateId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblStatus]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblStatus](
	[StatusId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](20) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__tblStatu__C8EE206328EEA97F] PRIMARY KEY CLUSTERED 
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblStorageRisk]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblStorageRisk](
	[StorageRiskId] [smallint] IDENTITY(1,1) NOT NULL,
	[StorageRisk] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__tblStora__A8E7CDB23E530F62] PRIMARY KEY CLUSTERED 
(
	[StorageRiskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblTerritory]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblTerritory](
	[TerritoryId] [smallint] IDENTITY(1,1) NOT NULL,
	[TerritoryName] [nvarchar](50) NOT NULL,
	[AreaCovered] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL,
	[BranchId] [smallint] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblTerritory] PRIMARY KEY CLUSTERED 
(
	[TerritoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblTitle]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblTitle](
	[TitleId] [int] IDENTITY(1,1) NOT NULL,
	[TitleName] [nvarchar](10) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblTitle] PRIMARY KEY CLUSTERED 
(
	[TitleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblType](
	[TypeId] [smallint] IDENTITY(1,1) NOT NULL,
	[TypeName] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblDSAType] PRIMARY KEY CLUSTERED 
(
	[TypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUploadedDocuments]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUploadedDocuments](
	[DocumentId] [int] IDENTITY(1,1) NOT NULL,
	[PolicyId] [int] NULL,
	[DocId] [int] NOT NULL,
	[Directory] [varchar](50) NOT NULL,
	[FileName] [varchar](50) NULL,
	[IsDelete] [bit] NULL,
	[Remarks] [nvarchar](200) NULL,
	[CustomerId] [int] NULL,
	[InspectionId] [int] NULL,
	[RegistrationNo] [nvarchar](12) NULL,
	[ClaimId] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[CreatedBy] [int] NULL,
	[OriginalFileName] [varchar](100) NULL,
	[DocumentBase64] [text] NULL,
 CONSTRAINT [PK__tblUploa__1ABEEF0F3A4E3FAB] PRIMARY KEY CLUSTERED 
(
	[DocumentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUserRights]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUserRights](
	[UserRightId] [int] IDENTITY(1,1) NOT NULL,
	[UserRoleId] [int] NOT NULL,
	[FormId] [int] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[BranchId] [int] NULL,
 CONSTRAINT [PK_tblUserRights] PRIMARY KEY CLUSTERED 
(
	[UserRightId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUserRole]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUserRole](
	[UserRoleId] [int] IDENTITY(1,1) NOT NULL,
	[UserRoleName] [nvarchar](20) NULL,
	[UserRoleDescription] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
	[BranchId] [int] NULL,
 CONSTRAINT [PK_tblUserRole] PRIMARY KEY CLUSTERED 
(
	[UserRoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUserType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUserType](
	[UserTypeId] [smallint] IDENTITY(1,1) NOT NULL,
	[UserTypeName] [nvarchar](20) NOT NULL,
	[UserTypeDescription] [nvarchar](100) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblUserType] PRIMARY KEY CLUSTERED 
(
	[UserTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVariant]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVariant](
	[VariantId] [int] IDENTITY(1,1) NOT NULL,
	[ManufacturerId] [smallint] NOT NULL,
	[ModelId] [smallint] NOT NULL,
	[VariantName] [nvarchar](50) NOT NULL,
	[ExShowroomValue] [int] NOT NULL,
	[FuelTypeId] [smallint] NOT NULL,
	[VehicleClassId] [int] NOT NULL,
	[CubicCapacity] [int] NULL,
	[SeatCapacity] [smallint] NULL,
	[GVW] [int] NULL,
	[KW] [int] NULL,
	[VariantCode] [nvarchar](50) NULL,
	[VehicleSegmentId] [int] NULL,
	[SearchVehicle] [nvarchar](250) NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblVariant] PRIMARY KEY CLUSTERED 
(
	[VariantId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVehicleSegment]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVehicleSegment](
	[VehicleSegmentId] [smallint] IDENTITY(1,1) NOT NULL,
	[VehicleSegment] [nvarchar](20) NULL,
	[SegmentDescripation] [nvarchar](50) NULL,
	[SegmentExamples] [nvarchar](100) NULL,
	[IsActive] [bit] NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblVehicleSegment] PRIMARY KEY CLUSTERED 
(
	[VehicleSegmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVehicleUsage]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVehicleUsage](
	[VehicleUsageId] [smallint] IDENTITY(1,1) NOT NULL,
	[VehicleUsageName] [nvarchar](50) NOT NULL,
	[VehicleClassId] [smallint] NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblVehicleUsage] PRIMARY KEY CLUSTERED 
(
	[VehicleUsageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVersion]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVersion](
	[Major] [tinyint] NULL,
	[Minor] [tinyint] NULL,
	[Revision] [tinyint] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVerticalSegment]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVerticalSegment](
	[VerticalSegmentId] [smallint] IDENTITY(1,1) NOT NULL,
	[VerticalSegment] [nvarchar](50) NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblVerticalSegment] PRIMARY KEY CLUSTERED 
(
	[VerticalSegmentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVoucherStatus]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVoucherStatus](
	[VoucherStatusId] [smallint] IDENTITY(1,1) NOT NULL,
	[VoucherStatus] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK_tblVoucherStatus] PRIMARY KEY CLUSTERED 
(
	[VoucherStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVoyageOverseasType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVoyageOverseasType](
	[VoyageOverseasTypeId] [smallint] IDENTITY(1,1) NOT NULL,
	[VoyageOverseasType] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__tblVouag__0D8688964CA12EB9] PRIMARY KEY CLUSTERED 
(
	[VoyageOverseasTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVoyageType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVoyageType](
	[VoyageTypeId] [smallint] IDENTITY(1,1) NOT NULL,
	[VoyageType] [nvarchar](50) NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreatedBy] [int] NULL,
	[CreatedTime] [smalldatetime] NULL,
	[ModifiedBy] [int] NULL,
	[ModifiedTime] [smalldatetime] NULL,
 CONSTRAINT [PK__tblStora__A8E7CDB247DC799C] PRIMARY KEY CLUSTERED 
(
	[VoyageTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tblAddonRider] ADD  CONSTRAINT [DF_tblAddonRider_VerticalId]  DEFAULT ((1)) FOR [VerticalId]
GO
ALTER TABLE [dbo].[tblAddonRider] ADD  CONSTRAINT [DF_tblAddonRider_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblAgentSwapping] ADD  CONSTRAINT [DF_tblAgentSwapping_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblAgentSwapping] ADD  CONSTRAINT [DF_tblAgentSwapping_DSACommMonthCycleIId_1]  DEFAULT ((0)) FOR [DSACommMonthCycleIId]
GO
ALTER TABLE [dbo].[tblAgentSwapping] ADD  CONSTRAINT [DF_tblAgentSwapping_DSACommissionReceived_1]  DEFAULT ((1)) FOR [DSACommissionReceived]
GO
ALTER TABLE [dbo].[tblBank] ADD  CONSTRAINT [DF_tblBank_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblBasementExposer] ADD  CONSTRAINT [DF_tblBasementExposer_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblBounceReason] ADD  CONSTRAINT [DF_tblBounceReason_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblBranch] ADD  CONSTRAINT [DF_tblBranch_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblBranchServiceProvider] ADD  CONSTRAINT [DF_tblBranchServiceProvider_ApplicationId]  DEFAULT ((1)) FOR [ApplicationId]
GO
ALTER TABLE [dbo].[tblBranchServiceProvider] ADD  CONSTRAINT [DF_tblBranchServiceProvider_CommunicationType]  DEFAULT ((1)) FOR [CommunicationType]
GO
ALTER TABLE [dbo].[tblBusinessType] ADD  CONSTRAINT [DF_tblBusinessType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblCategory] ADD  CONSTRAINT [DF_tblDSACategory_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblChequeFromAccount] ADD  CONSTRAINT [DF_tblChequeFromAccount_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblCity] ADD  CONSTRAINT [DF_tblCity_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblClaimStatus] ADD  CONSTRAINT [DF_tblClaimStatus_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblClaimSubStatus] ADD  CONSTRAINT [DF_tblClaimSubStatus_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblClaimType] ADD  CONSTRAINT [DF_tlbClaimType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblCluster] ADD  CONSTRAINT [DF_tblCluster_ClusterCityId1]  DEFAULT ((1)) FOR [ClusterCityId1]
GO
ALTER TABLE [dbo].[tblCluster] ADD  CONSTRAINT [DF_tblCluster_ClusterCityId2]  DEFAULT ((1)) FOR [ClusterCityId2]
GO
ALTER TABLE [dbo].[tblCluster] ADD  CONSTRAINT [DF_tblCustomerCluster_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblCommissionPayType] ADD  CONSTRAINT [DF_tblCommissionPayType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblCommissionPayType] ADD  CONSTRAINT [DF_tblCommissionPayType_VerticalId]  DEFAULT ((1)) FOR [VerticalId]
GO
ALTER TABLE [dbo].[tblCommissionSlab] ADD  CONSTRAINT [DF_tblCommissionSlab_VehicleMainClassId]  DEFAULT ((0)) FOR [VehicleMainClassId]
GO
ALTER TABLE [dbo].[tblCommissionSlab] ADD  CONSTRAINT [DF_tblCommissionSlab_PolicyTypeId]  DEFAULT ((0)) FOR [PolicyMainTypeId]
GO
ALTER TABLE [dbo].[tblCommissionSlab] ADD  CONSTRAINT [DF_tblCommissionSlab_SplDiscountFrom]  DEFAULT ((0)) FOR [SplDiscountFrom]
GO
ALTER TABLE [dbo].[tblCommissionSlab] ADD  CONSTRAINT [DF_tblCommissionSlab_SplDiscountUpTo]  DEFAULT ((80)) FOR [SplDiscountUpTo]
GO
ALTER TABLE [dbo].[tblCommissionSlab] ADD  CONSTRAINT [DF_tblCommissionSlab_CommissionTurnoverTypeId]  DEFAULT ((3)) FOR [CommissionTurnoverTypeId]
GO
ALTER TABLE [dbo].[tblCommissionSlab] ADD  CONSTRAINT [DF_tblCommissionSlab_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblCommissionSlab] ADD  CONSTRAINT [DF_tblCommissionSlab_VerticalId]  DEFAULT ((1)) FOR [VerticalId]
GO
ALTER TABLE [dbo].[tblCommissionSlab] ADD  CONSTRAINT [DF_tblCommissionSlab_ProductId]  DEFAULT ((1)) FOR [ProductId]
GO
ALTER TABLE [dbo].[tblCommissionSlab] ADD  CONSTRAINT [DF_tblCommissionSlab_PolicyTypeId_1]  DEFAULT ((0)) FOR [PolicyTypeId]
GO
ALTER TABLE [dbo].[tblCommissionSlab] ADD  CONSTRAINT [DF_tblCommissionSlab_VehicleClassId]  DEFAULT ((0)) FOR [VehicleClassId]
GO
ALTER TABLE [dbo].[tblCommissionSlab] ADD  CONSTRAINT [DF_tblCommissionSlab_PolicyTermId]  DEFAULT ((0)) FOR [PolicyTermId]
GO
ALTER TABLE [dbo].[tblCommissionSlab] ADD  CONSTRAINT [DF_tblCommissionSlab_BranchId]  DEFAULT ((1)) FOR [BranchId]
GO
ALTER TABLE [dbo].[tblCommissionSlabType] ADD  CONSTRAINT [DF_tblCommisssionSlabType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblCommissionTurnoverType] ADD  CONSTRAINT [DF_tblCommissionVolumeSlabType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblCoverage] ADD  CONSTRAINT [DF_tblCoverage_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblCoverageInland] ADD  CONSTRAINT [DF__tblVouage__IsAct__534E2C48]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblCoverageOverseas] ADD  CONSTRAINT [DF__tblCovera__IsAct__5812E165]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_IsCompany]  DEFAULT ((0)) FOR [IsCompany]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_IsCompany1]  DEFAULT ((2)) FOR [IsDecisionMaker]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_CustomerCityId1]  DEFAULT ((1)) FOR [CustomerCityId1]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_CustomerCityId11]  DEFAULT ((1)) FOR [CustomerCityId2]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_CustomerCityId11_1]  DEFAULT ((1)) FOR [CustomerCityId3]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_InactiveMobile1]  DEFAULT ((0)) FOR [InactiveMobile1]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_InactiveMobile11]  DEFAULT ((0)) FOR [InactiveMobile2]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_InactiveMobile11_1]  DEFAULT ((0)) FOR [InactivePhone1]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_InactiveMobile11_2]  DEFAULT ((0)) FOR [InactivePhone2]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_DefaultAddress]  DEFAULT ((1)) FOR [DefaultAddress]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_DefaultContactNo]  DEFAULT ((1)) FOR [DefaultContactNo]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_BusinessTypeId]  DEFAULT ((0)) FOR [BusinessTypeId]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_ProfessionId]  DEFAULT ((0)) FOR [IndustryId]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_ProfessionId_1]  DEFAULT ((0)) FOR [ProfessionId]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_DesignationId]  DEFAULT ((0)) FOR [DesignationId]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_IsMessageSend]  DEFAULT ((1)) FOR [IsMessageSend]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblCustomer] ADD  CONSTRAINT [DF_tblCustomer_InsuredGenderId]  DEFAULT ((0)) FOR [GenderId]
GO
ALTER TABLE [dbo].[tblDepartment] ADD  CONSTRAINT [DF_tblDepartment_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblDesignation] ADD  CONSTRAINT [DF_tblDesignation_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblDocmentType] ADD  CONSTRAINT [DF_tblDocmentType_IsCustomer]  DEFAULT ((0)) FOR [IsCustomer]
GO
ALTER TABLE [dbo].[tblDocmentType] ADD  CONSTRAINT [DF__tblDocmen__IsAct__4A84A774]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblEndorsementData] ADD  CONSTRAINT [DF_tblEndorsementData_PolicyTypeId]  DEFAULT ((5)) FOR [PolicyTypeId]
GO
ALTER TABLE [dbo].[tblEndorsementData] ADD  CONSTRAINT [DF_tblEndorsementData_ReinstatePolicy]  DEFAULT ((1)) FOR [PolicyReinstate]
GO
ALTER TABLE [dbo].[tblEndorsementData] ADD  CONSTRAINT [DF_tblEndorsementData_NCBRecovered]  DEFAULT ((1)) FOR [NCBRecovered]
GO
ALTER TABLE [dbo].[tblEndorsementData] ADD  CONSTRAINT [DF_tblEndorsementData_ReinstateAllow]  DEFAULT ((0)) FOR [ReinstateAllow]
GO
ALTER TABLE [dbo].[tblEndorsementData] ADD  CONSTRAINT [DF_tblEndorsementData_PremiumIncrease]  DEFAULT ((1)) FOR [PremiumIncrease]
GO
ALTER TABLE [dbo].[tblEndorsementData] ADD  CONSTRAINT [DF_tblEndorsementData_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblEndorsementData] ADD  CONSTRAINT [DF_tblEndorsementData_IRDACommisionReceived_1]  DEFAULT ((1)) FOR [IRDACommisionReceived]
GO
ALTER TABLE [dbo].[tblEndorsementData] ADD  CONSTRAINT [DF_tblEndorsementData_BranchId]  DEFAULT ((1)) FOR [BranchId]
GO
ALTER TABLE [dbo].[tblEndorsementData] ADD  CONSTRAINT [DF_tblEndorsementData_DSACommissionReceived]  DEFAULT ((1)) FOR [DSACommissionReceived]
GO
ALTER TABLE [dbo].[tblEndorsementData] ADD  CONSTRAINT [DF_tblEndorsementData_VehicleClassId]  DEFAULT ((1)) FOR [NewVehicleClassId]
GO
ALTER TABLE [dbo].[tblEndorsementData] ADD  CONSTRAINT [DF_tblEndorsementData_NCBRecovered1]  DEFAULT ((1)) FOR [NCBRecoveredCancel]
GO
ALTER TABLE [dbo].[tblEndorsementReason] ADD  CONSTRAINT [DF_tblEndorsementReason_InsureSegmentId]  DEFAULT ((0)) FOR [InsuranceSegmentId]
GO
ALTER TABLE [dbo].[tblEndorsementReason] ADD  CONSTRAINT [DF_tblEndorsementReason_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblEndorsementType] ADD  CONSTRAINT [DF_tblEndorsementStatus_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblFinancer] ADD  CONSTRAINT [DF_tblFinancer_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_FireSA]  DEFAULT ((0)) FOR [FireSA]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_FireRate]  DEFAULT ((0)) FOR [FireRate]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_EarthQuakeSA]  DEFAULT ((0)) FOR [EarthQuakeSA]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_EarthQuakeRate]  DEFAULT ((0)) FOR [EarthQuakeRate]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_STFISA]  DEFAULT ((0)) FOR [STFISA]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_STFIRate]  DEFAULT ((0)) FOR [STFIRate]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_TerrorismSA]  DEFAULT ((0)) FOR [TerrorismSA]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_TerrorismRate]  DEFAULT ((0)) FOR [TerrorismRate]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_BurglarySA]  DEFAULT ((0)) FOR [BurglarySA]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_BurglaryRate]  DEFAULT ((0)) FOR [BurglaryRate]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_MoneySA]  DEFAULT ((0)) FOR [MoneySA]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_MoneyRate]  DEFAULT ((0)) FOR [MoneyRate]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_BreakDownSA]  DEFAULT ((0)) FOR [BreakDownSA]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_BreakDownRate]  DEFAULT ((0)) FOR [BreakDownRate]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_PlateGlassSA]  DEFAULT ((0)) FOR [PlateGlassSA]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_PlateGlassRate]  DEFAULT ((0)) FOR [PlateGlassRate]
GO
ALTER TABLE [dbo].[tblFireCoverage] ADD  CONSTRAINT [DF_tblFireCoverage_BranchId]  DEFAULT ((1)) FOR [BranchId]
GO
ALTER TABLE [dbo].[tblFormList] ADD  CONSTRAINT [DF_tblFormList_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblFormList] ADD  DEFAULT ((2)) FOR [FormBelongsTo]
GO
ALTER TABLE [dbo].[tblFuelType] ADD  CONSTRAINT [DF_tblFuelType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblGender] ADD  CONSTRAINT [DF__tblPED_co__IsAct__34749F6D]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblGenerator] ADD  CONSTRAINT [DF_tblGenerator_FYId]  DEFAULT ((1)) FOR [FYId]
GO
ALTER TABLE [dbo].[tblGST] ADD  CONSTRAINT [DF_tblServiceTax_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblIndustry] ADD  CONSTRAINT [DF_tblIndustry_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblInspectionCompany] ADD  CONSTRAINT [DF_tblInspectionCompany_CityId]  DEFAULT ((1)) FOR [CityId]
GO
ALTER TABLE [dbo].[tblInspectionCompany] ADD  CONSTRAINT [DF_tblInspectionCompany_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblInspectionReason] ADD  CONSTRAINT [DF_tblInspectionReason_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblInspectionStatus] ADD  CONSTRAINT [DF_tblInspectionStatus_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblInspectionSubStatus] ADD  CONSTRAINT [DF_tblInspectionSubStatus_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblInsuranceCompany] ADD  CONSTRAINT [DF_tblInsuranceCompany_IsMotor]  DEFAULT ((0)) FOR [IsMotor]
GO
ALTER TABLE [dbo].[tblInsuranceCompany] ADD  CONSTRAINT [DF_tblInsuranceCompany_IsHealth]  DEFAULT ((0)) FOR [IsHealth]
GO
ALTER TABLE [dbo].[tblInsuranceCompany] ADD  CONSTRAINT [DF_tblInsuranceCompany_IsCommercial]  DEFAULT ((0)) FOR [IsCommercial]
GO
ALTER TABLE [dbo].[tblInsuranceCompany] ADD  CONSTRAINT [DF_tblInsuranceCompany_IsLife]  DEFAULT ((1)) FOR [IsLife]
GO
ALTER TABLE [dbo].[tblInsuranceCompany] ADD  CONSTRAINT [DF_tblInsuranceCompany_InActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblInsuranceCompanyBranch] ADD  CONSTRAINT [DF_tblInsureAgency_BranchId]  DEFAULT ((99)) FOR [BranchId]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_InsuredGenderId]  DEFAULT ((0)) FOR [InsuredGenderId]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_InsuredAge]  DEFAULT ((0)) FOR [InsuredAge]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_InsuredRelationId]  DEFAULT ((0)) FOR [InsuredRelationId]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_SumInsuredIndividual]  DEFAULT ((0)) FOR [SumInsuredIndividual]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_SumInsuredFloater]  DEFAULT ((0)) FOR [SumInsuredFloater]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_CummulativeBonus]  DEFAULT ((0)) FOR [CummulativeBonus]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_Deductable]  DEFAULT ((0)) FOR [Deductable]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_NomineeRelationId]  DEFAULT ((1)) FOR [NomineeRelationId]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_PEDId]  DEFAULT ((1)) FOR [PEDId]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_PPCId]  DEFAULT ((1)) FOR [PPCId]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_AnnualIncome]  DEFAULT ((0)) FOR [AnnualIncome]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_OccupationId]  DEFAULT ((0)) FOR [OccupationId]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_RiskClassId]  DEFAULT ((0)) FOR [RiskClassId]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_BranchId]  DEFAULT ((1)) FOR [BranchId]
GO
ALTER TABLE [dbo].[tblInsuredPerson] ADD  CONSTRAINT [DF_tblInsuredPerson_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblManufacturer] ADD  CONSTRAINT [DF_tblManufacturer_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblMaritalStatus] ADD  CONSTRAINT [DF_tblMaritalStatus_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblMenuItem] ADD  CONSTRAINT [DF_tblMenuItem_OrderNo]  DEFAULT ((0)) FOR [OrderNo]
GO
ALTER TABLE [dbo].[tblModel] ADD  CONSTRAINT [DF_tblModal_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblMonthCycle] ADD  CONSTRAINT [DF_tblMonthCycle_CommissionFreeze]  DEFAULT ((1)) FOR [CommissionFreeze]
GO
ALTER TABLE [dbo].[tblMonthCycle] ADD  CONSTRAINT [DF_tblMonthCycle_CommissionFreeze1]  DEFAULT ((1)) FOR [CommissionFreezeNonMotor]
GO
ALTER TABLE [dbo].[tblMonthCycle] ADD  CONSTRAINT [DF_tblMonthCycle_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Loyal__7D10F298]  DEFAULT ((0)) FOR [LoyaltyCounter]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Renew__7E0516D1]  DEFAULT ((0)) FOR [RenewalDone]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Previ__7FED5F43]  DEFAULT ((0)) FOR [PreviousPolicyId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Previ__00E1837C]  DEFAULT ((0)) FOR [RenewalPolicyId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Chequ__01D5A7B5]  DEFAULT ((0)) FOR [ChequeBouncePolicyId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Reins__02C9CBEE]  DEFAULT ((0)) FOR [ReinstateAllow]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Verti__03BDF027]  DEFAULT ((1)) FOR [VerticalSegmentId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Verti__04B21460]  DEFAULT ((1)) FOR [VerticalId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_PolicyTypeId]  DEFAULT ((0)) FOR [PolicyTypeId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Vehic__16D0C49B]  DEFAULT ((0)) FOR [VehicleClassId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Polic__3925DC9F]  DEFAULT ((5)) FOR [PolicyTermId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Polic__3DEA91BC]  DEFAULT (N'TP only') FOR [PolicyPackageType]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Polic__3EDEB5F5]  DEFAULT ((1)) FOR [PolicyPackageTypeId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Produ__05A63899]  DEFAULT ((0)) FOR [ProductId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__PlanI__069A5CD2]  DEFAULT ((0)) FOR [PlanId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__PlanT__078E810B]  DEFAULT ((0)) FOR [PlanTypeId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_CustomerId]  DEFAULT ((0)) FOR [CustomerId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Insur__0882A544]  DEFAULT ((0)) FOR [InsuranceCompanyId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__NoofY__0A6AEDB6]  DEFAULT ((1)) FOR [NoofYearId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_InsuranceCompanyODId]  DEFAULT ((0)) FOR [InsuranceCompanyODId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__NoofY__3831B866]  DEFAULT ((1)) FOR [NoofYearODId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_KMCovered]  DEFAULT ((0)) FOR [KMCovered]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_ExtendedKMCovered]  DEFAULT ((0)) FOR [ExtendedKMCovered]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Finan__0B5F11EF]  DEFAULT ((0)) FOR [FinancerId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_BlockAgentReassignment]  DEFAULT ((0)) FOR [BlockAgentReassignment]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_AgentChange]  DEFAULT ((0)) FOR [AgentChange]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_NoPreviousPolicy]  DEFAULT ((0)) FOR [NoPreviousPolicy]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Previ__0C533628]  DEFAULT ((0)) FOR [PreviousInsuranceCompanyId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Previ__0D475A61]  DEFAULT (((2014)-(1))-(1)) FOR [PreviousPolicyEndDate]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Nomin__1023C70C]  DEFAULT ((1)) FOR [NomineeRelationShipId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_NomineeAge]  DEFAULT ((0)) FOR [NomineeAge]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Nomin__1117EB45]  DEFAULT ((2)) FOR [NomineeGenderId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Manuf__120C0F7E]  DEFAULT ((0)) FOR [ManufacturerId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Model__130033B7]  DEFAULT ((0)) FOR [ModelId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Varia__13F457F0]  DEFAULT ((0)) FOR [VariantId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_CubicCapacity]  DEFAULT ((0)) FOR [CubicCapacity]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_SeatingCapacity]  DEFAULT ((0)) FOR [SeatingCapacity]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_GVW]  DEFAULT ((0)) FOR [GVW]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_KW]  DEFAULT ((0)) FOR [KW]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_Exshowroom]  DEFAULT ((0)) FOR [Exshowroom]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__MakeY__14E87C29]  DEFAULT ((0)) FOR [MakeYearId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_SpecialRegistrationNo]  DEFAULT ((0)) FOR [SpecialRegistrationNo]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__RTOZo__15DCA062]  DEFAULT ((1)) FOR [RTOZoneId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Vehic__3B0E2511]  DEFAULT ((0)) FOR [VehicleUsageId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_VehicleSegmentId]  DEFAULT ((0)) FOR [VehicleSegmentId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_VehicleIDV]  DEFAULT ((0)) FOR [VehicleIDV]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_ElectricAssessoriesIDV]  DEFAULT ((0)) FOR [ElectricAssessoriesIDV]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_NonElectricAssessoriesIDV]  DEFAULT ((0)) FOR [NonElectricAssessoriesIDV]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_CNGIDV]  DEFAULT ((0)) FOR [CNGIDV]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_TotalIDV]  DEFAULT ((0)) FOR [TotalIDV]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_OD]  DEFAULT ((0)) FOR [OD]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Addon__17C4E8D4]  DEFAULT ((0)) FOR [AddonOD]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_EndorseOD]  DEFAULT ((0)) FOR [EndorseOD]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_TotalOD]  DEFAULT ((0)) FOR [TotalOD]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__TPPre__18B90D0D]  DEFAULT ((0)) FOR [TPPremium]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_PassengerCover]  DEFAULT ((0)) FOR [PassengerCover]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_EndorseTP]  DEFAULT ((0)) FOR [EndorseTP]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_TotalTP]  DEFAULT ((0)) FOR [TotalTP]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_GrossPremium]  DEFAULT ((0)) FOR [GrossPremium]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_EndorseGrossPremium]  DEFAULT ((0)) FOR [EndorseGrossPremium]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Servi__1AA1557F]  DEFAULT ((18)) FOR [GSTRate]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_TotalGST]  DEFAULT ((0)) FOR [TotalGST]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_TotalGrossPremium]  DEFAULT ((0)) FOR [TotalGrossPremium]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Commi__3C02494A]  DEFAULT ((1)) FOR [CommissionPayTypeId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_CommissionablePremium]  DEFAULT ((0)) FOR [CommissionablePremium]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__NCBId__19AD3146]  DEFAULT ((1)) FOR [NCBId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_SpecialDiscount]  DEFAULT ((0)) FOR [SpecialDiscount]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_Loading]  DEFAULT ((0)) FOR [Loading]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Addon__1B9579B8]  DEFAULT ((0)) FOR [AddonRiderId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__TeleC__1C899DF1]  DEFAULT ((2)) FOR [TeleCallerId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__FOSId__1D7DC22A]  DEFAULT ((1)) FOR [FOSId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__DSAId__1E71E663]  DEFAULT ((0)) FOR [POSId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_RenewalPOSId]  DEFAULT ((0)) FOR [RenewalPOSId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__DSAMa__1F660A9C]  DEFAULT ((0)) FOR [POSManageBy]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Refer__205A2ED5]  DEFAULT ((0)) FOR [ReferenceId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Busin__214E530E]  DEFAULT (N'Joint') FOR [BusinessDoneBy]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__IsAct__22427747]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Flag1__23369B80]  DEFAULT ((0)) FOR [Flag1]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Flag2__242ABFB9]  DEFAULT ((0)) FOR [Flag2]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__IsVer__251EE3F2]  DEFAULT ((0)) FOR [IsVerified]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__IsCon__2613082B]  DEFAULT ((0)) FOR [IsConverted]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Branc__27072C64]  DEFAULT ((0)) FOR [BranchId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Polic__27FB509D]  DEFAULT ((1)) FOR [PolicyStatusId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Polic__28EF74D6]  DEFAULT ((0)) FOR [PolicyCancelReasonId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_ReceivedStatusId]  DEFAULT ((0)) FOR [ReceivedStatusId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_CreatedBy]  DEFAULT ((0)) FOR [CreatedBy]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_VerifiedBy]  DEFAULT ((0)) FOR [VerifiedBy]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_ModifiedBy]  DEFAULT ((0)) FOR [ModifiedBy]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__IRDAC__29E3990F]  DEFAULT ((0)) FOR [IRDACommMonthCycleId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__IRDAC__2AD7BD48]  DEFAULT ((1)) FOR [IRDACommissionReceived]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_ExpectIRDACommPersent]  DEFAULT ((0)) FOR [ExpectIRDACommPersent]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_ReceiveIRDACommAmt]  DEFAULT ((0)) FOR [ReceiveIRDACommAmt]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_ReceiveIRDACommPersent]  DEFAULT ((0)) FOR [ReceiveIRDACommPersent]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_ExpectORCCommPersent]  DEFAULT ((0)) FOR [ExpectORCCommPersent]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_ReceiveORCCommAmt]  DEFAULT ((0)) FOR [ReceiveORCCommAmt]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_ReceiveORCCommPersent]  DEFAULT ((0)) FOR [ReceiveORCCommPersent]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__DSACo__2BCBE181]  DEFAULT ((0)) FOR [POSCommMonthCycleId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__DSACo__2CC005BA]  DEFAULT ((1)) FOR [POSCommissionReceived]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_NoAdult]  DEFAULT ((0)) FOR [NoAdult]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_NoChild]  DEFAULT ((0)) FOR [NoChild]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Porta__2DB429F3]  DEFAULT ((0)) FOR [PortabilityId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_FamilyDiscount]  DEFAULT ((0)) FOR [FamilyDiscount]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_LongTermDiscount]  DEFAULT ((0)) FOR [LongTermDiscount]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_SectionDiscount]  DEFAULT ((0)) FOR [SectionDiscount]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_AdditionalDiscount]  DEFAULT ((0)) FOR [AdditionalDiscount]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_AddonRiderPremium]  DEFAULT ((0)) FOR [AddonRiderPremium]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_NoofDaysHospitalCash]  DEFAULT ((0)) FOR [NoofDaysHospitalCash]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Cover__2EA84E2C]  DEFAULT ((0)) FOR [CoverageId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_NoofDays]  DEFAULT ((0)) FOR [NoofDays]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_MaxDaysSingleTrip]  DEFAULT ((0)) FOR [MaxDaysSingleTrip]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Basem__2F9C7265]  DEFAULT ((0)) FOR [BasementExposerId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_TerrorismPremium]  DEFAULT ((0)) FOR [TerrorismPremium]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_TotalSumInsured]  DEFAULT ((0)) FOR [TotalSumInsured]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_InsuredMaxAge]  DEFAULT ((0)) FOR [InsuredMaxAge]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Stora__3090969E]  DEFAULT ((0)) FOR [StorageRiskId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Voyag__3184BAD7]  DEFAULT ((0)) FOR [VoyageTypeId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Voyag__3278DF10]  DEFAULT ((0)) FOR [VoyageOverseasTypeId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Cover__336D0349]  DEFAULT ((0)) FOR [CoverageInlandId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__Cover__34612782]  DEFAULT ((0)) FOR [CoverageOverseasId]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_MarineRate]  DEFAULT ((0)) FOR [MarineRate]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF_tblMotorPolicyData_MiscRate]  DEFAULT ((0)) FOR [MiscRate]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__FlagP__35554BBB]  DEFAULT ((0)) FOR [FlagPostCall]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__FlagM__36496FF4]  DEFAULT ((0)) FOR [FlagMidCall]
GO
ALTER TABLE [dbo].[tblMotorPolicyData] ADD  CONSTRAINT [DF__tblMotorP__FlagP__373D942D]  DEFAULT ((0)) FOR [FlagPreRenewCall]
GO
ALTER TABLE [dbo].[tblNoofMember] ADD  CONSTRAINT [DF__tblPED_co__IsAct__3939548A]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblNoofYear] ADD  CONSTRAINT [DF_tblNoofYear_YearNo]  DEFAULT ((0)) FOR [YearNo]
GO
ALTER TABLE [dbo].[tblOccupation] ADD  CONSTRAINT [DF_tblOccupation_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblPaymentMode] ADD  CONSTRAINT [DF_tblPaymentMode_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblPED] ADD  CONSTRAINT [DF__tblPortab__IsAct__2AEB3533]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblPlan] ADD  CONSTRAINT [DF_tblPlan_VerticalId]  DEFAULT ((2)) FOR [VerticalId]
GO
ALTER TABLE [dbo].[tblPlan] ADD  CONSTRAINT [DF_tblPlan_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblPlanType] ADD  CONSTRAINT [DF_tblPlanType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblPolicyPackageType] ADD  CONSTRAINT [DF_tblPolicyPackageType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblPolicyPaymentData] ADD  CONSTRAINT [DF_tblPolicyPaymentData_ChequeDate]  DEFAULT (((2016)-(1))-(1)) FOR [ChequeDate]
GO
ALTER TABLE [dbo].[tblPolicyPaymentData] ADD  CONSTRAINT [DF_tblPolicyPaymentData_BranchId]  DEFAULT ((1)) FOR [BranchId]
GO
ALTER TABLE [dbo].[tblPolicyStatus] ADD  CONSTRAINT [DF_tblPolicyStatus_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblPolicyTerm] ADD  CONSTRAINT [DF_tblPolicyTerm_TPYear]  DEFAULT ((0)) FOR [TPYear]
GO
ALTER TABLE [dbo].[tblPolicyTerm] ADD  CONSTRAINT [DF_tblPolicyTerm_ODYear]  DEFAULT ((0)) FOR [ODYear]
GO
ALTER TABLE [dbo].[tblPolicyTerm] ADD  CONSTRAINT [DF_tblPolicyTerm_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblPolicyType] ADD  CONSTRAINT [DF_tblPolicyType_PolicyMainTypeId]  DEFAULT ((1)) FOR [PolicyMainTypeId]
GO
ALTER TABLE [dbo].[tblPolicyType] ADD  CONSTRAINT [DF_tblCustomerType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblPortability] ADD  CONSTRAINT [DF__tblFinanc__IsAct__26268016]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblPOS] ADD  CONSTRAINT [DF__tblDSA_co__DSAMa__270595B6]  DEFAULT ((74)) FOR [POSManagedBy]
GO
ALTER TABLE [dbo].[tblPOS] ADD  CONSTRAINT [DF_tblDSA_SMSNotSend]  DEFAULT ((0)) FOR [CommunicationSend]
GO
ALTER TABLE [dbo].[tblPOS] ADD  CONSTRAINT [DF__tblDSA_co__IsBoo__2240E099]  DEFAULT ((2)) FOR [IsBookIssue]
GO
ALTER TABLE [dbo].[tblPOS] ADD  CONSTRAINT [DF__tblDSA_co__DSALo__233504D2]  DEFAULT ((1)) FOR [POSLocationId]
GO
ALTER TABLE [dbo].[tblPOS] ADD  CONSTRAINT [DF__tblDSA_co__DSACi__2429290B]  DEFAULT ((1)) FOR [POSCityId1]
GO
ALTER TABLE [dbo].[tblPOS] ADD  CONSTRAINT [DF__tblDSA_co__DSACi__251D4D44]  DEFAULT ((1)) FOR [POSCityId2]
GO
ALTER TABLE [dbo].[tblPOS] ADD  CONSTRAINT [DF__tblDSA_co__DSACa__2611717D]  DEFAULT ((1)) FOR [CategoryId]
GO
ALTER TABLE [dbo].[tblPOS] ADD  CONSTRAINT [DF_tblDSA_DSATypeId]  DEFAULT ((1)) FOR [TypeId]
GO
ALTER TABLE [dbo].[tblPOS] ADD  CONSTRAINT [DF_tblPOS_IsMotor]  DEFAULT ((1)) FOR [IsMotor]
GO
ALTER TABLE [dbo].[tblPOS] ADD  CONSTRAINT [DF__tblDSA_co__IsAct__27F9B9EF]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblPOSContact] ADD  CONSTRAINT [DF_tblDSAContact_IsMessageSend]  DEFAULT ((1)) FOR [IsMessageSend]
GO
ALTER TABLE [dbo].[tblPOSContact] ADD  CONSTRAINT [DF_tblPOSContact_IsMotor]  DEFAULT ((1)) FOR [IsMotor]
GO
ALTER TABLE [dbo].[tblPPC] ADD  CONSTRAINT [DF__tblPED_co__IsAct__2FAFEA50]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblProduct] ADD  CONSTRAINT [DF__tblAddonR__IsAct__40DA7652]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblProfession] ADD  CONSTRAINT [DF_tblProfession_IsActive_1]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblReceivedStatus] ADD  CONSTRAINT [DF_tblReceivedStatus_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblReference] ADD  CONSTRAINT [DF_tblReference_DSACategoryId]  DEFAULT ((1)) FOR [ReferenceCategoryId]
GO
ALTER TABLE [dbo].[tblReference] ADD  CONSTRAINT [DF_tblReference_DSATypeId]  DEFAULT ((1)) FOR [ReferenceTypeId]
GO
ALTER TABLE [dbo].[tblReference] ADD  CONSTRAINT [DF_tblReference_SMSNotSend]  DEFAULT ((0)) FOR [CommunicationSend]
GO
ALTER TABLE [dbo].[tblReference] ADD  CONSTRAINT [DF_tblRefereence_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblReference] ADD  CONSTRAINT [DF_tblReference_BranchId]  DEFAULT ((1)) FOR [BranchId]
GO
ALTER TABLE [dbo].[tblReferenceLead] ADD  CONSTRAINT [DF_tblReferenceLead_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblReferenceLead] ADD  CONSTRAINT [DF_tblReferenceLead_CustType]  DEFAULT ((1)) FOR [CustType]
GO
ALTER TABLE [dbo].[tblReferenceLead] ADD  CONSTRAINT [DF_tblReferenceLead_ProductId]  DEFAULT ((0)) FOR [ProductId]
GO
ALTER TABLE [dbo].[tblReferType] ADD  CONSTRAINT [DF_tblCustomerReferType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblRelationShip] ADD  CONSTRAINT [DF_tblRelationShip_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblRiskClass] ADD  CONSTRAINT [DF_tblRiskClass_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblRTOZone] ADD  CONSTRAINT [DF_tblRTOZone_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblServiceProvider] ADD  CONSTRAINT [DF_tblServiceProviderSetings_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblSession] ADD  CONSTRAINT [DF_tblSession_BranchId_1]  DEFAULT ((1)) FOR [BranchId]
GO
ALTER TABLE [dbo].[tblState] ADD  CONSTRAINT [DF_tblState_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblStatus] ADD  CONSTRAINT [DF__tblStatus__IsAct__2AD6F1F1]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblStorageRisk] ADD  CONSTRAINT [DF__tblBaseme__IsAct__3C6AC6F0]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblSubStatus] ADD  CONSTRAINT [DF_tblSubStatus_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblTeamMember] ADD  CONSTRAINT [DF_tblEmployee_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblTeamMember] ADD  CONSTRAINT [DF_tblEmployee_IsBookIssue]  DEFAULT ((0)) FOR [IsBookIssue]
GO
ALTER TABLE [dbo].[tblTeamMember] ADD  CONSTRAINT [DF_tblEmployee_ISTelecaller]  DEFAULT ((1)) FOR [ISTelecaller]
GO
ALTER TABLE [dbo].[tblTeamMember] ADD  CONSTRAINT [DF_tblEmployee_IsMotor]  DEFAULT ((1)) FOR [IsMotor]
GO
ALTER TABLE [dbo].[tblTerritory] ADD  CONSTRAINT [DF_tblTerritory_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblType] ADD  CONSTRAINT [DF_tblDSAType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblUploadedDocuments] ADD  CONSTRAINT [DF__tblUpload__IsDel__3C36881D]  DEFAULT ((0)) FOR [IsDelete]
GO
ALTER TABLE [dbo].[tblUser] ADD  CONSTRAINT [DF_tblUser_BranchId]  DEFAULT ((1)) FOR [BranchId]
GO
ALTER TABLE [dbo].[tblUser] ADD  CONSTRAINT [DF_tblUser_UserRoleId]  DEFAULT ((1)) FOR [UserRoleId]
GO
ALTER TABLE [dbo].[tblUser] ADD  CONSTRAINT [DF_tblUser_UserType]  DEFAULT ((1)) FOR [UserTypeId]
GO
ALTER TABLE [dbo].[tblUser] ADD  CONSTRAINT [DF_tblUser_IsLocked]  DEFAULT ((1)) FOR [IsLocked]
GO
ALTER TABLE [dbo].[tblUser] ADD  CONSTRAINT [DF_User_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblUser] ADD  CONSTRAINT [DF_tblUser_CurrentSessionId]  DEFAULT ((0)) FOR [CurrentSessionId]
GO
ALTER TABLE [dbo].[tblUserRights] ADD  CONSTRAINT [DF_tblUserRights_BranchId]  DEFAULT ((1)) FOR [BranchId]
GO
ALTER TABLE [dbo].[tblUserRole] ADD  CONSTRAINT [DF_tblUserRole_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblUserRole] ADD  CONSTRAINT [DF_tblUserRole_BranchId]  DEFAULT ((1)) FOR [BranchId]
GO
ALTER TABLE [dbo].[tblUserType] ADD  CONSTRAINT [DF_tblUserType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblVariant] ADD  CONSTRAINT [DF_tblVariant_VehicleClassId]  DEFAULT ((1)) FOR [VehicleClassId]
GO
ALTER TABLE [dbo].[tblVariant] ADD  CONSTRAINT [DF_tblVariant_GVW]  DEFAULT ((0)) FOR [GVW]
GO
ALTER TABLE [dbo].[tblVariant] ADD  CONSTRAINT [DF_tblVariant_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblVehicleClass] ADD  CONSTRAINT [DF_tblVehicleClass_VehicleMainClass]  DEFAULT (N'Private') FOR [VehicleMainClass]
GO
ALTER TABLE [dbo].[tblVehicleClass] ADD  CONSTRAINT [DF_tblVehicleClass_VehicleMainClassID]  DEFAULT ((1)) FOR [VehicleMainClassId]
GO
ALTER TABLE [dbo].[tblVehicleClass] ADD  CONSTRAINT [DF_tblVehicleClass_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblVehicleSegment] ADD  CONSTRAINT [DF_Table_1_VehicleMainClass]  DEFAULT (N'Private') FOR [SegmentDescripation]
GO
ALTER TABLE [dbo].[tblVehicleSegment] ADD  CONSTRAINT [DF_Table_1_VehicleMainClassId]  DEFAULT ((1)) FOR [SegmentExamples]
GO
ALTER TABLE [dbo].[tblVehicleSegment] ADD  CONSTRAINT [DF_tblVehicleSegment_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblVehicleUsage] ADD  CONSTRAINT [DF_tblVehicleUsage_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblVertical] ADD  CONSTRAINT [DF_tblVertical_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblVerticalSegment] ADD  CONSTRAINT [DF_tblVerticalSegment_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblVoucherDetails] ADD  CONSTRAINT [DF_tblVoucherDetails_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblVoucherDetails] ADD  CONSTRAINT [DF_tblVoucherDetails_IsVerified]  DEFAULT ((0)) FOR [IsVerified]
GO
ALTER TABLE [dbo].[tblVoucherDetails] ADD  CONSTRAINT [DF_tblVoucherDetails_VoucherStatusId]  DEFAULT ((1)) FOR [VoucherStatusId]
GO
ALTER TABLE [dbo].[tblVoucherDetails] ADD  CONSTRAINT [DF_tblVoucherDetails_IsCancelVerfied]  DEFAULT ((0)) FOR [IsCancelVerfied]
GO
ALTER TABLE [dbo].[tblVoucherDetails] ADD  CONSTRAINT [DF_tblVoucherDetails_IsPolicyMapped]  DEFAULT ((0)) FOR [IsPolicyMapped]
GO
ALTER TABLE [dbo].[tblVoucherStatus] ADD  CONSTRAINT [DF_tblVoucherStatus_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblVoucherType] ADD  CONSTRAINT [DF_tblVoucherType_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblVoyageOverseasType] ADD  CONSTRAINT [DF__tblVouage__IsAct__4E89772B]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblVoyageType] ADD  CONSTRAINT [DF__tblStorag__IsAct__49C4C20E]  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[tblCluster]  WITH CHECK ADD  CONSTRAINT [FK_tblCluster_tblBranch] FOREIGN KEY([BranchId])
REFERENCES [dbo].[tblBranch] ([BranchId])
GO
ALTER TABLE [dbo].[tblCluster] CHECK CONSTRAINT [FK_tblCluster_tblBranch]
GO
ALTER TABLE [dbo].[tblCustomer]  WITH CHECK ADD  CONSTRAINT [FK_tblCustomer_tblBranch] FOREIGN KEY([BranchId])
REFERENCES [dbo].[tblBranch] ([BranchId])
GO
ALTER TABLE [dbo].[tblCustomer] CHECK CONSTRAINT [FK_tblCustomer_tblBranch]
GO
ALTER TABLE [dbo].[tblMenuItem]  WITH CHECK ADD  CONSTRAINT [FK_tblMenuItem_tblMenuItem] FOREIGN KEY([ParentNode])
REFERENCES [dbo].[tblMenuItem] ([Id])
GO
ALTER TABLE [dbo].[tblMenuItem] CHECK CONSTRAINT [FK_tblMenuItem_tblMenuItem]
GO
ALTER TABLE [dbo].[tblModel]  WITH CHECK ADD  CONSTRAINT [FK_tblModal_tblManufacturer] FOREIGN KEY([ManufacturerId])
REFERENCES [dbo].[tblManufacturer] ([ManufacturerId])
GO
ALTER TABLE [dbo].[tblModel] CHECK CONSTRAINT [FK_tblModal_tblManufacturer]
GO
ALTER TABLE [dbo].[tblTeamMember]  WITH CHECK ADD  CONSTRAINT [FK_tblEmployee_tblDepartment] FOREIGN KEY([DepartmentId])
REFERENCES [dbo].[tblDepartment] ([DepartmentId])
GO
ALTER TABLE [dbo].[tblTeamMember] CHECK CONSTRAINT [FK_tblEmployee_tblDepartment]
GO
ALTER TABLE [dbo].[tblTeamMember]  WITH CHECK ADD  CONSTRAINT [FK_tblEmployee_tblDesignation] FOREIGN KEY([DesignationId])
REFERENCES [dbo].[tblDesignation] ([DesignationId])
GO
ALTER TABLE [dbo].[tblTeamMember] CHECK CONSTRAINT [FK_tblEmployee_tblDesignation]
GO
ALTER TABLE [dbo].[tblUser]  WITH CHECK ADD  CONSTRAINT [FK_tblUser_tblBranch] FOREIGN KEY([BranchId])
REFERENCES [dbo].[tblBranch] ([BranchId])
GO
ALTER TABLE [dbo].[tblUser] CHECK CONSTRAINT [FK_tblUser_tblBranch]
GO
ALTER TABLE [dbo].[tblUser]  WITH CHECK ADD  CONSTRAINT [FK_tblUser_tblEmployee] FOREIGN KEY([TeamMemberId])
REFERENCES [dbo].[tblTeamMember] ([TeamMemberId])
GO
ALTER TABLE [dbo].[tblUser] CHECK CONSTRAINT [FK_tblUser_tblEmployee]
GO
ALTER TABLE [dbo].[tblUser]  WITH CHECK ADD  CONSTRAINT [FK_tblUser_tblUserRole] FOREIGN KEY([UserRoleId])
REFERENCES [dbo].[tblUserRole] ([UserRoleId])
GO
ALTER TABLE [dbo].[tblUser] CHECK CONSTRAINT [FK_tblUser_tblUserRole]
GO
/****** Object:  StoredProcedure [dbo].[GetOtherHelathPolicy]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
Create PROCEDURE [dbo].[GetOtherHelathPolicy] 
	-- Add the parameters for the stored procedure here
	@PolicyId int,
	@CustomerID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

  SELECT        tblProduct.ProductName, tblPlan.PlanName, tblPlanType.PlanTypeName,  tblMotorPolicyData.TotalSumInsured, tblMotorPolicyData.PolicyEndDate, tblInsuranceCompany.CompanyName,
                          tblMotorPolicyData.GrossPremium,  tblMotorPolicyData.InsuredMaxAge, tblDSA.DSAName as POS, tblEmployee.EmployeeName as Telecaller, tblMotorPolicyData.ControlNo
FROM            tblMotorPolicyData INNER JOIN
                         tblCustomer ON tblMotorPolicyData.CustomerId = tblCustomer.CustomerId INNER JOIN
                         tblProduct ON tblMotorPolicyData.ProductId = tblProduct.ProductId INNER JOIN
                         tblPlan ON tblMotorPolicyData.PlanId = tblPlan.PlanId Left outer JOIN
                         tblPlanType ON tblMotorPolicyData.PlanTypeId = tblPlanType.PlanTypeId INNER JOIN
                         tblInsuranceCompany ON tblMotorPolicyData.InsureCompanyId = tblInsuranceCompany.InsureCompanyId Left outer JOIN
                         tblEmployee ON tblMotorPolicyData.TeleCallerId = tblEmployee.EmployeeId Left outer JOIN
                         tblDSA ON tblMotorPolicyData.DSAId = tblDSA.DSAId
						 where tblMotorPolicyData.VerticleId=2 and tblMotorPolicyData.PolicyStatusId=1 and  (tblMotorPolicyData.PolicyEndDate >GETDATE()) and tblMotorPolicyData.customerid=@CustomerID and tblMotorPolicyData.PolicyId<> @PolicyId
	
END
GO
/****** Object:  StoredProcedure [dbo].[GetPolicyFamilyDtl]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
Create PROCEDURE [dbo].[GetPolicyFamilyDtl] 
	-- Add the parameters for the stored procedure here
	@PolicyId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT  tblInsuredPerson.InsuredPersonName,  tblGender.Gender, tblInsuredPerson.InsuredDOB, tblInsuredPerson.InsuredAge,  tblRelationShip.RelationShipName, tblInsuredPerson.SumInsuredIndividual, tblInsuredPerson.SumInsuredFloater, tblInsuredPerson.CummulativeBonus,  tblInsuredPerson.PassportNo, tblInsuredPerson.Deductable, tblInsuredPerson.Loading, tblInsuredPerson.LoadingReason,  tblOccupation.OccupationName, tblRiskClass.RiskClassName, tblPED.PED, tblInsuredPerson.PEDExclusion, tblPPC.PPC FROM tblInsuredPerson Left outer JOIN tblRelationShip ON tblInsuredPerson.InsuredRelationId = tblRelationShip.RelationShipId LEFT OUTER JOIN dbo.tblRelationShip AS tblRelationShip1 
   ON tblInsuredPerson.NomineeRelationId = tblRelationShip1.RelationShipId Left outer JOIN tblGender ON tblInsuredPerson.InsuredGenderId = tblGender.GenderId Left Outer JOIN tblPED ON tblInsuredPerson.PEDId = tblPED.PEDId Left Outer JOIN tblPPC ON tblInsuredPerson.PPCId = tblPPC.PPCId
   Left Outer JOIN tblRiskClass ON tblInsuredPerson.RiskClassId = tblRiskClass.RiskClassId Left Outer JOIN tblOccupation ON tblInsuredPerson.OccupationId = tblOccupation.OccupationId  where tblInsuredPerson.PolicyId = @PolicyId

	
END
GO
/****** Object:  StoredProcedure [dbo].[Sp_GetTelecallerReassignData]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Sp_GetTelecallerReverData @Telecaller=38
CREATE Procedure [dbo].[Sp_GetTelecallerReassignData]
@Telecaller int
As
Begin
select Perm.EmployeeName PermanentOwner,Temp.EmployeeName TemporaryOwner,CONVERT(VARCHAR(20), TemporaryFromdate, 103)Fromdate
,CONVERT(VARCHAR(20), TemporaryToDatedate, 103)ToDate,'1' ValueType 
,Count(*)Total,perm.EmployeeId PermanentID,Temp.EmployeeId TemporaryID from tbl_ReAssigned Invited
Inner Join tblEmployee Perm on perm.EmployeeId=Invited.PermanentOwner
Inner Join tblEmployee Temp on Temp.EmployeeId=Invited.TemporaryOwner
Where PermanentOwner=@Telecaller
Group by Perm.EmployeeName,Temp.EmployeeName,TemporaryFromdate,TemporaryToDatedate,perm.EmployeeId,Temp.EmployeeId
union all
select Perm.EmployeeName PermanentOwner,Temp.EmployeeName TemporaryOwner,CONVERT(VARCHAR(20), TemporaryFromdate, 103)Fromdate
,CONVERT(VARCHAR(20), TemporaryToDatedate, 103)ToDate,'2' ValueType 
,Count(*)Total,perm.EmployeeId PermanentID,Temp.EmployeeId TemporaryID from tbl_ReAssigned Invited
Inner Join tblEmployee Perm on perm.EmployeeId=Invited.PermanentOwner
Inner Join tblEmployee Temp on Temp.EmployeeId=Invited.TemporaryOwner
Where TemporaryOwner=@Telecaller 
Group by Perm.EmployeeName,Temp.EmployeeName,TemporaryFromdate,TemporaryToDatedate,perm.EmployeeId,Temp.EmployeeId
End



GO
/****** Object:  StoredProcedure [dbo].[Sp_GetTelecallerReverData]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Sp_GetTelecallerReverData @Telecaller=38
CREATE Procedure [dbo].[Sp_GetTelecallerReverData]
@Telecaller int,@DataTypeID int,@BranchId int
As
Begin
select Perm.EmployeeName PermanentOwner,Temp.EmployeeName TemporaryOwner,CONVERT(VARCHAR(20), TemporaryFromdate, 103)Fromdate
,CONVERT(VARCHAR(20), TemporaryToDatedate, 103)ToDate,'1' ValueType 
,Count(*)Total,perm.EmployeeId PermanentID,Temp.EmployeeId TemporaryID from tblInvitedData Invited
Inner Join tblEmployee Perm on perm.EmployeeId=Invited.PermanentOwner
Inner Join tblEmployee Temp on Temp.EmployeeId=Invited.TemporaryOwner
Where PermanentOwner=@Telecaller And DataTypeId=@DataTypeID And Invited.BranchId= @BranchId And (Invited.Status!=1 And Invited.Status!=2)
Group by Perm.EmployeeName,Temp.EmployeeName,TemporaryFromdate,TemporaryToDatedate,perm.EmployeeId,Temp.EmployeeId
union all
select Perm.EmployeeName PermanentOwner,Temp.EmployeeName TemporaryOwner,CONVERT(VARCHAR(20), TemporaryFromdate, 103)Fromdate
,CONVERT(VARCHAR(20), TemporaryToDatedate, 103)ToDate,'2' ValueType 
,Count(*)Total,perm.EmployeeId PermanentID,Temp.EmployeeId TemporaryID from tblInvitedData Invited
Inner Join tblEmployee Perm on perm.EmployeeId=Invited.PermanentOwner
Inner Join tblEmployee Temp on Temp.EmployeeId=Invited.TemporaryOwner
Where TemporaryOwner=@Telecaller And DataTypeId=@DataTypeID And Invited.BranchId= @BranchId And (Invited.Status!=1 And Invited.Status!=2)
Group by Perm.EmployeeName,Temp.EmployeeName,TemporaryFromdate,TemporaryToDatedate,perm.EmployeeId,Temp.EmployeeId
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_Bussinessby]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--Usp_Bussinessby '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_Bussinessby]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int, @PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) ,@ManufacturereId nvarchar(200)

As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) 
 AND (IsVerified=1)  And Invited.BranchId=@BranchId and ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1

Select BusinessDoneBy,BusinessDoneBy+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1)    And Policy.BranchId=@BranchId and ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
 and Policy.PolicyId not in (Select PolicyID from #Policy) 
Group by BusinessDoneBy
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_CurrentTeleCallerWithCnt]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_CurrentTeleCallerWithCnt]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@DataTypeId int,@BranchId int 
As
Begin


Create table #Policy (InvitedDataId int)
IF (@DataTypeId=1 OR @DataTypeId=2)
Begin
Insert into #Policy
Select Invited.InvitedDataId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And (Invited.Status!=1 And Invited.Status!=2)
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1)  And Invited.BranchId=@BranchId  and
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
END
Else IF @DataTypeId=3
 BEGIN
 Insert into #Policy
Select Invited.InvitedDataId from tblReferenceLead Refer
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Refer.ReferenceLeadId AND Invited.IsAllocated=2 And (Invited.Status!=1 And Invited.Status!=2)
WHERE  (Refer.TentitiveExpiryDate >= @FromDate  AND Refer.TentitiveExpiryDate <= @ToDate ) And Refer.IsActive=1 And Refer.BranchId=@BranchId And
  ((@Vertical=1 AND Refer.ReferenceLeadVerticalId =1) OR (@Vertical=2 AND Refer.ReferenceLeadVerticalId  IN (2,3,6))  OR (@Vertical=3 AND  Refer.ReferenceLeadVerticalId  IN (4,5,7) ) OR (@Vertical=4 AND  Refer.ReferenceLeadVerticalId < 8)) 
 END
Else IF @DataTypeId=4
 BEGIN
 Insert into #Policy
Select Invited.InvitedDataId from tblMarketData Market
Inner Join tblInvitedData Invited on Invited.MarketDataId = Market.MarketDataId AND Invited.IsAllocated=2 And (Invited.Status!=1 And Invited.Status!=2)
WHERE  (Market.TentativeExpirydate >= @FromDate  AND Market.TentativeExpirydate <= @ToDate ) And Market.BranchId=@BranchId And
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
 END
Create table #TeleCallerInfo (EmployeeId int,Cnt Varchar(100))
Insert into #TeleCallerInfo
Select Inviteddata.PermanentOwner,manu.EmployeeName+' - '+Convert(char,Count(*)) AS [Cnt] from tblInvitedData Inviteddata
Inner Join tblEmployee Manu On Manu.EmployeeId=Inviteddata.PermanentOwner
WHERE  Inviteddata.InvitedDataId  in (Select InvitedDataId from #Policy) 
Group by Inviteddata.PermanentOwner,manu.EmployeeName

Select Convert(int,tblEmployee.EmployeeId)Id,case when Cnt is null then EmployeeName else cnt End Name 
 from tblEmployee tblEmployee  inner join tbl_CRM_User usertbl on tblEmployee.EmployeeId=usertbl.EmployeeId
 inner join tbl_CRM_UserRoles VRole on usertbl.UserRoleId=VRole.CRM_RoleID
Left Join #TeleCallerInfo on #TeleCallerInfo.EmployeeId=tblEmployee.EmployeeId 
Where tblEmployee.ISTelecaller=1 And tblEmployee.BranchId=@BranchId and  tblEmployee.IsActive=1 AND (VRole.VerticalSegmentId like ('%'++CAST(@Vertical AS varchar)+'%') OR VRole.VerticalSegmentId=4) and 
 ((@Vertical=1 AND tblEmployee.IsMotor=1) Or (@Vertical=2 AND tblEmployee.IsHealth=1) OR (@Vertical=3 AND tblEmployee.IsCommercial=1)  OR (@Vertical=4))
Order by Name

End


GO
/****** Object:  StoredProcedure [dbo].[Usp_DSACategorySearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_DSACategorySearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_DSACategorySearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int ,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) ,@ManufacturereId nvarchar(200)
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2
WHERE ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1)   And Invited.BranchId=@BranchId And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1

Create table #DSA (DSACategoryId int,Cnt Varchar(100))
Insert into #DSA
Select Category.DSACategoryId,Category.DSACategoryName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblDSA DSA On DSA.DSAId=Policy.DSAId
Inner Join tblDSACategory Category on Category.DSACategoryId=DSA.DSACategoryId
WHERE (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1) And Policy.BranchId=@BranchId
 And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId not in (Select PolicyID from #Policy)
Group by Category.DSACategoryId,Category.DSACategoryName

Select Convert(int,Category.DSACategoryId)DSAId,case when Cnt is null then DSACategoryName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblDSACategory Category
Left Join #DSA on #DSA.DSACategoryId=Category.DSACategoryId
where IsActive = 1 and Category.DSACategoryId > 1 and Category.DSACategoryId not in(6)

End



GO
/****** Object:  StoredProcedure [dbo].[Usp_DSASearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_DSASearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_DSASearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) ,@ManufacturereId nvarchar(200)
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId
WHERE ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
  AND Invited.IsAllocated=2 AND (IsVerified=1) And Invited.BranchId=@BranchId And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1

Create table #DSA (DSAId int,Cnt Varchar(100))
Insert into #DSA
Select Policy.DSAId,DSA.DSAName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblDSA DSA On DSA.DSAId=Policy.DSAId
WHERE (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) and Policy.BranchId=@BranchId
  And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId not in (Select PolicyID from #Policy)
Group by Policy.DSAId,DSA.DSAName

Select Convert(int,tblDSA.DSAId)DSAId,case when Cnt is null then DSAName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblDSA tblDSA
Left Join #DSA on #DSA.DSAId=tblDSA.DSAId and tblDSA.IsActive=1 
Where tblDSA.DSAId not in (6) and DSAName!='' and tblDSA.BranchId=@BranchId
Order by cnt
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_FuelType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--Usp_FuelType '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_FuelType]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int ,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) ,@ManufacturereId nvarchar(200)

As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2
WHERE 
 ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1)  and Invited.BranchId=@BranchId And  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1


Create table #FuelType (FuelTypeId int,Cnt Varchar(100))
Insert into #FuelType
Select FuelType.FuelTypeId,FuelType.FuelTypeName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblVariant Variant on Variant.VariantId=Policy.VariantId
Inner Join tblFuelType FuelType on FuelType.FuelTypeId=Variant.FuelTypeId
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1)   and Policy.BranchId=@BranchId And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId not in (Select PolicyID from #Policy) 
Group by FuelType.FuelTypeId,FuelType.FuelTypeName


Select Convert(int,Fuel.FuelTypeId)FuelType,case when Cnt is null then Fuel.FuelTypeName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblFuelType Fuel
Left Join #FuelType on #FuelType.FuelTypeId=Fuel.FuelTypeId where IsActive = 1 
Order by Fuel.FuelTypeName

End




GO
/****** Object:  StoredProcedure [dbo].[Usp_GetManufacturer]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_GetManufacturer 1
CREATE Procedure [dbo].[Usp_GetManufacturer]
@ID int
As
Begin
Select Manufacturer.ManufacturerId,ManufacturerName from tblManufacturer Manufacturer
Inner Join tblVariant Variant on Variant.ManufacturerId=Manufacturer.ManufacturerId
where VehicleClassId=@ID
group by Manufacturer.ManufacturerId,Manufacturer.ManufacturerName
Order by Manufacturer.ManufacturerName
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_GrossPremiumSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



--Usp_GrossPremiumSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_GrossPremiumSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) ,@ManufacturereId nvarchar(200)
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1) And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and Invited.BranchId=@BranchId


Create table #GrossPremium (PremiumID int,Cnt Varchar(100))
Insert into #GrossPremium

Select 1,'0-10000'+' - '+Convert(char,Count(*)) AS [Cnt]  from tblMotorPolicyData Policy
WHERE (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1) And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Policy.BranchId=@BranchId
 and Policy.PolicyId not in (Select PolicyID from #Policy) And (Policy.GrossPremium>0 and Policy.GrossPremium<10001)

Insert into #GrossPremium
Select 2,'10001- 25000'+' - '+Convert(char,Count(*)) AS [Cnt]  from tblMotorPolicyData Policy
WHERE (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1) And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Policy.BranchId=@BranchId
and Policy.PolicyId not in (Select PolicyID from #Policy) And (Policy.GrossPremium>10000 and Policy.GrossPremium<25001)

Insert into #GrossPremium
Select 3,'25001-50000'+' - '+Convert(char,Count(*)) AS [Cnt]  from tblMotorPolicyData Policy
WHERE (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1) And  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Policy.BranchId=@BranchId
and Policy.PolicyId not in (Select PolicyID from #Policy) And (Policy.GrossPremium>25000 and Policy.GrossPremium<50001)


Insert into #GrossPremium
Select 4,'>50000'+' - '+Convert(char,Count(*)) AS [Cnt]  from tblMotorPolicyData Policy
WHERE (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1) And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Policy.BranchId=@BranchId
and Policy.PolicyId not in (Select PolicyID from #Policy) And (Policy.GrossPremium>50000)


Select * from #GrossPremium
End







GO
/****** Object:  StoredProcedure [dbo].[Usp_InspectionByPolicyId]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[Usp_InspectionByPolicyId] @policyId int
as
begin
	set nocount on;
	declare @startDate datetime;
	declare @endDate datetime;
	declare @registrationNumber varchar(100);
	declare @insuranceCompany int;

	select 
		@registrationNumber = RegistrationNo, 
		@insuranceCompany = InsuranceCompanyIdNumber,
		@startDate= StartDate,
		@endDate= ExpiryDate
	from View_SearchForm
	where PolicyId = @policyId;

	select 
		inspection.InspectionId,
		inspection.InspectionDate,
		reason.InspectionReason,
		[status].InspectionStatus,
		subStatus.InspectionSubStatus
	from [dbo].[tblInspectionData] inspection
	inner join [dbo].[tblInspectionReason] reason on reason.InspectionReasonId = inspection.InspectionReasonId
	left join [dbo].[tblInspectionStatus] [status] on [status].InspectionStatusId = inspection.InspectionStatusId
	left join [dbo].[tblInspectionSubStatus] subStatus on subStatus.InspectionSubStatusId = inspection.InspectionSubStatusId
	where inspection.RegistrationNo = @registrationNumber 
		and inspection.ReqInsuranceCompanyId = @insuranceCompany
		and inspection.InspectionDate between DATEADD(DAY, -30, @startDate) and DATEADD(DAY, -30, @endDate)
end

--exec Usp_InspectionByPolicyId 3
GO
/****** Object:  StoredProcedure [dbo].[Usp_InsuranceSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_InsuranceSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_InsuranceSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@PoilcyPackageID nvarchar(200),@ManufacturereId nvarchar(220) ,@VehicleType nvarchar(200)  
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) 
 AND (IsVerified=1)  And Invited.BranchId=@BranchId and ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1

Create table #Term (InsureId int,Cnt Varchar(100))
Insert into #Term
Select InsureCompanyId ,CompanyName +' - '+Convert(char,Count(*)) AS [Cnt] from  
(Select  Insurance.InsureCompanyId InsureCompanyId,Insurance.CompanyName CompanyName  from tblMotorPolicyData Policy
Inner  Join tblInsuranceCompany Insurance on Insurance.InsureCompanyId=Policy.InsureCompanyId  And Policy.PolicyPackageTypeId = 1
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1 )) 
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) AND ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1)  And Policy.BranchId=@BranchId And
((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId not in (Select PolicyID from #Policy)
Union All
Select     Insurance.InsureCompanyId InsureCompanyId,Insurance.CompanyName CompanyName from tblMotorPolicyData Policy
Inner  Join tblInsuranceCompany Insurance on Insurance.InsureCompanyId=Policy.InsureCompanyODId And Policy.PolicyPackageTypeId != 1
WHERE (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1 )) 
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) and ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1)  And Policy.BranchId=@BranchId And
((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId not in (Select PolicyID from #Policy)) AS Insurence
Group by CompanyName,InsureCompanyId 


Select Convert(int,Insurance.InsureCompanyId)InsureCompanyId,case when Cnt is null then Insurance.CompanyName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblInsuranceCompany Insurance
Left Join #Term on #Term.InsureId=Insurance.InsureCompanyId where IsActive = 1 and ((@Vertical=1 AND Insurance.InsureSegmentId In(1,2)) OR (@Vertical in (2,3) AND Insurance.InsureSegmentId In(1,3)) OR (@Vertical=4 AND Insurance.InsureSegmentId In(1,2,3)))
Order by Insurance.CompanyName
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_LastYearTeleCallerSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_LastYearTeleCallerSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) ,@ManufacturereId nvarchar(200) 
As
Begin


Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1)  And Invited.BranchId=@BranchId  and
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1

Create table #TeleCallerInfo (EmployeeId int,Cnt Varchar(100))
Insert into #TeleCallerInfo
Select Policy.TeleCallerId,manu.EmployeeName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblEmployee Manu On Manu.EmployeeId=Policy.TeleCallerId
WHERE (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1)  And Policy.BranchId=@BranchId  and
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) Or (@Vertical=4 AND  Policy.VerticleId< 8))  and PolicyStatusId=1
and Policy.PolicyId not in (Select PolicyID from #Policy) 
Group by Policy.TeleCallerId,manu.EmployeeName

Select Convert(int,tblEmployee.EmployeeId)EmployeeId,case when Cnt is null then EmployeeName else cnt End Cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblEmployee tblEmployee
Left Join #TeleCallerInfo on #TeleCallerInfo.EmployeeId=tblEmployee.EmployeeId 
Where tblEmployee.ISTelecaller=1 and tblEmployee.IsActive=1 and tblEmployee.BranchId=@BranchId 
Order by cnt
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_Lost_TelecallerDashboard]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--Select * from TblTelecallerInfo
--Usp_TelecallerDashboard '01-jul-2019','31-jul-2019',62
CREATE Procedure [dbo].[Usp_Lost_TelecallerDashboard]
@FromDate Datetime,@ToDate Datetime,@ID int,@Vertical int,@DataTypeID nvarchar(20),@BranchId int
As
Begin
Create table #Policy (PolicyID Varchar(20))
--TotalAllocatedCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--CollectedCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=1
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--LostCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=2
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--FollowupCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and  Invited.Status in  (4,6,8)
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--PendingCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
And Invited.Status=0
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1   and Invited.BranchId=@BranchId  and PermanentOwner=@ID


--TotalAllocatedPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--CollectedPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=1
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--LostPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=2
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--FollowupPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status in  (4,6,8)
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--PendingPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
And Invited.Status=0
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8))  and PolicyStatusId=1 and  Invited.BranchId=@BranchId  and PermanentOwner=@ID

--NotContactableCases 
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and  Invited.Status=5
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--NotContactablePremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=5
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId



--AssignToCollect
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=3
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--AssignToCollectPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=3
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId


  ---Payment Link Send
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=7
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId

    ---Payment Link Send Premium
  Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=7
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId

Select * from #Policy
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_Lost_TeleCallerTodayStatus]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_TeleCallerTodayStatus 62
CREATE Procedure [dbo].[Usp_Lost_TeleCallerTodayStatus]
@ID int,@Vertical int,@DataTypeID varchar(20),@BranchId int
As
Begin
Create table #Policy (PolicyID Varchar(20))
--Expiry in Next 15 DaysPermament(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE (( Policy.PolicyEndDate <= CONVERT(VARCHAR(11),DATEADD(DAY,15,GETDATE()), 106)  And Policy.PolicyPackageTypeId = 1) OR
 ( Policy.PolicyEndDateOD <= CONVERT(VARCHAR(11),DATEADD(DAY,15,GETDATE()), 106)  And Policy.PolicyPackageTypeId in (2,3)))  AND (IsVerified=1) --15 Days-
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.PermanentOwner=@ID and Invited.Status=0  and Invited.BranchId=@BranchId

--Expiry in Next 15  Temporary:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE  ((Policy.PolicyEndDate <= CONVERT(VARCHAR(11),DATEADD(DAY,15,GETDATE()), 106)  And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD <= CONVERT(VARCHAR(11),DATEADD(DAY,15,GETDATE()), 106)  And Policy.PolicyPackageTypeId in (2,3)))  AND (IsVerified=1)  And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106))
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.TemporaryOwner=@ID and Invited.Status=0 and Invited.BranchId=@BranchId
--Expiry next 16-30 Days Permanent:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE ((Policy.PolicyEndDate >= CONVERT(VARCHAR(11),DATEADD(DAY,16,GETDATE()), 106)  AND Policy.PolicyEndDate <= CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)  And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >=CONVERT(VARCHAR(11),DATEADD(DAY,16,GETDATE()), 106)   AND Policy.PolicyEndDateOD <= CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106) And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) 
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.PermanentOwner=@ID and Invited.Status=0  and Invited.BranchId=@BranchId
--Expiry next 16-30 Days Temporary:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE  ((Policy.PolicyEndDate >= CONVERT(VARCHAR(11),DATEADD(DAY,16,GETDATE()), 106)  AND Policy.PolicyEndDate <= CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)  And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >=CONVERT(VARCHAR(11),DATEADD(DAY,16,GETDATE()), 106)   AND Policy.PolicyEndDateOD <= CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)  And Policy.PolicyPackageTypeId in (2,3)))  AND (IsVerified=1) And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106))
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.TemporaryOwner=@ID and  Invited.Status=0  and Invited.BranchId=@BranchId
--Expiry greater than 30 Days Permament(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE ((Policy.PolicyEndDate > CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)    And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD > CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)  And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) 
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.PermanentOwner=@ID and Invited.Status=0  and Invited.BranchId=@BranchId

--Expiry greater than 30 Days Temporary(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE ((Policy.PolicyEndDate > CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)    And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD > CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)  And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106))
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.TemporaryOwner=@ID and Invited.Status=0  and Invited.BranchId=@BranchId

--Overdue(Beforetoday)Permament (Followup)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE (Invited.FollowupDate < CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1) and Invited.Status>2
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and Invited.PermanentOwner=@ID  and Invited.BranchId=@BranchId
--Overdue(Before today) Temporary:(Followup)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'

WHERE (Invited.FollowupDate < CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1) and Invited.Status>2 And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106))
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and Invited.TemporaryOwner=@ID  and Invited.BranchId=@BranchId
--Today Permanent:(Followup)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'

WHERE (Invited.FollowupDate = CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1)  and Invited.Status>3
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and Invited.PermanentOwner=@ID  and Invited.BranchId=@BranchId

--Today Temporary:(Followup)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE (Invited.FollowupDate = CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1)  and Invited.Status>3 And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106))
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and Invited.TemporaryOwner=@ID  and Invited.BranchId=@BranchId
--After Today Permament(Followup)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'

WHERE (Invited.FollowupDate > CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1) and Invited.Status>2
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.PermanentOwner=@ID  and Invited.BranchId=@BranchId

--After Today Temporary(Followup)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE (Invited.FollowupDate > CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1) And Invited.Status>2 And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106))
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.TemporaryOwner=@ID  and Invited.BranchId=@BranchId


--AssignedtoCollectStatus
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'

WHERE (Invited.AssignDate = CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1) and Invited.Status=3
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.PermanentOwner=@ID  and Invited.BranchId=@BranchId

--AssignedtoCollectStatusTemporaryOwner
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'

WHERE (Invited.AssignDate = CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1) and Invited.Status=3 And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106))
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.TemporaryOwner=@ID  and Invited.BranchId=@BranchId

Select * from #Policy
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_MarketCrossReferencing]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_MarketCrossReferencing]
@BranchId int 
As
Begin


Create table #Policy (CustomerID int,MarketDataId int)
INSERT INTO #Policy
Select (Select top 1 CustomerId from tblCustomer where (CustomerMobile1=tblMarketData.MobileNo1 OR CustomerMobile2=tblMarketData.MobileNo1 OR CustomerMobile3=tblMarketData.MobileNo1 OR CustomerMobile4=tblMarketData.MobileNo1) And BranchId=@BranchId) AS CustomerId,MarketDataId from tblMarketData
where IsMatching=0 and IsProcess=0 AND IsActive=1 and BranchId=@BranchId

UPdate tblMarketData set IsProcess=1,CustomerId=A.CustomerID,IsMatching=(case  When A.CustomerID is NULL then 0 else 1 END)  from  #Policy AS A
where A.MarketDataId=tblMarketData.MarketDataID AND tblMarketData.IsProcess=0 and IsMatching=0  And BranchId=@BranchId

Select 1 AS Success;


End



GO
/****** Object:  StoredProcedure [dbo].[Usp_MarketDataSourceSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_MarketDataSourceSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@Manufacturer nvarchar(700)
As
Begin


Create table #MarketData (MarketDataId int)
Insert into #MarketData
Select Market.MarketDataId from tblMarketData Market
Inner Join tblInvitedData Invited on Invited.MarketDataId = Market.MarketDataId AND Invited.IsAllocated=2
WHERE  (Market.TentativeExpirydate >= @FromDate  AND Market.TentativeExpirydate <= @ToDate ) And Market.BranchId=@BranchId And
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) AND Market.IsActive=1 

Create table #manu (DataSource nvarchar(50),Cnt Varchar(100))
Insert into #manu
Select Market.Source,Market.Source+' - '+Convert(char,Count(*)) AS [Cnt] from tblMarketData Market
WHERE   (Market.TentativeExpirydate >= @FromDate  AND Market.TentativeExpirydate <= @ToDate ) And Market.BranchId=@BranchId And
  ((@Vertical=4 AND Market.VerticalSegmentId<4) Or Market.VerticalSegmentId=@Vertical)
   And  ((LEN(@Manufacturer)>0  And  (','+@Manufacturer+',' LIKE '%,'+Market.Manufacturer +',%')) OR (LEN(@Manufacturer)<1 )) 
and Market.MarketDataId not in (Select MarketDataId from #MarketData) AND Market.IsActive=1
Group By Market.Source

Select DataSource Name,case when Cnt is null then DataSource else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from  #manu
Order by cnt
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_MarketInsureSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_MarketInsureSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@Source nvarchar(700),@Manufacturer nvarchar(700)
As
Begin


Create table #MarketData (MarketDataId int)
Insert into #MarketData
Select Market.MarketDataId from tblMarketData Market
Inner Join tblInvitedData Invited on Invited.MarketDataId = Market.MarketDataId AND Invited.IsAllocated=2
WHERE  (Market.TentativeExpirydate >= @FromDate  AND Market.TentativeExpirydate <= @ToDate ) And Market.BranchId=@BranchId And
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) AND Market.IsActive=1

Create table #manu (InsureCompany nvarchar(100),Cnt Varchar(100))
Insert into #manu
Select distinct Market.InsureCompany,Market.InsureCompany+' - '+Convert(char,Count(*)) AS [Cnt] from tblMarketData Market
WHERE   (Market.TentativeExpirydate >= @FromDate  AND Market.TentativeExpirydate <= @ToDate )  And
((LEN(@Source)>0  And  (','+@Source+',' LIKE '%,'+Market.Source +',%')) OR (LEN(@Source)<1 ))  
 And  ((LEN(@Manufacturer)>0  And  (','+@Manufacturer+',' LIKE '%,'+Market.Manufacturer +',%')) OR (LEN(@Manufacturer)<1 )) AND
  ((@Vertical=4 AND Market.VerticalSegmentId<4) Or Market.VerticalSegmentId=@Vertical ) And Market.BranchId=@BranchId
and Market.MarketDataId not in (Select MarketDataId from #MarketData) AND Market.IsActive=1
Group by  Market.InsureCompany

Select InsureCompany Name,case when Cnt is null then InsureCompany else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from #manu tblManu

Order by cnt
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_MarketManufacturerSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_MarketManufacturerSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@Source nvarchar(700)
As
Begin


Create table #MarketData (MarketDataId int)
Insert into #MarketData
Select Market.MarketDataId from tblMarketData Market
Inner Join tblInvitedData Invited on Invited.MarketDataId = Market.MarketDataId AND Invited.IsAllocated=2
WHERE  (Market.TentativeExpirydate >= @FromDate  AND Market.TentativeExpirydate <= @ToDate ) And Market.BranchId=@BranchId And
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) AND Market.IsActive=1

Create table #manu (Manufacturer nvarchar(100),Cnt Varchar(100))
Insert into #manu
Select distinct Market.Manufacturer,Market.Manufacturer+' - '+Convert(char,Count(*)) AS [Cnt] from tblMarketData Market
WHERE   (Market.TentativeExpirydate >= @FromDate  AND Market.TentativeExpirydate <= @ToDate ) And 
 ((LEN(@Source)>0  And  (','+@Source+',' LIKE '%,'+Market.Source +',%')) OR (LEN(@Source)<1 )) 
 And ((@Vertical=4 AND Market.VerticalSegmentId<4) Or Market.VerticalSegmentId=@Vertical ) And Market.BranchId=@BranchId
and Market.MarketDataId not in (Select MarketDataId from #MarketData) AND Market.IsActive=1
Group by  Market.Manufacturer

Select Manufacturer Name,case when Cnt is null then Manufacturer else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from #manu tblManu

Order by cnt
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_MarketTelecallerDashboard]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--Select * from TblTelecallerInfo
--Usp_TelecallerDashboard '01-jul-2019','31-jul-2019',62
CREATE Procedure [dbo].[Usp_MarketTelecallerDashboard]
@FromDate Datetime,@ToDate Datetime,@ID int,@Vertical int,@DataTypeID int,@BranchId int 
As
Begin
Create table #Policy (MarketDataId Varchar(20))
--TotalAllocatedCases
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE   (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId  AND Policy.IsActive=1 and   ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--CollectedCases
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
 and Invited.Status=1
WHERE  (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--LostCases
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and Invited.Status=2
WHERE   (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId  AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--FollowupCases
Insert into #Policy
Select  Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
And  Invited.Status in  (4,6,8)
WHERE   (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--PendingCases
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
And Invited.Status=0
WHERE    (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId  AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--TotalAllocatedPremium
Insert into #Policy
Select Isnull(sum(Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
WHERE   (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID and Invited.BranchId=@BranchId AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--CollectedPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and Invited.Status=1
WHERE   (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--LostPremium
Insert into #Policy
Select Isnull(sum(Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
 and Invited.Status=2
WHERE ( Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--FollowupPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and Invited.Status in  (4,6,8)
WHERE  (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId  AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--PendingPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
And Invited.Status=0
WHERE (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID and Invited.BranchId=@BranchId AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--NotContactableCases 
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and  Invited.Status=5
WHERE  (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID and Invited.BranchId=@BranchId AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--NotContactablePremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
 and Invited.Status=5
WHERE     (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID and Invited.BranchId=@BranchId AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )


--AssignToCollect
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and Invited.Status=3
WHERE    (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--AssignToCollectPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and Invited.Status=3
WHERE    (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID and Invited.BranchId=@BranchId AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )

  ---Payment Link Send
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and Invited.Status=7
WHERE   (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID and Invited.BranchId=@BranchId AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
    ---Payment Link Send Premium
  Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and Invited.Status=7
WHERE    (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  
  and PermanentOwner=@ID and Invited.BranchId=@BranchId AND Policy.IsActive=1 and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
Select * from #Policy
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_MarketTeleCallerSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_MarketTeleCallerSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@Source nvarchar(700),@Manufacturer nvarchar(700)
As
Begin


Create table #MarketData (MarketDataId int)
Insert into #MarketData
Select Market.MarketDataId from tblMarketData Market
Inner Join tblInvitedData Invited on Invited.MarketDataId = Market.MarketDataId AND Invited.IsAllocated=2
WHERE  (Market.TentativeExpirydate >= @FromDate  AND Market.TentativeExpirydate <= @ToDate ) And Market.BranchId=@BranchId And  Market.IsActive=1 AND
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )

Create table #manu (Telecaller nvarchar(50),Cnt Varchar(100))
Insert into #manu
Select distinct Market.TeleCaller,Market.TeleCaller +' - '+Convert(char,Count(*)) AS [Cnt] from tblMarketData Market
WHERE   (Market.TentativeExpirydate >= @FromDate  AND Market.TentativeExpirydate <= @ToDate ) And Market.BranchId=@BranchId And  Market.IsActive=1 AND
((LEN(@Source)>0  And  (','+@Source+',' LIKE '%,'+Market.Source +',%')) OR (LEN(@Source)<1 ))  
 And  ((LEN(@Manufacturer)>0  And  (','+@Manufacturer+',' LIKE '%,'+Market.Manufacturer +',%')) OR (LEN(@Manufacturer)<1 )) AND
  ((@Vertical=4 AND Market.VerticalSegmentId<4) Or Market.VerticalSegmentId=@Vertical )
and Market.MarketDataId not in (Select MarketDataId from #MarketData)
Group By  Market.TeleCaller

Select Telecaller Name,case when Cnt is null then Telecaller else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from  #manu
Order by cnt
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_MarketTeleCallerTodayStatus]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_TeleCallerTodayStatus 62
CREATE Procedure [dbo].[Usp_MarketTeleCallerTodayStatus]
@ID int,@Vertical int,@DataTypeID int,@BranchId int 
As
Begin
Create table #Policy (MarketDataId Varchar(20))
--Expiry in Next 15 DaysPermament(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Policy.TentativeExpirydate <= CONVERT(VARCHAR(11),DATEADD(DAY,15,GETDATE()), 106))
And  Invited.PermanentOwner=@ID and Invited.BranchId=@BranchId and Policy.IsActive=1 AND Invited.Status=0 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )

--Expiry in Next 15  Temporary:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE  (Policy.TentativeExpirydate <= CONVERT(VARCHAR(11),DATEADD(DAY,15,GETDATE()), 106))  And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) 
AND    Invited.TemporaryOwner=@ID and Invited.BranchId=@BranchId  and Policy.IsActive=1 AND Invited.Status=0 And   ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--Expiry next 16-30 Days Permanent:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Policy.TentativeExpirydate >= CONVERT(VARCHAR(11),DATEADD(DAY,16,GETDATE()), 106)  AND Policy.TentativeExpirydate <= CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106) ) and
   Invited.PermanentOwner=@ID and Invited.BranchId=@BranchId and Policy.IsActive=1 AND Invited.Status=0  And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--Expiry next 16-30 Days Temporary:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
 WHERE  (Policy.TentativeExpirydate >= CONVERT(VARCHAR(11),DATEADD(DAY,16,GETDATE()), 106)  AND Policy.TentativeExpirydate <= CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106) )  And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106))
AND   Invited.TemporaryOwner=@ID and Invited.BranchId=@BranchId and Policy.IsActive=1 AND  Invited.Status=0  And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--Expiry greater than 30 Days Permament(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Policy.TentativeExpirydate > CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106) ) 
and  Invited.PermanentOwner=@ID and Invited.BranchId=@BranchId  and  Policy.IsActive=1 AND Invited.Status=0 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )

--Expiry greater than 30 Days Temporary(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
 WHERE (Policy.TentativeExpirydate > CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106))  And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106))
   and  Invited.TemporaryOwner=@ID and Invited.BranchId=@BranchId and Policy.IsActive=1 AND Invited.Status=0 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )

--Overdue(Beforetoday)Permament (Followup)
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Invited.FollowupDate < CONVERT(VARCHAR(11), GETDATE(), 106))  and Invited.Status>2
AND  Invited.PermanentOwner=@ID and Invited.BranchId=@BranchId And Policy.IsActive=1 AND ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )

--Overdue(Before today) Temporary:(Followup)
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
 WHERE (Invited.FollowupDate < CONVERT(VARCHAR(11), GETDATE(), 106))  and Invited.Status>2 And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106))
AND  Invited.TemporaryOwner=@ID and Invited.BranchId=@BranchId and  Policy.IsActive=1 AND  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--Today Permanent:(Followup)
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
 WHERE (Invited.FollowupDate = CONVERT(VARCHAR(11), GETDATE(), 106)) and Invited.Status>3
AND Invited.PermanentOwner=@ID and Invited.BranchId=@BranchId And Policy.IsActive=1 AND ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)

--Today Temporary:(Followup)
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Invited.FollowupDate = CONVERT(VARCHAR(11), GETDATE(), 106)) and Invited.Status>3 And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106))
AND   Invited.TemporaryOwner=@ID and Invited.BranchId=@BranchId And Policy.IsActive=1 AND  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)

--After Today Permament(Followup)
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
 WHERE (Invited.FollowupDate > CONVERT(VARCHAR(11), GETDATE(), 106)) and Invited.Status>2
AND    Invited.PermanentOwner=@ID  and Invited.BranchId=@BranchId And Policy.IsActive=1 AND  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)

--After Today Temporary(Followup)
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
 WHERE (Invited.FollowupDate > CONVERT(VARCHAR(11), GETDATE(), 106)) AND  Invited.Status>2 And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106))
AND  Invited.TemporaryOwner=@ID and Invited.BranchId=@BranchId And Policy.IsActive=1 AND ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)


--AssignedtoCollectStatus
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
 WHERE (Invited.AssignDate = CONVERT(VARCHAR(11), GETDATE(), 106)) and Invited.Status=3
 and Invited.PermanentOwner=@ID and Invited.BranchId=@BranchId And Policy.IsActive=1 AND ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)

--AssignedtoCollectStatusTemporaryOwner
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
 WHERE (Invited.AssignDate = CONVERT(VARCHAR(11), GETDATE(), 106)) and Invited.Status=3 And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106))
AND Invited.TemporaryOwner=@ID and Invited.BranchId=@BranchId And Policy.IsActive=1 AND ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)

Select * from #Policy
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_MarketVehiclerSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_MarketVehiclerSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@Source nvarchar(700),@Manufacturer nvarchar(700)
As
Begin


Create table #MarketData (MarketDataId int)
Insert into #MarketData
Select Market.MarketDataId from tblMarketData Market
Inner Join tblInvitedData Invited on Invited.MarketDataId = Market.MarketDataId AND Invited.IsAllocated=2
WHERE  (Market.TentativeExpirydate >= @FromDate  AND Market.TentativeExpirydate <= @ToDate ) And Market.BranchId=@BranchId And
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) AND Market.IsActive=1 

Create table #manu (Vehicle nvarchar(100),Cnt Varchar(100))
Insert into #manu
Select Market.VehicalType,Market.VehicalType+' - '+Convert(char,Count(*)) AS [Cnt] from tblMarketData Market
WHERE   (Market.TentativeExpirydate >= @FromDate  AND Market.TentativeExpirydate <= @ToDate )  And
((LEN(@Source)>0  And  (','+@Source+',' LIKE '%,'+Market.Source +',%')) OR (LEN(@Source)<1 ))  
 And  ((LEN(@Manufacturer)>0  And  (','+@Manufacturer+',' LIKE '%,'+Market.Manufacturer +',%')) OR (LEN(@Manufacturer)<1 )) AND
  ((@Vertical=4 AND Market.VerticalSegmentId<4) Or Market.VerticalSegmentId=@Vertical ) And Market.BranchId=@BranchId AND Market.IsActive=1 
and Market.MarketDataId not in (Select MarketDataId from #MarketData)
Group by  Market.VehicalType

Select Vehicle Name,case when Cnt is null then Vehicle else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from #manu tblManu

Order by cnt
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_MotorSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_MotorSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) 
As
Begin

Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1)  And Invited.BranchId=@BranchId  and
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
  
Create table #manu (ManufacturerId int,Cnt Varchar(100))
Insert into #manu
Select Policy.ManufacturerId,manu.ManufacturerName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblManufacturer Manu On Manu.ManufacturerId=Policy.ManufacturerId
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) ANd ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1)  And Policy.BranchId=@BranchId  and
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) Or (@Vertical=4 AND  Policy.VerticleId< 8))  and PolicyStatusId=1
  And Policy.PolicyId not in (Select PolicyID from #Policy )

Group by Policy.ManufacturerId,manu.ManufacturerName

Select Convert(int,tblManu.ManufacturerId)ManufacturerId,case when Cnt is null then ManufacturerName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblManufacturer tblManu
Left Join #manu on #manu.ManufacturerId=tblManu.ManufacturerId and tblManu.IsActive=1 
Where tblManu.ManufacturerId not in (86)
Order by cnt
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_NCBSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_NCBSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_NCBSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) ,@ManufacturereId nvarchar(200) 
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2
WHERE ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1)  And   Invited.BranchId=@BranchId  and ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8))  and PolicyStatusId=1

Create table #NCBSearch (NCBID int,Cnt Varchar(100))

Insert into #NCBSearch

Select 1,'Zero'+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblNCB NCB on NCB.NCBId=Policy.NCBId
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1)  And   Policy.BranchId=@BranchId  and ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId not in (Select PolicyID from #Policy) and Policy.NCBId=1

Insert into #NCBSearch
Select 2,'Non - Zero'+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblNCB NCB on NCB.NCBId=Policy.NCBId
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1)  And  Policy.BranchId=@BranchId  and  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
 and Policy.PolicyId not in (Select PolicyID from #Policy) and Policy.NCBId not in(1)

Select * from #NCBSearch
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_PolicyDocuments]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Usp_PolicyDocuments] @policyId int
as
begin
	set nocount on;
	declare @startDate datetime;
	declare @endDate datetime;
	declare @registrationNumber varchar(100);
	declare @insuranceCompany int;
	declare @documensTable as Table (Id int, DocumentType nvarchar(100), [FileName] nvarchar(100), Remarks nvarchar(200), DocId nvarchar(200), DocumentBase64 text);

	insert into @documensTable (Id, DocumentType, [FileName], Remarks,DocId,DocumentBase64)
	select document.DocumentId,[type].[Name], isnull(document.OriginalFileName,document.[FileName]), document.Remarks,document.DocId,document.DocumentBase64 from [dbo].[tblUploadedDocuments] document
	inner join [dbo].[tblDocmentType] [type] on [type].DocId = document.DocId
	where document.PolicyId = @policyId and (document.IsDelete is null or document.IsDelete = 0);

	select 
		@registrationNumber = RegistrationNo, 
		@insuranceCompany = InsuranceCompanyIdNumber,
		@startDate= StartDate,
		@endDate= ExpiryDate
	from View_SearchForm
	where PolicyId = @policyId;


	insert into @documensTable (Id, DocumentType, [FileName], Remarks,DocId,DocumentBase64)
	select document.DocumentId,[type].[Name], isnull(document.OriginalFileName,document.[FileName]), document.Remarks,document.DocId,document.DocumentBase64 from [dbo].[tblUploadedDocuments] document
	inner join [dbo].[tblDocmentType] [type] on [type].DocId = document.DocId
	where document.InspectionId in 
	(select 
		inspection.InspectionId
	from [dbo].[tblInspectionData] inspection
	where inspection.RegistrationNo = @registrationNumber 
		and inspection.ReqInsuranceCompanyId = @insuranceCompany
		and inspection.InspectionDate between DATEADD(DAY, -30, @startDate) and DATEADD(DAY, -30, @endDate)) and (document.IsDelete is null or document.IsDelete = 0);

	select * from @documensTable;
end;


--exec Usp_PolicyDocuments 1
GO
/****** Object:  StoredProcedure [dbo].[Usp_ProcForHomePageChart]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--Select * from TblTelecallerInfo
--Usp_TelecallerDashboard '01-jul-2019','31-jul-2019',62
Create Procedure [dbo].[Usp_ProcForHomePageChart]
@FromDate Datetime,@ToDate Datetime,@ID int,@Vertical int,@BranchId int
As
Begin
Create table #Policy (ProcResult Varchar(20))
--TotalAllocatedCases
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )
--CollectedCases
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId and Status=1  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )
--LostCases
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId and Status=2  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )
--FollowupCases
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId and Status in  (4,6,8)  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )
--PendingCases
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId and Status=0  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--TotalAllocatedPremium
Insert into #Policy
Select Isnull(sum(Premium),0) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--CollectedPremium
Insert into #Policy
Select Isnull(sum(Premiumoffered),0) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId and Status=1  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--LostPremium
Insert into #Policy
Select Isnull(sum(Premiumoffered),0) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId and Status=2  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--FollowupPremium
Insert into #Policy
Select Isnull(sum(Premiumoffered),0) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId and Status In (4,6,8)  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--PendingPremium
Insert into #Policy
Select Isnull(sum(Premiumoffered),0) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId and Status=0  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--NotContactableCases 
 Insert into #Policy
Select Count(*)  from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId and Status=5  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--NotContactablePremium
 Insert into #Policy
Select Isnull(sum(Premiumoffered),0) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId and Status=5  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )



--AssignToCollect
 Insert into #Policy
Select COUNT(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId and Status=3  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )


--AssignToCollectPremium
 Insert into #Policy
Select Isnull(sum(Premiumoffered),0) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId and Status=3  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )



  ---Payment Link Send
  Insert into #Policy
Select count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId and Status=7  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )


    ---Payment Link Send Premium
  Insert into #Policy
Select Isnull(sum(Premiumoffered),0) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= @FromDate  AND Policy.ExpiryDate <= @ToDate)  and PermanentOwner=@ID and BranchId=@BranchId and Status=7  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )



Select * from #Policy
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_ProcForHomePageDailyCount]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_TeleCallerTodayStatus 62
Create Procedure [dbo].[Usp_ProcForHomePageDailyCount]
@ID int,@Vertical int,@DataTypeID varchar(20),@BranchId int
As
Begin
Create table #Policy (ProcResult Varchar(20))
--Expiry in Next 15 DaysPermament(Freash Yet To Call)
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate <= CONVERT(VARCHAR(11),DATEADD(DAY,15,GETDATE()), 106))  and PermanentOwner=@ID and BranchId=@BranchId and Status=0  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--Expiry in Next 15  Temporary:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate <= CONVERT(VARCHAR(11),DATEADD(DAY,15,GETDATE()), 106))  and (TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) and TemporaryOwner=@ID and BranchId=@BranchId and Status=0  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--Expiry next 16-30 Days Permanent:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate >= CONVERT(VARCHAR(11),DATEADD(DAY,16,GETDATE()), 106) and Policy.ExpiryDate<=CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()),106))  and PermanentOwner=@ID and BranchId=@BranchId and Status=0 And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--Expiry next 16-30 Days Temporary:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE (Policy.ExpiryDate >= CONVERT(VARCHAR(11),DATEADD(DAY,16,GETDATE()), 106) and Policy.ExpiryDate<=CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()),106))  and (TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) and TemporaryOwner=@ID and BranchId=@BranchId and Status=0  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--Expiry greater than 30 Days Permament(Freash Yet To Call)
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.ExpiryDate > CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)) and PermanentOwner=@ID and BranchId=@BranchId and Status=0 And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--Expiry greater than 30 Days Temporary(Freash Yet To Call)
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE (Policy.ExpiryDate > CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106))  and (TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) and TemporaryOwner=@ID and BranchId=@BranchId and Status=0  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--Overdue(Beforetoday)Permament (Followup)
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.FollowupDate < CONVERT(VARCHAR(11),GETDATE(),106)) and PermanentOwner=@ID and BranchId=@BranchId and Status>2 And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--Overdue(Before today) Temporary:(Followup)
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE (Policy.FollowupDate <  CONVERT(VARCHAR(11),GETDATE(),106))  and (TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) and TemporaryOwner=@ID and BranchId=@BranchId and Status>2  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--Today Permanent:(Followup)
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.FollowupDate = CONVERT(VARCHAR(11),GETDATE(),106)) and PermanentOwner=@ID and BranchId=@BranchId and Status>3  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )


--Today Temporary:(Followup)
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE (Policy.FollowupDate =  CONVERT(VARCHAR(11),GETDATE(),106))  and (TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) and TemporaryOwner=@ID and BranchId=@BranchId and Status>3 And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--After Today Permament(Followup)
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.FollowupDate > CONVERT(VARCHAR(11),GETDATE(),106)) and PermanentOwner=@ID and BranchId=@BranchId and Status>2  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--After Today Temporary(Followup)
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE (Policy.FollowupDate >  CONVERT(VARCHAR(11),GETDATE(),106))  and (TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) and TemporaryOwner=@ID and BranchId=@BranchId and Status>2 And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )


--AssignedtoCollectStatus
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE  (Policy.AssignDate = CONVERT(VARCHAR(11),GETDATE(),106)) and PermanentOwner=@ID and BranchId=@BranchId and Status=3  And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )

--AssignedtoCollectStatusTemporaryOwner
Insert into #Policy
Select Count(*) from [dbo].[ViewAllDatatypeInOne] Policy
WHERE (Policy.AssignDate= CONVERT(VARCHAR(11),GETDATE(),106))  and (TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) and TemporaryOwner=@ID and BranchId=@BranchId and Status=2 And ((@Vertical=4 AND VerticalSegmentId<4) Or VerticalSegmentId=@Vertical )


Select * from #Policy
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_ProductSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ProductSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int ,@Insurencecompany nvarchar(220) ,@WholeVerticalType nvarchar(200) 
As
Begin


Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND (RenewalDone=0) And  Invited.BranchId=@BranchId and
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1

Create table #manu (ProductId int,Cnt Varchar(100))
Insert into #manu
Select Policy.ProductId,manu.ProductName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblProduct Manu On Manu.ProductId=Policy.ProductId
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) 
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
    And  ((LEN(@WholeVerticalType)>0  And  (','+@WholeVerticalType+',' LIKE '%,'+CAST(Policy.VerticleId AS varchar)+',%') ) OR ( LEN(@WholeVerticalType)<1)) 
	 AND (RenewalDone=0) and  Policy.BranchId=@BranchId And  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId not in (Select PolicyID from #Policy)
Group by Policy.ProductId,manu.ProductName

Select Convert(int,tblManu.ProductID)ProductID,case when Cnt is null then ProductName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblProduct tblManu
inner Join #manu on #manu.ProductID=tblManu.ProductID and tblManu.IsActive=1 

Order by cnt
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateBussinessby]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--Usp_Bussinessby '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateBussinessby]
@EmployeeId int,@Vertical int,@DataTypeId int ,@BranchId int    
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  
WHERE  Invited.PermanentOwner=@EmployeeId AND  
Policy.PolicyId Not IN(Select POlicyID From tblInvitedData Where PermanentOwner=@EmployeeId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) ) 
 AND (IsVerified=1)   And  Invited.BranchId=@BranchId and  Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1 And (Invited.Status!=1 And Invited.Status!=2)

Select BusinessDoneBy,BusinessDoneBy+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
WHERE  (IsVerified=1)  And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy) 
Group by BusinessDoneBy
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateDSACategorySearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_DSACategorySearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateDSACategorySearch]
@EmployeeId int,@Vertical int,@DataTypeId int,@BranchId int    
As
Begin

Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  
WHERE  Invited.PermanentOwner=@EmployeeId and 
 Policy.PolicyId Not IN(Select POlicyID From tblInvitedData Where PermanentOwner=@EmployeeId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ))
 AND (IsVerified=1) And Invited.BranchId=@BranchId and Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1 And (Invited.Status!=1 And Invited.Status!=2)
Create table #DSA (DSACategoryId int,Cnt Varchar(100))
Insert into #DSA
Select Category.DSACategoryId,Category.DSACategoryName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblDSA DSA On DSA.DSAId=Policy.DSAId
Inner Join tblDSACategory Category on Category.DSACategoryId=DSA.DSACategoryId
WHERE  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) AND (IsVerified=1) And PolicyStatusId=1 and Policy.BranchId=@BranchId
and Policy.PolicyId  in (Select PolicyID from #Policy)
Group by Category.DSACategoryId,Category.DSACategoryName

Select Distinct Convert(int,Category.DSACategoryId)DSAId,case when Cnt is null then DSACategoryName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblDSACategory Category
Left Join #DSA on #DSA.DSACategoryId=Category.DSACategoryId
where IsActive = 1 and Category.DSACategoryId > 1 and Category.DSACategoryId not in(6)

End



GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateDSASearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_DSASearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateDSASearch]
@EmployeeId int,@Vertical int ,@DataTypeId int,@BranchId int    

As
Begin

Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  
WHERE  Invited.PermanentOwner=@EmployeeId and 
 Policy.PolicyId Not IN(Select POlicyID From tblInvitedData Where PermanentOwner=@EmployeeId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical) )  
 AND (IsVerified=1) And Invited.BranchId=@BranchId  And Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) AND ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1 And (Invited.Status!=1 And Invited.Status!=2)

Create table #DSA (DSAId int,Cnt Varchar(100))
Insert into #DSA
Select Policy.DSAId,DSA.DSAName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblDSA DSA On DSA.DSAId=Policy.DSAId
WHERE  (IsVerified=1) And  Policy.BranchId=@BranchId and  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy)
Group by Policy.DSAId,DSA.DSAName

Select Convert(int,tblDSA.DSAId)DSAId,case when Cnt is null then DSAName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblDSA tblDSA
Left Join #DSA on #DSA.DSAId=tblDSA.DSAId and tblDSA.IsActive=1 
Where tblDSA.DSAId not in (6) and DSAName!='' and tblDSA.BranchId=@BranchId
Order by cnt
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateFuelType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--Usp_FuelType '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateFuelType]
@EmployeeId int,@Vertical int,@DataTypeId int,@BranchId int 
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  
WHERE  Invited.PermanentOwner=@EmployeeId AND  Policy.PolicyId 
Not IN(Select POlicyID From tblInvitedData Where PermanentOwner=@EmployeeId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) ) 
 AND (IsVerified=1)   and Invited.BranchId=@BranchId
 And  Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1 And (Invited.Status!=1 And Invited.Status!=2)
Create table #FuelType (FuelTypeId int,Cnt Varchar(100))
Insert into #FuelType
Select FuelType.FuelTypeId,FuelType.FuelTypeName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblVariant Variant on Variant.VariantId=Policy.VariantId
Inner Join tblFuelType FuelType on FuelType.FuelTypeId=Variant.FuelTypeId
WHERE   (IsVerified=1)  and Policy.BranchId=@BranchId  And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy) 
Group by FuelType.FuelTypeId,FuelType.FuelTypeName


Select Convert(int,Fuel.FuelTypeId)FuelType,case when Cnt is null then Fuel.FuelTypeName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblFuelType Fuel
Left Join #FuelType on #FuelType.FuelTypeId=Fuel.FuelTypeId where IsActive = 1 
Order by Fuel.FuelTypeName

End




GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateGrossPremiumSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



--Usp_GrossPremiumSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateGrossPremiumSearch]
@EmployeeId int,@Vertical int,@DataTypeId int,@BranchId int        
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  
WHERE  Invited.PermanentOwner=@EmployeeId AND  Policy.PolicyId
 Not IN(Select POlicyID From tblInvitedData Where PermanentOwner=@EmployeeId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) ) 
 AND (IsVerified=1)  And Invited.BranchId=@BranchId And  Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1 And (Invited.Status!=1 And Invited.Status!=2)

Create table #GrossPremium (PremiumID int,Cnt Varchar(100))

Insert into #GrossPremium

Select 1,'0-10000'+' - '+Convert(char,Count(*)) AS [Cnt]  from tblMotorPolicyData Policy
WHERE  (IsVerified=1)  And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy) and (Policy.GrossPremium>0 and Policy.GrossPremium<10001) And Policy.BranchId=@BranchId
Insert into #GrossPremium
Select 2,'10001- 25000'+' - '+Convert(char,Count(*)) AS [Cnt]  from tblMotorPolicyData Policy
WHERE   (IsVerified=1)  And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy) And (Policy.GrossPremium>10000 and Policy.GrossPremium<25001) And Policy.BranchId=@BranchId

Insert into #GrossPremium
Select 3,'25001-50000'+' - '+Convert(char,Count(*)) AS [Cnt]  from tblMotorPolicyData Policy
WHERE   (IsVerified=1)  And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy)  And (Policy.GrossPremium>25000 and Policy.GrossPremium<50001) And Policy.BranchId=@BranchId

Insert into #GrossPremium
Select 4,'>50000'+' - '+Convert(char,Count(*)) AS [Cnt]  from tblMotorPolicyData Policy
WHERE  (Policy.GrossPremium >50000) 
AND (IsVerified=1)  And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1 and Policy.PolicyId  in (Select PolicyID from #Policy)  And Policy.BranchId=@BranchId

Select * from #GrossPremium
End







GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateInsuranceSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_InsuranceSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateInsuranceSearch]
@EmployeeId int,@Vertical int,@DataTypeId int,@BranchId int         
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  
WHERE  Invited.PermanentOwner=@EmployeeId and Policy.PolicyId
 Not IN(Select POlicyID From tblInvitedData Where PermanentOwner=@EmployeeId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) ) 
 AND (IsVerified=1)   And Invited.BranchId=@BranchId And Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1 And (Invited.Status!=1 And Invited.Status!=2)
Create table #Term (InsureId int,Cnt Varchar(100))
Insert into #Term
Select InsureCompanyId ,CompanyName +' - '+Convert(char,Count(*)) AS [Cnt] from   
(Select Insurance.InsureCompanyId,Insurance.CompanyName from tblMotorPolicyData Policy
Inner Join tblInsuranceCompany Insurance on Insurance.InsureCompanyId=Policy.InsureCompanyId And Policy.PolicyPackageTypeId = 1 
WHERE IsVerified=1  And  Policy.BranchId=@BranchId And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy)
Union ALL
Select Insurance.InsureCompanyId,Insurance.CompanyName from tblMotorPolicyData Policy
Inner Join tblInsuranceCompany Insurance on Insurance.InsureCompanyId=Policy.InsureCompanyODId And Policy.PolicyPackageTypeId != 1
WHERE IsVerified=1  And  Policy.BranchId=@BranchId And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy)) As Insurence
Group by InsureCompanyId,CompanyName

Select Convert(int,Insurance.InsureCompanyId)InsureCompanyId,case when Cnt is null then Insurance.CompanyName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblInsuranceCompany Insurance
Left Join #Term on #Term.InsureId=Insurance.InsureCompanyId where IsActive = 1 AND  ((@Vertical=1 AND Insurance.InsureSegmentId In(1,2)) OR (@Vertical in (2,3) AND Insurance.InsureSegmentId In(1,3)) OR (@Vertical=4 AND Insurance.InsureSegmentId In(1,2,3))) 
Order by Insurance.CompanyName
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateLastYearTeleCallerSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateLastYearTeleCallerSearch]
@EmployeeId int,@Vertical int,@DataTypeId int,@BranchId int        
As
Begin


Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2
WHERE  Invited.PermanentOwner=@EmployeeId AND  Policy.PolicyId 
Not IN(Select POlicyID From tblInvitedData Where PermanentOwner=@EmployeeId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) ) 
 AND (IsVerified=1)   And Invited.BranchId=@BranchId And  Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1 And (Invited.Status!=1 And Invited.Status!=2)

Create table #TeleCallerInfo (TeleCallerIDId int,Cnt Varchar(100))
Insert into #TeleCallerInfo
Select Policy.TeleCallerId,manu.EmployeeName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblEmployee Manu On Manu.EmployeeId=Policy.TeleCallerId
WHERE  (IsVerified=1)  And  Policy.BranchId=@BranchId And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy)
Group by Policy.TeleCallerId,manu.EmployeeName

Select Convert(int,tblEmployee.EmployeeId)EmployeeId,case when Cnt is null then EmployeeName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblEmployee tblEmployee
Left Join #TeleCallerInfo on #TeleCallerInfo.TeleCallerIDId=tblEmployee.EmployeeId
Where tblEmployee.ISTelecaller=1 and tblEmployee.IsActive=1 and tblEmployee.BranchId=@BranchId 
Order by cnt
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateLeadPrioritySearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateLeadPrioritySearch]
@EmployeeId int,@Vertical int,@DataTypeId int,@BranchId int
As
Begin
Create table #Reference (ReferenceID int)
Insert into #Reference
Select Policy.ReferenceLeadId from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  
WHERE  Invited.PermanentOwner=@EmployeeId  And Invited.BranchId=@BranchId  and  Policy.ReferenceLeadId 
Not IN(Select ReferenceLeadId From tblInvitedData Where PermanentOwner=@EmployeeId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)) 
 AND (IsActive=1)  And Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And (Invited.Status!=1 And Invited.Status!=2)

Create table #manu (PriorityId int,Cnt Varchar(100))
Insert into #manu
Select Policy.LeadQualityId,manu.Name+' - '+Convert(char,Count(*)) AS [Cnt] from tblReferenceLead Policy
Inner Join tblCallPriority Manu On Manu.Id=Policy.LeadQualityId
WHERE  (Policy.IsActive=1)  And  Policy.BranchId=@BranchId 
and Policy.ReferenceLeadId  in (Select ReferenceID from #Reference)
Group by Policy.LeadQualityId,manu.Name

Select Convert(int,tblManu.Id)PriorityId,case when Cnt is null then Name else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblCallPriority tblManu
Left Join #manu on #manu.PriorityId=tblManu.Id and tblManu.IsActive=1 

Order by cnt
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateManufacturerSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateManufacturerSearch]
@EmployeeId int,@Vertical int,@DataTypeId int,@BranchId int  
As
Begin

Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  
WHERE  Invited.PermanentOwner=@EmployeeId  and  Policy.PolicyId 
Not IN(Select POlicyID From tblInvitedData Where PermanentOwner=@EmployeeId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ))
 AND (IsVerified=1)   And Invited.BranchId=@BranchId And  Invited.DataTypeId=@DataTypeId ANd ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  And (( @Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1 And (Invited.Status!=1 And Invited.Status!=2)

Create table #manu (ManufacturerId int,Cnt Varchar(100))
Insert into #manu
Select Policy.ManufacturerId,manu.ManufacturerName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblManufacturer Manu On Manu.ManufacturerId=Policy.ManufacturerId
WHERE  (IsVerified=1)   And Policy.BranchId=@BranchId  And  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy)
Group by Policy.ManufacturerId,manu.ManufacturerName

Select Convert(int,tblManu.ManufacturerId)ManufacturerId,case when Cnt is null then ManufacturerName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblManufacturer tblManu
Left Join #manu on #manu.ManufacturerId=tblManu.ManufacturerId and tblManu.IsActive=1 
Where tblManu.ManufacturerId not in (86)
Order by cnt
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateMarketDataSourceSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateMarketDataSourceSearch]
@EmployeeId int,@Vertical int,@DataTypeId int,@BranchId int
As
Begin


Create table #MarketData (MarketDataId int)
Insert into #MarketData
Select Market.MarketDataId from tblMarketData Market
Inner Join tblInvitedData Invited on Invited.MarketDataId = Market.MarketDataId AND Invited.IsAllocated=2
WHERE  Invited.PermanentOwner=@EmployeeId  And Invited.BranchId=@BranchId  and  Market.MarketDataId 
Not IN(Select MarketDataId From tblInvitedData Where PermanentOwner=@EmployeeId and Invited.BranchId=@BranchId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)) 
 And Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And (Invited.Status!=1 And Invited.Status!=2) AND Market.IsActive=1 


Create table #manu (DataSource nvarchar(100),Cnt Varchar(100))
Insert into #manu
Select distinct Market.Source,Market.Source+' - '+Convert(char,Count(*)) AS [Cnt] from tblMarketData Market
WHERE    Market.BranchId=@BranchId And Market.IsActive=1 AND
  ((@Vertical=4 AND Market.VerticalSegmentId<4) Or Market.VerticalSegmentId=@Vertical )
and Market.MarketDataId  in (Select MarketDataId from #MarketData)
Group By Market.Source

Select DataSource Name,case when Cnt is null then DataSource else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from  #manu
Order by cnt
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateMarketInsureSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateMarketInsureSearch]
@EmployeeId int,@Vertical int,@DataTypeId int,@BranchId int
As
Begin


Create table #MarketData (MarketDataId int)
Insert into #MarketData
Select Market.MarketDataId from tblMarketData Market
Inner Join tblInvitedData Invited on Invited.MarketDataId = Market.MarketDataId AND Invited.IsAllocated=2
WHERE  Invited.PermanentOwner=@EmployeeId  And Invited.BranchId=@BranchId  and  Market.MarketDataId 
Not IN(Select MarketDataId From tblInvitedData Where PermanentOwner=@EmployeeId and Invited.BranchId=@BranchId   and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)) 
And Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And (Invited.Status!=1 And Invited.Status!=2) AND Market.IsActive=1


Create table #manu (InsureCompany nvarchar(100),Cnt Varchar(100))
Insert into #manu
Select distinct Market.InsureCompany,Market.InsureCompany+' - '+Convert(char,Count(*)) AS [Cnt] from tblMarketData Market
WHERE    Market.BranchId=@BranchId And Market.IsActive=1 AND
  ((@Vertical=4 AND Market.VerticalSegmentId<4) Or Market.VerticalSegmentId=@Vertical )
and Market.MarketDataId  in (Select MarketDataId from #MarketData)
Group By Market.InsureCompany

Select InsureCompany Name,case when Cnt is null then InsureCompany else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from  #manu
Order by cnt
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateMarketManufacturerSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateMarketManufacturerSearch]
@EmployeeId int,@Vertical int,@DataTypeId int,@BranchId int
As
Begin


Create table #MarketData (MarketDataId int)
Insert into #MarketData
Select Market.MarketDataId from tblMarketData Market
Inner Join tblInvitedData Invited on Invited.MarketDataId = Market.MarketDataId AND Invited.IsAllocated=2
WHERE  Invited.PermanentOwner=@EmployeeId  And Invited.BranchId=@BranchId  and  Market.MarketDataId 
Not IN(Select MarketDataId From tblInvitedData Where PermanentOwner=@EmployeeId and Invited.BranchId=@BranchId  AND  TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)) 
 And Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And (Invited.Status!=1 And Invited.Status!=2) AND Market.IsActive=1


Create table #manu (Manufacturer nvarchar(50),Cnt Varchar(100))
Insert into #manu
Select distinct Market.Manufacturer,Market.Manufacturer+' - '+Convert(char,Count(*)) AS [Cnt] from tblMarketData Market
WHERE    Market.BranchId=@BranchId And Market.IsActive=1 AND
  ((@Vertical=4 AND Market.VerticalSegmentId<4) Or Market.VerticalSegmentId=@Vertical )
and Market.MarketDataId  in (Select MarketDataId from #MarketData)
Group By Market.Manufacturer

Select Manufacturer Name,case when Cnt is null then Manufacturer else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from  #manu
Order by cnt
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateMarketTelecallerSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateMarketTelecallerSearch]
@EmployeeId int,@Vertical int,@DataTypeId int,@BranchId int
As
Begin


Create table #MarketData (MarketDataId int)
Insert into #MarketData
Select Market.MarketDataId from tblMarketData Market
Inner Join tblInvitedData Invited on Invited.MarketDataId = Market.MarketDataId AND Invited.IsAllocated=2
WHERE  Invited.PermanentOwner=@EmployeeId  And Invited.BranchId=@BranchId  and  Market.MarketDataId 
Not IN(Select MarketDataId From tblInvitedData Where PermanentOwner=@EmployeeId and Invited.BranchId=@BranchId   and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)) 
 And Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And (Invited.Status!=1 And Invited.Status!=2) AND Market.IsActive=1 


Create table #manu (Telecaller nvarchar(100),Cnt Varchar(100))
Insert into #manu
Select distinct Market.TeleCaller,Market.TeleCaller+' - '+Convert(char,Count(*)) AS [Cnt] from tblMarketData Market
WHERE    Market.BranchId=@BranchId And  Market.IsActive=1 AND
  ((@Vertical=4 AND Market.VerticalSegmentId<4) Or Market.VerticalSegmentId=@Vertical )
and Market.MarketDataId  in (Select MarketDataId from #MarketData)
Group By Market.TeleCaller

Select TeleCaller Name,case when Cnt is null then TeleCaller else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from  #manu
Order by cnt
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateMarketVehicleTypeSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateMarketVehicleTypeSearch]
@EmployeeId int,@Vertical int,@DataTypeId int,@BranchId int
As
Begin


Create table #MarketData (MarketDataId int)
Insert into #MarketData
Select Market.MarketDataId from tblMarketData Market
Inner Join tblInvitedData Invited on Invited.MarketDataId = Market.MarketDataId AND Invited.IsAllocated=2
WHERE  Invited.PermanentOwner=@EmployeeId  And Invited.BranchId=@BranchId  and  Market.MarketDataId 
Not IN(Select MarketDataId From tblInvitedData Where PermanentOwner=@EmployeeId and Invited.BranchId=@BranchId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)) 
And Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And (Invited.Status!=1 And Invited.Status!=2)  AND Market.IsActive=1 


Create table #manu (VehicleType nvarchar(100),Cnt Varchar(100))
Insert into #manu
Select distinct Market.VehicalType,Market.VehicalType+' - '+Convert(char,Count(*)) AS [Cnt] from tblMarketData Market
WHERE    Market.BranchId=@BranchId And  Market.IsActive=1 AND
  ((@Vertical=4 AND Market.VerticalSegmentId<4) Or Market.VerticalSegmentId=@Vertical )
and Market.MarketDataId  in (Select MarketDataId from #MarketData)
Group By Market.VehicalType

Select VehicleType Name,case when Cnt is null then VehicleType else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from  #manu
Order by cnt
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateNCBSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_NCBSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateNCBSearch]
@EmployeeId int,@Vertical int ,@DataTypeId int ,@BranchId int 
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  
WHERE  Invited.PermanentOwner=@EmployeeId And  Policy.PolicyId
Not IN(Select POlicyID From tblInvitedData Where PermanentOwner=@EmployeeId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) ) 
 AND (IsVerified=1)  and Invited.BranchId=@BranchId  And  Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1 And (Invited.Status!=1 And Invited.Status!=2)
Create table #NCBSearch (NCBID int,Cnt Varchar(100))

Insert into #NCBSearch

Select 1,'Zero'+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblNCB NCB on NCB.NCBId=Policy.NCBId
WHERE  (IsVerified=1) and Policy.BranchId=@BranchId   And  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy) and Policy.NCBId=1

Insert into #NCBSearch
Select 2,'Non - Zero'+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblNCB NCB on NCB.NCBId=Policy.NCBId
WHERE  (IsVerified=1)  and Policy.BranchId=@BranchId  And  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy) and Policy.NCBId not in(1)

Select * from #NCBSearch
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateTermSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_TermSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateTermSearch]
@EmployeeId int,@Vertical int,@DataTypeId int ,@BranchId int  
As
Begin

Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  
WHERE  Invited.PermanentOwner=@EmployeeId And  Policy.PolicyId 
 Not IN(Select POlicyID From tblInvitedData Where PermanentOwner=@EmployeeId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical) )
 AND (IsVerified=1)   and Invited.BranchId=@BranchId And  Invited.DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1 And (Invited.Status!=1 And Invited.Status!=2)

Create table #Term (PackageId int,Cnt Varchar(100))
Insert into #Term
Select Package.PolicyPackageTypeId,Package.PolicyPackageTypeName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblPolicyTerm PolicyTerm On PolicyTerm.PolicyTermId=Policy.PolicyTermId
Inner Join tblPolicyPackageType Package on Package.PolicyPackageTypeId=PolicyTerm.PolicyPackageTypeID
WHERE  (IsVerified=1)   and Policy.BranchId=@BranchId And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy)
Group by Package.PolicyPackageTypeId,Package.PolicyPackageTypeName

Select Convert(int,Category.PolicyPackageTypeId)PackageId,case when Cnt is null then PolicyPackageTypeName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblPolicyPackageType Category
Left Join #Term on #Term.PackageId=Category.PolicyPackageTypeId
where IsActive = 1 
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateVehicleClassSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_VehicleClassSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateVehicleClassSearch]
@EmployeeId int,@Vertical int,@DataTypeId int ,@BranchId int    
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  
WHERE  Invited.PermanentOwner=@EmployeeId And  Policy.PolicyId 
Not IN(Select POlicyID From tblInvitedData Where PermanentOwner=@EmployeeId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) ) 
 AND (IsVerified=1)   and Invited.BranchId=@BranchId And   Invited.DataTypeId=@DataTypeId And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) And  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1 And (Invited.Status!=1 And Invited.Status!=2)

Create table #Term (VehicleClass int,Cnt Varchar(100))
Insert into #Term
Select Vehicle.VehicleClassId,Vehicle.VehicleClass+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblVehicleClass Vehicle on Vehicle.VehicleClassId=Policy.VehicleClassId
WHERE  (IsVerified=1)  and Policy.BranchId=@BranchId And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy)
Group by Vehicle.VehicleClassId,Vehicle.VehicleClass

Select Convert(int,Vehicle.VehicleClassId)VehicleClassId,case when Cnt is null then Vehicle.VehicleClass else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblVehicleClass Vehicle
Left Join #Term on #Term.VehicleClass=Vehicle.VehicleClassId where IsActive = 1 
Order by Vehicle.VehicleClass
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_ReallocateVerticalSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_ReallocateVerticalSearch]
@EmployeeId int,@Vertical int,@DataTypeId int,@BranchId int        
As
Begin

Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  
WHERE  Invited.PermanentOwner=@EmployeeId And  Policy.PolicyId 
Not IN(Select POlicyID From tblInvitedData Where PermanentOwner=@EmployeeId and TemporaryOwner is not null  and  TemporaryToDatedate>=GETDATE() And DataTypeId=@DataTypeId And  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) ) 
 AND (IsVerified=1)  and Invited.BranchId=@BranchId And  Invited.DataTypeId=@DataTypeId And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId > 1)  OR (@Vertical=3 AND Policy.VerticleId < 8)) and PolicyStatusId=1 And (Invited.Status!=1 And Invited.Status!=2)
Create table #manu (VerticalID int,Cnt Varchar(100))
Insert into #manu
Select Policy.VerticleId,manu.VerticalName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblVertical Manu On Manu.VerticalId=Policy.VerticleId
WHERE  (IsVerified=1)  and Policy.BranchId=@BranchId And   ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId  in (Select PolicyID from #Policy)
Group by Policy.VerticleId,manu.VerticalName

Select Convert(int,tblManu.VerticalId)VerticleId,case when Cnt is null then VerticalName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblVertical tblManu
Left Join #manu on #manu.VerticalID=tblManu.VerticalId and tblManu.IsActive=1 
Where  ((@Vertical=1 AND tblManu.VerticalId =1) OR (@Vertical=2 AND tblManu.VerticalId IN (2,3,6)) OR (@Vertical=3 AND tblManu.VerticalId IN (4,5,7))  OR (@Vertical=4 AND tblManu.VerticalId < 8))
Order by cnt
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_ReferenceTelecallerDashboard]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--Select * from TblTelecallerInfo
--Usp_TelecallerDashboard '01-jul-2019','31-jul-2019',62
CREATE Procedure [dbo].[Usp_ReferenceTelecallerDashboard]
@FromDate Datetime,@ToDate Datetime,@ID int,@Vertical int,@DataTypeID int,@BranchId int 
As
Begin
Create table #Policy (ReferenceId Varchar(20))
--TotalAllocatedCases
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE   (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId and   ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--CollectedCases
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
 and Invited.Status=1
WHERE  (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--LostCases
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
 and Invited.Status=2
WHERE   (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--FollowupCases
Insert into #Policy
Select  Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and  Invited.Status in  (4,6,8)
WHERE   (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--PendingCases
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and Invited.Status=0
WHERE    (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--TotalAllocatedPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
WHERE   (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--CollectedPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
 and Invited.Status=1
WHERE   (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--LostPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
 and Invited.Status=2
WHERE ( Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--FollowupPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and Invited.Status in  (4,6,8)
WHERE  (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--PendingPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and Invited.Status=0
WHERE (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--NotContactableCases 
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
 and  Invited.Status=5
WHERE  (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--NotContactablePremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and Invited.Status=5
WHERE     (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )


--AssignToCollect
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
 and Invited.Status=3
WHERE    (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID  and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--AssignToCollectPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and Invited.Status=3
WHERE    (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )

  ---Payment Link Send
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
 and Invited.Status=7
WHERE   (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
    ---Payment Link Send Premium
  Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2  And Invited.DataTypeId=@DataTypeID
and Invited.Status=7
WHERE    (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate ) And Policy.IsActive=1 
  and PermanentOwner=@ID and Invited.BranchId=@BranchId and  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
Select * from #Policy
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_ReferenceTeleCallerTodayStatus]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_TeleCallerTodayStatus 62
CREATE Procedure [dbo].[Usp_ReferenceTeleCallerTodayStatus]
@ID int,@Vertical int,@DataTypeID int,@BranchId int 
As
Begin
Create table #Policy (ReferenceId Varchar(20))
--Expiry in Next 15 DaysPermament(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Policy.TentitiveExpiryDate <= CONVERT(VARCHAR(11),DATEADD(DAY,15,GETDATE()), 106)) 
And   Invited.PermanentOwner=@ID and Invited.BranchId=@BranchId and Invited.Status=0 And Policy.IsActive=1 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )

--Expiry in Next 15  Temporary:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE  (Policy.TentitiveExpiryDate <= CONVERT(VARCHAR(11),DATEADD(DAY,15,GETDATE()), 106)) And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) 
AND  Invited.TemporaryOwner=@ID and Invited.BranchId=@BranchId  and Invited.Status=0 And Policy.IsActive=1 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--Expiry next 16-30 Days Permanent:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Policy.TentitiveExpiryDate >= CONVERT(VARCHAR(11),DATEADD(DAY,16,GETDATE()), 106)  AND Policy.TentitiveExpiryDate <= CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106) ) and
  Invited.PermanentOwner=@ID and Invited.BranchId=@BranchId and Invited.Status=0  And Policy.IsActive=1 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--Expiry next 16-30 Days Temporary:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID

WHERE  (Policy.TentitiveExpiryDate >= CONVERT(VARCHAR(11),DATEADD(DAY,16,GETDATE()), 106)  AND Policy.TentitiveExpiryDate <= CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106) )  
And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) AND  Invited.TemporaryOwner=@ID and Invited.BranchId=@BranchId and  Invited.Status=0  And Policy.IsActive=1 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--Expiry greater than 30 Days Permament(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Policy.TentitiveExpiryDate > CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106) ) 
and  Invited.PermanentOwner=@ID and Invited.BranchId=@BranchId and Invited.Status=0 And Policy.IsActive=1 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )

--Expiry greater than 30 Days Temporary(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Policy.TentitiveExpiryDate > CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)) 
 And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) and Invited.TemporaryOwner=@ID and Invited.BranchId=@BranchId and Invited.Status=0 And Policy.IsActive=1 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )

--Overdue(Beforetoday)Permament (Followup)
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Invited.FollowupDate < CONVERT(VARCHAR(11), GETDATE(), 106))  and Invited.Status>2
AND  Invited.PermanentOwner=@ID and Invited.BranchId=@BranchId And Policy.IsActive=1 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )

--Overdue(Before today) Temporary:(Followup)
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Invited.FollowupDate < CONVERT(VARCHAR(11), GETDATE(), 106))  and Invited.Status>2
And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) AND   Invited.TemporaryOwner=@ID and Invited.BranchId=@BranchId and   Policy.IsActive=1 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
--Today Permanent:(Followup)
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Invited.FollowupDate = CONVERT(VARCHAR(11), GETDATE(), 106)) and Invited.Status>3
AND Invited.PermanentOwner=@ID and Invited.BranchId=@BranchId And Policy.IsActive=1 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)

--Today Temporary:(Followup)
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Invited.FollowupDate = CONVERT(VARCHAR(11), GETDATE(), 106)) and Invited.Status>3
And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) AND   Invited.TemporaryOwner=@ID and Invited.BranchId=@BranchId And Policy.IsActive=1 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)

--After Today Permament(Followup)
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Invited.FollowupDate > CONVERT(VARCHAR(11), GETDATE(), 106)) AND  Invited.Status>2
AND    Invited.PermanentOwner=@ID  and Invited.BranchId=@BranchId And Policy.IsActive=1 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)

--After Today Temporary(Followup)
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Invited.FollowupDate > CONVERT(VARCHAR(11), GETDATE(), 106)) AND  Invited.Status>2
And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) AND  Invited.TemporaryOwner=@ID and Invited.BranchId=@BranchId And Policy.IsActive=1 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)


--AssignedtoCollectStatus
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Invited.AssignDate = CONVERT(VARCHAR(11), GETDATE(), 106)) and Invited.Status=3
 and Invited.PermanentOwner=@ID and Invited.BranchId=@BranchId And Policy.IsActive=1 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)

--AssignedtoCollectStatusTemporaryOwner
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 And Invited.DataTypeId=@DataTypeID
WHERE (Invited.AssignDate = CONVERT(VARCHAR(11), GETDATE(), 106)) and Invited.Status=3
And (Invited.TemporaryFromdate>=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate<=CONVERT(VARCHAR(11), GETDATE(), 106)) AND Invited.TemporaryOwner=@ID and Invited.BranchId=@BranchId And Policy.IsActive=1 And  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)

Select * from #Policy
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_RefLeadPrioritySearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_RefLeadPrioritySearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int
As
Begin


Create table #Reference (ReferenceID int)
Insert into #Reference
Select Refer.ReferenceLeadId from tblReferenceLead Refer
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Refer.ReferenceLeadId AND Invited.IsAllocated=2
WHERE  (Refer.TentitiveExpiryDate >= @FromDate  AND Refer.TentitiveExpiryDate <= @ToDate ) And Refer.IsActive=1 And Refer.BranchId=@BranchId And
  ((@Vertical=1 AND Refer.ReferenceLeadVerticalId =1) OR (@Vertical=2 AND Refer.ReferenceLeadVerticalId  IN (2,3,6))  OR (@Vertical=3 AND  Refer.ReferenceLeadVerticalId  IN (4,5,7) ) OR (@Vertical=4 AND  Refer.ReferenceLeadVerticalId < 8)) 

Create table #manu (PriorityId int,Cnt Varchar(100))
Insert into #manu
Select Refer.LeadQualityId,manu.Name+' - '+Convert(char,Count(*)) AS [Cnt] from tblReferenceLead Refer
Inner Join tblCallPriority Manu On Manu.Id=Refer.LeadQualityId
WHERE   (Refer.TentitiveExpiryDate >= @FromDate  AND Refer.TentitiveExpiryDate <= @ToDate ) And Refer.IsActive=1 And  Refer.BranchId=@BranchId And
  ((@Vertical=1 AND Refer.ReferenceLeadVerticalId =1) OR (@Vertical=2 AND Refer.ReferenceLeadVerticalId  IN (2,3,6))  OR (@Vertical=3 AND  Refer.ReferenceLeadVerticalId  IN (4,5,7) ) OR (@Vertical=4 AND  Refer.ReferenceLeadVerticalId < 8)) 
and Refer.ReferenceLeadId not in (Select ReferenceID from #Reference)
Group by Refer.LeadQualityId,manu.Name

Select Convert(int,tblManu.Id)PriorityId,case when Cnt is null then Name else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblCallPriority tblManu
Left Join #manu on #manu.PriorityId=tblManu.Id and tblManu.IsActive=1 
Order by cnt
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_RenewCompAddOnPlan]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--Usp_FuelType '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_RenewCompAddOnPlan]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int ,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) ,@ManufacturereId nvarchar(200)

As
Begin


Create table #AddOnPlan (AddOnPlanId int,Cnt Varchar(100))
Insert into #AddOnPlan
Select 1,'Yes'+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1) AND (RenewalDone=0) And   Policy.BranchId=@BranchId  and ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
 and Policy.AddonRiderId>0

Insert into #AddOnPlan
Select 2,'No'+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1) AND  (RenewalDone=0) And  Policy.BranchId=@BranchId  and  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
  and Policy.AddonRiderId=0

  Select * from #AddOnPlan

End





GO
/****** Object:  StoredProcedure [dbo].[Usp_RenewCompFuelType]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--Usp_FuelType '01-Mar-2019','31-Mar-2019'
Create Procedure [dbo].[Usp_RenewCompFuelType]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int ,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) ,@ManufacturereId nvarchar(200)

As
Begin

Create table #FuelType (FuelTypeId int,Cnt Varchar(100))
Insert into #FuelType
Select FuelType.FuelTypeId,FuelType.FuelTypeName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblVariant Variant on Variant.VariantId=Policy.VariantId
Inner Join tblFuelType FuelType on FuelType.FuelTypeId=Variant.FuelTypeId
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1)  AND (RenewalDone=0) and Policy.BranchId=@BranchId And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
Group by FuelType.FuelTypeId,FuelType.FuelTypeName


Select Convert(int,Fuel.FuelTypeId)FuelType,case when Cnt is null then Fuel.FuelTypeName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblFuelType Fuel
Left Join #FuelType on #FuelType.FuelTypeId=Fuel.FuelTypeId where IsActive = 1 
Order by Fuel.FuelTypeName

End





GO
/****** Object:  StoredProcedure [dbo].[Usp_RenewCompInsuranceSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_InsuranceSearch '01-Mar-2019','31-Mar-2019'
Create Procedure [dbo].[Usp_RenewCompInsuranceSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@PoilcyPackageID nvarchar(200),@ManufacturereId nvarchar(220) ,@VehicleType nvarchar(200)  
As
Begin

Create table #Term (InsureId int,Cnt Varchar(100))
Insert into #Term
Select InsureCompanyId ,CompanyName +' - '+Convert(char,Count(*)) AS [Cnt] from  
(Select  Insurance.InsureCompanyId InsureCompanyId,Insurance.CompanyName CompanyName  from tblMotorPolicyData Policy
Inner  Join tblInsuranceCompany Insurance on Insurance.InsureCompanyId=Policy.InsureCompanyId  And Policy.PolicyPackageTypeId = 1
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1 )) 
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) AND ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND (RenewalDone=0) And Policy.BranchId=@BranchId And
((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
Union All
Select     Insurance.InsureCompanyId InsureCompanyId,Insurance.CompanyName CompanyName from tblMotorPolicyData Policy
Inner  Join tblInsuranceCompany Insurance on Insurance.InsureCompanyId=Policy.InsureCompanyODId And Policy.PolicyPackageTypeId != 1
WHERE (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1 )) 
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) and ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND (RenewalDone=0) And Policy.BranchId=@BranchId And
((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
 ) AS Insurence
Group by CompanyName,InsureCompanyId 





Select Convert(int,Insurance.InsureCompanyId)InsureCompanyId,case when Cnt is null then Insurance.CompanyName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblInsuranceCompany Insurance
Left Join #Term on #Term.InsureId=Insurance.InsureCompanyId where IsActive = 1 and ((@Vertical=1 AND Insurance.InsureSegmentId In(1,2)) OR (@Vertical in (2,3) AND Insurance.InsureSegmentId In(1,3)) OR (@Vertical=4 AND Insurance.InsureSegmentId In(1,2,3)))
Order by Insurance.CompanyName
End





GO
/****** Object:  StoredProcedure [dbo].[Usp_RenewCompMakeYear]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--Usp_FuelType '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_RenewCompMakeYear]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int ,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) ,@ManufacturereId nvarchar(200)

As
Begin


Create table #MakeYear (MakeYearID int,Cnt Varchar(100))
Insert into #MakeYear
Select MakeYr.MakeYearId,MakeYr.MakeYear+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblMakeYear MakeYr on MakeYr.MakeYearId=Policy.MakeYearId
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1)  AND (RenewalDone=0) and Policy.BranchId=@BranchId And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
Group by MakeYr.MakeYearId,MakeYr.MakeYear


Select Convert(int,MakeYr.MakeYearID)MakeYearID,case when Cnt is null then MakeYr.MakeYear else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblMakeYear MakeYr
Left Join #MakeYear on #MakeYear.MakeYearID=MakeYr.MakeYearID where IsActive = 1 
Order by MakeYr.YearOld

End





GO
/****** Object:  StoredProcedure [dbo].[Usp_RenewCompManufacturereSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
Create Procedure [dbo].[Usp_RenewCompManufacturereSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) 
As
Begin

Create table #manu (ManufacturerId int,Cnt Varchar(100))
Insert into #manu
Select Policy.ManufacturerId,manu.ManufacturerName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblManufacturer Manu On Manu.ManufacturerId=Policy.ManufacturerId
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) ANd ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND (RenewalDone=0) And Policy.BranchId=@BranchId  and
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) Or (@Vertical=4 AND  Policy.VerticleId< 8))  and PolicyStatusId=1
  

Group by Policy.ManufacturerId,manu.ManufacturerName

Select Convert(int,tblManu.ManufacturerId)ManufacturerId,case when Cnt is null then ManufacturerName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblManufacturer tblManu
Left Join #manu on #manu.ManufacturerId=tblManu.ManufacturerId and tblManu.IsActive=1 
Where tblManu.ManufacturerId not in (86)
Order by cnt
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_RenewCompNCBSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_NCBSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_RenewCompNCBSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) ,@ManufacturereId nvarchar(200) 
As
Begin


Create table #NCBSearch (NCBID int,Cnt Varchar(100))
Insert into #NCBSearch

Select NCB.NCBId,convert(nvarchar(5),NCB.NCBPercentage)+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblNCB NCB on NCB.NCBId=Policy.NCBId
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1) AND (RenewalDone=0) And   Policy.BranchId=@BranchId  and ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
 Group by NCB.NCBId,NCB.NCBPercentage

 Select Convert(int,NCB.NCBId)NCBId,case when Cnt is null then convert(nvarchar(5),NCB.NCBPercentage) else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblNCB NCB
Left Join #NCBSearch on #NCBSearch.NCBID=NCB.NCBId where IsActive = 1 
Order by NCB.NCBId
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_RenewCompPolicyPackageSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_TermSearch '01-Mar-2019','31-Mar-2019'
Create Procedure [dbo].[Usp_RenewCompPolicyPackageSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) ,@ManufacturereId nvarchar(200)
As
Begin

Create table #Term (PackageId int,Cnt Varchar(100))
Insert into #Term
Select Package.PolicyPackageTypeId,Package.PolicyPackageTypeName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblPolicyTerm PolicyTerm On PolicyTerm.PolicyTermId=Policy.PolicyTermId
Inner Join tblPolicyPackageType Package on Package.PolicyPackageTypeId=PolicyTerm.PolicyPackageTypeID
WHERE ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1) AND (RenewalDone=0) and Policy.BranchId=@BranchId And   ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
Group by Package.PolicyPackageTypeId,Package.PolicyPackageTypeName

Select Convert(int,Category.PolicyPackageTypeId)PackageId,case when Cnt is null then PolicyPackageTypeName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblPolicyPackageType Category
Left Join #Term on #Term.PackageId=Category.PolicyPackageTypeId
where IsActive = 1 
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_RenewCompRTOZone]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--Usp_FuelType '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_RenewCompRTOZone]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int ,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) ,@ManufacturereId nvarchar(200)

As
Begin


Create table #RTOZone (RTOZoneID int,Cnt Varchar(100))
Insert into #RTOZone
Select RTOZone.RTOZoneId,RTOZone.RTOZoneName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblRTOZone RTOZone on RTOZone.RTOZoneId=Policy.RTOZoneId
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1)  AND (RenewalDone=0) and Policy.BranchId=@BranchId And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
Group by RTOZone.RTOZoneId,RTOZone.RTOZoneName

Select Convert(int,RTOZone.RTOZoneId)RTOZoneId,case when Cnt is null then RTOZone.RTOZoneName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblRTOZone RTOZone
Left Join #RTOZone on #RTOZone.RTOZoneID=RTOZone.RTOZoneId where IsActive = 1 
Order by RTOZone.RTOZoneId

End





GO
/****** Object:  StoredProcedure [dbo].[Usp_RenewCompVehicleClassSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_VehicleClassSearch '01-Mar-2019','31-Mar-2019'
Create Procedure [dbo].[Usp_RenewCompVehicleClassSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@ManufacturereId nvarchar(200) 
As
Begin

Create table #Term (VehicleClass int,Cnt Varchar(100))
Insert into #Term
Select Vehicle.VehicleClassId,Vehicle.VehicleClass+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblVehicleClass Vehicle on Vehicle.VehicleClassId=Policy.VehicleClassId
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',u' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) And ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1) AND (RenewalDone=0) and Policy.BranchId=@BranchId  And   ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
Group by Vehicle.VehicleClassId,Vehicle.VehicleClass

Select Convert(int,Vehicle.VehicleClassId)VehicleClassId,case when Cnt is null then Vehicle.VehicleClass else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblVehicleClass Vehicle
Left Join #Term on #Term.VehicleClass=Vehicle.VehicleClassId where IsActive = 1 
Order by Vehicle.VehicleClass
End





GO
/****** Object:  StoredProcedure [dbo].[Usp_RPT_MarketStatusCountExpiryDatewise]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--Select * from TblTelecallerInfo
--Usp_TelecallerDashboard '01-jul-2019','31-jul-2019',62
CREATE Procedure [dbo].[Usp_RPT_MarketStatusCountExpiryDatewise]
@FromDate Datetime,@ToDate Datetime,@ID int,@Vertical int,@DataTypeID int,@BranchId int
As
Begin
Create table #Policy (PolicyID Varchar(20))
--TotalAllocatedCases
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId   AND Invited.IsAllocated=2  and Invited.DataTypeId=@DataTypeID
WHERE  (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) and PermanentOwner=@ID AND Policy.IsActive=1
--CollectedCases
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and Invited.Status=1
WHERE    (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID AND Policy.IsActive=1
--LostCases
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and Invited.Status=2
WHERE    (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) and PermanentOwner=@ID AND Policy.IsActive=1
--FollowupCases
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and Invited.Status=4
WHERE    (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID AND Policy.IsActive=1
--PendingCases
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
WHERE    (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) and Invited.Status=0 and PermanentOwner=@ID AND Policy.IsActive=1


--TotalAllocatedPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
WHERE   (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) and PermanentOwner=@ID AND Policy.IsActive=1
--CollectedPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and Invited.Status=1
WHERE    (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID AND Policy.IsActive=1
--LostPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and Invited.Status=2
WHERE   (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID AND Policy.IsActive=1
--FollowupPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and Invited.Status=4
WHERE   (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID AND Policy.IsActive=1
--PendingPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
WHERE   (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)  and Invited.Status=0 and PermanentOwner=@ID AND Policy.IsActive=1

--NotContactableCases 
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and  Invited.Status=5
WHERE  (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) and PermanentOwner=@ID AND Policy.IsActive=1
--NotContactablePremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and Invited.Status=5
WHERE   (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID AND Policy.IsActive=1



--AssignToCollect
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and Invited.Status=3
WHERE  (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID AND Policy.IsActive=1
--AssignToCollectPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and Invited.Status=3
WHERE   (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID AND Policy.IsActive=1


  ---Payment Link Send
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and Invited.Status=7
WHERE  (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID AND Policy.IsActive=1

    ---Payment Link Send Premium
  Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and Invited.Status=7
WHERE   (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID AND Policy.IsActive=1

  --AssignToVisit 
Insert into #Policy
Select Count(*) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and  Invited.Status=6
WHERE  (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID AND Policy.IsActive=1
--AssignToVisitePremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMarketData Policy
Inner Join tblInvitedData Invited on Invited.MarketDataId = Policy.MarketDataId    AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and Invited.Status=6
WHERE (Policy.TentativeExpirydate >= @FromDate  AND Policy.TentativeExpirydate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID AND Policy.IsActive=1


Select * from #Policy
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_RPT_ReferenceStatusCountExpiryDatewise]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--Select * from TblTelecallerInfo
--Usp_TelecallerDashboard '01-jul-2019','31-jul-2019',62
CREATE Procedure [dbo].[Usp_RPT_ReferenceStatusCountExpiryDatewise]
@FromDate Datetime,@ToDate Datetime,@ID int,@Vertical int,@DataTypeID int,@BranchId int
As
Begin
Create table #Policy (PolicyID Varchar(20))
--TotalAllocatedCases
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2  and Invited.DataTypeId=@DataTypeID
WHERE  (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) and PermanentOwner=@ID
--CollectedCases
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
 and Invited.Status=1
WHERE    (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID
--LostCases
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
 and Invited.Status=2
WHERE    (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) and PermanentOwner=@ID
--FollowupCases
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
 and Invited.Status=4
WHERE    (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID
--PendingCases
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
and Invited.Status=0
WHERE    (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID


--TotalAllocatedPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
WHERE   (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) and PermanentOwner=@ID
--CollectedPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
 and Invited.Status=1
WHERE    (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID
--LostPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
 and Invited.Status=2
WHERE   (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID
--FollowupPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
 and Invited.Status=4
WHERE   (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID
--PendingPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
WHERE   (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical)  and Invited.Status=0 and PermanentOwner=@ID

--NotContactableCases 
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
 and  Invited.Status=5
WHERE  (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical ) and PermanentOwner=@ID
--NotContactablePremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
 and Invited.Status=5
WHERE   (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID



--AssignToCollect
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
 and Invited.Status=3
WHERE  (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID
--AssignToCollectPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
 and Invited.Status=3
WHERE   (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID


  ---Payment Link Send
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
 and Invited.Status=7
WHERE  (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID

    ---Payment Link Send Premium
  Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
 and Invited.Status=7
WHERE   (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID

  --AssignToVisit 
Insert into #Policy
Select Count(*) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
 and  Invited.Status=6
WHERE  (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID
--AssignToVisitePremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblReferenceLead Policy
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Policy.ReferenceLeadId   AND Invited.IsAllocated=2 and Invited.DataTypeId=@DataTypeID
 and Invited.Status=6
WHERE (Policy.TentitiveExpiryDate >= @FromDate  AND Policy.TentitiveExpiryDate <= @ToDate )  AND Invited.BranchId=@BranchId and
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )  and PermanentOwner=@ID


Select * from #Policy
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_RPT_RenewLostStatusCountExpiryDatewise]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--Select * from TblTelecallerInfo
--Usp_TelecallerDashboard '01-jul-2019','31-jul-2019',62
CREATE Procedure [dbo].[Usp_RPT_RenewLostStatusCountExpiryDatewise]
@FromDate Datetime,@ToDate Datetime,@ID int,@Vertical int,@DataTypeID nvarchar(20),@BranchId int
As
Begin
Create table #Policy (PolicyID Varchar(20))
--TotalAllocatedCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID
--CollectedCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
and Invited.Status=1
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID
--LostCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
and Invited.Status=2
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID
--FollowupCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
and Invited.Status=4
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID
--PendingCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and Invited.Status=0 and PermanentOwner=@ID


--TotalAllocatedPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID
--CollectedPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=1
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID
--LostPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=2
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID
--FollowupPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=4
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID
--PendingPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8))  and PolicyStatusId=1 and Invited.Status=0

--NotContactableCases 
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=5
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID
--NotContactablePremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=5
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID



--AssignToCollect
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
and Invited.Status=3
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID
--AssignToCollectPremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=3
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID


  ---Payment Link Send
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
and Invited.Status=7
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID

    ---Payment Link Send Premium
  Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
and Invited.Status=7
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID

  --AssignToVisit 
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and  Invited.Status=6
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID
--AssignToVisitePremium
Insert into #Policy
Select Isnull(sum(Invited.Premiumoffered),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=6
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND Invited.BranchId=@BranchId and
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID




Select * from #Policy
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_RPTInstantPendingRecord]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_InsuranceSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_RPTInstantPendingRecord]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int, @DocType int,@Insurencecompany int  
As
Begin
Create table #Policy (PolicyID int)

if @DocType=2  ---PYP
BEGIN
Insert into #Policy
SELECT 
    [Filter1].[PolicyId1] AS [PolicyId]
    FROM   (SELECT [Extent1].[VerticleId],[Extent1].InsureCompanyId,[Extent1].InsureCompanyODId,[Extent1].[PolicyId] AS [PolicyId1], [Extent1].[LoyaltyCounter] AS [LoyaltyCounter], [Extent1].[PreviousPolicyId] AS [PreviousPolicyId], [Extent1].[PolicyStartDate] AS [PolicyStartDate], [Extent1].[BranchId] AS [BranchId], [Extent1].[PolicyStartDateOD] AS [PolicyStartDateOD], [Extent1].[PolicyPackageTypeId] AS [PolicyPackageTypeId], [Extent2].[FileName] AS [FileName]
        FROM  [dbo].[tblMotorPolicyData] AS [Extent1]
        LEFT OUTER JOIN [dbo].[tblUploadedDocuments] AS [Extent2] ON ([Extent2].DocId=3) AND ([Extent1].[PolicyId] = [Extent2].[PolicyID])
        WHERE 1 =  CAST( [Extent1].[IsActive] AS int) ) AS [Filter1]
    LEFT OUTER JOIN [dbo].[tblUploadedDocuments] AS [Extent3] ON ([Extent3].DocId=2) AND ([Filter1].[PreviousPolicyId] = [Extent3].[PolicyID])
    WHERE  ((@Vertical=1 AND [Filter1].[VerticleId] =1) OR (@Vertical=2 AND [Filter1].[VerticleId] >1 ) OR (@Vertical=3) ) And ([Filter1].[BranchId] = @BranchId) AND ((([Filter1].[PolicyStartDate] >= @FromDate) AND ([Filter1].[PolicyStartDate] <= @ToDate) AND (1 = [Filter1].[PolicyPackageTypeId])) OR (([Filter1].[PolicyStartDateOD] >= @FromDate) AND ([Filter1].[PolicyStartDateOD] <= @ToDate) AND (2 = [Filter1].[PolicyPackageTypeId])) OR (([Filter1].[PolicyStartDateOD] >= @FromDate) AND ([Filter1].[PolicyStartDateOD] <= @ToDate) AND (3 = [Filter1].[PolicyPackageTypeId]))) AND (CASE WHEN (([Filter1].[FileName] IS NULL) AND ([Filter1].[LoyaltyCounter] > 0)) THEN [Extent3].[FileName] ELSE [Filter1].[FileName] END IS NOT NULL)
	AND ((@Insurencecompany>0  And  @Insurencecompany=(Case [Filter1].PolicyPackageTypeId When 1 then [Filter1].InsureCompanyId Else [Filter1].InsureCompanyODId End))  OR @Insurencecompany<1 )
 END
if @DocType=3  ---RN
BEGIN
Insert into #Policy
 SELECT 
    [Extent1].[PolicyId] AS [PolicyId]
    FROM  [dbo].[tblMotorPolicyData] AS [Extent1]
    INNER JOIN [dbo].[tblUploadedDocuments] AS [Extent2] ON [Extent1].[PolicyId] = [Extent2].[PolicyID]
    WHERE  ((@Vertical=1 AND [Extent1].[VerticleId] =1) OR (@Vertical=2 AND [Extent1].[VerticleId] >1 )  OR (@Vertical=3)) And ([Extent1].[BranchId] = @BranchId) AND (1 =  CAST( [Extent1].[IsActive] AS int)) AND ((([Extent1].PolicyEndDate >= @FromDate) AND ([Extent1].PolicyEndDate <= @ToDate) AND (1 = [Extent1].[PolicyPackageTypeId])) OR (([Extent1].PolicyEndDateOD >= @FromDate) AND ([Extent1].PolicyEndDateOD <= @ToDate) AND (2 = [Extent1].[PolicyPackageTypeId])) OR (([Extent1].PolicyEndDateOD >= @FromDate) AND ([Extent1].PolicyEndDateOD <= @ToDate) AND (3 = [Extent1].[PolicyPackageTypeId]))) AND ([Extent2].DocId=12)
	AND ((@Insurencecompany>0  And  @Insurencecompany=(Case [Extent1].PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End))  OR @Insurencecompany<1 )

END
Else --CYP
BEGIN
Insert into #Policy
 SELECT 
    [Extent1].[PolicyId] AS [PolicyId]
    FROM  [dbo].[tblMotorPolicyData] AS [Extent1]
    INNER JOIN [dbo].[tblUploadedDocuments] AS [Extent2] ON [Extent1].[PolicyId] = [Extent2].[PolicyID]
    WHERE  ((@Vertical=1 AND [Extent1].[VerticleId] =1) OR (@Vertical=2 AND [Extent1].[VerticleId] >1 )  OR (@Vertical=3)) And ([Extent1].[BranchId] = @BranchId) AND (1 =  CAST( [Extent1].[IsActive] AS int)) AND ((([Extent1].[PolicyStartDate] >= @FromDate) AND ([Extent1].[PolicyStartDate] <= @ToDate) AND (1 = [Extent1].[PolicyPackageTypeId])) OR (([Extent1].[PolicyStartDateOD] >= @FromDate) AND ([Extent1].[PolicyStartDateOD] <= @ToDate) AND (2 = [Extent1].[PolicyPackageTypeId])) OR (([Extent1].[PolicyStartDateOD] >= @FromDate) AND ([Extent1].[PolicyStartDateOD] <= @ToDate) AND (3 = [Extent1].[PolicyPackageTypeId]))) AND ([Extent2].DocId=2)
	AND ((@Insurencecompany>0  And  @Insurencecompany=(Case [Extent1].PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End))  OR @Insurencecompany<1 )

END

SELECT 
    [Extent1].[PolicyId] AS [PolicyId], 
    [Extent1].[ControlNo] AS [ControlNo], 
    CASE WHEN (1 = [Extent1].[PolicyPackageTypeId]) THEN [Extent1].[PolicyNo] ELSE [Extent1].[PolicyNoOD] END AS [PolicyNo], 
    [Extent1].[CoverNoteNo] AS [CoverNoteNo], 
    [Extent5].[CustomerName] AS [CustomerName], 
    CASE WHEN (1 = [Extent1].[PolicyPackageTypeId]) THEN [Extent2].[CompanyName] ELSE [Extent3].[CompanyName] END AS InsureCompanyName, 
    [Extent1].[RegistrationNo] AS [RegistrationNo], 
    [Extent7].[NCBPercentage] AS [NCBPercentage], 
    [Extent9].[DSAName] AS [DSAName], 
    [Extent1].[TotalGrossPremium] AS [TotalGrossPremium], 
    [Extent1].[OD] AS [OD], 
    [Extent8].[AddonRiderName] AS [AddonRiderName], 
    CASE WHEN (1 = [Extent1].[PolicyPackageTypeId]) THEN [Extent1].[PolicyEndDate] ELSE [Extent1].[PolicyEndDateOD] END AS PolicyExpiryDate, 
    CASE WHEN (1 = [Extent1].[PolicyPackageTypeId]) THEN [Extent1].[PolicyStartDate] ELSE [Extent1].[PolicyStartDateOD] END AS PolicyStartDate, 
    [Extent6].[ManufacturerName] AS [ManufacturerName], 
    [Extent10].[VerticalName] AS [VerticalName], 
    [Extent11].[ModelName] AS [ModelName], 
    [Extent12].[ProductName] AS [ProductName], 
    [Extent1].[AddonPlanDetail] AS [AddonPlanDetail], 
    CASE WHEN (1 = [Extent1].[PolicyStatusId]) THEN N'Active' ELSE N'Cancel' END AS PolicyStatus,Renewal.Declined
    FROM            [dbo].[tblMotorPolicyData] AS [Extent1]
    INNER JOIN [dbo].[tblInsuranceCompany] AS [Extent2] ON [Extent1].[InsureCompanyId] =  CAST( [Extent2].[InsureCompanyId] AS int)
    LEFT OUTER JOIN [dbo].[tblInsuranceCompany] AS [Extent3] ON [Extent1].[InsureCompanyODId] =  CAST( [Extent3].[InsureCompanyId] AS int)
    LEFT OUTER JOIN [dbo].[tblPolicyTerm] AS [Extent4] ON [Extent1].[PolicyTermId] = [Extent4].[PolicyTermId]
    INNER JOIN [dbo].[tblCustomer] AS [Extent5] ON [Extent1].[CustomerId] = [Extent5].[CustomerId]
    LEFT OUTER JOIN [dbo].[tblManufacturer] AS [Extent6] ON [Extent1].[ManufacturerId] = [Extent6].[ManufacturerId]
    LEFT OUTER JOIN [dbo].[tblNCB] AS [Extent7] ON [Extent1].[NCBId] = [Extent7].[NCBId]
    LEFT OUTER JOIN [dbo].[tblAddonRider] AS [Extent8] ON [Extent1].[AddonRiderId] = [Extent8].[AddonRiderId]
    LEFT OUTER JOIN [dbo].[tblDSA] AS [Extent9] ON [Extent1].[DSAId] = [Extent9].[DSAId]
    INNER JOIN [dbo].[tblVertical] AS [Extent10] ON [Extent1].[VerticleId] = [Extent10].[VerticalId]
    LEFT OUTER JOIN [dbo].[tblModel] AS [Extent11] ON [Extent1].[ModelId] = [Extent11].[ModelId]
    LEFT OUTER JOIN [dbo].[tblProduct] AS [Extent12] ON [Extent1].[ProductId] =  CAST( [Extent12].[ProductId] AS int)
	left Outer join [dbo].tblRenewalData As Renewal on [Extent1].PolicyId=Renewal.PolicyId
	left OUTER JOIN #Policy ON [Extent1].PolicyId =#Policy.PolicyID
    WHERE #Policy.PolicyID is NULL AND  ([Extent1].[BranchId] = @BranchId) AND (1 =  CAST( [Extent1].[IsActive] AS int)) AND 
	( ( @DocType=3  And ((([Extent1].PolicyEndDate >= @FromDate) AND ([Extent1].PolicyEndDate <= @ToDate) AND (1 = [Extent1].[PolicyPackageTypeId])) OR (([Extent1].PolicyEndDateOD >= @FromDate) AND ([Extent1].PolicyEndDateOD <= @ToDate) AND (2 = [Extent1].[PolicyPackageTypeId])) OR (([Extent1].PolicyEndDateOD >= @FromDate) AND ([Extent1].PolicyEndDateOD <= @ToDate) AND (3 = [Extent1].[PolicyPackageTypeId]))) )
	 OR ( ( @DocType=2 OR @DocType=1 ) AND  ((([Extent1].[PolicyStartDate] >= @FromDate) AND ([Extent1].[PolicyStartDate] <= @ToDate) AND (1 = [Extent1].[PolicyPackageTypeId])) OR (([Extent1].[PolicyStartDateOD] >= @FromDate) AND ([Extent1].[PolicyStartDateOD] <= @ToDate) AND (2 = [Extent1].[PolicyPackageTypeId])) OR (([Extent1].[PolicyStartDateOD] >= @FromDate) AND ([Extent1].[PolicyStartDateOD] <= @ToDate) AND (3 = [Extent1].[PolicyPackageTypeId])))) )
	AND ((@Vertical=1 AND [Extent1].[VerticleId] =1) OR (@Vertical=2 AND [Extent1].[VerticleId] >1 )  OR (@Vertical=3)) AND (1 = [Extent10].[IsActive])
	AND ((@Insurencecompany>0  And  @Insurencecompany=(Case [Extent1].PolicyPackageTypeId When 1 then [Extent1].InsureCompanyId Else [Extent1].InsureCompanyODId End))  OR @Insurencecompany<1 )

	
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_TelecallerDashboard]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--Select * from TblTelecallerInfo
--Usp_TelecallerDashboard '01-jul-2019','31-jul-2019',62
CREATE Procedure [dbo].[Usp_TelecallerDashboard]
@FromDate Datetime,@ToDate Datetime,@ID int,@Vertical int,@DataTypeID nvarchar(20),@BranchId int
As
Begin
Create table #Policy (PolicyID Varchar(20))
--TotalAllocatedCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--CollectedCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=1
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--LostCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=2
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--FollowupCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and  Invited.Status in  (4,6,8)
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--PendingCases
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
And Invited.Status=0
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1   and Invited.BranchId=@BranchId  and PermanentOwner=@ID


--TotalAllocatedPremium
Insert into #Policy
Select  Isnull(FLOOR(sum(case when (convert(decimal(12,2),PremiumWithAddon) >0 and @Vertical=1) then convert(decimal(12,2),PremiumWithAddon) when Renewal.InvitedPremium>0 then  Renewal.InvitedPremium else Policy.TotalGrossPremium End)),0) from tblMotorPolicyData Policy
Inner Join tblRenewalData Renewal On Policy.PolicyId=Renewal.PolicyId
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--CollectedPremium
Insert into #Policy
Select Isnull(FLOOR(sum(Invited.Premiumoffered)),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=1
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--LostPremium
Insert into #Policy
Select Isnull(FLOOR(sum(case when (convert(decimal(12,2),PremiumWithAddon) >0) then convert(decimal(12,2),PremiumWithAddon) when Renewal.InvitedPremium>0 then  Renewal.InvitedPremium else Policy.TotalGrossPremium End)),0) from tblMotorPolicyData Policy
Inner Join tblRenewalData Renewal On Policy.PolicyId=Renewal.PolicyId
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=2
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--FollowupPremium
Insert into #Policy
Select Isnull(FLOOR(sum(case when convert(decimal(12,2),PremiumWithAddon) >0 then convert(decimal(12,2),PremiumWithAddon) when Renewal.InvitedPremium>0 then  Renewal.InvitedPremium else Policy.TotalGrossPremium End)),0) from tblMotorPolicyData Policy
Inner Join tblRenewalData Renewal On Policy.PolicyId=Renewal.PolicyId
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status in  (4,6,8)
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--PendingPremium
Insert into #Policy
Select Isnull(FLOOR(sum(case when convert(decimal(12,2),PremiumWithAddon) >0 then convert(decimal(12,2),PremiumWithAddon) when Renewal.InvitedPremium>0 then  Renewal.InvitedPremium else Policy.TotalGrossPremium End)),0) from tblMotorPolicyData Policy
Inner Join tblRenewalData Renewal On Policy.PolicyId=Renewal.PolicyId
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
And Invited.Status=0
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8))  and PolicyStatusId=1 and  Invited.BranchId=@BranchId and PermanentOwner=@ID

--NotContactableCases 
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and  Invited.Status=5
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--NotContactablePremium
Insert into #Policy
Select Isnull(FLOOR(sum(case when convert(decimal(12,2),PremiumWithAddon) >0 then convert(decimal(12,2),PremiumWithAddon) when Renewal.InvitedPremium>0 then  Renewal.InvitedPremium else Policy.TotalGrossPremium End)),0) from tblMotorPolicyData Policy
Inner Join tblRenewalData Renewal On Policy.PolicyId=Renewal.PolicyId
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=5
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId



--AssignToCollect
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=3
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
 ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId
--AssignToCollectPremium
Insert into #Policy
Select Isnull(FLOOR(sum(Invited.Premiumoffered)),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=3
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId


  ---Payment Link Send
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=7
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId

    ---Payment Link Send Premium
  Insert into #Policy
Select Isnull(FLOOR(sum(Invited.Premiumoffered)),0) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2  And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
 and Invited.Status=7
WHERE   ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND 
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and PermanentOwner=@ID and Invited.BranchId=@BranchId

Select * from #Policy
End



GO
/****** Object:  StoredProcedure [dbo].[Usp_TeleCallerTodayStatus]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_TeleCallerTodayStatus 62
CREATE Procedure [dbo].[Usp_TeleCallerTodayStatus]
@ID int,@Vertical int,@DataTypeID varchar(20),@BranchId int
As
Begin
Create table #Policy (PolicyID Varchar(20))
--Expiry in Next 15 DaysPermament(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE (( Policy.PolicyEndDate <= CONVERT(VARCHAR(11),DATEADD(DAY,15,GETDATE()), 106)  And Policy.PolicyPackageTypeId = 1) OR
 ( Policy.PolicyEndDateOD <= CONVERT(VARCHAR(11),DATEADD(DAY,15,GETDATE()), 106)  And Policy.PolicyPackageTypeId in (2,3)))  AND (IsVerified=1) --15 Days-
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.PermanentOwner=@ID and Invited.Status=0  and Invited.BranchId=@BranchId

--Expiry in Next 15  Temporary:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE  ((Policy.PolicyEndDate <= CONVERT(VARCHAR(11),DATEADD(DAY,15,GETDATE()), 106)  And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD <= CONVERT(VARCHAR(11),DATEADD(DAY,15,GETDATE()), 106)  And Policy.PolicyPackageTypeId in (2,3)))  AND (IsVerified=1)  And (CAST(TemporaryFromdate AS DATE )<=CAST(GetDate() AS DATE) and CAST(TemporaryToDatedate AS DATE)>= CAST(GetDate() AS DATE)) and
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.TemporaryOwner=@ID and Invited.Status=0 and Invited.BranchId=@BranchId
--Expiry next 16-30 Days Permanent:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE ((Policy.PolicyEndDate >= CONVERT(VARCHAR(11),DATEADD(DAY,16,GETDATE()), 106)  AND Policy.PolicyEndDate <= CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)  And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >=CONVERT(VARCHAR(11),DATEADD(DAY,16,GETDATE()), 106)   AND Policy.PolicyEndDateOD <= CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106) And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) 
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.PermanentOwner=@ID and Invited.Status=0  and Invited.BranchId=@BranchId
--Expiry next 16-30 Days Temporary:(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE  ((Policy.PolicyEndDate >= CONVERT(VARCHAR(11),DATEADD(DAY,16,GETDATE()), 106)  AND Policy.PolicyEndDate <= CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)  And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >=CONVERT(VARCHAR(11),DATEADD(DAY,16,GETDATE()), 106)   AND Policy.PolicyEndDateOD <= CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)  And Policy.PolicyPackageTypeId in (2,3)))  AND (IsVerified=1) 
AND  (Invited.TemporaryFromdate<=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate>=CONVERT(VARCHAR(11), GETDATE(), 106)) and ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.TemporaryOwner=@ID and  Invited.Status=0  and Invited.BranchId=@BranchId
--Expiry greater than 30 Days Permament(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE ((Policy.PolicyEndDate > CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)    And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD > CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)  And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) 
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.PermanentOwner=@ID and Invited.Status=0  and Invited.BranchId=@BranchId

--Expiry greater than 30 Days Temporary(Freash Yet To Call)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE ((Policy.PolicyEndDate > CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)    And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD > CONVERT(VARCHAR(11),DATEADD(DAY,30,GETDATE()), 106)  And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) 
AND  (Invited.TemporaryFromdate<=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate>=CONVERT(VARCHAR(11), GETDATE(), 106)) and ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.TemporaryOwner=@ID and Invited.Status=0  and Invited.BranchId=@BranchId

--Overdue(Beforetoday)Permament (Followup)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'
WHERE (Invited.FollowupDate < CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1) and Invited.Status>2
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and Invited.PermanentOwner=@ID  and Invited.BranchId=@BranchId
--Overdue(Before today) Temporary:(Followup)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'

WHERE (Invited.FollowupDate < CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1) and Invited.Status>2 and  (Invited.TemporaryFromdate<=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate>=CONVERT(VARCHAR(11), GETDATE(), 106))
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and Invited.TemporaryOwner=@ID  and Invited.BranchId=@BranchId
--Today Permanent:(Followup)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'

WHERE (Invited.FollowupDate = CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1)  and Invited.Status>3 
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and Invited.PermanentOwner=@ID  and Invited.BranchId=@BranchId

--Today Temporary:(Followup)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'

WHERE (Invited.FollowupDate = CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1)  and Invited.Status>3 and  (Invited.TemporaryFromdate<=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate>=CONVERT(VARCHAR(11), GETDATE(), 106))
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and Invited.TemporaryOwner=@ID  and Invited.BranchId=@BranchId
--After Today Permament(Followup)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'

WHERE (Invited.FollowupDate > CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1) and Invited.Status>2
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.PermanentOwner=@ID  and Invited.BranchId=@BranchId

--After Today Temporary(Followup)
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'

WHERE (Invited.FollowupDate > CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1) And Invited.Status>2 and  (Invited.TemporaryFromdate<=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate>=CONVERT(VARCHAR(11), GETDATE(), 106))
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.TemporaryOwner=@ID  and Invited.BranchId=@BranchId


--AssignedtoCollectStatus
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'

WHERE (Invited.AssignDate = CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1) and Invited.Status=3
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.PermanentOwner=@ID  and Invited.BranchId=@BranchId

--AssignedtoCollectStatusTemporaryOwner
Insert into #Policy
Select Count(*) from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 And ','+@DataTypeID+',' LIKE '%,'+CAST(Invited.DataTypeId AS varchar)+',%'

WHERE (Invited.AssignDate = CONVERT(VARCHAR(11), GETDATE(), 106)) AND (IsVerified=1) and Invited.Status=3 and  (Invited.TemporaryFromdate<=CONVERT(VARCHAR(11), GETDATE(), 106) and Invited.TemporaryToDatedate>=CONVERT(VARCHAR(11), GETDATE(), 106))
AND  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1  and Invited.TemporaryOwner=@ID  and Invited.BranchId=@BranchId

Select * from #Policy
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_TermSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_TermSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_TermSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@Insurencecompany nvarchar(220) ,@VehicleType nvarchar(200) ,@ManufacturereId nvarchar(200)
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2
WHERE ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1) and Invited.BranchId=@BranchId And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1

Create table #Term (PackageId int,Cnt Varchar(100))
Insert into #Term
Select Package.PolicyPackageTypeId,Package.PolicyPackageTypeName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblPolicyTerm PolicyTerm On PolicyTerm.PolicyTermId=Policy.PolicyTermId
Inner Join tblPolicyPackageType Package on Package.PolicyPackageTypeId=PolicyTerm.PolicyPackageTypeID
WHERE ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@VehicleType)>0  And  (','+@VehicleType+',' LIKE '%,'+CAST(Policy.VehicleClassId AS varchar)+',%') ) OR ( LEN(@VehicleType)<1)) 
  And ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) and ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1) and Policy.BranchId=@BranchId And   ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId not in (Select PolicyID from #Policy)
Group by Package.PolicyPackageTypeId,Package.PolicyPackageTypeName

Select Convert(int,Category.PolicyPackageTypeId)PackageId,case when Cnt is null then PolicyPackageTypeName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblPolicyPackageType Category
Left Join #Term on #Term.PackageId=Category.PolicyPackageTypeId
where IsActive = 1 
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_UnallocateInsuranceSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_InsuranceSearch '01-Mar-2019','31-Mar-2019'
Create Procedure [dbo].[Usp_UnallocateInsuranceSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@TelecallerId int 
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 and Invited.Status=0
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) 
 AND (IsVerified=1) AND (RenewalDone=0) And Invited.BranchId=@BranchId and ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
 And  ((@TelecallerId>0 and Invited.PermanentOwner=@TelecallerId) OR (@TelecallerId=0))

Create table #Term (InsureId int,Cnt Varchar(100))
Insert into #Term
Select InsureCompanyId ,CompanyName +' - '+Convert(char,Count(*)) AS [Cnt] from  
(Select  Insurance.InsureCompanyId InsureCompanyId,Insurance.CompanyName CompanyName  from tblMotorPolicyData Policy
Inner  Join tblInsuranceCompany Insurance on Insurance.InsureCompanyId=Policy.InsureCompanyId  And Policy.PolicyPackageTypeId = 1
WHERE  Policy.PolicyId  in (Select PolicyID from #Policy)
Union All
Select     Insurance.InsureCompanyId InsureCompanyId,Insurance.CompanyName CompanyName from tblMotorPolicyData Policy
Inner  Join tblInsuranceCompany Insurance on Insurance.InsureCompanyId=Policy.InsureCompanyODId And Policy.PolicyPackageTypeId != 1
WHERE  Policy.PolicyId in (Select PolicyID from #Policy)) AS Insurence
Group by CompanyName,InsureCompanyId 



Select Convert(int,Insurance.InsureCompanyId)InsureCompanyId,case when Cnt is null then Insurance.CompanyName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblInsuranceCompany Insurance
Left Join #Term on #Term.InsureId=Insurance.InsureCompanyId where IsActive = 1 and ((@Vertical=1 AND Insurance.InsureSegmentId In(1,2)) OR (@Vertical in (2,3) AND Insurance.InsureSegmentId In(1,3)) OR (@Vertical=4 AND Insurance.InsureSegmentId In(1,2,3)))
Order by Insurance.CompanyName
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_UnAllocateManufacturerSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
Create Procedure [dbo].[Usp_UnAllocateManufacturerSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@TelecallerId int 
As
Begin


Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 and Invited.Status=0
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND (RenewalDone=0) And Invited.BranchId=@BranchId  and
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
  And  ((@TelecallerId>0 and Invited.PermanentOwner=@TelecallerId) OR (@TelecallerId=0))

Create table #manu (ManufacturerId int,Cnt Varchar(100))
Insert into #manu
Select Policy.ManufacturerId,manu.ManufacturerName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblManufacturer Manu On Manu.ManufacturerId=Policy.ManufacturerId
WHERE  Policy.PolicyId  in (Select PolicyID from #Policy)
Group by Policy.ManufacturerId,manu.ManufacturerName

Select Convert(int,tblManu.ManufacturerId)ManufacturerId,case when Cnt is null then ManufacturerName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblManufacturer tblManu
Left Join #manu on #manu.ManufacturerId=tblManu.ManufacturerId and tblManu.IsActive=1 
Where tblManu.ManufacturerId not in (86)
Order by cnt
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_UnallocateMarketDataSourceSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_UnallocateMarketDataSourceSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@TelecallerId int
As
Begin


Create table #MarketData (MarketDataId int)
Insert into #MarketData
Select Market.MarketDataId from tblMarketData Market
Inner Join tblInvitedData Invited on Invited.MarketDataId = Market.MarketDataId AND Invited.IsAllocated=2 and Invited.Status=0
WHERE  (Market.TentativeExpirydate >= @FromDate  AND Market.TentativeExpirydate <= @ToDate ) And Market.BranchId=@BranchId And
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
  And  ((@TelecallerId>0 and Invited.PermanentOwner=@TelecallerId) OR (@TelecallerId=0))  AND Market.IsActive=1

Create table #manu (DataSource nvarchar(50),Cnt Varchar(100))
Insert into #manu
Select Market.Source,Market.Source+' - '+Convert(char,Count(*)) AS [Cnt] from tblMarketData Market
WHERE   Market.MarketDataId  in (Select MarketDataId from #MarketData) 
Group By Market.Source

Select DataSource Name,case when Cnt is null then DataSource else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from  #manu
Order by cnt
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_UnallocateMarketManufacturerSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_UnallocateMarketManufacturerSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@TelecallerId int
As
Begin


Create table #MarketData (MarketDataId int)
Insert into #MarketData
Select Market.MarketDataId from tblMarketData Market
Inner Join tblInvitedData Invited on Invited.MarketDataId = Market.MarketDataId AND Invited.IsAllocated=2 and Invited.Status=0
WHERE  (Market.TentativeExpirydate >= @FromDate  AND Market.TentativeExpirydate <= @ToDate ) And Market.BranchId=@BranchId And
  ((@Vertical=4 AND Invited.VerticalSegmentId<4) Or Invited.VerticalSegmentId=@Vertical )
   And  ((@TelecallerId>0 and Invited.PermanentOwner=@TelecallerId) OR (@TelecallerId=0))  AND Market.IsActive=1

Create table #manu (Manufacturer nvarchar(100),Cnt Varchar(100))
Insert into #manu
Select distinct Market.Manufacturer,Market.Manufacturer+' - '+Convert(char,Count(*)) AS [Cnt] from tblMarketData Market
WHERE   Market.MarketDataId  in (Select MarketDataId from #MarketData)
Group by  Market.Manufacturer

Select Manufacturer Name,case when Cnt is null then Manufacturer else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from #manu tblManu

Order by cnt
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_UnallocateRefLeadPrioritySearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
Create Procedure [dbo].[Usp_UnallocateRefLeadPrioritySearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@TelecallerId int
As
Begin


Create table #Reference (ReferenceID int)
Insert into #Reference
Select Refer.ReferenceLeadId from tblReferenceLead Refer
Inner Join tblInvitedData Invited on Invited.ReferenceLeadId = Refer.ReferenceLeadId AND Invited.IsAllocated=2 and Invited.Status=0
WHERE  (Refer.TentitiveExpiryDate >= @FromDate  AND Refer.TentitiveExpiryDate <= @ToDate ) And Refer.IsActive=1 And Refer.BranchId=@BranchId And
  ((@Vertical=1 AND Refer.ReferenceLeadVerticalId =1) OR (@Vertical=2 AND Refer.ReferenceLeadVerticalId  IN (2,3,6))  OR (@Vertical=3 AND  Refer.ReferenceLeadVerticalId  IN (4,5,7) ) OR (@Vertical=4 AND  Refer.ReferenceLeadVerticalId < 8)) 
     And  ((@TelecallerId>0 and Invited.PermanentOwner=@TelecallerId) OR (@TelecallerId=0))

Create table #manu (PriorityId int,Cnt Varchar(100))
Insert into #manu
Select Refer.LeadQualityId,manu.Name+' - '+Convert(char,Count(*)) AS [Cnt] from tblReferenceLead Refer
Inner Join tblCallPriority Manu On Manu.Id=Refer.LeadQualityId
WHERE  Refer.ReferenceLeadId  in (Select ReferenceID from #Reference)
Group by Refer.LeadQualityId,manu.Name

Select Convert(int,tblManu.Id)PriorityId,case when Cnt is null then Name else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblCallPriority tblManu
Left Join #manu on #manu.PriorityId=tblManu.Id and tblManu.IsActive=1 
Order by cnt
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_UnallocateTermSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_TermSearch '01-Mar-2019','31-Mar-2019'
Create Procedure [dbo].[Usp_UnallocateTermSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@TelecallerId int
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 and Invited.Status=0
WHERE ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1) AND  (RenewalDone=0) and Invited.BranchId=@BranchId And ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
 And  ((@TelecallerId>0 and Invited.PermanentOwner=@TelecallerId) OR (@TelecallerId=0))

Create table #Term (PackageId int,Cnt Varchar(100))
Insert into #Term
Select Package.PolicyPackageTypeId,Package.PolicyPackageTypeName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblPolicyTerm PolicyTerm On PolicyTerm.PolicyTermId=Policy.PolicyTermId
Inner Join tblPolicyPackageType Package on Package.PolicyPackageTypeId=PolicyTerm.PolicyPackageTypeID
WHERE Policy.PolicyId  in (Select PolicyID from #Policy)
Group by Package.PolicyPackageTypeId,Package.PolicyPackageTypeName

Select Convert(int,Category.PolicyPackageTypeId)PackageId,case when Cnt is null then PolicyPackageTypeName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblPolicyPackageType Category
Left Join #Term on #Term.PackageId=Category.PolicyPackageTypeId
where IsActive = 1 
End

GO
/****** Object:  StoredProcedure [dbo].[Usp_UnAllocateVerticalSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
create Procedure [dbo].[Usp_UnAllocateVerticalSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@TelecallerId int 
As
Begin


Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2 and Invited.Status=0
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND (RenewalDone=0) And Invited.BranchId=@BranchId  and
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
  And  ((@TelecallerId>0 and Invited.PermanentOwner=@TelecallerId) OR (@TelecallerId=0))

Create table #manu (VerticalID int,Cnt Varchar(100))
Insert into #manu
Select Policy.VerticleId,manu.VerticalName+' - '+Convert(char,Count(*)) AS [Cnt]  from tblMotorPolicyData Policy
Inner Join tblVertical Manu On Manu.VerticalId=Policy.VerticleId
WHERE  Policy.PolicyId  in (Select PolicyID from #Policy)
Group by Policy.VerticleId,manu.VerticalName

Select Convert(int,tblManu.VerticalId)VerticleId,case when Cnt is null then VerticalName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblVertical tblManu
Left Join #manu on #manu.VerticalID=tblManu.VerticalId and tblManu.IsActive=1 
Where   ((@Vertical=1 AND tblManu.VerticalId =1) OR (@Vertical=2 AND tblManu.VerticalId IN (2,3,6) )  OR (@Vertical=3 AND  tblManu.VerticalId IN (4,5,7) ) OR (@Vertical=4 AND  tblManu.VerticalId< 8))
Order by cnt
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_UploadedDocuments]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Usp_UploadedDocuments] @inspectionId int
as
begin

declare @inspectionDate datetime;
declare @registrationNumber nvarchar(50);
declare @insuranceCompanyId int;
declare @documensTable as Table (Id int, DocumentType nvarchar(100), [FileName] nvarchar(100), Remarks nvarchar(200));
	
	begin
		select 
			@inspectionDate = InspectionDate,
			@registrationNumber = RegistrationNo,	
			@insuranceCompanyId = ReqInsuranceCompanyId
		from [dbo].[tblInspectionData] where InspectionId = @inspectionId;
			
		insert into @documensTable (Id, DocumentType, [FileName], Remarks)
		select document.DocumentId,[type].[Name], isnull(document.OriginalFileName,document.[FileName]), document.Remarks from [dbo].[tblUploadedDocuments] document
		inner join [dbo].[tblDocmentType] [type] on [type].DocId = document.DocId
		where [type].Code in ('inspection','rc','invoice','pyp') and document.InspectionId = @inspectionId and (document.IsDelete is null or document.IsDelete = 0);

		insert into @documensTable (Id, DocumentType, [FileName], Remarks)
		select document.DocumentId,[type].[Name], isnull(document.OriginalFileName,document.[FileName]), document.Remarks from [dbo].[tblUploadedDocuments] document
		inner join [dbo].[tblDocmentType] [type] on [type].DocId = document.DocId
		inner join [dbo].[View_SearchForm] policyData on policyData.PolicyId = document.PolicyId
		where [type].Code in ('inspection','rc','invoice','pyp')
				and (document.IsDelete is null or document.IsDelete = 0)
				and policyData.RegistrationNo = @registrationNumber 
				and policyData.InsuranceCompanyIdNumber = @insuranceCompanyId
				and @inspectionDate between DATEADD(DAY, -30, policyData.StartDate)  and DATEADD(DAY, -30, policyData.ExpiryDate);

		select * from @documensTable;
	end
end

--exec Usp_UploadedDocuments 6

GO
/****** Object:  StoredProcedure [dbo].[Usp_VehicleClassSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_VehicleClassSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_VehicleClassSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@PoilcyPackageID nvarchar(200),@Insurencecompany nvarchar(220) ,@ManufacturereId nvarchar(200) 
As
Begin
Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2
WHERE ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1)  and Invited.BranchId=@BranchId And   ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1

Create table #Term (VehicleClass int,Cnt Varchar(100))
Insert into #Term
Select Vehicle.VehicleClassId,Vehicle.VehicleClass+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblVehicleClass Vehicle on Vehicle.VehicleClassId=Policy.VehicleClassId
WHERE  (( LEN(@PoilcyPackageID)>0  And  (','+@PoilcyPackageID+',' LIKE '%,'+CAST(Policy.PolicyPackageTypeId AS varchar)+',%') ) OR ( LEN(@PoilcyPackageID)<1 ))
  And  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 ))
  And  ((LEN(@ManufacturereId)>0  And  (','+@ManufacturereId+',u' LIKE '%,'+CAST(Policy.ManufacturerId AS varchar)+',%') ) OR ( LEN(@ManufacturereId)<1)) And ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3)))
 AND (IsVerified=1)  and Policy.BranchId=@BranchId  And   ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1
and Policy.PolicyId not in (Select PolicyID from #Policy)
Group by Vehicle.VehicleClassId,Vehicle.VehicleClass

Select Convert(int,Vehicle.VehicleClassId)VehicleClassId,case when Cnt is null then Vehicle.VehicleClass else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblVehicleClass Vehicle
Left Join #Term on #Term.VehicleClass=Vehicle.VehicleClassId where IsActive = 1 
Order by Vehicle.VehicleClass
End




GO
/****** Object:  StoredProcedure [dbo].[Usp_VertcalBaseTelecaller]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_VertcalBaseTelecaller]
@VerticalSegmentID int,@BranchId int 
As
Begin

Select Convert(int,tblEmployee.EmployeeId)Id, EmployeeName  Name 
 from tblEmployee tblEmployee  inner join tbl_CRM_User usertbl on tblEmployee.EmployeeId=usertbl.EmployeeId
 inner join tbl_CRM_UserRoles VRole on usertbl.UserRoleId=VRole.CRM_RoleID
Where tblEmployee.ISTelecaller=1 And tblEmployee.BranchId=@BranchId and  tblEmployee.IsActive=1   AND (VRole.VerticalSegmentId like ('%'++CAST(@VerticalSegmentID AS varchar)+'%') OR VRole.VerticalSegmentId=4) and  
 ((@VerticalSegmentID=1 AND tblEmployee.IsMotor=1) Or (@VerticalSegmentID=2 AND tblEmployee.IsHealth=1) OR (@VerticalSegmentID=3 AND tblEmployee.IsCommercial=1) OR (@VerticalSegmentID=4))
Order by Name
End


GO
/****** Object:  StoredProcedure [dbo].[Usp_VerticalSearch]    Script Date: 5/4/2023 2:32:59 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--Usp_MotorSearch '01-Mar-2019','31-Mar-2019'
CREATE Procedure [dbo].[Usp_VerticalSearch]
@FromDate Datetime,@ToDate Datetime,@Vertical int,@BranchId int,@Insurencecompany nvarchar(220) 
As
Begin


Create table #Policy (PolicyID int)
Insert into #Policy
Select Policy.PolicyId from tblMotorPolicyData Policy
Inner Join tblInvitedData Invited on Invited.PolicyId = Policy.PolicyId AND Invited.IsAllocated=2
WHERE  ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND (RenewalDone=0) And 
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and Invited.BranchId=@BranchId

Create table #manu (VerticalID int,Cnt Varchar(100))
Insert into #manu
Select Policy.VerticleId,manu.VerticalName+' - '+Convert(char,Count(*)) AS [Cnt] from tblMotorPolicyData Policy
Inner Join tblVertical Manu On Manu.VerticalId=Policy.VerticleId
WHERE  ((LEN(@Insurencecompany)>0  And  (','+@Insurencecompany+',' LIKE '%,'+CAST((Case Policy.PolicyPackageTypeId When 1 then InsureCompanyId Else InsureCompanyODId End)  AS varchar)+',%') ) OR ( LEN(@Insurencecompany)<1 )) And ((Policy.PolicyEndDate >= @FromDate  AND Policy.PolicyEndDate <= @ToDate And Policy.PolicyPackageTypeId = 1) OR
 (Policy.PolicyEndDateOD >= @FromDate  AND Policy.PolicyEndDateOD <= @ToDate And Policy.PolicyPackageTypeId in (2,3))) AND (IsVerified=1) AND (RenewalDone=0) And 
  ((@Vertical=1 AND Policy.VerticleId =1) OR (@Vertical=2 AND Policy.VerticleId IN (2,3,6) AND Policy.ProductId Not IN (8,12,14))  OR (@Vertical=3 AND  Policy.VerticleId IN (4,5,7) AND Policy.ProductId Not IN (22)) OR (@Vertical=4 AND  Policy.VerticleId< 8)) and PolicyStatusId=1 and Policy.BranchId=@BranchId
and Policy.PolicyId not in (Select PolicyID from #Policy)
Group by Policy.VerticleId,manu.VerticalName

Select Convert(int,tblManu.VerticalId)VerticleId,case when Cnt is null then VerticalName else cnt End cnt 
,convert(bit,(case when Cnt is null then 0 else 1 End)) Value from tblVertical tblManu
Left Join #manu on #manu.VerticalID=tblManu.VerticalId and tblManu.IsActive=1 
Where   ((@Vertical=1 AND tblManu.VerticalId =1) OR (@Vertical=2 AND tblManu.VerticalId IN (2,3,6) )  OR (@Vertical=3 AND  tblManu.VerticalId IN (4,5,7) ) OR (@Vertical=4 AND  tblManu.VerticalId< 8))
Order by cnt
End



GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "tblCustomer"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 264
            End
            DisplayFlags = 280
            TopColumn = 7
         End
         Begin Table = "tblMotorPolicyData"
            Begin Extent = 
               Top = 20
               Left = 352
               Bottom = 150
               Right = 583
            End
            DisplayFlags = 280
            TopColumn = 165
         End
         Begin Table = "tblCluster"
            Begin Extent = 
               Top = 270
               Left = 38
               Bottom = 400
               Right = 239
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblMonthCycle"
            Begin Extent = 
               Top = 402
               Left = 38
               Bottom = 532
               Right = 283
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "CommMonthCycle"
            Begin Extent = 
               Top = 534
               Left = 38
               Bottom = 664
               Right = 283
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 3030
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
     ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'PolicyDataView'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'    Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'PolicyDataView'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'PolicyDataView'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[10] 4[6] 2[52] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 18
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewAllDatatypeInOne'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewAllDatatypeInOne'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "tblCustomerCareData"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 233
            End
            DisplayFlags = 280
            TopColumn = 8
         End
         Begin Table = "tblVertical"
            Begin Extent = 
               Top = 138
               Left = 38
               Bottom = 268
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblInsuranceCompany"
            Begin Extent = 
               Top = 270
               Left = 38
               Bottom = 400
               Right = 235
            End
            DisplayFlags = 280
            TopColumn = 19
         End
         Begin Table = "tblSubStatus"
            Begin Extent = 
               Top = 272
               Left = 507
               Bottom = 402
               Right = 680
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblCallType"
            Begin Extent = 
               Top = 270
               Left = 273
               Bottom = 400
               Right = 443
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblModel"
            Begin Extent = 
               Top = 402
               Left = 38
               Bottom = 532
               Right = 209
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblMakeYear"
            Begin Extent = 
               Top = 402
               Left = 247
               Bottom = 532
               Right = 417
    ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'viewCustomerCare'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'        End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblProduct"
            Begin Extent = 
               Top = 534
               Left = 38
               Bottom = 664
               Right = 229
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 2925
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'viewCustomerCare'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'viewCustomerCare'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "tblModel"
            Begin Extent = 
               Top = 246
               Left = 236
               Bottom = 366
               Right = 400
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblCustomerCareData"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 126
               Right = 256
            End
            DisplayFlags = 280
            TopColumn = 86
         End
         Begin Table = "tblVertical"
            Begin Extent = 
               Top = 6
               Left = 294
               Bottom = 126
               Right = 470
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblInsuranceCompany"
            Begin Extent = 
               Top = 126
               Left = 38
               Bottom = 246
               Right = 222
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblMotorPolicyData"
            Begin Extent = 
               Top = 390
               Left = 265
               Bottom = 510
               Right = 483
            End
            DisplayFlags = 280
            TopColumn = 86
         End
         Begin Table = "tblUser"
            Begin Extent = 
               Top = 510
               Left = 104
               Bottom = 630
               Right = 276
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblEmployee"
            Begin Extent = 
               Top = 423
               Left = 505
               Bottom = 543
               Right = 679
 ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewCustomerCareCrossSell'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'           End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblDSA"
            Begin Extent = 
               Top = 126
               Left = 463
               Bottom = 246
               Right = 628
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblCallType"
            Begin Extent = 
               Top = 246
               Left = 38
               Bottom = 366
               Right = 198
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblMakeYear"
            Begin Extent = 
               Top = 246
               Left = 438
               Bottom = 366
               Right = 598
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblProduct"
            Begin Extent = 
               Top = 366
               Left = 38
               Bottom = 486
               Right = 217
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 9
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 5670
         Alias = 900
         Table = 2250
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewCustomerCareCrossSell'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewCustomerCareCrossSell'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[31] 4[5] 2[46] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Extent1"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 269
            End
            DisplayFlags = 280
            TopColumn = 14
         End
         Begin Table = "Extent2"
            Begin Extent = 
               Top = 6
               Left = 307
               Bottom = 136
               Right = 504
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Extent3"
            Begin Extent = 
               Top = 6
               Left = 542
               Bottom = 136
               Right = 739
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Extent4"
            Begin Extent = 
               Top = 6
               Left = 777
               Bottom = 136
               Right = 977
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Extent5"
            Begin Extent = 
               Top = 138
               Left = 38
               Bottom = 268
               Right = 264
            End
            DisplayFlags = 280
            TopColumn = 31
         End
         Begin Table = "Extent6"
            Begin Extent = 
               Top = 138
               Left = 302
               Bottom = 268
               Right = 495
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Extent7"
            Begin Extent = 
               Top = 138
               Left = 533
               Bottom = 268
               Right = 705
            End
            DisplayFlags = 280
 ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewMasterWithMotorPolicy'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'           TopColumn = 0
         End
         Begin Table = "Extent8"
            Begin Extent = 
               Top = 138
               Left = 743
               Bottom = 268
               Right = 927
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Extent9"
            Begin Extent = 
               Top = 270
               Left = 38
               Bottom = 400
               Right = 212
            End
            DisplayFlags = 280
            TopColumn = 1
         End
         Begin Table = "Extent10"
            Begin Extent = 
               Top = 270
               Left = 250
               Bottom = 400
               Right = 435
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblMakeYear"
            Begin Extent = 
               Top = 403
               Left = 38
               Bottom = 533
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "tblPlan"
            Begin Extent = 
               Top = 405
               Left = 246
               Bottom = 535
               Right = 429
            End
            DisplayFlags = 280
            TopColumn = 2
         End
         Begin Table = "Extent11"
            Begin Extent = 
               Top = 270
               Left = 473
               Bottom = 400
               Right = 644
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Extent12"
            Begin Extent = 
               Top = 270
               Left = 682
               Bottom = 400
               Right = 873
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 47
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 2250
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 3690
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewMasterWithMotorPolicy'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane3', @value=N'
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewMasterWithMotorPolicy'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewMasterWithMotorPolicy'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[29] 4[17] 2[36] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewPendingCommission'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewPendingCommission'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "tblCustomer"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 264
            End
            DisplayFlags = 280
            TopColumn = 1
         End
         Begin Table = "tblMotorPolicyData"
            Begin Extent = 
               Top = 41
               Left = 402
               Bottom = 171
               Right = 633
            End
            DisplayFlags = 280
            TopColumn = 100
         End
         Begin Table = "tblInsuredPerson"
            Begin Extent = 
               Top = 81
               Left = 845
               Bottom = 211
               Right = 1049
            End
            DisplayFlags = 280
            TopColumn = 2
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 9
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewPersonDataBirthdayWish'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewPersonDataBirthdayWish'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[22] 4[20] 2[40] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 9
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewReferenceLeads'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'ViewReferenceLeads'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[21] 4[25] 2[36] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'viewRenewPerformance'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'viewRenewPerformance'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[24] 4[17] 2[23] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 26
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'viewRenewPerformanceNonMotor'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'viewRenewPerformanceNonMotor'
GO
USE [master]
GO
ALTER DATABASE [PolicyManagerQA] SET  READ_WRITE 
GO
