# Prisma setup instructions

1. Set your database connection string in the new `.env` file (DATABASE_URL).
2. Edit `prisma/schema.prisma` to define your data models.
3. Run `npx prisma migrate dev --name init` to create your first migration and generate the Prisma client.
4. Use the generated Prisma client in your code by importing from `@prisma/client`.

For more details, see the Prisma docs: https://www.prisma.io/docs/getting-started
