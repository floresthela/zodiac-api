const Moon = require('../models/moon')

const getAll = function(req,res){
    Moon.find({}).then(function(moon){
        if(!moon){
            return res.status(404).send("No moon signs :(")
        }
        return res.status(200).json(moon)
    }).catch(function(error){
        return res.status(500).send(error)
    })
}

const getMoon = function(req,res){
    const par = req.params.sign
    const sign = par.charAt(0).toUpperCase() + par.slice(1)
    
    console.log(sign.toLowerCase())
    moon.findOne({name:sign}).then(function(sign){
        if(sign){
            return res.status(200).send(sign)
        } else {
            return res.send("This sign doesn't exist (yet) :(")
        }
    }).catch(function(error){
        return res.status(500).send(error)
    })
}


const newMoon = function(req,res){
    const moonSign = new Moon({
        ...req.body
    })
    moonSign.save().then(function(){
        return res.send(moonSign)
    }).catch(function(error){
        return res.status(400).send({error:error})
    })
}

const updateMoon = function(req,res){
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

    Moon.findOneAndUpdate({name:sign},req.body).then(function(moon){
        if(!moon){
            return res.status(404).send({
                error: 'Sign was not found'
            })
        }
        return res.send(Moon)
    }).catch(function(error){
        res.status(500).send({error:error})
    })
}

const deleteMoon = function(req,res){
    const par = req.params.sign
    const sign = par.charAt(0).toUpperCase() + par.slice(1)

    Moon.findOneAndDelete({name:sign}).then(function(moon){
        if(!moon){
            return res.status(404).send({
                error: 'Sign was not found'
            })
        }
        return res.send(moon)
    }).catch(function(error){
        res.status(505).send({error:error})
    })
}

module.exports = {
    getAll,
    getMoon,
    newMoon,
    updateMoon,
    deleteMoon
}
/*
    getAll
    getMoonSign
    newMoon
    updateMoonSign
    deleteAll
    deleteMoonSign
*/ 