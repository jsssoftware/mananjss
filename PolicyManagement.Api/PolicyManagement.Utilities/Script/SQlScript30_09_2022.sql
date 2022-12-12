 
GO
/****** Object:  Table [dbo].[tblMenuItem]    Script Date: 30-09-2022 08:43:06 ******/
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
SET IDENTITY_INSERT [dbo].[tblMenuItem] ON 
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (1, N'Dashboard', N'Home', N'account_circle', NULL, N'/user/dashboard', 1, 1)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (2, N'PolicyManagement', N'Policy Management', N'account_circle', NULL, NULL, 1, 2)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (3, N'SubSystem', N'Sub System', N'account_circle', NULL, NULL, 1, 3)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (4, N'Master', N'Masters', N'account_circle', NULL, NULL, 1, 5)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (5, N'Report', N'Reports', N'account_circle', NULL, NULL, 1, 4)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (6, N'UserManagement', N'User Management', N'account_circle', NULL, NULL, 1, 6)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (7, N'Motor', N'Motor', N'account_circle', 2, N'/user/motor', 1, 1)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (8, N'Retail', N'Retail', N'account_circle', 2, NULL, 1, 2)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (9, N'Commerical', N'Commercial', N'account_circle', 2, NULL, 1, 3)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (10, N'Life', N'Life', N'account_circle', 2, NULL, 1, 4)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (11, N'Health', N'Health', N'account_circle', 8, NULL, 1, 1)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (12, N'Travel', N'Travel', N'account_circle', 8, NULL, 1, 2)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (13, N'PA', N'PA', N'account_circle', 8, NULL, 1, 3)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (14, N'Fire', N'Fire', N'account_circle', 9, NULL, 1, 1)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (15, N'Marine', N'Marine', N'account_circle', 9, NULL, 1, 2)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (16, N'Liability', N'Liability', N'account_circle', 9, NULL, 1, 3)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (17, N'Engineering', N'Engineering', N'account_circle', 9, NULL, 1, 1)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (18, N'GMC', N'GMC', N'account_circle', 9, NULL, 1, 5)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (19, N'Misc', N'Misc', N'account_circle', 9, NULL, 1, 6)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (20, N'Inspection', N'Inspection', N'account_circle', 3, N'/user/inspection', 1, 1)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (21, N'Voucher', N'Voucher', N'account_circle', 3, N'/user/voucher', 1, 2)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (22, N'Claims', N'Claims', N'account_circle', 3, NULL, 1, 3)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (23, N'Endorement', N'Endorement', N'account_circle', 3, NULL, 1, 4)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (24, N'SearchPolicy', N'Search Policy', N'account_circle', 3, NULL, 1, 5)
GO
INSERT [dbo].[tblMenuItem] ([Id], [Name], [DisplayName], [Icon], [ParentNode], [Link], [IsActive], [OrderNo]) VALUES (25, N'Customer', N'Customer', N'account_circle', 4, NULL, 1, 1)
GO
SET IDENTITY_INSERT [dbo].[tblMenuItem] OFF
GO
ALTER TABLE [dbo].[tblMenuItem] ADD  CONSTRAINT [DF_tblMenuItem_OrderNo]  DEFAULT ((0)) FOR [OrderNo]
GO
ALTER TABLE [dbo].[tblMenuItem]  WITH CHECK ADD  CONSTRAINT [FK_tblMenuItem_tblMenuItem] FOREIGN KEY([ParentNode])
REFERENCES [dbo].[tblMenuItem] ([Id])
GO
ALTER TABLE [dbo].[tblMenuItem] CHECK CONSTRAINT [FK_tblMenuItem_tblMenuItem]
GO
