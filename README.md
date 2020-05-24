### Si queres sabes mas sobre mi:
[Nestor Marsollier](https://github.com/nmarsollier/profile)

# Es un cliente simple para probar la plataforma

Con este cliente se pueden probar los diferentes microservicios.

## Dependencias

### Node 14.0.3 (en este momento)

Seguir los pasos de instalación del sitio oficial [nodejs.org](https://nodejs.org/en/)

## Ejecución

Para poder usarlo es necesario haber ejecutado todos los microservicios a probar.

Abrir ventana de comandos en la carpeta del proyecto y ejecutar :

```bash
npm install
npm start
```

Se abre la app en el puerto 4200


## Docker

Para crear el contenedor docker de este repositorio ejecutamos :

```bash
docker build -t ecommerce-cli .
docker run -it -d --name ecommerce-cli --network host ecommerce-cli
```

El contenedor se puede parar usando :

```bash
docker stop ecommerce-cli
```
Se vuelve a levantar usando 

```bash
docker start ecommerce-cli
```
