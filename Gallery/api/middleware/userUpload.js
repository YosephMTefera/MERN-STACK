import multer, { diskStorage } from "multer";
import { extname } from "path";

const Storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images/userImages");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const userUpload = multer({
  storage: Storage,
  fileFilter: (req, file, cb) => {
    var ext = extname(file.originalname);
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg" &&
      ext !== ".PNG" &&
      ext !== ".JPG" &&
      ext !== ".GIF" &&
      ext !== ".JPEG"
    ) {
      return cb("Only images are allowed.");
    }
    cb(null, true);
  },
  limits: {
    fileSize: 2048 * 2048,
  },
}).single("picture");

export default userUpload;
