import type { HttpContext } from '@adonisjs/core/http'
import { createValidator, searchValidator } from '#validators/relation'
import MedicalRelation from '#models/medical_relation'

export default class RelationControler {
    async add({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createValidator)
        console.log(payload)

        const existant_link = await MedicalRelation.findManyBy(payload)
        if (existant_link)
            return response.status(409).json({"msg": "link already exists"});

        const link = await MedicalRelation.create(payload)
        return response.created(link)
    }
    async remove({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createValidator)
        const doctor = await MedicalRelation.findBy(payload)
        if (doctor) {
            doctor?.delete()
            return response.json({message: "Link deleted"})
        } else {
            return response.json({message: "No link between those two people."})
        }
    }
    async search({ request, response }: HttpContext) {
        const payload = await request.validateUsing(searchValidator)
        if (!payload.doctor_id && !payload.patient_id) {
            return response.json({message: "Cannot find any link two people."})
        }
        const links = await MedicalRelation.findManyBy(payload)
        return response.status(200).json(links)
    }
}