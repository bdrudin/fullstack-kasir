/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource("categories", "CategoriesController").apiOnly()
  Route.resource("books", "BooksController").apiOnly()
}).prefix('/api/v1').middleware(['auth', 'verify'])

Route.group(() => {
  Route.post("/register", "AuthController.register")
  Route.post("/login", "AuthController.login")
  Route.post("/otp-confirmation", "AuthController.otpConfirmation").middleware('auth')
  Route.post("/profile", "AuthController.Updateprofile").middleware(['auth', 'verify'])

  // Create routes borrow
  Route.post("/book/:id/borrow", "BorrowsController.store").middleware(['auth', 'verify', 'isUser'])
  Route.get("/borrow/:id", "BorrowsController.show").middleware(['auth', 'verify', 'isAdmin'])
  Route.get("/borrow", "BorrowsController.index").middleware(['auth', 'verify', 'isAdmin'])

}).prefix('/api/v1')