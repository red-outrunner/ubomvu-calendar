# Ubomvu Calendar README

## Project Overview

**Ubomvu Calendar** is a web-based calendar application that allows users to view events, manage to-dos, and navigate through different months. The project includes an interactive user interface built with HTML, CSS, and JavaScript, supported by a backend server developed using Go (Gin framework). The app also supports RESTful API endpoints for managing events and to-dos.

Developers: Weo Fuzile & Vishnu

### Features
1. **Interactive Calendar Display**:
   - Navigate between months.
   - View events for each day.
   - Add new events and display them on the calendar.

2. **Event Management**:
   - View and add events for the selected month.
   - Popup tooltips to show event details on hover.

3. **To-Do List**:
   - Manage daily tasks with a simple to-do list feature.
   - Set reminders for tasks.

4. **API Support**:
   - REST API endpoints to fetch, add, and display events and to-dos.
   - JSON-based file storage for events and to-dos.

---

## Project Structure

### Frontend

1. **`index.html`**
   - The main UI page for the calendar, structured using basic HTML.
   - Includes buttons to navigate between months.
   - Displays a popup for viewing or adding events.

   Key Elements:
   - Calendar grid for displaying days.
   - Event popup window for quick event details.

   **Linked Files**: 
   - `app.js` for functionality.
   - `styles.css` for styling.

2. **`app.js`**
   - JavaScript file responsible for handling calendar interactions and navigation.
   - Dynamically renders the calendar for the current month.
   - Handles event fetching and displaying event popups.

   Functions:
   - `renderCalendar()`: Renders the calendar grid and handles month navigation.
   - `fetchEventsForMonth()`: Fetches events for the current month from the backend.
   - `showEventPopup()` and `hideEventPopup()`: Display and hide event details when a user hovers over a day.

---

### Backend (Go/Gin API)

1. **`main.go`**
   - The core of the backend, responsible for serving the frontend, static files, and handling API requests.
   - Manages two primary resources: events and to-dos, stored in JSON files.

   Key Endpoints:
   - `GET /api/events`: Fetch all events.
   - `POST /api/events`: Add a new event.
   - `GET /api/todos`: Fetch all to-dos.
   - `POST /api/todos`: Add a new to-do.

   **Helper Functions**:
   - `readFromFile()`: Reads data from JSON files.
   - `writeToFile()`: Writes data back to JSON files.
   - Error handling for file operations to ensure proper data management.

---

## Installation and Running the Application

### Prerequisites:
- **Go** installed on your system.
- **Gin** framework (`go get github.com/gin-gonic/gin`).

### Steps:

1. Clone the repository and navigate to the project directory.
   ```bash
   git clone https://github.com/yourusername/ubomvu-calendar.git
   cd ubomvu-calendar
   ```

2. Install Go dependencies:
   ```bash
   go get -u github.com/gin-gonic/gin
   ```

3. Run the Go backend server:
   ```bash
   go run main.go
   ```

4. Open your browser and navigate to `http://localhost:8080` to view the calendar app.

---

## API Usage

### Fetch Events
- **GET** `/api/events`
  - Returns a list of all events for the month.

### Add Event
- **POST** `/api/events`
  - Adds a new event to the event list.
  - **Request Body** (JSON format):
    ```json
    {
      "title": "Meeting",
      "date": "2024-10-05",
      "details": "Project meeting"
    }
    ```

### Fetch To-Dos
- **GET** `/api/todos`
  - Returns a list of all to-dos.

### Add To-Do
- **POST** `/api/todos`
  - Adds a new task to the to-do list.
  - **Request Body** (JSON format):
    ```json
    {
      "task": "Finish report",
      "dueDate": "2024-10-07",
      "reminder": true
    }
    ```

---


**Ubomvu Calendar** provides a simple effective solution for event and task management with an easy-to-use interface and a reliable backend powered by Go. We will and YOU can expand the application with features like notifications, multi-user support, or improved event visualization to enhance its functionality further.

Feel free to contribute and raise issues encountered
