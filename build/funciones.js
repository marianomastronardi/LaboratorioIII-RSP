"use strict";
var Personas;
(function (Personas) {
    var auxPersona = new Array();
    var listaPersona = new Array();
    var inputID;
    var nombre;
    var apellido;
    var edad;
    var sexo;
    var colId;
    var colNombre;
    var colApellido;
    var colEdad;
    var filterSexo;
    var avgage;
    var thid;
    var thnombre;
    var thapellido;
    var thedad;
    var thsexo;
    var bmt;
    window.addEventListener('load', function () {
        var btnAdd = document.getElementById("btnAdd");
        btnAdd.addEventListener('click', AgregarPersona);
        var btnDelete = document.getElementById("btnDelete");
        btnDelete.addEventListener('click', EliminarFila);
        var btnLimpiar = document.getElementById("btnLimpiar");
        btnLimpiar.addEventListener('click', resetearForm);
        var btnLimpiarTabla = document.getElementById("btnLimpiarTabla");
        btnLimpiarTabla.addEventListener('click', ClearGrid);
        var calcAGE = document.getElementById("calcAGE");
        calcAGE.addEventListener('click', calcPromedio);
        inputID = document.getElementById("idPersona");
        nombre = document.getElementById("nombre");
        apellido = document.getElementById("apellido");
        edad = document.getElementById("edad");
        sexo = document.getElementById("sexo");
        colId = document.getElementById("colId");
        colNombre = document.getElementById("colNombre");
        colApellido = document.getElementById("colApellido");
        colEdad = document.getElementById("colEdad");
        avgage = document.getElementById("avgage");
        thid = document.getElementById("thid");
        thnombre = document.getElementById("thnombre");
        thapellido = document.getElementById("thapellido");
        thedad = document.getElementById("thedad");
        thsexo = document.getElementById("thsexo");
        filterSexo = document.getElementById("fiterSexo");
        filterSexo.addEventListener('change', VerCol);
        for (var index = 0; index < 4; index++) {
            var o = document.createElement('option');
            if (index % 2 === 0) {
                o.text = Personas.eSexo.Masculino;
                o.value = Personas.eSexo.Masculino;
            }
            else {
                o.text = Personas.eSexo.Femenino;
                o.value = Personas.eSexo.Femenino;
            }
            index < 2 ? sexo.appendChild(o) : filterSexo.appendChild(o);
        }
        bmt = document.getElementById('bodytable');
        VerCol();
    });
    /*     export function openHideDiv() {
            let div: HTMLElement = (<HTMLElement>document.getElementById('formVehiculo'));
            div.hidden = !div.hidden;
            resetearForm();
        } */
    function AgregarPersona() {
        var id = listaPersona.length == 0 ? 1 : listaPersona.reduce(function (max, item) {
            if (item.id > max)
                max = item.id;
            return max;
        }, 0) + 1;
        var cliente = new Personas.Cliente(id, nombre.value, apellido.value, parseInt(edad.value), sexo.value == Personas.eSexo.Masculino ? Personas.eSexo.Masculino : Personas.eSexo.Femenino);
        listaPersona.push(cliente);
        FillGrid();
        resetearForm();
    }
    Personas.AgregarPersona = AgregarPersona;
    function calcPromedio() {
        avgage.value = (listaPersona.filter(function (item) {
            return filterSexo.value === Personas.eSexo.Masculino ?
                item.sexo === Personas.eSexo.Masculino :
                item.sexo === Personas.eSexo.Femenino;
        }).reduce(function (total, item) {
            return total = total + item.edad;
        }, 0) / listaPersona.filter(function (item) {
            return filterSexo.value === Personas.eSexo.Masculino ?
                item.sexo === Personas.eSexo.Masculino :
                item.sexo === Personas.eSexo.Femenino;
        }).length).toFixed(2).toString();
    }
    Personas.calcPromedio = calcPromedio;
    function resetearForm() {
        inputID.value = '';
        nombre.value = '';
        apellido.value = '';
        edad.value = '';
    }
    Personas.resetearForm = resetearForm;
    /*     export function VerProp() {
            divcantidadPuertas.style.display = (!(tipo.value == eSexo.Masculino)) ? 'none' : 'flex';
            divcuatroXcuatro.style.display = (!(tipo.value == eTipo.Camioneta)) ? 'none' : 'flex';
        } */
    function VerCol() {
        thid.hidden = !colId.checked;
        thnombre.hidden = !colNombre.checked;
        thapellido.hidden = !colApellido.checked;
        thedad.hidden = !colEdad.checked;
        FillGrid();
    }
    Personas.VerCol = VerCol;
    function FillGrid() {
        try {
            //borrar filas
            while (bmt.hasChildNodes()) {
                bmt.removeChild(bmt.childNodes[0]);
            }
            auxPersona = listaPersona.filter(function (item) {
                return filterSexo.value === Personas.eSexo.Masculino ?
                    item.sexo === Personas.eSexo.Masculino :
                    item.sexo === Personas.eSexo.Femenino;
            });
            auxPersona.map(function (element, i) {
                var tr = document.createElement('tr');
                for (var index = 0; index <= 4; index++) {
                    var td = document.createElement('td');
                    var tn = document.createTextNode('');
                    switch (index) {
                        case 0:
                            tn = document.createTextNode(element.id.toString());
                            td.hidden = !colId.checked;
                            break;
                        case 1:
                            tn = document.createTextNode(element.nombre);
                            td.hidden = !colNombre.checked;
                            break;
                        case 2:
                            tn = document.createTextNode(element.apellido);
                            td.hidden = !colApellido.checked;
                            break;
                        case 3:
                            tn = document.createTextNode(element.edad.toString());
                            td.hidden = !colEdad.checked;
                            break;
                        case 4:
                            tn = document.createTextNode(element.sexo);
                            break;
                        default:
                            break;
                    }
                    td.appendChild(tn);
                    tr.appendChild(td);
                }
                tr.addEventListener('click', FillFields);
                if (i % 2 != 0)
                    tr.setAttribute('class', 'filaImpar');
                bmt.appendChild(tr);
            });
            auxPersona = [];
        }
        catch (error) {
            console.log(error);
        }
    }
    Personas.FillGrid = FillGrid;
    function EliminarFila(e) {
        var id = parseInt(inputID.value);
        listaPersona = listaPersona.filter(function (item) { return item.id !== id; });
        FillGrid();
        resetearForm();
    }
    Personas.EliminarFila = EliminarFila;
    function FillFields(e) {
        //console.log(e)
        var iId = e.target.parentElement.childNodes[0].innerHTML;
        var iNombre = e.target.parentElement.childNodes[1].innerHTML;
        var iApellido = e.target.parentElement.childNodes[2].innerHTML;
        var iEdad = e.target.parentElement.childNodes[3].innerHTML;
        var iSexo = e.target.parentElement.childNodes[4].innerHTML;
        inputID.value = iId;
        nombre.value = iNombre;
        apellido.value = iApellido;
        edad.value = iEdad;
        sexo.value = iSexo;
    }
    Personas.FillFields = FillFields;
    function ClearGrid() {
        while (bmt.hasChildNodes()) {
            bmt.removeChild(bmt.childNodes[0]);
        }
        //Matias, no se si tambien querias limpiar la lista, por las dudas, lo puse
        listaPersona = [];
    }
    Personas.ClearGrid = ClearGrid;
})(Personas || (Personas = {}));
