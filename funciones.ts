namespace Personas {
    var auxPersona: Array<Persona> = new Array<Persona>();
    var listaPersona: Array<Persona> = new Array<Persona>();
    var inputID: HTMLInputElement;
    var nombre: HTMLInputElement;
    var apellido: HTMLInputElement;
    var edad: HTMLInputElement;
    var sexo: HTMLInputElement;
    var colId: HTMLInputElement;
    var colNombre: HTMLInputElement;
    var colApellido: HTMLInputElement;
    var colEdad: HTMLInputElement;
    var filterSexo: HTMLInputElement;
    var avgage: HTMLInputElement;
    var thid: HTMLElement;
    var thnombre: HTMLElement;
    var thapellido: HTMLElement;
    var thedad: HTMLElement;
    var thsexo: HTMLElement;
    var bmt: any;

    window.addEventListener('load', () => {
        let btnAdd = (<HTMLInputElement>document.getElementById("btnAdd"));
        btnAdd.addEventListener('click', AgregarPersona);
        let btnDelete = (<HTMLInputElement>document.getElementById("btnDelete"));
        btnDelete.addEventListener('click', EliminarFila);
        let btnLimpiar = (<HTMLInputElement>document.getElementById("btnLimpiar"));
        btnLimpiar.addEventListener('click', resetearForm);
        let btnLimpiarTabla = (<HTMLInputElement>document.getElementById("btnLimpiarTabla"));
        btnLimpiarTabla.addEventListener('click', ClearGrid);
        let calcAGE = (<HTMLInputElement>document.getElementById("calcAGE"));
        calcAGE.addEventListener('click', calcPromedio);
        inputID = (<HTMLInputElement>document.getElementById("idPersona"));
        nombre = (<HTMLInputElement>document.getElementById("nombre"));
        apellido = (<HTMLInputElement>document.getElementById("apellido"));
        edad = (<HTMLInputElement>document.getElementById("edad"));
        sexo = (<HTMLInputElement>document.getElementById("sexo"));
        colId = (<HTMLInputElement>document.getElementById("colId"));
        colNombre = (<HTMLInputElement>document.getElementById("colNombre"));
        colApellido = (<HTMLInputElement>document.getElementById("colApellido"));
        colEdad = (<HTMLInputElement>document.getElementById("colEdad"));
        avgage = (<HTMLInputElement>document.getElementById("avgage"));
        thid = (<HTMLElement>document.getElementById("thid"));
        thnombre = (<HTMLElement>document.getElementById("thnombre"));
        thapellido = (<HTMLElement>document.getElementById("thapellido"));
        thedad = (<HTMLElement>document.getElementById("thedad"));
        thsexo = (<HTMLElement>document.getElementById("thsexo"));
        filterSexo = (<HTMLInputElement>document.getElementById("fiterSexo"));
        filterSexo.addEventListener('change', VerCol);

        for (let index = 0; index < 4; index++) {
            let o = document.createElement('option');
            if (index % 2 === 0) {
                o.text = eSexo.Masculino;
                o.value = eSexo.Masculino;
            } else {
                o.text = eSexo.Femenino;
                o.value = eSexo.Femenino;
            }
            index < 2 ? sexo.appendChild(o) : filterSexo.appendChild(o);
        }

        bmt = (<HTMLInputElement>document.getElementById('bodytable'));

        VerCol();
    })

    /*     export function openHideDiv() {
            let div: HTMLElement = (<HTMLElement>document.getElementById('formVehiculo'));
            div.hidden = !div.hidden;  
            resetearForm();
        } */

    export function AgregarPersona() {
        let id = listaPersona.length == 0 ? 1 : listaPersona.reduce((max, item) => {
            if (item.id > max) max = item.id; return max;
        }, 0) + 1;
        
        let cliente = new Cliente(id, nombre.value, apellido.value, parseInt(edad.value), sexo.value == eSexo.Masculino ? eSexo.Masculino : eSexo.Femenino);
        listaPersona.push(cliente);

        FillGrid();
        resetearForm();
    }

    export function calcPromedio() {
        avgage.value = (listaPersona.filter(item => {
            return filterSexo.value === eSexo.Masculino ?
                (<Cliente>item).sexo === eSexo.Masculino :
                (<Cliente>item).sexo === eSexo.Femenino;
        }).reduce((total: number, item: Persona) => {
            return total = total + (<Cliente>item).edad;
        }, 0) / listaPersona.filter(item => {
            return filterSexo.value === eSexo.Masculino ?
                (<Cliente>item).sexo === eSexo.Masculino :
                (<Cliente>item).sexo === eSexo.Femenino;
        }).length).toFixed(2).toString()
    }

    export function resetearForm() {
        inputID.value = '';
        nombre.value = '';
        apellido.value = '';
        edad.value = '';
    }

    /*     export function VerProp() {
            divcantidadPuertas.style.display = (!(tipo.value == eSexo.Masculino)) ? 'none' : 'flex';
            divcuatroXcuatro.style.display = (!(tipo.value == eTipo.Camioneta)) ? 'none' : 'flex';
        } */

    export function VerCol() {
        thid.hidden = !colId.checked;
        thnombre.hidden = !colNombre.checked;
        thapellido.hidden = !colApellido.checked;
        thedad.hidden = !colEdad.checked;
        FillGrid();
    }

    export function FillGrid() {
        try {

            //borrar filas
            while (bmt.hasChildNodes()) {
                bmt.removeChild(bmt.childNodes[0]);
            }

            auxPersona = listaPersona.filter(item => {
                return filterSexo.value === eSexo.Masculino ?
                    (<Cliente>item).sexo === eSexo.Masculino :
                    (<Cliente>item).sexo === eSexo.Femenino;
            });

            auxPersona.map((element: Persona, i: number) => {
                let tr = document.createElement('tr');
                for (let index = 0; index <= 4; index++) {
                    let td = document.createElement('td');
                    let tn = document.createTextNode('');
                    switch (index) {
                        case 0:
                            tn = document.createTextNode(element.id.toString());
                            td.hidden = !(<HTMLInputElement>colId).checked;
                            break;
                        case 1:
                            tn = document.createTextNode((<Persona>element).nombre);
                            td.hidden = !(<HTMLInputElement>colNombre).checked;
                            break;
                        case 2:
                            tn = document.createTextNode(element.apellido);
                            td.hidden = !(<HTMLInputElement>colApellido).checked;
                            break;
                        case 3:
                            tn = document.createTextNode((<Cliente>element).edad.toString());
                            td.hidden = !(<HTMLInputElement>colEdad).checked;
                            break;
                        case 4:
                            tn = document.createTextNode((<Cliente>element).sexo);

                           break;
                        default:
                            break;
                    }
                    td.appendChild(tn);
                    tr.appendChild(td);

                }
                tr.addEventListener('click', FillFields);
                if (i % 2 != 0) tr.setAttribute('class', 'filaImpar');
                bmt.appendChild(tr);
            });
            auxPersona = [];

        } catch (error) {
            console.log(error);
        }
    }

    export function EliminarFila(e: any) {
        let id = parseInt(inputID.value);
        listaPersona = listaPersona.filter(item => { return item.id !== id });
        FillGrid();
        resetearForm();
    }

    export function FillFields(e: any) {
        //console.log(e)
        let iId = e.target.parentElement.childNodes[0].innerHTML;
        let iNombre = e.target.parentElement.childNodes[1].innerHTML;
        let iApellido = e.target.parentElement.childNodes[2].innerHTML;
        let iEdad = e.target.parentElement.childNodes[3].innerHTML;
        let iSexo = e.target.parentElement.childNodes[4].innerHTML;

        inputID.value = iId;
        nombre.value = iNombre;
        apellido.value = iApellido;
        edad.value = iEdad;
        sexo.value = iSexo;

    }

    export function ClearGrid(){
        while (bmt.hasChildNodes()) {
            bmt.removeChild(bmt.childNodes[0]);
        }
        //Matias, no se si tambien querias limpiar la lista, por las dudas, lo puse
        listaPersona = [];
    }

}


