-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Dec 03, 2015 at 11:55 AM
-- Server version: 5.6.27
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ezsched4_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Course`
--

CREATE TABLE IF NOT EXISTS `Course` (
  `CourseID` varchar(20) NOT NULL,
  `ScheduleTimes` varchar(32) DEFAULT '0',
  PRIMARY KEY (`CourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Course`
--

INSERT INTO `Course` (`CourseID`, `ScheduleTimes`) VALUES
('CS100-AL1', '00100000000000000000000010000000'),
('CS101-AL1', '10100000000000000100000000000000'),
('CS105-AL1', '10000000000000000001000000000000'),
('CS105-AL2', '00100000000000000001000000000000'),
('CS125-AL1', '10101000000000000100000000000000'),
('CS125-AL2', '10101000000000000000010000000000'),
('CS125-AL3', '10101000000000000000001000000000'),
('CS125-AYA', '01000000000000000110000000000000'),
('CS125-AYB', '01000000000000000001100000000000'),
('CS125-AYC', '01000000000000000000011000000000'),
('CS125-AYD', '01000000000000000000000110000000'),
('CS125-AYE', '01000000000000000000000001100000'),
('CS125-AYF', '01000000000000000000000000011000'),
('CS125-AYG', '00100000000000000110000000000000'),
('CS125-AYH', '00100000000000000001100000000000'),
('CS125-AYI', '00100000000000000000011000000000'),
('CS125-AYJ', '00100000000000000000000110000000'),
('CS125-AYK', '00100000000000000000000001100000'),
('CS125-AYL', '00100000000000000000011000000000'),
('CS125-AYM', '01000000000000000000000001100000'),
('CS125-AYN', '00100000000000000001100000000000'),
('CS125-AYO', '00100000000000000000000011000000'),
('CS125-AYP', '00100000000000000000000000110000'),
('CS125-AYQ', '00100000000000000000000110000000'),
('CS125-AYR', '00100000000000000000000011000000'),
('CS173-ADA', '00010000000000000000001000000000'),
('CS173-ADB', '00010000000000000000000100000000'),
('CS173-ADC', '00010000000000000000000010000000'),
('CS173-ADD', '00010000000000000000000001000000'),
('CS173-ADE', '00001000000000000100000000000000'),
('CS173-ADF', '00001000000000000010000000000000'),
('CS173-ADG', '00001000000000000001000000000000'),
('CS173-ADH', '00001000000000000000100000000000'),
('CS173-ADI', '00001000000000000000010000000000'),
('CS173-ADJ', '00001000000000000000001000000000'),
('CS173-AL1', '01010000000000000110000000000000'),
('CS173-BDA', '00001000000000000001000000000000'),
('CS173-BDB', '00001000000000000000100000000000'),
('CS173-BDC', '00001000000000000000010000000000'),
('CS173-BDD', '00001000000000000000001000000000'),
('CS173-BDE', '00001000000000000000000100000000'),
('CS173-BDF', '00001000000000000000000010000000'),
('CS173-BL2', '01010000000000000001100000000000'),
('CS196-S2', '01000000000000000000000000011100'),
('CS210-AL1', '10000000000000000000000100000000'),
('CS225-AL1', '10101000000000000001000000000000'),
('CS225-AL2', '10101000000000000000100000000000'),
('CS225-AYB', '00100000000000000000000000011000'),
('CS225-AYC', '00010000000000000110000000000000'),
('CS225-AYD', '00010000000000000001100000000000'),
('CS225-AYE', '00010000000000000000011000000000'),
('CS225-AYF', '00010000000000000000000110000000'),
('CS225-AYG', '00010000000000000000000001100000'),
('CS225-AYH', '00010000000000000000000000011000'),
('CS225-AYI', '00001000000000000110000000000000'),
('CS225-AYJ', '00001000000000000001100000000000'),
('CS225-AYK', '00001000000000000000011000000000'),
('CS225-AYL', '00001000000000000000000110000000'),
('CS225-AYM', '00001000000000000000000001100000'),
('CS225-AYN', '00010000000000000001100000000000'),
('CS225-AYO', '00010000000000000000011000000000'),
('CS225-AYP', '00010000000000000000000110000000'),
('CS225-AYQ', '00001000000000000000011000000000'),
('CS225-AYR', '00001000000000000000000110000000'),
('CS225-AYS', '00010000000000000110000000000000'),
('CS225-AYT', '00010000000000000000000001100000'),
('CS225-AYU', '00001000000000000110000000000000'),
('CS225-AYV', '00001000000000000000000001100000'),
('CS233-AL1', '10101000000000000010000000000000'),
('CS233-AL2', '10101000000000000001000000000000'),
('CS233-AYA', '10000000000000000001100000000000'),
('CS233-AYB', '10000000000000000000110000000000'),
('CS233-AYC', '10000000000000000000011000000000'),
('CS233-AYD', '10000000000000000000001100000000'),
('CS233-AYE', '10000000000000000000000110000000'),
('CS233-AYF', '10000000000000000000000011000000'),
('CS233-AYG', '01000000000000000001100000000000'),
('CS233-AYH', '01000000000000000000110000000000'),
('CS233-AYI', '01000000000000000000011000000000'),
('CS233-AYJ', '01000000000000000000001100000000'),
('CS233-AYK', '01000000000000000000000110000000'),
('CS233-AYL', '01000000000000000000000011000000'),
('CS241-AD0', '00010000000000000110000000000000'),
('CS241-AD1', '00010000000000000001100000000000'),
('CS241-AD2', '00010000000000000000011000000000'),
('CS241-AD3', '00010000000000000000001100000000'),
('CS241-AD4', '00010000000000000000000110000000'),
('CS241-AD5', '00010000000000000000000001100000'),
('CS241-AL1', '10101000000000000000100000000000'),
('CS242-AL1', '10000000000000000000000100000000'),
('CS296-41', '00100000000000000000000000011000'),
('CS357', '0'),
('CS357-M', '01010000000000000110000000000000'),
('CS411-Q3', '01010000000000000000000110000000'),
('CS411-Q4', '01010000000000000000000110000000'),
('CS412-P3', '01010000000000000001100000000000'),
('CS412-P4', '01010000000000000001100000000000'),
('CS413-D13', '10101000000000000001000000000000'),
('CS413-D14', '10101000000000000001000000000000'),
('CS413-E13', '10101000000000000000010000000000'),
('CS413-E14', '10101000000000000000010000000000'),
('CS418-AL1', '10101000000000000000110000000000'),
('CS418-AL2', '10101000000000000000110000000000'),
('CS420-D3', '00101000000000000001100000000000'),
('CS420-D4', '00101000000000000001100000000000'),
('CS421-D3', '01010000000000000000001100000000'),
('CS421-D4', '01010000000000000000001100000000'),
('CS425-P3', '01010000000000000000001100000000'),
('CS425-P4', '01010000000000000000001100000000'),
('CS426-N3', '01010000000000000000110000000000'),
('CS426-N4', '01010000000000000000110000000000'),
('CS427-S3', '01010000000000000000110000000000'),
('CS427-S4', '01010000000000000000110000000000'),
('CS431-AE3', '00101000000000000000110000000000'),
('CS431-AE4', '00101000000000000000110000000000'),
('CS433-T3', '01010000000000000001100000000000'),
('CS433-T4', '01010000000000000001100000000000'),
('CS438-X3', '10100000000000000000000110000000'),
('CS438-X4', '10100000000000000000000110000000'),
('CS439-B3', '00101000000000000001100000000000'),
('CS439-B4', '00101000000000000001100000000000'),
('CS440-Q3', '01010000000000000000000110000000'),
('CS440-Q4', '01010000000000000000000110000000'),
('CS446-D3', '01010000000000000000110000000000'),
('CS446-D4', '01010000000000000000110000000000'),
('CS447-N3', '01010000000000000000001100000000'),
('CS447-N4', '01010000000000000000001100000000'),
('CS450-BL1', '10101000000000000001000000000000'),
('CS450-BL2', '10101000000000000001000000000000'),
('CS461-A3', '00101000000000000000000110000000'),
('CS461-A4', '00101000000000000000000110000000'),
('CS465-M3', '01010000000000000110000000000000'),
('CS465-M4', '01010000000000000110000000000000'),
('CS476-D3', '01010000000000000110000000000000'),
('CS476-D4', '01010000000000000110000000000000'),
('CS477-B3', '00101000000000000000110000000000'),
('CS477-B4', '00101000000000000000110000000000'),
('CS481-E', '10100000000000000000000110000000'),
('CS481-G', '10100000000000000000000110000000'),
('CS483-AL', '01010000000000000110000000000000'),
('CS491-CB', '00010000000000000000000001100000'),
('CS492-CS', '00100000000000000000000110000000'),
('CS498-AL1', '10100000000000000011000000000000'),
('CS498-BL1', '01010000000000000001100000000000'),
('CS498-CL1', '10101000000000000010000000000000'),
('CS498-DL1', '01010000000000000001100000000000'),
('CS498-GFD', '00101000000000000110000000000000'),
('CS498-IDS', '01000000000000000111000000000000'),
('CS498-MP3', '00101000000000000001100000000000'),
('CS498-SL3', '01010000000000000000110000000000'),
('CS498-SL4', '01010000000000000000110000000000'),
('CS519-P', '10100000000000000000001100000000'),
('CS527-S', '00101000000000000000001100000000'),
('CS541-B', '00101000000000000110000000000000'),
('CS549-A', '01010000000000000000000110000000'),
('CS554-C', '01010000000000000001100000000000'),
('CS565-S', '01010000000000000000000110000000'),
('CS571-D1', '10101000000000000001000000000000'),
('CS572-F1', '10101000000000000000001000000000'),
('CS574-R', '01010000000000000000110000000000'),
('CS575-E1', '10101000000000000000010000000000'),
('CS591-BIO', '10000000000000000010000000000000'),
('CS591-CCR', '00100000000000000000000001100000'),
('CS591-FM', '00001000000000000000000110000000'),
('CS591-HCI', '01000000000000000001000000000000'),
('CS591-IG', '00100000000000000000011000000000'),
('CS591-KGK', '01010000000000000000001100000000'),
('CS591-MP', '01010000000000000000001100000000'),
('CS591-PHD', '10000000000000000001000000000000'),
('CS591-PS', '00101000000000000000000110000000'),
('CS591-RAR', '10000000000000000000000011000000'),
('CS591-RK', '10100000000000000011000000000000'),
('CS591-TA', '10000000000000000000000100000000'),
('CS591-TAR', '01010000000000000110000000000000'),
('CS591-TCS', '10000000000000000010000000000000'),
('CS598-AGP', '10100000000000000110000000000000'),
('CS598-AK', '00101000000000000110000000000000'),
('CS598-APK', '00101000000000000000001100000000'),
('CS598-DAF', '10101000000000000001000000000000'),
('CS598-DHP', '10100000000000000110000000000000'),
('CS598-HS', '01010000000000000000110000000000'),
('CS598-JGE', '00101000000000000000001100000000'),
('CS598-JP', '01010000000000000000001100000000');

-- --------------------------------------------------------

--
-- Table structure for table `Event`
--

CREATE TABLE IF NOT EXISTS `Event` (
  `EventName` varchar(20) NOT NULL DEFAULT '',
  `GroupID` varchar(20) NOT NULL DEFAULT '',
  `ScheduleTimes` varchar(32) NOT NULL DEFAULT '0',
  PRIMARY KEY (`EventName`,`GroupID`,`ScheduleTimes`),
  KEY `GroupID` (`GroupID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Event`
--

INSERT INTO `Event` (`EventName`, `GroupID`, `ScheduleTimes`) VALUES
('Gamebuilders Meeting', 'acm', '01000000000000000000000000010000'),
('GLUG Meeting', 'acm', '01000000000000000000000000001000'),
('ICPC Meeting', 'acm', '01000000000000000000000000100000'),
('OpenNSM Meeting', 'acm', '01000000000000000000000000100000'),
('SIGArt Meeting', 'acm', '00000010000000000000010000000000'),
('SIGBED Meeting', 'acm', '00100000000000000000000000010000'),
('SIGBio Meeting', 'acm', '01000000000000000000000001000000'),
('SIGBot Meeting', 'acm', '00000100000000000000001000000000'),
('SIGCHI Meeting', 'acm', '00100000000000000000000001000000'),
('SIGEducation Meeting', 'acm', '10000000000000000000000000100000'),
('SIGGRAPH Meeting', 'acm', '10000000000000000000000000010000'),
('SIGMIS Meeting', 'acm', '00010000000000000000000000010000'),
('SIGMobile Meeting', 'acm', '10000000000000000000000000100000'),
('SIGMusic Meeting', 'acm', '00100000000000000000000000001000'),
('SIGOps Meeting', 'acm', '00100000000000000000000000100000'),
('SIGPlan Meeting', 'acm', '00000010000000000000000100000000'),
('SIGPwny Meeting', 'acm', '00010000000000000000000000010000'),
('SIGSoft Meeting', 'acm', '00010000000000000000000000100000'),
('WebMonkeys Meeting', 'acm', '10000000000000000000000000010000'),
('General Meeting', 'chessclub', '00000010000000000000000000010000'),
('General Meeting', 'chessclub', '00000010000000000000000000100000'),
('General Meeting', 'chessclub', '00100000000000000000000000010000'),
('bad event 1', 'nobe', '10000000000000000000100000000000'),
('bad event 2', 'nobe', '00100000000000000000100000000000'),
('bad event 3', 'nobe', '01000000000000000000000100000000'),
('General Meeting', 'nobe', '10000000000000000000000001000000'),
('KSM Meeting', 'nobe', '00100000000000000000000000100000'),
('Meeting', 'tagcps', '01000000000000000000000000010000'),
('General Meeting', 'tagdsp', '00010000000000000000000000100000'),
('Meeting!', 'tagenergy', '00000010000000000000010000000000');

-- --------------------------------------------------------

--
-- Table structure for table `Interest`
--

CREATE TABLE IF NOT EXISTS `Interest` (
  `Interest` varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`Interest`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Interest`
--

INSERT INTO `Interest` (`Interest`) VALUES
('aaa'),
('Artificial Intelligence'),
('Audio Processing'),
('Biological Computing'),
('BitCoins'),
('Blitz'),
('Business'),
('Chess'),
('Christianity'),
('Coding'),
('Combinatorics'),
('Competition'),
('Computer Graphics'),
('Computer Science'),
('Cooking'),
('Crypt-Currency'),
('Cryptography'),
('cs'),
('Eastern Europe'),
('Eastern Europe History'),
('ece'),
('Education'),
('Embedded Systems'),
('Engineering'),
('Entrepreneur'),
('football'),
('Free Speech'),
('Game Development'),
('Gardening'),
('GNU'),
('Graphic Design'),
('handegg'),
('Human Computer Interaction'),
('Human-Computer Interaction'),
('Leadership'),
('Linux'),
('Management Information Systems'),
('Mechanical Engineering'),
('Mobile Development'),
('Music'),
('Networking'),
('Open Source Network Security M'),
('Operating Systems'),
('p'),
('Potatoes'),
('Power Systems'),
('Privacy'),
('Robotics'),
('Security'),
('Signal Processing'),
('Sleeping'),
('Software Development'),
('Software Engineering'),
('Statistics'),
('Studying'),
('Technology'),
('test'),
('TETS'),
('Virtual Reality'),
('Web Development');

-- --------------------------------------------------------

--
-- Table structure for table `Looks`
--

CREATE TABLE IF NOT EXISTS `Looks` (
  `UserID` varchar(20) NOT NULL DEFAULT '',
  `Interest` varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`UserID`,`Interest`),
  KEY `Interest` (`Interest`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Looks`
--

INSERT INTO `Looks` (`UserID`, `Interest`) VALUES
('alexwu', 'Business'),
('arnavmishra', 'Business'),
('admin', 'Chess'),
('admin', 'Christianity'),
('royli', 'Combinatorics'),
('allenchi', 'Computer Science'),
('angelazhu', 'Computer Science'),
('arnavmishra', 'Computer Science'),
('harrisonding', 'Computer Science'),
('jameslee', 'Computer Science'),
('jtang', 'Computer Science'),
('michellecheng', 'Computer Science'),
('royli', 'Computer Science'),
('shannonbowman', 'Computer Science'),
('tt', 'Computer Science'),
('vanessawang', 'Computer Science'),
('conniefan', 'Cooking'),
('tt', 'cs'),
('admin', 'Eastern Europe History'),
('tt', 'ece'),
('alexwu', 'Engineering'),
('allenchi', 'Engineering'),
('angelazhu', 'Engineering'),
('harrisonding', 'Engineering'),
('jameslee', 'Engineering'),
('jtang', 'Engineering'),
('michellecheng', 'Engineering'),
('royli', 'Engineering'),
('shannonbowman', 'Engineering'),
('tt', 'Engineering'),
('vanessawang', 'Engineering'),
('angelazhu', 'Graphic Design'),
('jtang', 'Graphic Design'),
('jtang', 'Leadership'),
('jtang', 'Security'),
('admin', 'Statistics'),
('admin', 'Studying'),
('admin', 'Virtual Reality'),
('conniefan', 'Virtual Reality'),
('admin', 'Web Development');

-- --------------------------------------------------------

--
-- Table structure for table `Organization`
--

CREATE TABLE IF NOT EXISTS `Organization` (
  `GroupID` varchar(20) NOT NULL DEFAULT '',
  `GroupName` varchar(20) DEFAULT NULL,
  `GroupPassword` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`GroupID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Organization`
--

INSERT INTO `Organization` (`GroupID`, `GroupName`, `GroupPassword`) VALUES
('acm', 'ACM', 'test'),
('chessclub', 'Chess Club', 'test'),
('nobe', 'NOBE', 'test'),
('tagcps', 'TAG CPS', 'test'),
('tagdsp', 'TAG DSP', 'test'),
('tagenergy', 'TAG Energy', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `Person`
--

CREATE TABLE IF NOT EXISTS `Person` (
  `UserID` varchar(20) NOT NULL DEFAULT '',
  `FirstName` varchar(20) DEFAULT NULL,
  `LastName` varchar(20) DEFAULT NULL,
  `UserPassword` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Person`
--

INSERT INTO `Person` (`UserID`, `FirstName`, `LastName`, `UserPassword`) VALUES
('Admin', 'George', 'Ruan', 'admin'),
('alexwu', 'Alex', 'Wu', 'test'),
('allenchi', 'Allen', 'Chi', 'test'),
('angelazhu', 'Angela', 'Zhu', 'test'),
('arnavmishra', 'Arnav', 'Mishra', 'test'),
('conniefan', 'Connie', 'Fan', 'test'),
('ee', 'Joseph', 'Savastano', 'ss'),
('harrisonding', 'Harrison', 'Ding', 'test'),
('jameslee', 'James', 'Lee', 'test'),
('jtang', 'Jeremy', 'Tang', 'test'),
('michellecheng', 'Michelle', 'Cheng', 'test'),
('royli', 'Roy', 'Li', 'test'),
('shannonbowman', 'Shannon', 'Bowman', 'test'),
('sjzhang', 'Shawn', 'Zhang', 'test'),
('tt', 'tt', 'tt', 'tt'),
('vanessawang', 'Vanessa', 'Wang', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `Relates`
--

CREATE TABLE IF NOT EXISTS `Relates` (
  `GroupID` varchar(20) NOT NULL DEFAULT '',
  `Interest` varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`GroupID`,`Interest`),
  KEY `Interest` (`Interest`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Relates`
--

INSERT INTO `Relates` (`GroupID`, `Interest`) VALUES
('acm', 'Artificial Intelligence'),
('tagdsp', 'Audio Processing'),
('acm', 'Biological Computing'),
('acm', 'BitCoins'),
('chessclub', 'Blitz'),
('nobe', 'Business'),
('chessclub', 'Chess'),
('acm', 'Coding'),
('acm', 'Competition'),
('acm', 'Computer Graphics'),
('acm', 'Cryptography'),
('acm', 'Education'),
('acm', 'Embedded Systems'),
('tagcps', 'Embedded Systems'),
('nobe', 'Engineering'),
('tagcps', 'Engineering'),
('tagdsp', 'Engineering'),
('tagenergy', 'Engineering'),
('nobe', 'Entrepreneur'),
('acm', 'Free Speech'),
('acm', 'Game Development'),
('acm', 'GNU'),
('acm', 'Human Computer Interaction'),
('acm', 'Linux'),
('acm', 'Management Information Systems'),
('tagcps', 'Mechanical Engineering'),
('acm', 'Mobile Development'),
('acm', 'Music'),
('tagcps', 'Networking'),
('acm', 'Open Source Network Security M'),
('acm', 'Operating Systems'),
('tagenergy', 'Power Systems'),
('acm', 'Privacy'),
('acm', 'Robotics'),
('acm', 'Security'),
('acm', 'Software Development'),
('acm', 'Software Engineering'),
('acm', 'Technology'),
('acm', 'Virtual Reality'),
('acm', 'Web Development');

-- --------------------------------------------------------

--
-- Table structure for table `Takes`
--

CREATE TABLE IF NOT EXISTS `Takes` (
  `UserID` varchar(20) NOT NULL,
  `CourseID` varchar(20) NOT NULL,
  PRIMARY KEY (`UserID`,`CourseID`),
  KEY `CourseID` (`CourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Takes`
--

INSERT INTO `Takes` (`UserID`, `CourseID`) VALUES
('harrisonding', 'CS125-AL1'),
('harrisonding', 'CS173-BL2'),
('allenchi', 'CS196-S2'),
('harrisonding', 'CS196-S2'),
('angelazhu', 'CS225-AL1'),
('conniefan', 'CS225-AL1'),
('jameslee', 'CS225-AL1'),
('michellecheng', 'CS225-AL1'),
('shannonbowman', 'CS225-AL1'),
('vanessawang', 'CS225-AL1'),
('jameslee', 'CS233-AL1'),
('michellecheng', 'CS233-AL1'),
('shannonbowman', 'CS233-AL1'),
('vanessawang', 'CS233-AL1'),
('arnavmishra', 'CS233-AL2'),
('admin', 'CS241-AL1'),
('alexwu', 'CS241-AL1'),
('arnavmishra', 'CS241-AL1'),
('jtang', 'CS241-AL1'),
('royli', 'CS241-AL1'),
('sjzhang', 'CS241-AL1'),
('tt', 'CS357'),
('admin', 'CS411-Q3'),
('jtang', 'CS411-Q3'),
('sjzhang', 'CS411-Q3'),
('jtang', 'CS418-AL1'),
('admin', 'CS498-SL3'),
('conniefan', 'CS498-SL3');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Event`
--
ALTER TABLE `Event`
  ADD CONSTRAINT `Event_ibfk_1` FOREIGN KEY (`GroupID`) REFERENCES `Organization` (`GroupID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Looks`
--
ALTER TABLE `Looks`
  ADD CONSTRAINT `Looks_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Person` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Looks_ibfk_2` FOREIGN KEY (`Interest`) REFERENCES `Interest` (`Interest`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Relates`
--
ALTER TABLE `Relates`
  ADD CONSTRAINT `Relates_ibfk_1` FOREIGN KEY (`GroupID`) REFERENCES `Organization` (`GroupID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Relates_ibfk_2` FOREIGN KEY (`Interest`) REFERENCES `Interest` (`Interest`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Takes`
--
ALTER TABLE `Takes`
  ADD CONSTRAINT `Takes_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Person` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Takes_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
