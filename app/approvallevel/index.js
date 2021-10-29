const mod = module.exports;
const model = require("./approvallevel");
const tripTypeMod = require('./triptype');
const criteriaMod = require("./criteria");

mod.init =                      init;
mod.getApprovalLevels =         getApprovalLevels;
mod.getApprovalLevelById =      getApprovalLevelById;
mod.createApprovalLevel =       createApprovalLevel;
mod.updateApprovalLevel =       updateApprovalLevel;
mod.deleteApprovalLevel =       deleteApprovalLevel;

function init(app) {
    require("./api").init(app);
}

///////////////////

/**
 * Get all approvallevels
 * @param {Object} context 
 * @param {Object} options
 */
async function getApprovalLevels(context, options) {
    var list = await model.getApprovalLevels(context, options);
    await tripTypeMod.attachApprovalLevelTripTypes(context, list);
    await criteriaMod.attachCriteria(context, list);
    return list;
}

/**
 * Get approvallevel by ID
 * @param {Object} context 
 * @param {Number} id 
 */
async function getApprovalLevelById(context, id) {
    var approvallevel = await model.getApprovalLevelById(context, id);
    await tripTypeMod.attachApprovalLevelTripTypes(context, [approvallevel]);
    await criteriaMod.attachCriteria(context, [approvallevel]);
    return approvallevel;
}

/**
 * Create approvallevel
 * @param {Object} context 
 * @param {Object} obj 
 */
async function createApprovalLevel(context, obj) {
    var id = await model.createApprovalLevel(context, obj);
    await tripTypeMod.saveApprovalLevelTripType(context, obj);
    await criteriaMod.saveCriteria(context, obj);
    return id;
}

/**
 * Update approvallevel
 * @param {Object} context 
 * @param {Number} id 
 * @param {Object} obj 
 */
async function updateApprovalLevel(context, id, obj) {
    await model.updateApprovalLevel(context, id, obj);
    await tripTypeMod.saveApprovalLevelTripType(context, obj);
    await criteriaMod.saveCriteria(context, obj);
}

/**
 * Delete approvallevel
 * @param {Object} context 
 * @param {Number} id
 */
async function deleteApprovalLevel(context, id) {
    await model.deleteApprovalLevel(context, id);
}