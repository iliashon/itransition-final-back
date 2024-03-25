-- AlterTable
ALTER TABLE "item_tag" ADD CONSTRAINT "item_tag_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "attribute" (
    "id" SERIAL NOT NULL,
    "collection_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "require" BOOLEAN NOT NULL DEFAULT false,
    "is_show_on_grid" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atr_value_date" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "atr_id" INTEGER NOT NULL,
    "value" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "atr_value_date_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atr_value_int" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "atr_id" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "atr_value_int_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atr_value_varchar" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "atr_id" INTEGER NOT NULL,
    "value" VARCHAR(256) NOT NULL,

    CONSTRAINT "atr_value_varchar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atr_value_text" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "atr_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "atr_value_text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atr_value_boolean" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "atr_id" INTEGER NOT NULL,
    "value" BOOLEAN NOT NULL,

    CONSTRAINT "atr_value_boolean_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "attribute_id_key" ON "attribute"("id");

-- CreateIndex
CREATE UNIQUE INDEX "atr_value_date_id_key" ON "atr_value_date"("id");

-- CreateIndex
CREATE UNIQUE INDEX "atr_value_int_id_key" ON "atr_value_int"("id");

-- CreateIndex
CREATE UNIQUE INDEX "atr_value_varchar_id_key" ON "atr_value_varchar"("id");

-- CreateIndex
CREATE UNIQUE INDEX "atr_value_text_id_key" ON "atr_value_text"("id");

-- CreateIndex
CREATE UNIQUE INDEX "atr_value_boolean_id_key" ON "atr_value_boolean"("id");

-- AddForeignKey
ALTER TABLE "attribute" ADD CONSTRAINT "attribute_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atr_value_date" ADD CONSTRAINT "atr_value_date_atr_id_fkey" FOREIGN KEY ("atr_id") REFERENCES "attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atr_value_date" ADD CONSTRAINT "atr_value_date_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atr_value_int" ADD CONSTRAINT "atr_value_int_atr_id_fkey" FOREIGN KEY ("atr_id") REFERENCES "attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atr_value_int" ADD CONSTRAINT "atr_value_int_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atr_value_varchar" ADD CONSTRAINT "atr_value_varchar_atr_id_fkey" FOREIGN KEY ("atr_id") REFERENCES "attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atr_value_varchar" ADD CONSTRAINT "atr_value_varchar_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atr_value_text" ADD CONSTRAINT "atr_value_text_atr_id_fkey" FOREIGN KEY ("atr_id") REFERENCES "attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atr_value_text" ADD CONSTRAINT "atr_value_text_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atr_value_boolean" ADD CONSTRAINT "atr_value_boolean_atr_id_fkey" FOREIGN KEY ("atr_id") REFERENCES "attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atr_value_boolean" ADD CONSTRAINT "atr_value_boolean_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
