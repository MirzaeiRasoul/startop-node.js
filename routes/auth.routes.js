const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth.controllers');
const verifyAuthMiddleware = require('../middlewares/verifyAuth.middleware');

router.get('/csrf/', authControllers.csrf);
router.post('/login/', authControllers.login);
router.post('/logout/', authControllers.logout);
router.post('/refresh/', authControllers.refresh);
router.get('/profile/', verifyAuthMiddleware, authControllers.profile);

module.exports = router;
