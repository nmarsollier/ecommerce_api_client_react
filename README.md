### Si queres sabes mas sobre mi:
[Nestor Marsollier](https://github.com/nmarsollier/profile)

# Es un cliente simple para probar la plataforma

Con este cliente se pueden probar los diferentes microservicios [ecommerce](https://github.com/nmarsollier/ecommerce).

## Ejecución

Para poder usarlo es necesario haber ejecutado todos los microservicios a probar.

Abrir ventana de comandos en la carpeta del proyecto y ejecutar :

```bash
npm install
npm start
```

Se abre la app en el puerto 4200

## Docker

Tambien podemos usar docker en este repositorio, ejecutamos :

```bash
docker build -t dev-cli -f Dockerfile.dev .
docker run -it -d --name dev-cli --network host dev-cli
```

El contenedor se puede parar usando :

```bash
docker stop dev-cli
```
Se vuelve a levantar usando 

```bash
docker start dev-cli
```
