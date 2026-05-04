-- CreateTable
CREATE TABLE "_TechsToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TechsToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TechsToUser_B_index" ON "_TechsToUser"("B");

-- AddForeignKey
ALTER TABLE "_TechsToUser" ADD CONSTRAINT "_TechsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Techs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TechsToUser" ADD CONSTRAINT "_TechsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
