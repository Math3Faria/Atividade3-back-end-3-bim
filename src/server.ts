import express from 'express';
import path from 'path'; 
import { EnvVar } from './config/EnvVar';
import router from './routes/routes';

const app = express();

app.use(express.json());

app.use('/images', express.static(path.resolve(__dirname, '../uploads/images')));

app.use('/', router);

app.listen(EnvVar.SERVER_PORT, () => {
    console.log(`Servidor rodando em http://localhost:${EnvVar.SERVER_PORT}`);
});
