`use strict`

const tweetLink = `https://twitter.com/intent/tweet?text=`;
const quoteUrl = `https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1`;

function getQuote() {
    fetch(quoteUrl, { cache: `no-store` })
        .then(function(resp) {
            return resp.json();
        })
        .then(createTweet);
}

function createTweet(input) {
    const data = input[0];

    const dataElement = document.createElement(`div`);
    dataElement.innerHTML = data.content;
    const quoteText = dataElement.innerText.trim();
    const quoteAuthor = data.title;

    if (!quoteAuthor.length) {
        quoteAuthor = `Unknown author`;
    }
    const tweetText = `Quote of the day - ` + quoteText + ` Author: ` + quoteAuthor;
    if (tweetText.length > 140) {
        getQuote();
    } else {
        const tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector(`.quote`).innerText = quoteText;
        document.querySelector(`.author`).innerText = `Author: ` + quoteAuthor;
        document.querySelector(`.tweet`).setAttribute(`href`, tweet);
    }
}

document.addEventListener(`DOMContentLoaded`, function() {
    getQuote();
    document.querySelector(`.trigger`).addEventListener(`click`, function() {
        getQuote();
    });
});