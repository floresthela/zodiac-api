const Moon = require('../models/moon')

const getAll = function(req,res){
    Moon.find({}).then(function(moonSigns){
        if(!moonSigns){
            return res.status(404).send("No moon signs :(")
        }
        return res.status(200).json(moonSigns)
    }).catch(function(error){
        return res.status(500).send(error)
    })
}

const getMoonSign = function(req,res){
    const sign = req.params.sign
    Moon.findOne(sign).then(function(sign){
        if(sign){
            return res.status(200).send(sign)
        } else {
            return res.send("This sign doesn't exist :(")
        }
    }).catch(function(error){
        return res.status(500).send(error)
    })
}


/*
    getAll
    getMoonSign
    newMoon
    updateMoonSign
    deleteAll
    deleteMoonSign
*/ 