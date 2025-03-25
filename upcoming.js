document.addEventListener("DOMContentLoaded", function () {
      const events = JSON.parse(localStorage.getItem('events')) || [];

      const eventContainer = document.getElementById("eventContainer");

      events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.className = "event-card";
        eventCard.setAttribute("data-date", event.date);
        eventCard.innerHTML = `
          <img src="${event.image}" alt="${event.title}">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString('en-GB')}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <p class="event-type">${event.type}</p>
          <a href="#" class="register-link">Register</a>
        `;

        eventContainer.appendChild(eventCard);
      });

      // Search by date functionality
      const searchButton = document.getElementById("searchButton");
      searchButton.addEventListener("click", function () {
        const searchDate = document.getElementById("dateSearch").value;
        let eventFound = false;
        if (searchDate) {
          const eventCards = document.querySelectorAll(".event-card");
          eventCards.forEach(card => {
            if (card.getAttribute("data-date") === searchDate) {
              card.style.display = "block";
              eventFound = true;
            } else {
              card.style.display = "none";
            }
          });
          const noEventsMessage = document.getElementById("noEventsMessage");
          if (eventFound) {
            noEventsMessage.style.display = "none";
          } else {
            noEventsMessage.style.display = "block";
          }
        }
      });

      const registerLinks = document.querySelectorAll(".register-link");
      registerLinks.forEach(link => {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          const eventType = this.previousElementSibling.textContent;

          if (eventType.includes("FREE")) {
            this.textContent = "Registered";
            this.classList.add("registered");
          } else if (eventType.includes("PAID")) {
            window.location.href = this.href;
          }
        });
      });
    });