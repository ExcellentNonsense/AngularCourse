using MyAppApi.Infrastructure;
using System;
using System.Text.Json.Serialization;

namespace MyAppApi.Dto
{
    public class NewsDto
    {
        public int Id { get; set; }
        [JsonConverter(typeof(ShortDateTimeJsonConverter))]
        public DateTime Date { get; set; }
        public string Headline { get; set; }
        public string Text { get; set; }
        public string Theme { get; set; }
    }
}
