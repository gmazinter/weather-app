class Renderer {

    renderData(cities) {
        console.log(`rendering at ${window.performance.now()} ms`)
        $("#weather-list").empty()
        const source = $("#weatherCardTemplate").html()
        const template = Handlebars.compile(source)
        const newHTML = template({ cities })
        $("#weather-list").append(newHTML)
    }
}