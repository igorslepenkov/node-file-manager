import path from "path";
import fs from "fs/promises";
import { constants } from "fs";

const up = async (currentDirectory) => {
  try {
    await fs.access(
      path.join(currentDirectory, ".."),
      constants.R_OK | constants.F_OK
    );
  } catch (err) {
    console.log(new Error("Invalid input"));
    return null;
  }

  try {
    return path.join(currentDirectory, "..");
  } catch (err) {
    console.log(new Error("Operation failed"));
    return null;
  }
};

const cd = async (currentDirectory, newPath, check = false) => {
  if (check) {
    try {
      await fs.access(
        path.join(currentDirectory, newPath),
        constants.R_OK | constants.F_OK
      );
    } catch (err) {
      console.log(new Error("Invalid input"));
      return null;
    }
  }

  try {
    if (path.isAbsolute(newPath)) {
      return newPath;
    } else {
      return path.join(currentDirectory, newPath);
    }
  } catch (err) {
    console.log(new Error("Operation failed"));
    return null;
  }
};

const list = async (currentDirectory) => {
  try {
    const files = await fs.readdir(currentDirectory, { withFileTypes: true });
    for (const file of files) {
      console.log(file.name);
    }
  } catch (err) {
    console.log(new Error("Operation failed"));
  }
};

export { up, cd, list };
