
# Affiliate Marketing Platform

## **Overview**

This project is a **Fullstack web application** built with **React** (frontend) and **Django** (backend). It is designed to facilitate affiliate marketing by allowing users to promote courses, track referrals, and manage earnings.

---

## **Core Technologies**

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS (or any other CSS framework you're using)
- **Backend:**
  - Python
  - Django
  - Django REST Framework (DRF)
- **Database:**
  - SQLite (default for development) or PostgreSQL (for production)

---

## **Prerequisites**

Before you begin, ensure you have the following installed:

- **Python 3.x** ([Download Python](https://www.python.org/downloads/))
- **Node.js** (for frontend development) ([Download Node.js](https://nodejs.org/))
- **pip** (usually comes bundled with Python)
- **Git** ([Download Git](https://git-scm.com/))

---

## **Installation**

### **1. Clone the Repository**

```bash
git clone https://github.com/Jayteemighty/affiliate-marketing.git
cd affiliate-marketing
```

### **2. Set Up the Backend**

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):

   - **Linux/macOS:**

     ```bash
     python -m venv venv
     source venv/bin/activate
     ```

   - **Windows:**

     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```

3. Install backend dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:

   - Copy the `.env.example` file to `.env`:

     ```bash
     cp .env.example .env
     ```

   - Update the `.env` file with your database credentials and other settings.

5. Run database migrations:

   ```bash
   python manage.py migrate
   ```

6. Create a superuser account (for admin access):

   ```bash
   python manage.py createsuperuser
   ```

7. Start the backend development server:

   ```bash
   python manage.py runserver
   ```

   The backend will be running at `http://127.0.0.1:8000/`.

---

### **3. Set Up the Frontend**

1. Navigate to the `frontend` folder:

   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm start
   ```

   The frontend will be running at `http://localhost:5173/`.

---

## **Development Setup**

### **Backend**

- **Run the development server:**

  ```bash
  python manage.py runserver
  ```

- **Run tests:**

  ```bash
  python manage.py test
  ```

### **Frontend**

- **Run the development server:**

  ```bash
  npm start
  ```

- **Run tests:**

  ```bash
  npm test
  ```

- **Build for production:**

  ```bash
  npm run build
  ```

---

## **Branching Strategy**

To maintain a clean and organized codebase, follow these guidelines:

1. **Do not push directly to the `main` branch.**
2. Create a new branch for each feature or bugfix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Once the feature is complete and tested, create a **Pull Request (PR)** from your branch to the `main` branch.
4. After the PR is reviewed and approved, I would merge it into `main`.

---

## **Environment Variables**

The project uses a `.env` file to manage environment variables. Here’s how to set it up:

1. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your specific configurations, such as:

   - Database credentials
   - Secret key
   - API keys (if any)

---

## **Project Structure**

### **Backend**

```
backend/
├── manage.py
├── requirements.txt
├── .env.example
├── .env
├── app/
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── urls.py
│   └── ...
└── ...
```

### **Frontend**

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   ├── index.tsx
│   └── ...
├── package.json
├── tsconfig.json
└── ...
```

---

## **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear and descriptive messages.
4. Push your branch to your forked repository.
5. Open a Pull Request (PR) to the `main` branch of this repository.

---

## **Contact**

For questions or support, please contact:

- **Name:** Adesina Joshua
- **Email:** tolujosh1@gmail.com
- **GitHub:** https://github.com/Jayteemighty

---
