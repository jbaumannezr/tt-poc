const mod = module.exports;

mod.getApprovalLevels =          getApprovalLevels;
mod.getApprovalLevelById =       getApprovalLevelById;
mod.createApprovalLevel =        createApprovalLevel;
mod.updateApprovalLevel =        updateApprovalLevel;
mod.deleteApprovalLevel =        deleteApprovalLevel;

///////////////////

const db = require("mysql-wrapper");

function ApprovalLevel(obj) {
    if (obj.id) this.id = obj.id;
    this.name = db.string(obj.name);
    this.incOvernightOOS = obj.incOvernightOOS ? true : false;
    this.assignBusses = obj.assignBusses ? true : false;
    this.boardReport = obj.boardReport  ? true : false;
    this.notify = obj.notify ? true : false;
    this.onApproval = db.number(obj.onApproval);
    this.onDenial = db.number(obj.onDenial);
    this.isDefault = obj.isDefault ? true : false;
}

ApprovalLevel.prototype.forSave = () => {
    return {
        name: this.name,
        incOvernightOOS: this.incOvernightOOS ? 1 : 0,
        assignBusses: this.assignBusses ? 1 : 0,
        boardReport: this.boardReport ? 1 : 0,
        notify: this.notify ? 1 : 0,
        onApproval: this.onApproval,
        onDenial: this.onDenial,
        isDefault: this.isDefault ? 1 : 0
    }
}

async function getApprovalLevels(context, options) {
    var list = await db(context).query("SELECT * FROM approvallevel");
    list = list.map(e => new ApprovalLevel(e));
    return sortLevels(list);
}

// replace with merge sort or something more efficient ??
function sortLevels(levels) {
    var sorted = levels.filter(l => l.isDefault);
    while (sorted.length != levels.length) {
        sorted.push(levels.find(l => l.id == sorted[sorted.length - 1].onApproval));
    }

    return sorted;
}

async function getApprovalLevelById(context, id) {
    var r = await db(context).query("SELECT * FROM approvallevel WHERE id=?", id);
    return new ApprovalLevel(r);
}

async function createApprovalLevel(context, obj) {
    var r = new ApprovalLevel(obj).forSave();
    var id = await db(context).query("INSERT INTO approvallevel SET ?", r);
    return id;
}

async function updateApprovalLevel(context, id, obj) {
    var r = new ApprovalLevel(obj).forSave();
    await db(context).query("UPDATE approvallevel SET ? WHERE id=?", [id, r]);
}

async function deleteApprovalLevel(context, id) {
    await db(context).query("DELETE FROM approvallevel WHERE id=?", id);
    await db(context).query("DELETE FROM approvalleveltriptype WHERE approvalLevelId=?", id);
    await db(context).query("DELETE FROM approvallevelcriteria WHERE approvalLevelId=?", id);
    await db(context).query("DELETE FROM approver WHERE approvalLevelId=?", id);
}