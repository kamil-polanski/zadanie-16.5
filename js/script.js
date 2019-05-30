`use strict`

const tweetLink = `https://twitter.com/intent/tweet?text=`;
const quoteUrl = `https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1`;

function validateJSON(resp) {
    let json;
    try {
        json = resp.json();
        console.log(`ok`)
    } catch (error) {
        console.log(`Error in the data`);
        console.log(error);
        json = null;
    }
    return json;
}

function getQuote() {
    fetch(quoteUrl, { cache: `no-store` })
        .then(validateJSON)
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
    const tweetText = `Quote of the day -  ${quoteText} Author: ${quoteAuthor}`;
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