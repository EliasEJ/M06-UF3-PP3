"use strict";

let dialog = document.getElementById("novaFactura");
let dialogEditar = document.getElementById("editarFactura");
let style = {style: "currency", currency: "EUR"};

let numFactura = $("#numFactura").val() !== "" ? $("#numFactura").val() : 0;

function init() {
    recuperar();
    obrirNovaFactura();
    tancarFactura();
}

function recuperar() {
    $("#taula");
    $("#recuperar").on("click", function () {
        let input = document.createElement('input');
        input.type = 'file';
        //validar si es un archivos .json
        input.accept = '.json';
        input.onchange = e => {
            let file = e.target.files[0];
            // Aquí puedes manejar el archivo seleccionado
            let reader = new FileReader();
            reader.onload = function(event) {
                // Parsear el archivo JSON
                let factures = JSON.parse(event.target.result);
                //if(factures.pagada == true) ? "Si" : "No";
                for (let f in factures){
                    for (let i in factures[f]){
                        let factura = factures[f][i];
                        let fila = `
                            <tr id="fila-${factura.id}">
                                <td>${factura.id}</td>
                                <td>${factura.data}</td>
                                <td>${factura.nif}</td>
                                <td>${factura.nom_client}</td>
                                <td>${factura.telefon}</td>
                                <td>${factura.email}</td>
                                <td>${factura.subtotal.toLocaleString("es-ES", style)}</td>
                                <td>${factura.dte}</td>
                                <td>${factura.baseI.toLocaleString("es-ES", style)}</td>
                                <td>${factura.iva}</td>
                                <td>${factura.total.toLocaleString("es-ES", style)}</td>
                                <td>${factura.pagada}</td>
                                <td>
                                <img src="IMG/eliminar.png" onclick="eliminarFactura('fila-${factura.id}')" alt="Eliminar">
                                <img src="IMG/imprimir.png" onclick="imprimirFactura(${factura.id})" alt="Imprimir">
                                <img src="IMG/editar.png" onclick="editarFactura(${factura.id})" alt="Editar">
                                <img src="IMG/ver.png" onclick="verArticulos(${factura.id})" alt="Ver">
                                </td>
                            </tr>`;
                        $("#taula").append(fila);
                    }
                }
                
            };
            reader.readAsText(file);
        }
        input.click();
    });
}

function eliminarFactura(idFila){
    console.log(idFila);
    let fila = document.getElementById(idFila);
    fila.remove();

}

function editarFactura(idFactura){
    // Buscar la fila de la tabla con el id de la factura
    let fila = document.getElementById('fila-' + idFactura);
    // Obtener los datos de la fila
    let datos = fila.children;
    // Mostrar el dialogo
    dialogEditar.showModal();
    // Rellenar los campos del dialogo
    $("#idFactura").val(idFactura);
    $("#dataFactura").val(datos[1].textContent);
    $("#nifFactura").val(datos[2].textContent);
    $("#nomClient").val(datos[3].textContent);
    $("#telefonFactura").val(datos[4].textContent);
    $("#emailFactura").val(datos[5].textContent);
    $("#dteFactura").val(datos[7].textContent);
    $("#ivaFactura").val(datos[9].textContent);
    $("#pagadaFactura").val(datos[11].textContent);
    
}

function imprimirFactura(idFactura){
    $("#numFacPrint").text(idFactura);
    $("#dataPrint").text($("#fila-" + idFactura + " td:nth-child(2)").text());
    $("#nifFacPrint").text($("#fila-" + idFactura + " td:nth-child(3)").text());
    $("#nomFacPrint").text($("#fila-" + idFactura + " td:nth-child(4)").text());
    // TODO: Falta la dirección
    // $("#adrecaFacPrint").text($("#fila-" + idFactura + " td:nth-child(5)").text());

    window.print();
}

function obrirNovaFactura(){
    $("#btnNovaFactura").on("click",function(){
        dialog.showModal();
    });
}

function tancarFactura(){
    /*dialog.addEventListener("click", ev => {
        const x = ev.clientX;
        const y = ev.clientY;
        const rect = dialog.getBoundingClientRect();
    
        if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) dialog.close();
    });*/
    $("#tancar").on("click",function(){
        dialog.close();
    });
    $("#tancar2").on("click",function(){
        dialogEditar.close();
    });
}

$("#guardarFactura").on("click", function(){
    event.preventDefault();
    //verificar que los campos esten completos
    if ($("#numFactura").val() != "" && $("#data").val() != "" && $("#email").val().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) && $("#nif").val().match(/[0-9]{8}[A-Za-z]{1}/) && $("#nom").val().match(/[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+/) && $("#telefon").val().match(/[0-9]{9}/) && $("#dte").val().match(/[0-9]{2}/) && $("#iva").val().match(/[0-9]{2}/)) {
        //Imprimir factura en la tabla de facturas
        let fila = `
        <tr id="fila-${$("#numFactura").val()}">
            <td>${$("#numFactura").val()}</td>
            <td>${$("#data").val()}</td>
            <td>${$("#nif").val()}</td>
            <td>${$("#nom").val()}</td>
            <td>${$("#telefon").val()}</td>
            <td>${$("#email").val()}</td>
            <td>${""}</td>
            <td>${$("#dte").val()}</td>
            <td>${""}</td>
            <td>${$("#iva").val()}</td>
            <td>${""}</td>
            <td>${$("#pagada").is(":checked") ? "Si" : "No"}</td>
            <td>
            <img src="IMG/eliminar.png" onclick="eliminarFactura('fila-${$("#numFactura").val()}')" alt="Eliminar">
            <img src="IMG/imprimir.png" onclick="imprimirFactura(${$("#numFactura").val()})" alt="Imprimir">
            <img src="IMG/editar.png" onclick="editarFactura(${$("#numFactura").val()})" alt="Editar">
            <img src="IMG/ver.png" onclick="verArticulos(${$("#numFactura").val()})" alt="Ver">
            </td>
        </tr>`;
        $("#taula").append(fila);
        //Cerrar el dialogo
        dialog.close();
    }
});

function mostrarNumFactura(){
    $("#numFactura").val(_numFactura);
}

function sumarNumFactura(){
    _numFactura += 1;
}

function verificarNumFactura(){
    let num = $("#numFactura").val();
    if(num > $("#idTaula").val()){
        _numFactura = num;
        _numFactura += 1;
    }else {
        $("#numFactura").val(_numFactura);
    }
}


$(document).ready(init);