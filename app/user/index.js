const mod = module.exports;
const model = require("./user");

mod.init =                  init;
mod.getUsers =          getUsers;
mod.getUserById =       getUserById;
mod.createUser =        createUser;
mod.updateUser =        updateUser;
mod.deleteUser =        deleteUser;

function init(app) {
    require("./api").init(app);
}

///////////////////

const approver = require("approver");

/**
 * Get all users
 * @param {Object} context 
 * @param {Object} options
 */
async function getUsers(context, options) {
    var users = await model.getUsers(context, options);
    await approver.attachApprovers(users);
    return users;
}

/**
 * Get user by ID
 * @param {Object} context 
 * @param {Number} id 
 */
async function getUserById(context, id) {
    var user = await model.getUserById(context, id);
    await approver.attachApprovers(user);
    return user;
}

/**
 * Create user
 * @param {Object} context 
 * @param {Object} obj 
 */
async function createUser(context, obj) {
    var id = await model.createUser(context, obj);
    return id;
}

/**
 * Update user
 * @param {Object} context 
 * @param {Number} id 
 * @param {Object} obj 
 */
async function updateUser(context, id, obj) {
    await model.updateUser(context, id, obj);
}

/**
 * Delete user
 * @param {Object} context 
 * @param {Number} id
 */
async function deleteUser(context, id) {
    await model.deleteUser(context, id);
}