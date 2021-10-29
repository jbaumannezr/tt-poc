const _ = require("lodash");

const approverData = [
    {
        uuid: 'bd808fa8-b784-42f6-8e7e-459225030469',
        userId: 3,
        approvalLevelId: 1,
        locationId: 1,
        tripTypeId: 1,
        isPrimary: true
    },
    {
        uuid: 'bd808fa8-b784-42f6-8e7e-459225030469',
        userId: 3,
        approvalLevelId: 1,
        locationId: 3,
        tripTypeId: 1,
        isPrimary: true
    },
    {
        uuid: 'bd808fa8-b784-42f6-8e7e-459225030469',
        userId: 3,
        approvalLevelId: 1,
        locationId: 5,
        tripTypeId: 1,
        isPrimary: true
    },
    {
        uuid: 'bd808fa8-b784-42f6-8e7e-459225030469',
        userId: 3,
        approvalLevelId: 1,
        locationId: 8,
        tripTypeId: 1,
        isPrimary: true
    },
    {
        uuid: 'bd808fa8-b784-42f6-8e7e-459225030469',
        userId: 3,
        approvalLevelId: 1,
        locationId: 9,
        tripTypeId: 1,
        isPrimary: true
    },
    {
        uuid: 'bec657c2-b9b0-407b-811d-8ba94a3bc8d4',
        userId: 3,
        approvalLevelId: 1,
        locationId: 10,
        tripTypeId: 1,
        isPrimary: true
    },
    {
        uuid: 'bec657c2-b9b0-407b-811d-8ba94a3bc8d4',
        userId: 3,
        approvalLevelId: 1,
        locationId: 10,
        tripTypeId: 2,
        isPrimary: true
    },
    {
        uuid: 'bec657c2-b9b0-407b-811d-8ba94a3bc8d4',
        userId: 3,
        approvalLevelId: 1,
        locationId: 10,
        tripTypeId: 3,
        isPrimary: true
    },
    {
        uuid: 'bec657c2-b9b0-407b-811d-8ba94a3bc8d4',
        userId: 3,
        approvalLevelId: 1,
        locationId: 2,
        tripTypeId: 2,
        isPrimary: true
    },

    {
        uuid: 'bec657c2-b9b0-407b-811d-8ba94a3bc8d4',
        userId: 4,
        approvalLevelId: 3,
        locationId: 2,
        tripTypeId: 2,
        isPrimary: true
    },
];

// var byUser = _.groupBy(approverData, e => e.userId);
// var byUuid = _.groupBy(approverData, e => e.uuid);
// var byUserByUuid = {};
// for (var userId of Object.keys(byUser)) {
//     byUserByUuid[userId] = _.groupBy(byUser[userId], e => e.uuid)
// }

// var filteredUuid = {};
// for (var uuid of Object.keys(byUuid)) {
//     filteredUuid[uuid] = {
//         approvalLevelId: byUuid[uuid][0].approvalLevelId,
//         userId: byUuid[uuid][0].userId,
//         locationIds: _.uniq(byUuid[uuid].map(e => e.locationId)),
//         tripTypeIds: _.uniq(byUuid[uuid].map(e => e.tripTypeId)),
//         isPrimary: byUuid[uuid][0].isPrimary
//     }
// }

// var filteredUuid = Object.keys(byUuid).map(e => ({
//     uuid: e,
//     approvalLevelId: byUuid[e][0].approvalLevelId,
//     userId: byUuid[e][0].userId,
//     locationIds: _.uniq(byUuid[e].map(e => e.locationId)),
//     tripTypeIds: _.uniq(byUuid[e].map(e => e.tripTypeId)),
//     isPrimary: byUuid[e][0].isPrimary
// }))
    
// console.log(byUser);
// console.log(byUuid);
// console.log(byUserByUuid[3]['bec657c2-b9b0-407b-811d-8ba94a3bc8d4']);
// console.log(filteredUuid);


function getRequiredApprovalLevels(tripRequest) {
    var levels = [
        {
            id: 1,
            tripTypes: [2]
        },
        {
            id: 2,
            tripTypes: [1]
        },
        {
            id: 3,
            tripTypes: [1,2]
        }
    ];
    
    var required = [];
    for (var level of levels) {
        console.log(level.tripTypes.includes(tripRequest.tripTypeId))
        // check that the request tripTypeId requires this level
        if (!level.tripTypes.includes(tripRequest.tripTypeId))
            continue;

        // check each additional criteria 
        // for (var c of level.criteria) {
        //     if (!eval(c.function))          // probably need to modify this later
        //         continue;
        // }

        // check that there is a primary approver
        var primary = approverData.find(e => e.approvalLevelId == level.id && e.tripTypeId == tripRequest.tripTypeId && e.locationId == tripRequest.locationId && e.isPrimary);
        console.log(primary)
        if (!primary)
            continue;

        required.push(level.id);
    }

    return required;
}

console.log(getRequiredApprovalLevels({
    tripTypeId: 2,
    locationId: 2
}));