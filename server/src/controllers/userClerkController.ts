import { Request, Response } from "express";
// import { clerkClient } from "../index";
import { clerkClient } from "@clerk/express";

interface ExtendedError extends Error {
  response?: {
    data?: any;
    status?: number;
    headers?: any;
  };
}

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const userData = req.body;

  try {
    console.log("clerkClient:", clerkClient);
    const user = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        userType: userData.publicMetadata.userType,
        settings: userData.publicMetadata.settings,
      },
    });

    res.json({ message: "User updated successfully", data: user });
  } catch (error) {
    const extendedError = error as ExtendedError;

    if (extendedError.response) {
      console.error("Error Status:", extendedError.response.status);
      console.error("Error Data:", extendedError.response.data);
    } else if (extendedError.message) {
      console.error("Error Message:", extendedError.message);
    } else {
      console.error("Unknown Error Object:", JSON.stringify(error, null, 2));
    }

    res.status(500).json({
      message: "Error updating user",
      error: extendedError.message || "Unknown error occurred",
    });
  }
};
