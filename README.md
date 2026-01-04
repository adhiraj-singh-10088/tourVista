# TourVista 🌍

A responsive tour listing web application built with React, consuming a REST API backend to display real tour data with a clean, modern UI.

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
- React (Vite)
- JavaScript
- CSS

### Backend
- Node.js
- Express
- REST API

---

## 📁 Project Structure

practiceProject/
├── client/ # React frontend
├── controllers/ # Backend controllers
├── routes/ # API routes
├── dev-data/ # Sample / seed data
├── app.js
└── server.js


---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/adhiraj-singh-10088/practiceProject.git
cd practiceProject
```

2. Start the backend server
npm install
node server.js


Backend runs at:

http://localhost:3000

3. Start the frontend
cd client
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🔗 API Usage

The frontend consumes tour data from the backend:

GET /api/v1/tours

🤝 Credits

Backend API and project base provided by
Adhiraj Singh

Frontend UI, React integration, and enhancements by
Zahed

📄 License

This project is for learning and practice purposes.
