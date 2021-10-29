module.exports.init = (app) => {
    app.get("/api/triptypes", getTripTypes);
    app.get("/api/triptype/:id(\\d+)", getTripTypeById);
    app.post("/api/triptype", createTripType);
    app.put("/api/triptype/:id(\\d+)", updateTripType);
    app.delete("/api/triptype/:id(\\d+)", deleteTripType);
}

const manager = require('./index');

async function getTripTypes(req, res, next) {
    try {
        var list = await manager.getTripTypes(req.context);
        req.response = list;
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function getTripTypeById(req, res, next) {
    try {
        var r = await manager.getTripTypeById(req.context, Number(req.params.id));
        req.response = r;
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function createTripType(req, res, next) {
    try {
        var id = await manager.createTripType(req.context, req.body);
        req.response = { id };
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function updateTripType(req, res, next) {
    try {
        var id = await manager.updateTripType(req.context, Number(req.params.id), req.body);
        req.response = { id };
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function deleteTripType(req, res, next) {
    try {
        await manager.deleteTripType(req.context, Number(req.params.id));
        req.response = { done: true };
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}