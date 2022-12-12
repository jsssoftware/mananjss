using AutoMapper;
using PolicyManagement.Infrastructures.EntityFramework;

namespace PolicyManagement.Services.Base
{
    public class BaseService
    {
        protected readonly DataContext _dataContext;
        protected readonly IMapper _mapper;

        public BaseService(DataContext dataContex,
                           IMapper mapper)
        {
            _dataContext = dataContex;
            _mapper = mapper;
        }
    }
}
