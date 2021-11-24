const mod = module.exports;

mod.getLocations =          getLocations;
mod.getLocationById =       getLocationById;
mod.createLocation =        createLocation;
mod.updateLocation =        updateLocation;
mod.deleteLocation =        deleteLocation;

///////////////////

const db = require("mysql-wrapper");

function Location(obj) {
    if (obj.id) this.id = obj.id;
    this.clientId = db.number(obj.clientId);
    this.name = db.string(obj.name);
}

Location.prototype.forSave = () => {
    return {
        clientId: this.clientId,
        name: this.name
    }
}

async function getLocations(context, options) {
    var list = await db(context).query("SELECT * FROM location WHERE clientId=?", context.clientId);
    list = list.map(e => new Location(e));
    return list;
}

async function getLocationById(context, id) {
    var r = await db(context).query("SELECT * FROM location WHERE id=?", id);
    return r;
}

async function createLocation(context, obj) {
    var r = new Location(obj).forSave();
    var id = await db(context).insert("INSERT INTO location SET ?", r);
    return id;
}

async function updateLocation(context, id, obj) {
    var r = new Location(obj).forSave();
    await db(context).update("UPDATE location SET ? WHERE id=?", [r, id]);
}

async function deleteLocation(context, id) {
    await db(context).delete("DELETE FROM location WHERE id=?", id)
}