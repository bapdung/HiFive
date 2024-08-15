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
-- Table structure for table `creator_profile`
--

DROP TABLE IF EXISTS `creator_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `creator_profile` (
  `follower` int NOT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `creator_id` bigint NOT NULL,
  `creator_profile_id` bigint NOT NULL AUTO_INCREMENT,
  `modified_date` datetime(6) DEFAULT NULL,
  `creator_name` varchar(50) DEFAULT NULL,
  `description` varchar(100) NOT NULL,
  `link` varchar(200) NOT NULL,
  `creator_img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`creator_profile_id`),
  UNIQUE KEY `UKk2cghcars8s85v6vccv7p70uu` (`creator_id`),
  CONSTRAINT `FKe4ra95v8vc068mwm81rsrhvov` FOREIGN KEY (`creator_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `creator_profile`
--

LOCK TABLES `creator_profile` WRITE;
/*!40000 ALTER TABLE `creator_profile` DISABLE KEYS */;
INSERT INTO `creator_profile` VALUES (2,'2024-08-12 17:39:26.669419',21,67,'2024-08-14 19:30:25.758166','혁지닝','Creator profile for 김혁진','https://hifivebucket2024.s3.ap-northeast-2.amazonaws.com/test/fc976eb8-a09a-4fa5-8de1-80172fc85254-%EC%86%8C%EB%B9%84%EB%82%B4%EC%97%AD%ED%8E%98%EC%9D%B4%EC%A7%80.png','https://pbs.twimg.com/media/GAsLtkNakAApwfr.jpg:large'),(4,'2024-08-12 17:39:26.669420',23,68,'2024-08-14 14:26:23.022163','워누킹','안녕하세요 게임유튜버 워누킹입니다! 우리 워닝이들이 좋아할만한 영상을 업로드 할게요! ','https://www.youtube.com/@wonuuking','https://velog.velcdn.com/images/bapdung/post/040c6ef8-661d-4cd7-99d4-1a2c0d329b40/image.PNG'),(1,'2024-08-12 17:39:26.669421',3,69,'2024-08-13 09:46:19.856555','말왕','장충동 왕족발 보쌈 말왕입니다.','https://www.youtube.com/@MrRagoona88','https://yt3.googleusercontent.com/GZCBsV1QRhy6iaKg88ePIegm39dIZmvYn4SrgFufVLjEWccIhj-GKA5q2nPfgf2lkNDflUwKcQ=s160-c-k-c0x00ffffff-no-rj'),(0,'2024-08-12 17:39:26.669422',4,70,NULL,'쯔양','쯔양의 4kg 소곱창 먹방','https://www.youtube.com/@tzuyang6145','https://yt3.googleusercontent.com/_s3C7XpwVKVr_5gDrmYJh9AOkU3wFlY9FWyZBVGVP_v7B09P5O4bbEZaWGpiuyT78Dk-aElE=s160-c-k-c0x00ffffff-no-rj'),(0,'2024-08-12 17:39:26.669423',5,71,NULL,'레오제이','뷰티유튜버 레오제이의 화장 교실','https://www.youtube.com/@LeoJMakeup','https://yt3.googleusercontent.com/ytc/AIdro_n_prkAS2s-jB2JHHI7g0tstz6iohY_6qBqQ6lxKra2vYg=s160-c-k-c0x00ffffff-no-rj'),(1,'2024-08-12 17:39:26.669424',6,72,'2024-08-13 12:17:25.219206','랄랄','304호 !! 월세 내세요... 안녕하세요 랄랄입니다.','https://www.youtube.com/@ralral','https://yt3.googleusercontent.com/4q05A_gD4lVGBRHwHPVmebgJUeGWJgfpHufqOH3UGGsNQXDjvG2JqIuao2Wu67ZQAPVI7eKl5Q=s160-c-k-c0x00ffffff-no-rj'),(0,'2024-08-12 17:39:26.669425',7,73,NULL,'입짧은햇님','햇싸리들 햇님이에요 즐거운 방송해요 ^^','https://www.youtube.com/@short_mouth_sun','https://yt3.googleusercontent.com/ytc/AIdro_n8GWMXO3-vfaHAUr-apAL306G77SNhhqkU4R4xD6boUyk=s160-c-k-c0x00ffffff-no-rj'),(0,'2024-08-12 17:39:26.669426',8,74,NULL,'히밥','성인남성 4명보다 많이 먹는 히밥입니다','https://www.youtube.com/@heebab','https://yt3.googleusercontent.com/sL5ugPfl9vvwRwhf6l5APY__BZBw8qWiwgHs-uVsMPFoD5-a4opTJIcRSyrY8aY5LEESOMWJ=s160-c-k-c0x00ffffff-no-rj'),(2,'2024-08-12 17:39:26.669427',9,75,'2024-08-15 20:01:18.469755','삼식','귀여운 비버 삼식이 보러오세요','https://www.youtube.com/@samsik23','https://yt3.googleusercontent.com/bSxVGafwyBPpfdDpwPRlc8VFh0F6N4yPgqHt5Ry-qFzz2Bsa7UC6zjPB64fiW_6RV13P5AnItg=s160-c-k-c0x00ffffff-no-rj'),(1,'2024-08-12 17:39:26.669428',10,76,'2024-08-12 17:39:39.073665','나도','나도의 즐거운 먹방 함께 보실까요?','https://www.youtube.com/@nado1123','https://yt3.googleusercontent.com/ytc/AIdro_kBVAH11ctESeqFZnDSgQMDxBoE8j6rlG-VsJty2ioylsI=s160-c-k-c0x00ffffff-no-rj'),(0,'2024-08-12 17:39:26.669429',11,77,NULL,'떵개떵','떵개의 오늘의 먹방은 무뼈국물닭발! 보러오세요','https://www.youtube.com/@user-pq8xn3oq9y','https://yt3.googleusercontent.com/C7zljo2xjnVIymxABpreeRKc_cYXp6Hgd27f5eeDjmKDYIGJ5x1QC-t3gEy2_u4YJMLK4DvgkNE=s160-c-k-c0x00ffffff-no-rj'),(2,'2024-08-12 17:39:26.669430',12,78,'2024-08-13 12:17:20.432998','빵빵이의 일상','빵빵이와 옥지의 일상','https://www.youtube.com/@b2ang','https://yt3.googleusercontent.com/IVnIPaGQG4P511VC9KT5izi6Qqn9qPJuXCjNWY5ui--TJWGZkE-NlG0L03OoJaRs8y6R-FO4Ow=s160-c-k-c0x00ffffff-no-rj'),(1,'2024-08-12 17:39:26.669431',13,79,'2024-08-13 16:47:13.600590','침착맨','침착맨의 게임방송','https://www.youtube.com/@ChimChakMan_Official','https://yt3.googleusercontent.com/C7bTHnoo1S_MRbJXn4VwncNpB87C2aioJC_sKvgM-CGw_xgdxwiz0EFEqzj0SRVz6An2h81T4Q=s160-c-k-c0x00ffffff-no-rj'),(0,'2024-08-12 17:39:26.669432',14,80,NULL,'강유미','강유미의 ASMR','https://www.youtube.com/@yumikang1351','https://yt3.googleusercontent.com/ytc/AIdro_nq0LKCKvEUHQ_pAke_5X3dXmnfsaILlq5nFMyy8n7jmL0=s160-c-k-c0x00ffffff-no-rj'),(1,'2024-08-12 17:39:26.669433',15,81,'2024-08-13 08:58:50.936466','아야츠노 유니','유니의 방송 기대헤주시라궁','https://www.youtube.com/@ayatsunoyuni','https://yt3.googleusercontent.com/6aLD9HFfsbrYC0ZeIZaKE_lFQVjTGG30J3wja_vCL5TL0QBpokmWKbWjeAj_LJsxz_OQ7jfr=s160-c-k-c0x00ffffff-no-rj'),(1,'2024-08-12 17:39:26.669434',16,82,'2024-08-15 20:01:35.141235','1분요리 뚝딱이형','뚝딱! 잼민아 오늘의 요리는 기대해주시라','https://www.youtube.com/@1mincook','https://yt3.googleusercontent.com/eRa3Cs-xC1xkUkby4-sJpZ5ewoUMoPq3mBntjAO8Y-I0D_U34dSceqjirMM2bGJuEWpLJMzu=s160-c-k-c0x00ffffff-no-rj'),(0,'2024-08-12 17:39:26.669435',17,83,NULL,'장삐쭈','장삐쭈의 재밌는 더빙 영상','https://www.youtube.com/@studio_jbbj','https://yt3.googleusercontent.com/ytc/AIdro_ljD6suYfAJ9goPXll3zn7a3f5uS437vD7YITHGrCcV6W4=s160-c-k-c0x00ffffff-no-rj'),(0,'2024-08-12 17:39:26.669436',18,84,NULL,'상윤쓰','상윤쓰입니다. 맛있는 먹방 많관부','https://www.youtube.com/@Sangyoon','https://yt3.googleusercontent.com/ytc/AIdro_kPCz8WI08HYCFfVXgfpmauKabJp1YBqXq6bPJ1pAW9WW4=s160-c-k-c0x00ffffff-no-rj'),(0,'2024-08-12 17:39:26.669437',19,85,NULL,'양띵','양띵의 마크 방송입니다.','https://www.youtube.com/@%EC%96%91%EB%9D%B5','https://yt3.googleusercontent.com/LNJOAPntV6EY6BFK1AajtQEn9LHVY2sCE_e25x6PffUkum2uLzNSsOm16zUArkRGlV6X-kWdTTM=s160-c-k-c0x00ffffff-no-rj'),(0,'2024-08-12 17:39:26.669438',39,86,NULL,'아모띠','아모띠 amotti입니다 잘 부탁 드려요.','https://www.youtube.com/@amotti1','https://yt3.googleusercontent.com/azQybzycm8aWQyOIjau0ChgI8MlNNWT3tf9oJIR_TRTb5Pf_Oi4JgtnCo1eGAHMwFovdMQ6Z=s160-c-k-c0x00ffffff-no-rj');
/*!40000 ALTER TABLE `creator_profile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-15 22:43:13
