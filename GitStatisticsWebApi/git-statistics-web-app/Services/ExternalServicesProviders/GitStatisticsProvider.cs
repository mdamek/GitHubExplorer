using System;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
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

        public GitStatisticsDto GetGitStatisticsForUrl()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(_gitStatisticsLibraryUrl);
                var responseTask = client.GetAsync(_statisticsRepositoryEndpoint);
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
