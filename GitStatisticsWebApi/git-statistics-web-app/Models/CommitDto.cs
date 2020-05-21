using System;

namespace git_statistics_web_app.Models
{
    public class CommitDto
    {
        public string Author { get; set; }
        public DateTime Date { get; set; }
        public string Hash { get; set; }
    }
}