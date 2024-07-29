var times = { chakan: {}, hizure: {}, banen: {} };
var storage = window.localStorage;
var date = new Date();
var managing = 0;

const restaurantNames = {
  Chakan: "茶館",
  Hizure: "昼膳",
  Banen: "晩宴",
};
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function initialiseTimes() {
  for (var x in times) {
    for (i = 0; i < 16; i++) {
      var newDate = parseDate(date.setDate(date.getDate() + 1));
      times[x][`${newDate}`] = [];
      times[x][`${newDate}`] = [];
      for (j = 11; j < 22; j++) {
        times[x][`${newDate}`].push(`${j}:00`);
        times[x][`${newDate}`].push(`${j}:30`);
      }
    }
    date = new Date();
  }
  storage.removeItem("times");
  set("times", times);
  if (get('reservations') == null) {
    set('reservations', [])
  }
}

function parseDate(date) {
  date = new Date(date);
  return (
    date.getDate() +
    " " +
    monthNames[date.getMonth()] +
    " " +
    date.getFullYear()
  );
}

function set(key, param) {
  storage.setItem(key, JSON.stringify(param));
}

function get(param) {
  try {
    return JSON.parse(storage.getItem(param));
  } catch {
    return null;
  }
}

function getReservations() {
  var reservations = get("reservations");
  if (reservations.length == 0) {
    var text = document.createElement("div");
    text.innerHTML =
      'You do not have any reservations. <br> Click <a href="reserve.html">here</a> to book a slot.';
    text.setAttribute("class", "no-reservation");
    document.querySelector("section").appendChild(text);
  } else {
    for (i = 0; i < reservations.length; i++) {
      var r = reservations[i];
      var content = document.createElement("div");
      var restaurant =
        r["restaurant"].charAt(0).toUpperCase() + r["restaurant"].slice(1);
      content.setAttribute("class", "reservation");
      content.innerHTML = `
          <p> Reservation <span id='reservation-number'>${i + 1}</span></p>
          <h2 id='date'>${r["date"]}</h2>
          <p>
            for: <strong>${restaurant} <span lang="jp">${
        restaurantNames[restaurant]
      }</span></strong>
          </p>
          <p id='time'>at: <strong>${r["time"]}</strong></p>
          <div class="manage-button" onclick="
            set('managing', ${parseInt(i)})
          ">
            <a href="manage.html">Manage</a>
          </div>
      `;
      document.querySelector("section").appendChild(content);
    }
  }
}

function cancelReservation(time, date, restaurant) {
  var reservations = get("reservations");
  var times = get('times')
  reservations.splice(
    reservations.findIndex((element) => {
      element["time"] == time;
      element["date"] == date;
      element["restaurant"] == restaurant;
    })
  );
  times[restaurant][date].push(time)
  set('times', times)
  set('reservations', reservations)
}

function setReservation(salut, fname, lname, email, time, date, restaurant) {
  dateString = parseDate(date);
  var reservation = {
    salut: salut,
    fname: fname,
    lname: lname,
    email: email,
    time: time,
    date: dateString,
    restaurant: restaurant,
  };

  var reservations = get("reservations");
  var times = get("times");
  var index = times[restaurant][dateString].indexOf(time);
  times[restaurant][dateString].splice(index, 1);
  set("times", times);

  if (reservations != null) {
    reservations.push(reservation);
    set("reservations", reservations);
  } else {
    set("reservations", [reservation]);
  }
}

function checkIfAvailable(time, date, restaurant) {
  dateString = parseDate(date);
  if (!(dateString in get("times")[restaurant])) {
    return false;
  } else if (get("times")[restaurant][dateString].includes(time)) {
    return true;
  } else {
    return false;
  }
}
