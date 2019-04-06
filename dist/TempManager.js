class TempManager {
    constructor() {
        this.cityData = {}
    }

    async getDataFromDB() {
        const response = await $.get('/cities')
        this.cityData = response
        console.log(this.cityData)
    }

    async getCityData(cityName) {
        const response = await $.get(`/city/${cityName}`)
        const cityObject = {
            name: response.location.name,
            updated: response.current.last_updated,
            temp: response.current.temp_c,
            condition: response.current.condition.text,
            conditionIcon: response.current.condition.icon
        }
        this.cityData[cityObject.name] = cityObject
    }

    saveCity(cityName) {
        $.post(`/city`, this.cityData[cityName])
    }

    removeCity(cityName) {
        $.ajax(`city/${cityName}`, {
            method: 'DELETE',
            error: function (xhr, err, except) {console.log(err)}
        })
        delete this.cityData[cityName]
    }

    refreshCity(cityName) {
        const lastUpdatedString = this.cityData.find(c => c.name === cityName).updated
        console.log(lastUpdatedString)
    }
}