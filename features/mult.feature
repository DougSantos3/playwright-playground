Funcionalidade: Validação Multi-camada

Cenário: Validar dados via API e presença no Front
Dado que eu consulto o Pokémon "Pikachu" na API
E o status code é 200
Então eu acesso o site do Playwright e busco por "API"
E confirmo que a documentação está visível


Cenário: Validar resiliência da API com diferentes métodos e status de erro.