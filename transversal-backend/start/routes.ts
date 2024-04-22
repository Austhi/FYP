/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import DoctorController from '#controllers/DoctorController'
import PatientController from '#controllers/PatientsController'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    provenance: 'transversal',
    msg: 'hello world',
  }
})

router.group(() => {
  router.post('create', [DoctorController, 'create'])
  router.get('get', [DoctorController, 'getDoctor'])
}).prefix('doctor')

router.group(() => {
  router.post('create', [PatientController, 'create'])
  router.get('get', [PatientController, 'getPatientInfo'])
}).prefix('patient')
