import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["carsList"]

  connect() {
    console.log("hello from garage controller!")
    // Using API create the garage
    this.garageName = "batch-806-garage"
    this.garageUrl = `https://wagon-garage-api.herokuapp.com/${this.garageName}/cars`
    // 1. Fetch all cars from the API with a GET AJAX request
    this.#refreshCars()
  }

    #insertCarCard(car) {
      // 3. For each car, insert a new car card
      const carCard = `<div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand}%20${car.model}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} - ${car.model}</h4>
            <p><strong>Owner:</strong>${car.owner}</p>
            <p><strong>Plate:</strong>${car.plate}</p>
          </div>
        </div>`
      this.carsListTarget.insertAdjacentHTML('beforeend', carCard)
    }

    createCar(event) {
      event.preventDefault()
      // when we click our button, by default this would make an http request to
      // get or post something to where the action of our button is pointing,
      // which would reload our page/go to the next one. Here we want to disable
      // this as we want to make our request ourself on the JS side
      const formData = new FormData(event.currentTarget)
      const myNewCar = Object.fromEntries(formData)
      fetch(this.garageUrl, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(myNewCar)
      })
      .then(() => this.#refreshCars())
    }

    #refreshCars() {
      fetch(this.garageUrl)
      .then(response => response.json())
      .then((data) => {
        // console.log(data)
        // 2. Iterate over the cars you've just retrieved
        data.forEach(car => this.#insertCarCard(car))
      });
    }
  }
