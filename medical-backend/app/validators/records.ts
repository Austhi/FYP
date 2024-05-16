import vine from '@vinejs/vine'

export const createValidator = vine.compile(
    vine.object({
      patientID: vine.number(),
      medical_record_date: vine.string(),
      data: vine.any()
    })
  )

export const modifyValidator = vine.compile(
  vine.object({
    id: vine.number(),
    modifiedData: vine.any()
  })
)

export const deleteValidator = vine.compile(
    vine.object({
      id: vine.number(),
    })
  )