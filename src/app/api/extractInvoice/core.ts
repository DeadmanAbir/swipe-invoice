import { UnstructuredClient } from "unstructured-client";
import { PartitionResponse } from "unstructured-client/sdk/models/operations";
import { Strategy } from "unstructured-client/sdk/models/shared/index.js";
import { ChatGemini } from "@/utils/chatGemini";

export const validateFile = async (
  file: File
): Promise<{ valid: boolean; message?: string }> => {
  if (!file) {
    return { valid: false, message: "No file provided." };
  }

  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: "Invalid file type. Only PDF, JPEG, and PNG files are allowed.",
    };
  }

  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSizeInBytes) {
    return { valid: false, message: "File size exceeds the 5MB limit." };
  }

  return { valid: true };
};

export const extractInvoice = async (
  file: File
): Promise<string | undefined> => {
  try {
    const apiKey = process.env.UNSTRUCTURED_API_KEY;
    if (!apiKey) throw new Error("UNSTRUCTURED_API_KEY is not set");

    const unstructuredClient = new UnstructuredClient({
      security: {
        apiKeyAuth: apiKey,
      },
    });

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const res: PartitionResponse = await unstructuredClient.general.partition({
      partitionParameters: {
        files: {
          content: uint8Array,
          fileName: file.name,
        },
        strategy: Strategy.Auto,
      },
    });

    if (res.statusCode === 200) {
      if (!res.elements) {
        return "No text found in the file.";
      }

      return res.elements.map((el) => el.text).join("\n");
    } else {
      throw new Error(`Unexpected status code: ${res.statusCode}`);
    }
  } catch (e: any) {
    // Use a proper logging mechanism here instead of console.log
    console.error("Error extracting invoice:", e.message);
    console.error("Status Code:", e.statusCode);
    console.error("Response Body:", e.body);
    return undefined;
  }
};

export const extractData = async (context: string) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

    const chatGemini = new ChatGemini({
      apiKey: apiKey,
      model: "gemini-1.5-flash",
    });

    const data = await chatGemini.chat({
      prompt:
        "We are providing you with the context of an invoice data, your job is to extract the customer details, products and total amount from the invoice data.",
      context: context,
      systemInstruction:
        "You're a data extractor, your job is to extract data from invoices data provided.",
      outputFormat: `{"customer_name": "", "customer_address": "","customer_number": "","customer_mail": "", "products": "", "total_amount": ""}`,
    });

    return data;
  } catch (e: any) {
    console.error("Error extracting data:", e.message);
    return undefined;
  }
};
