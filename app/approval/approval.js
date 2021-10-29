const mod = module.exports;

mod.getApprovalHistory =    getApprovalHistory;
mod.createApproval =        createApproval;

///////////////////

const db = require("mysql-wrapper");
const shared = require("shared");

function Approval(obj) {
    if (obj.id) this.id = obj.id;
    this.tripRequestId = db.number(obj.tripRequestId);
    this.approvalLevelId = db.number(obj.approvalLevelId);
    this.approved = obj.approved ? true : false;
    this.userId = db.number(obj.userId);
    this.timestamp = shared.T(obj.timestamp);
    this.comments = obj.comments;
}

Approval.prototype.forSave = () => {
    return {
        tripRequestId: this.tripRequestId,
        approvalLevelId: this.approvalLevelId,
        approved: this.approved ? 1 : 0,
        userId: this.userId,
        timestamp: this.timestamp,
        comments: this.comments
    }
}

async function getApprovalHistory(context, id) {
    var list = await db(context).query("SELECT * FROM levelapproval WHERE tripRequestId=? ORDER BY timestamp", id);
    return list.map(e => new Approval(e));
}

async function createApproval(context, obj) {
    obj.timestamp = new Date().getTime() / 1000;
    var r = new Approval(obj).forSave();
    var id = await db(context).query("INSERT INTO levelapproval SET ?", r);
    return id;
}