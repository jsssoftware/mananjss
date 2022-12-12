using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Dtos.Common
{
    public class MenuItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Icon { get; set; }
        public int? ParentNode { get; set; }
        public string Link { get; set; }
        public bool IsActive { get; set; }
        public int OrderNo { get; set; } 
        [ForeignKey("ParentNode")]
        public List<MenuItemDto> Child { get; set; }
    }
}
