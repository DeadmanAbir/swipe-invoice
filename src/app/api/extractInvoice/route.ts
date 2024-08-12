import { NextRequest, NextResponse } from "next/server";
import { extractData, extractInvoice, validateFile } from "./core";

export const maxDuration = 300;

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as File;
  const validation = await validateFile(file);

  if (!validation.valid) {
    return NextResponse.json({ error: validation.message }, { status: 400 });
  }

  const extractedText = await extractInvoice(file);

  if (!extractedText || extractedText === "No text found in the file.") {
    return NextResponse.json(
      { error: "No text found in the file." },
      { status: 406 }
    );
  }

  const extractedResponse = await extractData(extractedText);

  if (!extractedResponse) {
    return NextResponse.json(
      { error: "Failed to extract data." },
      { status: 500 }
    );
  }

  return NextResponse.json({ data: extractedResponse }, { status: 200 });
}
