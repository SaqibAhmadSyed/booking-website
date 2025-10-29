# booking-website 

## Features

### End User (Students) Features

#### 1. Account Management
- Sign up to create a new student account.  
- Log in securely using existing credentials.  
- Manage account settings (update email, password, phone number).  
- Log out securely.

#### 2. Availability Viewing
- View facility schedules (labs, study rooms, sports areas, etc.) on separate pages.  
- See the status of each facility depending on the selected hour/date.  
- View an overall schedule or calendar showing which facilities are booked or available.

#### 3. Booking Management *(Upcoming Feature)*
- Book available rooms during open time slots.  
- Edit or cancel existing bookings.  
- Handle booking conflicts automatically to prevent overlapping reservations.

---

### Administrator Features

#### 1. Authentication & Account Management
- Log in securely as an administrator.  
- Manage admin account settings (email, password, phone number).  
- Access a private admin dashboard.

#### 2. Facility Management
- Create new facilities (rooms, labs, etc.) for specific dates via a calendar interface.  
- Approve or reject student booking requests.  
- View the schedule for each facility.

#### 3. Analytics & Statistics
- View statistics on facility usage (e.g., number of bookings per day).

#### 4. Facility Editing *(Upcoming Feature)*
- Edit existing facility information (name, schedule, capacity, etc.).

---

### Upcoming Features Summary
- Administrator ability to edit rooms.  
- Student ability to manage their own bookings (edit time/room).  
- Student ability to book rooms during available spaces.  
- Booking conflict handling.  
- Server-side database to store all rooms, users, and bookings.

## How to run the project

### Prerequisites
Before running the project, make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

You can verify installation by running in the terminal:
```bash
node -v
npm -v
```
### Clone the Repository
```bash
git clone https://github.com/SaqibAhmadSyed/booking-website.git
cd booking-website
```
### Install Dependencies
```bash
npm install
```
### Run the Development Server
```bash
npm run dev
```
The project will be available at
```bash
http://localhost:3000
```
### Build and Deploy
```bash
npm run build
```
deploy on [vercel.com](https://vercel.com/home) 
---
# Used Libraries

Graphs: [apexcharts](https://apexcharts.com/) 
```bash
npm install apexcharts --save
```
