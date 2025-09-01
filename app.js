let currentUser = null;

function login() {
  const name = document.getElementById("username").value.trim();
  if (!name) {
    alert("Enter your name!");
    return;
  }
  currentUser = name;
  localStorage.setItem("currentUser", name);

  document.getElementById("user-name").textContent = name;
  document.getElementById("login-section").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  // Switch layout to dashboard mode
  document.querySelector("main").classList.remove("login-active");

  loadLogs();
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");

  document.getElementById("login-section").classList.remove("hidden");
  document.getElementById("dashboard").classList.add("hidden");

  // Switch back to centered login layout
  document.querySelector("main").classList.add("login-active");
}

function clockIn() {
  saveLog("IN");
}

function clockOut() {
  saveLog("OUT");
}

function saveLog(type) {
  if (!currentUser) return;
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  const now = new Date();
  logs.push({
    user: currentUser,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    type: type
  });
  localStorage.setItem("logs", JSON.stringify(logs));
  loadLogs();
}

function loadLogs() {
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  const tbody = document.getElementById("logs");
  tbody.innerHTML = "";
  logs
    .filter(l => l.user === currentUser)
    .forEach(log => {
      const row = `<tr><td>${log.date}</td><td>${log.time}</td><td>${log.type}</td></tr>`;
      tbody.innerHTML += row;
    });
}

// Auto-login if user was logged in
window.onload = () => {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    currentUser = savedUser;
    document.getElementById("user-name").textContent = savedUser;
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    // Ensure dashboard layout
    document.querySelector("main").classList.remove("login-active");

    loadLogs();
  }
};
