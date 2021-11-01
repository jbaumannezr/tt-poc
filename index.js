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
    {
        uuid: 'bec657c2-b9b0-407b-811d-8ba94a3bc8d4',
        userId: 6,
        approvalLevelId: 2,
        locationId: 1,
        tripTypeId: 1,
        isPrimary: true
    },
    {
        uuid: 'bec657c2-b9b0-407b-811d-8ba94a3bc8d4',
        userId: 7,
        approvalLevelId: 4,
        locationId: 1,
        tripTypeId: 1,
        isPrimary: true
    },
    {
        uuid: 'bec657c2-b9b0-407b-811d-8ba94a3bc8d4',
        userId: 8,
        approvalLevelId: 9,
        locationId: 1,
        tripTypeId: 1,
        isPrimary: true
    },
];

var c = createCriteria({
    approvalLevelId: 1,
    fieldName: 'staffOnly',
    comparator: null,
    value: null
});

var c2 = createCriteria({
    approvalLevelId: 1,
    fieldName: 'mileage',
    comparator: 2,
    value: 100
});

var c3 = createCriteria({
    approvalLevelId: 1,
    fieldName: 'grades',
    comparator: null,
    value: 6
});

var c4 = createCriteria({
    approvalLevelId: 1,
    fieldName: 'tripTypeEvent',
    comparator: null,
    value: 3
});

var c5 = createCriteria({
    approvalLevelId: 1,
    fieldName: 'oneWayMileage',
    comparator: 2,
    value: 40
});

var c6 = createCriteria({
    approvalLevelId: 1,
    fieldName: 'roundTripMileage',
    comparator: 2,
    value: 40
});

const levels = [
    {
        id: 1,
        name: 'Location',
        tripTypes: [1],
        onApproval: 2,
        isDefault: true,
        criteria: []
    },
    {
        id: 2,
        name: 'Secondary Location',
        tripTypes: [1],
        onApproval: 3,
        isDefault: false,
        criteria: [{ func: c }]
    },
    {
        id: 4,
        name: 'High Mileage',
        tripTypes: [1],
        onApproval: 5,
        isDefault: false,
        criteria: [{ func: c5 }]
    },
    {
        id: 6,
        name: 'Yellow Bus',
        tripTypes: [1],
        onApproval: 7,
        isDefault: false,
        criteria: [{ func: c4 }]
    },
    {
        id: 5,
        name: 'Funding Source',
        tripTypes: [],
        onApproval: 6,
        isDefault: false,
        criteria: []
    },
    {
        id: 7,
        name: 'Central Office',
        tripTypes: [],
        onApproval: 8,
        isDefault: false,
        criteria: []
    },
    {
        id: 8,
        name: 'Destination',
        tripTypes: [],
        onApproval: 9,
        isDefault: false,
        criteria: []
    },
    {
        id: 3,
        name: 'Out-of-County',
        tripTypes: [],
        onApproval: 4,
        isDefault: false,
        criteria: []
    },
    {
        id: 9,
        name: 'Superintendent',
        tripTypes: [1],
        onApproval: 0,
        isDefault: false,
        criteria: []
    },
]

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

// console.log(getRequiredApprovalLevels({
//     tripTypeId: 2,
//     locationId: 2
// }));


// replace with merge sort or something more efficient
function sortLevels(levels) {
    var sorted = [];
    var ctr = 0;
    while (sorted.length != levels.length) {
        if (!sorted.length) {
            if (levels[ctr].isDefault)
                sorted.push(levels[ctr]);
        } else {
            if (sorted[sorted.length - 1].onApproval == levels[ctr].id)
                sorted.push(levels[ctr]);
        }

        ctr++;
        if (ctr == levels.length)
            ctr = 0;
    }

    return sorted;
}

function sortLevels2(levels) {
    var sorted = levels.filter(l => l.isDefault);
    while (sorted.length != levels.length) {
        sorted.push(levels.find(l => l.id == sorted[sorted.length - 1].onApproval));
    }

    return sorted;
}

// console.log(sortLevels2(levels));


function createCriteria(obj) {
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

function evalCriteria(tripRequest, criteria) {
    console.log(criteria.func)
    return eval(criteria.func)
}



var r = {
    tripTypeId: 1,
    locationId: 1,
    staffOnly: false,
    mileage: 20,
    grades: [1,2,3,4,5],
    tripTypeEvent: 3,
    estMileage: 70
}

// console.log(evalCriteria(r, { func: c6 }));


function getRequiredApprovalLevels() {
    var tripRequest =  r;
    
    var required = [];
    for (var level of levels) {
        // check that the tripRequest tripTypeId requires this level
        if (!level.tripTypes.includes(tripRequest.tripTypeId))
            continue;

        // check each additional criteria 
        var criteriaFailed = false;
        for (var c of level.criteria) {
            if (!eval(c.func))          // probably need to modify this later
                criteriaFailed = true;
        }
        if (criteriaFailed) continue;

        // check that there is a primary approver
        var primary = approverData.find(e => e.approvalLevelId == level.id && e.tripTypeId == tripRequest.tripTypeId && e.locationId == tripRequest.locationId && e.isPrimary);
        if (!primary)
            continue;

        required.push(level.id);
    }

    return required;
}

console.log(getRequiredApprovalLevels())