import multer from "multer";
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { Request } from "express";

const baseUploadDir = path.resolve(process.cwd(), 'uploads');

const verificaDir = (dir: string): void => {
    // Verifica se o diretório não existe
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

interface MulterOptions {
    folder: string;
    allowedTypes: string[];
    fileSize: number
}

const createMulter = ({ folder, allowedTypes, fileSize }: MulterOptions) => {
    // Monta caminho do diretório base (uploads) + pasta
    const uploadDir = path.join(baseUploadDir, folder);
    // Verifica se o diretório não existe para criar
    verificaDir(uploadDir);

    const storage: multer.StorageEngine = multer.diskStorage({
        destination: (req, file, cb): void => {
            cb(null, uploadDir);
        },
        filename: (req, file, cb): void => {
            const hash = crypto.randomBytes(12).toString('hex');
            cb(null, `${hash}-${file.originalname}`);
        }
    });

    const fileFilter: multer.Options['fileFilter'] = (req: Request, file, cb) => {
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Tipo de arquivo não permitido'));
        }
        cb(null, true);
    }

    return multer({
        storage,
        limits: { fileSize },
        fileFilter
    })

}

export default createMulter;



// {
//   "devDependencies": {
//     "@types/express": "^5.0.6",
//     "@types/multer": "^2.0.0",
//     "@types/node": "^25.3.0",
//     "nodemon": "^3.1.14",
//     "ts-node": "^10.9.2",
//     "typescript": "^5.9.3"
//   },
//   "dependencies": {
//     "dotenv": "^17.3.1",
//     "express": "^5.2.1",
//     "multer": "^2.0.2",
//     "mysql2": "^3.18.0"
//   }
// }