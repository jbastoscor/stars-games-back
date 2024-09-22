const express = require('express');
const router = express.Router();

const { consult_categories } = require('../controllers/categoriesController');

const {
  register_game,
  consult_game,
  update_game,
  delete_game,
} = require('../controllers/gamesController');

router.get('/categories/consult', consult_categories);

router.post('/game/register', register_game);
router.post('/game/consult', consult_game);
router.post('/game/update', update_game);
router.post('/game/delete', delete_game);

module.exports = router;
