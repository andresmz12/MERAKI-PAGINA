-- CreateTable
CREATE TABLE "Propiedad" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "moneda" TEXT NOT NULL DEFAULT 'COP',
    "tipo" TEXT NOT NULL,
    "operacion" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'disponible',
    "ciudad" TEXT NOT NULL,
    "barrio" TEXT,
    "direccion" TEXT,
    "area" DOUBLE PRECISION,
    "habitaciones" INTEGER,
    "banos" INTEGER,
    "garajes" INTEGER,
    "estrato" INTEGER,
    "piso" INTEGER,
    "destacada" BOOLEAN NOT NULL DEFAULT false,
    "imagenes" TEXT[],
    "imagenesPublicIds" TEXT[],
    "caracteristicas" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Propiedad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Propiedad_slug_key" ON "Propiedad"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
