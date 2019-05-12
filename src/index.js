const express = require('express')
require('./db/mongoose')

const router = require('./routes')
const bodyParser = require('body-parser');


const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // parsea a json
app.use(router)

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


app.listen(port, function() {
  console.log('Server up and running on port ' + port)
})
