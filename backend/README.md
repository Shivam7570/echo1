# Echo Backend (Node.js + Express + MongoDB)

REST API for the Echo Resort / Villas / Wedding / MasterPlan website.

## Folder Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # register/login/logout/me
│   ├── enquiryController.js  # contact form + chat widget submissions
│   └── propertyController.js # villas/resorts/plots CRUD
├── middleware/
│   ├── authMiddleware.js     # protect + role authorize
│   └── errorMiddleware.js    # 404 + centralized error handler
├── models/
│   ├── User.js                # admin/editor accounts
│   ├── Enquiry.js              # contact/enquiry submissions
│   └── Property.js             # villa/resort/plot listings
├── routes/
│   ├── authRoutes.js
│   ├── enquiryRoutes.js
│   └── propertyRoutes.js
├── utils/
│   ├── generateToken.js       # JWT + httpOnly cookie
│   └── seeder.js              # creates a default admin user
├── .env.example
├── app.js                     # express app + middleware + route mounting
├── server.js                  # entry point, connects DB then starts server
└── package.json
```

## Setup

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
   - `MONGO_URI` — local MongoDB (`mongodb://127.0.0.1:27017/echo_resort`) or an Atlas connection string.
   - `JWT_SECRET` — any long random string.
   - `CLIENT_URL` — your Vite dev server URL (default `http://localhost:5173`).

3. Create an admin user (for the admin dashboard / managing properties & enquiries):
   ```bash
   npm run seed
   ```
   This creates `admin@echoresort.com` / `Admin@123` by default (override with `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` env vars). **Change the password after first login.**

4. Run the server:
   ```bash
   npm run dev     # with nodemon
   # or
   npm start
   ```

Server runs on `http://localhost:5000` by default.

## API Endpoints

### Auth
| Method | Endpoint             | Access  | Description               |
|--------|-----------------------|---------|----------------------------|
| POST   | `/api/auth/register`  | Public  | Create an admin/editor user|
| POST   | `/api/auth/login`     | Public  | Login, sets JWT cookie     |
| POST   | `/api/auth/logout`    | Private | Clears JWT cookie          |
| GET    | `/api/auth/me`        | Private | Current logged-in user     |

### Enquiries (Contact form + floating chat widget)
| Method | Endpoint             | Access        | Description                          |
|--------|-----------------------|---------------|----------------------------------------|
| POST   | `/api/enquiries`      | Public        | Submit contact/enquiry/chat message   |
| GET    | `/api/enquiries`      | Admin/Editor  | List enquiries (`?status=&source=&page=&limit=`) |
| GET    | `/api/enquiries/:id`  | Admin/Editor  | Get single enquiry                     |
| PUT    | `/api/enquiries/:id`  | Admin/Editor  | Update status (new/contacted/closed)  |
| DELETE | `/api/enquiries/:id`  | Admin only    | Delete an enquiry                      |

### Properties (Villas / Resorts / Plots / Masterplan listings)
| Method | Endpoint              | Access        | Description                                  |
|--------|------------------------|---------------|-----------------------------------------------|
| GET    | `/api/properties`      | Public        | List properties (`?category=villa&featured=true`) |
| GET    | `/api/properties/:id`  | Public        | Get single property                           |
| POST   | `/api/properties`      | Admin/Editor  | Create a listing                              |
| PUT    | `/api/properties/:id`  | Admin/Editor  | Update a listing                              |
| DELETE | `/api/properties/:id`  | Admin only    | Delete a listing                              |

### Health check
`GET /api/health`

## Notes
- Passwords are hashed with bcrypt; auth uses JWT stored in an httpOnly cookie (also accepts `Authorization: Bearer <token>`).
- The public enquiry endpoint is rate-limited (20 requests / 15 min per IP) to reduce spam.
- CORS is restricted to `CLIENT_URL` and configured with `credentials: true` so cookies work cross-origin.
