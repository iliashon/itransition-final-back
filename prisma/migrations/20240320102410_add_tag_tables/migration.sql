-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_tag" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tag_id_key" ON "tag"("id");

-- CreateIndex
CREATE UNIQUE INDEX "item_tag_id_key" ON "item_tag"("id");

-- AddForeignKey
ALTER TABLE "item_tag" ADD CONSTRAINT "item_tag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_tag" ADD CONSTRAINT "item_tag_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
