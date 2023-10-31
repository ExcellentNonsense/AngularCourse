using Microsoft.AspNetCore.Mvc;
using MyAppApi.Dto;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsStoriesController : Controller
    {
        private static readonly List<NewsDto> _newsStories = new()
        {
            new NewsDto
            {
                Id = 1,
                Date = new DateTime(2021, 12, 1, 15, 0, 0),
                Headline = "вышел 1 урок курса Angular - первый взгляд на платформу и введение в компоненты",
                Text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias  officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias  officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!",
                Theme = "Политика"
            },
            new NewsDto
            {
                Id = 2,
                Date = new DateTime(2021, 12, 2, 15, 0, 0),
                Headline = "Вышел 2 урок курса Angular",
                Text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias  officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias  officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!",
                Theme = "Туризм"
            },
            new NewsDto
            {
                Id = 3,
                Date = new DateTime(2021, 12, 3, 15, 0, 0),
                Headline = "Вышел 3 урок курса Angular",
                Text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias  officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias  officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!",
                Theme = "Экономика"
            },
        };

        [HttpGet("GetNewsStories")]
        public ActionResult<IEnumerable<NewsDto>> GetNewsStories()
        {
            return _newsStories;
        }

        [HttpPost]
        public ActionResult<NewsDto> CreateNews(NewsDto newsDto)
        {
            newsDto.Id = _newsStories.Max(x => x.Id) + 1;

            _newsStories.Add(newsDto);

            return newsDto;
        }

        [HttpPut]
        public IActionResult UpdateNews(NewsDto newsDto)
        {
            _newsStories[_newsStories.FindIndex(x => x.Id == newsDto.Id)] = newsDto;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteNews(int id)
        {
            _newsStories.RemoveAt(_newsStories.FindIndex(x => x.Id == id));

            return NoContent();
        }

        [HttpPost("GetNewsStoriesByFilter")]
        public ActionResult<IEnumerable<NewsDto>> GetNewsStoriesByFilter(NewsStoriesFilterDto filter)
        {
            var newsStoriesQuery = _newsStories.AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter.Headline))
            {
                newsStoriesQuery = newsStoriesQuery.Where(x => x.Headline.Contains(filter.Headline));
            }
            
            if (!string.IsNullOrWhiteSpace(filter.Theme))
            {
                newsStoriesQuery = newsStoriesQuery.Where(x => x.Theme.Equals(filter.Theme));
            }

            return newsStoriesQuery.ToList();
        }

        [HttpGet("GetNewsStoryById/{id}")]
        public ActionResult<NewsDto> GetNewsStoryById(int id)
        {
            var newsStory = _newsStories.SingleOrDefault(x => x.Id == id);

            return newsStory;
        }
    }
}
