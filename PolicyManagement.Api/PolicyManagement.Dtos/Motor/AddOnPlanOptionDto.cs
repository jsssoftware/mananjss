namespace PolicyManagement.Dtos.Motor
{
    public class AddOnPlanOptionDto
    {
        public int AddonPlanOptionId { get; set; }
        public string AddonPlanOptionName { get; set; }
        public string AddonPlanOptionDescripation { get; set; }
        public bool IsPlanAvailable { get; set; }
        public string AddonValue { get; set; }

    }
}