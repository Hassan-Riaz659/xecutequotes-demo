# Xecute Quotes

A group health-insurance quoting platform for insurance brokers, built with **Laravel 7** and a **React** single-page app. A broker enters a client (an employer) and its census of employees, and the app prices the plans of several carriers by zip code, quarter and age bracket. It then lets the broker compare plans, save quotes and print them as PDFs.

The application ran in production. This repository is the cleaned-up, publishable version: it runs fully offline with generated demo data, no customer data, and no external service accounts.

## Features

- **Clients and census:** employer records with employee census members, editable and importable from Excel.
- **Quotes:** per client and effective-date quarter, with carrier plan prices looked up by zip code and age bracket.
- **Plan comparison:** assign, filter and compare plans, re-check a saved comparison, and save it for later.
- **PDF output:** quote and plan-comparison PDFs (dompdf) with the broker's logo.
- **Roles:** administrator, broker, and licensed employee (an agent working under a broker's licenses).
- **Billing:** free quotes, annual subscription, extra agent licenses and bought quote credits. Card payments use CardConnect in production and a local gateway in demo mode.
- **Account flows:** registration with email verification, password creation and reset, contact form, newsletter.

## Tech stack

| Layer | Technology |
|---|---|
| Backend | PHP 7.2.5 to 7.4, Laravel 7, Laravel Passport (personal access tokens), laravel-dompdf, Laravel Excel |
| Frontend | React 16 SPA compiled with Laravel Mix 5 / webpack 4 (the compiled bundle is committed) |
| Database | MySQL or MariaDB |
| Tests | PHPUnit 8 (in-memory SQLite) |

## Quick start (demo mode)

Requirements: PHP 7.4 (Laravel 7 does not run on PHP 8) with the usual Laravel extensions plus `gd` and `zip`, Composer, and a MySQL or MariaDB server. Node is only needed to rebuild the frontend.

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan passport:keys
```

Create an empty database, then edit `.env`:

```
DB_DATABASE=quote_demo
DB_USERNAME=...
DB_PASSWORD=...
DEMO_MODE=true
```

```bash
php artisan migrate:fresh --seed     # about 3 seconds
php artisan serve
```

Open http://127.0.0.1:8000 and sign in with one of the demo accounts. All use the password `Password123!`.

| Account | Role |
|---|---|
| `admin@example.test` | Administrator |
| `maria.broker@example.test` | Annual broker with 4 extra licenses and a full set of sample data |
| `noah.free@example.test` | Free broker with 1 free quote left |
| `priya.credits@example.test` | Free broker with 8 bought credits |
| `new.broker@example.test` | Brand-new broker, no data |
| `agent.lee@example.test`, `agent.kim@example.test` | Licensed employees of Maria |
| `agent.pending@example.test` | Invited agent who has not set a password yet |
| `unverified.broker@example.test` | Registered, email not yet verified |

The seeder creates 4 carriers with generated placeholder logos, about 22,000 plan prices, and 12 clients with 43 census members, 16 quotes and 8 saved quotes. Dates are relative to today. Set `DEMO_TODAY=YYYY-MM-DD` to pin them.

### What demo mode does

With `DEMO_MODE=true` nothing leaves your machine:

- payments are approved by a local gateway (`App\Services\Payment\DemoGateway`) instead of CardConnect;
- mail is written to `storage/logs` instead of being sent;
- PDF links point at your own server;
- new registrations are verified immediately.

With `DEMO_MODE=false` (the default) the app uses the CardConnect, SMTP and SendGrid settings in `.env.example`.

### Rebuilding the frontend

`public/js/app.js` is committed, so this is optional.

```bash
npm install
npm run dev          # on Node 17+: NODE_OPTIONS=--openssl-legacy-provider npm run dev
```

## Configuration

All settings live in `.env` (see [.env.example](.env.example)).

| Variable | Purpose |
|---|---|
| `DEMO_MODE` | Run without any external service |
| `CARDCONNECT_*` | Card billing credentials (production only) |
| `MAIL_*`, `SENDGRID_API_KEY` | Outgoing mail |
| `GOOGLE_MAPS_API_KEY` | Optional Google Maps browser key. The script is not loaded when empty |

## Architecture

```
app/Http/Controllers/        thin JSON API controllers (Client, Quote, User, CardConnect, ...)
app/Http/Middleware/         Cors, EnforceOwnership
app/Services/Quote/          quote logic: quarters, age brackets, plan formatting, census, PDF printing
app/Services/Payment/        payment gateway (CardConnect and demo)
app/Services/Authorization/  RoutePolicy: who may touch which record
database/migrations/         schema (the original migrations are archived in old_migrations/)
database/seeds/              reference data and demo personas
resources/js/components/     React screens
routes/api.php               11 public and 66 protected JSON routes
tests/Feature/               authorization tests
```

### Authorization

Every protected API route passes through the `ownership` middleware, which looks the route up in a single table, `App\Services\Authorization\RoutePolicy`. Each entry names a role gate and the ownership checks to run on route parameters and ids in the request body.

- The administrator can use any record.
- A broker or licensed employee can use only their own users, clients, quotes, census members, saved quotes, plans and licensed employees.
- A record that belongs to someone else is answered exactly like one that does not exist: `404 {"message":"Not Found."}`. Existence is not leaked.
- A route whose role does not allow the caller returns `403 {"message":"This action is unauthorized."}`. Administrator-only routes are `get-users`, `update-admin-password` and `add-company`. Billing and agent management are for brokers, not licensed employees.
- A route that has no policy entry is refused, and a test fails if one is added without an entry.

## Tests

```bash
php -d extension=sqlite3 -d extension=pdo_sqlite vendor/phpunit/phpunit/phpunit
```

The suite uses an in-memory SQLite database. It has 32 tests, 30 of them covering authorization:

- another user's records return 404 on 15 record routes, and nothing changes;
- owners and administrators receive identical responses;
- ids in request bodies are checked;
- administrator-only and broker-only routes refuse other roles;
- every protected route has a policy entry;
- one-time tokens never appear in JSON;
- PDF file names cannot escape their folder.

## Known limitations

- Laravel 7 and PHP 7.4 are end-of-life. `composer audit` reports advisories against the locked dependencies, so do not deploy this as-is to the public internet without upgrading.
- The user interface and the PDFs still carry the original product name, "Xecute Quotes".
- Plan prices are generated sample data. They are not real carrier rates.
- Carrier logos are generated placeholders.

## License

[MIT](LICENSE)
