var request = new XMLHttpRequest()

function test() {
  fetch('http://192.168.97.2:5000/probes')
    .then((response) => {
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
      console.log(err)
    })
}

function onSelected(){
  
}

fetch('http://192.168.97.2:5000/probe/1')
  .then((response) => {
    // var data = JSON.parse(request.response)
    // console.log(data, response)
    return response.json()
  })
  .then((data) => {
    console.log(data)
    let temperature = (data[0][7])
    let humidity = (data[0][11])

    let background = document.getElementById('background')
    let logo = document.getElementById('witness')

    if (humidity <= 0) {
      logo.src = '../../img/sun.svg'
      background.style.backgroundImage = "linear-gradient(#76D0FF, #AFD7F8)"
    } else if (humidity <= 25) {
      if (temperature <= 5) {
        logo.src = '../../img/snows.svg'
        background.style.backgroundImage = 'linear-gradient(#B6C6CE, #E4E8EB)'
      }
      else {
        logo.src = '../../img/rain.svg'
        background.style.backgroundImage = 'linear-gradient(#B6C6CE, #E4E8EB)'
      }
    } else {
      if (temperature >= 30) {
        logo.src = '../../img/stormyRain.svg'
        background.style.backgroundImage = 'linear-gradient(#B6C6CE, #E4E8EB)'
      } else {
        logo.src = '../../img/rain.svg'
        background.style.backgroundImage = 'linear-gradient(#B6C6CE, #E4E8EB)'
      }
    }

    //Data accueil
    document.getElementById('probeName').innerHTML = (data[0][1])
    document.getElementById('temperature').innerHTML = (data[0][7])
    document.getElementById('humidity').innerHTML = (data[0][11])
    // console.log(data[0])

    // Dialog
    document.getElementById('currentProbe').value = (data[0][1])
    document.getElementById('currentProbeName').value = (data[0][1])
    document.getElementById('currentProbeIPAdresse').value = (data[0][2])
    document.getElementById('currentProbeLatitude').value = (data[0][3])
    document.getElementById('currentProbeLongitude').value = (data[0][4])
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