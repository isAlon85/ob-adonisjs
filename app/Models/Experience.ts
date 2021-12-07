import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Candidate from './Candidate'
import Skill from './Skill'


export default class Experience extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public candidateId: number
  @belongsTo(() => Candidate)
  public candidate: BelongsTo<typeof Candidate>

  @column()
  public skillId: number
  @belongsTo(() => Skill)
  public skill: BelongsTo<typeof Skill>

  @column()
  public level: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
