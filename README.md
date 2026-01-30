<img width="1915" height="989" alt="Screenshot 2025-10-06 182843" src="https://github.com/user-attachments/assets/1ae80d41-6292-4fb2-8087-7c4ddcb1e718" />

<img width="1913" height="981" alt="Screenshot 2025-10-06 182857" src="https://github.com/user-attachments/assets/76a0a551-56d8-4369-9f3d-1b7121d43405" />

<img width="1919" height="959" alt="Screenshot 2025-10-06 182935" src="https://github.com/user-attachments/assets/5e1e6b7b-7654-46e8-ba29-97e8a0073483" />

# Online Auction Website

An online auction platform where users can register, list products for bidding, and participate in live auctions. Built using **React** for the frontend, **Spring Boot** for the backend, and **MySQL** as the database.

---

## 🚀 Features

* User authentication (register/login)
* Browse and search auction items
* Place bids in real-time
* Auction management for sellers (add/edit/remove items)
* Secure backend API with Spring Boot
* Persistent data storage with MySQL

---

## 🛠️ Tech Stack

**Frontend:** React, Axios, Bootstrap/Tailwind (optional)
**Backend:** Spring Boot (REST APIs, JPA/Hibernate)
**Database:** MySQL
**Build Tools:** Maven, npm/yarn

---

## 📂 Project Structure

```
auction-website/
│
├── frontend/          # React app (UI)
│   ├── src/
│   └── package.json
│
├── backend/           # Spring Boot app (API + business logic)
│   ├── src/main/java/com/biddingsystem
│   ├── src/main/resources
│   └── pom.xml
│
└── database/          # SQL scripts (schema + seed data)
    └── auction.sql
```

---

## ⚙️ Setup & Installation

### Prerequisites

* Node.js (>= 16)
* Java 17 (or compatible)
* MySQL Server

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/auction-website.git
cd auction-website
```

### 2. Setup Database

* Create a database in MySQL:

```sql
CREATE DATABASE auctiondb;
```

* Import the schema:

```sql
source database/auction.sql;
```

* Update `application.properties` in backend:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/auctiondb
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### 3. Run Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

Backend will run on `http://localhost:8080`

### 4. Run Frontend (React)

```bash
cd frontend
npm install
npm start
```

Frontend will run on `http://localhost:3000`

---

## 📖 API Endpoints (Sample)

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user
* `GET /api/auctions` → List all auctions
* `POST /api/auctions` → Create new auction
* `POST /api/bids` → Place a bid

---

## 👨‍💻 Contributors

* [Ayush Singh] – Full Stack Developer

---
	
