using git_statistics_web_app.Models;

namespace git_statistics_web_app.Services.ExternalServicesProviders
{
    public interface IGitStatisticsProvider
    {
        GitStatisticsDto GetGitStatisticsForUrl();
    }
}
