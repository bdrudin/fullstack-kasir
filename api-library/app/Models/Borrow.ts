import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Book from './Book'

export default class Borrow extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number
  @column()
  public book_id: number
  @column()
  public loan_date: Date
  @column()
  public return_date: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: "user_id"
  })
  public users: BelongsTo<typeof User>

  @belongsTo(() => Book, {
    foreignKey: "book_id"
  })
  public books: BelongsTo<typeof Book>
}
