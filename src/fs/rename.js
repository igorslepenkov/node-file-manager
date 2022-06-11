import fs from "fs/promises";
import { constants } from "fs";

export const rename = async (oldPath, newPath) => {
  try {
    await fs.access(oldPath, constants.R_OK | constants.F_OK);
  } catch (err) {
    console.log(new Error("Invalid input"));
    return null;
  }

  try {
    await fs.rename(oldPath, newPath);
  } catch (err) {
    console.log(new Error("FS operation failed"));
  }
};
