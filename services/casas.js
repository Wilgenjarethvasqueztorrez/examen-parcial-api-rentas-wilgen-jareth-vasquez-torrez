const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT id, Precios, Baños, Camas, Calles, Direccion, Foto
    FROM casas LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}


async function create(casas) {
    const result = await db.query(
        `INSERT INTO casas 
      (Precios, Baños, Camas, Calles, Direccion, Foto) 
      VALUES 
      ('${casas.Precios}',
      '${casas.Baños}',
      '${casas.Camas}',
      '${casas.Calles}',
      '${casas.Direccion}',
       '${casas.Foto}' )`
    );

    let message = 'Error creando una casa';

    if (result.affectedRows) {
        message = 'Casa creado exitosamente';
    }

    return { message };
}

/**PUT Artistas */
async function update(id, casas) {
    const result = await db.query(
        `UPDATE casas
      SET
      Precios="${casas.Precios}",
      Baños="${casas.Baños}",
      Camas="${casas.Camas}", 
      Calles="${casas.Calles}",
      Direccion="${casas.Direccion}",
      Foto="${casas.Foto}"
    WHERE id=${id}`
    );

    let message = 'Error actualizando casa';

    if (result.affectedRows) {
        message = 'Casa actualizado correctamente';
    }

    return { message };
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM casas WHERE id=${id}`
    );

    let message = 'Error al eliminnar casa';

    if (result.affectedRows) {
        message = 'casa eliminado correctamente';
    }

    return { message };
}
module.exports = {
    getMultiple,
    create,
    update,
    remove
}
