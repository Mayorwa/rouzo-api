const Document = require('../Models/Document');

class DocumentService {
  static async createDocument(req) {
    return await Document.create(req);
  }
}

module.exports = DocumentService;
