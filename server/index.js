import express from 'express';

import expressConfig from './config/expressConfig.js';
import databaseConfig from './config/databaseConfig.js';
import globalErrorHandler from './util/globalErrorHandler.js';
import routesConfig from './config/routesConfig.js';
import environmentConfig from './config/environmentConfig.js';

(async function startServer() {
    const app = express();
    const config = environmentConfig();

    await databaseConfig(config);
    await expressConfig(app, config);
    routesConfig(app);

    app.use(globalErrorHandler);

    app.listen(config.port, () => console.log(`Server is listening on port: ${config.port}`));

})();