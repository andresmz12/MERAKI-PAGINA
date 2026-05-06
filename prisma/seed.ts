import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Admin user
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

  // Sample properties
  const propiedades = [
    {
      slug: 'apartamento-moderno-el-poblado',
      titulo: 'Apartamento Moderno en El Poblado',
      descripcion: 'Hermoso apartamento con acabados de lujo en el corazón de El Poblado. Amplia terraza con vista a la ciudad, cocina integral equipada y zonas comunes de primer nivel. Ideal para familias o inversión.',
      precio: 850000000,
      moneda: 'COP',
      tipo: 'apartamento',
      operacion: 'venta',
      estado: 'disponible',
      ciudad: 'Medellín',
      barrio: 'El Poblado',
      direccion: 'Carrera 43A #7-50',
      area: 120,
      habitaciones: 3,
      banos: 3,
      garajes: 2,
      estrato: 6,
      piso: 12,
      destacada: true,
      imagenes: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      ],
      imagenesPublicIds: [],
      caracteristicas: ['Piscina', 'Gimnasio', 'Vigilancia 24h', 'Salón social', 'Terraza', 'Parqueadero visitantes'],
    },
    {
      slug: 'casa-campestre-las-palmas',
      titulo: 'Casa Campestre en Las Palmas',
      descripcion: 'Espectacular casa campestre en la vía Las Palmas con jardines exuberantes y vista panorámica al Valle de Aburrá. Arquitectura contemporánea con materiales naturales, integración perfecta con el entorno.',
      precio: 2800000000,
      moneda: 'COP',
      tipo: 'casa',
      operacion: 'venta',
      estado: 'disponible',
      ciudad: 'Medellín',
      barrio: 'Las Palmas',
      direccion: 'Vía Las Palmas km 8',
      area: 450,
      habitaciones: 5,
      banos: 5,
      garajes: 4,
      estrato: 6,
      destacada: true,
      imagenes: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
      ],
      imagenesPublicIds: [],
      caracteristicas: ['Piscina privada', 'BBQ', 'Jardín privado', 'Cuarto de servicio', 'Cancha de tenis', 'Vista panorámica'],
    },
    {
      slug: 'apartamento-arriendo-laureles',
      titulo: 'Apartamento en Arriendo - Laureles',
      descripcion: 'Cómodo y moderno apartamento en el exclusivo sector de Laureles. Cerca de restaurantes, centros comerciales y parques. Totalmente amoblado y equipado, listo para estrenar.',
      precio: 3500000,
      moneda: 'COP',
      tipo: 'apartamento',
      operacion: 'arriendo',
      estado: 'disponible',
      ciudad: 'Medellín',
      barrio: 'Laureles',
      direccion: 'Circular 1 #74-30',
      area: 75,
      habitaciones: 2,
      banos: 2,
      garajes: 1,
      estrato: 5,
      piso: 5,
      destacada: false,
      imagenes: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
      ],
      imagenesPublicIds: [],
      caracteristicas: ['Amoblado', 'Vigilancia', 'Zona de lavandería', 'Balcón', 'Cocina equipada'],
    },
  ]

  for (const prop of propiedades) {
    await prisma.propiedad.upsert({
      where: { slug: prop.slug },
      update: {},
      create: prop,
    })
  }

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
