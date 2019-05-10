const mongoose = require('mongoose')


var connectionURL = ''
if(process.env.NODE_ENV === 'production'){
  connectionURL = process.env.DB_CONNECTION_STRING
} else{
  const Config = require('../config')
  connectionURL = Config.connectionURL
}

// var connectionURL = connect.connectionURL
mongoose.connect( connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true
})
