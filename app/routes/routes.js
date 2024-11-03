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

const {
  register_game_review,
  consult_game_reviews,
  update_game_reviews,
  register_user_review,
  consult_user_reviews,
  update_user_reviews,
} = require('../controllers/reviewsController');

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

router.post('/review/game/register', register_game_review);
router.post('/reviews/game/consult', consult_game_reviews);
router.post('/reviews/game/update', update_game_reviews);

router.post('/review/user/register', register_user_review);
router.post('/reviews/user/consult', consult_user_reviews);
router.post('/reviews/user/update', update_user_reviews);

module.exports = router;
