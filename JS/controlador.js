"use strict";

function init() {
    recuperar();
}

function recuperar() {
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
                let obj = JSON.parse(event.target.result);
                let output = '';
                // Iterar sobre los datos del objeto
                for (let key in obj) {
                    // Ignorar la propiedad 'articles'
                    if (key !== 'articles') {
                        output += `<tr><td>${key}</td><td>${obj[key]}</td></tr>`;
                    }
                }
                // Agregar los datos al tbody
                $('#taula').html(output);
            };
            reader.readAsText(file);
        }
        input.click();
    });
}

$(init);