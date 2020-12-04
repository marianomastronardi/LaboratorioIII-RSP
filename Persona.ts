namespace Personas {
    
    export interface Persona{
        id:number;
        nombre:string;
        apellido:string;
    }

    export enum eSexo{
        Masculino = 'Masculino',
        Femenino = 'Femenino'
    }
}