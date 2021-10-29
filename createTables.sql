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
    fieldName VARCHAR(255) NOT NULL,
    comparator TINYINT,
    value FLOAT,
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
    name VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS triptype;
CREATE TABLE triptype (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    displayName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,

    PRIMARY KEY (id)
);