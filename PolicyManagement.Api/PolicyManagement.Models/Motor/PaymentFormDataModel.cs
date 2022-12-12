using PolicyManagement.Dtos.Common;
using System;

namespace PolicyManagement.Models.Motor
{
    public class PaymentFormDataModel
    {
        public short Mode { get; set; }
        public int Amount { get; set; }
        public string InstrumentNumber { get; set; }
        public string DatedString { get; set; }
        public DateTime? Dated { get; set; }
        public DateDto DatedDto { get; set; }
        public short Bank { get; set; }
    }
}
