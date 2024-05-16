import type { HttpContext } from '@adonisjs/core/http'
import { createValidator, deleteValidator, findDoctor, getDoctor, modifyValidator } from '#validators/doctor'
import Doctor from '#models/doctor'

export default class DoctorController {
    async create({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createValidator)
        const payload_more = {fullName: payload.fullName, email: payload.email, role: payload.role, PatientsID: [].toString()}
        const doctor = await Doctor.create(payload_more)
        return response.created(doctor)
        // return response.json({msg: "Ok"})
    }

    async modify({ request, response }: HttpContext) {
        const payload = await request.validateUsing(modifyValidator)
        const doctor = await Doctor.findBy({ id: payload.id }) // Using await to ensure you have the result
        if (!doctor)
            return response.status(300).json({message: "ID cannot be found"})
        const payload_more = {id: payload.id, fullName: payload.fullName ? payload.fullName : doctor.fullName, email: payload.email ? payload.email : doctor.email, role: payload.role ? payload.role : doctor.role }
        console.log(payload_more)
        const doctorUpdated = await Doctor.updateOrCreate({ id: payload.id }, payload_more)
        return response.status(200).json(doctorUpdated)
    }

    async getDoctor({ request, response }: HttpContext) {
        console.log(request.qs())
        const payload = await request.validateUsing(getDoctor)
        const doctor = await Doctor.findBy(payload)
        return response.status(200).json(doctor)
    }

    async delete({ request, response }: HttpContext) {
        const payload = await request.validateUsing(deleteValidator)
        const doctor = await Doctor.findBy({ id: payload.id }) // Using await to ensure you have the result
        if (doctor) {
            // If the patient is found, delete it
            await doctor.delete() // Delete the record
            console.log(`Doctor with ID ${payload.id} deleted successfully`)
        } else {
            console.log(`Doctor with ID ${payload.id} not found`)
        }
        return response.status(200)
    }

    async findBy({ request, response }: HttpContext) {
        console.log(request.qs())
        const payload = await request.validateUsing(findDoctor)
        const patients = await Doctor.query().where('fullName', 'like', `%${payload.name ? payload.name : ""}%`); // Recherche partielle avec des jokers
        return response.status(200).json(patients)
    }
}