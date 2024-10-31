# Dockerfile (backend)
# Use a imagem base do Maven para construir o projeto
FROM maven:3.8.5-openjdk-17 AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo pom.xml e as dependências
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia o restante do projeto e constrói o artefato
COPY src ./src
RUN mvn package -DskipTests

# Usa a imagem base do JDK para rodar o artefato
FROM openjdk:17-jdk-slim

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o artefato construído do estágio anterior
COPY --from=build /app/target/*.jar app.jar

# Exponha a porta em que o app estará rodando
EXPOSE 9090

# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
