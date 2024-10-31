# Comunicados - Sistema de Comunicação para RH

A aplicação **Comunicados** é uma ferramenta desenvolvida para o setor de RH, destinada à publicação de comunicados internos. Os usuários podem acessar e visualizar os comunicados de forma segura e eficiente. Este sistema foi desenvolvido com backend em Spring Boot e frontend em Next.js, com suporte a autenticação e segurança.

## Colaboradores

Este projeto foi desenvolvido por [Mateus Braga](https://github.com/MteusBraga) e mim.

## Tecnologias Utilizadas

- **Backend**: [Spring Boot](https://spring.io/projects/spring-boot) com [Spring Security](https://spring.io/projects/spring-security)
- **Frontend**: [Next.js](https://nextjs.org/) com JavaScript
- **Banco de Dados**: Conexão com dois bancos MySQL diferentes
- **Containerização**: [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

## Funcionalidades

- **Autenticação Segura**: Implementada com Spring Security para controlar o acesso aos comunicados.
- **Publicação de Comunicados**: O setor de RH pode criar e publicar comunicados internos.
- **Conexão com Dois Bancos de Dados**: Integração com dois bancos MySQL distintos para suportar diferentes necessidades de dados.
  
## Estrutura do Projeto

### Backend (Spring Boot)

- **Segurança**: Implementação com Spring Security para autenticação e controle de acesso.
- **Banco de Dados**: Conexão com dois bancos MySQL, configurados para diferentes contextos dentro da aplicação.

### Frontend (Next.js)

- **Páginas**: Next.js gerencia as páginas da aplicação e o fluxo de navegação.
- **Componentes**: Componentes reutilizáveis para exibição de comunicados, formulários e notificações.
  
### Containerização

A aplicação é totalmente containerizada, com Docker e Docker Compose gerenciando o backend, frontend e os bancos de dados MySQL.

## Instruções para Configuração Local

### Pré-requisitos

- Docker e Docker Compose instalados.
- MySQL instalado para configurações opcionais fora do contêiner.
