import multer from "multer";

// multer зберігає файл в пам'яті, а не на диск
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
