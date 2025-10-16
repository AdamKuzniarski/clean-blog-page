import multer from "multer";
import path from "path";
import fs from "fs";

// Stelle sicher, dass der Upload-Ordner existiert
const uploadDir = path.join(__dirname, "../public/assets/img");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// multer Storage konfigurieren
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // ID muss aus dem Form-Feld kommen
    const id = req.body.id;
    const ext = path.extname(file.originalname);
    cb(null, `${id}${ext}`);
  }
});

export const upload = multer({ storage });
