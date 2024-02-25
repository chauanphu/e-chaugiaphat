-- CreateTable
CREATE TABLE "_ProjectToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToProduct_AB_unique" ON "_ProjectToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToProduct_B_index" ON "_ProjectToProduct"("B");

-- AddForeignKey
ALTER TABLE "_ProjectToProduct" ADD CONSTRAINT "_ProjectToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToProduct" ADD CONSTRAINT "_ProjectToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("url") ON DELETE CASCADE ON UPDATE CASCADE;
