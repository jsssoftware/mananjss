using System;

namespace PolicyManagement.Dtos.Customer
{
    public class CustomerShortDetailDto
    {
        public string NameInPolicy { get; set; }
        public string AddressInPolicy { get; set; }
        public string CustomerCode { get; set; }
        public string ClusterCode { get; set; }
        public string Email { get; set; }
        public string Cluster { get; set; }
        public string CustomerType { get; set; }
        public string ContactPerson { get; set; }
        public string ContactNumber { get; set; }
        public string Pan { get; set; }
        public string Gstin { get; set; }
        public int CustomerId { get; set; }
        public string Gender { get; set; }
        public string DateOfBirth { get; set; }
        public string PassportNumber { get; set; } 
        public Nullable<short> GenderId { get; set; }
        public int? ClusterId { get; set; }
        public string AadhaarNo { get; set; }
        public string Profession { get; set; }
        public int? CityId { get; set; }
        public int? ReferById { get; set; }
        public int? ReferenceId { get; set; }
        public int? PosId { get; set; }
        public int? TeamMemberId { get; set; }


    }
}