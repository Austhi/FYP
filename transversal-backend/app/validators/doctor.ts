import vine from '@vinejs/vine'

export const getDoctor = vine.compile(
    vine.object({
      id: vine.string(),
    })
)

export const findDoctor = vine.compile(
  vine.object({
    name: vine.string(),
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
    role: vine.string()
  })
)

export const modifyValidator = vine.compile(
  vine.object({
    id: vine.number(),
    fullName: vine.string().minLength(3).maxLength(64).optional(),
    email: vine.string().optional(),
    role: vine.string().optional()
  })
)