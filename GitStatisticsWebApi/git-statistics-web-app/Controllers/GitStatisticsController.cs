using git_statistics_web_app.Models;
using git_statistics_web_app.Services;
using git_statistics_web_app.Services.GitService;
using Microsoft.AspNetCore.Mvc;

namespace git_statistics_web_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GitStatisticsController : ControllerBase
    {
        private readonly IGitService gitService;

        public GitStatisticsController(IGitService gitService)
        {
            this.gitService = gitService;
        }

        [HttpGet]
        public ActionResult<GitStatisticsDto> Get()
        {
            return gitService.GetGitStatistics();
        }
    }
}
