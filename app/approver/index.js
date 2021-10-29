const mod = module.exports;
const model = require("./approver");

mod.init =                      init;
mod.getApprovers =              getApprovers;
mod.getPrimaryApprover =        getPrimaryApprover;
mod.attachApprovers =       model.attachApprovers;
mod.saveApprover =              saveApprover;
mod.deleteApprover =            deleteApprover;

function init(app) {
    require("./api").init(app);
}

///////////////////

/**
 * Get all approvers
 * @param {Object} context 
 * @param {Object} options
 */
async function getApprovers(context, options) {
    var approvers = await model.getApprovers(context, options);
    return approvers;
}

/**
 * Get approver by ID
 * @param {Object} context 
 * @param {Number} approvalLevelId 
 * @param {Number} locationId 
 * @param {Number} tripTypeId 
 */
async function getPrimaryApprover(context, approvalLevelId, locationId, tripTypeId) {
    var approver = await model.getPrimaryApprover(context, approvalLevelId, locationId, tripTypeId);
    return approver;
}

/**
 * Create or update approver
 * @param {Object} context 
 * @param {Object} obj 
 */
async function saveApprover(context, obj) {
    var uuid = await model.saveApprover(context, obj);
    return uuid;
}

/**
 * Delete approver
 * @param {Object} context 
 * @param {UUID} uuid
 */
async function deleteApprover(context, uuid) {
    await model.deleteApprover(context, uuid);
}