import createMulter from "../config/produto.multer";

const uploadImage = createMulter({
    folder: 'images',
    allowedTypes: ['image/jpeg', 'image/png'],
    fileSize: 10 * 1024 * 1024
}).single('vinculoImagem');

export default uploadImage; 
