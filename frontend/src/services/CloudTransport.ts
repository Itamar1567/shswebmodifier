import type { CreateNewsletterDTO } from "../interfaces/CreateNewsletterDTO";
import type { EditNewsletterDTO } from "../interfaces/EditNewsletterDTO";
import type { GetNewsletterDTO } from "../interfaces/GetNewsletterDTO";

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
      `${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export async function UploadFile(file: File): Promise<void> {
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
      throw new Error(`Failed to upload file.`);
    }
  } catch (error) {
    throw error;
  }
}

async function sendDataNewsletterDataToDatabase(
  newsLetterData: CreateNewsletterDTO,
) {
  try {
    const res = await fetch(`${backend_url}api/newsletter`, {
      method: "POST",
      body: JSON.stringify(newsLetterData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error response from server:", data);
      throw new Error(data.message);
    }

    console.log("Response from server:", data);

    return data.message;
  } catch (error) {
    console.error("Error uploading newsletter data to database:", error);
    throw new Error(
      `Failed to upload newsletter data to database: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export async function UploadNewsletterToBackend(
  file: File | null,
  newsletterData: CreateNewsletterDTO,
): Promise<string> {
  try {
    newsletterData.image_path = file === null ? null : file.name;

    const res = await sendDataNewsletterDataToDatabase(newsletterData);

    if (file !== null) {
      await UploadFile(file);
    }

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

//

export async function GetNewslettersFromBackend(): Promise<GetNewsletterDTO[]> {
  try {
    const res = await fetch(`${backend_url}api/newsletter`, { method: "GET" });
    const data = await res.json();

    if (!res.ok) {
      console.error("Error response from server:", data);
      throw new Error(data.message);
    }

    return data.newsletters as GetNewsletterDTO[];
  } catch (error) {
    console.error("Error fetching newsletters from backend:", error);
    throw new Error(
      `Failed to fetch newsletters from backend: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export async function deleteNewsletterFromBackend(id: number): Promise<string> {
  try {
    const res = await fetch(`${backend_url}api/newsletter/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Error response from server:", data);
      throw new Error(data.message);
    }
    return data.message;
  } catch (error) {
    console.error("Error deleting newsletter from backend:", error);
    throw new Error(
      `Failed to delete newsletter from backend: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export async function GetNewsletterByIdFromBackend(
  id: number,
): Promise<EditNewsletterDTO> {
  try {
    const res = await fetch(`${backend_url}api/newsletter/${id}`, {
      method: "GET",
    });
    console.log(res)
    const data = await res.json()
    if (!res.ok) {
      console.error("Error response from server:", data);
      throw new Error(data.message);
    }

    return data.editableNewsletter;
  } catch (error) {
    console.error("Error getting newsletter from backend:", error);
    throw new Error(
      `Failed to get newsletter data from backend`,
    );
  }
}

export async function SendEditedNewsletterToBackend(
  editedNewsletter: EditNewsletterDTO
) {
  try {

    const res = await fetch(
      `${backend_url}api/newsletter/${editedNewsletter.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(editedNewsletter),
        headers: { "Content-Type": "application/json" },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      console.error("Error response from server:", data);
      throw new Error(data.message);
    }

    return data.message;
  } catch (error) {
    console.error("Error editing newsletter:", error);
    throw new Error(`${error instanceof Error ? error.message : String(error)}`);
  }
}
