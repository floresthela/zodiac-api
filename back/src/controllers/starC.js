const Star = require('../models/star')

console.log("star")

const getAll = function(req,res){
    console.log("star")
    Star.find({}).then(function(stars){
        if(!stars){
            return res.status(404).send("No moon signs :(")
        }
        console.log(stars)
        return res.status(200).json(stars)
    }).catch(function(error){
        return res.status(500).send(error)
    })
}


const getStarSign = function(req,res){
    const par = req.params.sign
    const sign = par.charAt(0).toUpperCase() + par.slice(1)
    //toLowerCase()
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

module.exports = {
    getAll,
    getStarSign
}