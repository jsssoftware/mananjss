using PolicyManagement.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Models.Voucher
{
    public class CommisionSlabModel : BaseModel
    {
        public List<int> InsuranceCompanyId { get; set; }
        public List<int> PolicyType { get; set; }
        public int VerticalId { get; set; }
        public List<int> VehicleClassTypeId { get; set; }
        public List<int> ManufacturerId { get; set; }
        public List<int> ModelId { get; set; }
        public decimal? SplDiscountSlab { get; set; }
        public decimal? SplDiscountSlabUpto { get; set; }
        public List<int> PackageType { get; set; }
        public List<int> FuelTypeId { get; set; }
        public List<int> Ncb { get; set; }
        public int? VolumeCriteria { get; set; }
        public int? SlabStartRs { get; set; }
        public int? ExShowroomStart { get; set; }
        public int? SlabUptoRs { get; set; }
        public int? ExShowroomUpTo { get; set; }
        public decimal? CommApplicable { get; set; }
        public string InsuranceCompanyName { get; set; }
        public string VehicleClassName { get; set; }
        public string ManufactureName { get; set; }
        public string ModelName { get; set; }
        public string NcbName { get; set; }
        public string PolicyTypeName { get; set; }
        public string FuelTypeName { get; set; }
        public string PackageTypeName { get; set; }
        public int? BranchId { get; set; }
        public int? TurnOverRatio { get; set; }
        public int CommisionSlabId { get; set; }

    }
}
