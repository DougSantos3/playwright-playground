Feature: Pokémon Details Management
    Scenario: Validate Pokémon stats consistency between API and UI
        Given the user is on the Pokedex Home Page
        When the user searches for "charizard" and opens details
        Then the UI should display the correct weight from the data source
        And the API should confirm the status code 200