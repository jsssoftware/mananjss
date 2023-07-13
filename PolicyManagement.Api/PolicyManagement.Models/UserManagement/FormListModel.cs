using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PolicyManagement.Models.UserManagement
{
    public class MainFormListModel
    {

        public int id { get; set; }

        public string name { get; set; }

        public string menuCode { get; set; }

        public bool showChildren { get; set; } = false;
        public int? parentId { get; set; }
        public int? grandParentId { get; set; }
        public bool checkedid { get; set; } = false;
        public List<ChildFormListModel> children { get; set; }
    }
    
    public class ChildFormListModel
    {

        public int id { get; set; }

        public string name { get; set; }

        public string menuCode { get; set; }
        public int? parentId { get; set; }
        public int? grandParentId { get; set; }
        public bool checkedid { get; set; } = false;

        public List<GrandChildFormListModel> children { get; set; }
        public bool showChildren { get; set; } = false;

    }

    public class GrandChildFormListModel
    {

        public int id { get; set; }

        public string name { get; set; }

        public string menuCode { get; set; }

        public int? parentId { get; set; }
        public int? grandParentId { get; set; }
    }
}
