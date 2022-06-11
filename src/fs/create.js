import fs from "fs/promises";
import path from "path";
import url from "url";

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const create = async (path, text = "") => {
  try {
    await fs.writeFile(path, text, { flag: "wx" });
  } catch (err) {
    throw new Error("FS operation failed");
  }
};
