# 🤖 AI Text-to-SQL Converter

An intelligent backend service that translates natural language questions into executable SQL queries. Powered by the Gemini API and built with Node.js, TypeScript, and TypeORM, this tool allows users to query a product database without knowing any SQL.

## 📦 Tech Stack

* **Framework:** NestJS / Node.js
* **AI Provider:** Google Gemini API (`@google/generative-ai`)
* **ORM:** TypeORM
* **Database:** MySQL

## 🗄️ Database Schema

The AI is currently trained to generate queries against the following entity:

### `product`
Stores the catalog of available items.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | Primary Key | Auto-generated unique identifier |
| `name` | varchar(255) | Name of the product |
| `category` | varchar(100) | Product category (Nullable) |
| `price` | decimal(10,2)| Cost of the product |
| `stock_quantity` | int | Current number of items in stock |

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+ recommended)
* A running MySQL Database instance
* A Google Gemini API Key (Get one from Google AI Studio)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your environment variables:
   Create a `.env` file in the root directory and add your database credentials along with your Gemini API key:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_database_password
   DB_NAME=ai_inventory_db

   # AI Configuration
   API_KEY=your_gemini_api_key_here
   ```

### Running the Application

To start the server in development mode:
```bash
npm run start:dev
```

---

## 💡 How It Works (Example)

Send a natural language prompt to the API, and the Gemini model will return the corresponding SQL.

**User Input:** > *"Show me all products in the 'Electronics' category that cost less than $50 and are currently in stock."*

**AI Generated SQL:**
```sql
SELECT * FROM product 
WHERE category = 'Electronics' 
  AND price < 50.00 
  AND stock_quantity > 0;
```
