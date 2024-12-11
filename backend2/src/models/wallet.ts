import { generateUUIDv4 } from "../helpers/methods";

export interface IWallet {
    name: string
    lastname: string
    email: string,
    ammount: number,
}

export class Wallet implements IWallet {
    uuid;
    name;
    lastname;
    email;
    ammount;

    constructor(name: string, lastname: string, email: string, ammount: number, uuid?: string) {
        this.uuid = uuid ?? generateUUIDv4();
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.ammount = ammount;
    }
}
