import fs from "fs/promises";
import { constants } from "fs";
import path from "path";
import { createReadStream, createWriteStream } from "fs";

export const move = async (srcPath, destPath, check = false) => {
  if (check) {
    try {
      await fs.access(srcPath, constants.R_OK | constants.F_OK);
      await fs.access(destPath, constants.R_OK | constants.F_OK);
    } catch (err) {
      console.log(
        new Error(
          "Operation failed. File or folder doesn't exists or could not be reached from this directory"
        )
      );
      return null;
    }
  }

  try {
    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(
      path.join(destPath, path.basename(srcPath))
    );
    readStream.pipe(writeStream);
  } catch (err) {
    console.log(new Error("Operation failed"));
  } finally {
    fs.rm(srcPath);
  }
};
