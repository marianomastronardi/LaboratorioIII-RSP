"use strict";
var Personas;
(function (Personas) {
    var Cliente = /** @class */ (function () {
        function Cliente(id, nombre, apellido, edad, sexo) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            this.sexo = sexo;
        }
        return Cliente;
    }());
    Personas.Cliente = Cliente;
})(Personas || (Personas = {}));
