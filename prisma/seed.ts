import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('Meraki2026@@', 12)

  await prisma.adminUser.upsert({
    where: { email: 'grupomerakirealestate@gmail.com' },
    update: { password: hashedPassword },
    create: {
      email: 'grupomerakirealestate@gmail.com',
      password: hashedPassword,
      nombre: 'Administrador Meraki',
    },
  })

  console.log('Seed completado exitosamente')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
