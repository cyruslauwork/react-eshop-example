-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 20, 2023 at 06:49 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `s226064`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `a` int(10) DEFAULT NULL,
  `b` int(10) DEFAULT NULL,
  `c` int(10) DEFAULT NULL,
  `d` int(10) DEFAULT NULL,
  `e` int(10) DEFAULT NULL,
  `f` int(10) DEFAULT NULL,
  `g` int(10) DEFAULT NULL,
  `h` int(10) DEFAULT NULL,
  `i` int(10) DEFAULT NULL,
  `j` int(10) DEFAULT NULL,
  `k` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`) VALUES
(3, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0),
(4, 1, 2, 1, 1, 1, 6, 0, 0, 0, 0, 0),
(5, 0, 0, 1, 1, 1, 5, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `lastlogin` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `lastlogin`, `created_at`, `updated_at`) VALUES
(3, 'test', '$2b$10$.dTLvtAzP.3NvtADCjZFcO5EQrsuTZYQ76ACxuLqJsMex.5suwumi', '2023-12-20 17:30:51', '2023-12-20 14:25:52', '2023-12-20 17:30:51'),
(4, 'test2', '$2b$10$3LVQ/RBPodqewe7OcNHE2eBcILVIy8vL/rV2jxbJYpMTDZcfn3arG', '2023-12-20 17:45:28', '2023-12-20 15:39:10', '2023-12-20 17:45:28'),
(5, 'test3', '$2b$10$ytKEPblfvh359AuUhwmSPOEoSkO5U2piRp9F3E1popKk9DgCPoSpm', '2023-12-20 17:49:12', '2023-12-20 17:49:09', '2023-12-20 17:49:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
