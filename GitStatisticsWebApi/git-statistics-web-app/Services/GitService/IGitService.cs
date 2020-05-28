using git_statistics_web_app.Models;
using System;

namespace git_statistics_web_app.Services.GitService
{
    public interface IGitService
    {
        GitStatisticsDto GetGitStatistics(string gitRepositoryAddress, DateTime? startDate, DateTime? endDate);
    }
}
