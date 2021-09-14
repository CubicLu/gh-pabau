START TRANSACTION;
CREATE TABLE IF NOT EXISTS `medical_form_macro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `title` varchar(512) NOT NULL,
  `message` text DEFAULT NULL,
  `type` int(2) DEFAULT 0,
  `created_by` int(11) NOT NULL DEFAULT 0,
  `company_id` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_activity_company_id` FOREIGN KEY (`company_id`) REFERENCES `admin`(`id`),
  CONSTRAINT `fk_activity_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`)
);
CREATE INDEX `medical_form_macro_created_by__index` ON `medical_form_macro` (`created_by`);
CREATE INDEX `medical_form_macro_company_id__index` ON `medical_form_macro` (`company_id`);
COMMIT;