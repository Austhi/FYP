/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import RecordsController from '#controllers/records_controller'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.post('create', [RecordsController, 'create'])
  router.post('modify', [RecordsController, 'modify'])
  router.post('delete', [RecordsController, 'delete'])
  router.get('get', [RecordsController, 'get'])

}).prefix('records')

router.get('/', async () => {
  return {
    provenance: 'medical',
    msg: 'hello world',
  }
})
