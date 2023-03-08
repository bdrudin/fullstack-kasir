import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IsAdmin {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    let user = await auth.user?.role

    if(user === "admin"){
      await next()
    }else{
      return response.unauthorized({message: "Not allowed"})
    }
  }
}
