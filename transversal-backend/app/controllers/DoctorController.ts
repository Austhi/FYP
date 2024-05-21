import type { HttpContext } from '@adonisjs/core/http'
import { createValidator, deleteValidator, findDoctor, getDoctor, modifyValidator } from '#validators/doctor'
import Doctor from '#models/doctor'
import MedicalRelation from '#models/medical_relation'

interface DeleteLinkPayload {
    doctor_id: number,
    patient_id: number | undefined
}

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
            // delete all link related to doctor
            const payloadlinks: DeleteLinkPayload = {
                doctor_id: doctor.id,
                patient_id: undefined
            }


            const relations = await MedicalRelation.query().where('doctor_id', payloadlinks.doctor_id);

            const relationsList = await Promise.all(relations.map(async (relation) => {
                const link = await MedicalRelation.findBy('id', relation.id);
                if (link)
                    link.delete()
                else
                    console.log("link cannot be find")
            }));
          
            console.log(relationsList); // Log the list of attributes
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