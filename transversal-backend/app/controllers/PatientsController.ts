import type { HttpContext } from '@adonisjs/core/http'
import { createValidator, getPatient } from '#validators/patient'
import Patient from '#models/patient'

export default class PatientController {
    async create({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createValidator)
        const medical_id = "aaa"
        const payload_more = {fullName: payload.fullName, email: payload.email, birth_date: payload.birth_date, medical_id: medical_id}
        const patient = await Patient.create(payload_more)
        return response.created(patient)
    }

    async getPatientInfo({ request, response }: HttpContext) {
        console.log(request.qs())
        const payload = await request.validateUsing(getPatient)
        const patient = await Patient.findBy(payload)
        return response.status(200).json(patient)
    }
}