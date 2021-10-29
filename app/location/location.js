const mod = module.exports;

mod.getLocations =          getLocations;
mod.getLocationById =       getLocationById;
mod.createLocation =        createLocation;
mod.updateLocation =        updateLocation;
mod.deleteLocation =        deleteLocation;

///////////////////

// const db = require("mysql-wrapper");

function Location(obj) {
    if (obj.id) this.id = obj.id;
    this.name = db.string(obj.name);
}

Location.prototype.forSave = () => {
    return {
        name: this.name
    }
}

async function getLocations(context, options) {
    var list = await db(context).query("SELECT * FROM location");
    list = list.map(e => new Location(e));
    return list;
}

async function getLocationById(context, id) {
    var r = await db(context).query("SELECT * FROM location WHERE id=?", id);
    return r;
}

async function createLocation(context, obj) {
    var r = new Location(obj).forSave();
    var id = await db(context).query("INSERT INTO location SET ?", r);
    return id;
}

async function updateLocation(context, id, obj) {
    var r = new Location(obj).forSave();
    await db(context).query("UPDATE location SET ? WHERE id=?", [id, r]);
}

async function deleteLocation(context, id) {
    await db(context).query("DELETE FROM location WHERE id=?", id)
}