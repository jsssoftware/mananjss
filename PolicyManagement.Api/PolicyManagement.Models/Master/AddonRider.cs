using System;
using System.Collections.Generic;

namespace PolicyManagement.Models.Master
{
    public class AddOnRider
    {
        public short AddonRiderId { get; set; }

        public byte InsuranceCompanyId { get; set; }

        public byte VerticalId { get; set; }

        public string AddonRiderName { get; set; }

        public string RiderDetails { get; set; }

        public bool IsActive { get; set; }

        public List<dynamic> AddOnPlanOptionList { get; set; } = null;

    }
}