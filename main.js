
const search = document.getElementById("search")

const today_name = document.getElementById("today_name")
const today_number = document.getElementById("today_number")
const today_month = document.getElementById("today_month")
const today_location = document.getElementById("today_location")

const today_temp = document.getElementById("today_temp")
const today_img = document.getElementById("today-img")
const today_condation = document.getElementById("today-condation")

const t_temp = document.getElementById("t_temp")

const t_klio = document.getElementById("t_klio")

const t_dir = document.getElementById("t_dir")

///next

let next_max = document.getElementsByClassName("next-max")
let next_day= document.getElementsByClassName("next-day")
let next_min = document.getElementsByClassName("next-min")
let next = document.getElementsByClassName("next")
let next_img = document.getElementsByClassName("next-img")

// search.addEventListener("keyup",change)


async function getData(citName) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=%2076121a69f5514c73819173802241701&q=${citName}&days=3`)
    let data = await response.json()
    return data



}
function currentDay(data) {
    let date = new Date
    today_name.innerHTML =date.toLocaleDateString('en-us',{weekday:"long"})
    today_number.innerHTML=date.getDate()
    today_month.innerHTML=date.toLocaleDateString("en-us",{month:"short"})
    today_location.innerHTML = data.location.name
    today_temp.innerHTML = data.current.temp_c
    today_img.setAttribute("src", `https:${data.current.condition.icon}`)
    today_condation.innerHTML = data.current.condition.text
    t_temp.innerHTML = data.current.humidity + "%"

    t_klio.innerHTML = data.current.wind_kph + "km/h"

    t_dir.innerHTML = data.current.wind_dir

}
function dispalyNext(data) {
    let forecastData = data.forecast.forecastday
    for (let i = 0; i < 2; i++) {
        let nextDate=new Date(forecastData[i+1].date)
        next_day[i].innerHTML=nextDate.toLocaleDateString("en-us",{weekday:"long"})
        next[i].innerHTML=forecastData[i+1].Date
        next_max[i].innerHTML = forecastData[i + 1].day.maxtemp_c
        next_min[i].innerHTML = forecastData[i + 1].day.mintemp_c
        next_img[i].setAttribute("src", ` https:${forecastData[i + 1].day.condition.icon}`)
        next[i].innerHTML = forecastData[i + 1].day.condition.text



    }

}

async function display(city='cario') {
    let getWeather = await getData(city)
    if(!getWeather.error){
    currentDay(getWeather)
    dispalyNext(getWeather)
    
    }
    
}

display()

search.addEventListener("input",function(){
    display(search.value)
})