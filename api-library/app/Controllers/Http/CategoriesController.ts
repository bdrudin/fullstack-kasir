import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategoryValidator from 'App/Validators/CategoryValidator'
import Categorie from 'App/Models/Categorie'


export default class CategoriesController {
  // Tampil semua kategory
  public async index({response}: HttpContextContract) {
    /**
     * @swagger
     * /api/v1/categories:
     *  get:
     *    tags:
     *      - categories
     *    summary: Show all categories
     *    responses:
     *      200:
     *        description: Show all categories
     *        example: Successfully show all categories
     */
 
    const categories = await Categorie.query().preload('books')
    return response.ok({
      message: "Success",
      categories
    })
  }

  // public async create({}: HttpContextContract) {}
  // tambah kategori
  public async store({request, response}: HttpContextContract) {
    /**
     * @swagger
     * /api/v1/categories:
     *  post:
     *    tags:
     *      - categories
     *    summary: Add category
     *    requestBody:
     *      required: true
     *      content:
     *        application/x-www-form-urlencoded:
     *          schema:
     *            type: object
     *            properties:
     *              name: 
     *                type: string
     *            required:
     *              - name
     *    responses:
     *      200:
     *        description: Add category 
     *        example: Successfully added category
     */

    const category = await request.validate(CategoryValidator);
    await Categorie.create(category)
    return response.created({
      message: "Successfully Added Category"
    })

  }

  // Tampilkan detail kategori
  public async show({response, params}: HttpContextContract) {
    /**
     * @swagger
     * /api/v1/categories/{category_id}:
     *  get:
     *    tags:
     *      - categories
     *    summary: Show details category
     *    parameters:
     *      - in: path
     *        name: id
     *        description: The category id
     *        required: true
     *        type: integer
     *        minimum: 1
     *    responses:
     *      200:
     *        description: Show category by id
     *        example: Successfully show details category id
     */
    const categoryId = params.id
    try {
      const findCategory = await Categorie.query().where("id", categoryId).preload("books").firstOrFail()
  
      return response.ok({
        message: "Success found categories",
        data: findCategory
      })
    } catch (err) {
      response.status(404)
      return response.ok({
        error: err.message
      })
    }
  }

  // public async edit({}: HttpContextContract) {}

  // perbarui kategori by id
  public async update({request,response, params}: HttpContextContract) {
    /**
     * @swagger
     * /api/v1/categories/{category_id}:
     *  put:
     *    tags:
     *      - categories
     *    summary: Update category
     *    parameters:
     *      - in: path
     *        name: id
     *        description: The category id
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
     *              name: 
     *                type: string
     *            required:
     *              - name
     *    responses:
     *      200:
     *        description: Update category by id
     *        example: Successfully update category id
     */
    const categoryId = params.id
    const category = await request.validate(CategoryValidator);
    await Categorie.query()
      .where('id', categoryId)
      .update(category)

      return response.ok({
        message: "Successfully updated id: " + categoryId
      })

  }

  // Hapus kategory by id
  public async destroy({response, params}: HttpContextContract) {
    /**
     * @swagger
     * /api/v1/categories/{category_id}:
     *  delete:
     *    tags:
     *      - categories
     *    summary: Delete category
     *    parameters:
     *      - in: path
     *        name: id
     *        description: The category id
     *        required: true
     *        type: integer
     *        minimum: 1
     *    responses:
     *      200:
     *        description: delete category by id
     *        example: Successfully deleted category id
     */
    const categoryId = params.id

    const deletedCategory = await Categorie.findOrFail(categoryId)
    await deletedCategory.delete()
      return response.ok({
        message: "Successfully deleted category: " + categoryId
      })
  }
}
