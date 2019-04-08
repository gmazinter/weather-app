class TempManager {
    constructor() {
        this.cityData = {}
    }

    async getDataFromDB() {
        const response = await $.get('/cities')
        this.cityData = response
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

    updateCity(cityName) {
        $.ajax(`city/${cityName}`, {
            data: this.cityData[cityName],
            method: 'PUT',
            error: function (xhr, err, except) {console.log(err)}
        })
    }

    async removeCity(cityName) {
        $.ajax(`city/${cityName}`, {
            method: 'DELETE',
            error: function (xhr, err, except) {console.log(err)}
        })
        delete this.cityData[cityName]
    }

    async refreshCity(cityName) {
        await this.getCityData(cityName)
        this.updateCity(cityName)
    }

    async refreshAll() {
        const cityArray = Object.values(this.cityData)
        for (let city of cityArray) {
            await this.refreshCity(city.name)
        }
    }
}