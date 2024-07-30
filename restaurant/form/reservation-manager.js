// reservation-manager.js is responsible for all the backend action that saves reservations to localStorage
// all free slots are also managed here

// represents all the free slots available
var times = { chakan: {}, hizure: {}, banen: {} };

var storage = window.localStorage;
var date = new Date();

// in charge of determing which reservation is being managed, such that informastion is displayed correctly
var managing = 0;

// used to include corresponding japanese name into the confirm page
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

// used to remove all reservations and clear up all free slots
// runs when phone-no.html is loaded
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
  storage.removeItem("reservations");
  set("times", times);
  if (get('reservations') == null) {
    set('reservations', [])
  }
}

// ensures that all dates are set to 'dd MMMM yyyy' -> '15 July 2024'
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

// sets the stringified value into the set key
function set(key, param) {
  storage.setItem(key, JSON.stringify(param));
}

// retreives value from set key, and decodes it after (if there is a value)
function get(key) {
  try {
    return JSON.parse(storage.getItem(key));
  } catch {
    return null;
  }
}

// gets list of reservations and formats it within the view.html page
// if no reservation is present, adds text indicating so and redirects user to the reserve.html page when they click on the link
// otherwise, shows reservations with a button in order for them to manage that reservation
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

// cancels the reservation, and frees up the time slot
function cancelReservation(time, date, restaurant) {
  var reservations = get("reservations");
  times = get('times')
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

// sets the reservation, and blocks out the respective time slot
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
  var index = times[restaurant][dateString].indexOf(time);
  times = get("times");
  times[restaurant][dateString].splice(index, 1);
  set("times", times);

  if (reservations != null) {
    reservations.push(reservation);
    set("reservations", reservations);
  } else {
    set("reservations", [reservation]);
  }
}

// checks whether the slot at a specifc time, date and restaurant is free
function checkIfAvailable(time, date, restaurant) {
  const dateString = parseDate(date);
  if (!(dateString in get("times")[restaurant])) {
    return false;
  } else if (get("times")[restaurant][dateString].includes(time)) {
    return true;
  } else {
    return false;
  }
}
