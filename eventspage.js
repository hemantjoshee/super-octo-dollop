function showsubmitted(){
    alert("Event added successfully!");
}

document.addEventListener("DOMContentLoaded", function () {
    var addEventBtn = document.getElementById("addEventBtn");
    var addEventModal = document.getElementById("addEventModal");
    var closeModal = document.getElementsByClassName("close")[0];

    // Display add event button only for club members
    var userRole = localStorage.getItem("userRole");
    if (userRole === "club_member") {
        addEventBtn.style.display = "block";
    } else {
        addEventBtn.style.display = "none";
    }

    addEventBtn.onclick = function () {
        addEventModal.style.display = "block";
    }

    closeModal.onclick = function () {
        addEventModal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == addEventModal) {
            addEventModal.style.display = "none";
        }
    }

    // Handle add event form submission
    document.getElementById("addEventForm").addEventListener("submit", function (event) {
        event.preventDefault();
        var eventName = document.getElementById("eventName").value;
        var eventDate = document.getElementById("eventDate").value;
        var eventDescription = document.getElementById("eventDescription").value;
        var eventImage = document.getElementById("eventImage").value;

        var newEvent = {
            title: eventName,
            date: eventDate,
            description: eventDescription,
            image: eventImage,
            location: "Chitkara University" // Assuming a fixed location for now
        };

        // Store event in localStorage
        var events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));

        addEventModal.style.display = "none";
    });

    // Retrieve user details from localStorage
    var firstName = localStorage.getItem("firstName");
    if (firstName) {
        document.getElementById("profileText").textContent = `Hello, ${firstName}`;
        document.getElementById("profileBox").style.display = "flex"; // Show the profile box
    }
});