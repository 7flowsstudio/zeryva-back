import cloudinary from "../utils/cloudinary.js";

// req.file.buffer буде містити файл з memoryStorage
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded");

    // upload у Cloudinary з пам'яті
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "gallery", quality: "auto", fetch_format: "auto" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer); // передаємо буфер файлу
    });

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error("Upload controller error:", err);
    res.status(500).json({ error: err.message });
  }
};
