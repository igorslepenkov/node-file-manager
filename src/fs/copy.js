import fs from "fs/promises";
import { constants } from "fs";
import path from "path";

export const copy = async (srcPath, destPath, check = false) => {
  if (check) {
    try {
      await fs.access(srcPath, constants.R_OK | constants.F_OK);
      await fs.access(destPath, constants.R_OK | constants.F_OK);
    } catch (err) {
      console.log(new Error("Invalid input"));
      return null;
    }
  }

  try {
    if (!path.extname(srcPath)) {
      console.log(destPath);
      await fs.mkdir(path.join(destPath, path.basename(srcPath)));
      const destination = path.join(destPath, path.basename(srcPath));

      const files = await fs.readdir(srcPath, { withFileTypes: true });

      for (const file of files) {
        if (file.isFile()) {
          fs.copyFile(
            path.join(srcPath, file.name),
            path.join(destination, file.name),
            constants.COPYFILE_EXCL
          );
        } else {
          copy(path.join(srcPath, file.name), destination);
        }
      }
    } else {
      fs.copyFile(
        srcPath,
        path.join(destPath, path.basename(srcPath)),
        constants.COPYFILE_EXCL
      );
    }
  } catch (err) {
    console.log(new Error("Operation failed"));
  }
};
