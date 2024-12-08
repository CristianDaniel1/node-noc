# Projeto NOC

Este é um repositório de estudos do curso de Back-End com NodeJS. O objetivo do Projeto NOC é monitorar as tarefas realizadas no app e aplicar uma Arquitetura Limpa, utilizando, por exemplo, o Repository Pattern.

## Funcionalidades

A funcionalidade principal é registrar logs de ações diversas, seja bem ou mal sucedidas, nas bases de dados MongoDB, PostgreSQL ou localmente (FileSystem), ou em todas simultaneamente. Também é possivel enviar um relatório por email contendo os logs.

## Tecnologias

- Node.js
- TypeScript
- MongoDB
- PostgreSQL

## Instruções

1. Clonar o arquivo .env.template para .env
2. Configurar as variáveis de ambiente (.env)
3. Executar o comando `npm install` para instalar dependências
4. Levantar as bases de dados com o comando

```
docker compose -d
```

5. Executar o comando `npm run dev` para rodar o projeto

**Obs**: Para obter uma Gmail Key, acesse [Google AppPasswords](https://myaccount.google.com/u/0/apppasswords)
