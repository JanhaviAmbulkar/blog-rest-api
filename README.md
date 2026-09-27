# Blog REST API

A complete Blog REST API built using TypeScript, Express.js, and Supabase PostgreSQL.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Supabase PostgreSQL
- REST API
- Postman

## Features

The API provides CRUD operations for:

- Users
- Posts
- Comments

It also supports relationships between users, posts, and comments.

## Database Relationships

- One user can have many posts.
- Each post belongs to one user.
- One post can have many comments.
- Each comment belongs to one post.

## Project Structure

```text
src/
├── controllers/
│   ├── user.controller.ts
│   ├── post.controller.ts
│   └── comment.controller.ts
│
├── routes/
│   ├── user.routes.ts
│   ├── post.routes.ts
│   └── comment.routes.ts
│
├── services/
│   ├── user.service.ts
│   ├── post.service.ts
│   └── comment.service.ts
│
├── db/
│   └── supabase.ts
│
└── server.ts

database/
└── schema.sql