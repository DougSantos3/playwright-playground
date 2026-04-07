import { test, expect } from '../../fixtures/index.js'

const errorScenarios = [
    { url: '/invalid-path', expectStatus: 404, description: 'Non-existent route'},
    { url: '/posts/99999', expectStatus: 404, description: 'Resource not found'},
    { url: '/users/0', expectStatus: 404, description: 'Invalid user ID'},
]

test.describe('DDT - Endpoint Testing', () => {

    for(const scenario of errorScenarios) {
        test(`It should validate ${scenario.description} returning ${scenario.expectStatus}`, async ({ apiService }) => {
            const response = await apiService.getData(scenario.url)
            expect(response.status()).toBe(scenario.expectStatus)
        })
    }
})
