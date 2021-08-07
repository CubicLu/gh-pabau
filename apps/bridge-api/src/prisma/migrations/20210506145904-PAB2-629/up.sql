START TRANSACTION;
ALTER TABLE `company_branches_attachments` CHANGE `type` `type` ENUM('badge','antd_badge') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
ALTER TABLE `company_branches` ADD IF NOT EXISTS `image` varchar(500) NULL AFTER `notice`;
COMMIT;