# Calculator
A full-stack calculator application built with HTML, CSS, JavaScript (frontend) and Node.js, Express, MongoDB (backend).
It allows users to perform calculations, save history, and manage stored results.
**🚀 Features**

**Frontend**
- Interactive Calculator UI
- Perform basic arithmetic operations (+, −, ×, ÷).
- Responsive design for desktop and mobile.
- Dynamic Display
- Shows current expression and result in real-time.
- Error Handling
- Prevents invalid inputs (e.g., consecutive operators).
- Displays error messages for invalid expressions.
- Integration with Backend
- Sends calculations to backend via fetch (POST request).
- Fetches saved history (GET request).
- Clears history (DELETE request).
- 
**Backend (Express + MongoDB)**
- REST API Endpoints
- GET /api/test → Verify backend is running.
- POST /api/calculations → Save a new calculation.
- GET /api/calculations → Retrieve all saved calculations (sorted by newest first).
- DELETE /api/calculations → Clear all history.
- MongoDB Integration
- Stores calculations with fields:
- expression (string)
- result (string)
- date (auto-generated timestamp)

 ** 🛠️ Tech Stack**
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose ODM)
- Other Tools: CORS, Live Server

