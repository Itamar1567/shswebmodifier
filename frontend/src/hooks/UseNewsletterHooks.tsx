import { useAuth } from "@clerk/react";
import { ValidateToken } from "../utils/Validation";
import { DeleteNewsletterFromBackend, SendEditedNewsletterToBackend, UploadFile, UploadNewsletterToBackend } from "../services/CloudTransport";
import type { CreateNewsletterDTO } from "../interfaces/CreateNewsletterDTO";
import type { EditNewsletterDTO } from "../interfaces/EditNewsletterDTO";

export function UseNewsletterHooks() {
  const { getToken } = useAuth();

  async function UseUploadFile(file: File) {
    try{
        const token = await ValidateToken(getToken);
        await UploadFile(file, token)
    }catch(error){

    }
  }

  async function UseUploadNewsletterToBackend(file: File | null, newsletterData: CreateNewsletterDTO) {
    try{
        const token = await ValidateToken(getToken);
        const res = await UploadNewsletterToBackend(file, newsletterData, token)
        return res;
    }catch(error){
        throw error;
    }
  }

  async function UseDeleteNewsletterFromBackend(id: number) {
    try{
        const token = await ValidateToken(getToken);
        const res = await DeleteNewsletterFromBackend(id, token);
        return res;
    }catch(error){
        throw error;
    }
  }

  async function UseSendEditedNewsletterToBackend(editedNewsletter: EditNewsletterDTO) {
    try{
        const token = await ValidateToken(getToken);
        const res = SendEditedNewsletterToBackend(editedNewsletter, token);
        return res;
    }catch(error){
        throw error;
    }
  }

  return {
    UseUploadFile,
    UseUploadNewsletterToBackend,
    UseDeleteNewsletterFromBackend,
    UseSendEditedNewsletterToBackend,
  };
}
