const mod = module.exports;

mod.getApprovers =          getApprovers;
mod.getPrimaryApprover =    getPrimaryApprover;
mod.attachApprovers =       attachApprovers;
mod.saveApprover =          saveApprover;
mod.deleteApprover =        deleteApprover;

///////////////////

const db = require("mysql-wrapper");
const _ = require("lodash");

function Approver(obj) {
    if (obj.id) this.id = obj.id;
    this.clientId = db.number(obj.clientId);
    this.uuid = db.string(obj.uuid);
    this.userId = db.number(obj.userId);
    this.approvalLevelId = db.number(obj.approvalLevelId);
    this.locationId = db.number(obj.locationId);
    this.tripTypeId = db.number(obj.tripTypeId);
    this.isPrimary = obj.isPrimary ? true : false;
}

async function getApprovers(context, options) {
    var where = ['clientId=?'], params = [context.clientId];
    if (options.approvalLevelId) {
        where.push('approvalLevelId=?');
        params.push(options.approvalLevelId);
    }
    if (options.locationId) {
        where.push('locationId=?');
        params.push(options.locationId);
    }
    if (options.tripTypeId) {
        where.push('tripTypeId=?');
        params.push(options.tripTypeId);
    }
    var sql = "SELECT * FROM approver WHERE " + where.join(' AND ');
    list = await db(context).query(sql, params);
    list = list.map(e => new Approver(e));

    return returnApprovers(list);
}

async function getPrimaryApprover(context, approvalLevelId, locationId, tripTypeId) {
    var list = await db(context).query(`
        SELECT a.*, u.displayName, u.email FROM approver a 
        LEFT JOIN user u ON a.userId=u.id
        WHERE approvalLevelId=? AND locationId=? AND tripTypeId=? AND isPrimary=1`, [approvalLevelId, locationId, tripTypeId]);
    list = list.map(e => new Approver(e));
    return list;
}

async function attachApprovers(context, users) {
    if (!Array.isArray(users)) users = [users];
    var ids = users.map(e => e.id);
    var list = await db(context).query("SELECT * FROM approver WHERE userId IN (?)", ids);
    var byUser = _.groupBy(list, e => e.userId);
    for (var user of users) {
        user.approver = returnApprovers(byUser[user.id])
    }
}

function returnApprovers(list) {
    if (!list.length) return [];

    var byUuid = _.groupBy(list, e => e.uuid);
    return Object.keys(byUuid).map(e => ({
        uuid: e,
        approvalLevelId: byUuid[e][0].approvalLevelId,
        userId: byUuid[e][0].userId,
        locationIds: _.uniq(byUuid[e].map(e => e.locationId)),
        tripTypeIds: _.uniq(byUuid[e].map(e => e.tripTypeId)),
        isPrimary: byUuid[e][0].isPrimary
    }));

    // [
    //     {
    //       uuid: 'bd808fa8-b784-42f6-8e7e-459225030469',
    //       approvalLevelId: 1,
    //       userId: 3,
    //       locationIds: [ 1, 3, 5, 8, 9 ],
    //       tripTypeIds: [ 1 ],
    //       isPrimary: true
    //     },
    //     {
    //       uuid: 'bec657c2-b9b0-407b-811d-8ba94a3bc8d4',
    //       approvalLevelId: 1,
    //       userId: 3,
    //       locationIds: [ 10 ],
    //       tripTypeIds: [ 1, 2, 3 ],
    //       isPrimary: true
    //     }
    // ]
}

async function saveApprover(context, obj) {
    // always dealing with constant userId and approvalLevelId regardless of being called from Approval Level or User page

    // obj = {
    //     uuid: 'bd808fa8-b784-42f6-8e7e-459225030469',
    //     userId: 3,
    //     approvalLevelId: 1,
    //     locationIds: [ 1, 3, 5, 8, 9 ],
    //     tripTypeIds: [ 1 ],
    //     isPrimary: true
    // }

    // if this is an update, remove all of the entries for this UUID and add the ones passed in
    // if this is a new Approver, nothing will be deleted and everything will still be added
    await deleteApprover(context, obj.uuid);

    for (var l of obj.locationIds) {
        for (var t of obj.tripTypeIds) {            
            await db(context).insert("INSERT INTO approver SET ?", {
                clientId: context.clientId,
                uuid: obj.uuid,
                userId: obj.userId,
                approvalLevelId: obj.approvalLevelId,
                locationId: l,
                tripTypeId: t,
                isPrimary: obj.isPrimary ? 1 : 0
            });
        }
    }
    return obj.uuid;
}

async function deleteApprover(context, uuid) {
    await db(context).delete("DELETE FROM approver WHERE uuid=?", uuid);
}