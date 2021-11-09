const data = require('./MOCK_DATA.json');

module.exports = {
    getUsers: () => data,
    getUser: (id) => {
        let identificador = Number(id);
        let user = data.filter((person) => person.id === identificador)[0];
        return user;
    },
    getLengthUsers: () => {
        let cont = 0;
        data.forEach((person) => cont++);
        return cont;
    },
    createUser: (dataUser) => {
        let newUser = {
            id: data.length + 1,
            ...dataUser,
        }
        data.push(newUser);
        return newUser;
    },
    putUser: (id, newBody) => {
        let identificador = Number(id);
        let userUpdate = data.find((user) => user.id === identificador);
        userUpdate["first_name"] = newBody["first_name"];
        userUpdate["last_name"] = newBody["last_name"];
        userUpdate.email = newBody.email;
        return userUpdate;
    },
    deleteUser: (id) => {
        id = Number(id);
        data.splice(id-1,1);
    },
};