import { ScrapedNews } from "../models/ScrapedNews.js";

import { scrapeNewsFromRoleriBg } from "./scrapeNewsFromRoleriBg.js";

let intervalId;
export async function scrapingNewsOnInterval() {
    const timeToCheck = 1; // Interval time in hours
    const intervalTimeToMilliseconds = timeToCheck * 60 * 60 * 1000;

    // Initial scraping
    await scrapeAndSaveNews();

    // Schedule regular scraping
    intervalId = setInterval(async () => {
        await scrapeAndSaveNews();
    }, intervalTimeToMilliseconds);
}

async function scrapeAndSaveNews() {
    try {
        const scrapedNewsData = await scrapeNewsFromRoleriBg();
        if (scrapedNewsData) {
            await ScrapedNews.deleteMany({});           // Clear existing data
            await ScrapedNews.create(scrapedNewsData);  // Save new data
        }

    } catch (error) {
        throw new Error('Error while scraping and saving news:', error);
    }
}

export function stopScrapingNewsOnInterval() {
    clearInterval(intervalId);
}