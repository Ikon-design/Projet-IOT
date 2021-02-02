var request = new XMLHttpRequest()

request.open('GET', 'http://192.168.97.2', 'clement', 'root')
request.send

request.load = function () {
}


fetch('http://192.168.97.2:5000')
  .then((response) => {
    // var data = JSON.parse(request.response)
    // console.log(data, response)
    return response.json()
  })
  .then((data) => {

    let temperature = (data[0][4])
    let humidity = (data[0][5])

    let background = document.getElementById('background')
    let logo = document.getElementById('witness')

    if (humidity <= 0) {
      logo.src = '../../img/sun.svg'
      console.log('sun')
      background.style.backgroundImage = "linear-gradient(#76D0FF, #AFD7F8)"
    } else if (humidity <= 25) {
      if (temperature <= 5) {
        logo.src = '../../img/snows.svg'
        console.log('snow')
        background.style.backgroundImage = 'linear-gradient(#B6C6CE, #E4E8EB)'
      }
      else {
        logo.src = '../../img/rain.svg'
        console.log('rain')
        background.style.backgroundImage = 'linear-gradient(#B6C6CE, #E4E8EB)'
      }
    } else {
      if (temperature >= 30) {
        logo.src = '../../img/stormyRain.svg'
        console.log('stormyRain')
        background.style.backgroundImage = 'linear-gradient(#B6C6CE, #E4E8EB)'
      } else {
        logo.src = '../../img/rain.svg'
        console.log('rain')
        background.style.backgroundImage = 'linear-gradient(#B6C6CE, #E4E8EB)'
      }
    }

    //Data accueil
    document.getElementById('probeName').innerHTML = (data[0][3])
    // console.log(data[0])
    document.getElementById('temperature').innerHTML = (data[0][4] + '°')
    document.getElementById('humidity').innerHTML = (data[0][5] + '%')

    // Dialog
    document.getElementById('currentProbeName').value = (data[0][3])
    document.getElementById('currentProbeLongitude').value = (data[0][1])
    document.getElementById('currentProbeLatitude').value = (data[0][2])
    
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })

const dial = document.getElementById('params')

function openDial() {
  dial.style.display = 'flex'
  dial.show()
}

function closeDial() {
  dial.style.display = 'none'
  dial.close()
}