-- 데이터베이스 생성 및 사용
CREATE DATABASE IF NOT EXISTS `buisnesscard`;
USE `buisnesscard`;

-- 기존 테이블 삭제
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `personal`;
DROP TABLE IF EXISTS `saved`;

CREATE TABLE `user` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(100) NOT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `modified_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `personal` (
    `card_id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL UNIQUE,
    `qr_hash` VARCHAR(255) NOT NULL UNIQUE,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `company` VARCHAR(100),
    `position` VARCHAR(100),
    `email` VARCHAR(100) NOT NULL,
    `phone_contact` VARCHAR(20),
    `office_contact` VARCHAR(20),
    `profile_image` VARCHAR(255),
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `modified_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`card_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `saved` (
    `saved_id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `company` VARCHAR(100),
    `position` VARCHAR(100),
    `email` VARCHAR(100),
    `phone_contact` VARCHAR(20),
    `office_contact` VARCHAR(20),
    `source_qr_hash` VARCHAR(255),
    `profile_image` VARCHAR(255),
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`saved_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
