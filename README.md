## System Requirements

### End User (Students) Features

#### 1. Account Management
- Create and manage user account (name, email, password, etc.).
- Update profile information.
- Secure login and logout.

#### 2. Resource Browsing
- View a list of all available university resources (rooms, labs, equipment, etc.).
- Filter or search for resources based on category, location, or availability.

#### 3. Availability Viewing
- See real-time availability of each resource through calendars or schedules.
- Check time slots and availability before booking.

#### 4. Booking Management
- Make bookings/reservations for resources by selecting:
  - Date and time
  - Purpose or reason for booking
- Modify or cancel existing bookings.
- View upcoming and past bookings in one place.

#### 5. Conflict Handling
- The system must prevent double-booking or overlapping reservations.
- Users should receive clear error messages when time conflicts occur.

---

###  Administrator (Resource Manager) Features

#### 1. Authentication & Role Management
- Secure login and logout for admin accounts.
- Access to an admin dashboard (restricted by role).
- Manage personal profile information.

#### 2. Resource Management
- **Create Resources:** Add new rooms, labs, or equipment with details:
  - Name
  - Description
  - Location
  - Capacity
  - Image (optional)
- **Edit Resources:** Update resource details when needed.
- **Delete Resources:** Remove resources that are no longer available.
- **Block/Unblock Resources:** Temporarily disable resources for maintenance or special events.

#### 3. Availability & Scheduling
- Define working hours for each resource (e.g., weekdays 8 AM – 10 PM).
- Add exceptions or blackout dates (e.g., holidays, renovations).
- Manage special availability periods for events or limited access.

#### 4. Booking Management
- View all booking requests from users.
- Approve or reject bookings (if manual approval is required).
- Modify or cancel bookings.
- Automatically detect and prevent double-booking.

#### 5. User Management
- View all registered users (students and faculty).
- Access user booking history for audit purposes.
- Suspend or deactivate user accounts if necessary.

#### 6. Reporting & Analytics
- View usage statistics such as:
  - Most popular resources
  - Peak booking hours
  - Booking approval and cancellation rates
  - Overall resource utilization
- Export reports (CSV or PDF).

---

### Bonus Features (Optional)
#### For End Users
- Receive notifications (email or in-app) for booking confirmations, updates, or cancellations.

#### For Administrators
- Send announcements or notifications to users (e.g., maintenance alerts, policy updates).
- View audit logs of admin actions (who created, edited, or deleted resources).


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
### Run he Development Server
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

