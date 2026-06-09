# Kino Booking API 🍿

A robust REST API for a cinema booking system, built as a clone of local cinema services. This project demonstrates backend architecture, relational database design, and modern TypeScript practices.

## 🛠 Tech Stack
- **Framework:** NestJS (Node.js) & TypeScript
- **Database:** PostgreSQL & TypeORM
- **Security:** JWT Authentication, Passport.js, bcrypt, Role-Based Access Control (RBAC)
- **Infrastructure:** Docker & Docker Compose
- **Documentation:** Swagger (OpenAPI)

## 🚀 Key Features
- **Authentication:** Secure user registration and login with JWT tokens.
- **Role Management:** Admin privileges for creating movies, cinemas, and sessions.
- **Booking System:** Dynamic seat generation for cinema halls and ticket ordering logic.
- **Database Seeding:** Automated script to populate the database with cities, cinemas, movies, and sessions.

## 📖 API Documentation (Swagger)
The API is fully documented using Swagger UI.
*(Below is a preview of the API endpoints)*

[ВСТАВЬ СКРИНШОТ СВОЕГО SWAGGER СЮДА (просто перетащи картинку в редактор GitHub или VSCode)]

## 💻 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone (https://github.com/tora-gari)
   cd kino-backend
   ```

2. **Start the Database (Docker):**
   ```bash
   docker compose up -d
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Populate the database with mock data:**
   ```bash
   npm run seed
   ```

5. **Start the application:**
   ```bash
   npm run start:dev
   ```

The API will be running at `http://localhost:3000`.  
Swagger documentation will be available at `http://localhost:3000/api/docs`.
g
