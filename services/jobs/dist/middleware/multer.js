import multer from "multer";
const storage = multer.memoryStorage();
const uploadFile = multer({ storage }).single("logo");
export default uploadFile;
