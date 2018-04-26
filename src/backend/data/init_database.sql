CREATE TABLE `Company` (
    `cname` VARCHAR(45) NOT NULL,
    `ckey` VARCHAR(45) NOT NULL,
    `cemail` VARCHAR(10) NOT NULL,
    `clocation` VARCHAR(45) NOT NULL,
    `cphone` VARCHAR(12) NOT NULL,
    `cindustry` VARCHAR(45) NULL,
    `cdescription` VARCHAR(200) NULL,
    PRIMARY KEY (`cname`)
);

CREATE TABLE `Student` (
    `semail` VARCHAR(20) NOT NULL,
    `skey` VARCHAR(16) NOT NULL,
    `sphone` VARCHAR(12) NULL,
    `sfirstname` VARCHAR(20) NOT NULL,
    `slastname` VARCHAR(20) NOT NULL,
    `suniversity` VARCHAR(40) NULL,
    `smajor` VARCHAR(5)  NULL,
    `sgpa` VARCHAR(5)  NULL,
    `sresume` VARCHAR(40)  NULL,
    `sprivacy` BOOLEAN  NULL,
    PRIMARY KEY (`semail`)
);

CREATE TABLE `JobAnnouncement` (
    `jid` INT NOT NULL,
    `cname` VARCHAR(45) NOT NULL,
    `jlocation` VARCHAR(45) NULL,
    `jtitle` VARCHAR(45) NULL,
    `jsalary` VARCHAR(45) NULL,
    `jreq_diploma` VARCHAR(45) NULL,
    `jreq_experience` VARCHAR(45) NULL,
    `jreq_skills` VARCHAR(90) NULL,
    `jdescription` VARCHAR(200),
    `posttime` date,
    PRIMARY KEY (`jid`),
    FOREIGN KEY(`cname`)
        REFERENCES `Company`(`cname`)
);

CREATE TABLE `StudentFollowCompany` (
    `semail` VARCHAR(20) NOT NULL,
    `cname` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`semail`,`cname`),
    FOREIGN key (`semail`)
    	REFERENCES `Student` (`semail`),
    FOREIGN KEY (`cname`)
        REFERENCES `Company`(`cname`)
);

CREATE TABLE `StudentApplyJob` (
    `aid` INT NOT NULL,
    `semail` VARCHAR(20) NOT NULL,
    `jid` INT NOT NULL,
    `cname` VARCHAR(45) NOT NULL,
    `status` VARCHAR(10) NULL,
    `applytime` date,
    PRIMARY KEY (`aid`),
    FOREIGN key (`semail`)
        REFERENCES `Student` (`semail`),
    FOREIGN KEY (`cname`)
        REFERENCES `Company`(`cname`),
    FOREIGN KEY (`jid`)
        REFERENCES `JobAnnouncement`(`jid`)
);

CREATE TABLE `StudentFriends` (
    `semailsend` VARCHAR(20) NOT NULL,
    `semailreceive` VARCHAR(20) NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `sendtime` date,
    PRIMARY KEY (`semailsend`,`semailreceive`),
    FOREIGN key (`semailsend`)
        REFERENCES `Student` (`semail`),
    FOREIGN key (`semailreceive`)
        REFERENCES `Student` (`semail`)
);

CREATE TABLE `Notification` (
    `nid` INT NOT NULL,
    `companysend` VARCHAR(45) NULL,
    `semailsend` VARCHAR(20) NULL,
    `semailreceive` VARCHAR(20)  NOT NULL,
    `jid` INT  NOT NULL,
    `pushtime` date NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    PRIMARY KEY (`nid`),
    FOREIGN key (`companysend`)
        REFERENCES `Company` (`cname`),
    FOREIGN key (`semailsend`)
        REFERENCES `Student` (`semail`),
    FOREIGN KEY (`semailreceive`)
        REFERENCES `Student` (`semail`),
    FOREIGN KEY (`jid`)
        REFERENCES `JobAnnouncement`(`jid`)
);

CREATE TABLE `Message` (
    `mid` INT NOT NULL,
    `semailsend` VARCHAR(20) NOT NULL,
    `semailreceive` VARCHAR(20) NOT NULL,
    `content` VARCHAR(200) NOT NULL,
    `sendtime` date NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    PRIMARY KEY (`mid`),
    FOREIGN key (`semailsend`)
        REFERENCES `Student` (`semail`),
    FOREIGN KEY (`semailreceive`)
        REFERENCES `Student` (`semail`)
);
