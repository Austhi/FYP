import hash from '@adonisjs/core/services/hash'
import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['email'],
    passwordColumnName: 'password',
  })

export default class Request extends compose(BaseModel, AuthFinder) {
    @column({ isPrimary: true })
    declare id: number
  
    @column()
    declare user_id: string

    @column()
    declare requestType: string

    @column()
    declare status: number

    @column()
    declare data: any

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime
  
    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null
  
    static accessTokens = DbAccessTokensProvider.forModel(Request)
}