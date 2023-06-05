window.onload = BuscarServicios();

function BuscarServicios() {
    $("#tbody-servicios").empty();
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

            console.log(servicios);
            $("#tbody-servicios").empty();
            $.each(servicios, function (index, servicios) {
                console.log(servicios)

                let ServicioDeshabilitar = '';
                let boton = '<button type="button" onclick="BuscarServicio(' + servicios.servicioID + ')" class="btn btn-primary btn-sm" style="margin-right:5px">Editar Servicio</button>' +
                    '<button type="button" onclick="Deshabilitar(' + servicios.servicioID + ',1)" class="btn btn-danger btn-sm">Deshabilitar</button>';

                if (servicios.eliminado) {
                    ServicioDeshabilitar  = 'tablaroja';
                    boton = '<button type="button" onclick="Deshabilitar(' + servicios.servicioID + ',0)" class="btn btn-success btn-sm">Activar Servicio</button>';
                }

                $("#tbody-servicios").append('<tr class=' + ServicioDeshabilitar  + '>' +
                    '<td>' + servicios.descripcion + '</td>' +
                    '<td>' + servicios.subcategoriaDescripcion + '</td>' +
                    '<td>' + servicios.telefono + '</td>' +
                    '<td>' + servicios.direccion + '</td>' +
                    '<td>' + servicios.categoriaDescripcion + '</td>' +
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
    $("#Direccion").val('');
    $("#Telefono").val('');
    

}

function BuscarServicio(ServicioID) {
    // $("#SubCategoriaID").val(SubCategoriaID);
   
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
                $("#ServicioID").val(Servicio12.servicioID);
                $("#Descripcion").val(Servicio12.descripcion);
                $("#SubCategoriaID").val(Servicio12.servicioID);
                $("#CategoriaID").val(Servicio12.categoriaID);
                $("#Telefono").val(Servicio12.telefono);
                $("#Direccion").val(Servicio12.direccion);
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
    console.log(ServicioID)
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
                Swal.fire({
                    icon: 'error',
                    title: 'existe un servicio con la misma descripción',
                    timer: 3000,
                    timerProgressBar: true,
    
                })
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
                
                BuscarServicios();
            }
             else {
                Swal.fire({
                    icon: 'error',
                    title: 'No se puede activar ya que esta deshabilitada la subcategoría',
                    timer: 3000,
                    timerProgressBar: true,
    
                })
             }
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            alert('Disculpe, existió un problema para deshabilitar');
        }
    });
}