import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Borrow from 'App/Models/Borrow'
import { schema } from '@ioc:Adonis/Core/Validator'

// import BorrowValidator from 'App/Validators/BorrowValidator'
// import User from 'App/Models/User'

export default class BorrowsController {
    public async store({ request, response, auth, params }: HttpContextContract) {
        /**
     * @swagger
     * /api/v1/book/{book_id}/borrow:
     *  post:
     *    tags:
     *      - borrows
     *      - books
     *    summary: Borrow book
     *    requestBody:
     *      required: true
     *      content:
     *        application/x-www-form-urlencoded:
     *          schema:
     *            type: object
     *            properties:
     *              loan_date:
     *                type: date
     *              return_date:
     *                type: date
     *            required:
     *              - loan_date
     *              - return_date
     *    responses:
     *      200:
     *        description: Borrow book 
     *        example: Successfully borrow book
     */
        try {
            const userDataId = auth.user?.id

            const borrowValidation = schema.create({
                loan_date: schema.date({
                    format: 'yyyy-MM-dd'
                }),
                return_date: schema.date({
                    format: 'yyyy-MM-dd'
                }),
            })

            await request.validate({ schema: borrowValidation })
            const loan_date = request.input("loan_date")
            const return_date = request.input("return_date")


            await Borrow.create({
                user_id: userDataId,
                book_id: params.id,
                loan_date,
                return_date
            })

            return response.created({
                message: "Successfully borrow"
            })
        } catch (error) {
            return response.unprocessableEntity({
                error
            })
        }

    }

    public async index({ response }: HttpContextContract) {
        /**
         * @swagger
         * /api/v1/borrow/:
         *  get:
         *    tags:
         *      - borrows
         *    summary: Show all borrows
         *    responses:
         *      200:
         *        description: Show all borrows
         *        example: Successfully show borrows
         */
        try {
            const dataBorrow = await Borrow.query().preload("books").preload("users")

            return response.ok({
                message: "Successfully show borrows",
                borrows: dataBorrow
            })
        } catch (error) {
            return response.badRequest(error)
        }
    }

    public async show({ response, params }: HttpContextContract) {
        /**
     * @swagger
     * /api/v1/borrow/{borrow_id}:
     *  get:
     *    tags:
     *      - borrows
     *    summary: Show details borrow
     *    parameters:
     *      - in: path
     *        name: id
     *        description: The borrow id
     *        required: true
     *        type: integer
     *        minimum: 1
     *    responses:
     *      200:
     *        description: Show borrow by id
     *        example: Successfully show details borrow id
     */

        try {
            const dataBorrow = await Borrow.query().where("id", params.id).preload("books").preload("users").firstOrFail()
            return response.ok({
                message: "Successfully show borrow", borrow: dataBorrow
            })
        } catch (error) {
            return response.badRequest({ message: error })
        }
    }
}
