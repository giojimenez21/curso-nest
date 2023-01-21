<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo __.env.template__ y renombrar a __.env__
```
docker-compose up -d
```
6. Llenar las variables de entorno definidas en el __.env__
7. Ejercual la aplicacion en dev:
```
npm run start:dev
```

8. Insertar datos
```
http://localhost:3000/api/seed
```

## Stack usado
* MongoDB
* Nest

# Generar build de produccion
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno para produccion
3. Construir la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```



