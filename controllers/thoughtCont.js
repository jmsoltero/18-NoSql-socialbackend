const { Thought}= require('../models');

const thoughtCont = {
    getAllThoughts( req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1 })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400)
            });
    },
    getThoughtById({ params }, res){
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1})
            .then(thoughtData=> {
                if (!thoughtData) {
                    res.status(404).json(err);
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    createThought({ body }, res){
        Thought.create(body)
        .then(({_id})=> {
            return User.findOneAndUpdate(
                {_id: body.userId},
                { $push: { thoughts: _id }},
                { new:true}
            );
        })
        .then(thoughtData=>{
            if(!thoughtData) {
                res.status(404).json(err)
                return;
            }
            res.json(thoughtData);
        })
        .catch(err=> res.json(err))
    },
    updateThought({ params, body }, res){
        Thought.findOneAndUpdate({_id: params.id }, body, { new: true,runValidators: true})
        .then(thoughtData=> {
            if(!thoughtData) {
                res.status(404).json(err)
                return;
            }
            res.json(thoughtData);
        })
        .catch(err=>res.json(err));
    },
    deleteThought({ params}, res){
        Thought.findOneAndDelete({_id: params.id})
        .then(thoughtData=> {
            if(!thoughtData) {
                res.status(404).json(err)
                return;
            }
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: {thoughts: params.Id}},
                {new:true}
            )
        })
        .then(userData => {
            if(!userData){
                res.status(404).json(err)
                return;
            }
            res.json(userData)
        })
        .catch(err=>res.json(err));
    },
    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
          {_id: params.thoughtId}, 
          {$push: {reactions: body}}, 
          {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({message: 'No thoughts with this ID.'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.status(400).json(err))
        },
        deleteReaction({ params }, res) {
            Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $pull: { reactions: { reactionId: params.reactionId } } },
              { new: true }
            )
              .then(dbThoughtData => {
                if (!dbThoughtData) {
                  res.status(404).json({ message: 'Nope!'});
                  return;
                }
               res.json(dbThoughtData);
              })
              .catch(err => res.json(err));
          }
    };
    
    module.exports=thoughtCont;

