# 🚀 Eduverse – AI-Powered Learning Platform

Eduverse is a full-stack **MERN-based EdTech platform** that enables users to create, explore, and enroll in courses with an integrated **AI assistant**, secure payments, and a modern dashboard experience.

---

## 🌐 Live Demo

* Frontend: https://your-frontend-link.vercel.app
* Backend: https://your-backend-link.onrender.com

---

## 📌 Features

### 🔐 Authentication

* Secure Signup & Login (JWT-based)
* Role-based access (Student / Instructor)

### 🎓 Course System

* Create, edit, and manage courses
* Enroll in courses
* Track course progress

### 💳 Payments

* Razorpay integration for secure transactions

### 📊 Dashboard

* Student dashboard (enrolled courses, progress)
* Instructor dashboard (course management, analytics)

### 🤖 AI Assistant (Ollama)

* Chat-based AI for:

  * Course explanation
  * Quiz generation
  * Topic summarization

### 🌙 UI/UX

* Fully responsive design
* Dark/Light mode support
* Clean and modern UI with Tailwind CSS

### 💬 Additional Features

* Discussion system
* Saved courses
* Notifications
* Analytics dashboard

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Redux Toolkit
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

### Other Tools

* Razorpay (Payments)
* Cloudinary (Media Upload)
* Ollama (Local AI Model)

---

## 📁 Project Structure

```
Eduverse/
├── src/              # Frontend (React)
├── server/           # Backend (Node/Express)
├── public/
├── package.json
```

---

## ⚙️ Environment Variables

### Backend (`server/.env`)

```
MONGO_URI=
JWT_SECRET=
CLOUD_NAME=
API_KEY=
API_SECRET=
RAZORPAY_KEY=
RAZORPAY_SECRET=
MAIL_HOST=
MAIL_USER=
MAIL_PASS=
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/eduverse.git
cd eduverse
```

### 2️⃣ Install dependencies

```
npm install
cd server && npm install
```

### 3️⃣ Run the project

```
# Backend
cd server
npm run dev

# Frontend
cd ..
npm start
```

---

## 📸 Screenshots

![Home](images/mainpage.png)

---

## 🧠 Future Improvements

* Real-time chat & notifications
* Advanced analytics dashboard
* AI recommendations system
* Mobile app version

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 👨‍💻 Author

Abhishek Singh

---

⭐ If you like this project, give it a star!
