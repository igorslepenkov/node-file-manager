import { createHash } from "crypto";
import fs from "fs/promises";
import { createReadStream, read, constants } from "fs";

export const calculateHash = async (pathToFile) => {
  try {
    await fs.access(pathToFile, constants.R_OK | constants.F_OK);
  } catch (err) {
    console.log(
      new Error(
        "Operation failed. File or folder doesn't exists or could not be reached from this directory"
      )
    );
    return null;
  }

  try {
    const hash = createHash("sha256");
    const readStream = createReadStream(pathToFile);
    readStream.on("data", (data) => {
      hash.update(data);
    });
    readStream.on("end", () => {
      console.log(hash.digest("hex"));
    });
  } catch (err) {
    console.log(new Error("Operation failed"));
  }
};
