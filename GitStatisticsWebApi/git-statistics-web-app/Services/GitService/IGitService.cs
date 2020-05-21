using git_statistics_web_app.Models;

namespace git_statistics_web_app.Services.GitService
{
    public interface IGitService
    {
        GitStatisticsDto GetGitStatistics();
    }
}
