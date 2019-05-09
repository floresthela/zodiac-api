// const Todo = require('../models/todo')

// const getTodos = function(req, res) {
//   // solo podemos hacer GET de los todos del usuario que hizo login
//   Todo.find({ createdBy: req.user._id}).then(function(todos) {
//     res.send(todos)
//   }).catch(function(error){
//     res.status(500).send(error)
//   })
// }

// const getTodo = function(req, res) {
//   // solo podemos traer el todo si es que es del usuario que hizo login
//   const _id = req.params.id
//   Todo.findOne({ _id, createdBy: req.user._id }).then(function(todo) {
//     if(!todo){
//       return res.status(404).send({ error: `Task with id ${_id} not found.`})
//     }
//     return res.send(todo)
//   }).catch(function(error) {
//     return res.status(500).send({ error: error })
//   })
// }

// const createTodo = function(req, res){
//   // los ... son para copiar todo el req.body
//   const todo = new Todo({
//     createdBy: req.user._id,
//     description: req.body.description,
//     completed: false
//   })
//   todo.save().then(function() {
//     return res.send(todo)
//   }).catch(function(error) {
//     return res.status(400).send({ error: error })
//   })
// }

// const updateTodo = function(req, res) {
//   const _id = req.params.id
//   const updates = Object.keys(req.body)
//   const allowedUpdates = ['description', 'completed']
//   // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
//   const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

//   if( !isValidUpdate ) {
//     return res.status(400).send({
//       error: 'Invalid update, only allowed to update: ' + allowedUpdates
//     })
//   }
//   // ya no solo buscamos por id, si no también deberia de ser de el owner
//   // del todo por lo tanto usamos findOneAndUpdate para pasarle mas datos
//   // Todo.findByIdAndUpdate(_id, req.body ).then(function(todo) {
//   Todo.findOneAndUpdate({ _id, createdBy: req.user._id }, req.body ).then(function(todo) {
//     if (!todo) {
//       return res.status(404).send({ error: `Task with id ${_id} not found.`})
//     }
//     return res.send(todo)
//   }).catch(function(error) {
//     res.status(500).send({ error: error })
//   })
// }

// const deleteTodo = function(req, res) {
//   const _id = req.params.id
//   Todo.findOneAndDelete({ _id, createdBy: req.user._id }).then(function(todo){
//     if(!todo) {
//       return res.status(404).send({ error: `Task with id ${_id} not found.`})
//     }
//     return res.send(todo)
//   }).catch(function(error) {
//     res.status(505).send({ error: error })
//   })
// }

// module.exports = {
//   getTodos : getTodos,
//   getTodo: getTodo,
//   createTodo : createTodo,
//   updateTodo : updateTodo,
//   deleteTodo : deleteTodo
// }