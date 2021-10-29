module.exports.init = (app) => {
    app.get("/api/approvers", getApprovers);
    app.get("/api/approver/primary/:alid(\\d+)/:lid(\\d+)/:ttid(\\d+)", getPrimaryApprover);
    app.post("/api/approver", saveApprover);
    app.delete("/api/approver/:uuid", deleteApprover);
}

const manager = require('./index');

async function getApprovers(req, res, next) {
    try {
        var list = await manager.getApprovers(req.context, {
            approvallevelId: req.query.alid ? Number(req.query.alid) : 0,
            locationId: req.query.lid ? Number(req.query.alid) : 0,
            tripTypeId: req.query.ttid ? Number(req.query.alid) : 0,
        });
        req.response = list;
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function getPrimaryApprover(req, res, next) {
    try {
        var r = await manager.getApproverByUserId(req.context, Number(req.params.alid), Number(req.params.lid), Number(req.params.ttid));
        req.response = r;
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function saveApprover(req, res, next) {
    try {
        var id = await manager.saveApprover(req.context, req.body);
        req.response = { id };
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}

async function deleteApprover(req, res, next) {
    try {
        await manager.deleteApprover(req.context, req.params.uuid);
        req.response = { done: true };
        next();
    } catch(e) {
        req.error = e;
        next();
    }
}