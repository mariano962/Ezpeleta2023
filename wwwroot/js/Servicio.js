window.onload = BuscarServicios();

function BuscarServicios() {
    $("#tbody-Servicios").empty();
    $.ajax({
        // la URL para la petición
        url: '../../Servicios/BuscarServicios',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: {},
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (servicios) {

            $("#tbody-servicios").empty();
            $.each(servicios, function (index, servicios) {

                let ServicioDeshabilitar = '';
                let boton = '<button type="button" onclick="BuscarServicio(' + servicios.servicioID + ')" class="btn btn-primary btn-sm" style="margin-right:5px">Editar Servicio</button>' +
                    '<button type="button" onclick="Deshabilitar(' + servicios.servicioID + ',1)" class="btn btn-danger btn-sm">Deshabilitar</button>';

                if (servicios.eliminado) {
                    ServicioDeshabilitar  = 'table-danger';
                    boton = '<button type="button" onclick="Deshabilitar(' + servicios.servicioID + ',0)" class="btn btn-warning btn-sm">Activar Servicio</button>';
                }

                $("#tbody-servicio").append('<tr class=' + ServicioDeshabilitar  + '>' +
                    '<td>' + servicios.descripcion + '</td>' +
                    '<td>' + servicios.SubCategoriaID + '</td>' +
                    '<td>' + servicios.Telefono + '</td>' +
                    '<td>' + servicios.Direccion + '</td>' +
                    '<td class="text-center">' + boton +'</td>' +
                    '</tr>'
                    );
            });


        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Error al cargar Servicio');
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function VaciarFormulario() {
    $("#Descripcion").val('');
    $("#ServicioID").val(0);
}

function BuscarServicio(ServicioID) {
    // $("#SubCategoriaID").val(SubCategoriaID);
    debugger
    $.ajax({
        
        // la URL para la petición
        url: '../../Servicios/BuscarServicios',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { ServicioID: ServicioID },
        // especifica si será una petición POST o GET
        type: 'GET',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (Servicio) {

            if (Servicio.length == 1) {
                let Servicio12 = Servicio[0];
                $("#Descripcion").val(Servicio12.descripcion);
                $("#SubCategoriaID").val(Servicio12.servicioID);
                $("#Telefono").val(Servicio12.Telefono);
                $("#Direccion").val(Servicio12.Direccion);
                // $("#CategoriaID").val(SubCategoria.CategoriaID);
                $("#ModalServicios").modal("show");
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

function GuardarServicio() {
    //JAVASCRIPT
    let descripcion1 = document.getElementById("Descripcion").value;
    // let descripcion2 = $("#Descripcion").val();
    let ServicioID = $("#ServicioID").val(); 
    let SubcategoriaID = $("#SubcategoriaID").val();
    let Telefono = $("#Telefono").val(); 
    let Direccion = $("#Direccion").val();
    
    $.ajax({
        // la URL para la petición
        url: '../../Servicios/GuardarServicios',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { ServicioID: ServicioID, SubCategoriaID: SubcategoriaID , descripcion: descripcion1, Telefono: Telefono, Direccion: Direccion },
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {

            if (resultado) {
                $("#ModalServicios").modal("hide");
                BuscarServicios();
            }
            else {
                alert("Existe un Servicio con la misma descripción.");
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

function Deshabilitar(servicioID,eliminado) {
   
    //JAVASCRIPT
    //  let descripcion1 = document.getElementById("Descripcion").value;
    //  let descripcion2 = $("#Descripcion").val();
    //   let categoriaID = $("#CategoriaID").val();
    //   let eliminado = $("Eliminado").val();
    
    $.ajax({
        // la URL para la petición
        url: '../../Servicios/Deshabilitar',
        // la información a enviar
        // (también es posible utilizar una cadena de datos)
        data: { ServicioID: servicioID,Eliminado: eliminado},
        // especifica si será una petición POST o GET
        type: 'POST',
        // el tipo de información que se espera de respuesta
        dataType: 'json',
        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (resultado) {

            if (resultado) {
                
               
                BuscarServicio();
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