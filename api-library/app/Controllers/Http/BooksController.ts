import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BooksValidationValidator from 'App/Validators/BooksValidationValidator';
import Book from 'App/Models/Book';

export default class BooksController {
    public async index({response}: HttpContextContract) {
      /**
     * @swagger
     * /api/v1/books:
     *  get:
     *    tags:
     *      - books
     *    summary: Show all books
     *    responses:
     *      200:
     *        description: Show all books
     *        example: Successfully show all books
     */
        const books = await Book.query().preload("categorie").preload("users")

        return response.ok({
          message: "Success",
          books
        })
      }
      
    public async store({request, response}: HttpContextContract) {
    /**
     * @swagger
     * /api/v1/books:
     *  post:
     *    tags:
     *      - books
     *    summary: Add book
     *    requestBody:
     *      required: true
     *      content:
     *        application/x-www-form-urlencoded:
     *          schema:
     *            type: object
     *            properties:
     *              title: 
     *                type: string
     *              summary:
     *                type: string
     *              release_date:
     *                type: date
     *              stock:
     *                type: integer
     *              category_id:
     *                type: integer
     *            required:
     *              - title
     *              - summary
     *              - release_date
     *              - stock
     *              - category_id
     *    responses:
     *      200:
     *        description: Add book 
     *        example: Successfully added book
     */
        const books = await request.validate(BooksValidationValidator);
        
        await Book.create({...books , release_date: books.release_date.toSQLDate()})

        // await Database
        // .table('books')
        // .insert({...payload, release_date: payload.release_date.toSQLDate()})

        return response.created({
          message: "Successfully Added book"
        })
        
      }

      public async show({response, params}: HttpContextContract) {
    /**
     * @swagger
     * /api/v1/books/{book_id}:
     *  get:
     *    tags:
     *      - books
     *    summary: Show details book
     *    parameters:
     *      - in: path
     *        name: id
     *        description: The book id
     *        required: true
     *        type: integer
     *        minimum: 1
     *    responses:
     *      200:
     *        description: Show book by id
     *        example: Successfully show details book id
     */
        const book_id = params.id
        // const findBook = await Database
        //   .from('books')
        //   .where('id', book_id)
        //   .firstOrFail()
    
        // return response.ok({
        //   message: "Success",
        //   data: findBook
        // })
        try {
          const findBook = await Book.query().where('id', book_id).preload("categorie").firstOrFail()
      
          return response.ok({
            message: "Succes",
            data: findBook
          })
        } catch (err) {
          response.status(404)
          return response.ok({
            error: err.message
          })
        }
      }

      public async update({request,response, params}: HttpContextContract) {
        /**
     * @swagger
     * /api/v1/books/{book_id}:
     *  put:
     *    tags:
     *      - books
     *    summary: Update book
     *    parameters:
     *      - in: path
     *        name: id
     *        description: The book id
     *        required: true
     *        type: integer
     *        minimum: 1
     *    requestBody:
     *      required: true
     *      content:
     *        application/x-www-form-urlencoded:
     *          schema:
     *            type: object
     *            properties:
     *              title: 
     *                type: string
     *              summary:
     *                type: string
     *              release_date:
     *                type: date
     *              stock:
     *                type: integer
     *              category_id:
     *                type: integer
     *    responses:
     *      200:
     *        description: Update book 
     *        example: Successfully Updated book
     */
        const book_id = params.id
        const books = await request.validate(BooksValidationValidator);
        await Book.query()
          .where('id', book_id)
          .update({...books, release_date: books.release_date.toSQLDate()})
          return response.ok({
            message: "Successfully updated id: " + book_id
          })
      }

      public async destroy({response, params}: HttpContextContract) {
                /**
     * @swagger
     * /api/v1/books/{book_id}:
     *  delete:
     *    tags:
     *      - books
     *    summary: deleted book
     *    parameters:
     *      - in: path
     *        name: id
     *        description: The book id
     *        required: true
     *        type: integer
     *        minimum: 1
     *    responses:
     *      200:
     *        description: delete book by id
     *        example: Successfully delete book id
     */
        const book_id = params.id
    
        const deletedBook = await Book.findOrFail(book_id)
        await deletedBook.delete()
    
          return response.ok({
            message: "Successfully deleted id: " + book_id
          })
      }
}
