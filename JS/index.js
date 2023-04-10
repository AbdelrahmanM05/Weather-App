"use strict";

const searchButton = document.querySelector("#searchBtn");
const searchBar = document.querySelector("#searchBar");
const forecast = document.querySelector("#forecast");
const todayForecast = document.querySelector("#todayForecast");
const otherDay = document.getElementsByName("otherDay");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function createData(city) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=9c27d3c88cbd44fd8ea204618232402&q=${city}&days=3`
  );
  if (res.ok && 400 != res.status) {
    let finalRes = await res.json();
    displayToday(finalRes.location, finalRes.current);
    displayTom(finalRes.forecast.forecastday);
  }
}

function displayToday(location, current) {
  let cartona = ``;
  if (location != null) {
    var date = new Date(current.last_updated.replace(" ", "T"));
    cartona += `<div class="card border-dark bg-gray border-0" id="todayForecast">
                          <div class="card-header d-flex justify-content-between bg-op-gray border-bottom-0">
                            <span>${days[date.getDay()]}</span>
                            <span>${
                              date.getDate() + months[date.getMonth()]
                            }</span>
                           </div>
                        <h5 class="card-title m-3">${location.name}</h5>
                        <div class="card-body mb-auto">
                            <div class="temp d-flex justify-content-between align-items-center flex-wrap">
                                <h1 class="card-text fa-6x text-white">${
                                  current.temp_c
                                }<sub class="position-relative">o</sub>C</h1>

                                <div class="forecast-img">
                                    <img src="${
                                      current.condition.icon
                                    }" class="img-fluid ms-3" alt="">
                                </div>
                            </div>
                            <p class="text-primary mb-4 ms-2">${
                              current.condition.text
                            }</p>
                            <div class="forecast-icons d-flex">

                                <p class="me-5">
                                    <img src="./images/icon-umberella.png" alt="">
                                    ${current.cloud}%
                                </p>
                                <p class="me-5">
                                    <img src="./images/icon-wind.png" alt="">
                                    ${current.wind_kph} km
                                </p>
                                <p class="me-5">
                                    <img src="./images/icon-compass.png" alt="">
                                    ${current.wind_dir}
                                </p>
                            </div>
                        </div>
                    </div>`;

    todayForecast.innerHTML = cartona;
  }
}
function displayTom(forecastDay) {
  let cartona = [];
  for (let i = 1; i < forecastDay.length; i++) {
    cartona.push(`
                      <div class="card-header d-flex justify-content-around border-bottom-0" >${
                        days[
                          new Date(
                            forecastDay[i].date.replace(" ", "T")
                          ).getDay()
                        ]
                      }</div>
                        <div class="card-body d-flex flex-column flex-wrap align-items-center pt-5 pb-3 mb-auto">
                            <div class="forecast-img mb-4">
                                <img src="${
                                  forecastDay[i].day.condition.icon
                                }" class="w-100" alt="">
                            </div>
                            <p class="card-text text-white fw-bolder fs-3" id="maxTempTom">${
                              forecastDay[i].day.maxtemp_c
                            }<sub>o</sub>C</p>
                            <p class="card-text" id="minTempTom">${
                              forecastDay[i].day.mintemp_c
                            }<sub>o</sub>C</p>
                            <p class="text-primary mb-4 ms-2">${
                              forecastDay[i].day.condition.text
                            }</p>
                        </div>
                     </div>`);

    otherDay[0].innerHTML = cartona[0];
    otherDay[1].innerHTML = cartona[1];
  }
}

searchBar.addEventListener("keyup", function (e) {
  createData(e.target.value);
});
createData("Alex");
