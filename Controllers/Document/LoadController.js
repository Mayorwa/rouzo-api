const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const documentService = require('../../Services/Document');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const streamUpload = (req) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};

class LoadController {
  static async uploadDocumentBus(req, res) {
    const result = await streamUpload(req);

    const documentParams = {
      user_type: 'business',
      business: req.business,
      type: req.body.type,
      file: result.url,
    };
    const document = await documentService.createDocument(documentParams);

    return res.status(201).json({
      status: 'success',
      message: 'Business Document Uploaded Successfully',
      data: document,
    });
  }
}

module.exports = LoadController;
