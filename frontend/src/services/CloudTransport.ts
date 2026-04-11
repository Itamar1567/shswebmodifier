import type { CreateNewsletterDTO } from "../interfaces/CreateNewsletterDTO";

const backend_url = "http://localhost:5100/";

async function generateSignedUrlForFileUpload(file: File): Promise<string> {
  try {
    const res = await fetch(
      `${backend_url}api/cloudstorage/generate-signed-url`,
      {
        method: "POST",
        body: JSON.stringify({
          name: file.name,
          type: file.type,
          size: file.size,
        }),
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Error response from server:", data);
      throw new Error(data.message);
    }

    return data.signedUrl;
  } catch (error) {
    throw new Error(
      `Failed to generate signed URL: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

async function UploadFile(file: File): Promise<void> {
  try {
    const url = await generateSignedUrlForFileUpload(file);
    const res = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to upload file. Status: ${res.status}, Response: ${errorText}`,
      );
    }
  } catch (error) {
    throw error;
  }
}

export async function UploadNewsletterToBackend(
  file: File | null,
  newsletterData: CreateNewsletterDTO,
): Promise<string> {
  try {
    if (file !== null) {
      await UploadFile(file);
      newsletterData.image_path = "some";
    }

    return "Newsletter succesfully added!";
  } catch (error) {
    console.log(error);
    throw error;
  }
}
