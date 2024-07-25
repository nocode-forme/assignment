var hidden = document.getElementsByClassName("hidden");
var buttons = document.getElementsByTagName("button");

function showHidden() {
  console.log(buttons)
  for (i = 0; i < hidden.length; i++) {
    hidden[i].style.display = "block";
  }
  for (i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
  }
  document.getElementById("submit").style.display = "block";
}

function hideShown() {
  for (i = 0; i < hidden.length; i++) {
    hidden[i].style.display = "none";
  }
  for (i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "block";
  }
  document.getElementById("submit").style.display = "none";
}
