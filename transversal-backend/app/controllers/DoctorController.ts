import type { HttpContext } from '@adonisjs/core/http'
import { createValidator, getDoctor } from '#validators/doctor'
import Doctor from '#models/doctor'

export default class DoctorController {
    async create({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createValidator)
        const payload_more = {fullName: payload.fullName, email: payload.email, role: payload.role, PatientsID: [].toString()}
        const doctor = await Doctor.create(payload_more)
        return response.created(doctor)
    }

    async getDoctor({ request, response }: HttpContext) {
        console.log(request.qs())
        const payload = await request.validateUsing(getDoctor)
        const doctor = await Doctor.findBy(payload)
        return response.status(200).json(doctor)
    }
}