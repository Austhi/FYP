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
import RequestController from '../app/controllers/request_controller.js'


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
      router.post('register/admin', [AuthController, 'registerAsAdmin'])
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
    
    
    
    router.group(() => {
      router.get('/', async () => {
        return {
          provenance: 'api',
          msg: 'hello world',
        }
      })
    }).prefix('api');

    let medicalUrl = ''
    let transversalUrl = ''

    let customParam = 'false'

    if (customParam === 'false') {
      medicalUrl = 'http://medical:3335';
      transversalUrl = 'http://transversal:3334';
    } else {
      medicalUrl = 'http://0.0.0.0:3335';
      transversalUrl = 'http://0.0.0.0:3334';
    }
    
    
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

router.group(() => {
  // route wip
  router.get('patient_list', async ({ auth, response }) => {
    try {
      const user = auth.getUserOrFail()
      const patients = await axios.post(transversalUrl + '/link/search', { doctor_id: user.id })
      console.log(patients.data)
      let patient_list = []
      for (let i = 0; i < patients.data.length; i+= 1) {
        const patient_info = await axios.get(transversalUrl + '/patient/get', { params: {id: patients.data[i].patientId}})

        patient_list.push(patient_info.data)
      }
      console.log(patient_list)
      return response.status(200).json(patient_list)
    } catch (error) {
      console.log(error)
    }
  })
  .use(middleware.auth())
}).prefix('doctor')

router.group(() => {
  // route wip
  router.post('create', [RequestController, "create"])
  router.get('', [RequestController, "get"])
  .use(middleware.auth())
}).prefix('request')

router.group(() => {
  router.get('patient_list', async ({ auth, request, response }) => {
    try {
      const user = auth.getUserOrFail()
      if (user.administrator == false)
        return response.status(401).json({"errors": [{"message": "Unauthorized access"}]})
      const patient_list = await axios.get(transversalUrl + '/patient/findBy', { params: { name: request.qs().name ? request.qs().name : '' }})
      console.log(patient_list.data)
      return response.status(200).json(patient_list.data)
    } catch (error) {
      console.log(error)
    }
  })
  .use(middleware.auth())
  router.get('doctor_list', async ({ auth, request, response }) => {
    try {
      const user = auth.getUserOrFail()
      if (user.administrator == false)
        return response.status(401).json({"errors": [{"message": "Unauthorized access"}]})
      const doctor_list = await axios.get(transversalUrl + '/doctor/findBy', { params: { name: request.qs().name ? request.qs().name : '' }})
      console.log(doctor_list.data)
      return response.status(200).json(doctor_list.data)
    } catch (error) {
      console.log(error)
    }
  })
  .use(middleware.auth())
  router.post('assign/patient_to_doctor', async ({ auth, request, response }) => {
    try {
      const user = auth.getUserOrFail()
      if (user.administrator == false)
        return response.status(401).json({"errors": [{"message": "Unauthorized access"}]})
      const req = request.body()
      console.log(req)
      const response_link_add = await axios.post(transversalUrl + '/link/add', { "doctor_id": req.doctor_id, "patient_id": req.patient_id })
      return response.status(response_link_add.status).json(response_link_add.data)
    } catch (error) {
      console.log(error)
    }
  })
  .use(middleware.auth())
  router.post('deassign/patient_to_doctor', async ({ auth, request, response }) => {
    try {
      const user = auth.getUserOrFail()
      if (user.administrator == false)
        return response.status(401).json({"errors": [{"message": "Unauthorized access"}]})
      const req = request.body()
      console.log(req)
      const response_link_add = await axios.post(transversalUrl + '/link/remove', { "doctor_id": req.doctor_id, "patient_id": req.patient_id })
      return response.status(response_link_add.status).json(response_link_add.data)
    } catch (error) {
      console.log(error)
    }
  })
  .use(middleware.auth())
}).prefix('admin')