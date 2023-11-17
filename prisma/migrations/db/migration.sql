-- CreateEnum
CREATE TYPE "Role" AS ENUM ('university', 'organization');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "refreshToken" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Verification" (
    "verification_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "verification_token" TEXT NOT NULL DEFAULT '',
    "reset_password_token" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("verification_id")
);

-- CreateTable
CREATE TABLE "University" (
    "university_id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("university_id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "organization_id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("organization_id")
);

-- CreateTable
CREATE TABLE "Scholarship" (
    "scholarship_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "coverage" INTEGER NOT NULL,
    "contact_name" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "organization_id" INTEGER NOT NULL,

    CONSTRAINT "Scholarship_pkey" PRIMARY KEY ("scholarship_id")
);

-- CreateTable
CREATE TABLE "ScholarshipType" (
    "scholarshiptype_id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "scholarship_id" INTEGER NOT NULL,

    CONSTRAINT "ScholarshipType_pkey" PRIMARY KEY ("scholarshiptype_id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "organization_id" INTEGER NOT NULL,
    "scholarship_id" INTEGER NOT NULL,
    "assignment_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("assignment_id")
);

-- CreateTable
CREATE TABLE "Files" (
    "file_id" SERIAL NOT NULL,
    "user_id_student" INTEGER NOT NULL,
    "file_path" TEXT NOT NULL,
    "organization_id" INTEGER NOT NULL,
    "scholarship_id" INTEGER NOT NULL,
    "assignment_id" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Files_pkey" PRIMARY KEY ("file_id")
);

-- CreateTable
CREATE TABLE "apikeys" (
    "id_key" SERIAL NOT NULL,
    "service_name" TEXT NOT NULL,
    "key_value" TEXT NOT NULL,

    CONSTRAINT "apikeys_pkey" PRIMARY KEY ("id_key")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_user_id_key" ON "Verification"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Scholarship_organization_id_scholarship_id_key" ON "Scholarship"("organization_id", "scholarship_id");

-- CreateIndex
CREATE UNIQUE INDEX "Assignment_organization_id_scholarship_id_assignment_id_key" ON "Assignment"("organization_id", "scholarship_id", "assignment_id");

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "University" ADD CONSTRAINT "University_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scholarship" ADD CONSTRAINT "Scholarship_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("organization_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarshipType" ADD CONSTRAINT "ScholarshipType_scholarship_id_fkey" FOREIGN KEY ("scholarship_id") REFERENCES "Scholarship"("scholarship_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_organization_id_scholarship_id_fkey" FOREIGN KEY ("organization_id", "scholarship_id") REFERENCES "Scholarship"("organization_id", "scholarship_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_organization_id_scholarship_id_assignment_id_fkey" FOREIGN KEY ("organization_id", "scholarship_id", "assignment_id") REFERENCES "Assignment"("organization_id", "scholarship_id", "assignment_id") ON DELETE CASCADE ON UPDATE CASCADE;
