# CineWave - Movie Ticket Booking Management

This project is a full-stack movie ticket booking application that mimics the core concepts of Pega Case Management. 

## Pega Case Management Mappings

To help understand how standard software engineering concepts in this app map to Pega concepts, refer to the following:

### 1. Case Type -> `Movie Ticket Request`
In Pega, a Case Type defines a specific type of work. Here, every time a customer submits a booking, a new `BookingRequest` record is created in the database. This represents a distinct "case" of a Movie Ticket Request.

### 2. Case Lifecycle (Stages) -> `status` field
A Pega case moves through stages. In our app, the `status` field on `BookingRequest` tracks this:
- **Initial Stage**: Created by the customer.
- **Availability Check**: Handled automatically in the backend during creation (checking `seatsAvailable`).
- **Approval**: Reached when the customer explicitly confirms the booking (`confirmed: true`), waiting for staff action.
- **Booking Execution & Resolved**: Handled when the staff clicks "Approve", the seats are deducted, and the status moves to "Resolved".

### 3. SLAs (Service Level Agreements)
Pega allows setting Goals and Deadlines on cases to ensure timely resolution. 
In our application, this is implemented on the Staff Dashboard by checking the `createdAt` timestamp against the current time:
- **Goal Missed**: Over 24 hours unresolved.
- **Deadline Missed**: Over 48 hours unresolved.
*(We use status badges to flag these overdue cases directly on the dashboard.)*

### 4. Work Queue Routing -> `assignedQueue`
Pega uses intelligent routing to send cases to specific teams or queues.
We replicate this via the `assignedQueue` field. When a case is created, our backend inspects the `Movie.showType`. 
- `Premium` shows are routed to `PremiumShowQueue`.
- `Standard` shows are routed to `StandardShowQueue`.
The Staff Dashboard includes a dropdown filter to let staff pull work from their specific queue.

### 5. Correspondence -> Email Notification
Pega automatically sends emails (correspondence) during lifecycle events.
When a case reaches the "Resolved" stage (either Approved or Rejected), our Express backend uses `nodemailer` to dispatch an email notification to the `customerEmail`.

## Tech Stack
- **Backend**: Node.js, Express, Prisma, SQLite
- **Frontend**: React, Vite, Tailwind CSS (v4)
