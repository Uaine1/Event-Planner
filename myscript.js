let events = [];
let currentEventIndex = null; 

function addEvent() {
  const eventName = document.getElementById('eventName').value;
  const eventDate = document.getElementById('eventDate').value;
  const eventTime = document.getElementById('eventTime').value;
  const eventLocation = document.getElementById('eventLocation').value;
  const eventNotes = document.getElementById('eventNotes').value;

  const newEvent = {
    name: eventName,
    date: eventDate,
    time: eventTime,
    location: eventLocation,
    notes: eventNotes,
  };

  events.push(newEvent);
  saveEvents();
  renderEvents();
}

function saveEvents() {
  localStorage.setItem('events', JSON.stringify(events));
}

function loadEvents() {
  const storedEvents = localStorage.getItem('events');
  if (storedEvents) {
    events = JSON.parse(storedEvents);
  }
}

function renderEvents() {
  const eventsContainer = document.getElementById('events');
  eventsContainer.innerHTML = '';

  events.forEach((event, index) => {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.innerHTML = `
      <strong>${event.name}</strong>
      <p>Date: ${event.date}</p>
      <p>Time: ${event.time}</p>
      <p>Location: ${event.location}</p>
      <p>Notes: ${event.notes}</p>
      <button onclick="editEvent(${index})">Edit</button>
      <button onclick="deleteEvent(${index})">Delete</button>
      <button onclick="showMap(${index})">Show on Map</button>
      <button onclick="shareEvent(${index})">Share</button>
    `;
    eventsContainer.appendChild(eventDiv);
  });
}

function editEvent(index) {
  const event = events[index];
  const editForm = document.createElement('form');
  editForm.innerHTML = `
    <label for="editEventName">Event Name:</label>
    <input type="text" id="editEventName" value="${event.name}" required>

    <label for="editEventDate">Date:</label>
    <input type="date" id="editEventDate" value="${event.date}" required>

    <label for="editEventTime">Time:</label>
    <input type="time" id="editEventTime" value="${event.time}" required>

    <label for="editEventLocation">Location:</label>
    <input type="text" id="editEventLocation" value="${event.location}" required>

    <label for="editEventNotes">Notes:</label>
    <textarea id="editEventNotes">${event.notes}</textarea>

    <button type="button" onclick="updateEvent(${index})">Update</button>
  `;

  const eventsContainer = document.getElementById('events');
  eventsContainer.innerHTML = '';
  eventsContainer.appendChild(editForm);
}

function updateEvent(index) {
  const updatedEvent = {
    name: document.getElementById('editEventName').value,
    date: document.getElementById('editEventDate').value,
    time: document.getElementById('editEventTime').value,
    location: document.getElementById('editEventLocation').value,
    notes: document.getElementById('editEventNotes').value,
  };

  events[index] = updatedEvent;
  saveEvents();
  renderEvents();
}

function deleteEvent(index) {
  events.splice(index, 1);
  saveEvents();
  renderEvents();
}

function showMap(index) {
  var viewUrl = 'mapper.html';
  window.location.href = viewUrl;
}

function shareEvent(index) {
  const event = events[index];
  const shareText = `Check out this event: ${event.name}\nDate: 
  ${event.date}\nTime: ${event.time}\nLocation: ${event.location}\nNotes: ${event.notes}`;

  try {
    const tempInput = document.createElement('input');
    tempInput.value = shareText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Event details copied to clipboard. You can paste it wherever you like.');
  } catch (error) {
    alert(`Error copying to clipboard: ${error}`);
  }
}


function toggleMap() {
  document.getElementById('mapContainer').style.display = 'none';
  currentEventIndex = null;
}

function searchEvents() {
  const searchInput = document.getElementById('searchEvent').value.toLowerCase();

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchInput)
  );

  renderEvents(filteredEvents);
}

function renderEvents(filteredEvents) {
  const eventsContainer = document.getElementById('events');
  eventsContainer.innerHTML = '';

  const eventsToRender = filteredEvents || events; 

  eventsToRender.forEach((event, index) => {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event');
    eventDiv.innerHTML = `
      <strong>${event.name}</strong>
      <p>Date: ${event.date}</p>
      <p>Time: ${event.time}</p>
      <p>Location: ${event.location}</p>
      <p>Notes: ${event.notes}</p>
      <button onclick="editEvent(${index})">Edit</button>
      <button onclick="deleteEvent(${index})">Delete</button>
      <button onclick="showMap(${index})">Show on Map</button>
      <button onclick="shareEvent(${index})">Share</button>
    `;
    eventsContainer.appendChild(eventDiv);
  });
}

loadEvents();
renderEvents();
