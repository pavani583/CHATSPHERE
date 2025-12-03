# CHATSPHERE - Run locally

## Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

## Backend
1. cd backend
2. npm install
3. create a .env file with the variables shown at top of canvas
4. mkdir uploads
5. npm run dev

## Frontend
1. cd frontend
2. npm install
3. create a file .env in frontend with:
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000
4. npm start


Open http://localhost:3000

Login flow: request OTP -> check server console for OTP -> verify -> you will be redirected to rooms

Notes:
- OTP in this mini-project is printed to server console for development. Replace console logging with an SMS/email API (Twilio, Fast2SMS, SendGrid) for production.
- The auth middleware is header-based for simplicity: frontend sends `x-user-id` with each request.
- For message encryption we used base64 helpers (not secure in production). Replace with real crypto if needed.
