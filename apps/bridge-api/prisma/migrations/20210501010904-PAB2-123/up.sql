ALTER TABLE `user_reports` ADD IF NOT EXISTS `favorite` TINYINT NOT NULL DEFAULT '0' AFTER `report_id`;