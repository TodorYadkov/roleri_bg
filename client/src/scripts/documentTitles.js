const titleText = ["Vertigo Skates", "Vertigo Skates School", "Skate Now!"];
let counter = 0;

setInterval(function () {
  document.title = titleText[counter % titleText.length];
  counter++;
}, 2000);
