import type { HttpContext } from '@adonisjs/core/http'
import { createRequestValidator, interactRequestValidator } from '#validators/request'
import User from '#models/user'
import Request from '#models/request'
import axios from 'axios'
import { transversalUrl } from '#start/network'


export default class RequestController {
    async getRequestTypePossible({ auth, response }:  HttpContext) {
        response.json(["assign", "desassign"])
    }

    async create({request, auth, response}:  HttpContext) {
        await auth.authenticate()
        const user = auth.getUserOrFail()

        // check role for typeOfRequest
        const payload = await request.validateUsing(createRequestValidator)

        if (payload.typeRequest == "assign" || payload.typeRequest == "desassign") {
            const payload_with_role = {requestType: payload.typeRequest, data: JSON.stringify({patient_id: payload.id_patient}), status: 'Waiting', doctor_id: user.doctorId}
            const newReq = await Request.create(payload_with_role)
            return response.ok({newReq})
        } else {
            response.status(400).json({message: "RequestType didn't exist"})
        }
            

        // return response.ok({message: "Request created"})
    }

    async get({request, auth, response}:  HttpContext) {
        try {
            await auth.authenticate()
        } catch (error) {
          return response.unauthorized({ error: 'You must be logged in to create a medical record' })
        }
        const user = auth.getUserOrFail()
        console.log(user.role)
        if (user.role == "admin") {
            const reqList = await Request.query().where('status', 'like', `%${"Waiting"}%`); // Recherche partielle avec des jokers
            console.log(reqList)

            const formatedReqList = reqList.map((element) => {
                // const Get Doctor Link

                return { id: element.id, type: element.requestType  };
              });
    
            return response.ok(reqList)
        } else {
            // response.unauthorized()
            response.status(400).json({error: "Error"})
        }
            

        // return response.ok({message: "Request created"})
    }

    async interaction({request, auth, response}:  HttpContext) {
        try {
            await auth.authenticate()
        } catch (error) {
          return response.unauthorized({ error: 'You must be logged in to create a medical record' })
        }
        const user = auth.getUserOrFail()
        if (user.role != "admin")
            return response.unauthorized()
    
        const payload = await request.validateUsing(interactRequestValidator)

        const requestItem = await Request.findBy({id: payload.requestID})

        if (requestItem && payload.validation === true) {
            if (requestItem.requestType == "assign") {
                const patientList = JSON.parse(requestItem.data).patient_id
                console.log(patientList)
                
                const results = await Promise.all(patientList.map(async (patient_id: string) => {
                    return await axios.post(`${transversalUrl}/link/add`, {
                      doctor_id: requestItem.doctor_id, 
                      patient_id: Number(patient_id)
                    })
                }))
                requestItem.delete()
                response.ok({msg: "Request validated"})
            } else if (requestItem.requestType == "desassign") {
                const patientList = JSON.parse(requestItem.data).patient_id
                console.log(patientList)
                
                const results = await Promise.all(patientList.map(async (patient_id: string) => {
                    return await axios.post(`${transversalUrl}/link/remove`, {
                      doctor_id: requestItem.doctor_id, 
                      patient_id: Number(patient_id)
                    })
                }))
                requestItem.delete()
                response.ok({msg: "Request validated"})
            } else {
                response.status(400).json({message: "Request type isn't possible"})
            }
        } else if (requestItem && payload.validation === false) {
            requestItem.delete()
        } else {
            response.status(400).json({message: "Request didn't exist"})
        }
            

        // return response.ok({message: "Request created"})
    }

}