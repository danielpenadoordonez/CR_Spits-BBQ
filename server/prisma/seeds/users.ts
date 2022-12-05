//* Admins y meseros están en seeds.ts, debido a que lo necesitan al 100%

export const users = [
    //? Meseros fueron movidos debido a su relación con sucursal
    //* 8 [Clientes No usan dirección]
    {
        id: "65440685802",
        nombre: "Diego",
        apellido1: "Chávez",
        apellido2: "Rojas",
        correo: "diegochavez@gmail.com",
        username: "diegoChavez",
        clave: "$2b$10$f3w2p0Iv11niIidSlW5Heuhx8ECSQ8os2DnkHm5x1ap4ZmxBpo25S",
        //? Clave sin hash: 12345678
        salt: "$2b$10$f3w2p0Iv11niIidSlW5Heu",
        telefono: "01657364",
        idPerfil: 3 //* Cliente
    },
    //* 9
    {
        id: "508459062",
        nombre: "Agustín",
        apellido1: "Cordoba",
        apellido2: "Bogantes",
        correo: "agustincordoba@hotmail.com",
        username: "agustinCordoba",
        clave: "$2b$10$f3w2p0Iv11niIidSlW5Heuhx8ECSQ8os2DnkHm5x1ap4ZmxBpo25S",
        //? Clave sin hash: 12345678
        salt: "$2b$10$f3w2p0Iv11niIidSlW5Heu",
        telefono: "95367850",
        idPerfil: 3 //* Cliente
    },
    //* 10
    {
        id: "167459042",
        nombre: "Amparo",
        apellido1: "Castillo",
        apellido2: "Quintana",
        correo: "amparocastillo@gmail.com",
        username: "amparoCastillo",
        clave: "$2b$10$f3w2p0Iv11niIidSlW5Heuhx8ECSQ8os2DnkHm5x1ap4ZmxBpo25S",
        //? Clave sin hash: 12345678
        salt: "$2b$10$f3w2p0Iv11niIidSlW5Heu",
        telefono: "69737015",
        idPerfil: 3 //* Cliente
    },
    //* 11
    {
        id: "206450674",
        nombre: "David",
        apellido1: "Solís",
        apellido2: "Garita",
        correo: "davidsolis@gmail.com",
        username: "davidSolis",
        clave: "$2b$10$f3w2p0Iv11niIidSlW5Heuhx8ECSQ8os2DnkHm5x1ap4ZmxBpo25S",
        //? Clave sin hash: 12345678
        salt: "$2b$10$f3w2p0Iv11niIidSlW5Heu",
        telefono: "73708053",
        idPerfil: 3 //* Cliente
    },
];