/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import axios from 'axios'

// //------------------------
// import swagger from '#config/swagger';
// import AutoSwagger from '@outloud/adonis-autoswagger';
// // returns swagger in YAML
// router.get("/swagger", async () => {
//   return AutoSwagger.default.docs(router.toJSON(), swagger);
// });
// // Renders Swagger-UI and passes YAML-output of /swagger
// router.get("/docs", async () => {
//   return AutoSwagger.default.ui("/swagger");
// });
// //------------------------

const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])
  router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  router.get('me', async ({ auth, response }) => {
    try {
      const user = auth.getUserOrFail()
      return response.ok(user)
    } catch (error) {
      return response.unauthorized({ error: 'User not found' })
    }
  })
  .use(middleware.auth())
}).prefix('user')

// ajoutez cette route

router.group(() => {
  router.get('/', async () => {
    return {
      provenance: 'api',
      msg: 'hello world',
    }
  })
}).prefix('api');

const medicalUrl = 'http://medical:3335';
const transversalUrl = 'http://transversal:3334';

router.group(() => {
  router.get('/transversal', async ({ response }) => {
    console.log("GET /transversal")
    try {
      const { data } = await axios.get(transversalUrl + '/');
      return response.status(200).json(data); // Send the response data to the client
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: 'Internal server error' }); // Handle errors
    }
  });

  router.get('/medical', async ({ response }) => {
    try {
      const { data } = await axios.get(medicalUrl + '/');
      return response.status(200).json(data); // Send the response data to the client
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: 'Internal server error' }); // Handle errors
    }
  });
}).prefix('access');