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
import { UserRegister, UserDeleted } from '#controllers/auth_controller'
import { HttpContext } from '@adonisjs/core/http'
import { medicalUrl, transversalUrl } from './network.js'


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
    
    router.group(() => {
      router.get('/transversal', async ({ response }) => {
        console.log("GET /transversal")
        try {
          const { data } = await axios.post(transversalUrl + '/', {data: "data"});
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
      const patients = await axios.post(transversalUrl + '/link/search', { doctor_id: user.doctorId })
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
  router.post('interaction', [RequestController, "interaction"])
  router.get('types', [RequestController, "getRequestTypePossible"])

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
  router.post('create/doctor', async ({ auth, request, response }) => {
    try {
      const user = auth.getUserOrFail()
      if (user.administrator == false)
        return response.status(401).json({"errors": [{"message": "Unauthorized access"}]})
      const req = request.body()
      console.log(req)
      
      const response_doctor_info_add = await axios.post(transversalUrl + '/doctor/create', 
      {
        "fullName": req.fullName,
        "email": req.email,
        "role": req.role ? req.role : "Undefined" 
      })
      const createRequestResponse = await UserRegister({ fullName: req.fullName, email: req.email, password: req.password ? req.password : "password", idDoctor: response_doctor_info_add.data.id});
      return response.created(createRequestResponse)
    } catch (error) {
      console.log(error)
      return response.internalServerError(error)
    }
  })
  .use(middleware.auth())
  router.post('create/patient', async ({ auth, request, response }) => {
    try {
      const user = auth.getUserOrFail()
      if (user.administrator == false)
        return response.status(401).json({"errors": [{"message": "Unauthorized access"}]})
      const req = request.body()
      console.log(req)
      
      const response_patient_info_add = await axios.post(transversalUrl + '/patient/create', 
      {
        "fullName": req.fullName,
        "email": req.email,
      })
      return response.created(response_patient_info_add.data)
    } catch (error) {
      console.log(error)
      return response.internalServerError(error)
    }
  })
  .use(middleware.auth())

  router.delete('doctor', async({ auth, request, response }) => {
    try {
      const user = auth.getUserOrFail()
      if (user.administrator == false)
        return response.status(401).json({"errors": [{"message": "Unauthorized access"}]})
      // Extract the query parameter
      const doctorID = request.input('doctorID')
      
      
      const response_doctor_info_add = await axios.post(transversalUrl + '/doctor/delete', 
      {
        "id": doctorID,
      })
      console.log(response_doctor_info_add)
      await UserDeleted({ idDoctor: doctorID});

      // const createRequestResponse = await UserRegister({ fullName: req.fullName, email: req.email, password: req.password ? req.password : "password", idDoctor: response_doctor_info_add.data.id});
      return response.status(200).json("Deleted Successfully")
    } catch (error) {
      console.log(error)
      return response.internalServerError(error.message)
    }
  })
  .use(middleware.auth())
  router.delete('patient', async ({ auth, request, response }) => {
    try {
      const user = auth.getUserOrFail()
      if (user.administrator == false)
        return response.status(401).json({"errors": [{"message": "Unauthorized access"}]})
      // Extract the query parameter
      const patientID = request.input('patientID')

      const response_patient = await axios.post(transversalUrl + '/patient/delete', 
      {
        "id": patientID,
      })

      // const createRequestResponse = await UserRegister({ fullName: req.fullName, email: req.email, password: req.password ? req.password : "password", idDoctor: response_doctor_info_add.data.id});
      return response.status(200).json("Deleted Successfully")
    } catch (error) {
      console.log(error)
      return response.internalServerError(error.message)
    }
  })
  .use(middleware.auth())

}).prefix('admin')