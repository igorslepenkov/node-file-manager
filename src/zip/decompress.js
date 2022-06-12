import zlib from "zlib";
import path from "path";
import fs from "fs/promises";
import { constants, createReadStream, createWriteStream, rm, access } from "fs";
import { pipeline } from "stream/promises";

export const decompress = async (pathToFile, destPath) => {
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
    destPath = path.join(
      destPath,
      path.basename(pathToFile).match(/^(.+)\.br$/)[1]
    );

    await pipeline(
      createReadStream(pathToFile),
      zlib.createBrotliDecompress(),
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
