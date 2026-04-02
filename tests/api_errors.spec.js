import { test, expect } from '@playwright/test'
import { ApiService } from '../services/ApiService'

test.describe('Batery the tests of error and Http verbs', () => {
    let apiService

    test.beforeEach(async ({ request }) => {
        apiService = new ApiService(request)
    })

    test('It should return 201 when performing a POST(Sucess)', async () => {
        const response = await apiService.postData('/posts', {title: 'Playwright', body: 'Test', userId: 1})      
        expect(response.status()).toBe(201)
    })
  
    test('It should validate the Delete method (Sucess 200/204)', async() => {
        const response = await apiService.deleteData('/posts/1')
        expect(response.ok()).toBeTruthy()
    })

    test('It should return 404 when attempting a Get on an non-existent resource', async () => {
        const response = await apiService.getData('/quero_que_retorne/erro_400')
        expect(response.status()).toBe(404)
    })

    test('It should return 404 when performing a POST(Sucess)', async () => {
        const response = await apiService.postData('/post', {title: 'Playwright', body: 'Test'})      
        expect(response.status()).toBe(404)
    })

    test('It should validate 404 error in case of an invalid payload (Theoretical Example)', async () => {
        const response = await apiService.postData('/post', {})
        expect(response.status()).toBe(404)
    })

})