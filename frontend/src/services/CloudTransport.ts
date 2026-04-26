import type { CreateNewsletterDTO } from "../interfaces/CreateNewsletterDTO";
import type { EditNewsletterDTO } from "../interfaces/EditNewsletterDTO";
import type { GetNewsletterDTO } from "../interfaces/GetNewsletterDTO";

const backend_endpoint = import.meta.env.VITE_BACKEND_ENDPOINT;

async function generateSignedUrlForFileUpload(
  file: File, token: string
): Promise<string> {
  try {
    const res = await fetch(
      `${backend_endpoint}api/cloudstorage/generate-signed-url`,
      {
        method: "POST",
        body: JSON.stringify({
          name: file.name,
          type: file.type,
          size: file.size,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

export async function UploadFile(
  file: File,
  token: string
): Promise<void> {
  try {
    const url = await generateSignedUrlForFileUpload(file, token);
    const res = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to upload the image to the cloud");
    }
  } catch (error) {
    throw error;
  }
}

async function SendDataNewsletterDataToDatabase(
  newsLetterData: CreateNewsletterDTO,
  token: string
) {
  try {
    const res = await fetch(`${backend_endpoint}api/newsletter`, {
      method: "POST",
      body: JSON.stringify(newsLetterData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Error response from server:", data);
      throw new Error(data.message);
    }

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
  token: string
): Promise<string> {
  try {
    newsletterData.image_path = file === null ? null : file.name;

    const res = await SendDataNewsletterDataToDatabase(
      newsletterData,
      token
    );

    if (file !== null) {
      await UploadFile(file, token);
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
    const res = await fetch(`${backend_endpoint}api/newsletter`, { method: "GET" });
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

export async function DeleteNewsletterFromBackend(
  id: number,
  token: string
): Promise<string> {
  try {

    const res = await fetch(`${backend_endpoint}api/newsletter/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
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
    const res = await fetch(`${backend_endpoint}api/newsletter/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Error response from server:", data);
      throw new Error(data.message);
    }

    return data.editableNewsletter;
  } catch (error) {
    console.error("Error getting newsletter from backend:", error);
    throw new Error(`Failed to get newsletter data from backend`);
  }
}

export async function SendEditedNewsletterToBackend(
  editedNewsletter: EditNewsletterDTO,
  token: string
) {
  try {
    const res = await fetch(
      `${backend_endpoint}api/newsletter/${editedNewsletter.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(editedNewsletter),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
