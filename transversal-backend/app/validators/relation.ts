import vine from '@vinejs/vine'

export const getDoctor = vine.compile(
    vine.object({
      id: vine.string(),
    })
)

export const createValidator = vine.compile(
  vine.object({
    doctor_id: vine.number(),
    patient_id: vine.number(),
  })
)

export const searchValidator = vine.compile(
  vine.object({
    doctor_id: vine.number().optional(),
    patient_id: vine.number().optional(),
  })
)