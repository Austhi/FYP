import type { HttpContext } from '@adonisjs/core/http'
import { createRequestValidator } from '#validators/request'
import User from '#models/user'
import Request from '#models/request'


export default class RequestController {
    async create({request, auth, response}:  HttpContext) {
        const user = auth.getUserOrFail()
        const payload = await request.validateUsing(createRequestValidator)

        if (payload.typeRequest == "assign") {
            const payload_assign = await request.validateUsing(createRequestValidator)
            const payload_with_role = {requestType: payload.typeRequest, data: JSON.stringify({patient_id: payload.id_patient}), status: 'Waiting', user_id: user.id}
            const newReq = await Request.create(payload_with_role)
    
    
            return response.ok({newReq})
        } else {
            response.status(400).json({message: "RequestType didn't exist"})
        }
            

        // return response.ok({message: "Request created"})
    }

    async get({request, auth, response}:  HttpContext) {
        const user = auth.getUserOrFail()

        if (user.administrator == true) {
            const reqList = await Request.query().where('status', 'like', `%${"Waiting"}%`); // Recherche partielle avec des jokers
            console.log(reqList)

            const formatedReqList = reqList.map((element) => {
                // const Get Doctor Link

                return { id: element.id, type: element.typeRequest,  };
              });
    
            return response.ok(reqList)
        } else {
            response.unauthorized()
        }
            

        // return response.ok({message: "Request created"})
    }
}