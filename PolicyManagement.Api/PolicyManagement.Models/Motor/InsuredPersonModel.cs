using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Models.Motor
{
    public class InsuredPersonModel
    {
        public int CustomerId { get; set; }
        public int PolicyId { get; set; }
        public string Name { get; set; }
        public string PassportNumber { get; set; }
        public string Gender { get; set; }
        public short? RelationProposer { get; set; }
        public int? SumInsuredIndividual { get; set; }
        public int? SumInsuredFloater { get; set; }
        public int? CumulativeBonus { get; set; }
        public int? Deductable { get; set; }
        public decimal? Loading { get; set; }
        public string LoadingReason { get; set; }
        public short? Ped { get; set; }
        public string PedExclusion { get; set; }
        public int? AnualIncome { get; set; }
        public short? RiskClass { get; set; }
        public string NomineeName { get; set; }
        public short? NomineeRelationship { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string Pan { get; set; }
        public short BranchId { get; set; }
        public short GenderId { get; set; }
        public short ClusterId { get; set; }
        public string Address { get; set; }
        public short CityId { get; set; }
        public int? ReferById { get; set; }
        public int? ReferenceId { get; set; }
        public int? PosId { get; set; }
        public int? TeamMemberId { get; set; }
        public string Aadhar { get; set; }
        public int? Age { get; set; }
        public string NomineeRelationShipName { get; set; }
        public string PedName { get; set; }
        public string RelationProposerName { get; set; }
        public string CustomerCode { get; set; }


    }
}
