import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium';

const scrapeNewsFromRoleriBg = async () => {
    // Configure Puppeteer to use the @sparticuz/chromium library
    chromium.setGraphicsMode = false;

    // Launch Puppeteer with the @sparticuz/chromium settings
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
    });

    const page = await browser.newPage();

    await page.goto('https://roleri.bg/');

    // Wait for the news section to be rendered
    await page.waitForSelector('.widget_kiddie_recent_posts_widget');

    // Extract news data
    const news = await page.evaluate(() => {
        const newsList = [];
        const newsItems = document.querySelectorAll('.widget_kiddie_recent_posts_widget .item-post');

        // Iterate over each news item and extract data
        newsItems.forEach(item => {
            const title = item.querySelector('h6 a').textContent.trim();
            const date = item.querySelector('.ztl-recent-post-date a').textContent.trim();
            const content = item.querySelector('.recentPostRoll').textContent.trim();
            const newsUrl = item.querySelector('.ztl-button.recentBtnRoll').getAttribute('href');
            const imageUrl = item.querySelector('.recentImgRoll img').getAttribute('src');

            newsList.push({ title, date, newsUrl, content, imageUrl });
        });

        return newsList;
    });

    await browser.close();
    console.log('news: ', news)
    return news;
};

export { scrapeNewsFromRoleriBg };
