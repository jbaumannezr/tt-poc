const mod = module.exports;

mod.getUsers =          getUsers;
mod.getUserById =       getUserById;
mod.createUser =        createUser;
mod.updateUser =        updateUser;
mod.deleteUser =        deleteUser;

///////////////////

// const db = require("mysql-wrapper");

function User(obj) {
    if (obj.id) this.id = obj.id;
    this.firstName = db.string(obj.firstName);
    this.lastName = db.string(obj.lastName);
    this.displayName = db.string(obj.displayName);
    this.email = db.string(obj.email);
}

User.prototype.forSave = () => {
    return {
        firstName: this.firstName,
        lastName: this.lastName,
        displayName: this.displayName,
        email: this.email
    }
}

async function getUsers(context, options) {
    var list = await db(context).query("SELECT * FROM user");
    list = list.map(e => new User(e));
    return list;
}

async function getUserById(context, id) {
    var r = await db(context).query("SELECT * FROM user WHERE id=?", id);
    return r;
}

async function createUser(context, obj) {
    var r = new User(obj).forSave();
    var id = await db(context).query("INSERT INTO user SET ?", r);
    return id;
}

async function updateUser(context, id, obj) {
    var r = new User(obj).forSave();
    await db(context).query("UPDATE user SET ? WHERE id=?", [id, r]);
}

async function deleteUser(context, id) {
    await db(context).query("DELETE FROM user WHERE id=?", id)
}