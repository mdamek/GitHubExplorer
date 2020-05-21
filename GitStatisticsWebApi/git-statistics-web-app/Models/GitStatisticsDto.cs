using System.Collections.Generic;

namespace git_statistics_web_app.Models
{
    public class GitStatisticsDto
    {
        public int CommitsTotalNumber { get; set; }
        public int FilesCommitedTogetherAverage { get; set; }
        public int FilesCommitedTogetherMax { get; set; }
        public int SumOfLinesInRepository { get; set; }
        public List<CommitDto> AllCommits { get; set; }
    }
}