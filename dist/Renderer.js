class Renderer {

    renderData(cities) {
        $("#weather-list").empty()
        const source = $("#weatherCardTemplate").html()
        const template = Handlebars.compile(source)
        const newHTML = template({ cities })
        $("#weather-list").append(newHTML)
    }
}