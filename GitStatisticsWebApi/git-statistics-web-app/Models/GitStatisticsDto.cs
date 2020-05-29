using System.Collections.Generic;

namespace git_statistics_web_app.Models
{
    public class GitStatisticsDto
    {
        public int CommitsTotalNumber { get; set; }
        public List<CommitDto> AllCommits { get; set; }
    }
}