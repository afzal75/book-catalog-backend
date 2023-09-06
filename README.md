Live Link: https://book-catalog-backend-prisma-postgresql.vercel.app/

## Application Routes:
## User
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/auth/signup (POST)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/auth/signin (POST)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/users (GET)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/users/662a904a-15ce-4c48-b7f7-6ee0363df4de (Single GET)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/users/662a904a-15ce-4c48-b7f7-6ee0363df4de (PATCH)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/users/662a904a-15ce-4c48-b7f7-6ee0363df4de (DELETE)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/profile (GET)
## Category
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/categories/create-category (POST)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/categories (GET)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/categories/46fc5c56-c31e-495a-9833-64601f4c1891 (Single GET)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/categories/46fc5c56-c31e-495a-9833-64601f4c1891 (PATCH)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/categories/46fc5c56-c31e-495a-9833-64601f4c1891 (DELETE)
## Books
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/books/create-book (POST)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/books (GET)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/books/:84a49431-c253-4f4a-8bc2-13ffd8f33796/category (GET)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/books/:4196a34f-907e-4ac0-8f94-7184ff9178e1 (GET)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/books/:4196a34f-907e-4ac0-8f94-7184ff9178e1 (PATCH)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/books/:4196a34f-907e-4ac0-8f94-7184ff9178e1 (DELETE)
## Orders
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/orders/create-order (POST)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/orders (GET)
* https://book-catalog-backend-prisma-postgresql.vercel.app/api/v1/orders/:47c411c4-cf01-435a-a504-ea8eee6ea69a (GET)