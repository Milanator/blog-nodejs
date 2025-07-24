import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb: any) {
    cb(null, "public");
  },
  filename: function (req, file, cb: any) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

export default (): any => {
  return multer({
    storage,
  });
};
