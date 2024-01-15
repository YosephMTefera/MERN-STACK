import multer, { diskStorage } from "multer";
import { extname } from "path";

const Storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images/postImages");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
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
    fileSize: 10 * 1024 * 1024,
  },
}).single("postPicture");

export default upload;
