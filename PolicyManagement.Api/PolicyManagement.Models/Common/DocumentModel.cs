using System.Web;

namespace PolicyManagement.Models.Common
{
    public class DocumentModel
    {
        public int DocumentId { get; set; }
        public string DocumentBase64 { get; set; }
        public int DocumentTypeId { get; set; }
        public string DocumentTypeName { get; set; }
        public string FileName { get; set; }
        public string Remarks { get; set; }
    }
}
