import db from "../config/dbconfig.js";

export async function cargarInventario() {
    const query = "SELECT * FROM inventario";
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}