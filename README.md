# Library API

This is small library api that can retrieve books data, authors data, member register, login with session data, borrow books and return that borrowed books with full authorization and authentication.

## Installation

First, install npm dependencies:

```bash
npm install
```

Second, migrate database:

```bash
npx prisma migrate dev --name init
```

Then, populate books, authors and additional data:

> Additional, after running seed commend, then commend out seed function inside seed.ts

```bash
npm run seed
```

Finally, run express/node server:

```bash
npm run dev
```

## Contribution and fix error

Always welcome for contribution to add additional features. For example, adding borrowing transition, return transition, etc that I am not cover yet for now for this API. Free free to make pull request.
