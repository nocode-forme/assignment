function cancelReservation() {
  if (confirm("You are about to cancel this reservation. Are you sure?")) {
    window.location.replace("view.html");
    alert("Registration cancelled");
  } else {
    alert("Action cancelled.");
  }
}
