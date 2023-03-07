# Backend Aplikasi menggunakan Laravel 8
Buat environment variable  
copy dari file .env.example  
edit .env
```
DB_CONNECTION=mysql
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```
Install dependencies
```bash
cd backend-test\
composer install\
php artisan migrate:run\
php artisan key:generate\
php artisan serve
```
# Frontend Aplikasi menggunakan VUE
Buat environment variable   
edit .env  
```
VITE_APP_BASE_URI=<backend hostname>
```
Install dependencies
```bash
npm install
```