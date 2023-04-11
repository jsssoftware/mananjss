using System;

namespace PolicyManagement.Dtos.Customer
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public string ClusterName { get; set; }
        public string Code { get; set; }
        public string City { get; set; }
        public string PinCode { get; set; }
        public string Type { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Gender { get; set; }

    }

    public class ClusterCustomerDto:CustomerDto
    {

        public string Profession { get; set; }
        public string Aadhar { get; set; }
        public string Pan { get; set; }
        public string Email { get; set; }
        public string Passport { get; set; }
        public short? GenderId { get; set; }
        public short? City { get; set; }
        public short BranchId { get; set; }
        public int CustomerId { get; set; }
        public int? ClusterId { get; set; }
        public int UniqueId { get; set; }


    }
}