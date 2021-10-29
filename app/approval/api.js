module.exports.init = (app) => {
    app.get("/api/approval/:id(\\d+)", getRequiredApprovalLevels);
    app.post("/api/request/approve", approve);
}

const manager = require('./index');

async function getRequiredApprovalLevels(req, res, next) {
    try {
        var r = await manager.getRequiredApprovalLevels(req.context, Number(req.params.id));
        req.response = r;
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function approve(req, res, next) {
    try {
        var r = await manager.approve(req.context, req.body);
        req.response = r;
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}