import { PrismaClient } from "@prisma/client";
import { users } from "./seeds/users";

const prismaClient = new PrismaClient();

async function main() {
    //Creacion de usuarios con seed
    await prismaClient.usuario.createMany({
        data: users
    });
};

main()
 .then(async () => {
    await prismaClient.$disconnect();
 })
 .catch(async e => {
    console.error(`Error: ${e}`);
    await prismaClient.$disconnect();
    process.exit(1);
 })