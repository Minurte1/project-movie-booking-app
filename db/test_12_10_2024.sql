-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `binh_luan`
--

DROP TABLE IF EXISTS `binh_luan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `binh_luan` (
  `id_binh_luan` int NOT NULL AUTO_INCREMENT,
  `id_nguoi_dung` varchar(255) DEFAULT NULL,
  `id_san_pham` int NOT NULL,
  `danh_gia` int DEFAULT NULL,
  `noi_dung` text,
  `ngay_tao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_binh_luan`),
  CONSTRAINT `binh_luan_chk_1` CHECK (((`danh_gia` >= 1) and (`danh_gia` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `binh_luan`
--

LOCK TABLES `binh_luan` WRITE;
/*!40000 ALTER TABLE `binh_luan` DISABLE KEYS */;
INSERT INTO `binh_luan` VALUES (10,'phuc1',2,1,'asdasdasd','2024-10-11 14:27:51'),(11,'phuc1',1,4,'asfdasd','2024-10-11 14:31:02'),(12,'phuc1',1,4,'ádasd','2024-10-11 14:37:49'),(13,'phuc1',1,2,'zsdasdasd','2024-10-11 15:29:20'),(14,'phuc1',1,4,'ádasd','2024-10-11 15:36:11'),(15,'phuc1',1,4,'sầdasd','2024-10-11 15:43:33'),(16,'phuc1',2,5,'asdasdasdasdasdasdasdddddddc1222222','2024-10-11 15:51:24'),(17,'phuc1',2,5,'asdasdasd','2024-10-11 15:51:27'),(18,'phuc1',3,1,'BTS thật tuyệt vời tôi yêu BTS hihi','2024-10-11 16:19:13'),(19,'phuc1',3,1,'ádasdasdasd','2024-10-11 16:19:17'),(20,'phuc1',3,1,'hihi','2024-10-11 16:19:25'),(21,'phuc1',1,5,'ádasdasdasdasd','2024-10-11 16:52:33'),(22,'phuc1',1,5,'aaaaaaaaaaaaaaaaaaaaaaaa111111','2024-10-11 16:52:39');
/*!40000 ALTER TABLE `binh_luan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookingUser`
--

DROP TABLE IF EXISTS `bookingUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookingUser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `showtime` varchar(50) NOT NULL,
  `payment_method` varchar(100) DEFAULT NULL,
  `date` date NOT NULL,
  `day_of_week` varchar(10) NOT NULL,
  `seat_number` varchar(50) NOT NULL,
  `price_booking` float NOT NULL,
  `tiket_booking` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookingUser`
--

LOCK TABLES `bookingUser` WRITE;
/*!40000 ALTER TABLE `bookingUser` DISABLE KEYS */;
INSERT INTO `bookingUser` VALUES (1,'dfsdf','hohoangphucjob@gmail.com','asdasd','14:00 - 16:00','cash','2024-10-10','5','B10',80000,'Coldplay: Music of the Spheres'),(2,'dfsdf','hohoangphucjob@gmail.com','asdasd','14:00 - 16:00','creditCard','2024-10-10','5','',80000,'Coldplay: Music of the Spheres'),(3,'dfsdf','hohoangphucjob@gmail.com','asdasd','14:00 - 16:00','creditCard','2024-10-10','5','C2',80000,'Coldplay: Music of the Spheres'),(4,'dfsdf','hohoangphucjob@gmail.com','asdasd','14:00 - 16:00','cash','2024-10-10','5','C2',80000,'Coldplay: Music of the Spheres'),(5,'dfsdf','hohoangphucjob@gmail.com','asdasd','14:00 - 16:00','cash','2024-10-10','5','',80000,'BTS: Permission to Dance'),(6,'dfsdf','hohoangphucjob@gmail.com','asdasd','14:00 - 16:00','creditCard','2024-10-09','4','',80000,'Coldplay: Music of the Spheres'),(7,'dfsdf','hohoangphucjob@gmail.com','asdasd','14:00 - 16:00','creditCard','2024-10-14','2','',80000,'Coldplay: Music of the Spheres'),(8,'dfsdf','hohoangphucjob@gmail.com','asdasd','14:00 - 16:00','creditCard','2024-10-14','2','B4',80000,'Coldplay: Music of the Spheres'),(9,'dfsdf','hohoangphucjob@gmail.com','asdasd','14:00 - 16:00','creditCard','2024-10-10','5','',80000,'Coldplay: Music of the Spheres'),(10,'dfsdf','hohoangphucjob@gmail.com','asdasd','14:00 - 16:00','creditCard','2024-10-10','5','B8',80000,'Coldplay: Music of the Spheres'),(11,'dfsdf','hohoangphucjob@gmail.com','asdasd','14:00 - 16:00','creditCard','2024-10-10','5','',80000,'BTS: Permission to Dance'),(12,'dfsdf','hohoangphucjob@gmail.com','asdasd','14:00 - 16:00','creditCard','2024-10-09','4','',80000,'Coldplay: Music of the Spheres'),(13,'dfsdf','hohoangphucjob@gmail.com','asdasd','14:00 - 16:00','creditCard','2024-10-09','4','C2',80000,'Coldplay: Music of the Spheres'),(14,'dfsdf','hohoangphucjob@gmail.com','0327434821','14:00 - 16:00','creditCard','2024-10-10','5','C4',80000,'Coldplay: Music of the Spheres'),(15,'dfsdf','hohoangphucjob@gmail.com','0327434821','14:00 - 16:00','creditCard','2024-10-10','5','A6',80000,'Coldplay: Music of the Spheres'),(16,'dfsdf','hohoangphucjob@gmail.com','0327434821','14:00 - 16:00','cash','2024-10-15','3','B6',80000,'Coldplay: Music of the Spheres'),(17,'dfsdf','hohoangphucjob@gmail.com','0327434821','14:00 - 16:00','cash','2024-10-13','1','B6',80000,'Coldplay: Music of the Spheres'),(18,'dfsdf','hohoangphucjob@gmail.com','0327434821','14:00 - 16:00','cash','2024-10-13','1','C1',80000,'BTS: Permission to Dance'),(19,'dfsdf','hohoangphucjob@gmail.com','0327434821','14:00 - 16:00','cash','2024-10-14','2','D2',80000,'BTS: Permission to Dance'),(20,'dfsdf','hohoangphucjob@gmail.com','0327434821','14:00 - 16:00','cash','2024-10-13','1','B7',80000,'BTS: Permission to Dance'),(21,'dfsdf','hohoangphucjob@gmail.com','0327434821','14:00 - 16:00','cash','2024-10-13','1','B3',80000,'BTS: Permission to Dance'),(22,'dfsdf','hohoangphucjob@gmail.com','0327434821','14:00 - 16:00','cash','2024-10-15','3','A9',80000,'BTS: Permission to Dance'),(23,'dfsdf','hohoangphucjob@gmail.com','0327434821','14:00 - 16:00','cash','2024-10-14','2','A4',80000,'BTS: Permission to Dance');
/*!40000 ALTER TABLE `bookingUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `movie_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(256) DEFAULT NULL,
  `director` varchar(128) DEFAULT NULL,
  `cast` varchar(1024) DEFAULT NULL,
  `genre` varchar(128) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `language` varchar(128) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `poster` varchar(512) DEFAULT NULL,
  `trailer` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'Taylor Swift: The Eras Tour','Sam Wrench','Taylor Swift','Pop, Country','2023-08-05',180,'English',8,'The Eras Tour is a celebration of Taylor Swift\'s career, taking the audience on a journey through her most iconic albums.','https://www.womjapan.com/vn/wp-content/uploads/sites/2/2023/06/Tour-Taylor-Swift-2024-ta%CC%A3i-Nha%CC%A3%CC%82t-Ba%CC%89n.jpeg','https://www.youtube.com/embed/e-ORhEE9VVg'),(2,'Coldplay: Music of the Spheres','Paul Dugdale','Coldplay','Alternative Rock, Pop','2023-09-10',150,'English',9.2,'Experience Coldplay\'s newest tour, blending hits from their latest album \'Music of the Spheres\' with old fan favorites.','https://i.ytimg.com/vi/UrrUDfej-Tw/maxresdefault.jpg','https://www.youtube.com/embed/k4V3Mo61fJM'),(3,'BTS: Permission to Dance','Sam Wrench','BTS','K-Pop','2023-10-15',120,'Korean, English',9.8,'BTS lights up the stage with their vibrant energy and dynamic performances in the Permission to Dance world tour.','https://cdn-images.vtv.vn/zoom/640_400/2021/7/20/btspermissionmv1280-16267504677171319264513.jpg','https://www.youtube.com/embed/CuklIb9d3fI'),(4,'Adele: Live in London','Sam Wrench','Adele','Pop, Soul','2023-11-22',120,'English',9.7,'Adele returns to the stage with her deep, soulful voice, performing hits from her latest album alongside timeless classics.','https://m.media-amazon.com/images/S/pv-target-images/e8f2344ca0d9f84c2b9968d7df55d1b9ae9f3384a920f956febe983f8a853f26.jpg','https://www.youtube.com/embed/DDWKuo3gXMQ'),(5,'Ed Sheeran: Mathematics Tour','Paul Dugdale','Ed Sheeran','Pop, Folk','2023-07-30',130,'English',8.9,'Ed Sheeran’s Mathematics Tour blends acoustic performances with full-band arrangements of his best-selling hits.','https://acrisurestadium.com/wp-content/uploads/2022/09/Static_BillboardOOH_1920x1080_EdSheeran-KH-RL_2023_Regional_AcrisureStadium_0708_OnSale_Khalid-RosaLinn.jpg','https://www.youtube.com/embed/_dK2tDK9grQ'),(6,'Blackpink: Born Pink World Tour','Sam Wrench','Blackpink','K-Pop, Pop','2023-12-05',140,'Korean, English',9.4,'Blackpink brings explosive energy and stunning visuals in their Born Pink World Tour, showcasing new hits and fan favorites.','https://cdn.nguyenkimmall.com/images/detailed/882/concert-blackpink-0.jpg','https://www.youtube.com/embed/Io0fBr1XBUA'),(7,'Harry Styles: Love on Tour','Paul Dugdale','Harry Styles','Pop, Rock','2023-08-18',160,'English',9.6,'Harry Styles captivates audiences with his charisma and signature style in the Love on Tour, performing chart-topping hits.','https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F61b8d02a63a55706a4c20e82%2FHarry-Styles-performs-onstage-during-the-tour-opener-for-Love-On-Tour-at-MGM-Grand%2F960x0.jpg%3FcropX1%3D740%26cropX2%3D4000%26cropY1%3D550%26cropY2%3D2384','https://www.youtube.com/embed/P3cffdsEXXw'),(8,'The Weeknd: After Hours Til Dawn Tour','Paul Dugdale','The Weeknd','R&B, Pop','2023-11-10',170,'English',9.1,'The Weeknd\'s After Hours Til Dawn Tour takes the audience on a journey through his dark and atmospheric musical landscape.','https://backstage.vn/storage/2023/06/The-Weeknd-After-Hours-Til-Dawn-Tour.jpeg','https://www.youtube.com/embed/XXYlFuWEuKI'),(9,'Billie Eilish: Happier Than Ever, The World Tour','Paul Dugdale','Billie Eilish','Pop, Alternative','2023-09-25',140,'English',9.3,'Billie Eilish delivers an intimate and emotionally powerful performance in her Happier Than Ever world tour.','https://music.voca.vn/assets/img/img_song/Happier%20Than%20Ever.jpg','https://www.youtube.com/embed/xGYCjKBeSpI'),(10,'Bruno Mars: 24K Magic Tour','Paul Dugdale','Bruno Mars','Pop, Funk','2023-10-02',150,'English',9,'Bruno Mars brings high-energy funk and smooth ballads to the stage in his 24K Magic Tour, leaving the crowd wanting more.','https://i.ytimg.com/vi/VmBKJ0yt_nI/maxresdefault.jpg','https://www.youtube.com/embed/UqyT8IEBkvY'),(15,'1111','asd','21','asd','2024-10-02',21,'asda',2,'asdad','https://annhan.vn/source/SanPham/backdrop_poster_hashtag/poster/3a.jpg','asadad');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price`
--

DROP TABLE IF EXISTS `price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price` (
  `price_id` int NOT NULL,
  `screening_start` timestamp NULL DEFAULT NULL,
  `price_amt` int DEFAULT NULL,
  PRIMARY KEY (`price_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price`
--

LOCK TABLES `price` WRITE;
/*!40000 ALTER TABLE `price` DISABLE KEYS */;
/*!40000 ALTER TABLE `price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` int NOT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,1),(2,1),(3,1),(4,0),(5,0);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `screening`
--

DROP TABLE IF EXISTS `screening`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `screening` (
  `screening_id` int NOT NULL,
  `movie_id` int DEFAULT NULL,
  `price_id` int DEFAULT NULL,
  `time_start` timestamp NULL DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  PRIMARY KEY (`screening_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `screening`
--

LOCK TABLES `screening` WRITE;
/*!40000 ALTER TABLE `screening` DISABLE KEYS */;
INSERT INTO `screening` VALUES (1,1,1,'2023-08-06 03:00:00',1),(2,1,2,'2023-08-06 06:00:00',1),(3,1,3,'2023-08-06 13:00:00',1),(4,1,1,'2023-08-07 03:00:00',1),(5,1,2,'2023-08-07 06:00:00',1),(6,1,3,'2023-08-07 13:00:00',1),(7,1,1,'2023-08-08 03:00:00',1),(8,1,2,'2023-08-08 06:00:00',1),(9,1,3,'2023-08-08 13:00:00',1),(10,2,1,'2023-08-06 03:00:00',2),(11,2,2,'2023-08-06 06:00:00',2),(12,2,3,'2023-08-06 13:00:00',2),(13,2,1,'2023-08-07 03:00:00',2),(14,2,2,'2023-08-07 06:00:00',2),(15,2,3,'2023-08-07 13:00:00',2),(16,2,1,'2023-08-08 03:00:00',2),(17,2,2,'2023-08-08 06:00:00',2),(18,2,3,'2023-08-08 13:00:00',2),(19,3,1,'2023-08-06 03:00:00',3),(20,3,2,'2023-08-06 06:00:00',3),(21,3,3,'2023-08-06 13:00:00',3),(22,3,1,'2023-08-07 03:00:00',3),(23,3,2,'2023-08-07 06:00:00',3),(24,3,3,'2023-08-07 13:00:00',3),(25,3,1,'2023-08-08 03:00:00',3),(26,3,2,'2023-08-08 06:00:00',3),(27,3,3,'2023-08-08 13:00:00',3),(28,4,1,'2023-08-09 03:00:00',1),(29,4,2,'2023-08-09 06:00:00',1),(30,4,3,'2023-08-09 13:00:00',1),(31,4,1,'2023-08-10 03:00:00',1),(32,4,2,'2023-08-10 06:00:00',1),(33,4,3,'2023-08-10 13:00:00',1),(34,4,1,'2023-08-11 03:00:00',1),(35,4,2,'2023-08-11 06:00:00',1),(36,4,3,'2023-08-11 13:00:00',1),(37,5,1,'2023-08-09 03:00:00',2),(38,5,2,'2023-08-09 06:00:00',2),(39,5,3,'2023-08-09 13:00:00',2),(40,5,1,'2023-08-10 03:00:00',2),(41,5,2,'2023-08-10 06:00:00',2),(42,5,3,'2023-08-10 13:00:00',2),(43,5,1,'2023-08-11 03:00:00',2),(44,5,2,'2023-08-11 06:00:00',2),(45,5,3,'2023-08-11 13:00:00',2),(46,6,1,'2023-08-09 03:00:00',3),(47,6,2,'2023-08-09 06:00:00',3),(48,6,3,'2023-08-09 13:00:00',3),(49,6,1,'2023-08-10 03:00:00',3),(50,6,2,'2023-08-10 06:00:00',3),(51,6,3,'2023-08-10 13:00:00',3),(52,6,1,'2023-08-11 03:00:00',3),(53,6,2,'2023-08-11 06:00:00',3),(54,6,3,'2023-08-11 13:00:00',3),(55,7,1,'2023-08-12 01:00:00',1),(56,7,1,'2023-08-12 03:00:00',1),(57,7,2,'2023-08-12 06:00:00',1),(58,7,2,'2023-08-12 08:00:00',1),(59,7,2,'2023-08-12 10:00:00',1),(60,7,3,'2023-08-12 13:00:00',1),(61,7,3,'2023-08-12 15:00:00',1),(62,7,1,'2023-08-13 01:00:00',1),(63,7,1,'2023-08-13 03:00:00',1),(64,7,2,'2023-08-13 06:00:00',1),(65,7,2,'2023-08-13 08:00:00',1),(66,7,2,'2023-08-13 10:00:00',1),(67,7,3,'2023-08-13 13:00:00',1),(68,7,3,'2023-08-13 15:00:00',1),(69,7,1,'2023-08-14 01:00:00',1),(70,7,1,'2023-08-14 03:00:00',1),(71,7,2,'2023-08-14 06:00:00',1),(72,7,2,'2023-08-14 08:00:00',1),(73,7,2,'2023-08-14 10:00:00',1),(74,7,3,'2023-08-14 13:00:00',1),(75,7,3,'2023-08-14 15:00:00',1);
/*!40000 ALTER TABLE `screening` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `seat_id` int NOT NULL,
  `row` varchar(10) DEFAULT NULL,
  `number` int DEFAULT NULL,
  `vip` tinyint(1) DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  PRIMARY KEY (`seat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (1,'A',1,0,1),(2,'A',2,0,1),(3,'A',3,0,1),(4,'A',4,0,1),(5,'A',5,0,1),(6,'A',6,0,1),(7,'A',7,0,1),(8,'A',8,0,1),(9,'B',1,0,1),(10,'B',2,0,1),(11,'B',3,0,1),(12,'B',4,0,1),(13,'B',5,0,1),(14,'B',6,0,1),(15,'B',7,0,1),(16,'B',8,0,1),(17,'C',1,1,1),(18,'C',2,1,1),(19,'C',3,1,1),(20,'C',4,1,1),(21,'C',5,1,1),(22,'C',6,1,1),(23,'C',7,1,1),(24,'C',8,1,1),(25,'D',1,1,1),(26,'D',2,1,1),(27,'D',3,1,1),(28,'D',4,1,1),(29,'D',5,1,1),(30,'D',6,1,1),(31,'D',7,1,1),(32,'D',8,1,1),(33,'A',1,0,2),(34,'A',2,0,2),(35,'A',3,0,2),(36,'A',4,0,2),(37,'A',5,0,2),(38,'A',6,0,2),(39,'A',7,0,2),(40,'A',8,0,2),(41,'B',1,0,2),(42,'B',2,0,2),(43,'B',3,0,2),(44,'B',4,0,2),(45,'B',5,0,2),(46,'B',6,0,2),(47,'B',7,0,2),(48,'B',8,0,2),(49,'C',1,1,2),(50,'C',2,1,2),(51,'C',3,1,2),(52,'C',4,1,2),(53,'C',5,1,2),(54,'C',6,1,2),(55,'C',7,1,2),(56,'C',8,1,2),(57,'D',1,1,2),(58,'D',2,1,2),(59,'D',3,1,2),(60,'D',4,1,2),(61,'D',5,1,2),(62,'D',6,1,2),(63,'D',7,1,2),(64,'D',8,1,2),(65,'A',1,0,3),(66,'A',2,0,3),(67,'A',3,0,3),(68,'A',4,0,3),(69,'A',5,0,3),(70,'A',6,0,3),(71,'A',7,0,3),(72,'A',8,0,3),(73,'B',1,0,3),(74,'B',2,0,3),(75,'B',3,0,3),(76,'B',4,0,3),(77,'B',5,0,3),(78,'B',6,0,3),(79,'B',7,0,3),(80,'B',8,0,3),(81,'A',1,1,3),(82,'C',2,1,3),(83,'C',3,1,3),(84,'C',4,1,3),(85,'C',5,1,3),(86,'C',6,1,3),(87,'C',7,1,3),(88,'C',8,1,3),(89,'D',1,1,3),(90,'D',2,1,3),(91,'D',3,1,3),(92,'D',4,1,3),(93,'D',5,1,3),(94,'D',6,1,3),(95,'D',7,1,3),(96,'D',8,1,3);
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat_reservation`
--

DROP TABLE IF EXISTS `seat_reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat_reservation` (
  `seatres_id` varchar(255) NOT NULL,
  `seat_id` int DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `screening_id` int DEFAULT NULL,
  PRIMARY KEY (`seatres_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat_reservation`
--

LOCK TABLES `seat_reservation` WRITE;
/*!40000 ALTER TABLE `seat_reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `seat_reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seatv2`
--

DROP TABLE IF EXISTS `seatv2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seatv2` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `mota` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `id_movie` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seatv2`
--

LOCK TABLES `seatv2` WRITE;
/*!40000 ALTER TABLE `seatv2` DISABLE KEYS */;
INSERT INTO `seatv2` VALUES (3,'A1','A1','Đã đặt','1'),(4,'A2','A2',NULL,NULL),(5,'A3','A3',NULL,NULL),(6,'A4','A4','Đã đặt','3'),(7,'A5','A5',NULL,NULL),(8,'A6','A6',NULL,NULL),(9,'A7','A7',NULL,NULL),(10,'A8','A8',NULL,NULL),(11,'A9','A9','Đã đặt','3'),(12,'A10','A10',NULL,NULL),(13,'B1','B1',NULL,NULL),(14,'B2','B2',NULL,NULL),(15,'B3','B3','Đã đặt','3'),(16,'B4','B4',NULL,NULL),(17,'B5','B5',NULL,NULL),(18,'B6','B6','Đã đặt','1'),(19,'B7','B7','Đã đặt','8'),(20,'B8','B8',NULL,NULL),(21,'B9','B9',NULL,NULL),(22,'B10','B10',NULL,NULL),(23,'C1','C1','Đã đặt','1'),(24,'C2','C2',NULL,NULL),(25,'C3','C3',NULL,NULL),(26,'C4','C4',NULL,NULL),(27,'D1','D1',NULL,NULL),(28,'D2','D2','Đã đặt','3'),(29,'D3','D3',NULL,NULL),(30,'D4','D4',NULL,NULL),(32,'D2','D2','Đã đặt','2'),(33,'B7','B7','Đã đặt','3'),(34,'B3','B3','Đã đặt','9'),(35,'A9','A9',NULL,NULL),(36,'A4','A4',NULL,NULL);
/*!40000 ALTER TABLE `seatv2` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket_transac`
--

DROP TABLE IF EXISTS `ticket_transac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket_transac` (
  `transaction_id` varchar(255) NOT NULL,
  `booked_day` timestamp NULL DEFAULT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket_transac`
--

LOCK TABLES `ticket_transac` WRITE;
/*!40000 ALTER TABLE `ticket_transac` DISABLE KEYS */;
/*!40000 ALTER TABLE `ticket_transac` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(64) NOT NULL,
  `username` varchar(256) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `email` varchar(256) DEFAULT NULL,
  `phone_no` varchar(48) DEFAULT NULL,
  `timer` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1333333a-d85e-4f7c-91b3-2beeb7db4172','phuc','0','hana@gmail.com','032743421','2024-10-07 12:45:20',1),('40331ef8-3300-458b-8bbc-ac21b2546c9a','phuc1','$2b$10$meLuAtwz2/ePU08o.8NK2uet55sbFCH8d6uh8jOo5lPWMU2.mzbiK','hohoangphucjob@gmail.com','0327434821','2024-09-28 14:22:37',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'test'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-12 15:00:10
