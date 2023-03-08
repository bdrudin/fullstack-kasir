import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Categorie from './Categorie'
import User from './User'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string
  @column()
  public summary: string
  @column()
  public release_date: string
  @column()
  public stock: number
  @column()
  public category_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Categorie, {
    foreignKey: "category_id"
  })
  public categorie: BelongsTo<typeof Categorie>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'book_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: "borrows"
  })
  public users: ManyToMany<typeof User>
  
}
