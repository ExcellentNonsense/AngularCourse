"use strict";

class NewsLoader {
    static getNews() {
        return [
            { date: "09.11.2021 - 15:00", headline: 'Вышел 1 урок курса Angular - первый взгляд на платформу и введение в компоненты' },
            { date: "16.11.2021 - 15:00", headline: 'Вышел 2 урок курса Angular' },
            { date: "23.11.2021 - 15:00", headline: 'Вышел 3 урок курса Angular' }
        ];
    }

    static load() {
        let newsColl = NewsLoader.getNews();

        let newsPlaceholder = document.querySelector(".news-container > .news");

        newsColl.forEach(function (item, i) {
            let news = newsPlaceholder.cloneNode(true);

            news.querySelector(".news__headline").innerHTML = item.headline;
            news.querySelector(".news__date").innerHTML = item.date;

            if (i % 2 === 1) {
                news.style.backgroundColor = "hsl(240, 36.8%, 96.3%)";
            }

            newsPlaceholder.before(news);
        });

        newsPlaceholder.remove();
    }
}

document.addEventListener("DOMContentLoaded", NewsLoader.load());