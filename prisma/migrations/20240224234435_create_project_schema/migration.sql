-- CreateTable
CREATE TABLE "Project" (
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("url")
);
