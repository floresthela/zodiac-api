const User = require('../models/user')

// ya no debería tener esta ruta a menos que sea un usuario tipo admin
const getUsers = function(req, res) {
  User.find({}).then(function(users) {
    res.send(users)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

const getUser = function(req, res) {
  // cualquier usuario no deberia ser capaz de ver la info de un usuario
  // a menos que sea un admin. Aqui yo ya no admitire que me pasen el :id 
  // solo usare el id de la request-> req.user._id
  // como ya tenemos toda la info del usuario gracias a auth
  // ya no necesitamos hacer un User.findOne de nuevo!,
  // todo esta en req.user
  // solo nos faltaria agregar los todos del Schema Todo
  // req.user.populate()
  // req.user
  // User.findById(_id).then(function(user) {
  //   if(!user){
  //     return res.status(404).send()
  //   }
  User.findById( req.user._id ).populate('todos').exec(function(error, user) {
  // req.user.populate('todos').exec(function(error, user) {  
    // user ya tiene la info de req.user y req.user.todos
    return res.send(user)
  })
  // }).catch(function(error) {
  //   return res.status(500).send(error)
}

const createUser = function(req, res){
  const user = new User(req.body)
  user.save().then(function() {
    return res.send(user)
  }).catch(function(error) {
    return res.status(400).send(error)
  })
}

const login = function(req, res) {
  User.findByCredentials(req.body.email, req.body.password).then(function(user){
    user.generateToken().then(function(token){
      return res.send({user, token})
    }).catch(function(error){
      return res.status(401).send({ error: error })
    })
  }).catch(function(error) {
    return res.status(401).send({ error: error })
  })
}

const logout = function(req, res) {
  req.user.tokens = req.user.tokens.filter(function(token) {
    return token.token !== req.token
  })
  req.user.save().then(function() {
    return res.send()
  }).catch(function(error) {
    return res.status(500).send({ error: error } )
  })
}


const updateUser = function(req, res) {
  // solo admitire hacer update de mi usuario que hizo login
  // quitare la ruta de PATCH users/:id y la cambiare solo por PATCH /users
  // const _id = req.params.id
  const _id = req.user._id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'age', 'password', 'email']
  // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if( !isValidUpdate ) {
    return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
    })
  }
  User.findByIdAndUpdate(_id, req.body ).then(function(user) {
    if (!user) {
      return res.status(404).send()
    }
    return res.send(user)
  }).catch(function(error) {
    res.status(500).send(error)
  })
}

// este solo lo utilizarían si quisieran eliminar una cuenta, cancelar subscripcion, etc
// y de igual forma, solo podrían deberían borrar el usuario en el que hicieron login
// por lo tanto, no se le pasa un id, usan el de el token
const deleteUser = function(req, res) {
  // const _id = req.params.id
  const _id = req.user._id
  User.findByIdAndDelete(_id).then(function(user){
    if(!user) {
      return res.status(404).send()
    }
    return res.send(user)
  }).catch(function(error) {
    res.status(505).send(error)
  })
}

module.exports = {
  getUsers : getUsers,
  getUser: getUser,
  login: login,
  logout: logout,
  createUser : createUser,
  updateUser : updateUser,
  deleteUser : deleteUser
}