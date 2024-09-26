// JavaScript to handle calendar display and navigation

let currentDate = new Date();

document.addEventListener('DOMContentLoaded', () => {
    renderCalendar(currentDate);
    
    document.getElementById('prev-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
});

// Render the calendar for a given date
function renderCalendar(date) {
    const monthYear = document.getElementById('month-year');
    const calendarGrid = document.querySelector('.calendar-grid');
    calendarGrid.innerHTML = '';

    const year = date.getFullYear();
    const month = date.getMonth();

    // Set the header to current month and year
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    monthYear.textContent = `${monthNames[month]} ${year}`;

    // Get the first and last days of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Get the day of the week the first day falls on
    const startDay = firstDayOfMonth.getDay(); // 0 is Sunday

    // Create the days of the week headers
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let day of daysOfWeek) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day-of-week';
        dayCell.textContent = day;
        calendarGrid.appendChild(dayCell);
    }

    // Fill in the blank cells before the start of the month
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'empty-cell';
        calendarGrid.appendChild(emptyCell);
    }

    // Fill in the days of the month
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day-cell';
        dayCell.textContent = day;
        calendarGrid.appendChild(dayCell);
    }

    // Optionally fetch and render events for the current month
    fetchEventsForMonth(month + 1, year);
}

// Fetch events from the server (modify this function to match your API)
function fetchEventsForMonth(month, year) {
    fetch(`/api/events?month=${month}&year=${year}`)
        .then(response => response.json())
        .then(events => {
            console.log("Events for this month:", events);
            // Render events on the calendar
            // You could match the day and then add them to the correct dayCell
        })
        .catch(error => console.error("Error fetching events:", error));
}

// Show event popup on hover
function showEventPopup(event, dayCell) {
    const popup = document.getElementById('event-popup');
    const details = document.getElementById('event-details');
    
    if (event) {
        details.textContent = `${event.title} (${event.priority})`;
        popup.classList.remove('no-event');
    } else {
        details.textContent = 'No events';
        details.style.color = 'lightgrey';
        popup.classList.add('no-event');
    }

    popup.style.left = `${dayCell.getBoundingClientRect().left}px`;
    popup.style.top = `${dayCell.getBoundingClientRect().top - 50}px`;
    popup.classList.remove('hidden');
}

// Hide the event popup
function hideEventPopup() {
    const popup = document.getElementById('event-popup');
    popup.classList.add('hidden');
}
