import { NextResponse } from "next/server";
import { s3Client, streamToString, BUCKET } from "@/lib/s3";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import Papa from "papaparse";

// Allowed files — whitelist for security
const ALLOWED_FILES = ["data", "ai", "webdev"];

function getFileKey(searchParams) {
  const file = searchParams.get("file") || "data";
  // Sanitize: only allow whitelisted names
  const safe = ALLOWED_FILES.includes(file) ? file : "data";
  return `${safe}.csv`;
}

// GET /api/content?file=ai  → fetch CSV from S3 and return as JSON
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileKey = getFileKey(searchParams);

    const command = new GetObjectCommand({ Bucket: BUCKET, Key: fileKey });
    const response = await s3Client.send(command);
    const csvString = await streamToString(response.Body);

    const { data } = Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
    });

    return NextResponse.json({ success: true, data, file: fileKey });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/content?file=ai  → convert JSON to CSV and upload to S3
export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileKey = getFileKey(searchParams);

    const { data } = await request.json();
    const csvString = Papa.unparse(data);

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: fileKey,
      Body: csvString,
      ContentType: "text/csv",
    });

    await s3Client.send(command);

    return NextResponse.json({ success: true, message: `Saved to ${fileKey}` });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
