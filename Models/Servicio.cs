using System.ComponentModel.DataAnnotations;

namespace Ezpeleta2023.Models;

public class Servicio
{
    [Key]
    public int ServicioID { get; set; }

    public string? Descripcion { get; set; }

    public string? Telefono { get; set; }

    public string? Direccion { get; set; }

    public int SubcategoriaID { get; set; }

    public bool Eliminado { get; set; }
    
    public virtual SubCategoria? SubCategoria { get; set; }
}

public class VistaServicio
{
    public int ServicioID { get; set; }

    public int CategoriaID { get; set; }

    public string? CategoriaDescripcion { get; set; }

    public string? Descripcion { get; set; }
    public string? Telefono { get; set; }

    public string? Direccion { get; set; }
    public int SubCategoriaID { get; set; }
    public string? SubcategoriaDescripcion { get; set; }

    public bool Eliminado { get; set; }
}

