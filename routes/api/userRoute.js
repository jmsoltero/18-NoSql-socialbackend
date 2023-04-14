const router = require('express').Router();

const { getAllUsers,getUserById,createUser, addFriend } = require('../../controllers/userCont');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);
router
    .route('/:id')
    .get(getUserById)
router
    .route('/:userId/friends/:friendId')
    .post(addFriend);
module.exports = router;