ALTER TABLE `lead_status` ADD `pipeline_id` INT NULL DEFAULT NULL AFTER `is_convert`;
ALTER TABLE `lead_status` ADD FOREIGN KEY (`pipeline_id`) REFERENCES `pipeline`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
