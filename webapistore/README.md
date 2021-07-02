# APPSTORE

Proyect 

## API WEBAPISTORE

Carpeta contiene webapistore Backend

### Descripcion

</br>
Desarrolle la parte del front con nodejs y framework Expres 4., base de datos Postgres y ORM Sequelize donde utilizo la api del ORM y creando modelo y diseñando las direntes rutas que ayudan al diseño y modelado de datos consumida desde mi front.
</br>

### Despligue

Intalar las diferente paquetes package.json

````
npm i install 
````

Para consumir la API se puede utilizar postman acontinuacion agrego las direfentes rutas y metodos de la api

## API Product

Create Metodo POST data de tipo Json

````
POST http://localhost:8092/api/product/add HTTP/1.1

{
    "name"    : "Air Condition",
    "color"   : "red",
    "categoryId": "1",
    "size"    : "mediano",
    "price"   : "100.25",
    "store"   : "1"
}


````

Update Metodo PUT data de tipo JSON

````
PUT http://localhost:8092/api/product/update/1/ HTTP/1.1

{
    "name"    : "Air Condition",
    "color"   : "red",
    "categoryId": "1",
    "size"    : "mediano",
    "price"   : "100.25",
    "store"   : "1"
}

````

Delete Metodo Delete debe considerar id en la URL /:id

````
DELETE http://localhost:8092/api/product/delete/10/
````

Get Metodo GET return un poduct y Todos a la misma vez

````` 

GET http://localhost:8092/api/product/ HTTP/1.1
GET http://localhost:8092/api/product/1 HTTP/1.1

``````


List  Metodos Get donde se recepta un ID en la url del numero de paginas desarrolle una paginacion de datos 

``````

GET http://localhost:8092/api/product/pages/list/1 HTTP/1.1

GET http://localhost:8092/api/product/pages/1/ HTTP/1.1

``````

## API STORE


````
POST http://localhost:8092/api/store/add HTTP/1.1
Content-Type: application/json

{
    "name"    : "North WareHouse",
    "street"  : "calle four Florida",
    "number"  : "505",
    "zipcode" : "123456",
   
`````

`````
GET http://localhost:8092/api/store/ HTTP/1.1 => All

GET http://localhost:8092/api/store/1 HTTP/1.1 => One
``````

````
PUT http://localhost:8092/api/store/update/1 HTTP/1.1

````

````

DELETE http://localhost:8092/api/store/delete/1  HTTP/1.1
````


## API Category

````
POST http://localhost:8092/api/category/add HTTP/1.1

{
    "name"    : "household appliance",
    "keywords"  : "household"   
}
````
````

GET http://localhost:8092/api/category/ HTTP/1.1

GET http://localhost:8092/api/category/1 HTTP/1.1
````

````

PUT http://localhost:8092/api/category/update/1 HTTP/1.1
Content-Type: application/json

{
    "keywords" : "homes"
}
````

````
DELETE http://localhost:8092/api/category/delete/1  HTTP/1.1
````

</br>

### Lenguajes

</br>
Nodes, </br> 
<p align="center">
  <a href="https://nodejs.org/">
    <img
      alt="Node.js"
      src="https://nodejs.org/static/images/logo-light.svg"
      width="100"
      height="100"
    />
  </a>
</p>
Express

<p align="center">
<img
      alt="Node.js"
      src="https://i.cloudup.com/zfY6lL7eFa-3000x3000.png"
      width="300"
      height="100"
    />
</p>

ORM Sequelize </br>
# SEQUELIZE
````
$ npm i sequelize # This will install v6

# And one of the following:
$ npm i pg pg-hstore # Postgres
````

</br>


