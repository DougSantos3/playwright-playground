Feature: Validação Multi-camada

    Scenario: Validar dados via API e presença no Front
        Given que eu consulto o Pokémon "Pikachu" na API
        And o status code é 200
        Then eu acesso o site do Playwright e busco por "API"
        And confirmo que a documentação está visível


    Scenario: Validar resiliência da API com diferentes métodos e status de erro.