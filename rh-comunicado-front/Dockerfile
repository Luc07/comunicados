# Dockerfile (frontend)
# Use a imagem base oficial do Node.js
FROM node:20-alpine

# Instala o Next.js globalmente
RUN npm install -g next

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json e yarn.lock
COPY package.json package-lock.json yarn.lock ./

# Instala as dependências usando Yarn
RUN yarn install

# Copia o restante da aplicação
COPY . .

# Define a variável de ambiente para a porta
ENV PORT 3000

# Exponha a porta em que o app estará rodando
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "dev"]