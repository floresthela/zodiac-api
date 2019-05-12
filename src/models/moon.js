const mongoose = require('mongoose')
//const validator = require('validator')

const moonSchema = new mongoose.Schema({
  name: {type: String},
  dates: [{type:String}],
  rulingPlanet: {type: String},
  element: {type: String},
  traits: [{type:String}],
  image: {type: String},
  quality: {type: String},
  gender: {type: String},
  characteristics: {type:String},
  compatibility: [{type:String}],
  incompatibility: [{type:String}],
})

const Moon = mongoose.model('Moon',moonSchema,'moon')
module.exports = Moon