--INSERT INTO `User` (`uid`, `uname`, `uaddress`, `uphone`, `ucity`) VALUES (`101`, `User1`, `1 1st st`, `1234567890`, `Brooklyn`);

-- All the data in this file is used for testing and all of the are created by developer

/*
    format of student:
    `semail` VARCHAR(20) NOT NULL,
    `skey` VARCHAR(16) NOT NULL,
    `sphone` VARCHAR(12) NOT NULL,
    `sfirstname` VARCHAR(20) NOT NULL,
    `slastname` VARCHAR(20) NOT NULL,
    `suniversity` VARCHAR(40)  NULL,
    `smajor` VARCHAR(5)  NULL,
    `sgpa` VARCHAR(5)  NULL,
    `sresume` VARCHAR(40)  NULL,

  */

INSERT INTO `Student` (`semail`, `skey`, `sphone`, `sfirstname`, `slastname`, `suniversity`, `smajor`, `sgpa`, `sresume`,`sprivacy`)
VALUES ('dx1368@nyu.edu', '12345678', '9998887777', 'Da', 'Xu', 'New York University', 'ECE', '4.0', 'xxxxx',TRUE);
INSERT INTO `Student` (`semail`, `skey`, `sphone`, `sfirstname`, `slastname`, `suniversity`, `smajor`, `sgpa`, `sresume`,`sprivacy`)
VALUES ('cz1522@nyu.edu', '12345678', '9998886666', 'Cong', 'Zhang', 'New York University', 'CS', '4.0', 'xxxxx', TRUE);
INSERT INTO `Student` (`semail`, `skey`, `sphone`, `sfirstname`, `slastname`, `suniversity`, `smajor`, `sgpa`, `sresume`,`sprivacy`)
VALUES ('qy1449@nyu.edu', '12345678', '9998884444', 'Qian', 'Yu', 'New York University', 'CS', '4.0', 'xxxxx',TRUE);
INSERT INTO `Student` (`semail`, `skey`, `sphone`, `sfirstname`, `slastname`, `suniversity`, `smajor`, `sgpa`, `sresume`,`sprivacy`)
VALUES ('sy1567@nyu.edu', '12345678', '9998882222', 'Song', 'Yan', 'New York University', 'ECE', '2.8', 'xxxxx',FALSE);

/*
    format of company:
    `cname` VARCHAR(45) NOT NULL,
    `ckey` VARCHAR(45) NOT NULL,
    `cemail` VARCHAR(10) NOT NULL,
    `clocation` VARCHAR(45) NOT NULL,
    `cphone` VARCHAR(12) NOT NULL,
    `cindusty` VARCHAR(45) NULL,
    `cdescription` VARCHAR(200) NULL,
*/
INSERT INTO `Company` (`cname`, `ckey`, `cemail`, `clocation`, `cphone`, `cindusty`, `cdescription`)
VALUES ('ZhuYuanzhang', '1', 'yuanzhang@ming.com', 'Nanjing', '1368139811', 'CS', 'xxxxx');
INSERT INTO `Company` (`cname`, `ckey`, `cemail`, `clocation`, `cphone`, `cindusty`, `cdescription`)
VALUES ('ZhuDi', '2', 'di@ming.com', 'Nanjing', '1402142411', 'CS', 'xxxxx');
INSERT INTO `Company` (`cname`, `ckey`, `cemail`, `clocation`, `cphone`, `cindusty`, `cdescription`)
VALUES ('ZhuHoucong', '11', 'Houcong@ming.com', 'Beijing', '1521156611', 'CS', 'xxxxx');
INSERT INTO `Company` (`cname`, `ckey`, `cemail`, `clocation`, `cphone`, `cindusty`, `cdescription`)
VALUES ('ZhuZaiji', '12', 'Zaiji@ming.com', 'Beijing', '1566157211', 'CS', 'xxxxx');

/*format of job

    `jid` VARCHAR(10) NOT NULL,
    `jlocation` VARCHAR(45) NULL,
    `jtitle` VARCHAR(45) NULL,
    `jsalary` VARCHAR(45) NULL,
    `jreq_diploma` VARCHAR(45) NULL,
    `jreq_experience` VARCHAR(45) NULL,
    `jreq_skills` VARCHAR(90) NULL,
    `jdescription` VARCHAR(200),
*/
INSERT INTO `JobAnnouncement` (`jid`, `jlocation`, `jtitle`, `jsalary`, `jreq_diploma`, `jreq_experience`, `jreq_skills`, `jdescription`)
VALUES ('1', 'Beijing', 'Software Engineer', '120K', 'Bachelor', '5', 'JAVA', 'XXXXXX');
INSERT INTO `JobAnnouncement` (`jid`, `jlocation`, `jtitle`, `jsalary`, `jreq_diploma`, `jreq_experience`, `jreq_skills`, `jdescription`)
VALUES ('2', 'Nanjing', 'Software Engineer', '100K', 'Bachelor', '3', 'C++', 'XXXXXX');

/*format of companypostjob
    `cname` VARCHAR(45) NOT NULL,
    `jid` VARCHAR(10) NOT NULL,
    `posttime` date,
*/
INSERT INTO `CompanyPostJob` (`cname`, `jid`, `posttime`) VALUES ('ZhuHoucong', '1', '2018-04-19');
INSERT INTO `CompanyPostJob` (`cname`, `jid`, `posttime`) VALUES ('ZhuYuanzhang', '2', '2018-04-19');

/*format of studentfollowcompany
    `semail` VARCHAR(20) NOT NULL,
    `cname` VARCHAR(45) NOT NULL,
*/
INSERT INTO `StudentFollowCompany` (`semail`, `cname`) VALUES ('sy1567@nyu.edu', 'ZhuHoucong');
INSERT INTO `StudentFollowCompany` (`semail`, `cname`) VALUES ('dx1368@nyu.edu', 'ZhuYuanzhang');

/*format of studentapplyjob
    `aid` VARCHAR(10) NOT NULL,
    `semail` VARCHAR(20) NOT NULL,
    `jid` VARCHAR(10) NOT NULL,
    `cname` VARCHAR(45) NOT NULL,
    `status` VARCHAR(10) NULL,
    `applytime` date,
*/
INSERT INTO `StudentApplyJob` (`aid`, `semail`, `jid` ,`cname` ,`status`, `applytime`)
VALUES('1', 'dx1368@nyu.edu', '2' ,'ZhuYuanzhang', 'unviewed', `2018-04-11`);

/*format of studentfriends
    `semailsend` VARCHAR(20) NOT NULL,
    `semailreceive` VARCHAR(20) NOT NULL,
    `status` VARCHAR(10) NOT NULL,
    `sendtime` date,
*/
INSERT INTO `StudentFriends` VALUES ('dx1368@nyu.edu', 'cz1522@nyu.edu', 'unviewed', '2018-04-03');
INSERT INTO `StudentFriends` VALUES ('qy1449@nyu.edu', 'cz1522@nyu.edu', 'unviewed', '2018-04-02');

/*format of notification
    `nid` VARCHAR(10) NOT NULL,
    `companysend` VARCHAR(45) NULL,
    `semailsend` VARCHAR(20) NULL,
    `semailreceive` VARCHAR(20)  NOT NULL,
    `jid` VARCHAR(10)  NOT NULL,
    `pushtime` date NOT NULL,
    `status` VARCHAR(10) NOT NULL,
*/
INSERT INTO `notification` (`nid`, `companysend` , `semailreceive`, `jid`, `pushtime`, `status`)
VALUES('1', 'ZhuYuanzhang', 'dx1368@nyu.edu', '2', '2018-04-12', 'unviewed');
INSERT INTO `notification` (`nid`, `companysend` , `semailreceive`, `jid`, `pushtime`, `status`)
VALUES('2', 'ZhuHoucong', 'sy1567@nyu.edu', '1', '2018-04-13', 'unviewed');

/*format of message
    `mid` VARCHAR(20) NOT NULL,
    `semailsend` VARCHAR(20) NOT NULL,
    `semailreceive` VARCHAR(20) NOT NULL,
    `content` VARCHAR(200) NOT NULL,
    `sendtime` date NOT NULL,
    `status` VARCHAR(10) NOT NULL,
*/
INSERT INTO `Message` (`mid`, `semailsend`, `semailreceive`, `content`, `sendtime`, `status`)
VALUES('1','dx1368@nyu.edu', 'cz1522@nyu.edu',"gaige ruhe", '2018-04-15', 'unviewed');
INSERT INTO `Message` (`mid`, `semailsend`, `semailreceive`, `content`, `sendtime`, `status`)
VALUES('1','cz1522@nyu.edu', 'qy1522@nyu.edu',"beijing baoweizhan chenggong lema", '2018-04-15', 'unviewed');