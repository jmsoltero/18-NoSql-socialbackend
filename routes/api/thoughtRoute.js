const router = require('express').Router();

const { getAllThoughts,getThoughtById,createThought,createReaction } = require('../../controllers/thoughtCont');

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);
router
    .route('/:id')
    .get(getThoughtById);
router
    .route('/:thoughtId/reactions')
    .post(createReaction);
router
    .route('/:thoughtId/reactions/:reactionId');
module.exports=router