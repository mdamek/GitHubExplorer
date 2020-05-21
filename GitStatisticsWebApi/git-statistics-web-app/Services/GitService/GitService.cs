using git_statistics_web_app.Models;
using git_statistics_web_app.Services.ExternalServicesProviders;

namespace git_statistics_web_app.Services.GitService
{
    public class GitService : IGitService
    {
        private readonly IGitStatisticsProvider _gitStatisticsProvider;

        public GitService(IGitStatisticsProvider gitStatisticsProvider)
        {
            _gitStatisticsProvider = gitStatisticsProvider;
        }
        public GitStatisticsDto GetGitStatistics()
        {
            return _gitStatisticsProvider.GetGitStatisticsForUrl();
        }
    }
}
