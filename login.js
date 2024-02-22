document.addEventListener("DOMContentLoaded", function () {
  displayVisitors();
});

function displayVisitors(filteredVisitors) {
  const visitorDisplay = document.getElementById("visitorDisplay");
  const selectedVisitorMessage = document.getElementById(
    "selectedVisitorMessage"
  );

  // Clear previous content
  visitorDisplay.innerHTML = "";
  selectedVisitorMessage.innerHTML = "";

  // Check if a visitor is already selected
  const selectedVisitor = getSelectedVisitor();
  if (selectedVisitor) {
    selectedVisitorMessage.innerHTML = `You are logged in as ${selectedVisitor.name}. <button onclick="logout()">Logout</button>`;
  }

  // Display visitors in either table or card format
  // Choose the format that suits your design preference
  const displayFormat = "table"; // or "cards"
  switch (displayFormat) {
    case "table":
      visitorDisplay.innerHTML = createTableHTML(filteredVisitors || visitors);
      break;
    case "cards":
      visitorDisplay.innerHTML = createCardHTML(filteredVisitors || visitors);
      break;
    default:
      console.error("Invalid display format");
  }
}

function createTableHTML(visitors) {
  let tableHTML =
    "<table border='1'><tr><th>Name</th><th>Coins</th><th>Action</th></tr>";
  visitors.forEach((visitor) => {
    tableHTML += `<tr><td>${visitor.name}</td><td>${visitor.coins}</td><td><button onclick="loginAsVisitor('${visitor.name}')">Login</button></td></tr>`;
  });
  tableHTML += "</table>";
  return tableHTML;
}

function createCardHTML(visitors) {
  let cardHTML = "";
  visitors.forEach((visitor) => {
    cardHTML += `<div class="card"><img src="visitor_image.jpg" alt="${visitor.name}"><h3>${visitor.name}</h3><p>Coins: ${visitor.coins}</p><button onclick="loginAsVisitor('${visitor.name}')">Login</button></div>`;
  });
  return cardHTML;
}

function loginAsVisitor(visitorName) {
  localStorage.setItem("selectedVisitor", visitorName);
  displayVisitors();
}

function logout() {
  localStorage.removeItem("selectedVisitor");
  displayVisitors();
}

function getSelectedVisitor() {
  const selectedVisitorName = localStorage.getItem("selectedVisitor");
  return visitors.find((visitor) => visitor.name === selectedVisitorName);
}

function filterVisitors() {
  const searchInput = document.getElementById("searchVisitor");
  const searchTerm = searchInput.value.toLowerCase();

  const filteredVisitors = visitors.filter((visitor) =>
    visitor.name.toLowerCase().includes(searchTerm)
  );
  displayVisitors(filteredVisitors);
}
function removeVisitorsWithUndefinedCoins() {
  const existingVisitors = JSON.parse(localStorage.getItem("visitors")) || [];

  // Filter out visitors with undefined coins
  const filteredVisitors = existingVisitors.filter(
    (visitor) => typeof visitor.coins !== "undefined"
  );

  // Update local storage with the filtered visitors
  localStorage.setItem("visitors", JSON.stringify(filteredVisitors));
}

// Call the function whenever you want to remove visitors with undefined coins
// For example, you can call it before displaying the visitors on the login page
removeVisitorsWithUndefinedCoins();
