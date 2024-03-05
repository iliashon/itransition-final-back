-- CreateTable
CREATE TABLE "collection" (
    "id" SERIAL NOT NULL,
    "entity_id" INTEGER NOT NULL,
    "lang_code" VARCHAR(32) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" TEXT NOT NULL,
    "type" VARCHAR(64) NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "entity_id" INTEGER NOT NULL,
    "lang_code" VARCHAR(32) NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "collection_id_key" ON "collection"("id");

-- CreateIndex
CREATE UNIQUE INDEX "item_id_key" ON "item"("id");

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
