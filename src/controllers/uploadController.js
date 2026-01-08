import cloudinary from "../utils/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).send("No files uploaded");

    const uploadedUrls = [];

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products", quality: "auto", fetch_format: "auto" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(file.buffer);
      });

      uploadedUrls.push(result.secure_url);
    }

    res.status(200).json({ urls: uploadedUrls }); // повертаємо масив URL
  } catch (err) {
    console.error("Upload controller error:", err);
    res.status(500).json({ error: err.message });
  }
};

// export const uploadImage = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).send("No file uploaded");

//     // upload у Cloudinary з пам'яті
//     const result = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         { folder: "products", quality: "auto", fetch_format: "auto" },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );
//       stream.end(req.file.buffer); // передаємо буфер файлу
//     });

//     res.status(200).json({ url: result.secure_url });
//   } catch (err) {
//     console.error("Upload controller error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };
