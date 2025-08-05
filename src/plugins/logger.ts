import morgan from "morgan";
import fs from "fs";
import path from "path";

export default () => {
  const accessLogStream = fs.createWriteStream(path.resolve() + "/access.log", {
    flags: "a",
  });

  return morgan("combined", { stream: accessLogStream });
};
