using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Ezpeleta2023.Data;
using Ezpeleta2023.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Ezpeleta2023.Controllers;

[Authorize]
public class ServiciosController : Controller
{
     
    
    private readonly ILogger<ServiciosController> _logger;
    private Ezpeleta2023DbContext _contexto;

    public ServiciosController(ILogger<ServiciosController> logger, Ezpeleta2023DbContext contexto)
    {
        _logger = logger;
        _contexto = contexto;
    }

    public IActionResult Index()
    {
        var Subcategoria = _contexto.SubCategorias.Where(p => p.Eliminado == false).ToList();
        ViewBag.SubCategoriaID = new SelectList(Subcategoria.OrderBy(p => p.Descripcion), "SubCategoriaID", "Descripcion");

        return View();
    }

    public JsonResult BuscarServicios(int ServicioID = 0, bool Deshabilitar = false)
    {
        List<VistaServicio> servicioMostrar = new List<VistaServicio>();

        var Servicio = _contexto.Servicio.Include(s => s.SubCategoria).Include(s => s.SubCategoria.Categoria).ToList();
        if (ServicioID > 0)
        {
            Servicio = Servicio.Where(s => s.ServicioID == ServicioID).OrderBy(s => s.Descripcion).ToList();
        }
        foreach (var servicio in Servicio)
        {
            var ServicioMostrar = new VistaServicio
            {
                ServicioID = servicio.ServicioID,
                Descripcion = servicio.Descripcion,
                Telefono = servicio.Telefono,
                Direccion = servicio.Direccion,
                Eliminado = servicio.Eliminado,
                SubCategoriaID = servicio.SubcategoriaID,
                SubcategoriaDescripcion = servicio.SubCategoria.Descripcion,
                CategoriaID = servicio.SubCategoria.Categoria.CategoriaID,
                CategoriaDescripcion = servicio.SubCategoria.Categoria.Descripcion,

            };
            servicioMostrar.Add(ServicioMostrar);
        }

        return Json(servicioMostrar);
    }

    public JsonResult GuardarServicios(int ServicioID, string descripcion, int SubCategoriaID, string Telefono, string Direccion)
    {
        bool resultado = false;

        if (!string.IsNullOrEmpty(descripcion))
        {
            //SI ES 0 QUIERE DECIR QUE ESTA CREANDO LA CATEGORIA
            if (ServicioID == 0)
            {
                //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION
                var serviciOriginal = _contexto.Servicio.Where(s => s.Descripcion == descripcion && s.SubcategoriaID == SubCategoriaID).FirstOrDefault();
                if (serviciOriginal == null)
                {
                    //DECLARAMOS EL OBJETO DANDO EL VALOR
                    var ServicioGuardar = new Servicio
                    {
                        Descripcion = descripcion,
                        SubcategoriaID = SubCategoriaID,
                        Telefono = Telefono,
                        Direccion = Direccion

                    };
                    _contexto.Add(ServicioGuardar);
                    _contexto.SaveChanges();
                    resultado = true;
                }
            }
            else
            {
                //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPPCION Y DISTINTO ID AL QUE ESTAMOS EDIANDO
                var serviciOriginal = _contexto.Servicio.Where(s => s.Descripcion == descripcion && s.SubcategoriaID == SubCategoriaID).FirstOrDefault();
                if (serviciOriginal == null)
                {
                    //CREAR VARIABLE QUE GUARDE EL OBJETO CON EL ID DESEADO
                    var ServicioEditar = _contexto.Servicio.Find(ServicioID);
                    if (ServicioEditar != null)
                    {

                        ServicioEditar.Descripcion = descripcion;
                        ServicioEditar.SubcategoriaID = SubCategoriaID;
                        ServicioEditar.Telefono = Telefono;
                        ServicioEditar.Direccion = Direccion;
                        _contexto.SaveChanges();
                        resultado = true;

                    }
                }
            }

        }

        return Json(resultado);
    }

    public JsonResult Deshabilitar(int ServicioID, int Eliminado, int SubCategoriaID)
    {
        
        int resultado = 0;

        var servi = _contexto.Servicio.Find(ServicioID);

        var subcategoriia = _contexto.SubCategorias.Where(s => s.SubCategoriaID == servi.SubcategoriaID).FirstOrDefault();
        if ( servi != null)
        {
            if (subcategoriia.Eliminado == false)
            {
                if (servi.Eliminado == false)
                {
                    servi.Eliminado = true;
                    _contexto.SaveChanges();
                } else {
                    var validarsub = (from a in _contexto.Servicio where a.SubcategoriaID == SubCategoriaID && a.Eliminado == false select a).Count();
                    if (validarsub == 0)
                    {
                        servi.Eliminado = false;
                        _contexto.SaveChanges();
                    }
                }
                resultado = 1;
            }
            
        }
        return Json(resultado);

    }




}