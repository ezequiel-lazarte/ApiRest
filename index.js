const express = require('express');
const Service = require('./src/service');

const app = express(); // creamos una app con express
const PORT = 3000;

app.use(express.json()); // esta utilidad de express nos permite recibir datos de nuestros clientes

app.get('/', (req, res) => { // recibe la peticion y la respuesta que vamos a enviar a los clientes
    res.send({
        mesagge: "Lista de usuarios",
        body: Service.getUsers(),
    });
}); // cada metodo recibe la ruta y el controlador de esa ruta

app.get('/:id', (req, res) => {
    let {params : {id}} = req; // obtengo el id del request
    let user = Service.getUser(id); // busco el usurio por su id
    res.send({
        mesagge: `Usuario ${id}`,
        body: user,
    });
});

app.post('/', (req, res) => {
    let {body: {newUser}} = req; // obtengo el cuerpo del nuevo usuario
    let User = Service.createUser(newUser);

    res.status(201).send({
        message: 'Usuario creado',
        body: User,
    });
});

app.put('/:id', (req, res) => {
    let {body: {newBody}} = req; // tomo el cuerpo que me envia en el request
    let {params: {id}} = req; // tomo el params id
    id = Number(id);
    if(id === "") {
        res.status(400).send({
            message: 'Error el id ingresado esta vacio',
        });
    }
    if(id <= Service.getLengthUsers() && id >= 1) { // si el id que me envia es menor a 1 o mayor al length del array
        let user = Service.putUser(id, newBody); // actualizo el user
        res.status(200).send({
            mesagge: 'Usuario actualizado con exito!',
            body: user,
        });
    } else { // sino envio el error
        res.status(403).send({
            mesagge: 'Error el id es incorrecto',
        });
    }
});

app.delete('/:id', (req, res) => {
    let {params: {id}} = req;
    let user = Service.getUser(id);
    id = Number(id);
    if(Service.getUser(id) == undefined) {
        res.status(403).send({
            mesagge: 'Error el id que ingreso no existe', 
        });
        return;
    }
    if(id <= 20 && id >= 1) {
        Service.deleteUser(id);
        res.status(200).send({
            mesagge: 'Usuario Eliminado',
            body: user,
        });
    } else {
        res.status(403).send({
            mesagge: 'Error el id es incorrecto',
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
}); // recibe un puerto y un callback