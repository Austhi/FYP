import type { HttpContext } from '@adonisjs/core/http'
import { createValidator, deleteValidator, findPatient, getPatient, modifyValidator } from '#validators/patient'
import Patient from '#models/patient'
import MedicalRelation from '#models/medical_relation'

interface DeleteLinkPayload {
    doctor_id: number | undefined,
    patient_id: number
}

export default class PatientController {
    async create({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createValidator)
        const payload_more = {fullName: payload.fullName, email: payload.email, birth_date: payload.birth_date ? payload.birth_date : "", medical_id: payload.medical_id ? payload.medical_id : ""}
        console.log(payload_more)
        const patient = await Patient.create(payload_more)
        return response.created(patient)
    }

    async modify({ request, response }: HttpContext) {
        const payload = await request.validateUsing(modifyValidator)
        const patient = await Patient.findBy({ id: payload.id }) // Using await to ensure you have the result
        if (!patient)
            return response.status(300).json({message: "ID cannot be found"})
        const payload_more = {id: payload.id, fullName: payload.fullName ? payload.fullName : patient.fullName, email: payload.email ? payload.email : patient.email, birth_date: payload.birth_date ? payload.birth_date : patient.birth_date, medical_id: payload.medical_id ? payload.medical_id : patient.medical_id }
        console.log(payload_more)
        const patientUpdated = await Patient.updateOrCreate({ id: payload.id }, payload_more)
        return response.status(200).json(patientUpdated)
    }

    async delete({ request, response }: HttpContext) {
        const payload = await request.validateUsing(deleteValidator)
        const patient = await Patient.findBy({ id: payload.id }) // Using await to ensure you have the result
        if (patient) {
                // delete all link related to doctor
                const payloadlinks: DeleteLinkPayload = {
                    doctor_id: undefined,
                    patient_id: patient.id
                }
    
    
                const relations = await MedicalRelation.query().where('patient_id', payloadlinks.patient_id);
    
                const relationsList = await Promise.all(relations.map(async (relation) => {
                    const link = await MedicalRelation.findBy('id', relation.id);
                    if (link)
                        link.delete()
                    else
                        console.log("link cannot be find")
                }));
              
                console.log(relationsList); // Log the list of attributes
    

            await patient.delete() // Delete the record
            console.log(`Patient with ID ${payload.id} deleted successfully`)
        } else {
            console.log(`Patient with ID ${payload.id} not found`)
        }
        return response.status(200)
    }

    async getPatientInfo({ request, response }: HttpContext) {
        console.log(request.qs())
        const payload = await request.validateUsing(getPatient)
        const patient = await Patient.findBy(payload)
        return response.status(200).json(patient)
    }
    async findBy({ request, response }: HttpContext) {
        console.log(request.qs())
        const payload = await request.validateUsing(findPatient)
        const patients = await Patient.query().where('fullName', 'like', `%${payload.name ? payload.name : ""}%`); // Recherche partielle avec des jokers
        return response.status(200).json(patients)
    }
}