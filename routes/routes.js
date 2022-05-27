const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const createController = require('../controllers/createController');
const indViewController = require('../controllers/indViewController')
const editController = require('../controllers/editController')

router.get('/', indexController.getIndex);
router.get('/getCreate', createController.getCreate);
router.post('/create', createController.create);
router.get('/indView/:id', indViewController.getIndView);
router.get('/getEdit/:id', editController.getEdit);
router.post('/edit/:id', editController.edit);
router.get('/delete/:id', editController.delete);

module.exports = router;