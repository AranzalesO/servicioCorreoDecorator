import { IServicioCorreo } from "../interfaces/IServicioCorreo";
import { Correo } from "../types/Correo";
import { InfoCorreo } from "../types/InfoCorreo";


class SimpleMutex {
    private mutex = Promise.resolve();

    lock(): Promise<() => void> {
        let begin: (unlock: () => void) => void = (unlock) => {};
        this.mutex = this.mutex.then(() => new Promise(begin));
        return new Promise((res) => {
            begin = res;
        });
    }
}

export class ThreadSafeCorreo implements IServicioCorreo {
    private lock = new SimpleMutex();

    async enviarCorreo(correo: Correo): Promise<void> {
        const release = await this.lock.lock();
        try {
            // Lógica para enviar correo de manera segura para hilos
        } finally {
            release();
        }
    }

    async listarCorreos(inicio: number, fin: number): Promise<InfoCorreo[]> {
        const release = await this.lock.lock();
        try {
            // Lógica para listar correos de manera segura para hilos
            return [] as InfoCorreo[];
        } finally {
            release();
        }
    }

    async descargarCorreo(infoCorreo: InfoCorreo): Promise<Correo> {
        const release = await this.lock.lock();
        try {
            // Lógica para descargar correo de manera segura para hilos
            return { id: infoCorreo.id, subject: infoCorreo.subject, body: '', sender: infoCorreo.sender, recipient: '' };
        } finally {
            release();
        }
    }
}
