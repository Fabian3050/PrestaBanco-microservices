# Etapa de construcción
FROM node:alpine AS build
# Establecer el directorio de trabajo
WORKDIR /app
# Copiar los archivos de configuración de npm
COPY package*.json ./
# Instalar las dependencias
RUN npm install
# Copiar los archivos de la aplicación
COPY . .
# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:latest
# Copiar los archivos construidos al servidor Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copiar los archivos de configuración de Nginx
COPY /nginx/conf.d /etc/nginx/conf.d
# Exponer el puerto 5731
EXPOSE 5731
# Comando para ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]