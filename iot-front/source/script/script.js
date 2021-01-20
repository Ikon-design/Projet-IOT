var request = new XMLHttpRequest()

request.open('GET', 'http://192.168.97.2', 'clement', 'root')
request.send

// request.load = function () {
//   console.log("Load")
// }


fetch('http://192.168.97.2:5000/api')
  .then((response) => {
    console.log(response)
    return response.json()
  })
  .then((data) => {
    data.forEach((Sondes) => {
      console.log(Sondes)
      })
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })

// var data = JSON.parse(request.response)
// console.log(data)
