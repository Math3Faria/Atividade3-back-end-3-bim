import 'dotenv/config';
import { EnvKey } from "./enum/EnvKey";

export class EnvVar {
    private construtor() { };

    public static getstring(chave: EnvKey): string {
        const valor = process.env[chave];
        if (valor === undefined) {
            throw new Error(`Variavel ${chave} não definida no .env`);
        }
        return valor;
    }

    public static getNumber(chave: EnvKey): number {
        const valor = this.getstring(chave);
        const valorConvertido = Number(valor);

        if (isNaN(valorConvertido)) {
            throw new Error(`Variável ${chave} deve ser um número valido`);
        }
        return valorConvertido;
    }

    public static getBoolean(chave: EnvKey): boolean {
        const valor = this.getstring(chave).toLowerCase();
        return ['true', '1', 'yes', 'on'].includes(valor)

    }

    public static get SERVER_PORT(): number {
        return this.getNumber(EnvKey.SERVER_PORT)

    }
    public static get DB_HOST(): string {
        return this.getstring(EnvKey.DB_HOST)

    }
    public static get DB_USER(): string {
        return this.getstring(EnvKey.DB_USER)

    }
    public static get DB_PASSWORD(): string {
        return this.getstring(EnvKey.DB_PASSWORD)

    }
    public static get DB_PORT(): number {
        return this.getNumber(EnvKey.DB_PORT)

    }
    public static get DB_DATABASE(): string {
        return this.getstring(EnvKey.DB_DATABASE)

    }
}