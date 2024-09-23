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

## Autenticação

Iremos sempre iniciar a lógica de autenticação ou qualquer lógica pelo caso de uso, porque ele é o nivel mais baixo da aplicação e já permite
testes unitários

Evitamos retornar erros com detalhes da autenticação para evitar invasões

## Factory Pattern

É uma fabrica de criações comuns com varias dependencias