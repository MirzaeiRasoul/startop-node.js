const cheerio = require('cheerio');
const axois = require('axios');

const getHTML = async (url) => {
    const response = await axois.get(url);
    const htmlString = response.data;
    const $ = cheerio.load(htmlString);

    const data = [{
        "singer": $(".singer-title a").text(),
        "title": $(".track-title").text(),
        "cover": $("img.post-thumbnail").attr("src"),
        "link128": $(".dl-128 a").attr("href"),
        "link320": $(".dl-320 a").attr("href"),
    }];

    console.log(data);
}

module.exports = getHTML;