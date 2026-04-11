import type { CreateNewsletterDTO } from "../interfaces/CreateNewsletterDTO";

const backend_url = "http://localhost:5100/";

async function generateSignedUrlForFileUpload(
  file: File | File[] | null,
): Promise<string> {
  try {
    const res = await fetch(
      `${backend_url}api/cloudstorage/generate-signed-url`,
      {
        method: "POST",
        body: JSON.stringify({
          objectName: file
            ? Array.isArray(file)
              ? file[0].name
              : file.name
            : "",
        }),
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to generate signed URL");
    }

    const data = await res.json();
    console.log(data.message);
    return data.signedUrl;
  } catch (error) {
    console.error("Error generating signed URL:", error);
    throw new Error("Could not generate signed URL");
  }
}

async function UploadFile(
  file: File | File[] | null): Promise<void> {
  try {
    const url = await generateSignedUrlForFileUpload(file);
    const res = await fetch(url, {
      method: "PUT",
      body: file ? (Array.isArray(file) ? file[0] : file) : null,
    });
    console.log("Upload response:", res);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error(
      "Having trouble uploading the file. Please try again later.",
    );
  }
}
export async function UploadNewsletterToBackend(
  file: File | File[] | null,
  newsletterData: CreateNewsletterDTO,
): Promise<string> {
  try {
    if (file !== null) {
      await UploadFile(file);
      newsletterData.image_path = "some";
    }

    return "uploaded";
  } catch (error) {
    console.error("Error uploading file:", error);
    return "Having trouble uploading the file. Please try again later.";
  }
}
