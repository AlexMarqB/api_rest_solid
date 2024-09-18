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