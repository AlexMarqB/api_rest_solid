# Como executar essa aplicação =>

- npm install

Se você utiliza o Ubuntu >= 24.04 LTS e/ou tem o postgresql instalado execute para iniciar o docker
- npm run start
!!! Se só tiver 1 das condições (ou ubuntu 24 ou postgresql) acesse o package.json e altere o script !!!

Configure as variaveis de ambiente

- docker compose up -d

- npm run dev

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
- [ ] Deve ser possivel se autenticar;
- [ ] Deve ser possivel obter o perfil de um usuário logado/autenticado;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuário logado;
- [ ] Deve ser possivel o usuário obter seu histórico de check-ins;
- [ ] Deve ser possivel o usuário buscar academias próximas;
- [ ] Deve ser possivel o usuário buscar academias pelo nome;
- [ ] Deve ser possivel o usuário realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuário;
- [ ] Deve ser possivel cadastrar uma academia;

## RNs ( Regras de negócio )
- Determina as condições para cada requisito funcional

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
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