# nestjs-practice

A small NestJS practice API for managing profiles. Profiles are kept in memory, so they reset every time the server restarts.

## Requirements

- Node.js 20 or newer
- npm

## Setup

```bash
git clone https://github.com/MuhammadHozaif-Bitsol/nestjs-practice.git
cd nestjs-practice
npm install
```

## Running the app

```bash
# development, rebuilds and restarts on every save
npm run start:dev

# run once, no watching
npm run start

# production build
npm run build
npm run start:prod
```

The server runs on `http://localhost:3000`. Set the `PORT` environment variable to use a different port.

## Tests

```bash
# unit tests (Vitest)
npm test

# unit tests in watch mode
npm run test:watch

# end-to-end tests
npm run test:e2e

# coverage report
npm run test:cov
```

## Code quality

```bash
# format with Prettier
npm run format

# lint with oxlint
npm run lint
```

## API

| Method | Route | Description |
|---|---|---|
| `GET` | `/profiles` | List all profiles |
| `GET` | `/profiles/:id` | Get one profile |
| `POST` | `/profiles` | Create a profile |
| `PUT` | `/profiles/:id` | Update a profile's name and/or description |
| `DELETE` | `/profiles/:id` | Delete a profile |

`:id` must be a UUID, or the request returns `400 Bad Request`. An unknown id returns `404 Not Found`.

### Validation

- `name`: string, 3 to 100 characters on create, 3 to 50 on update
- `description`: string, at most 300 characters on update

On update, both fields are optional, but at least one must be sent.

### Examples

```bash
# list profiles
curl http://localhost:3000/profiles

# create a profile
curl -X POST http://localhost:3000/profiles \
  -H "Content-Type: application/json" \
  -d '{"name": "Sara Khan", "description": "Nurse who likes painting."}'

# update a profile
curl -X PUT http://localhost:3000/profiles/<id> \
  -H "Content-Type: application/json" \
  -d '{"name": "Sara K"}'

# delete a profile
curl -X DELETE http://localhost:3000/profiles/<id>
```

## Nest CLI commands used

```bash
npx nest g module profiles
npx nest g controller profiles
npx nest g service profiles
npx nest g guard profiles
```

## Project structure

```
src/
  main.ts                  app entry point, global ValidationPipe
  app.module.ts            root module
  profiles/
    profiles.module.ts
    profiles.controller.ts routes
    profiles.service.ts    in-memory data and logic
    profiles.guard.ts      generated guard, not used yet
    dto/
      create-profile.dto.ts
      update-profile.dto.ts
```
