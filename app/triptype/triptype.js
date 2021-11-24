const mod = module.exports;

mod.getTripTypes =          getTripTypes;
mod.getTripTypeById =       getTripTypeById;
mod.createTripType =        createTripType;
mod.updateTripType =        updateTripType;
mod.deleteTripType =        deleteTripType;

///////////////////

const db = require("mysql-wrapper");

function TripType(obj) {
    if (obj.id) this.id = obj.id;
    this.clientId = db.number(obj.clientId);
    this.name = db.string(obj.name);
}

TripType.prototype.forSave = () => {
    return {
        clientId: this.clientId,
        name: this.name
    }
}

/**
 * Get all tripTypes
 * @param {Object} context 
 * @param {Object} options
 */
async function getTripTypes(context, options) {
    var list = await db(context).query("SELECT * FROM triptype WHERE clientId=?", context.clientId);
    list = list.map(e => new TripType(e));
    return list;
}

/**
 * Get tripType by ID
 * @param {Object} context 
 * @param {Number} id 
 */
async function getTripTypeById(context, id) {
    var r = await db(context).query("SELECT * FROM triptype WHERE id=?", id);
    return r;
}

/**
 * Create tripType
 * @param {Object} context 
 * @param {Object} obj 
 */
async function createTripType(context, obj) {
    var r = new TripType(obj).forSave();
    var id = await db(context).insert("INSERT INTO triptype SET ?", r);
    return id;
}

/**
 * Update tripType
 * @param {Object} context 
 * @param {Number} id 
 * @param {Object} obj 
 */
async function updateTripType(context, id, obj) {
    var r = new TripType(obj).forSave();
    await db(context).update("UPDATE triptype SET ? WHERE id=?", [r, id]);
}

/**
 * Delete tripType
 * @param {Object} context 
 * @param {Number} id
 */
async function deleteTripType(context, id) {
    await db(context).delete("DELETE FROM triptype WHERE id=?", id)
}