const Star = require('../models/star')

const getAll = function(req,res){
    console.log("star")
    Star.find({}).then(function(stars){
        if(!stars){
            return res.status(404).send("No star signs :(")
        }
        console.log(stars)
        return res.status(200).json(stars)
    }).catch(function(error){
        return res.status(500).send(error)
    })
}


const getStar = function(req,res){
    const par = req.params.sign
    const sign = par.charAt(0).toUpperCase() + par.slice(1)
    
    console.log(sign.toLowerCase())
    Star.findOne({name:sign}).then(function(sign){
        if(sign){
            return res.status(200).send(sign)
        } else {
            return res.send("This sign doesn't exist (yet) :(")
        }
    }).catch(function(error){
        return res.status(500).send(error)
    })
}

const newStar = function(req,res){
    const starSign = new Star({
        ...req.body
    })
    starSign.save().then(function(){
        return res.send(starSign)
    }).catch(function(error){
        return res.status(400).send({error:error})
    })
}

const updateStar = function(req,res){
    const par = req.params.sign
    const sign = par.charAt(0).toUpperCase() + par.slice(1)
    const updates = Object.keys(req.body)
    const allowedUpdates = ['traits','characteristics','image']

    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send({
            error: 'Invalid update, only allowed to update: ' + allowedUpdates
        })
    }

    Star.findOneAndUpdate({name:sign},req.body).then(function(star){
        if(!star){
            return res.status(404).send({
                error: 'Sign was not found'
            })
        }
        return res.send(Star)
    }).catch(function(error){
        res.status(500).send({error:error})
    })
}

const deleteStar = function(req,res){
    const par = req.params.sign
    const sign = par.charAt(0).toUpperCase() + par.slice(1)

    Star.findOneAndDelete({name:sign}).then(function(star){
        if(!star){
            return res.status(404).send({
                error: 'Sign was not found'
            })
        }
        return res.send(star)
    }).catch(function(error){
        res.status(505).send({error:error})
    })
}

module.exports = {
    getAll,
    getStar,
    newStar,
    updateStar,
    deleteStar
}

/*
    deleteAll
*/ 