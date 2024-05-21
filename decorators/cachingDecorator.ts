import { IServicioCorreo } from "../interfaces/IServicioCorreo";
import { Correo } from "../types/Correo";
import { InfoCorreo } from "../types/InfoCorreo";

export class CachingDecorator implements IServicioCorreo {
    private cache: Map<string, Correo> = new Map();

    constructor(private wrapped: IServicioCorreo) {}

    async enviarCorreo(correo: Correo): Promise<void> {
        console.log("Caching: Enviar correo");
        await this.wrapped.enviarCorreo(correo);
    }

    async listarCorreos(inicio: number, fin: number): Promise<InfoCorreo[]> {
        console.log("Caching: Listar correos");
        return this.wrapped.listarCorreos(inicio, fin);
    }

    async descargarCorreo(infoCorreo: InfoCorreo): Promise<Correo> {
        if (this.cache.has(infoCorreo.id)) {
            console.log("Caching: Descargar correo desde caché");
            return this.cache.get(infoCorreo.id)!;
        } else {
            console.log("Caching: Descargar correo desde servicio");
            const correo = await this.wrapped.descargarCorreo(infoCorreo);
            this.cache.set(infoCorreo.id, correo);
            return correo;
        }
    }
}
