document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const queryContainer = document.getElementById("query-container");

  // Function to save query to session storage
  function saveQuery(query) {
    let queries = JSON.parse(sessionStorage.getItem("queries")) || [];
    queries.push(query);
    sessionStorage.setItem("queries", JSON.stringify(queries));
    displayQueries();
  }

  // Function to display queries
  function displayQueries() {
    queryContainer.innerHTML = "";
    let queries = JSON.parse(sessionStorage.getItem("queries")) || [];
    queries.forEach((query, index) => {
      let queryCard = document.createElement("div");
      queryCard.className = "query-card";
      queryCard.innerHTML = `
          <h3>${query.name}</h3>
          <p><strong>Email:</strong> ${query.email}</p>
          <p><strong>Country:</strong> ${query.country}</p>
          <p><strong>Phone:</strong> ${query.phone}</p>
          <p><strong>Message:</strong> ${query.message}</p>
          <p>Status: <span class="status">${query.status}</span></p>
          <button onclick="markSolved(${index})">Mark as Solved</button>
        `;
      queryContainer.appendChild(queryCard);
    });
  }

  // Handle form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const query = {
      name: formData.get("name"),
      email: formData.get("email"),
      country: formData.get("country"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      status: "Pending",
    };
    saveQuery(query);
    form.reset();
  });

  // Function to mark a query as solved
  window.markSolved = (index) => {
    let queries = JSON.parse(sessionStorage.getItem("queries"));
    queries[index].status = "Solved";
    sessionStorage.setItem("queries", JSON.stringify(queries));
    displayQueries();
  };

  // Display queries on page load
  displayQueries();
});
