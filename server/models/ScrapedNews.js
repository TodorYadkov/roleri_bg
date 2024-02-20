import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        default: null
    },
    date: {
        type: String,
        default: null
    },
    newsUrl: {
        type: String,
        default: null
    },
    content: {
        type: String,
        default: null
    },
    imageUrl: {
        type: String,
        default: null
    }
});

const ScrapedNews = mongoose.model('ScrapedNews', newsSchema);

export { ScrapedNews };