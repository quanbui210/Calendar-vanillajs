document.addEventListener('DOMContentLoaded', function() {
    // Initialize fullCalendar plugin
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultView: 'month',
      events: function(start, end, timezone, callback) {
        // Fetch events data from API
        fetch('https://doortablets.netlify.app/reservations?room=Viipuri-sali')
          .then(response => response.json())
          .then(data => {
            // Transform API data and generate unique ids for each event
            const transformedEvents = data.map(event => {
              return {
                id: event.title + '_' + event.start + '_' + event.end, // Generate unique identifier for the event
                title: event.title, // Title of the event
                start: moment(event.start).format(), // Start date and time of the event
                end: moment(event.end).format() // End date and time of the event
              };
            });
  
            // Pass transformed events to fullCalendar plugin
            callback(transformedEvents);
          })
          .catch(error => {
            console.error('Error fetching events:', error);
          });
      }
    });
  });
  