export interface IPessoa {
    mostrarDados(): string;
}

export abstract class Pessoa implements IPessoa {
    private _nome: string;
    private _email: string;

    constructor(nome: string, email: string) {
        this._nome = nome;
        this._email = email;
    }

    public get nome(): string { return this._nome; }
    public get email(): string { return this._email; }

    public mostrarDados(): string {
        return `Nome: ${this._nome} | Email: ${this._email}`;
    }
}

export class Cliente extends Pessoa {
    private _idCliente: number;
    private _cpf: string;
    private _endereco: string;
    private _dataCad: Date;

    constructor(idCliente: number, nome: string, email: string, cpf: string, endereco: string, dataCad: Date) {
        super(nome, email);
        this._idCliente = idCliente;
        this._cpf = cpf;
        this._endereco = endereco;
        this._dataCad = dataCad;
    }

    public get idCliente(): number { return this._idCliente; }
    public get cpf(): string { return this._cpf; }
    public get endereco(): string { return this._endereco; }
    public get dataCad(): Date { return this._dataCad; }

    public mostrarDados(): string {
        return `ID: ${this._idCliente} | ${super.mostrarDados()} | CPF: ${this._cpf}`;
    }
}

export class Vendedor extends Pessoa {
    private _idVendedor: number;
    private _matricula: number;
    private _dataAdmissao: Date;

    constructor(idVendedor: number, nome: string, email: string, matricula: number, dataAdmissao: Date) {
        super(nome, email);
        this._idVendedor = idVendedor;
        this._matricula = matricula;
        this._dataAdmissao = dataAdmissao;
    }

    public get idVendedor(): number { return this._idVendedor; }
    public get matricula(): number { return this._matricula; }
    public get dataAdmissao(): Date { return this._dataAdmissao; }

    public mostrarDados(): string {
        return `ID: ${this._idVendedor} | ${super.mostrarDados()} | Matrícula: ${this._matricula}`;
    }
}
