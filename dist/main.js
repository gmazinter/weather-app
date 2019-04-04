const tempmanager = new TempManager()
const renderer = new Renderer()

async function loadPage() {
    await tempmanager.getDataFromDB()
    renderer.renderData(tempmanager.cityData)
}

loadPage() 

async function handleSearch(cityInput) {
    await tempmanager.getCityData(cityInput)
    renderer.renderData(tempmanager.cityData)
}

$("#searchButton").on("click", function() {
    const cityInput = $("#searchInput").val()
    handleSearch(cityInput)
})

$("#weather-list").on("click", ".saveButton", function() {
    const cityName = $(this).siblings(".cityName").text()
    tempmanager.saveCity(cityName)
})

$("#weather-list").on("click", ".removeButton", function() {
    const cityName = $(this).siblings(".cityName").text()
    tempmanager.removeCity(cityName)
    renderer.renderData(tempmanager.cityData)
})

$("#weather-list").on("click", ".refreshButton", function() {
    const cityName = $(this).siblings(".cityName").text()
    tempmanager.getCityData(cityName)
    renderer.renderData(tempmanager.cityData)
})