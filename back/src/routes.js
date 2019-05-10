const express = require('express')
const router = express.Router()
const users = require('./controllers/users')
const moons = require('./controllers/moonC')
const solars = require('./controllers/solarC')
const risings = require('./controllers/risingC')
const auth = require('./middleware/auth')
const cors = require('cors')

router.all('*',cors())

// gets - cualquier usuario puede realizarlo

router.get('/signs/solar', solars.getAll)
router.get('/signs/moon', moons.getAll)
router.get('/signs/rising', risings.getAll)

router.get('/signs/solar/:ss', solars.getSolarSign)
router.get('/signs/moon/:ms', solars.getMoonSign)
router.get('/signs/rising/:rs', solars.getRisingSign)


// posts  - necesitan autorización para crear un signo completo, necesitas ser admin

router.post('/signs/solar', auth, solars.newSolar)
router.post('signs/moon', auth, moons.newMoon)
router.post('signs/rising', auth, rising.newRising)

router.post('/users/login', users.login)
router.post('/users/logout', auth, users.logout)

// patch - update a un signo en especifico, necesitas ser admin

router.patch('/signs/solar/:ss', auth, solars.updateSolarSign)
router.patch('/signs/moon/:ms', auth, solars.updateMoonSign)
router.patch('/signs/rising/:rs', auth, solars.updateRisingSign)

// delete - delete a un signo en específico o todos los signos de una categoría, necesitas ser admin

router.delete('/signs/solar', auth, solars.deleteAll)
router.delete('/signs/moon', auth, moons.deleteAll)
router.delete('/signs/rising', auth, risings.deleteAll)

router.delete('/signs/solar/:ss', auth, solars.deleteSolarSign)
router.delete('/signs/moon/:ms', auth, solars.deleteMoonSign)
router.delete('/signs/rising/:rs', auth, solars.deleteRisingSign)

router.get('*', function(req, res) {
  res.send({
    error: 'This route does not exist, try /signs or /signs/(solar, moon or rising) :)'
  })
})

module.exports = router

