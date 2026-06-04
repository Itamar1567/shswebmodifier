import { useAuth } from "@clerk/react";
import { ValidateToken } from "../utils/Validation";
import { RedeployWebsite } from "../services/DeploymentFunctions";

export function UseNetlifyHooks() {
  const { getToken } = useAuth();

  async function UseRedeployWebsite() {
    try {
      const token = await ValidateToken(getToken);
      const res = await RedeployWebsite(token);
      return res;
    } catch (error) {
      throw error;
    }
  }

  return{
    UseRedeployWebsite,
  };
}
