# TourVista 🌍

A responsive tour listing web application built with MongoDB, Express.js, React.js and Node.js to display real tour data with a clean, modern UI.

---

## 🚀 Features

- Dynamic tour data fetched from a backend API
- Responsive card-based layout
- Modal view for detailed tour information
- Light / Dark theme support
- Clean and minimal UI

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- JavaScript
- CSS

## Preview




https://github.com/user-attachments/assets/2973d92c-8fd9-4e1b-89b4-a6c176654272






### Backend
- Node.js
- Express.js
- MongoDB

---

## 📁 Project Structure
```
practiceProject/
├── Client/ # React frontend
├── controllers/ # Backend controllers
├── routes/ # API routes
├── dev-data/ # Sample / seed data
├── models/ # Database models
├── public/ # Static assets
├── utils/ # Utility functions
├── app.js
└── server.js
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/adhiraj-singh-10088/practiceProject.git
cd practiceProject
```

2. Start the backend server

(Make a config.env file in root and set PORT, DATABASE (link to connect to the database with '<PASSWORD>' in place of the actual password), and DATABASE_PASSWORD)

```
npm install
npm run start:prod
```

Backend runs at:

http://localhost:PORT

Note: The database does not have IP whitelisting anymore (still, use your own).

3. Start the frontend
```
cd Client
npm install
npm run dev
```

Frontend runs at:

http://localhost:5173

🔗 API Usage

The frontend consumes tour data from the backend:

GET /api/v1/tours

🤝 Credits

Backend API and project base provided by:
Adhiraj

Frontend UI, React integration, and enhancements by:
Zahed

📄 License

This project is for learning and practice purposes.
