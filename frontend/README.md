# 🤖 AI Text-to-SQL UI

The frontend interface for the AI Text-to-SQL Converter. Built with React, Vite, and TypeScript, this application allows users to easily input natural language questions and view both the AI-generated SQL queries and the resulting database records.

## 📦 Tech Stack

* **Build Tool:** Vite (v7)
* **Library:** React (v19)
* **Language:** TypeScript
* **State Management:** Redux Toolkit
* **Routing:** React Router DOM (v7)
* **Styling:** Tailwind CSS (v4)
* **HTTP Client:** Axios (for connecting to the NestJS Text-to-SQL API)

## 🚀 Getting Started

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables:
   Create a `.env` file in the root directory and add the URL pointing to your local NestJS backend:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

### Running the Application

To start the Vite development server locally:
```bash
npm run dev
```

Once started, open the local URL printed in your terminal (usually **`http://localhost:5173`**) in your browser to interact with the application.

