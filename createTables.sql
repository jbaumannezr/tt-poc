DROP TABLE IF EXISTS address;
CREATE TABLE address (
    id INT NOT NULL AUTO_INCREMENT,
    recordType tinyint(4) NOT NULL COMMENT '1: user, 2: location, 3: destination',
    recordId INT NOT NULL,
    active tinyint(4) NOT NULL DEFAULT 1,
    name varchar(255) NOT NULL DEFAULT '',
    isPrimary tinyint(1) NOT NULL DEFAULT 0,
    isMailing tinyint(1) NOT NULL,
    hidden tinyint(1) NOT NULL DEFAULT 0,
    address varchar(255) NOT NULL,
    address2 varchar(255) NOT NULL DEFAULT '',
    city varchar(64) NOT NULL,
    state varchar(32) NOT NULL,
    zip varchar(16) NOT NULL,
    lat decimal(9,6) NOT NULL DEFAULT 0.000000,
    lng decimal(9,6) NOT NULL DEFAULT 0.000000,
    created INT NOT NULL,
    timestamp INT NOT NULL,
    PRIMARY KEY (id),
    KEY ix_address_link (recordType,recordId),
    KEY ix_address_rec (recordId),
    KEY ix_addr_lat (lat),
    KEY ix_addr_lng (lng)
);

DROP TABLE IF EXISTS approver;
CREATE TABLE approver (
    id INT NOT NULL AUTO_INCREMENT,
    uuid varchar(36) NOT NULL,
    userId INT NOT NULL,
    approvalLevelId INT NOT NULL,
    locationId INT NOT NULL,
    tripTypeId INT NOT NULL,
    isPrimary TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY ix_approver (userId, approvalLevelId, locationId, tripTypeId),
    KEY ix_approver_level (approvalLevelId),
    KEY ix_approver_location (locationId),
    KEY ix_approver_type (tripTypeId)
);

DROP TABLE IF EXISTS approvallevel;
CREATE TABLE approvallevel (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    incOvernightOOS TINYINT NOT NULL DEFAULT 0,
    assignBusses TINYINT NOT NULL DEFAULT 0,
    boardReport TINYINT NOT NULL DEFAULT 0,
    notify TINYINT NOT NULL DEFAULT 0,
    onApproval INT,
    onDenial INT DEFAULT 0,
    isDefault TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS approvallevelcriteria;
CREATE TABLE approvallevelcriteria (
    id INT NOT NULL AUTO_INCREMENT,
    approvalLevelId INT NOT NULL,
    func VARCHAR(1024),
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS approvalleveltriptype;
CREATE TABLE approvalleveltriptype (
    id INT NOT NULL AUTO_INCREMENT,
    approvalLevelId INT NOT NULL,
    tripTypeId INT NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS attachment;
CREATE TABLE attachment (
    id INT NOT NULL AUTO_INCREMENT,
    recordType tinyint(4) NOT NULL COMMENT '1: triprequest, 2: ??',
    recordId INT NOT NULL,
    filename varchar(255) NOT NULL,
    path varchar(255) NOT NULL COMMENT 'full path to file on hard drive',
    mime varchar(255) NOT NULL,
    size INT NOT NULL,
    created INT NOT NULL,
    comments varchar(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY ix_attachment_name (recordType,recordId,filename)
);

DROP TABLE IF EXISTS contact;
CREATE TABLE contact (
    id INT NOT NULL AUTO_INCREMENT,
    recordType tinyint(4) NOT NULL,
    recordId INT NOT NULL,
    name varchar(64) NOT NULL DEFAULT '',
    isPrimary tinyint(1) NOT NULL DEFAULT '0',
    seq tinyint(4) NOT NULL DEFAULT '0',
    timestamp INT NOT NULL,
    PRIMARY KEY (id),
    KEY ix_contact_type (recordType),
    KEY ix_contact_record (recordId)
);

DROP TABLE IF EXISTS levelapproval;
CREATE TABLE levelapproval (
    id INT NOT NULL AUTO_INCREMENT,
    tripRequestId INT NOT NULL,
    approvalLevelId INT NOT NULL,
    approved TINYINT NOT NULL,
    userId INT NOT NULL,
    timestamp INT NOT NULL,
    comments text,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS location;
CREATE TABLE location (
    id INT NOT NULL AUTO_INCREMENT,
    code VARCHAR(16) NOT NULL,
    name VARCHAR(255) NOT NULL,
    abbr VARCHAR(64) NOT NULL,
    isSchool TINYINT NOT NULL,
    isVehicleLocation TINYINT NOT NULL,
    allowAsOrigin TINYINT NOT NULL,
    addressId INT NOT NULL,
    milesToGarage INT,
    zoneId INT,
    defVehicleType INT,
    active TINYINT NOT NULL DEFAULT 1,
    zoneUseOnly TINYINT NOT NULL DEFAULT 0,
    inclCommonDest TINYINT NOT NULL,
    PRIMARY KEY (id),
    KEY ix_location_address (addressId),
    KEY ix_location_zone (zoneId),
    KEY ix_location_vehicletype (vehicleTypeId)
);

DROP TABLE IF EXISTS locationRole;
CREATE TABLE locationRole (
    id INT NOT NULL AUTO_INCREMENT,
    locationId INT NOT NULL,
    userId INT NOT NULL,
    type VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS locationVehicles;
CREATE TABLE locationVehicles (
    id INT NOT NULL AUTO_INCREMENT,
    locationId INT NOT NULL,
    vehicleLocationId INT NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS tripevent;
CREATE TABLE tripevent (
    id INT NOT NULL AUTO_INCREMENT,
    tripTypeId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    KEY ix_event_trip_type (tripTypeId)
);

DROP TABLE IF EXISTS triprequest;
CREATE TABLE triprequest (
    id INT NOT NULL AUTO_INCREMENT,
    requesterId INT NOT NULL,
    submittedAt INT NOT NULL,
    status TINYINT NOT NULL DEFAULT -1,
    assignmentStatus TINYINT NOT NULL DEFAULT -1,
    category TINYINT,
    tripTypeId INT,
    tripEventId INT,
    departLocationId INT,
    overnightOOS TINYINT,
    outOfCounty TINYINT,
    departTimestamp INT,
    returnTimestamp INT,
    destinationId INT,
    estMiles INT,
    permSlipInst TEXT,
    teacherContactId INT,
    emergencyContactId INT,
    numAdults INT,
    numStudents INT,
    grades TEXT,
    goneForLunch TINYINT,
    healthConcerns TEXT,
    extTransportation TINYINT,
    eduObjectives TEXT,
    specialIndicators TEXT,
    acceptResponsibility TINYINT,
    comments TEXT,
    PRIMARY KEY (id),
    KEY ix_request_requester (requesterId),
    KEY ix_request_type (tripTypeId),
    KEY ix_request_event (tripEventId),
    KEY ix_request_location (departLocationId),
    KEY ix_request_destination (destinationId)
);

DROP TABLE IF EXISTS triprequestbudgetcode;
CREATE TABLE triprequestbudgetcode (
    id INT NOT NULL AUTO_INCREMENT,
    sourceId INT NOT NULL,
    budgetCode VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    KEY ix_request_funding_source (sourceId)
);

DROP TABLE IF EXISTS triprequeststop;
CREATE TABLE triprequeststop (
    id INT NOT NULL AUTO_INCREMENT,
    direction TINYINT NOT NULL,
    addressId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    minutes INT NOT NULL,
    altPickup TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    KEY ix_request_stop_address (addressId)
);

DROP TABLE IF EXISTS triprequesttppay;
CREATE TABLE triprequesttppay (
    id INT NOT NULL AUTO_INCREMENT,
    amount DECIMAL(14,2) NOT NULL,
    option TINYINT NOT NULL,
    po VARCHAR(255) NOT NULL,
    dueToAddressId INT NOT NULL,
    comments TEXT,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS triptype;
CREATE TABLE triptype (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    active TINYINT NOT NULL DEFAULT 1,
    costPerMile DECIMAL(14,2) NOT NULL,
    planCostPerMile DECIMAL(14,2),
    addCostPerMile DECIMAL(14,2),
    standardFee DECIMAL(14,2),
    vehicleTypes TEXT,
    category TINYINT NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS triptypeevent;
CREATE TABLE triptypeevent (
    id INT NOT NULL AUTO_INCREMENT,
    tripTypeId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    KEY ix_trip_type_event (tripTypeId)
);

-- DROP TABLE IF EXISTS user;
-- CREATE TABLE user (
--     id INT NOT NULL AUTO_INCREMENT,
--     firstName VARCHAR(255) NOT NULL,
--     lastName VARCHAR(255) NOT NULL,
--     displayName VARCHAR(255) NOT NULL,
--     email VARCHAR(255) NOT NULL,

--     PRIMARY KEY (id)
-- );