const mongoose = require('mongoose')
//const validator = require('validator')

console.log("en el modelo")

const starSchema = new mongoose.Schema({
  name: {type: String},
  date: [{type:String}],
  rulingPlanet: {type: String},
  element: {type: String},
  traits: [{type:String}],
  birthStone: {type: String},
  image: {type: String},
  quality: {type: String},
  gender: {type: String},
  characteristics: {type:String},
  compatibility: [{type:String}],
  incompatibility: [{type:String}],
})

const Star = mongoose.model('Star',starSchema, 'star')
module.exports = Star