import vine from '@vinejs/vine'

export const getPatient = vine.compile(
    vine.object({
      id: vine.number(),
    })
)

export const deleteValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

export const createValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3).maxLength(64),
    email: vine.string(),
    birth_date: vine.string().optional(), // Optional property
    medical_id: vine.string().optional(), // Optional property
  })
)

export const modifyValidator = vine.compile(
  vine.object({
    id: vine.number(),
    fullName: vine.string().minLength(3).maxLength(64).optional(),
    email: vine.string().optional(),
    birth_date: vine.string().optional(),
    medical_id: vine.string().optional(),
  })
)