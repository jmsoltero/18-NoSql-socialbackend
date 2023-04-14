const router = require('express').Router();

const { getAllUsers,getUserById,createUser,updateUser, addFriend } = require('../../controllers/userCont');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);
router
    .route('/:id')
    .get(getUserById)
    .post(updateUser);
router
    .route('/:userId/friends/:friendId')
    .post(addFriend);
module.exports = router;