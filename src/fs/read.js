import fs from "fs/promises";
import { constants, createReadStream } from "fs";

export const read = async (fileToRead) => {
  try {
    await fs.access(fileToRead, constants.R_OK | constants.F_OK);
  } catch (err) {
    console.log(
      new Error(
        "Operation failed. File or folder doesn't exists or could not be reached from this directory"
      )
    );
    return null;
  }
  try {
    const rs = createReadStream(fileToRead);
    rs.pipe(process.stdout);
  } catch (err) {
    throw new Error("FS operation failed");
  }
};
