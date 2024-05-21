import { Request, Response } from 'express';
import { IServicioCorreo } from '../interfaces/IServicioCorreo';
import { ServicioCorreo } from '../services/servicioCorreo';
import { LoggingDecorator } from '../decorators/loggingDecorator';
import { CachingDecorator } from '../decorators/cachingDecorator';

const servicioCorreoBase = new ServicioCorreo();
const loggingCorreo = new LoggingDecorator(servicioCorreoBase);
const cachingCorreo = new CachingDecorator(servicioCorreoBase);

let servicioCorreo: IServicioCorreo = loggingCorreo; // or cachingCorreo

export const enviarCorreo = (req: Request, res: Response) => {
    const correo = req.body;
    servicioCorreo.enviarCorreo(correo);
    res.send('Correo enviado');
};

export const listarCorreos = (req: Request, res: Response) => {
    const { inicio, fin } = req.query;
    const correos = servicioCorreo.listarCorreos(Number(inicio), Number(fin));
    res.json(correos);
};

export const descargarCorreo = (req: Request, res: Response) => {
    const infoCorreo = req.body;
    const correo = servicioCorreo.descargarCorreo(infoCorreo);
    res.json(correo);
};
