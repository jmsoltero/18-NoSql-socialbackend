const { log } = require('console');
const { User}= require('../models');

const userCont = {
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .sort({_id:-1})
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    getUserById({ params }, res){
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .then(userData => {
                if(!userData){
                    res.status(404).json({ message:'Please enter a valid Id'});
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400)
            });
    },
    createUser({ body }, res) {
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
    },
    updateUser({params,body }, res) {
        User.findByIdAndUpdate(
            params.id ,
            { $set: { username: body.username } },
            { new: true }
        )
        .then(userData => {
            console.log(userData)
            if(!userData){
                res.status(404).json({ message: 'User not found' });
                console.log(userData);
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ message: 'Error updating user name' });
        });
    },
   
    addFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId }},
            { new: true }
        )
        .then((userData) => {
            if(!userData){
                res.status(404).json();
                return;
            }
            res.json(userData);
        })
        .catch((err) => res.status(400).json(err));
    }
};

module.exports= userCont;