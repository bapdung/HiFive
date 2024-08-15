-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: i11a107.p.ssafy.io    Database: hifive
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo` (
  `sequence` int NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `fan_id` bigint NOT NULL,
  `fanmeeting_id` bigint NOT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `photo_id` bigint NOT NULL AUTO_INCREMENT,
  `photo_img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`photo_id`),
  KEY `FKmmjjtsmfjo2imp70g5gylniv8` (`fan_id`),
  KEY `FKj96wjbcwpc8ogipsbdxgvx2t8` (`fanmeeting_id`),
  CONSTRAINT `FKj96wjbcwpc8ogipsbdxgvx2t8` FOREIGN KEY (`fanmeeting_id`) REFERENCES `fanmeeting` (`fanmeeting_id`),
  CONSTRAINT `FKmmjjtsmfjo2imp70g5gylniv8` FOREIGN KEY (`fan_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16889 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (1,'2024-08-14 23:40:09.116140',1,109,'2024-08-14 23:40:09.116140',16865,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~8-1.webm'),(1,'2024-08-14 23:40:09.286679',23,109,'2024-08-14 23:40:09.286679',16866,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~8-23.webm'),(1,'2024-08-14 23:40:09.500512',2,109,'2024-08-14 23:40:09.500512',16867,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~8-2.webm'),(1,'2024-08-14 23:40:09.680234',24,109,'2024-08-14 23:40:09.680234',16868,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~8-24.webm'),(1,'2024-08-14 23:40:09.849677',22,109,'2024-08-14 23:40:09.849677',16869,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~8-22.webm'),(1,'2024-08-14 23:40:10.073522',21,109,'2024-08-14 23:40:10.073522',16870,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~8-21.webm'),(2,'2024-08-14 23:40:43.305399',1,109,'2024-08-14 23:40:43.305399',16871,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~9-1.webm'),(2,'2024-08-14 23:40:43.480508',23,109,'2024-08-14 23:40:43.480508',16872,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~9-23.webm'),(2,'2024-08-14 23:40:43.660773',2,109,'2024-08-14 23:40:43.660773',16873,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~9-2.webm'),(2,'2024-08-14 23:40:43.809265',24,109,'2024-08-14 23:40:43.809265',16874,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~9-24.webm'),(2,'2024-08-14 23:40:43.961315',22,109,'2024-08-14 23:40:43.961315',16875,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~9-22.webm'),(2,'2024-08-14 23:40:44.082448',21,109,'2024-08-14 23:40:44.082448',16876,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~9-21.webm'),(3,'2024-08-14 23:41:08.047323',1,109,'2024-08-14 23:41:08.047323',16877,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~10-1.webm'),(3,'2024-08-14 23:41:08.168388',23,109,'2024-08-14 23:41:08.168388',16878,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~10-23.webm'),(3,'2024-08-14 23:41:08.244463',2,109,'2024-08-14 23:41:08.244463',16879,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~10-2.webm'),(3,'2024-08-14 23:41:08.413749',24,109,'2024-08-14 23:41:08.413749',16880,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~10-24.webm'),(3,'2024-08-14 23:41:08.486772',22,109,'2024-08-14 23:41:08.486772',16881,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~10-22.webm'),(3,'2024-08-14 23:41:08.582666',21,109,'2024-08-14 23:41:08.582666',16882,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~10-21.webm'),(4,'2024-08-14 23:41:35.312424',1,109,'2024-08-14 23:41:35.312424',16883,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~11-1.webm'),(4,'2024-08-14 23:41:35.488002',23,109,'2024-08-14 23:41:35.488002',16884,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~11-23.webm'),(4,'2024-08-14 23:41:35.716710',2,109,'2024-08-14 23:41:35.716710',16885,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~11-2.webm'),(4,'2024-08-14 23:41:35.902706',24,109,'2024-08-14 23:41:35.902706',16886,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~11-24.webm'),(4,'2024-08-14 23:41:36.036632',22,109,'2024-08-14 23:41:36.036632',16887,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~11-22.webm'),(4,'2024-08-14 23:41:36.228012',21,109,'2024-08-14 23:41:36.228012',16888,'https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/photo/fanmeeting-109~11-21.webm');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-15 22:43:14
