var request = new XMLHttpRequest()

request.open('GET', 'http://192.168.97.2', 'clement', 'root')
request.send

request.load = function () {
  //   console.log("Load")
}


// console.log(probeName)


fetch('http://192.168.97.2:5000')
  .then((response) => {
    // var data = JSON.parse(request.response)
    // console.log(data, response)
    return response.json()
  })
  .then((data) => {
    let temperature = (data[0][4])
    let humidity = (data[0][5])

    let logo = document.getElementById('witness')
    switch (humidity && temperature){
      case 0:{
        humidity < 100
        temperature < 0
        logo.src = "./img/cloud.svg"
        break;}
      case 1:{
        humidity < 25
        temperature < 0
        logo.src = "../../img/cloud.svg"
        break;}
      case 2:{
        humidity < 25
        temperature > 30
        logo.src = "../../img/sun.svg"
        break;}
      case 3:{
        humidity > 100
        temperature >= 0
        logo.src = "../../img/cloud.svg"
        break;}
    }
    
    //Data accueil
    document.getElementById('probeName').innerHTML = (data[0][3])
    console.log(data[0])
    document.getElementById('temperature').innerHTML = (data[0][4] + '°')
    document.getElementById('humidity').innerHTML = (data[0][5] + '%')


    // Dialog
    document.getElementById('currentProbeName').value = (data[0][3])
    document.getElementById('currentProbeLongitude').value = (data[0][1])
    document.getElementById('currentProbeLatitude').value = (data[0][2])

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