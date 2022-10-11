import { PrismaClient } from "@prisma/client";
import { users } from "./seeds/users";
import { profiles } from "./seeds/profiles";

const prismaClient = new PrismaClient();

async function main() {
    //* Creación de los perfiles de los usuarios, ya que necesitan perfil para la integridad de las FKs
    await prismaClient.perfil.createMany({
        data: profiles
    });
    //* Creacion de usuarios con seed
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
    });

 //! Execute seeders: npx prisma db seed
 //! DEBEN INSTALAR TS, Sino error fijo