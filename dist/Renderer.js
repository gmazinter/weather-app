
class Renderer {
    constructor() {}

    renderData(cityArray) {
        $("#mainContainer").empty()
        const source = $("#weatherCardTemplate").html()
        const template = Handlebars.compile(source)
        const newHTML = template({cityArray})
        $("#mainContainer").append(newHTML)
    }
}