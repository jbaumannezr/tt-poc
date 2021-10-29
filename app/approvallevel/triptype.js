const mod = module.exports;

mod.attachApprovalLevelTripTypes =      attachApprovalLevelTripTypes;
mod.saveApprovalLevelTripType =         saveApprovalLevelTripType;

///////////////////

const db = require("mysql-wrapper");
const _ = require("lodash");

function ApprovalLevelTripType(obj) {
    if (obj.id) this.id = obj.id;
    this.approvalLevelId = db.number(obj.approvalLevelId);
    this.tripTypeId = db.number(obj.tripTypeId);
}

async function attachApprovalLevelTripTypes(context, levels) {
    var ids = levels.map(e => e.id);
    var list = [];
    if (ids.length)
        list = await db(context).query("SELECT * FROM approvalleveltriptypes WHERE approvalLevelId IN (?)", [ids]);
    list = list.map(e => new ApprovalLevelTripType(e));
    var byLevel = _.groupBy(list, e => e.approvalLevelId);

    for (var level of levels) {
        level.tripTypes = byLevel[level.id] || [];
    }
}

async function saveApprovalLevelTripType(context, level) {
    var list = await db(context).query("SELECT tripTypeId FROM approvalleveltriptypes WHERE approvalLevelId=?", level.id);
    for (var t of level.tripTypes) {
		if (!list.includes(t))
            await db(context).insert("INSERT INTO approvalleveltriptypes SET ?", { approvalLevelId: level.id, tripTypeId: t });
	}

    await db(context).delete("DELETE FROM approvalleveltriptypes WHERE approvalLevelId=? AND NOT tripTypeId IN (?)", [level.id, level.tripTypes]);
}