namespace PolicyManagement.Models.Claims
{
    public class ClaimsDocumentModel
    {
        public int DocumentTypeId { get; set; }
        public string DocumentBase64 { get; set; }
        public string FileName { get; set; }
        public string Remarks { get; set; }
    }
}
