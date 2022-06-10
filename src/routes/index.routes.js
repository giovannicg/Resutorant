const {Router} = require('express');
const {renderIndex,renderAbout} =require('../controller/index.controller');
const router = Router();

router.get('/',renderIndex);

router.get('/about',renderAbout);

module.exports = router;