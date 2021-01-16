var request = new XMLHttpRequest()

request.open('GET', 'https://ghibliapi.herokuapp.com/films', true)

request.onload = function () {

}

request.send

fetch('https://ghibliapi.herokuapp.com/films/')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    data.forEach((movie) => {
        const test = document.getElementById('test')
        console.log(movie.title)
        test.textContent = movie.title
        const h1 = document.createElement('h1')
        h1.textContent = movie.title
      })

    console.log(data)
  })
  .catch((err) => {
    // Do something for an error here
  })

// var data = JSON.parse(request.response)
// console.log(data)
