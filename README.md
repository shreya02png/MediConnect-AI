# 🏥 Healthcare Appointment Bot — Admin Dashboard

> An AI-powered healthcare appointment booking system with a Telegram bot frontend and a React-based Admin Dashboard.

---

## 📌 Project Overview

Patients book appointments through a **Telegram Bot** powered by an AI Agent (n8n). The **Admin Dashboard** (your task) is a React web app used by hospital staff to manage appointments and doctors.

| Component          | Technology              | Status       |
|--------------------|-------------------------|--------------|
| Telegram Bot       | n8n + AI Agent          | ✅ Done      |
| Database           | Google Sheets           | ✅ Done      |
| Backend APIs       | n8n Webhooks            | ✅ Done      |
| Admin Dashboard    | React                   | Done         |
| Deployment         | Docker                  | 🔜 Later     |

---

## 📄 Pages 

| Page               | Purpose                                                    |
|--------------------|------------------------------------------------------------|
| **Home Page**      | Hospital info, doctors list, "Book via Telegram" button    |
| **Admin Login**    | Simple login page for hospital staff                       |
| **Admin Dashboard**| View all appointments, filter by date, cancel appointments |
| **Doctor Management** | Add, edit, and view doctors and their availability      |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- Git

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/username/healthcare-appointment-bot.git

# 2. Navigate to the frontend folder
cd healthcare-appointment-bot/frontend

# 3. Install dependencies
npm install

# 4. Create a .env file and add the API base URL
echo "REACT_APP_API_URL=https://your-n8n-domain.com" > .env

# 5. Start the development server
npm start
```

---

## 🌐 API Reference

**Base URL:** `https://your-n8n-domain.com/webhook/`

---

### 1. Get All Appointments

| Field    | Value                       |
|----------|-----------------------------|
| Method   | `GET`                       |
| Endpoint | `/webhook/appointments`     |
| Used On  | Admin Dashboard page        |

```js
const res = await fetch(`${BASE_URL}/webhook/appointments`);
const data = await res.json();
```

**Response Fields:**

| Field           | Example Value            |
|-----------------|--------------------------|
| Appointment ID  | `APT-1778709907678`      |
| Patient Name    | Saloni                   |
| Age             | 25                       |
| Phone           | 9876543210               |
| Telegram Chat ID| 7113563905               |
| Doctor          | Dr. Ravi Sharma          |
| Department      | Gastroenterology         |
| Date            | 22 May 2026              |
| Time            | 10:00 AM                 |
| Status          | Confirmed / Cancelled    |
| Booked On       | 2026-05-14T10:05:00      |

---

### 2. Get Appointments by Date

| Field       | Value                                         |
|-------------|-----------------------------------------------|
| Method      | `GET`                                         |
| Endpoint    | `/webhook/appointments?date=2026-05-22`       |
| Query Param | `date` (format: `DD Month YYYY`)              |
| Used On     | Admin Dashboard — date filter                 |

```js
const res = await fetch(`${BASE_URL}/webhook/appointments?date=${selectedDate}`);
const data = await res.json();
```

---

### 3. Cancel Appointment

| Field    | Value                              |
|----------|------------------------------------|
| Method   | `POST`                             |
| Endpoint | `/webhook/appointments/cancel`     |
| Used On  | Admin Dashboard — cancel button    |

**Request Body:**
```json
{ "appointment_id": "APT-1778709907678" }
```

**Response:**
```json
{ "success": true, "message": "Appointment cancelled successfully" }
```

```js
const res = await fetch(`${BASE_URL}/webhook/appointments/cancel`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ appointment_id: 'APT-123' })
});
```

---

### 4. Get All Doctors

| Field    | Value                    |
|----------|--------------------------|
| Method   | `GET`                    |
| Endpoint | `/webhook/doctors`       |
| Used On  | Doctor Management + Home page |

```js
const res = await fetch(`${BASE_URL}/webhook/doctors`);
const data = await res.json();
```

**Response Fields:**

| Field           | Example Value                       |
|-----------------|-------------------------------------|
| Doctor ID       | `DOC-001`                           |
| Doctor Name     | Dr. Ravi Sharma                     |
| Department      | Gastroenterology                    |
| Available Slots | Mon 10AM, Mon 2PM, Wed 11AM         |
| Status          | Active                              |

---

### 5. Add New Doctor

| Field    | Value                    |
|----------|--------------------------|
| Method   | `POST`                   |
| Endpoint | `/webhook/doctors/add`   |
| Used On  | Doctor Management — Add Doctor form |

**Request Body:**
```json
{
  "name": "Dr. Anjali Verma",
  "specialization": "Cardiology",
  "time_slots": "Mon 9AM, Wed 11AM, Fri 3PM",
  "status": "Active"
}
```

**Response:**
```json
{ "success": true, "message": "Doctor added successfully" }
```

---

### 6. Update Doctor

| Field    | Value                       |
|----------|-----------------------------|
| Method   | `POST`                      |
| Endpoint | `/webhook/doctors/update`   |
| Used On  | Doctor Management — Edit Doctor |

**Request Body:**
```json
{
  "doctor_id": "DOC-001",
  "time_slots": "Mon 10AM, Tue 2PM",
  "status": "Active"
}
```

**Response:**
```json
{ "success": true, "message": "Doctor updated successfully" }
```

---

## 🗄️ Database Structure (Google Sheets)

| Sheet Name              | Purpose                                      |
|-------------------------|----------------------------------------------|
| `HOSPITAL_APPOINTMENTS` | Stores all patient bookings (via GET /appointments) |
| `Doctors`               | Stores doctor info and availability (via GET /doctors) |

---

## ⚙️ Environment Variables

Create a `.env` file in the `/frontend` directory:

```env
REACT_APP_API_URL=https://your-n8n-domain.com
```

> ⚠️ If the API URL changes, update **only** this `.env` file.

---

## 🧪 Testing APIs

| Method | Tool                         |
|--------|------------------------------|
| GET    | Directly in browser or Postman |
| POST   | [Postman](https://www.postman.com/) (free) |

---

## 🔒 Important Notes

- ❌ **Never commit** API keys or credentials to GitHub
- ✅ All GET APIs can be tested directly in the browser
- ✅ POST APIs can be tested using Postman
- 🔄 If the API URL changes, update the `.env` file only
- 💬 For any structural API changes, coordinate on the group chat first

---

## 📬 Contact

For questions or issues, reach out on **WhatsApp / Telegram**.
