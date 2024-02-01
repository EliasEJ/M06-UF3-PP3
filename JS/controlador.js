"use strict";

function init(){

}

function recuperar(){
    $("#recuperar").on("click",function(){
        var input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => { 
           var file = e.target.files[0]; 
           // Aquí puedes manejar el archivo seleccionado
        }
        input.click();
    });
}