ALTER TABLE `sms_senders` ADD `enable_replies` TINYINT(1) NOT NULL DEFAULT '0' AFTER `merge_tags`;
ALTER TABLE `company_emails` ADD `visibility` TINYINT(1) NOT NULL DEFAULT '0' AFTER `merge_tags`;
