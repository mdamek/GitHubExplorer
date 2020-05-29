using System;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Threading;
using git_statistics_web_app.Models;

namespace git_statistics_web_app.Services.ExternalServicesProviders
{
    public class GitStatisticsProvider : IGitStatisticsProvider
    {
        private readonly string _gitStatisticsLibraryUrl;
        private readonly string _statisticsRepositoryEndpoint = "getRepositoryStatistics";

        public GitStatisticsProvider(IConfiguration configuration)
        {
            this._gitStatisticsLibraryUrl = configuration["GitStatisticsLibrary"];
        }

        public GitStatisticsDto GetGitStatisticsForUrl(string gitRepositoryAddress, DateTime? startDate, DateTime? endDate)
        {
            using (var client = new HttpClient())
            {
                client.Timeout = new TimeSpan(10,10,10);
                client.BaseAddress = new Uri(_gitStatisticsLibraryUrl);
                var combinedUrl = _statisticsRepositoryEndpoint;
                combinedUrl += "?gitRepositoryAddress=" + Uri.EscapeDataString(gitRepositoryAddress);
                if (startDate != null) combinedUrl += "&startDate=" + startDate.Value.ToString("yyyy-MM-dd");
                if (endDate != null) combinedUrl += "&endDate=" + endDate.Value.ToString("yyyy-MM-dd");
                var responseTask = client.GetAsync(combinedUrl);
                responseTask.Wait();
                var result = responseTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    var readTask = result.Content.ReadAsAsync<GitStatisticsDto>();
                    readTask.Wait();

                    var gitStatistics = readTask.Result;
                    return gitStatistics;
                }

                throw new Exception("External service is not avaliable!");
            }
        }
    }
}
