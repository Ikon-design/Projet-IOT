var request = new XMLHttpRequest()

const dial = document.getElementById('params')
const addSonde = document.getElementById('create')

var canvas;
var context;
var Val_max;
var Val_min;
var sections;
var xScale;
var yScale;

var humidityCanvas = [30, 30, 60, 20, 10, 40, 0]

function init2() {
  fetch('http://192.168.97.2:5000/reading/' + probeId)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      sections = 7;
      Val_max = 60;
      Val_min = -20;
      var stepSize = 15;
      var columnSize = 20;
      var rowSize = 0;
      var margin = 0;
      var xAxis = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun"]
      //
      var temperatureCanvas = [data?.[0]?.[0], data?.[1]?.[0], data?.[2]?.[0], data?.[3]?.[0], data?.[4]?.[0], data?.[5]?.[0], data?.[6]?.[0]]

      canvas = document.getElementById("myGraph");
      context = canvas.getContext("2d", { antialias: false });

      yScale = (canvas.height - columnSize) / (Val_max - Val_min);
      xScale = (canvas.width - rowSize) / sections;

      context.fillStyle = "#363636"
      context.imageSmoothingQuality = 'low'
      context.strokeStyle = "#D9D9D9" // Change la couleur des lignes
      context.lineCap = "round" // Change l'apsect des lignes
      context.lineJoin = "round" // Permet d'avoir les angles arrondis
      context.lineWidth = "2" // Permet de changer la taille des lignes
      context.beginPath();

      for (i = 1; i <= sections; i++) {
        var x = i * xScale;
        context.fillText(xAxis[i], x, columnSize);
        context.moveTo(x, columnSize);
      }

      var count = 0;
      for (scale = Val_max; scale >= Val_min; scale = scale - stepSize) {
        var y = columnSize + (yScale * count * stepSize);
        context.fillText(scale, margin, y);
        context.moveTo(rowSize, y)
        context.lineTo(canvas.width, y)
        count++;
      }
      context.stroke();

      context.translate(rowSize, canvas.height + Val_min * yScale);
      context.scale(1, -1 * yScale);
      context.lineCap = "round"
      context.lineJoin = "round"
      context.strokeStyle = "#FF0066"
      plotData(temperatureCanvas)

      function plotData(dataSet) {
        context.beginPath();
        context.moveTo(0, dataSet[0]);
        for (i = 1; i < sections; i++) {
          context.lineTo(i * xScale, dataSet[i]);
        }
        context.stroke();
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
function init() {
  fetch('http://192.168.97.2:5000/reading/' + probeId)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      sections = 7;
      Val_max = 60;
      Val_min = -20;
      var stepSize = 15;
      var columnSize = 20;
      var rowSize = 0;
      var margin = 0;
      var xAxis = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun"]
      //
      var temperatureCanvas = [data?.[0]?.[0], data?.[1]?.[0], data?.[2]?.[0], data?.[3]?.[0], data?.[4]?.[0], data?.[5]?.[0], data?.[6]?.[0]]

      canvas = document.getElementById("myGraphHumidity");
      context = canvas.getContext("2d", { antialias: false });

      yScale = (canvas.height - columnSize) / (Val_max - Val_min);
      xScale = (canvas.width - rowSize) / sections;

      context.fillStyle = "#363636"
      context.imageSmoothingQuality = 'low'
      context.strokeStyle = "#D9D9D9" // Change la couleur des lignes
      context.lineCap = "round" // Change l'apsect des lignes
      context.lineJoin = "round" // Permet d'avoir les angles arrondis
      context.lineWidth = "2" // Permet de changer la taille des lignes
      context.beginPath();

      for (i = 1; i <= sections; i++) {
        var x = i * xScale;
        context.fillText(xAxis[i], x, columnSize);
        context.moveTo(x, columnSize);
      }

      var count = 0;
      for (scale = Val_max; scale >= Val_min; scale = scale - stepSize) {
        var y = columnSize + (yScale * count * stepSize);
        context.fillText(scale, margin, y);
        context.moveTo(rowSize, y)
        context.lineTo(canvas.width, y)
        count++;
      }
      context.stroke();

      context.translate(rowSize, canvas.height + Val_min * yScale);
      context.scale(1, -1 * yScale);
      context.lineCap = "round"
      context.lineJoin = "round"
      context.strokeStyle = "#FF0066"
      plotData(temperatureCanvas)

      function plotData(dataSet) {
        context.beginPath();
        context.moveTo(0, dataSet[0]);
        for (i = 1; i < sections; i++) {
          context.lineTo(i * xScale, dataSet[i]);
        }
        context.stroke();
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

function openDial() {
  dial.style.display = 'flex'
  dial.show()
}

function closeDial() {
  dial.style.display = 'none'
  dial.close()
}


function addProbeOpenDial() {
  addSonde.style.display = 'flex'
  addSonde.show()
}
function addProbeCloseDial() {
  addSonde.style.display = 'none'
  addSonde.close()
}

let mapDiv = document.getElementById('map')
let map
let marker

let probeId = parseInt(localStorage.probeId)
let nbProbe = parseInt(localStorage.nbProbe)
console.log(probeId)
if (localStorage.probeId == undefined || 0) {
  probeId = localStorage.setItem('probeId', 1)
  window.location.reload()
} else {
  probeId = parseInt(localStorage.probeId)
}

fetch('http://192.168.97.2:5000/numberOfProbes')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    localStorage.setItem('nbProbe', data.length)
  })

function changeProbe() {
  if (probeId <= 1) {
    probeId = nbProbe
    localStorage.setItem('probeId', probeId)
    window.location.reload()
  } else {
    probeId--
    localStorage.setItem('probeId', probeId)
    window.location.reload()
  }
}
function changeProbeB() {
  if (probeId < nbProbe) {
    probeId++
    localStorage.setItem('probeId', probeId)
    window.location.reload()
  } else {
    probeId = 1
    localStorage.setItem('probeId', probeId)
    window.location.reload()
  }
}

fetch('http://192.168.97.2:5000/probe/' + probeId)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    let temperature = (data[0]?.[4])
    let humidity = (data[0]?.[5])
    let svgHum = document.getElementById('svgHum')
    let svgTemp = document.getElementById('svgTemp')
    let background = document.getElementById('background')
    let logo = document.getElementById('witness')

    if (humidity <= 24) {
      logo.src = './img/sun.svg'
      svgHum.src = './img/noWater.svg'
      svgTemp.src = './img/thermometer.svg'
      background.style.backgroundImage = "linear-gradient(#76D0FF, #AFD7F8)"
    } else if (humidity <= 25) {
      if (temperature <= 5) {
        logo.src = './img/snow.svg'
        svgHum.src = './img/snowflake.svg'
        svgTemp.src = './img/termeCold.svg'
        background.style.backgroundImage = 'linear-gradient(#B6C6CE, #E4E8EB)'
      }
      else {
        logo.src = './img/rain.svg'
        svgHum.src = './img/water20.svg'
        background.style.backgroundImage = 'linear-gradient(#B9D5E3, #AFD7F8)'
      }
    } else {
      if (temperature >= 30) {
        logo.src = './img/stormyRain.svg'
        svgHum.src = './img/stormyWater.svg'
        svgTemp.src = '/img/thermometer.svg'
        background.style.backgroundImage = 'linear-gradient(#B6C6CE, #E4E8EB)'
      } else {
        logo.src = './img/rain.svg'
        svgTemp.src = './img/water.svg'
        background.style.backgroundImage = 'linear-gradient( #B9D5E3, #AFD7F8)'
      }
    }

    //Data accueil
    document.getElementById('probeName').innerHTML = (data?.[0]?.[0]) || "Nan"
    document.getElementById('temperature').innerHTML = (data?.[0]?.[4]) || "Nan"
    document.getElementById('humidity').innerHTML = (data?.[0]?.[5]) || "Nan"

    // Dialog
    document.getElementById('currentProbe').value = (data?.[0]?.[1])
    document.getElementById('currentProbeName').value = (data?.[0]?.[1])
    document.getElementById('currentProbeIPAdresse').value = (data?.[0]?.[2])
    document.getElementById('currentProbeLatitude').value = (data?.[0]?.[3])
    document.getElementById('currentProbeLongitude').value = (data?.[0]?.[4])

    let lat = (data[0]?.[2])
    let lng = (data[0]?.[3])


    map = new google.maps.Map(mapDiv, { center: { lat, lng }, zoom: 15 })
    marker = new google.maps.Marker({ position: { lat, lng }, map })

  })
  .catch((err) => {
    let background = document.getElementById('background')
    let dialErr = document.getElementById('err')
    let errText = document.getElementById('errText')
    let errButton = document.getElementById('errButton')
    console.log(err)
    if (err == "ERR_INTERNET_DISCONNECTED") {
      background.style.backgroundColor = 'purple'
      dialErr.open = true
      dialErr.style.display = 'flex'
      errText.innerHTML = "Il semblerait que vous ne soyez pas connécté à internet. Merci de vérifier votre connexion"
      errButton.innerHTML = 'Rafraichir'
    } else if (err == "ERR_CONNECTION_TIMED_OUT") {
      background.style.backgroundColor = 'red'
      dialErr.open = true
      let field = document.createElement("BUTTON")
      field.innerHTML = 'text'
      dialErr.appendChild(field)
    } else {
      background.style.backgroundColor = 'purple'
      dialErr.open = true
      dialErr.style.display = 'flex'
      errText.innerHTML = "Il semblerait que vous ne soyez pas connécté à internet. Merci de vérifier votre connexion"
      errButton.innerHTML = 'Rafraichir'
      console.log(err)
    }
  })

function createProbe() {
  fetch('192.168.97.2', {
    method: 'POST',
    body: JSON({ probeName, ip, latitude, longitude })
  })
    .then((response) => {
      var data = JSON.parse(request.response)

      return response.json()
    })
    .catch((err) => {
      let background = document.getElementById('background')

      if (err = "ERR_INTERNET_DISCONNECTED") {
        background.style.backgroundColor = 'purple'
        console.log(err)
      } else if (err = "ERR_CONNECTION_TIMED_OUT") {
        background.style.backgroundColor = 'red'
        console.log(err)
      } else {
        console.log(err)
      }
    })
}

function selectProbes() {
  fetch('http://192.168.97.2:5000/probes')
    .then((response) => {

      // console.log(data, response)
      return response.json()
    })

    .then((data) => {

      //Permet de recupérer la liste de sonde et de la ajouter au select
      for (let i = 0; i < data.length; i++) {
        var select = document.getElementById('probeList')
        var option = document.createElement('option')
        select.options.length = i
        option.text = data[i]
        select.options.add(option, i)
      }

    })

    .catch((err) => {
      let background = document.getElementById('background')

      if (err = "ERR_INTERNET_DISCONNECTED") {
        background.style.backgroundColor = 'purple'
        console.log(err)
      } else if (err = "ERR_CONNECTION_TIMED_OUT") {
        background.style.backgroundColor = 'red'
        console.log(err)
      } else {
        console.log(err)
      }
    })
}

function createProbe(e) {
  e.preventDefault()
  e.stopPropagation()
  let formData = new FormData()
  let probeName = document.getElementById('probeName-form').value
  let ip = document.getElementById('ip').value
  let latitude = document.getElementById('latitude').value
  let longitude = document.getElementById('longitude').value
  formData.append('probeName', probeName)
  formData.append('ip', ip)
  formData.append('latitude', parseFloat(latitude))
  formData.append('longitude', parseFloat(longitude))
  fetch('http://192.168.97.2:5000/createProbe', {
    method: "POST", body: formData
  })
    .then((data) => {
      console.log(data)
      if (data.status == 200) {
        setInterval(() => {
          addProbeCloseDial()
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

document.getElementById('createprobeform').addEventListener('submit', createProbe)