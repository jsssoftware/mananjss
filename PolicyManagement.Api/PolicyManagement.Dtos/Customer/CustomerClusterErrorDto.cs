using System.Collections.Generic;

namespace PolicyManagement.Dtos.Customer
{
    public class CustomerClusterErrorDto
    {
        public int Id { get; set; }
        public string SelectedMobile { get; set; }
        public string Mobile { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string MobileFoundIn { get; set; }
        public int ClusterId { get; set; }
    }

    public class CustomerClusterErrorDtoComparer : IEqualityComparer<CustomerClusterErrorDto>
    {
        public bool Equals(CustomerClusterErrorDto x, CustomerClusterErrorDto y)
        {
            if (ReferenceEquals(x, y)) return true;

            if (x is null || y is null) return false;

            return x.Id == y.Id && x.Code == y.Code;
        }
        public int GetHashCode(CustomerClusterErrorDto customerClusterError)
        {
            if (customerClusterError is null) return 0;
            int hashId = customerClusterError.Id.GetHashCode();
            int hashCode = customerClusterError.Code == null ? 0 : customerClusterError.Code.GetHashCode();
            return hashId ^ hashCode;
        }
    }
}