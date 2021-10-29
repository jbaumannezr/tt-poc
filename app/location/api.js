module.exports.init = (app) => {
    app.get("/api/locations", getLocations);
    app.get("/api/location/:id(\\d+)", getLocationById);
    app.post("/api/location", createLocation);
    app.put("/api/location/:id(\\d+)", updateLocation);
    app.delete("/api/location/:id(\\d+)", deleteLocation);
}

const manager = require('./index');

async function getLocations(req, res, next) {
    try {
        var list = await manager.getLocations(req.context);
        req.response = list;
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function getLocationById(req, res, next) {
    try {
        var r = await manager.getLocationById(req.context, Number(req.params.id));
        req.response = r;
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function createLocation(req, res, next) {
    try {
        var id = await manager.createLocation(req.context, req.body);
        req.response = { id };
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function updateLocation(req, res, next) {
    try {
        var id = await manager.updateLocation(req.context, Number(req.params.id), req.body);
        req.response = { id };
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function deleteLocation(req, res, next) {
    try {
        await manager.deleteLocation(req.context, Number(req.params.id));
        req.response = { done: true };
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}