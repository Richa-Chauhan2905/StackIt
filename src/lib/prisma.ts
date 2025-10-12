import { PrismaClient } from '@prisma/client' //-> useful for the syntax like prisma.user.findMany()

const prismaClientSingleton = () => { //--> prisma init function
    return new PrismaClient();
}

type prismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as { //--> store prismaclient globally
    prisma: prismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton(); //--> if globalForPrisma.prisma exists then use that if not then use prismaCLientSingleton to create new prismaClient

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
