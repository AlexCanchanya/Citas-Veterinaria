export class Cita {
    
        idcita: number;
        cliente: {
          idcliente: number;
        };
        veterinario: {
          idveterinario: number;
        };
        servicios: {
          idservicio: number;
        };
        mascotas: {
          idmascota: number;
        };
        usuario: {
          idusuario: number;
        };
        fechacita: string;
        horacita: string;
        observaciones: string;
        estcita: string;
}
