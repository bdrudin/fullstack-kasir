import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IsUser {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    let user = await auth.user?.role

    if(user === "user"){
      await next()
    }else{
      return response.unauthorized({message: "Not allowed"})
    }
  }
}
