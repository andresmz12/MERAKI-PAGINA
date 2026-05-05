import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { generateUniqueSlug } from '@/lib/slug'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const tipo = searchParams.get('tipo')
    const operacion = searchParams.get('operacion')
    const ciudad = searchParams.get('ciudad')
    const precioMin = searchParams.get('precioMin')
    const precioMax = searchParams.get('precioMax')
    const destacada = searchParams.get('destacada')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    const where: Record<string, unknown> = { estado: 'disponible' }
    if (tipo) where.tipo = tipo
    if (operacion) where.operacion = operacion
    if (ciudad) where.ciudad = { contains: ciudad, mode: 'insensitive' }
    if (destacada === 'true') where.destacada = true
    if (precioMin || precioMax) {
      where.precio = {}
      if (precioMin) (where.precio as Record<string, number>).gte = parseFloat(precioMin)
      if (precioMax) (where.precio as Record<string, number>).lte = parseFloat(precioMax)
    }

    const [propiedades, total] = await Promise.all([
      prisma.propiedad.findMany({
        where,
        orderBy: [{ destacada: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      prisma.propiedad.count({ where }),
    ])

    return NextResponse.json({
      propiedades,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error('GET propiedades error:', error)
    return NextResponse.json({ error: 'Error al obtener propiedades' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const {
      titulo, descripcion, precio, moneda, tipo, operacion, estado,
      ciudad, barrio, direccion, area, habitaciones, banos, garajes,
      estrato, piso, destacada, imagenes, imagenesPublicIds, caracteristicas,
    } = body

    if (!titulo || !descripcion || !precio || !tipo || !operacion || !ciudad) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 })
    }

    const slug = await generateUniqueSlug(titulo)

    const propiedad = await prisma.propiedad.create({
      data: {
        slug,
        titulo,
        descripcion,
        precio: parseFloat(precio),
        moneda: moneda || 'COP',
        tipo,
        operacion,
        estado: estado || 'disponible',
        ciudad,
        barrio: barrio || null,
        direccion: direccion || null,
        area: area ? parseFloat(area) : null,
        habitaciones: habitaciones ? parseInt(habitaciones) : null,
        banos: banos ? parseInt(banos) : null,
        garajes: garajes ? parseInt(garajes) : null,
        estrato: estrato ? parseInt(estrato) : null,
        piso: piso ? parseInt(piso) : null,
        destacada: destacada || false,
        imagenes: imagenes || [],
        imagenesPublicIds: imagenesPublicIds || [],
        caracteristicas: caracteristicas || [],
      },
    })

    return NextResponse.json(propiedad, { status: 201 })
  } catch (error) {
    console.error('POST propiedad error:', error)
    return NextResponse.json({ error: 'Error al crear propiedad' }, { status: 500 })
  }
}
