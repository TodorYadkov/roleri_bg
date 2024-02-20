import axios from 'axios';
import { load } from 'cheerio';

const scrapeNewsFromRoleriBg = async () => {
    try {
        // Fetch the webpage content using axios
        const response = await axios.get('https://roleri.bg/');
        const html = response.data;

        // Load the HTML content into Cheerio
        const $ = load(html);

        // Extract news data
        const newsList = [];
        $('.widget_kiddie_recent_posts_widget .item-post').each((index, element) => {
            const title = $(element).find('h6 a').text().trim();
            const date = $(element).find('.ztl-recent-post-date a').text().trim();
            const content = $(element).find('.recentPostRoll').text().trim();
            const newsUrl = $(element).find('.ztl-button.recentBtnRoll').attr('href');
            const imageUrl = $(element).find('.recentImgRoll img').attr('src');

            newsList.push({ title, date, newsUrl, content, imageUrl });
        });

        return newsList;
    } catch (error) {
        console.error('Error while scraping news: ' + error);
        return [];
    }
};

export { scrapeNewsFromRoleriBg };
