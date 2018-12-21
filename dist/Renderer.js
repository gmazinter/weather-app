
class Renderer {
    constructor() {}

    renderData(cityArray) {
        console.log(cityArray)
        $("#mainContainer").empty()
        const source = $("#weatherCardTemplate").html()
        const template = Handlebars.compile(source)
        const newHTML = template({cityArray})
        $("#mainContainer").append(newHTML)
    }
}