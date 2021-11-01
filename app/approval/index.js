const mod = module.exports;
const model = require("./approval");

mod.init =                          init;
mod.getRequiredApprovalLevels =     getRequiredApprovalLevels;
mod.approve =                       approve;
mod.getApprovalHistory =            getApprovalHistory;

function init(app) {
    require("./api").init(app);
}

///////////////////

const approvalLevel = require("approvalLevel");
const request = require("request");         // or whatever the  trip request module is called
const approver = require("approver");

/**
 * Get approval history by for a trip request by tripRequestId
 * @param {Object} context 
 * @param {Number} tripRequestId 
 */
async function getApprovalHistory(context, tripRequestId) {
    var list = await model.getApprovalHistory(context, tripRequestId);
    return list;
}

/**
 * Approve or deny a trip request at a certain approval level - return id of next approval level (or 0 if fully approved)
 * @param {Object} context 
 * @param {Object} obj 
 */
async function approve(context, obj) {
    await model.createApproval(context, obj);
    var required = await getRequiredApprovalLevels(context, obj.tripRequestId);
    var currLevelIndex = required.findIndex(e => e == obj.approvalLevelId);
    if (currLevelIndex == required.length - 1)
        return 0
    else
        return required[currLevelIndex + obj.approved ? 1 : -1];
}

/**
 * Get the required approval levels for a trip request
 * @param {Object} context 
 * @param {Number} requestId 
 */
async function getRequiredApprovalLevels(context, requestId) {
    var tripRequest =  await request.getTripRequestById(context, requestId);
    var levels = await approvalLevel.getApprovalLevels(context);
    
    var required = [];
    for (var level of levels) {
        // check that the request tripTypeId requires this level
        if (!level.tripTypes.includes(tripRequest.tripTypeId))
            continue;

        // check each additional criteria 
        var criteriaFailed = false;
        for (var c of level.criteria) {
            if (!eval(c.func))
                criteriaFailed = true;
        }
        if (criteriaFailed) continue;

        // check that there is a primary approver
        var primary = await approver.getPrimaryApprover(context, level.id, tripRequest.locationId, tripRequest.tripTypeId)
        if (!primary)
            continue;

        required.push(level.id);
    }

    return required;
}