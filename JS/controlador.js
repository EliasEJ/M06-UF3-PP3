"use strict";

function init(){
    recuperar();
}

function recuperar(){
    $("#recuperar").on("click",function(){
        var input = document.createElement('input');
        input.type = 'file';
        //validar si es un archivos .json
        input.accept = '.json';
        input.onchange = e => { 
           var file = e.target.files[0]; 
           // Aquí puedes manejar el archivo seleccionado
           
        }
        input.click();
    });
}

$(init);