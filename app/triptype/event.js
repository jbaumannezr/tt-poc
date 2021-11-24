const mod = module.exports;

mod.attachTripTypeEvents =      attachTripTypeEvents;
mod.saveTripTypeEvent =         saveTripTypeEvent;
mod.deleteTripTypeEvent =       deleteTripTypeEvent;

///////////////////

const db = require("mysql-wrapper");

/**
 * Get all events for a trip type
 * @param {Object} context 
 * @param {Object[]} tripTypes
 */
async function attachTripTypeEvents(context, tripTypes) {
    if (!Array.isArray(tripTypes)) tripTypes = [tripTypes];
    var tripTypeIds = tripTypes.map(e => e.id);
    var list = await db(context).query("SELECT * FROM triptypeevent WHERE tripTypeId IN ?", tripTypeIds);
    var eventsByTTId = _.groupBy(list, e => e.tripTypeId);
    for (var tt of tripTypes)
        tt.events = eventsByTTId[tt.id]
    return list;
}

/**
 * Save trip type event
 * @param {Object} context 
 * @param {Object} obj 
 */
async function saveTripTypeEvent(context, obj) {
    if (obj.id)
        await db(context).update("UPDATE triptypeevent SET ? WHERE id=?", [obj.id, obj]);
    else
        obj.id = await db(context).insert("INSERT INTO triptypeevent SET ?", obj);
    return obj.id;
}

/**
 * Delete trip type event
 * @param {Object} context 
 * @param {Number} id
 */
async function deleteTripTypeEvent(context, id) {
    await db(context).delete("DELETE FROM triptypeevent WHERE id=?", id)
}