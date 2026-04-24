export async function ValidateToken(getToken: () => Promise<string | null>) {
  try {
    const token = await getToken();
    if (token === null) {
      console.log("Token is null: ");
      throw new Error("Could not retrieve user authentication token");
    }

    return token;
  } catch (error) {
    console.log("Unable to authenticate: " + error);
    throw new Error("Could not authenticate the user");
  }
}
