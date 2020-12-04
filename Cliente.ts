namespace Personas{
    export class Cliente implements Persona{
        id:number;
        nombre:string;
        apellido:string;
        edad:number;
        sexo:eSexo;

        constructor(id:number, nombre:string, apellido:string, edad:number, sexo:eSexo){
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            this.sexo = sexo;
        }
    }
}