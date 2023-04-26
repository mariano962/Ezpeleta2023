window.onload = BuscarSubCategorias();

function BuscarSubCategorias() {
    $("#tbody-Subcategorias").empty();
    $.ajax({
        // la URL para la petición
        url: '../../SubCategorias/BuscarSubCategorias',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: {},
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (subCategorias) {

            $("#tbody-subcategorias").empty();
            $.each(subCategorias, function (index, subCategoria) {

                let SubcatDeshabilitar = '';
                let boton = '<button type="button" onclick="BuscarSubCategoria(' + subCategoria.subCategoriaID + ')" class="btn btn-primary btn-sm" style="margin-right:5px">Editar SubCategoria</button>' +
                    '<button type="button" onclick="Deshabilitar(' + subCategoria.subCategoriaID + ',1)" class="btn btn-danger btn-sm">Deshabilitar</button>';

                if (subCategoria.eliminado) {
                    SubcatDeshabilitar  = 'table-danger';
                    boton = '<button type="button" onclick="Deshabilitar(' + subCategoria.subCategoriaID + ',0)" class="btn btn-warning btn-sm">Activar Sub Categoria</button>';
                }

                $("#tbody-subcategorias").append('<tr class=' + SubcatDeshabilitar  + '>' +
                    '<td>' + subCategoria.descripcion + '</td>' +
                    '<td>' + subCategoria.categoriaDescripcion + '</td>' +
                    '<td class="text-center">' +
                    boton +
                    '</td>' +
                    '</tr>'
                    );
            });


        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Error al cargar Sub categorias');
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function VaciarFormulario() {
    $("#Descripcion").val('');
    $("#SubCategoriaID").val(0);
}

function BuscarSubCategoria(SubCategoriaID) {
    // $("#SubCategoriaID").val(SubCategoriaID);
    $.ajax({
        
        // la URL para la petición
        url: '../../SubCategorias/BuscarSubCategorias',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { SubCategoriaID: SubCategoriaID },
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (SubCategorias) {

            if (SubCategorias.length == 1) {
                let SubCategoria = SubCategorias[0];
                $("#Descripcion").val(SubCategoria.descripcion);
                $("#SubCategoriaID").val(SubCategoria.SubCategoriaID);
                $("#CategoriaID").val(SubCategoria.CategoriaID);
                $("#ModalSubCategoria").modal("show");
            }
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Error al cargar categorias');
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function GuardarSubCategoria() {
    //JAVASCRIPT
    let descripcion1 = document.getElementById("Descripcion").value;
    // let descripcion2 = $("#Descripcion").val();
    let SubCategoriaID = $("#SubCategoriaID").val(); 
    console.log(SubCategoriaID)
    let CategoriaID = $("#CategoriaID").val();
    $.ajax({
        // la URL para la petición
        url: '../../SubCategorias/GuardarSubCategoria',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { SubCategoriaID: SubCategoriaID,CategoriaID: CategoriaID ,descripcion: descripcion1 },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {

            if (resultado) {
                $("#ModalSubCategoria").modal("hide");
                BuscarSubCategorias();
            }
            else {
                alert("Existe una Categoría con la misma descripción.");
            }
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Disculpe, existió un problema al guardar');
        }
    });
}

function Deshabilitar(subcategoriaID,eliminado) {
   
    //JAVASCRIPT
    //  let descripcion1 = document.getElementById("Descripcion").value;
    //  let descripcion2 = $("#Descripcion").val();
    //   let categoriaID = $("#CategoriaID").val();
    //   let eliminado = $("Eliminado").val();
    
    $.ajax({
        // la URL para la petición
        url: '../../SubCategorias/Deshabilitar',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { SubCategoriaID: subcategoriaID,Eliminado: eliminado},
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {

            if (resultado) {
                
               
                BuscarSubCategorias();
            }
            // else {
            //     alert("No se puede eliminar.");
            // }
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Disculpe, existió un problema para deshabilitar');
        }
    });
}