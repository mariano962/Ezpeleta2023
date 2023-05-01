using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ezpeleta2023.Migrations.Ezpeleta2023Db
{
    public partial class Servicio : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Servicio_SubCategorias_SubCategoriaID",
                table: "Servicio");

            migrationBuilder.RenameColumn(
                name: "SubCategoriaID",
                table: "Servicio",
                newName: "SubcategoriaID");

            migrationBuilder.RenameIndex(
                name: "IX_Servicio_SubCategoriaID",
                table: "Servicio",
                newName: "IX_Servicio_SubcategoriaID");

            migrationBuilder.AlterColumn<int>(
                name: "SubcategoriaID",
                table: "Servicio",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Servicio_SubCategorias_SubcategoriaID",
                table: "Servicio",
                column: "SubcategoriaID",
                principalTable: "SubCategorias",
                principalColumn: "SubCategoriaID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Servicio_SubCategorias_SubcategoriaID",
                table: "Servicio");

            migrationBuilder.RenameColumn(
                name: "SubcategoriaID",
                table: "Servicio",
                newName: "SubCategoriaID");

            migrationBuilder.RenameIndex(
                name: "IX_Servicio_SubcategoriaID",
                table: "Servicio",
                newName: "IX_Servicio_SubCategoriaID");

            migrationBuilder.AlterColumn<int>(
                name: "SubCategoriaID",
                table: "Servicio",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Servicio_SubCategorias_SubCategoriaID",
                table: "Servicio",
                column: "SubCategoriaID",
                principalTable: "SubCategorias",
                principalColumn: "SubCategoriaID");
        }
    }
}
