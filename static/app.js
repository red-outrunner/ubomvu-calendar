'use strict';

let currentDate = new Date();
let selectedDate = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded');
    renderCalendar(currentDate);
    
    document.getElementById('prev-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    const closeSidebarButton = document.getElementById('close-sidebar');
    if (closeSidebarButton) {
        closeSidebarButton.addEventListener('click', closeSidebar);
    } else {
        console.error('Close sidebar button not found');
    }

    const createEventButton = document.getElementById('create-event');
    if (createEventButton) {
        createEventButton.addEventListener('click', createEvent);
    } else {
        console.error('Create event button not found');
    }

    const updateEventButton = document.getElementById('update-event');
    if (updateEventButton) {
        updateEventButton.addEventListener('click', updateEvent);
    } else {
        console.error('Update event button not found');
    }

    const deleteEventButton = document.getElementById('delete-event');
    if (deleteEventButton) {
        deleteEventButton.addEventListener('click', deleteEvent);
    } else {
        console.error('Delete event button not found');
    }
});

function highlightCurrentDate() {
    const today = new Date();
    const dayCells = document.querySelectorAll('.day-cell');
    dayCells.forEach(cell => {
        if (parseInt(cell.textContent) === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()) {
            cell.classList.add('current-date');
        } else {
            cell.classList.remove('current-date');
        }
    });
}

function renderCalendar(date) {
    const monthYear = document.getElementById('month-year');
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) {
        console.error('Calendar grid not found');
        return;
    }
    calendarGrid.innerHTML = '';

    const year = date.getFullYear();
    const month = date.getMonth();

    highlightCurrentDate();

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    monthYear.textContent = `${monthNames[month]} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const startDay = firstDayOfMonth.getDay();

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let day of daysOfWeek) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day-of-week';
        dayCell.textContent = day;
        calendarGrid.appendChild(dayCell);
    }

    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'empty-cell';
        calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day-cell';
        dayCell.textContent = day;
        dayCell.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log(`Clicked on date: ${year}-${month + 1}-${day}`);
            openSidebar(new Date(year, month, day));
        });
        calendarGrid.appendChild(dayCell);
    }

    console.log('Calendar rendered');
}

function openSidebar(date) {
    console.log('Opening sidebar for date:', date);
    selectedDate = date;
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) {
        console.error('Sidebar element not found');
        return;
    }
    const dateDisplay = document.getElementById('selected-date');
    if (dateDisplay) {
        dateDisplay.textContent = date.toDateString();
    } else {
        console.error('Date display element not found');
    }
    sidebar.classList.remove('hidden');
    fetchEventsForDate(date);

    document.addEventListener('click', closeSidebarOutside);
}

function closeSidebar() {
    console.log('Closing sidebar');
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.add('hidden');
    } else {
        console.error('Sidebar element not found');
    }
    selectedDate = null;
    document.removeEventListener('click', closeSidebarOutside);
}

function closeSidebarOutside(e) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && !sidebar.contains(e.target) && !e.target.classList.contains('day-cell')) {
        closeSidebar();
    }
}

function fetchEventsForDate(date) {
    console.log(`Fetching events for ${date.toDateString()}`);
    const eventsList = document.getElementById('events-list');
    if (eventsList) {
        eventsList.innerHTML = `
            <li>9:00 AM - Team Meeting</li>
            <li>2:00 PM - Client Call</li>
            <li>5:00 PM - Project Deadline</li>
        `;
    } else {
        console.error('Events list element not found');
    }
}

function createEvent() {
    if (!selectedDate) {
        console.error('No date selected');
        return;
    }
    const eventTitle = prompt("Enter event title:");
    if (eventTitle) {
        console.log(`Creating event "${eventTitle}" on ${selectedDate.toDateString()}`);
        alert("Event created successfully!");
        fetchEventsForDate(selectedDate);
    }
}

function updateEvent() {
    if (!selectedDate) {
        console.error('No date selected');
        return;
    }
    const eventToUpdate = prompt("Enter the event to update:");
    if (eventToUpdate) {
        const newTitle = prompt("Enter the new title for the event:");
        if (newTitle) {
            console.log(`Updating event "${eventToUpdate}" to "${newTitle}" on ${selectedDate.toDateString()}`);
            alert("Event updated successfully!");
            fetchEventsForDate(selectedDate);
        }
    }
}

function deleteEvent() {
    if (!selectedDate) {
        console.error('No date selected');
        return;
    }
    const eventToDelete = prompt("Enter the event to delete:");
    if (eventToDelete) {
        console.log(`Deleting event "${eventToDelete}" on ${selectedDate.toDateString()}`);
        alert("Event deleted successfully!");
        fetchEventsForDate(selectedDate);
    }
}