using git_statistics_web_app.Models;
using System;

namespace git_statistics_web_app.Services.ExternalServicesProviders
{
    public interface IGitStatisticsProvider
    {
        GitStatisticsDto GetGitStatisticsForUrl(string gitRepositoryAddress, DateTime? startDate, DateTime? endDate);
    }
}
