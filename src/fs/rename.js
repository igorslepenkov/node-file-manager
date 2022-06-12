import fs from "fs/promises";
import path from "path";
import { createReadStream, createWriteStream } from "fs";

export const rename = async (oldPath, newFileName) => {
  try {
    const newPath = path.join(path.dirname(oldPath), newFileName);
    const readStream = createReadStream(oldPath);
    const writeStream = createWriteStream(newPath);
    readStream.pipe(writeStream);
  } catch (err) {
    console.log(new Error("Operation failed"));
  } finally {
    fs.rm(oldPath);
  }
};
