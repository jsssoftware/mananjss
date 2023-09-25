﻿using PolicyManagement.Models.Common;
using PolicyManagement.Models.Master;
using PolicyManagement.Services.Master.Interface;
using System.Threading.Tasks;
using System.Web.Http;
using PolicyManagement.Infrastructures.EntityFramework;

namespace PolicyManagement.Api.Controllers.Master
{
    [Authorize]
    [RoutePrefix("api/master")]
    public class MasterController : ApiController
    {
        private readonly IMasterService _masterService;

        public MasterController(IMasterService masterService) => _masterService = masterService;

        [Route("insurancebranch/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetInsuranceBranch(int branchId) => Json(await _masterService.GetInsuranceBranch(branchId));

        [Route("insurancebranch/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateInsuranceBranch(tblInsuranceCompanyBranch insuranceCompanyBranch) => Json(await _masterService.CreateInsuranceBranch(insuranceCompanyBranch, new BaseModel()));

        [Route("teammember/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetTeamMembers(int branchId) => Json(await _masterService.GetTeamMember(branchId));

        [Route("teammember/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateTeamMember(tblTeamMember teamMember) => Json(await _masterService.CreateTeamMember(teamMember, new BaseModel()));

        [Route("pos/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreatePos(tblPOS pos) => Json(await _masterService.CreatePos(pos, new BaseModel()));

        [Route("pos/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPos(int branchId) => Json(await _masterService.GetPos(branchId));


        [Route("poscontact/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreatePosContact(tblPOSContact pos) => Json(await _masterService.CreatePosContact(pos, new BaseModel()));

        [Route("poscontact/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetPosContact(int branchId) => Json(await _masterService.GetPosContact(branchId));


        [Route("insurancecompany/create")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateInsuranceCompany(tblInsuranceCompany insuranceCompany) => Json(await _masterService.CreateInsuranceCompany(insuranceCompany, new BaseModel()));

        [Route("insurancecompany/{branchId}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetInsuranceCompany(int branchId) => Json(await _masterService.GetInusranceCompany(branchId));

    }
}
