const mod = module.exports;

mod.attachCriteria =            attachCriteria;
mod.saveCriteria =              saveCriteria;

///////////////////

const db = require("mysql-wrapper");
const _ = require("lodash");

function Criteria(obj) {
    if (obj.id) this.id = obj.id;
    this.approvalLevelId = db.number(obj.approvalLevelId);
    this.fieldname = db.string(fieldname);
    this.comparator = db.number(obj.comparator);
    this.value = db.number(obj.value);
    this.function = db.string(obj.function);
}

Criteria.prototype.forSave = () => {
    return {
        approvalLevelId: this.approvalLevelId,
        fieldname: this.fieldname,
        comparator: this.comparator,
        value: this.value,
        function: this.function
    }
}

async function attachCriteria(context, levels) {
    var ids = levels.map(e => e.id);
    var list = [];
    if (ids.length)
        list = await db(context).query("SELECT * FROM approvallevelcriteria WHERE approvalLevelId IN (?)", [ids]);
    list = list.map(e => new Criteria(e));
    var byLevel = _.groupBy(list, e => e.approvalLevelId);

    for (var level of levels)
        level.criteria = byLevel[level.id] || [];
}

async function saveCriteria(context, level) { 
	for (var c of level.criteria) {
		if (c.id && c.deleted)
			await db(context).delete("DELETE FROM approvallevelcriteria WHERE id=?", c.id);
		else if (c.id) {
			await db(context).update("UPDATE approvallevelcriteria SET ? WHERE id=?", [new Criteria(c).forSave(), c.id]);
		} else {
            c.approvalLevelId = level.id;
			c.id = await db(context).insert("INSERT INTO approvallevelcriteria SET ?", new Criteria(c).forSave());
		}
	}
}