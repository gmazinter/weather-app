const tempmanager = new TempManager()
const renderer = new Renderer()

async function loadPage() {
    await tempmanager.getDataFromDB()
    // console.log(tempmanager.cityData)
    renderer.renderData(tempmanager.cityData)
}

async function handleSearch(cityInput) {
    await tempmanager.getCityData(cityInput)
    renderer.renderData(tempmanager.cityData)
}

$("#searchButton").on("click", function() {
    const cityInput = $("#searchInput").val()
    handleSearch(cityInput)
})

$("#mainContainer").on("click", ".saveButton", function() {
    const cityName = $(this).siblings("div").first().text()
    tempmanager.saveCity(cityName)
})

$("#mainContainer").on("click", ".removeButton", function() {
    const cityName = $(this).siblings(".cityName").text()
    console.log(cityName)
    tempmanager.removeCity(cityName)
    // console.log(tempmanager.cityData)
    renderer.renderData(tempmanager.cityData)
})

loadPage()
