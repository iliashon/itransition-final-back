-- CreateTable
CREATE TABLE "language" (
    "id" SERIAL NOT NULL,
    "lang_code" VARCHAR(32) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "is_default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "language_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "language_id_key" ON "language"("id");
