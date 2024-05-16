import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateMedicalRelation extends BaseSchema {
  protected tableName = 'medical_relations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Primary key

      // Define the foreign key for doctorID, referencing the Doctors table
      table
        .integer('doctor_id')
        .unsigned() // Foreign keys are typically unsigned
        .notNullable() // It should always have a value
        .references('id') // Refers to the 'id' column in another table
        .inTable('doctors') // In the 'doctors' table
        .onDelete('CASCADE') // Optional: define what happens when parent row is deleted
        .onUpdate('CASCADE') // Optional: define what happens when parent row is updated

      // Define the foreign key for patientID, referencing the Patients table
      table
        .integer('patient_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('patients')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').nullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName) // Drop the table if rolling back migration
  }
}