-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 27, 2021 at 03:50 PM
-- Server version: 10.3.32-MariaDB-log
-- PHP Version: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `andiclou_bucketlist`
--

-- --------------------------------------------------------

--
-- Table structure for table `apiKey`
--

CREATE TABLE `apiKey` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `apiKey` varchar(255) DEFAULT NULL,
  `stat` int(11) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `apiKey`
--

INSERT INTO `apiKey` (`id`, `user_id`, `apiKey`, `stat`) VALUES
(1, 1, '123', 22),
(2, 2, '9939ea871ac75d8b', 61),
(3, 3, '101f901da5023fc6', 33),
(4, 4, '9d90d0ed2a00d172', 23),
(5, 5, 'b83acb088b6eb693', 0),
(6, 6, '4934635404a8010e', 16);

-- --------------------------------------------------------

--
-- Table structure for table `bucketItem`
--

CREATE TABLE `bucketItem` (
  `id` int(11) NOT NULL,
  `bucketlist_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bucketItem`
--

INSERT INTO `bucketItem` (`id`, `bucketlist_id`, `item_id`) VALUES
(13, 7, 15),
(2, 5, 3),
(3, 5, 5),
(14, 7, 16),
(5, 5, 4),
(16, 9, 40),
(9, 6, 30),
(15, 7, 17),
(17, 9, 35),
(18, 9, 30),
(20, 9, 6);

-- --------------------------------------------------------

--
-- Table structure for table `bucketlist`
--

CREATE TABLE `bucketlist` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bucketlist`
--

INSERT INTO `bucketlist` (`id`, `name`, `user_id`) VALUES
(7, 'comedies', 2),
(6, 'tommy', 6),
(5, 'Action movies', 3),
(9, 'romance', 2),
(14, 'undefined', 3);

-- --------------------------------------------------------

--
-- Table structure for table `filmItem`
--

CREATE TABLE `filmItem` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `filmItem`
--

INSERT INTO `filmItem` (`id`, `title`, `year`, `image`) VALUES
(1, 'Red Notice', 2021, 'https://m.media-amazon.com/images/M/MV5BZmRjODgyMzEtMzIxYS00OWY2LTk4YjUtMGMzZjMzMTZiN2Q0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(2, 'Spider-Man: No Way Home', 2021, 'https://m.media-amazon.com/images/M/MV5BMDUzNWJhZWQtYzU3Zi00M2NjLThjZjEtMTRmMjRmNzBmMWI2XkEyXkFqcGdeQXVyODIyOTEyMzY@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(3, 'Shang-Chi and the Legend of the Ten Rings', 2021, 'https://m.media-amazon.com/images/M/MV5BNTliYjlkNDQtMjFlNS00NjgzLWFmMWEtYmM2Mzc2Zjg3ZjEyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(4, 'Eternals', 2021, 'https://m.media-amazon.com/images/M/MV5BMTExZmVjY2ItYTAzYi00MDdlLWFlOWItNTJhMDRjMzQ5ZGY0XkEyXkFqcGdeQXVyODIyOTEyMzY@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(5, 'Dune', 2021, 'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(6, 'No Time to Die', 2021, 'https://m.media-amazon.com/images/M/MV5BYWQ2NzQ1NjktMzNkNS00MGY1LTgwMmMtYTllYTI5YzNmMmE0XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(7, 'Ghostbusters: Afterlife', 2021, 'https://m.media-amazon.com/images/M/MV5BMmZiMjdlN2UtYzdiZS00YjgxLTgyZGMtYzE4ZGU5NTlkNjhhXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UX128_CR0,3,128,176_AL_.jpg'),
(8, 'Jai Bhim', 2021, 'https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_UY176_CR6,0,128,176_AL_.jpg'),
(9, 'Last Night in Soho', 2021, 'https://m.media-amazon.com/images/M/MV5BZjgwZDIwY2MtNGZlNy00NGRlLWFmNTgtOTBkZThjMDUwMGJhXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UX128_CR0,3,128,176_AL_.jpg'),
(10, 'Jungle Cruise', 2021, 'https://m.media-amazon.com/images/M/MV5BNDE1MGRlNTQtZjc4ZC00MTI0LWEwY2MtODk1YTM2NmFmYTNmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(11, 'Don\'t Look Up', 2021, 'https://m.media-amazon.com/images/M/MV5BNjZjNDE1NTYtYTgwZS00M2VmLWEyODktM2FlNjhiYTk3OGU2XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UX128_CR0,3,128,176_AL_.jpg'),
(12, 'The Harder They Fall', 2021, 'https://m.media-amazon.com/images/M/MV5BYjg4NGExN2EtZmMxYy00ZDEwLWJiZGEtOWRiN2RlMGE0OWE0XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(13, 'House of Gucci', 2021, 'https://m.media-amazon.com/images/M/MV5BYzdlMTMyZWQtZWNmMC00MTJiLWIyMWMtM2ZlZDdlYzZhNTc0XkEyXkFqcGdeQXVyMTMzNDE5NDM2._V1_UX128_CR0,3,128,176_AL_.jpg'),
(14, 'Finch', 2021, 'https://m.media-amazon.com/images/M/MV5BZTMxYjk3MmItMzk1OC00NmRhLThlMjYtNmQyNzA0MzgxMWI2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(15, 'Love Hard', 2021, 'https://m.media-amazon.com/images/M/MV5BODIwNDIxN2YtMWU3ZS00MjU5LWIxMzctNmY1NDg5NDgwYmM0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(16, 'tick, tick...BOOM!', 2021, 'https://m.media-amazon.com/images/M/MV5BZmMyMmE0M2UtN2E2MC00YzVmLTkwODgtOTVhYjVlOTBhY2RjXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(17, 'The French Dispatch', 2021, 'https://m.media-amazon.com/images/M/MV5BNmQxZTNiODYtNzBhYy00MzVlLWJlN2UtNTc4YWZjMDIwMmEzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(18, 'Home Sweet Home Alone', 2021, 'https://m.media-amazon.com/images/M/MV5BMDlkMzZiM2EtZDMxZC00ZWUwLTliMDMtMGMzMzE3NTEzMThiXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_UY176_CR6,0,128,176_AL_.jpg'),
(19, 'Army of Thieves', 2021, 'https://m.media-amazon.com/images/M/MV5BZGRlODFlNTItZWFhZS00NjU5LTliNDUtNjUxMGJhMGZhYjFmXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UY176_CR6,0,128,176_AL_.jpg'),
(20, 'King Richard', 2021, 'https://m.media-amazon.com/images/M/MV5BYTcyNmY4ZGEtYmE4Zi00ZDViLTlmYzMtMmQ4ZTM4OWNmZjQxXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(21, 'Venom: Let There Be Carnage', 2021, 'https://m.media-amazon.com/images/M/MV5BYTc3ZTAwYTgtMmM4ZS00MDRiLWI2Y2EtYmRiZmE0YjkzMGY1XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(22, 'Spencer', 2021, 'https://m.media-amazon.com/images/M/MV5BMTdkZDc4YmQtYzA3My00NzliLThjN2YtMDIwMDkxY2Y4ODdmXkEyXkFqcGdeQXVyMTA2MDU0NjM5._V1_UX128_CR0,3,128,176_AL_.jpg'),
(23, 'Free Guy', 2021, 'https://m.media-amazon.com/images/M/MV5BOTY2NzFjODctOWUzMC00MGZhLTlhNjMtM2Y2ODBiNGY1ZWRiXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(24, 'Clifford the Big Red Dog', 2021, 'https://m.media-amazon.com/images/M/MV5BZGIxYTU5MzctY2MzNS00MTRhLWEwM2UtY2Q5Mzk3OTAzMzcwXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UX128_CR0,3,128,176_AL_.jpg'),
(25, 'Dune', 1984, 'https://m.media-amazon.com/images/M/MV5BYTAzYzNlMDMtMGRjYS00M2UxLTk0MmEtYmE4YWZiYmEwOTIwL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(26, 'Passing', 2021, 'https://m.media-amazon.com/images/M/MV5BYTNhOTlmMDYtNWUyMi00Y2E0LThmYmItNGY4ZGI2ZDgwZmI3XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UX128_CR0,3,128,176_AL_.jpg'),
(27, 'The Power of the Dog', 2021, 'https://m.media-amazon.com/images/M/MV5BZGRhYjE2NWUtN2FkNy00NGI3LTkxYWMtMDk4Yjg5ZjI3MWI2XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UX128_CR0,3,128,176_AL_.jpg'),
(28, 'The Matrix Resurrections', 2021, 'https://m.media-amazon.com/images/M/MV5BMGJkNDJlZWUtOGM1Ny00YjNkLThiM2QtY2ZjMzQxMTIxNWNmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(29, 'Ghostbusters', 1984, 'https://m.media-amazon.com/images/M/MV5BMTkxMjYyNzgwMl5BMl5BanBnXkFtZTgwMTE3MjYyMTE@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(30, 'Black Widow', 2021, 'https://m.media-amazon.com/images/M/MV5BNjRmNDI5MjMtMmFhZi00YzcwLWI4ZGItMGI2MjI0N2Q3YmIwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(31, 'The Last Duel', 2021, 'https://m.media-amazon.com/images/M/MV5BZGExZTUzYWQtYWJjZi00OTI4LTk4OGYtNTA2YzcwMmNiZTMxXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UX128_CR0,3,128,176_AL_.jpg'),
(32, 'Belfast', 2021, 'https://m.media-amazon.com/images/M/MV5BODMwYTYyY2ItOWQ5Yi00OTI1LTllYTQtYTdlNWM4YzJhYTM0XkEyXkFqcGdeQXVyMTA2MDU0NjM5._V1_UX128_CR0,3,128,176_AL_.jpg'),
(33, 'The Suicide Squad', 2021, 'https://m.media-amazon.com/images/M/MV5BNGM3YzdlOWYtNjViZS00MTE2LWE1MWUtZmE2ZTcxZjcyMmU3XkEyXkFqcGdeQXVyODEyMTI1MjA@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(34, 'Resident Evil: Welcome to Raccoon City', 2021, 'https://m.media-amazon.com/images/M/MV5BNjRmMDUxODctYjg3NC00NDRhLWJhZWItMjg0OTZkMDBjNWUxXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_UY176_CR6,0,128,176_AL_.jpg'),
(35, 'Harry Potter and the Sorcerer\'s Stone', 2001, 'https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(36, 'Nightmare Alley', 2021, 'https://m.media-amazon.com/images/M/MV5BYWNmM2UzZGEtZTM1MC00N2Q1LTgwOTYtMzU0YjgwNWI2Y2E3XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UX128_CR0,3,128,176_AL_.jpg'),
(37, 'Downton Abbey: A New Era', 2022, 'https://m.media-amazon.com/images/M/MV5BYjdiM2ZlOGYtYjZmYS00OGQ3LTgxNjQtYjExYTc3OGZhNmJhXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(38, 'The Shawshank Redemption', 1994, 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(39, 'Home Alone', 1990, 'https://m.media-amazon.com/images/M/MV5BMzFkM2YwOTQtYzk2Mi00N2VlLWE3NTItN2YwNDg1YmY0ZDNmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(40, 'Spectre', 2015, 'https://m.media-amazon.com/images/M/MV5BOWQ1MDE1NzgtNTQ4OC00ZjliLTllZDAtN2IyOTVmMTc5YjUxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(41, 'Silent Night', 2021, 'https://m.media-amazon.com/images/M/MV5BZDE1NWVjODItYTM0MS00MGJjLTkzMjctNTJjZjkwZDExYzNhXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(42, 'Army of the Dead', 2021, 'https://m.media-amazon.com/images/M/MV5BNGY0NzgzYzctYWQwMC00MzM2LThjNGMtZjFjMWUyNzg0ZmM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(43, 'The Batman', 2022, 'https://m.media-amazon.com/images/M/MV5BYTExZTdhY2ItNGQ1YS00NjJlLWIxMjYtZTI1MzNlMzY0OTk4XkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_UX128_CR0,3,128,176_AL_.jpg'),
(44, 'Licorice Pizza', 2021, 'https://m.media-amazon.com/images/M/MV5BMGU4NzhkZDAtZmIyNi00ZGE2LWE2ODMtMGNiNjc3MTQxOTU1XkEyXkFqcGdeQXVyODk2NDQ3MTA@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(45, 'Encanto', 2021, 'https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(46, 'Old', 2021, 'https://m.media-amazon.com/images/M/MV5BZGMxYmI2MDAtMjZlMC00YjQyLTljNGYtOGI0YmMwOGE3YWNiXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(47, 'West Side Story', 2021, 'https://m.media-amazon.com/images/M/MV5BMzQ5ZDZhZDItZTNmZi00MWQ0LWJlNDUtZTE4ZWJmODNlM2Y3XkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(48, '365 Days', 2020, 'https://m.media-amazon.com/images/M/MV5BODljZTM3ODAtMDc0YS00NmI4LTlmZTUtM2I5MDAzNTQxZmMxXkEyXkFqcGdeQXVyMTEwMTY3NDI@._V1_UX128_CR0,1,128,176_AL_.jpg'),
(49, 'Spider-Man', 2002, 'https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(50, 'Father Christmas Is Back', 2021, 'https://m.media-amazon.com/images/M/MV5BNDRmMzhiYzEtYjg5OC00ZTVkLWFjNDMtMDhjMjc4ZWQ2YWE2XkEyXkFqcGdeQXVyMTY5Nzc4MDY@._V1_UX128_CR0,1,128,176_AL_.jpg'),
(51, 'The Godfather', 1972, 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX128_CR0,1,128,176_AL_.jpg'),
(52, 'Nocturnal Animals', 2016, 'https://m.media-amazon.com/images/M/MV5BMTYwMzMwMzgxNl5BMl5BanBnXkFtZTgwMTA0MTUzMDI@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(53, 'Killers of the Flower Moon', 2022, 'https://m.media-amazon.com/images/M/MV5BYzE4YjBhMTEtMTUwMi00N2M5LWI5NTItZGNkN2M4YzJhZWEzXkEyXkFqcGdeQXVyMTIzNDk2NzE2._V1_UY176_CR66,0,128,176_AL_.jpg'),
(54, 'Avengers: Endgame', 2019, 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(55, 'Antlers', 2021, 'https://m.media-amazon.com/images/M/MV5BY2UzODAyNjktN2MwYy00M2RkLThiOTEtMjU1MTgxY2EzM2YyXkEyXkFqcGdeQXVyODk5MDA0MDU@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(56, 'Benedetta', 2021, 'https://m.media-amazon.com/images/M/MV5BNGRiMmEzOTYtYThjZC00ZDk3LThmN2YtNzYxY2FjZWYyMjU0XkEyXkFqcGdeQXVyMTE1MzI2NzIz._V1_UX128_CR0,3,128,176_AL_.jpg'),
(57, 'The King', 2019, 'https://m.media-amazon.com/images/M/MV5BMWZkNzNlMzMtMjM5ZS00MWYzLWFmMmUtMjE1ODM3NjBlODA5XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(58, 'Knives Out', 2019, 'https://m.media-amazon.com/images/M/MV5BMGUwZjliMTAtNzAxZi00MWNiLWE2NzgtZGUxMGQxZjhhNDRiXkEyXkFqcGdeQXVyNjU1NzU3MzE@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(59, 'Casino Royale', 2006, 'https://m.media-amazon.com/images/M/MV5BMDI5ZWJhOWItYTlhOC00YWNhLTlkNzctNDU5YTI1M2E1MWZhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(60, 'Spider-Man: Homecoming', 2017, 'https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(61, 'Interstellar', 2014, 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(62, 'The Guilty', 2021, 'https://m.media-amazon.com/images/M/MV5BZWI3NmEyYzAtNWY4OC00YWY4LTk2MjgtM2Y1NDdlZWE4ODgzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(63, 'Cruella', 2021, 'https://m.media-amazon.com/images/M/MV5BOWI5YTUxOWEtZmRiZS00ZmQxLWE2NzctYTRiODA2NzE1ZjczXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(64, 'Titane', 2021, 'https://m.media-amazon.com/images/M/MV5BNGJlMTVlYWQtYmM5OC00MDgwLTk3NzAtMGViY2VjOGU0YjlkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UY176_CR0,0,128,176_AL_.jpg'),
(65, 'Dazed and Confused', 1993, 'https://m.media-amazon.com/images/M/MV5BMTM5MDY5MDQyOV5BMl5BanBnXkFtZTgwMzM3NzMxMDE@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(66, 'Apex', 2021, 'https://m.media-amazon.com/images/M/MV5BZjFjNjg4YTUtYzk4YS00MzBmLWFiZTktNjQ5YjEzYTk5ZDQ2XkEyXkFqcGdeQXVyMzQwMTY2Nzk@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(67, 'The Green Knight', 2021, 'https://m.media-amazon.com/images/M/MV5BMjMxNTdiNWMtOWY0My00MjM4LTkwNzMtOGI0YThhN2Q4M2I4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(68, 'Dhamaka', 2021, 'https://m.media-amazon.com/images/M/MV5BNzUyOWU2M2MtMDU1Yy00M2E1LTg3OTktMGRjYTE2MjkzYzUwXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(69, 'Blade Runner 2049', 2017, 'https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(70, 'Spider-Man: Far from Home', 2019, 'https://m.media-amazon.com/images/M/MV5BMGZlNTY1ZWUtYTMzNC00ZjUyLWE0MjQtMTMxN2E3ODYxMWVmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(71, 'Once Upon a Time... In Hollywood', 2019, 'https://m.media-amazon.com/images/M/MV5BOTg4ZTNkZmUtMzNlZi00YmFjLTk1MmUtNWQwNTM0YjcyNTNkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(72, 'The Electrical Life of Louis Wain', 2021, 'https://m.media-amazon.com/images/M/MV5BZTVjMjcwNTctNWQ3NS00NzVlLWE4N2ItOTlhMjc1ZTdkMzYyXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(73, 'Halloween Kills', 2021, 'https://m.media-amazon.com/images/M/MV5BM2RmMGY2Y2UtNjA1NS00NGE4LThiNzItMmE1NTk5NzI5NmE0XkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(74, '7 Prisoners', 2021, 'https://m.media-amazon.com/images/M/MV5BNThmN2JlYmQtYzE5Zi00Y2QxLThlOWUtYWM3NTI5YTAwMjc4XkEyXkFqcGdeQXVyMTgxMzA4ODY@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(75, 'The Outsiders', 1983, 'https://m.media-amazon.com/images/M/MV5BY2E4Njk4N2UtZWFhOS00NzczLWFmNDgtMzdhMjFlNTZjMmVhL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(76, 'Titanic', 1997, 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(77, 'Bruised', 2020, 'https://m.media-amazon.com/images/M/MV5BMWRjZGZiNjktNDU3Ni00ZWZkLWEwNDEtZDcwMTA3ZTdmMzEzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(78, 'The Matrix', 1999, 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(79, 'Enchanted', 2007, 'https://m.media-amazon.com/images/M/MV5BMjE4NDQ2Mjc0OF5BMl5BanBnXkFtZTcwNzQ2NDE1MQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(80, 'The Black Phone', 2021, 'https://m.media-amazon.com/images/M/MV5BMGYyYTlkZDQtMGI5MC00ZGViLTk2MzYtZWVmYzZiM2Y2NDBmXkEyXkFqcGdeQXVyNjQ2MjY1NTM@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(81, 'The Wolf of Wall Street', 2013, 'https://m.media-amazon.com/images/M/MV5BMjIxMjgxNTk0MF5BMl5BanBnXkFtZTgwNjIyOTg2MDE@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(82, 'The Amazing Spider-Man', 2012, 'https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(83, 'The Princess Switch 3', 2021, 'https://m.media-amazon.com/images/M/MV5BNTRhYzQ1MTEtYjRhZS00NmJkLWE5NzMtNWQ2YzlmMzlmNDI5XkEyXkFqcGdeQXVyNjEwMDM4NTQ@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(84, 'Love Actually', 2003, 'https://m.media-amazon.com/images/M/MV5BMTY4NjQ5NDc0Nl5BMl5BanBnXkFtZTYwNjk5NDM3._V1_UX128_CR0,3,128,176_AL_.jpg'),
(85, 'Love', 2015, 'https://m.media-amazon.com/images/M/MV5BMTQzNDUwODk5NF5BMl5BanBnXkFtZTgwNzA0MDQ2NTE@._V1_UX128_CR0,1,128,176_AL_.jpg'),
(86, 'Joker', 2019, 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(87, 'Venom', 2018, 'https://m.media-amazon.com/images/M/MV5BNzAwNzUzNjY4MV5BMl5BanBnXkFtZTgwMTQ5MzM0NjM@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(88, 'Promising Young Woman', 2020, 'https://m.media-amazon.com/images/M/MV5BOTgzMzE4MGItZDgxYS00ZGEwLWE3YTctZWY3ZDAyMTk0ZGU4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(89, 'National Lampoon\'s Christmas Vacation', 1989, 'https://m.media-amazon.com/images/M/MV5BMGZkMWQ2MzMtYTkxYS00OThmLWI0ZTQtNmY0ZTkyY2E4MjliXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(90, 'The Dark Knight', 2008, 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(91, 'F9: The Fast Saga', 2021, 'https://m.media-amazon.com/images/M/MV5BMjI0NmFkYzEtNzU2YS00NTg5LWIwYmMtNmQ1MTU0OGJjOTMxXkEyXkFqcGdeQXVyMjMxOTE0ODA@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(92, 'The Many Saints of Newark', 2021, 'https://m.media-amazon.com/images/M/MV5BYmQzNmY3YzItOTE3OC00NGZjLTkwZDYtOWVmM2QyMzhiYTgwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(93, 'Jumanji: The Next Level', 2019, 'https://m.media-amazon.com/images/M/MV5BOTVjMmFiMDUtOWQ4My00YzhmLWE3MzEtODM1NDFjMWEwZTRkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(94, 'Skyfall', 2012, 'https://m.media-amazon.com/images/M/MV5BMWZiNjE2OWItMTkwNy00ZWQzLWI0NTgtMWE0NjNiYTljN2Q1XkEyXkFqcGdeQXVyNzAwMjYxMzA@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(95, 'Parasite', 2019, 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(96, 'After We Fell', 2021, 'https://m.media-amazon.com/images/M/MV5BMTEzN2MxZWUtYTJkYS00NjU5LTk0ZjgtNzc1OTMwNWNjZGFkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(97, 'Sooryavanshi', 2021, 'https://m.media-amazon.com/images/M/MV5BNDI3M2E5ZGQtZjVlNS00NzFhLTg0NTAtZDZmOTBjODg3ZDQ1XkEyXkFqcGdeQXVyNzkxOTEyMjI@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(98, 'The Lord of the Rings: The Fellowship of the Ring', 2001, 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(99, 'The Amazing Spider-Man 2', 2014, 'https://m.media-amazon.com/images/M/MV5BOTA5NDYxNTg0OV5BMl5BanBnXkFtZTgwODE5NzU1MTE@._V1_UX128_CR0,3,128,176_AL_.jpg'),
(100, 'Zeros and Ones', 2021, 'https://m.media-amazon.com/images/M/MV5BMjIzZDMxZjctN2EzOS00YmM3LTg0MTktMTEyY2Q3MTAxMzFlXkEyXkFqcGdeQXVyMTM1NDI1MjUy._V1_UX128_CR0,3,128,176_AL_.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `id` int(11) NOT NULL,
  `method` varchar(255) DEFAULT NULL,
  `endpoint` varchar(255) DEFAULT NULL,
  `count` int(11) DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stats`
--

INSERT INTO `stats` (`id`, `method`, `endpoint`, `count`) VALUES
(1, 'GET', '/API/v1', 5),
(2, 'POST', '/API/v1/adminLogin', 4),
(3, 'GET', '/API/v1/admins/stats', 14),
(4, 'GET', '/API/v1/admins/verify', 8),
(5, 'POST', '/API/v1/register', 5),
(6, 'POST', '/API/v1/userlogin', 18),
(7, 'GET', '/API/v1/users/2/buckets', 18),
(8, 'GET', '/API/v1/users/3/buckets', 11),
(9, 'GET', '/API/v1/users/4/buckets', 8),
(10, 'POST', '/API/v1/users/4/buckets', 2),
(11, 'POST', '/API/v1/users/2/buckets', 5),
(12, 'DELETE', '/API/v1/users/2/buckets/3', 1),
(13, 'GET', '/API/v1/users/2/buckets/4', 6),
(14, 'GET', '/API/v1/movies', 12),
(15, 'POST', '/API/v1/users/3/buckets', 7),
(16, 'GET', '/API/v1/users/3/buckets/5', 6),
(17, 'PUT', '/API/v1/users/3/buckets/5', 1),
(18, 'POST', '/API/v1/users/2/buckets/4', 4),
(19, 'POST', '/API/v1/users/3/buckets/5', 6),
(20, 'DELETE', '/API/v1/users/3/buckets/5/items/6', 1),
(21, 'DELETE', '/API/v1/users/2/buckets/4/items/20', 1),
(22, 'DELETE', '/API/v1/users/2/buckets/4/items/28', 1),
(23, 'DELETE', '/API/v1/users/2/buckets/2', 1),
(24, 'GET', '/API/v1/users/6/buckets', 6),
(25, 'DELETE', '/API/v1/users/2/buckets/4', 1),
(26, 'POST', '/API/v1/users/6/buckets', 1),
(27, 'GET', '/API/v1/users/6/buckets/6', 8),
(28, 'POST', '/API/v1/users/6/buckets/6', 1),
(29, 'GET', '/API/v1/users/4/buckets/1', 3),
(30, 'POST', '/API/v1/users/4/buckets/1', 3),
(31, 'DELETE', '/API/v1/users/4/buckets/1/items/11', 1),
(32, 'DELETE', '/API/v1/users/4/buckets/1/items/3', 1),
(33, 'GET', '/API/v1/users/4/buckets/8', 2),
(34, 'PUT', '/API/v1/users/4/buckets/8', 1),
(35, 'GET', '/API/v1/users/2/', 1),
(36, 'GET', '/API/v1/users/2', 1),
(37, 'GET', '/API/v1/users/2/buckets/7', 4),
(38, 'GET', '/API/v1/', 1),
(39, 'POST', '/API/v1/users/2/buckets/7', 3),
(40, 'GET', '/API/v1/users/2/buckets/9', 5),
(41, 'DELETE', '/API/v1/users/4/buckets/8', 1),
(42, 'DELETE', '/API/v1/users/4/buckets/1', 1),
(43, 'POST', '/API/v1/users/2/buckets/9', 4),
(44, 'PUT', '/API/v1/users/3/buckets/15', 1),
(45, 'DELETE', '/API/v1/users/3/buckets/15', 1),
(46, 'DELETE', '/API/v1/users/3/buckets/9/items/6', 1),
(47, 'POST', '/API/v1/users/3/buckets/9/items', 2),
(48, 'POST', '/API/v1/users/3/buckets/9', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `isAdmin`) VALUES
(1, 'admin', 'admin', '$2b$10$nFCmyxl84QlUqCR.or4Xw.bwUZulSGqH.5nYSFCN29Tsn43km81aO', 1),
(2, 'andih', 'andih@gmail.com', '$2b$10$SnMdeJFSpp0zd5dv0Oeze.hxCLoF/IxJ0/n.USa06TiI7jTVpIJlC', 0),
(3, 'michelle', 'michelle@testemail.com', '$2b$10$qpdfQ1j3CU3rqtNZxJMdg.PqWnHfHAyb9hxJIT/aAaaKt4BK5rRaS', 0),
(4, 'test ', 'test@example.com', '$2b$10$F0hn4qvmUg/QhRUyJDIGGO9hwnwV2OaeOrDZBc1s4S93Vt47xoVCK', 0),
(5, 'coolwut', 'coolwut', '$2b$10$ROwh0qEyEQKq3Ja7QsbC..hv4wLOXpk8MpyxpqwttdbgoBzVaxHv2', 0),
(6, 'tommy', 'tomtom@gmail.com', '$2b$10$CqXZhpfoZs89Cpc.xu8B6.6lcf6MTwr47/GH2PKHT8e8fTKRyfOli', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apiKey`
--
ALTER TABLE `apiKey`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `bucketItem`
--
ALTER TABLE `bucketItem`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bucketlist_id` (`bucketlist_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `bucketlist`
--
ALTER TABLE `bucketlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `filmItem`
--
ALTER TABLE `filmItem`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `apiKey`
--
ALTER TABLE `apiKey`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `bucketItem`
--
ALTER TABLE `bucketItem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `bucketlist`
--
ALTER TABLE `bucketlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `filmItem`
--
ALTER TABLE `filmItem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `stats`
--
ALTER TABLE `stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
