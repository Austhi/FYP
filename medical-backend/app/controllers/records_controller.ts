import type { HttpContext } from '@adonisjs/core/http'
import MedicalRecord from '#models/medicalRecords'
import { createValidator, deleteValidator, getValidator, modifyValidator } from '#validators/records'
import { DateTime } from 'luxon';

export default class RecordsController {

    async get({ request, response }: HttpContext) {
        const payload = await request.validateUsing(getValidator)
        const records = await MedicalRecord.findManyBy({ patient_id: payload.patientID }) // Using await to ensure you have the result
        return response.status(200).json(records)
    }

    async create({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createValidator)

        const payload_more = {
            patient_id: Number(payload.patientID), 
            age: payload.data.age ?? null,
            chest_pain: payload.data.chest_pain ?? null,
            restingBP: payload.data.restingBP ?? null,
            serum_cholestrol: payload.data.serum_cholestrol ?? null,
            fasting_blood_sugar: payload.data.fasting_blood_sugar ?? null,
            resting_electro_records: payload.data.resting_electro_records ?? null,
            max_heart_rate: payload.data.max_heart_rate ?? null,
            exercise_angia: payload.data.exercise_angia ?? null,
            old_peak: payload.data.oldpeak ?? null,
            slope: payload.data.slope ?? null,
            no_major_vessels: payload.data.no_major_vessels ?? null,
            medicalCheckDate: DateTime.fromISO(payload.medical_record_date), // Ensure this matches your date format
        }
        console.log(payload_more)
        const record = await MedicalRecord.create(payload_more)
        return response.created(record)
    }

    async modify({ request, response }: HttpContext) {
        const payload = await request.validateUsing(modifyValidator)

        const record = await MedicalRecord.findBy({id: payload.id})
        if (!record)
            return response.status(300)
        const payload_more = {
            patient_id: record.patient_id, 
            age: payload.modifiedData.age ? payload.modifiedData.age : record.age, 
            chest_pain: payload.modifiedData.chest_pain ? payload.modifiedData.chest_pain : record.chest_pain,
            restingBP: payload.modifiedData.restingBP ? payload.modifiedData.restingBP : record.restingBP,
            serum_cholestrol: payload.modifiedData.serum_cholestrol ? payload.modifiedData.serum_cholestrol : record.serum_cholestrol,
            fasting_blood_sugar: payload.modifiedData.fasting_blood_sugar ? payload.modifiedData.fasting_blood_sugar : record.fasting_blood_sugar,            
            resting_electro_records: payload.modifiedData.resting_electro_records ? payload.modifiedData.resting_electro_records : record.resting_electro_records,
            max_heart_rate: payload.modifiedData.max_heart_rate ? payload.modifiedData.max_heart_rate : record.max_heart_rate,
            exercise_angia: payload.modifiedData.exercise_angia ? payload.modifiedData.exercise_angia : record.exercise_angia,
            old_peak: payload.modifiedData.oldpeak ? payload.modifiedData.oldpeak : record.old_peak,
            slope: payload.modifiedData.slope ? payload.modifiedData.slope : record.slope,
            no_major_vessels: payload.modifiedData.no_major_vessels ? payload.modifiedData.no_major_vessels : record.no_major_vessels,
            medicalCheckDate: payload.modifiedData.medical_record_date ? DateTime.fromISO(payload.modifiedData.medical_record_date) : record.medicalCheckDate,
        }
        console.log(payload_more)
        const modifiedRecord = await MedicalRecord.create(payload_more)
        return response.created(modifiedRecord)
    }

    async delete({ request, response }: HttpContext) {
        const payload = await request.validateUsing(deleteValidator)
        const record = await MedicalRecord.findBy({ id: payload.id }) // Using await to ensure you have the result
        if (record) {
            // If the patient is found, delete it
            await record.delete() // Delete the record
            return response.status(200).json({msg: `Patient with ID ${payload.id} deleted successfully`})
        } else {
            return response.status(204).json({msg: `Patient with ID ${payload.id} not found`})
        }
    }
}
