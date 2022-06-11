import fs from "fs/promises";
import path from "path";
import { constants } from "fs";

export const remove = async (pathToFile) => {
  try {
    await fs.access(path.join(pathToFile), constants.R_OK | constants.F_OK);
  } catch (err) {
    console.log(new Error("Invalid input"));
    return null;
  }

  try {
    await fs.rm(pathToFile, { recursive: true });
  } catch (err) {
    console.log(new Error("Operation failed"));
  }
};
