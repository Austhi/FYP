import vine from '@vinejs/vine'

export const createRequestValidator = vine.compile(
    vine.object({
    //   id_user: vine.string(),
      typeRequest: vine.string(),
      id_patient:  vine.array(vine.string()).optional()
    })
)

export const assignRequestValidator = vine.compile(
    vine.object({
    //   id_user: vine.string(),
      typeRequest: vine.string(),
      id_patient: vine.array(vine.string())
    })
)
