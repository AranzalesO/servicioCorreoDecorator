import { Correo } from "../types/Correo";
import { InfoCorreo } from "../types/InfoCorreo";

export interface IServicioCorreo {
    enviarCorreo(correo: Correo): Promise<void>;
    listarCorreos(inicio: number, fin: number): Promise<InfoCorreo[]>;
    descargarCorreo(infoCorreo: InfoCorreo): Promise<Correo>;
}
