"use strict";
let dialog = document.getElementById("novaFactura");
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
                for (let f in factures){
                    for (let i in factures[f]){
                        let factura = factures[f][i];
                        let fila = `
                            <tr>
                                <td>${factura.id}</td>
                                <td>${factura.data}</td>
                                <td>${factura.nif}</td>
                                <td>${factura.nom_client}</td>
                                <td>${factura.telefon}</td>
                                <td>${factura.email}</td>
                                <td>${factura.subtotal}</td>
                                <td>${factura.dte}</td>
                                <td>${factura.baseI}</td>
                                <td>${factura.iva}</td>
                                <td>${factura.total}</td>
                                <td>${factura.pagada}</td>
                                <td>
                                <img src="IMG/eliminar.png" onclick="eliminarFactura(${factura.id})" alt="Eliminar">
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
function obrirNovaFactura(){
    $("#btnNovaFactura").on("click",function(){
        dialog.showModal();
        verificacions();
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
}

$("#guardarFactura").on("click",function(){

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