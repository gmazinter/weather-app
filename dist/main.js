const tempmanager = new TempManager()
const renderer = new Renderer()

async function loadPage() {
    await tempmanager.getDataFromDB()
    renderer.renderData(tempmanager.cityData)
    await tempmanager.refreshAll()
    renderer.renderData(tempmanager.cityData)
}

loadPage()
    
$("#searchButton").on("click", async function() {
    const cityInput = $("#searchInput").val()
    await tempmanager.getCityData(cityInput)
    renderer.renderData(tempmanager.cityData)
})

$("#weather-list").on("click", ".saveButton", function() {
    const cityName = $(this).siblings(".cityName").text()
    tempmanager.saveCity(cityName)
})

$("#weather-list").on("click", ".removeButton", async function() {
    const cityName = $(this).siblings(".cityName").text()
    await tempmanager.removeCity(cityName)
    renderer.renderData(tempmanager.cityData)
})

$("#weather-list").on("click", ".refreshButton", async function() {
    const cityName = $(this).siblings(".cityName").text()
    await tempmanager.getCityData(cityName)
    tempmanager.updateCity(cityName)
    renderer.renderData(tempmanager.cityData)
})