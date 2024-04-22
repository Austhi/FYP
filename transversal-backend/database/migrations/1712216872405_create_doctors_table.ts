import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateDoctors extends BaseSchema {
  protected tableName = 'doctors'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('full_name').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('role').notNullable()
      table.json('patients_id').notNullable() // Assuming patients_id will be stored as JSON array

      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
