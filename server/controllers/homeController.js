import { Router } from 'express';

import { endpoints } from '../environments/endPoints.js';
import { getAllNews } from '../services/homeService.js';

const homeController = Router();

homeController.get(endpoints.news, async (req, res, next) => {
    try {
        const allNews = await getAllNews();

        res.status(200).json(allNews);
    } catch (error) {
        next(error);
    }
});

export { homeController };