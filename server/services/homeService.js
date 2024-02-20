import { ScrapedNews } from "../models/ScrapedNews.js";

const getAllNews = async () => ScrapedNews.find();

export {
    getAllNews
}