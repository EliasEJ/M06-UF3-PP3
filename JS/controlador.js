//----------------------------------------//
// Autors: Angel Tarensi i Elyass Jerari  // 
//----------------------------------------//

"use strict";

// Definició de variables per manipular els diàlegs de la interfície i definir l'estil de la moneda.
let dialog = document.getElementById("novaFactura");
let dialogEditar = document.getElementById("editarFactura");
let dialogVer = document.getElementById("articlesFactura");
let style = {style: "currency", currency: "EUR"};
let numFactura;

// Funció d'inicialització que s'executarà quan la pàgina es carregui.
function init() {
    recuperar();
    obrirNovaFactura();
    tancarFactura();
}


// Variables globals per emmagatzemar les dades de les factures.
let adreca;
let poblacio;
let articles = [];
let dte;
let iva;


// Funció per recuperar factures des d'un fitxer JSON.
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

                        adreca = factura.adreca;
                        poblacio = factura.poblacio;
                        articles = factura.articles;
                        dte = factura.dte;
                        iva = factura.iva;
                        

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
                                <td>${factura.pagada ? "Si" : "No"}</td>
                                <td>
                                <img src="IMG/eliminar.png" onclick="eliminarFactura('fila-${factura.id}')" alt="Eliminar">
                                <img src="IMG/imprimir.png" onclick="imprimirFactura(${factura.id}, ${factura.pagada})" alt="Imprimir">
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


// Funció per eliminar una fila de la taula de factures.
function eliminarFactura(idFila){
    console.log(idFila);
    let fila = document.getElementById(idFila);
    fila.remove();

}

// Funció per editar les dades d'una factura existent.
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
    if (datos[11].textContent == "Si") {
        $("#pagadaFactura").prop("checked", true);
    } else {
        $("#pagadaFactura").prop("checked", false);
    }

    // Guardar los datos de la factura
    $("#guardarFacturaEditada").on("click", function(){
        //verificar que los campos esten completos
        if ($("#idFactura").val() != "" && $("#dataFactura").val() != "" && $("#emailFactura").val().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) && $("#nifFactura").val().match(/[0-9]{8}[A-Za-z]{1}/) && $("#nomClient").val().match(/[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+/) && $("#telefonFactura").val().match(/[0-9]{9}/) && $("#dteFactura").val().match(/[0-9]{2}/) && $("#ivaFactura").val().match(/[0-9]{2}/)) {
            // Modificar los datos de la fila
            datos[1].textContent = $("#dataFactura").val();
            datos[2].textContent = $("#nifFactura").val();
            datos[3].textContent = $("#nomClient").val();
            datos[4].textContent = $("#telefonFactura").val();
            datos[5].textContent = $("#emailFactura").val();
            datos[7].textContent = $("#dteFactura").val();
            datos[9].textContent = $("#ivaFactura").val();
            datos[11].textContent = $("#pagadaFactura").val() === "Si" ? "Si" : "No";
            // Cerrar el dialogo
            dialogEditar.close();
        }
    });
    
}


// Funció per imprimir la factura.
function imprimirFactura(idFactura, pagada){
    
    $("#numFacPrint").text(idFactura);
    $("#dataPrint").text($("#fila-" + idFactura + " td:nth-child(2)").text());
    $("#nifFacPrint").text($("#fila-" + idFactura + " td:nth-child(3)").text());
    $("#nomFacPrint").text($("#fila-" + idFactura + " td:nth-child(4)").text());
    $("#adrecaFacPrint").text(adreca);
    $("#poblacioFacPrint").text(poblacio);

    let total = 0;

    for (let i in articles){
        let article = articles[i];
        let subtotal = article.preu * article.quantitat;
        let fila = `
        <tr>
            <td class="border">${article.codi}</td>
            <td class="border">${article.descripcio}</td>
            <td class="border">${article.quantitat}</td>
            <td class="border">${article.preu.toLocaleString("es-ES", {style: 'currency', currency: 'EUR'})}</td>
            <td class="border">${subtotal.toLocaleString("es-ES", {style: 'currency', currency: 'EUR'})}</td>
        </tr>`;
        $("#taulaPrint").append(fila);

        total += subtotal;
    }
    $("#subtotalPrint").text(total.toLocaleString("es-ES", {style: 'currency', currency: 'EUR'}));

    $("#dtePrint").text(dte + "%");
    $("#importDtePrint").text((total * dte / 100).toLocaleString("es-ES", {style: 'currency', currency: 'EUR'}));
    $("#baseImposablePrint").text((total - (total * dte / 100)).toLocaleString("es-ES", {style: 'currency', currency: 'EUR'}));
    $("#ivaPrint").text(iva + "%");
    $("#importIvaPrint").text(((total - (total * dte / 100)) * iva / 100).toLocaleString("es-ES", {style: 'currency', currency: 'EUR'}));
    $("#totalFacturaPrint").text((total - (total * dte / 100) + ((total - (total * dte / 100)) * iva / 100)).toLocaleString("es-ES", {style: 'currency', currency: 'EUR'}));
    
    if (pagada === true) {
        $("#marcaAgua").show();
        window.print();

    } else {
        $("#marcaAgua").hide();
        window.print();

    }

    $("#marcaAgua").hide();

}

// Funció per veure els articles d'una factura. Mostra un diàleg amb les dades.
function verArticulos(idFactura){

    dialogVer.showModal();

    for (let i in articles){
        let article = articles[i];
        let fila = `
        <tr>
            <td class="border">${article.codi}</td>
            <td class="border">${article.descripcio}</td>
            <td class="border">${article.quantitat}</td>
            <td class="border">${article.preu.toLocaleString("es-ES", {style: 'currency', currency: 'EUR'})}</td>
            <td class="border">${(article.preu * article.quantitat).toLocaleString("es-ES", {style: 'currency', currency: 'EUR'})}</td>
        </tr>`;
        $("#subtotalArticles").text((article.preu * article.quantitat).toLocaleString("es-ES", {style: 'currency', currency: 'EUR'}));

        $("#taulaArticles").append(fila);
    }
}

// Funció per obrir un diàleg per a la creació d'una nova factura.
function obrirNovaFactura(){
    $("#btnNovaFactura").on("click",function(){
        if($("#taula tr:last-child td:first-child").text() == ""){
            numFactura = 1;
        }else {
            numFactura = parseInt($("#taula tr:last-child td:first-child").text()) + 1;
        }
        $("#numFactura").val(numFactura);
        $("#data").val("");
        $("#nif").val("");
        $("#nom").val("");
        $("#telefon").val("");
        $("#email").val("");
        $("#dte").val("");
        $("#iva").val("");
        $("#pagada").val("");
        dialog.showModal();
    });
}


// Funció per tancar els diàlegs de factura.
function tancarFactura(){
    $("#tancar").on("click",function(){
        dialog.close();
    });
    $("#tancar2").on("click",function(){
        dialogEditar.close();
    });
}

// Acció per a guardar una nova factura.
$("#guardarFactura").on("click", function(){
    event.preventDefault();
    //verificar que los campos esten completos
    if ($("#numFactura").val() != "" && $("#data").val() != "" && $("#email").val().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) && $("#nif").val().match(/[0-9]{8}[A-Za-z]{1}/) && $("#nom").val().match(/[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+/) && $("#telefon").val().match(/[0-9]{9}/) && $("#dte").val().match(/[0-9]{2}/) && $("#iva").val().match(/[0-9]{2}/)) {
        //Imprimir factura en la tabla de facturas
        let fila = `
        <tr id="fila-${$("#numFactura").val(numFactura)}">
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

// Funció per guardar totes les factures en un fitxer JSON.
$("#guardar").on("click", function(){
    var facturas = [];
    var tabla = document.getElementById('taula');
    var filas = tabla.getElementsByTagName('tr');

    // Empezamos desde 1 para evitar la fila de encabezados
    for (var i = 1; i < filas.length; i++) {
        var fila = filas[i];
        var celdas = fila.getElementsByTagName('td');

        var factura = {
            "id": celdas[0].innerText,
            "data": celdas[1].innerText,
            "nif": celdas[2].innerText,
            "nom_client": celdas[3].innerText,
            "telefon": celdas[4].innerText,
            "adreca": "",
            "postal": "",
            "email": celdas[5].innerText,
            "subtotal": parseFloat(celdas[6].innerText),
            "dte": parseFloat(celdas[7].innerText),
            "baseI": parseFloat(celdas[8].innerText),
            "iva": parseFloat(celdas[9].innerText),
            "total": parseFloat(celdas[10].innerText),
            "pagada": celdas[11].innerText === "Sí" ? true : false,
            "articles": [] // Los artículos se pueden agregar posteriormente si se tienen en la tabla
        };

        facturas.push(factura);
    }

    // Objeto JSON que contiene las facturas
    var datosJSON = {
        "factures": facturas
    };

    // Convertir el objeto JSON a una cadena
    var datosJSONCadena = JSON.stringify(datosJSON, null, 2);

    // Crear un enlace de descarga para el archivo JSON
    var enlaceDescarga = document.createElement('a');
    enlaceDescarga.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(datosJSONCadena));
    enlaceDescarga.setAttribute('download', 'facturas.json');
    enlaceDescarga.style.display = 'none';
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();
    document.body.removeChild(enlaceDescarga);
});


$(document).ready(init);