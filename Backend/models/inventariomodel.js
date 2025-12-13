import db from "../config/dbconfig.js";

export async function cargarInventario() {
    const query = "SELECT * FROM inventario";
    // db es pool.promise(), por lo que query devuelve [rows, fields]
    const [rows] = await db.query(query);
    return rows;
}