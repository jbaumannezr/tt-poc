module.exports.init = (app) => {
    app.get("/api/users", getUsers);
    app.get("/api/user/:id(\\d+)", getUserById);
    app.post("/api/user", createUser);
    app.put("/api/user/:id(\\d+)", updateUser);
    app.delete("/api/user/:id(\\d+)", deleteUser);
}

const manager = require('./index');

async function getUsers(req, res, next) {
    try {
        var list = await manager.getUsers(req.context);
        req.response = list;
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function getUserById(req, res, next) {
    try {
        var r = await manager.getUserById(req.context, Number(req.params.id));
        req.response = r;
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function createUser(req, res, next) {
    try {
        var id = await manager.createUser(req.context, req.body);
        req.response = { id };
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function updateUser(req, res, next) {
    try {
        var id = await manager.updateUser(req.context, Number(req.params.id), req.body);
        req.response = { id };
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function deleteUser(req, res, next) {
    try {
        await manager.deleteUser(req.context, Number(req.params.id));
        req.response = { done: true };
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}