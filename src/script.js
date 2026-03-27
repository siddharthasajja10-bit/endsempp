let transactions = [];

/* LOGIN */
function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (user === "admin" && pass === "1234") {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("app").style.display = "block";
    showWeek(); // show empty week initially
  } else {
    document.getElementById("error").innerText = "Invalid login";
  }
}

/* LOGOUT */
function logout() {
  location.reload();
}

/* ADD DATA */
function addData() {
  let amount = parseFloat(document.getElementById("amount").value);
  let date = document.getElementById("date").value;

  if (!amount || !date) return;

  transactions.push({ amount, date });

  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";

  showWeek();
}

/* SHOW WEEK (Mon–Sun Calendar Style) */
function showWeek() {

  // Clear all day cells
  for (let i = 1; i <= 7; i++) {
    document.getElementById("day" + i).innerHTML = "";
  }

  let weekTotal = 0;
  let overallTotal = 0;

  let today = new Date();
  let day = today.getDay();

  let monday = new Date(today);
  monday.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
  monday.setHours(0,0,0,0);

  transactions.forEach(t => {

    let d = new Date(t.date);
    d.setHours(0,0,0,0);

    overallTotal += t.amount;   // Always count for overall total

    let diff = Math.floor((d - monday) / (1000 * 60 * 60 * 24));

    if (diff >= 0 && diff <= 6) {
      let cell = document.getElementById("day" + (diff + 1));
      cell.innerHTML += "<div class='amount-box'>₹" + t.amount + "</div>";
      weekTotal += t.amount;
    }
  });

  // Show overall total instead of week total
  document.getElementById("total").innerText = overallTotal;
}

