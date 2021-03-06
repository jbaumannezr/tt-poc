const mod = module.exports;
const model = require("./triptype");
const eventMod = require('./event');

mod.init =                  init;
mod.getTripTypes =          getTripTypes;
mod.getTripTypeById =       getTripTypeById;
mod.createTripType =        createTripType;
mod.updateTripType =        updateTripType;
mod.deleteTripType =        deleteTripType;

mod.saveTripTypeEvent =     eventMod.saveTripTypeEvent;
mod.deleteTripTypeEvent =   eventMod.deleteTripTypeEvent;

function init(app) {
    require("./api").init(app);
}

///////////////////

async function getTripTypes(context, options) {
    var tripTypes = await model.getTripTypes(context, options);
    eventMod.attachTripTypeEvents(tripTypes);
    return tripTypes;
}

async function getTripTypeById(context, id) {
    var tripType = await model.getTripTypeById(context, id);
    eventMod.attachTripTypeEvents(tripType);
    return tripType;
}

async function createTripType(context, obj) {
    var id = await model.createTripType(context, obj);
    return id;
}

async function updateTripType(context, id, obj) {
    await model.updateTripType(context, id, obj);
}

async function deleteTripType(context, id) {
    await model.deleteTripType(context, id);
}