-- CreateTable
CREATE TABLE "ProjectDistrict" (
    "slug" TEXT NOT NULL,
    "projectUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProjectDistrict_pkey" PRIMARY KEY ("slug","projectUrl")
);

-- AddForeignKey
ALTER TABLE "ProjectDistrict" ADD CONSTRAINT "ProjectDistrict_projectUrl_fkey" FOREIGN KEY ("projectUrl") REFERENCES "Project"("url") ON DELETE RESTRICT ON UPDATE CASCADE;
