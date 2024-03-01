# PRUEBA NODE JHON EDUARD ALMEIDA 



Clona el repositorio 

```
https://github.com/JhonHernandezz/Jhon-Eduard-Almeida-Prueba-Node-Sequelize.git
```



Abre el editor de código de preferencia, luego abre una terminal y coloca 

```
npm update
```



Luego coloca 

```
npm run dev
```



##### PRIMERA PARTE

 	1. 
     - Agregar productos 
       -  GET "Consultar general o por id_producto" 
       -  POST
       - PUT "Actualizar por id_producto" 
       - DELETE "Eliminar por id_producto"

```
http://127.10.10.10:5010/productos  o http://127.10.10.10:5010/productos/1
```

Ej. data

```
{
  "estado": 1,
  "kit": 0,
  "barcode": "asdd",
  "nombre": "Jhond ocolate",
  "presentacion": "1000 gr",
  "descripcion": "Cobertura Chocolate Negro Nacional De Chocolate  - 1000gr",
  "foto": null,
  "peso": "0.00"
}
```

###### NOTA: recuerde que algunas tablas tienen crud completo GET - POST - PUT - DELETE 



2. 
   - Agregar tienda_productos 
     - GET "Consultar general o por id_producto" 
     - POST 
     - PUT "Actualizar por id" 
     - DELETE "Eliminar por id"

```
http://127.10.10.10:5010/tienda_productos o http://127.10.10.10:5010/tienda_productos/1
```

Ej. data

```
{
  "compra_maxima": "3.0",
  "valor": "6209.000",
  "id_promocion": 2,
  "id_tienda": 1,
  "id_producto": 215
}
```



##### SEGUNDA PARTE

 	1. 
     - Listar productos de una tienda en especifico que cuenten con promoción con la fecha de hoy entre Inicio y Fin 

```
http://127.10.10.10:5010/tienda_productos/api/catalogo/:id_tienda
```

###### NOTA: Recuerde que para que le muestre registros tiene que cambiar las fechas en los datos de la tabla Tiendas_promociones



 	2. 
     - Agregar productos al carrito	
       - GET "Consultar general" 
       - POST 
       - PUT "Actualizar por id" 
       - DELETE "Eliminar por id"

```
http://127.10.10.10:5010/carritos o http://127.10.10.10:5010/carritos/1
```

Ej data

```
{
  "cantidad": 2,
  "id_tienda": 3,
  "id_producto": 23,
  "id_user": 2
}
```

###### NOTA: La cantidad puede ser opcional, se tomara el valor de 1



3. 
   - Realizar pedido
     - GET "Consultar general" 
     - POST 

```
http://127.10.10.10:5010/pedidos
```

Ej data

```
{
  "instrucciones": "Entregar en la oficina",
  "entrega_fecha": "01/03/2024",
  "id_tienda": 3,
  "id_user": 2
}
```



4. 
   - Listar los pedidos del cliente
     - GET "Consultar por id_user" 

```
http://127.10.10.10:5010/api/pedidos/1
```