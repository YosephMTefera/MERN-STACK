import multer from "multer";
import { extname } from "path";
const firebaseUpload = multer({
  storage: multer.memoryStorage(),
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
}).single("picture");

export default firebaseUpload;
