namespace PolicyManagement.Dtos.Common
{
    public class PolicyDocumentDto
    {
        public int Id { get; set; }
        public string DocumentTypeName { get; set; }
        public string FileName { get; set; }
        public string Remarks { get; set; }
        public string UniqueId { get; set; }
        public string DocumentTypeId { get; set; }
        public string DocumentBase64 { get; set; }

    }
}
