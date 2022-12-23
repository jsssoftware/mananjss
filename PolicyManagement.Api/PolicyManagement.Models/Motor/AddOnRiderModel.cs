using System.Collections.Generic;

namespace PolicyManagement.Models.Motor
{
    public class AddOnRiderModel
    {
        public AddOnRiderModel()
        {
            AddOnRiderOptionId = new List<int>();
            AddOnValue = new List<string>();
        }
        public short AddOnRiderId { get; set; }
        public List<int> AddOnRiderOptionId { get; set; }
        public List<string> AddOnValue { get; set; }

    }
}
