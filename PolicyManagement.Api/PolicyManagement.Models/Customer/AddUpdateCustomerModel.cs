using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace PolicyManagement.Models.Customer
{
    public class AddUpdateCustomerModel
    {
        public int Id { get; set; }
        public byte BranchId { get; set; }
        public short CustomerNameSalutation { get; set; }
        public string CustomerName { get; set; }
        public int CustomerType { get; set; }
        public short CustomerContactSalutation { get; set; }
        public string CustomerContact { get; set; }
        public bool DecisionMaker { get; set; }
        public int CustomerCluster { get; set; }
        public short CompanyTerritory { get; set; }
        public string Address1 { get; set; }
        public short City1 { get; set; }
        public string Pincode1 { get; set; }
        public string Gstin1 { get; set; }
        public string Address2 { get; set; }
        public short City2 { get; set; }
        public string Pincode2 { get; set; }
        public string Gstin2 { get; set; }
        public string Address3 { get; set; }
        public short City3 { get; set; }
        public string Pincode3 { get; set; }
        public string Gstin3 { get; set; }
        public string Mobile1 { get; set; }
        public string Mobile2 { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }
        public string Email1 { get; set; }
        public string Email2 { get; set; }
        public bool CommunicationOptOut1 { get; set; }
        public bool CommunicationOptOut2 { get; set; }
        public bool CommunicationOptOut3 { get; set; }
        public bool CommunicationOptOut4 { get; set; }
        public short SelectedPolicyAddress { get; set; }
        public short SelectedWhatsAppCommunication { get; set; }
        public short SelectedMobileCommunication { get; set; }
        public byte ReferBy { get; set; }
        public int Pos { get; set; }
        public int TeamMember { get; set; }
        public int Reference { get; set; }
        public string Pan { get; set; }
        public string DateOfBirth { get; set; }
        public string DateOfAnniversary { get; set; }
        public string Aadhaar { get; set; }
        public short MaritalStatus { get; set; }
        public byte NumberOfDependent { get; set; }
        public int Profession { get; set; }
        public int LineOfBusiness { get; set; }
        public int Industry { get; set; }
        public int Designation { get; set; }
        public bool IsPos { get; set; }
        public bool IsTeamMember { get; set; }
        public string PassportNumber { get; set; }
        public Nullable<short> Gender { get; set; }

    }
}
