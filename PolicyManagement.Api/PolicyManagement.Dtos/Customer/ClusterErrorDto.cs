using System;
using System.Collections.Generic;

namespace PolicyManagement.Dtos.Customer
{
    public class ClusterErrorDto
    {
        public string SelectedMobile { get; set; }
        public string Mobile { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string ClusterName { get; set; }
        public string ClusterCode { get; set; }
        public int ClusterId { get; set; }
        public string Description { get; set; }
        public string MobileFoundIn { get; set; }
    }

    public class ClusterErrorDtoComparer : IEqualityComparer<ClusterErrorDto>
    {
        public bool Equals(ClusterErrorDto x, ClusterErrorDto y)
        {
            if (ReferenceEquals(x, y)) return true;

            if (x is null || y is null) return false;

            return x.ClusterId == y.ClusterId;
        }
        public int GetHashCode(ClusterErrorDto clusterError)
        {
            if (clusterError is null) return 0;
            int hashClusterdId = clusterError.ClusterId.GetHashCode();
            int hashClusterName = clusterError.ClusterName == null ? 0 : clusterError.ClusterName.GetHashCode();
            return hashClusterdId ^ hashClusterName;
        }
    }
}