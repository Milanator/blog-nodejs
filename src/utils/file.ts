import fs from "fs";

export const clearFile = (path: string): void | string =>
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    return path;
  });
