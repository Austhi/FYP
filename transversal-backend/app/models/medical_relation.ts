import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MedicalRelation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare doctor_id: number

  @column()
  declare patient_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}