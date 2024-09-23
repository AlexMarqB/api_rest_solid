# Como executar essa aplicação =>

- npm install

Configure as variaveis de ambiente

- docker compose up -d

- npm run dev

# Como executar os testes da aplicação => 

Para testar apenas 1 vez

- npm run test

Para testar continuamente

- npm run test:watch

Para verificar o quanto os testes cobriram a aplicação

- npm run test:coverage

# App

# Gympass style app => 
Aplicativo (gympass) para pessoa fazer check-in em academias
Ela paga X valor mensal e libera acesso a Y academias
Com planos diferentes

# Iremos trabalhar com =>

Geolocalização
Verificação com data
JWT
Principios do SOLID

## RFs ( Requisitos funcionais )
- Funcionalidades da aplicação, o que o usuário irá poder fazer na nossa aplicação
- Não necessáriamente rotas HTTP, podem ser funcionalidades para outro software conectar ao nosso
- [ ] Deve ser possivel X
- [ ] Must be able to X 

- [X] Deve ser possivel se cadastrar;
- [X] Deve ser possivel se autenticar;
- [X] Deve ser possivel obter o perfil de um usuário logado/autenticado;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuário logado;
- [ ] Deve ser possivel o usuário obter seu histórico de check-ins;
- [ ] Deve ser possivel o usuário buscar academias próximas;
- [ ] Deve ser possivel o usuário buscar academias pelo nome;
- [X] Deve ser possivel o usuário realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuário;
- [ ] Deve ser possivel cadastrar uma academia;

## RNs ( Regras de negócio )
- Determina as condições para cada requisito funcional

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs ( Requisitos não funcionais )
- Não partem do cliente, são requisitos tecnicos e mais a fundo do que funcionalidades
- BD, estrategia de cache, paginação, autenticação

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar páginados em 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);