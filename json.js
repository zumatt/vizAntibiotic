let abDimension = [];
let abSpeedX = [];
let abSpeedY = [];
let abColor = [];

document.addEventListener("DOMContentLoaded", function() {
  fetch("ballData.json")
      .then(response => response.json())
      .then(data => renderData(data))
      .catch(error => console.error(error));
});

function renderData(data) {
  console.log("File " + data.title + " uploaded!");
  abDimension = [];
  abSpeedX = [];
  abSpeedY = [];
  abColor = [];
  
  data.items.forEach(item => {
      abDimension.push(item.dimension);
      abSpeedX.push(item.speedX);
      abSpeedY.push(item.speedY);
      abColor.push(item.color);
  });
}