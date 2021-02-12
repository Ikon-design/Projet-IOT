var request = new XMLHttpRequest()

const dial = document.getElementById('params')
const addSonde = document.getElementById('create')
const shareDial = document.getElementById('share')

var canvas;
var context;
var Val_max;
var Val_min;
var sections;
var xScale;
var yScale;
let mapDiv = document.getElementById('map')
let map
let marker
let probeId = parseInt(localStorage.probeId)
let nbProbe = parseInt(localStorage.nbProbe) - 1

let succesText = document.getElementById('createText')

//Permet de setup a 1 l'id de sonde si celui ci est a 0
if (localStorage.probeId == undefined || 0 && localStorage.readingId == undefined) {
  localStorage.setItem('readingId', 1)
  probeId = localStorage.setItem('probeId', 0)
  window.location.reload()
} else {
  probeId = parseInt(localStorage.probeId)
}

//fetch utilisé pour stocké le nombre total de sondes
fetch('http://192.168.97.2:5000/numberOfProbes')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    localStorage.setItem('nbProbe', data.length)
  })

//fonction utilisé pour changer de sonde
function changeProbe() {
  if (probeId <= 0) {
    localStorage.setItem('probeId', nbProbe)
    window.location.reload()
  } else {
    probeId--
    localStorage.setItem('probeId', probeId)
    window.location.reload()
  }
}
//fonction utilisé pour changer de sonde
function changeProbeB() {
  if (probeId < nbProbe) {
    probeId++
    localStorage.setItem('probeId', probeId)
    window.location.reload()
  } else {
    probeId = 0
    localStorage.setItem('probeId', probeId)
    window.location.reload()
  }
}

function init2() {
  fetch('http://192.168.97.2:5000/reading/' + localStorage.readingId)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      var xAxis = []
      let initCurrentHoure = new Date()
      let takeCurrentHours = initCurrentHoure.getUTCHours() - 7
      for (a = 0; takeCurrentHours + a < initCurrentHoure.getUTCHours(); a++) {
        xAxis[a] = takeCurrentHours + a + 1 + " h"
        for (i = 0; i < data.length; i++) {
          let initHoures2 = new Date(data[i].readingDate)
          test2 = initHoures2.getUTCHours()
        }
      }
      canvas = document.getElementById("myGraph");
      var myChart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: [xAxis[0], xAxis[1], xAxis[2], xAxis[3], xAxis[4], xAxis[5], xAxis[6]],
          datasets: [{
            label: 'Temperature',
            data: [data?.[0]?.humidity, data?.[1]?.humidity, data?.[2]?.humidity, data?.[3]?.humidity, data?.[4]?.humidity, data?.[5]?.humidity, data?.[6]?.humidity],
            backgroundColor: [
              'rgba(255, 99, 132, 0.0)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
//fonction d'ini des graphs
function init() {
  fetch('http://192.168.97.2:5000/reading/' + localStorage.readingId)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      var xAxis = []
      let initCurrentHoure = new Date()
      let takeCurrentHours = initCurrentHoure.getUTCHours() - 7
      for (a = 0; takeCurrentHours + a < initCurrentHoure.getUTCHours(); a++) {
        xAxis[a] = takeCurrentHours + a + 1 + " h"
        for (i = 0; i < data.length; i++) {
          let initHoures2 = new Date(data[i].readingDate)
          test2 = initHoures2.getUTCHours()
        }
      }
      canvas = document.getElementById("myGraphHumidity");
      var myChart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: [xAxis[0], xAxis[1], xAxis[2], xAxis[3], xAxis[4], xAxis[5], xAxis[6]],
          datasets: [{
            label: 'Humidité',
            data: [data?.[0]?.temperature, data?.[1]?.temperature, data?.[2]?.temperature, data?.[3]?.temperature, data?.[4]?.temperature, data?.[5]?.temperature, data?.[6]?.temperature],
            backgroundColor: [
              'rgba(255, 99, 132, 0.0)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
    })
    .catch((err) => {
      console.log(err)
    })
}


fetch('http://192.168.97.2:5000/probes')
  .then((response) => {
    return response.json()
  })
  .then((data) => {

    //Data accueil
    document.getElementById('probeName').innerHTML = (data[probeId]?.probeName) || "Nan"
    let svgHum = document.getElementById('svgHum')
    let svgTemp = document.getElementById('svgTemp')
    let background = document.getElementById('background')
    let logo = document.getElementById('witness')
    let lat = (data?.[probeId]?.latitude)
    let lng = (data?.[probeId]?.longitude)
    // console.log(data, 'data')

    fetch('http://192.168.97.2:5000/readingProbe/' + data[probeId]?.id)
      .then((response) => {
        return response.json()
      })
      .then((reading) => {
        let temperature = localStorage.temperature
        let humidity = localStorage.humidity
        localStorage.setItem('readingId', data[probeId]?.id)
        localStorage.setItem('temperature', reading?.[0]?.temperature)
        localStorage.setItem('humidity', reading?.[0]?.humidity)
        console.log(reading, 'reading')

        // Change la balise title de la page html
        document.title = localStorage.temperature + '° | ' + localStorage.humidity + "% d'humidité"

        if (temperature == 'undefined') {
          document.getElementById('temperature').innerHTML = 0
          document.getElementById('humidity').innerHTML = 0
        } else {
          document.getElementById('temperature').innerHTML = localStorage.temperature || "Nan"
          document.getElementById('humidity').innerHTML = localStorage.humidity || "Nan"
        }

        if (localStorage.humidity <= 10) {
          logo.src = './img/sun.svg'
          svgHum.src = './img/noWater.svg'
          background.style.backgroundImage = "linear-gradient(#76D0FF, #AFD7F8)"
          if (localStorage.temperature <= 5) {
            svgTemp.src = './img/termeCold.svg'
          }
          else if (localStorage.temperature <= 20) {
            svgTemp.src = './img/thermeMed.svg'
          }
          else {
            svgTemp.src = './img/thermeHot.svg'
          }
        } else if (localStorage.humidity <= 25) {
          background.style.backgroundImage = "linear-gradient(#76D0FF, #AFD7F8)"
          if (localStorage.temperature <= 5) {
            svgTemp.src = './img/termeCold.svg'
            svgHum.src = './img/water20.svg'
            logo.src = './img/snow.svg'
          }
          else if (localStorage.temperature <= 20) {
            svgTemp.src = './img/thermeMed.svg'
            svgHum.src = './img/water20.svg'
            logo.src = './img/cloud.svg'
          }
          else {
            logo.src = './img/sun.svg'
            svgHum.src = './img/water20.svg'
            svgTemp.src = './img/thermeHot.svg'
          }
        } else {
          background.style.backgroundImage = "linear-gradient(#76D0FF, #AFD7F8)"
          if (localStorage.temperature <= 5) {
            svgTemp.src = './img/termeCold.svg'
            svgHum.src = './img/snowflake.svg'
            logo.src = './img/snow.svg'
          }
          else if (localStorage.temperature <= 20) {
            svgTemp.src = './img/thermeMed.svg'
            svgHum.src = './img/water.svg'
            logo.src = './img/rain.svg'
          }
          else {
            logo.src = './img/stormyRain.svg'
            svgHum.src = './img/stormyWater.svg'
            svgTemp.src = './img/thermeHot.svg'
          }
        }
      })

    // fait remonter les datas dans la dialog d'update
    document.getElementById('currentProbeName').value = (data?.[probeId]?.probeName)
    document.getElementById('currentProbeIPAdresse').value = (data?.[probeId]?.ip)
    document.getElementById('currentProbeLatitude').value = (data?.[probeId]?.latitude)
    document.getElementById('currentProbeLongitude').value = (data?.[probeId]?.longitude)


    // Variable pour google map
    map = new google.maps.Map(mapDiv, { center: { lat, lng }, zoom: 16 })
    marker = new google.maps.Marker({ position: { lat, lng }, map })

  })
  .catch((err) => {
    let background = document.getElementById('background')
    let dialErr = document.getElementById('err')
    let errText = document.getElementById('errText')
    let errButton = document.getElementById('errButton')
    console.log(err)
    // if (err == "ERR_INTERNET_DISCONNECTED") {
    //   dialErr.open = true
    //   dialErr.style.display = 'flex'
    //   errText.innerHTML = "Il semblerait que vous ne soyez pas connécté à internet. Merci de vérifier votre connexion"
    //   errButton.innerHTML = 'Rafraichir'
    // } else if (err == "ERR_CONNECTION_TIMED_OUT") {
    //   background.style.backgroundColor = 'red'
    //   dialErr.open = true
    //   let field = document.createElement("BUTTON")
    //   field.innerHTML = 'text'
    //   dialErr.appendChild(field)
    // } else {
    //   dialErr.open = true
    //   dialErr.style.display = 'flex'
    //   errText.innerHTML = "Il semblerait que vous ne soyez pas connécté à internet. Merci de vérifier votre connexion"
    //   errButton.innerHTML = 'Rafraichir'
    //   console.log(err)
    // }
  })


//function de creation de sonde
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
      if (data.status == 200) {
        setInterval(() => {
          addProbeCloseDial()
        }, 2000);
      }
    })
    .catch((err) => {
      console.log(err)
    })
}


// Fonction d'update de sonde
function updateProbe() {
  let formData = new FormData()
  let probeName = document.getElementById('currentProbeName').value
  let ip = document.getElementById('currentProbeIPAdresse').value
  let latitude = parseFloat(document.getElementById('currentProbeLatitude').value)
  let longitude = parseFloat(document.getElementById('currentProbeLongitude').value)
  formData.append('probeId', probeId + 1)
  formData.append('probeName', probeName)
  formData.append('ip', ip)
  formData.append('latitude', latitude)
  formData.append('longitude', longitude)
  fetch('http://192.168.97.2:5000/updateProbe', {
    method: 'POST', body: formData
  })
    .then((data) => {
      if (data.status == 200) {
        succesText.style.display = "flex"
        setInterval(() => {
          addProbeCloseDial()
          window.reload()
        }, 2000);
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

document.getElementById('createprobeform').addEventListener('submit', createProbe)

let graph = "Il fait actuellement " + localStorage.temperature + " degrès et il y a " + localStorage.humidity + " d'humidité"
let share = document.getElementById('shareTwitter')
share.href = 'http://twitter.com/share?url=' + graph
let shareMail = document.getElementById('shareMail')
shareMail.href = 'mailto:?subject=Partage de lien&body=' + graph

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
function shareDialfunc() {

  shareDial.style.display = 'flex'
}
function shareCloseDial() {
  shareDial.style.display = 'none'
  shareDial.close()
}

