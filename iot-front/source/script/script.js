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
    document.getElementById('probeName').innerHTML = (data[0][3])
    console.log(data[0])
    document.getElementById('temperature').innerHTML = (data[0][4] + '°')
    document.getElementById('humidity').innerHTML = (data[0][5] + '%')
    // title.textContent = data.currentProbe.currentName

    // Dialog
    document.getElementById('currentProbeName').value = (data[0][3])
    document.getElementById('currentProbeLongitude').value = (data[0][1])
    document.getElementById('currentProbeLatitude').value = (data[0][2])
  })
  .catch((err) => {
    console.log(err)
  })

(function(){
  var openParamsDialog = getElementById('openParamsDialog')
  var params = getElementById('params')
  
  openParamsDialog.addEventListener('click', function onOpen(){
    if (typeof params.showModal === 'function') {
      params.showModal();
    } else {
      console.error("nop");
    }
  })
})