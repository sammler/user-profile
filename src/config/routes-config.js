const express = require('express');
const swaggerUi = require('swagger-ui-express');

const ApiDocsController = require('./../modules/api-docs/api-docs.controller');
const apiDocsRoutes = require('./../modules/api-docs/api-docs.routes');
const healthCheckRoutes = require('./../modules/health-check/health-check.routes.js');

const router = express.Router(); // eslint-disable-line new-cap

router.use('/', healthCheckRoutes);
router.use('/', apiDocsRoutes);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(ApiDocsController.getDocs()));

module.exports = router;
