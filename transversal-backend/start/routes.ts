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
import RelationControler from '#controllers/RelationsController'
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

  // Modify Doctor
  // Delete Doctor
}).prefix('doctor')

router.group(() => {
  router.post('add', [RelationControler, 'add'])
  router.post('remove', [RelationControler, 'remove'])
  router.post('search', [RelationControler, 'search'])
}).prefix('link')

router.group(() => {
  router.post('create', [PatientController, 'create'])
  router.post('modify', [PatientController, 'modify'])
  router.post('delete', [PatientController, 'delete'])
  router.get('get', [PatientController, 'getPatientInfo'])
}).prefix('patient')
