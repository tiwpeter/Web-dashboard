import { NextResponse, NextRequest } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import slugify from 'slugify'; // เพิ่มการ import slugify

export const POST = async (req: NextRequest) => { 
  const formData = await req.formData();

  const file = formData.get("file");

  // Ensure 'file' is an instance of File
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No valid file received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = slugify(file.name, { lower: true });

  try {
      await writeFile(
          path.join(process.cwd(), "public/images/" + fileName),
          buffer
      );
      const slug = fileName;
      // ใช้ writeFile เขียน Buffer ลงในไฟล์ที่มีเส้นทาง public/images/ โดยใช้ชื่อไฟล์ที่สร้างจาก slugify

      const imageUrl = `http://localhost:${process.env.PORT}/images/${fileName}`;
      return NextResponse.json({ Message: "Success", slug, imageUrl, status: 201 });

  } catch (error) {
      console.log("Error occurred ", error);
      return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
