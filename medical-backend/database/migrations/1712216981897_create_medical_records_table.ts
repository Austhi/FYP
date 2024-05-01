import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'medical_records'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('patient_id').notNullable()
      table.string('age').nullable()
      table.string('chest_pain').nullable()
      table.string('resting_bp').nullable()
      table.string('serum_cholestrol').nullable()
      table.string('fasting_blood_sugar').nullable()
      table.string('resting_electro_records').nullable()
      table.string('max_heart_rate').nullable()
      table.string('exercise_angia').nullable()
      table.string('old_peak').nullable()
      table.string('slope').nullable()
      table.string('no_major_vessels').nullable()
      table.timestamp('medical_check_date').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}