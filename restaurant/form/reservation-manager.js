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

function initialise() {
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

function retrieve(param) {
  try {
    return JSON.parse(storage.getItem(param));
  } catch {
    return null;
  }
}

function getReservations() {
  var reservations = retrieve("reservations");
  if (reservations == null) {
    var text = document.createElement("div");
    text.innerHTML =
      'You do not have any reservations. <br> Click <a href="reserve.html">here</a> to book a slot.';
    text.setAttribute("class", "no-reservation");
    document.getElementsByTagName("section")[0].appendChild(text);
  } else {
    for (i = 0; i < reservations.length; i++) {
      var r = reservations[i];
      var content = document.createElement("div");
      var restaurant =
        r["restaurant"].charAt(0).toUpperCase() + r["restaurant"].slice(1);
      content.setAttribute("class", "reservation");
      content.innerHTML = `
          <h2 id='date'>${r["date"]}</h2>
          <p>
            for: <strong>${restaurant} <span lang="jp">${restaurantNames[restaurant]}</span></strong>
          </p>
          <p id='time'>at: <strong>${r["time"]}</strong></p>
          <div class="manage-button">
            <a href="manage.html">Manage</a>
          </div>
      `;
      document.getElementsByTagName("section")[0].appendChild(content);
    }
  }
}

function cancelReservation(time, date, restaurant) {
  var reservations = retrieve('reservations')
  reservations.splice(reservations.findIndex(() => {
    reservations[restaurant]['time'] = time
    reservations[restaurant]['date'] = date
  }))
  console.log(reservations)
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

  var reservations = retrieve("reservations");
  var times = retrieve("times");
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
  if (!(dateString in retrieve("times")[restaurant])) {
    return false;
  } else if (retrieve("times")[restaurant][dateString].includes(time)) {
    return true;
  } else {
    return false;
  }
}