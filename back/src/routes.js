const express = require('express')
const router = express.Router()
const users = require('./controllers/users')
const moons = require('./controllers/moonC')
const stars = require('./controllers/starC')
const risings = require('./controllers/risingC')
const auth = require('./middleware/auth')
const cors = require('cors')

router.all('*',cors())

// gets - cualquier usuario puede realizarlo
router.get('/signs/star', stars.getAll)
// router.get('/signs/moon', moons.getAll)
// router.get('/signs/rising', risings.getAll)
router.get('/signs/star/:sign', stars.getStarSign)
// router.get('/signs/moon/:sign', moons.getMoonSign)
// router.get('/signs/rising/:sign', risings.getRisingSign)


// posts  - necesitan autorización para crear un signo completo, necesitas ser admin

// router.post('/signs/star', auth, stars.newStar)
// router.post('signs/moon', auth, moons.newMoon)
// router.post('signs/rising', auth, rising.newRising)

// router.post('/users/login', users.login)
// router.post('/users/logout', auth, users.logout)

// patch - update a un signo en especifico, necesitas ser admin

// router.patch('/signs/star/:sign', auth, stars.updateStarsign)
// router.patch('/signs/moon/:sign', auth, moons.updateMoonSign)
// router.patch('/signs/rising/:sign', auth, risings.updateRisingSign)

// delete - delete a un signo en específico o todos los signos de una categoría, necesitas ser admin

// router.delete('/signs/star', auth, stars.deleteAll)
// router.delete('/signs/moon', auth, moons.deleteAll)
// router.delete('/signs/rising', auth, risings.deleteAll)

// router.delete('/signs/star/:sign', auth, stars.deleteStarsign)
// router.delete('/signs/moon/:sign', auth, moons.deleteMoonSign)
// router.delete('/signs/rising/:sign', auth, risings.deleteRisingSign)
console.log("hola3")
router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try /signs or /signs/(star, moon or rising) :)'
  })
})

module.exports = router

