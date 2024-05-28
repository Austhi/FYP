import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
// import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'


export default class MedicalRecord extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare patient_id: Number

  @column()
  declare age: Number | null

  @column()
  declare chest_pain: Number | null

  @column()
  declare restingBP: Number | null

  @column()
  declare serum_cholestrol: Number | null

  @column()
  declare fasting_blood_sugar: Number | null

  @column()
  declare resting_electro_records: Number | null

  @column()
  declare max_heart_rate: Number | null

  @column()
  declare exercise_angia: Number | null

  @column()
  declare old_peak: Number | null

  @column()
  declare slope: Number | null

  @column()
  declare no_major_vessels: Number | null

  @column.dateTime()
  public medicalCheckDate!: DateTime
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}