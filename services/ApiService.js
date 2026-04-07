export class ApiService {
    constructor(request, baseUrl) {
        this.request = request
        this.baseUrl = baseUrl
    }

    async postData(path, payload) { return await this.request.post(`${this.baseUrl}${path}`, { data: payload }) }
    async getData(path) { return await this.request.get(`${this.baseUrl}${path}`) }
    async putData(path, payload) { return await this.request.put(`${this.baseUrl}${path}`, { data: payload}) }
    async deleteData(path) { return await this.request.delete(`${this.baseUrl}${path}`) }
    async patchData(path) { return await this.request.patch(`${this.baseUrl}${path}`, { data: payload }) }
}
