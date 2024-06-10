This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. you will need to [install mysql](https://dev.mysql.com/downloads/mysql/)
2. after installation and creation of a root user add db info to your `.env` file
   * ```DATABASE_URL="mysql://<mysqlrootuser>:<mysqlpassword>@localhost:3306/lpfdb"```
3. Init the database
   * `npx prisma generate`
   * `npx prisma migrate dev`
3. seed your database by running `npx prisma db seed`. This will create two users with the following credentials:
   * `admin@admin.com` / `password`
   * `external@user.com` / `password`
   * you can run `npx prisma studio` to get a GUI for viewing our db, and validate you can see 2 new users
4. for auth to work, you will need to add a `NEXTAUTH_SECRET` to `.env`
   * you can get a satisfactory development secret from https://generate-secret.vercel.app/32
   * update your .env to add the line `NEXTAUTH_SECRET=<generated_secret>`
5. npm install and then run the development server:
  * `npm i`
  * `npm run dev`
  * you should be able to log in to the site that opens at [http://localhost:3000](http://localhost:3000) with your seeded credentials


## Next Development
You can start editing the homepage by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
