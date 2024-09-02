export interface Usuario {
    idusuario: number;

    nomusuario: string;
    apeusuario: string;
    nickusuario: string;
    passusuario: string;
    rol: string;
    estado: boolean;
}

export interface Credentials {
    nickusuario: string;
    passusuario: string;
}
