import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { deleteImage } from '@/lib/cloudinary'
import { generateUniqueSlug } from '@/lib/slug'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const propiedad = await prisma.propiedad.findUnique({
      where: { id: params.id },
    })
    if (!propiedad) {
      return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 })
    }
    return NextResponse.json(propiedad)
  } catch (error) {
    console.error('GET propiedad error:', error)
    return NextResponse.json({ error: 'Error al obtener propiedad' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const existing = await prisma.propiedad.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 })
    }

    let slug = existing.slug
    if (body.titulo && body.titulo !== existing.titulo) {
      slug = await generateUniqueSlug(body.titulo)
    }

    const propiedad = await prisma.propiedad.update({
      where: { id: params.id },
      data: {
        slug,
        titulo: body.titulo,
        descripcion: body.descripcion,
        precio: body.precio ? parseFloat(body.precio) : undefined,
        moneda: body.moneda,
        tipo: body.tipo,
        operacion: body.operacion,
        estado: body.estado,
        ciudad: body.ciudad,
        barrio: body.barrio || null,
        direccion: body.direccion || null,
        area: body.area ? parseFloat(body.area) : null,
        habitaciones: body.habitaciones ? parseInt(body.habitaciones) : null,
        banos: body.banos ? parseInt(body.banos) : null,
        garajes: body.garajes ? parseInt(body.garajes) : null,
        estrato: body.estrato ? parseInt(body.estrato) : null,
        piso: body.piso ? parseInt(body.piso) : null,
        destacada: body.destacada,
        imagenes: body.imagenes,
        imagenesPublicIds: body.imagenesPublicIds,
        caracteristicas: body.caracteristicas,
      },
    })

    return NextResponse.json(propiedad)
  } catch (error) {
    console.error('PUT propiedad error:', error)
    return NextResponse.json({ error: 'Error al actualizar propiedad' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const propiedad = await prisma.propiedad.findUnique({ where: { id: params.id } })
    if (!propiedad) {
      return NextResponse.json({ error: 'Propiedad no encontrada' }, { status: 404 })
    }

    // Delete images from Cloudinary
    for (const publicId of propiedad.imagenesPublicIds) {
      try {
        await deleteImage(publicId)
      } catch {
        console.error(`Failed to delete image ${publicId} from Cloudinary`)
      }
    }

    await prisma.propiedad.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE propiedad error:', error)
    return NextResponse.json({ error: 'Error al eliminar propiedad' }, { status: 500 })
  }
}
