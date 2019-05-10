const express = require('express')
const router = express.Router()
const users = require('./controllers/users')
const moons = require('./controllers/moonC')
const stars = require('./controllers/starC')
const risings = require('./controllers/risingC')
const auth = require('./middleware/auth')
const cors = require('cors')

router.all('*',cors())

// ==GETS============================================================================
router.get('/users', auth, users.getUsers)

// gets - cualquiera puede realizarlo
router.get('/signs/star', stars.getAll)
router.get('/signs/moon', moons.getAll)
router.get('/signs/rising', risings.getAll)
router.get('/signs/star/:sign', stars.getStar)
router.get('/signs/moon/:sign', moons.getMoon)
router.get('/signs/rising/:sign', risings.getRising)
// ==================================================================================

// ==POSTS===========================================================================
// posts  - necesitan autorización para crear un signo completo, necesitas ser admin
router.post('/signs/star', auth, stars.newStar)
router.post('signs/moon', auth, moons.newMoon)
router.post('signs/rising', auth, risings.newRising)

// usuario
router.post('/users', users.register)  // signup
router.post('/users/login', users.login)
router.post('/users/logout', auth, users.logout)
// ==================================================================================

// ==UPDATES=========================================================================
// patch - update a un signo en especifico, necesitas ser admin
router.patch('/signs/star/:sign', auth, stars.updateStar)
router.patch('/signs/moon/:sign', auth, moons.updateMoon)
router.patch('/signs/rising/:sign', auth, risings.updateRising)
// ==================================================================================

// ==DELETES=========================================================================
// delete - delete a un signo en específico ya sea star, moon o rising *auth
router.delete('/signs/star/:sign', auth, stars.deleteStar)
router.delete('/signs/moon/:sign', auth, moons.deleteMoon)
router.delete('/signs/rising/:sign', auth, risings.deleteRising)
// ==================================================================================

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try /signs/(star, moon or rising) and you can add /(aries,taurus,etc...) :)'
  })
})

module.exports = router

