import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Candidate from './Candidate'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public completeName: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public rememberMeToken?: string

  @hasMany(() => Candidate)
  public candidates: HasMany<typeof Candidate>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
