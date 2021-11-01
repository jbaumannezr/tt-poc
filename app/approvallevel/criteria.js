const mod = module.exports;

mod.attachCriteria =            attachCriteria;
mod.saveCriteria =              saveCriteria;

///////////////////

const db = require("mysql-wrapper");
const _ = require("lodash");

function Criteria(obj) {
    if (obj.id) this.id = obj.id;
    this.approvalLevelId = db.number(obj.approvalLevelId);
    this.func = db.string(obj.func);
}

Criteria.prototype.forSave = () => {
    return {
        approvalLevelId: this.approvalLevelId,
        func: this.func
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
		else 
            c.func = createCriteriaFunc(c);
        
        if (c.id) {
			await db(context).update("UPDATE approvallevelcriteria SET ? WHERE id=?", [new Criteria(c).forSave(), c.id]);
		} else {
            c.approvalLevelId = level.id;
			c.id = await db(context).insert("INSERT INTO approvallevelcriteria SET ?", new Criteria(c).forSave());
		}
	}
}

function createCriteriaFunc(obj) {
    const comparators = ['==', '<', '>'];
    var func = '';

    // SPECIAL CASES
    if (obj.fieldName == 'outOfCounty') {
        // calc if destination is out of county
    } else if (obj.fieldName == 'newDestination') {
        func = `tripRequest.destination.id < 1`;
    } else if (obj.fieldName == 'oneWayMileage' || obj.fieldName == 'roundTripMileage') {
        func = `(tripRequest.estMileage / ${obj.fieldName == 'oneWayMileage' ? 2 : 1}) ${comparators[obj.comparator]} ${obj.value}`
    }

    // GENERICS
    else if (!obj.comparator && !obj.value) {
        func = `tripRequest.${obj.fieldName} == true`;
    } else if (!obj.comparator) {
        func = `Array.isArray(tripRequest.${obj.fieldName}) ?
            tripRequest.${obj.fieldName}.includes(${obj.value}) :
            tripRequest.${obj.fieldName} == ${obj.value}`;
    } else {
        func = `tripRequest.${obj.fieldName} ${comparators[obj.comparator]} ${obj.value}`;
    }

    return func;
}