var hidden = document.getElementsByClassName("hidden");
function showHidden() {
  for (i = 0; i < hidden.length - 1; i++) {
    hidden[i].style.display = "block";
  }
  document.getElementById("submit").style.display = "block";
  document.getElementsByTagName("button")[0].style.display = "none";
}

function hideShown() {
  for (i = 0; i < hidden.length - 1; i++) {
    hidden[i].style.display = "none";
  }
  document.getElementById("submit").style.display = "none";
  document.getElementsByTagName("button")[0].style.display = "block";
}
