module.exports.init = (app) => {
    app.get("/api/approvallevels", getApprovalLevels);
    app.get("/api/approvallevel/:id(\\d+)", getApprovalLevelById);
    app.post("/api/approvallevel", createApprovalLevel);
    app.put("/api/approvallevel/:id(\\d+)", updateApprovalLevel);
    app.delete("/api/approvallevel/:id(\\d+)", deleteApprovalLevel);
}

const manager = require('./index');

async function getApprovalLevels(req, res, next) {
    try {
        var list = await manager.getApprovalLevels(req.context);
        req.response = list;
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function getApprovalLevelById(req, res, next) {
    try {
        var r = await manager.getApprovalLevelById(req.context, Number(req.params.id));
        req.response = r;
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function createApprovalLevel(req, res, next) {
    try {
        var id = await manager.createApprovalLevel(req.context, req.body);
        req.response = { id };
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function updateApprovalLevel(req, res, next) {
    try {
        var id = await manager.updateApprovalLevel(req.context, Number(req.params.id), req.body);
        req.response = { id };
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function deleteApprovalLevel(req, res, next) {
    try {
        await manager.deleteApprovalLevel(req.context, Number(req.params.id));
        req.response = { done: true };
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}