const mod = module.exports;
const model = require("./location");

mod.init =                  init;
mod.getLocations =          getLocations;
mod.getLocationById =       getLocationById;
mod.createLocation =        createLocation;
mod.updateLocation =        updateLocation;
mod.deleteLocation =        deleteLocation;

function init(app) {
    require("./api").init(app);
}

///////////////////

/**
 * Get all locations
 * @param {Object} context 
 * @param {Object} options
 */
async function getLocations(context, options) {
    var locations = await model.getLocations(context, options);
    return locations;
}

/**
 * Get location by ID
 * @param {Object} context 
 * @param {Number} id 
 */
async function getLocationById(context, id) {
    var location = await model.getLocationById(context, id);
    return location;
}

/**
 * Create location
 * @param {Object} context 
 * @param {Object} obj 
 */
async function createLocation(context, obj) {
    var id = await model.createLocation(context, obj);
    return id;
}

/**
 * Update location
 * @param {Object} context 
 * @param {Number} id 
 * @param {Object} obj 
 */
async function updateLocation(context, id, obj) {
    await model.updateLocation(context, id, obj);
}

/**
 * Delete location
 * @param {Object} context 
 * @param {Number} id
 */
async function deleteLocation(context, id) {
    await model.deleteLocation(context, id);
}