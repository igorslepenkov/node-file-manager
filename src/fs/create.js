import { createWriteStream, constants } from "fs";
import { access } from "fs/promises";
import path from "path";

export const create = async (destination, text = "") => {
  try {
    access(path.dirname(destination), constants.F_OK);
  } catch (err) {
    console.log(
      new Error(
        "Operation failed. File or folder doesn't exists or could not be reached from this directory"
      )
    );
  }

  try {
    const writeStream = createWriteStream(destination);
    if (text) {
      writeStream.write(text);
    }
  } catch (err) {
    console.log(new Error("Operation failed"));
  }
};
