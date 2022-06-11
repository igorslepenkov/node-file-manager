import fs from "fs/promises";
import path from "path";
import { constants } from "fs";

export const read = async (fileToRead) => {
  try {
    await fs.access(path.join(fileToRead), constants.R_OK | constants.F_OK);
  } catch (err) {
    console.log(new Error("Invalid input"));
    return null;
  }
  try {
    const data = await fs.readFile(fileToRead, { encoding: "utf-8" });
    process.stdout.write(data);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};
