import vine from '@vinejs/vine'

export const getDoctor = vine.compile(
    vine.object({
      id: vine.string(),
    })
)

export const createValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(3).maxLength(64),
    email: vine.string(),
    role: vine.string()
  })
)