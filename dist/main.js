const tempmanager = new TempManager()
const renderer = new Renderer()

async function loadPage() {
    await tempmanager.getDataFromDB()
    let now = moment()
    // tempmanager.cityData.forEach(c => {
    //     if (now - moment(c.date) >= 600000) { //gte 10 mins
    //         console.log(`updating ${c.name}'s data`)
    //         tempmanager.updateCity(c.name)
    //     }
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
    tempmanager.removeCity(cityName)
    renderer.renderData(tempmanager.cityData)
})

$("#mainContainer").on("click", ".updateButton", async function() {
    const cityName = $(this).siblings(".cityName").text()
    await tempmanager.updateCity(cityName)
    renderer.renderData(tempmanager.cityData)
})

loadPage()