const express = require('express');
const router = express.Router();

const {
  register_category,
  consult_category,
  consult_categories,
  update_category,
  delete_category,
} = require('../controllers/categoriesController');

const {
  register_game,
  search_game,
  consult_game,
  consult_games,
  update_game,
  delete_game,
} = require('../controllers/gamesController');

router.post('/category/register', register_category);
router.post('/category/consult', consult_category);
router.get('/categories/consult', consult_categories);
router.post('/category/update', update_category);
router.post('/category/delete', delete_category);

router.post('/game/search', search_game);
router.post('/games/consult', consult_games);
router.post('/game/register', register_game);
router.post('/game/consult', consult_game);
router.post('/game/update', update_game);
router.post('/game/delete', delete_game);

module.exports = router;
