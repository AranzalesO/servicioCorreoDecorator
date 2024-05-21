import express from 'express';
import { enviarCorreo, listarCorreos, descargarCorreo } from './controllers/correoController';

const app = express();
app.use(express.json());

app.post('/enviarCorreo', enviarCorreo);
app.get('/listarCorreos', listarCorreos);
app.post('/descargarCorreo', descargarCorreo);

export default app;
