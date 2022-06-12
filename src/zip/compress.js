import zlib from "zlib";
import path from "path";
import fs from "fs/promises";
import { constants, createReadStream, createWriteStream, rm, access } from "fs";
import { pipeline } from "stream/promises";

export const compress = async (pathToFile, destPath) => {
  try {
    await fs.access(pathToFile, constants.R_OK | constants.F_OK);
    if (path.extname(destPath)) {
      await fs.access(path.dirname(destPath), constants.R_OK | constants.F_OK);
    } else {
      await fs.access(destPath, constants.R_OK | constants.F_OK);
    }
  } catch (err) {
    console.log(
      new Error(
        "Operation failed. File or folder doesn't exists or could not be reached from this directory"
      )
    );
    return null;
  }

  try {
    if (!path.extname(destPath)) {
      destPath = path.join(destPath, path.basename(pathToFile) + ".br");
    } else {
      destPath += ".br";
    }

    await pipeline(
      createReadStream(pathToFile),
      zlib.createBrotliCompress(),
      createWriteStream(destPath)
    );
  } catch (err) {
    console.log("Operation failed");
  } finally {
    rm(pathToFile, (err) => {
      if (err) {
        console.log("Operation failed");
      }
    });
  }
};
