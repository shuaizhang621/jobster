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

INSERT INTO `Student` (`semail`, `skey`, `sphone`, `sfirstname`, `slastname`, `suniversity`, `smajor`, `sgpa`, `sresume`)
VALUES ('dx1368@nyu.edu', '12345678', '9998887777', 'Da', 'Xu', 'New York University', 'ECE', '4.0', 'xxxxx');
INSERT INTO `Student` (`semail`, `skey`, `sphone`, `sfirstname`, `slastname`, `suniversity`, `smajor`, `sgpa`, `sresume`)
VALUES ('cz1522@nyu.edu', '12345678', '9998886666', 'Cong', 'Zhang', 'New York University', 'CS', '4.0', 'xxxxx');
INSERT INTO `Student` (`semail`, `skey`, `sphone`, `sfirstname`, `slastname`, `suniversity`, `smajor`, `sgpa`, `sresume`)
VALUES ('qy1449@nyu.edu', '12345678', '9998884444', 'Qian', 'Yu', 'New York University', 'CS', '4.0', 'xxxxx');
INSERT INTO `Student` (`semail`, `skey`, `sphone`, `sfirstname`, `slastname`, `suniversity`, `smajor`, `sgpa`, `sresume`)
VALUES ('sy1567@nyu.edu', '12345678', '9998882222', 'Song', 'Yan', 'New York University', 'ECE', '2.8', 'xxxxx');

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