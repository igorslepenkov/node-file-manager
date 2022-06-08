import path from "path";
import fs from "fs/promises";

const up = async (currentDirectory) => {
  try {
    return path.join(currentDirectory, "..");
  } catch (err) {
    throw new Error("Operation failed");
  }
};

const cd = async (currentDirectory, newPath) => {
  try {
    if (path.isAbsolute(newPath)) {
      return newPath;
    } else {
      return path.join(currentDirectory, newPath);
    }
  } catch (err) {
    throw new Error("Operation failed");
  }
};

const list = async (currentDirectory) => {
  try {
    const files = await fs.readdir(currentDirectory, { withFileTypes: true });
    for (const file of files) {
      console.log(file.name);
    }
  } catch (err) {
    console.log(err);
    throw new Error("Operation failed");
  }
};

export { up, cd, list };
