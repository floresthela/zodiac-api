const mongoose = require('mongoose')
//const validator = require('validator')

const solarSchema = new mongoose.Schema({
  name: {type: String},
  date: [{type:String}],
  rulingPlanet: {type: String},
  element: {type: String},
  traits: [{type:String}],
  birthStone: {type: String},
  image: {type: String},
  quality: {type: String},
  gender: {type: String},
  characteristics: [{type:String}],
  compatibility: [{type:String}],
  incompatibility: [{type:String}],
})

const Solar = mongoose.model('Solar',solarSchema)
module.exports = Solar