import { json, urlencoded } from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwtMiddleware from '../middlewares/jwtMiddleware.js';
import checkBlackListToken from '../middlewares/checkBlackListToken.js';
import { scrapingNewsOnInterval, stopScrapingNewsOnInterval } from '../util/scrapingNewsOnInterval.js';

const expressConfig = async (app, config) => {

    app.use(cors({
        origin: config.origin,
        credentials: true,
    }));

    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(await checkBlackListToken());
    app.use(jwtMiddleware());

    // Run scraping news on interval time (default hourly)
    scrapingNewsOnInterval();

    // Handle shutdown to stop the scrapingNewsOnInterval
    process.on('SIGINT', () => {
        stopScrapingNewsOnInterval();
        process.exit();
    });
};

export default expressConfig;