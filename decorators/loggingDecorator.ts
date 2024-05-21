import { IServicioCorreo } from "../interfaces/IServicioCorreo";
import { Correo } from "../types/Correo";
import { InfoCorreo } from "../types/InfoCorreo";

export class LoggingDecorator implements IServicioCorreo {
    constructor(private wrapped: IServicioCorreo) {}

    async enviarCorreo(correo: Correo): Promise<void> {
        console.log("Logging: Enviar correo");
        await this.wrapped.enviarCorreo(correo);
    }

    async listarCorreos(inicio: number, fin: number): Promise<InfoCorreo[]> {
        console.log("Logging: Listar correos");
        return this.wrapped.listarCorreos(inicio, fin);
    }

    async descargarCorreo(infoCorreo: InfoCorreo): Promise<Correo> {
        console.log("Logging: Descargar correo");
        return this.wrapped.descargarCorreo(infoCorreo);
    }
}
