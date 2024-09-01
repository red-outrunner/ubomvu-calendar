const API_URL = 'http://localhost:8080';
let currentEvents = [];
let currentDate = new Date();

async function handleEventSubmit(event) {
    event.preventDefault();
    const formData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        start_time: new Date(document.getElementById('startTime').value).toISOString(),
        end_time: new Date(document.getElementById('endTime').value).toISOString()
    };
    const eventId = document.getElementById('eventId').value;
    try {
        if (eventId) {
            await axios.put(`${API_URL}/events/${eventId}`, formData);
        } else {
            await axios.post(`${API_URL}/events`, formData);
        }
        resetForm();
        fetchEvents();
    } catch (error) {
        console.error('Error handling event:', error);
    }
}

function resetForm() {
    document.getElementById('eventForm').reset();
    document.getElementById('eventId').value = '';
    document.getElementById('submitBtn').textContent = 'Add Event';
}

async function fetchEvents() {
    try {
        const response = await axios.get(`${API_URL}/events`);
        currentEvents = response.data;
        renderEvents();
        renderCalendars();
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

function renderEvents() {
    const now = new Date();
    const upcomingEvents = currentEvents.filter(event => new Date(event.start_time) > now);
    const pastEvents = currentEvents.filter(event => new Date(event.start_time) <= now);

    renderEventList(upcomingEvents, 'upcomingEvents');
    renderEventList(pastEvents, 'pastEvents', true);
}

function renderEventList(events, elementId, isPast = false) {
    const eventsDiv = document.getElementById(elementId);
    eventsDiv.innerHTML = '';
    if (events.length === 0 && !isPast) {
        eventsDiv.innerHTML = '<div class="add-something-new">Add something new</div>';
        return;
    }
    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = `event ${isPast ? 'past-event' : ''}`;
        eventElement.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p>Start: ${new Date(event.start_time).toLocaleString()}</p>
            <p>End: ${new Date(event.end_time).toLocaleString()}</p>
            <div class="event-actions">
                <button class="edit-btn" onclick="editEvent('${event.id}')">Edit</button>
                <button class="delete-btn" onclick="deleteEvent('${event.id}')">Delete</button>
            </div>
        `;
        eventsDiv.appendChild(eventElement);
    });
}

function editEvent(id) {
    const event = currentEvents.find(e => e.id === id);
    if (event) {
        document.getElementById('eventId').value = event.id;
        document.getElementById('title').value = event.title;
        document.getElementById('descriptionHere are the steps to complete the split:

### **HTML (`index.html`)**
This contains the structure of your webpage and links to the external CSS and JS files.

### **CSS (`styles.css`)**
Place all the styles from the `<style>` tag in the `styles.css` file.

### **JavaScript (`scripts.js`)**
Move all the JavaScript from the `<script>` tag to the `scripts.js` file.

Your HTML will look like this:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comprehensive Calendar App</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/date-fns/2.29.3/date-fns.min.js"></script>
</head>
<body>
    <!-- Your existing HTML content here -->
    <script src="scripts.js"></script>
</body>
</html>
