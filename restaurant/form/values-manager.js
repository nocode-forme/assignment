function getValues() {
  return [
    document.querySelector('input[name="date"]').value,
    document.querySelector('select[name="hour"]').value,
    document.querySelector('select[name="minute"]').value,
    document.querySelector('select[name="restaurant"]').value,
    document.querySelector('select[id="salut"]').value,
    document.querySelector('input[id="first-name"]').value,
    document.querySelector('input[id="last-name"]').value,
    document.querySelector('input[id="email"]').value,
  ];
}

function replaceValues() {
  document.querySelector('select[name="restaurant"]').value =
    reservation["restaurant"];
  document.querySelector('input[name="date"]').value = dateString;
  document.querySelector('select[name="hour"]').value = reservation[
    "time"
  ].slice(0, 2);
  document.querySelector('select[name="minute"]').value =
    reservation["time"].slice(3);
  document.querySelector('select[id="salut"]').value = reservation["salut"];
  document.querySelector('input[name="first-name"]').value =
    reservation["fname"];
  document.querySelector('input[name="last-name"]').value =
    reservation["lname"];
  document.querySelector('input[name="email"]').value = reservation["email"];
}
