import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { uploadImage, deleteImage } from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    if (!file) {
      return NextResponse.json({ error: 'No se encontró archivo' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const result = await uploadImage(buffer)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Error al subir imagen' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const { publicId } = await req.json()
    if (!publicId) {
      return NextResponse.json({ error: 'publicId requerido' }, { status: 400 })
    }
    await deleteImage(publicId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Error al eliminar imagen' }, { status: 500 })
  }
}
