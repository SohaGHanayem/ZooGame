function createNewVisitor(event) {
  event.preventDefault();

  const nameInput = document.getElementById("visitorName");
  const ageInput = document.getElementById("visitorAge");
  const emailInput = document.getElementById("visitorEmail");
  const passwordInput = document.getElementById("visitorPassword");

  const name = nameInput.value.trim();
  const age = parseInt(ageInput.value, 10);
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!name || isNaN(age) || age <= 0 || !email || !password) {
    alert("Please fill in all fields with valid information.");
    return;
  }

  // Additional validation if needed...

  const existingVisitors = JSON.parse(localStorage.getItem("visitors")) || [];
  const visitorExists = existingVisitors.some(
    (visitor) => visitor.name === name
  );

  if (visitorExists) {
    alert("Visitor already exists. Choose a different name.");
    return;
  }

  const newVisitor = { name, age, email, password, coins: 50 };
  existingVisitors.push(newVisitor);

  localStorage.setItem("visitors", JSON.stringify(existingVisitors));
  window.location.href = "login.html";
}

const createForm = document.getElementById("create-visitor-form");

if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}
