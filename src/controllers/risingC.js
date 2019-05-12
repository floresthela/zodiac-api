const Rising = require('../models/rising')

const getAll = function(req,res){
    Rising.find({}).then(function(risings){
        if(!risings){
            return res.status(404).send("No rising signs :(")
        }
        // console.log(risings)
        return res.status(200).json(risings)
    }).catch(function(error){
        return res.status(500).send(error)
    })
}


const getRising = function(req,res){
    const par = req.params.sign
    const sign = par.charAt(0).toUpperCase() + par.slice(1)
    
    console.log(sign.toLowerCase())
    Rising.findOne({name:sign}).then(function(sign){
        if(sign){
            return res.status(200).send(sign)
        } else {
            return res.send("This sign doesn't exist (yet) :(")
        }
    }).catch(function(error){
        return res.status(500).send(error)
    })
}

const newRising = function(req,res){
    const risingSign = new Rising({
        ...req.body
    })
    risingSign.save().then(function(){
        return res.send(risingSign)
    }).catch(function(error){
        return res.status(400).send({error:error})
    })
}

const updateRising = function(req,res){
    const par = req.params.sign
    const sign = par.charAt(0).toUpperCase() + par.slice(1)
    const updates = Object.keys(req.body)
    const allowedUpdates = ['rulingPlanet','characteristics','element','birthStone','quality','gender']

    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send({
            error: 'Invalid update, only allowed to update: ' + allowedUpdates
        })
    }

    Rising.findOneAndUpdate({name:sign},req.body).then(function(rising){
        if(!rising){
            return res.status(404).send({
                error: 'Sign was not found'
            })
        }
        return res.send(Rising)
    }).catch(function(error){
        res.status(500).send({error:error})
    })
}

const deleteRising = function(req,res){
    const par = req.params.sign
    const sign = par.charAt(0).toUpperCase() + par.slice(1)

    Rising.findOneAndDelete({name:sign}).then(function(rising){
        if(!star){
            return res.status(404).send({
                error: 'Sign was not found'
            })
        }
        return res.send(rising)
    }).catch(function(error){
        res.status(505).send({error:error})
    })
}

module.exports = {
    getAll,
    getRising,
    newRising,
    updateRising,
    deleteRising
}

/*
    deleteAll
*/ 