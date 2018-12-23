
class TempManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
        let data = await $.get(`/cities`)
        this.cityData = data
    }

    async getCityData(cityName) {
        let data = await $.get(`/city/${cityName}`)
        data = {
            name: data.cityName,
            date: data.cityDate,
            temperature: data.cityTemp,
            condition: data.cityCond,
            conditionPic: data.cityCondIcon
        }
        this.cityData.push(data)
    }

    saveCity(cityName) {
        let cityToSave = this.cityData.find(c => c.name === cityName)
        // console.log(cityToSave)
        $.post(`/city`, cityToSave, function() {})
    }

    removeCity(cityName) {
        $.ajax({
            method: 'DELETE',
            url:`city/${cityName}`,
            success: function() {},
            error: function (xhr, text, error) {
                console.log(text)
            }
        })

        let i = this.cityData.findIndex(c => cityName === c.name)
        this.cityData.splice(i,1)
    }

    async updateCity(cityName) {
        let data = await $.ajax({
            method: 'PUT',
            url: `city/:${cityName}`,
            // success: function(data) {
                // let i = this.cityData.findIndex(c => c.name === data.name)
                // this.cityData.splice(i, 1, data)
            // },
            error: function (xhr, text, error) {
                console.log(error)
            }
        })
        // console.log(data)
        data = {
            name: data.cityName,
            date: data.cityDate,
            temperature: data.cityTemp,
            condition: data.cityCond,
            conditionPic: data.cityCondIcon
        }
        let i = this.cityData.findIndex(c => c.name === data.name)
        this.cityData.splice(i, 1, data)
    }
}