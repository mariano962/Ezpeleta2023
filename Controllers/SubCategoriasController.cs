using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Ezpeleta2023.Data;
using Ezpeleta2023.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace Ezpeleta2023.Controllers;

public class SubCategoriasController : Controller
{
   private readonly ILogger<SubCategoriasController> _logger;
    private Ezpeleta2023DbContext _contexto;

    public SubCategoriasController(ILogger<SubCategoriasController> logger, Ezpeleta2023DbContext contexto)
    {
        _logger = logger;
        _contexto = contexto;
    }

    public IActionResult Index()
    {
        var categoria = _contexto.Categorias.Where(p => p.Eliminado == false).ToList();
        ViewBag.CategoriaID = new SelectList(categoria.OrderBy(p => p.Descripcion), "CategoriaID", "Descripcion");

        return View();
    }

     public JsonResult BuscarSubCategorias(int SubCategoriaID = 0 , bool Deshabilitar = false)
    {
        List<VistaSubCategoria> subCategoriasMostrar = new List<VistaSubCategoria>();

        var Subcategorias = _contexto.SubCategorias.Include(s => s.Categoria).ToList();

        if (SubCategoriaID > 0)
        {
            Subcategorias = Subcategorias.Where(s => s.SubCategoriaID == SubCategoriaID).OrderBy(s => s.Descripcion).ToList();
        }
        foreach (var subCategoria in Subcategorias)
        {
            var SubcategoriaMostrar = new VistaSubCategoria 
            {
               
                Descripcion = subCategoria.Descripcion,
                SubCategoriaID = subCategoria.SubCategoriaID,
                CategoriaID = subCategoria.CategoriaID,
                CategoriaDescripcion = subCategoria.Categoria.Descripcion,
                Eliminado = subCategoria.Eliminado
                
            };
            subCategoriasMostrar.Add(SubcategoriaMostrar);
        }

        // if (Deshabilitar = true)
        // {
        //     if (Subcategorias[0].Eliminado == true)
        //     {
        //         Subcategorias[0].Eliminado = false;
        //     }
        //     else
        //     {
        //         Subcategorias[0].Eliminado = true;
        //     }
        // }
        // _contexto.SaveChanges();

        return Json(subCategoriasMostrar);
    }

    public JsonResult GuardarSubCategoria(int SubCategoriaID, string descripcion, int CategoriaID)
    {
        bool resultado = false;

        if (!string.IsNullOrEmpty(descripcion))
        {


            //SI ES 0 QUIERE DECIR QUE ESTA CREANDO LA CATEGORIA
            if (SubCategoriaID == 0)
            {
                //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION
                var subcategoriaOriginal = _contexto.SubCategorias.Where(s => s.Descripcion == descripcion && s.CategoriaID == CategoriaID).FirstOrDefault();
                if (subcategoriaOriginal == null)
                {
                    //DECLAMOS EL OBJETO DANDO EL VALOR
                    var SubcategoriaGuardar = new SubCategoria
                    {
                        Descripcion = descripcion,
                        CategoriaID = CategoriaID
                    };
                    _contexto.Add(SubcategoriaGuardar);
                    _contexto.SaveChanges();
                    resultado = true;

                }


            }
            else
            {
                //BUSCAMOS EN LA TABLA SI EXISTE UNA CON LA MISMA DESCRIPCION Y DISTINTO ID DE REGISTRO AL QUE ESTAMOS EDITANDO
                var SubcategoriaOriginal = _contexto.SubCategorias.Where(s => s.Descripcion == descripcion && s.CategoriaID != SubCategoriaID).FirstOrDefault();
                if (SubcategoriaOriginal == null)
                {
                    //crear variable que guarde el objeto segun el id deseado
                    var SubcategoriaEditar = _contexto.SubCategorias.Find(SubCategoriaID);
                    if (SubcategoriaEditar != null)
                    {
                        SubcategoriaEditar.Descripcion = descripcion;
                        SubcategoriaEditar.CategoriaID = CategoriaID;
                        _contexto.SaveChanges();
                        resultado = true;
                    }
                }


            }
        }

        return Json(resultado);
    }

    public JsonResult Deshabilitar (int SubCategoriaID, int Eliminado)
    {
        int resultado = 0;

        var subCategoria = _contexto.SubCategorias.Find(SubCategoriaID);
        if (subCategoria != null)
        {
            if (subCategoria.Eliminado == false)
            {
            subCategoria.Eliminado = true;
            _contexto.SaveChanges();             
            }
       
        else {
            subCategoria.Eliminado = false;
            _contexto.SaveChanges();
        }
            resultado = 1;
        }
        return Json(resultado);

    }
}