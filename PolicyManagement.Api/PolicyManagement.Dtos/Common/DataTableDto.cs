namespace PolicyManagement.Dtos.Common
{
    public class DataTableDto<T> where T : class
    {
        public int TotalCount { get; set; }
        public T Data { get; set; }
    }
}
