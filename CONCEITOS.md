## ORM - Object Relational Mapper
=> Mapear as relações e tabelas do banco de dados em objetos

ex:

class User {
    name: string
    email: string
}

TABLE User {
    name: VARCHAR(255),
    email: VARCHAR(255)
}

## Prisma =>

npm i prisma -D

npx prisma init

npx prisma generate => cria a tipagem dos models do schema.prisma

npm i @prisma/client => Acessa o banco de dados

## Docker => 

Uma vez instalado podemos criar containers de banco de dados para evitar deixar esse ambiente variavel na nossa maquina direta

docker hub => "Receitas" das imagens do docker

bitname/postgresql => Puxa mais para o lado de segurança do que a imagem default do postgresql
                                                                                                                                            redireciona a porta do container docker para o host                
docker run --name nome_do_container -e POSTGRESQL_USERNAME=username_do_bd -e POSTGRESQL_PASSWORD=senha_para_o_user -e POSTGRESQL_DATABASE=nome_do_bd -p 5432:5432 nome/imagem

docker ps => retorna os containers rodando

docker ps -a => Todos os containers já criado

docker start nome_do_container

atualizamos o database_url do nosso .env com o user, password e database definidos na criação do container

npx prisma migrate dev => Ele busca todas as tabelas e campos alterados no schema.prisma que não foi refletido no banco de dados e gera uma migration

npx prisma studio => abre uma interface no navegador para navegar pelas tabelas do bd

O container criado está na nossa maquina, porém se outro dev for mexer no bd em outra maquina precisaria fazer todo o processo de instalação do bd
então em desenvolvimento podemos utilizar o docker-compose.yml para ditar os containers necessário que a aplicação precisa para funcionar

docker compose up -d => -d = não mostra os logs no terminal

docker compose down => para e apaga todos os containers

docker compose stop => para os containers sem deletar


## Segurança => 

Não iremos salvar a senha diretamente no banco de dados iremos utilizar um hash

Por que um hash ao inves da criptografia?

A criptografia vai e volta, vc criptografa e descriptografa
já o hash não ele apenas vai não tem como desfazer

npm i bcryptjs

npm i @types/bcryptjs -D

## Camadas da aplicação =>
Pode ser que alguma funcionalidade não será através de uma rota http, existem lógicas que não podem depender da rota ou do controller

# Solid =>

D - Dependency Inversion Principle

# controller => Função que lida com a entrada de dados e devolve uma resposta (fastify, express, nest)

# useCase / services => Função que lida com a lógica e aplicação de regra de negócio independente de como a requisição foi feita (HTTP ou não)

# respository => Abstração do cliente utilizado para finalizar a requisição com o banco, por exemplo hoje eu uso o prisma se amanhã eu for alterar, só preciso atualizar os repositories

## Trativa de erros =>
O fastify tem uma trativa padrão para erros porém não é perfeito então iremos desenvolver um tratamento de erro global

## Testes 

Em média cada regra de negócio deve se tornar um teste

É sim valido testar a aplicação apenas com os testes em código sem nem rodar a aplicação

Cada teste deve ser executado em um ambiente totalmente limpo e sem registros anteriores

E2E => Irá testar como o usuário utilizaria a aplicação desde o request até as alterações no banco de dados (de teste)

Criar o banco executar o teste e deletar o banco leva muito tempo

1,5 (segundos por teste) * 2000 (n de testes e2e) * 60 (segundos em 1 min) == 50 min de teste

Não é indicado criar testes e2e para falhas por conta do tempo de execução

Utilizaremos a lib supertest para executar requisições sem subir a aplicação

## Test Enviroment - prisma + vitest + supertest

Conseguimos mudar o ambiente para apps especificos. 

A vantagem de utilizarmos o PostgreSQL é que ele possui uma divisão própria divida por "schemas" que são ambientes isolados

## Autenticação

Iremos sempre iniciar a lógica de autenticação ou qualquer lógica pelo caso de uso, porque ele é o nivel mais baixo da aplicação e já permite
testes unitários

Evitamos retornar erros com detalhes da autenticação para evitar invasões

## Factory Pattern

É uma fabrica de criações comuns com varias dependencias

## TDD => Test-Driven-Development

TDD diz que desenvolver o teste antes da implementação a validação tende a ser correta porque o teste te auxilia a chegar ao que deseja

Etapas: 
Red -> Causo o erro no teste
Green -> Vou desenvolver o minimo possivel para o teste funcionar
Refactor -> Refatoro

# Mocking

O vitest fornece otimas funcionalidades de mocking para lidar com o tipo de dado "Date" e utilizamos a lib
dayjs para melhorar mais o tratamento e uso desses dados

## Autenticação 

3 estratégias comuns de autenticação
Basic auth -> Faz com que todas as requisições exijam todas as credenciais do usuário em base64 - falta com segurança
JSON Web Token -> Só envia os dados na rota de login e depois que validar é gerado um stateless token unico e que não pode ser modificado

Caso o serviço não seja web a autenticação pode ser diferente

# JWT - Hash e hash inverso / Code e decode - Foco em serviços web

npm i @fastify/jwt

* stateless: não armazenado em nenhuma estrutura de persistencia de dados (bd, arquivo, variavel)

Usuário faz login - email e senha -> é gerado um token stateless unico e não modificavel                              

Back-end: Utiliza uma PALAVRA-CHAVE (string) pode ser qualquer coisa literalmente
ex: askfjbsdf9sdfys8f3p03843943dasjdkasdahad

Email/senha -> header.payload.sign

Como o token é stateless não fica em banco de dados precisamos de uma forma de invalidar aquele token
caso o usuário faça logout ou fique muito tempo sem acessar precisamos tornar o token invalido para garantir segurança

Marcação de data -> normalmente utilizamos a data de criação do token até X dias após isso o token é valido, caso tenha expirado é preciso
realizar o login novamente

Refresh Token -> Podemos utilizar um segundo token para renovar a validade do token principal toda vez que o usuário acessa o nosso sistema

Iremos armazenar o refresh token nos cookies do navegador utilizando @fastify/cookie

## Package.json e NPM 

Qualquer script com "pre" ou "post" como prefixo será lido antes ou depois do respectivo comando seguinte
ex:
"start" : "...."
"prestart" : "...."

o comando "prestart" irá ser executando automaticamente antes do comando "start" se chamarmos o 
npm run start