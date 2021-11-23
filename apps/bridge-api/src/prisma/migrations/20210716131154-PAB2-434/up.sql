START TRANSACTION;

CREATE TABLE IF NOT EXISTS `activity_user_state` (
    `id` int AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `columns` text DEFAULT NULL,
    `user_filter` int(11) DEFAULT NULL,
    `user_group_filter` int(11) DEFAULT NULL,
    `custom_filter` int(11) DEFAULT NULL,
    `company_id` int(11) NOT NULL,
    UNIQUE (`user_id`, `company_id`),
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_active_columns_company_id` FOREIGN KEY (`company_id`) REFERENCES `admin`(`id`),
    CONSTRAINT `fk_active_columns_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

CREATE INDEX `activity_user_state_user_id_company_id__index` ON `activity_user_state` (`company_id`, `user_id`);

CREATE TABLE IF NOT EXISTS `activity_types` (
    `id` int(11) AUTO_INCREMENT,
    `name` varchar(55) NOT NULL,
    `action` text DEFAULT NULL,
    `badge` varchar(55) NOT NULL,
    `order` int(11) NOT NULL,
    `company_id` int(11) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `activity_types` (`name`,`order`,`badge`, `company_id`) VALUES ('Email', 1, 'SendOutlined', 0), ('Call', 2, 'PhoneOutlined', 0), ('Message', 3, 'MessageOutlined', 0), ('Meeting', 4, 'UsergroupAddOutlined', 0);

CREATE TABLE IF NOT EXISTS `activity` (
  `id` int(11) AUTO_INCREMENT,
  `created_by` int(11) NOT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `completed_by` int(11) DEFAULT NULL,
  `contact_id` int(11) unsigned DEFAULT NULL,
  `lead_id` int(11) unsigned DEFAULT NULL,
  `subject` varchar(55) COLLATE utf8mb4_unicode_ci NOT NULL,
  `note` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `available` tinyint(4) NOT NULL,
  `status` ENUM('awaiting','done', 'pending', 'reopened', 'working_on') COLLATE utf8mb4_unicode_ci NOT NULL,
  `due_start_date` datetime NOT NULL,
  `due_end_date` datetime NOT NULL,
  `created_at` timestamp DEFAULT current_timestamp(),
  `updated_at` timestamp DEFAULT current_timestamp() ON update current_timestamp,
  `finished_at` datetime NULL,
  `type` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
   PRIMARY KEY (`id`),
   CONSTRAINT `fk_activity_company_id` FOREIGN KEY (`company_id`) REFERENCES `admin`(`id`),
   CONSTRAINT `fk_activity_created_by` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`),
   CONSTRAINT `fk_activity_contact_id` FOREIGN KEY (`contact_id`) REFERENCES `cm_contacts`(`ID`),
   CONSTRAINT `fk_activity_lead_id` FOREIGN KEY (`lead_id`) REFERENCES `cm_leads`(`ID`),
   CONSTRAINT `fk_activity_type` FOREIGN KEY (`type`) REFERENCES `activity_types`(`id`),
   CONSTRAINT `fk_activity_assigned_to` FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`),
   CONSTRAINT `fk_activity_completed_by` FOREIGN KEY (`completed_by`) REFERENCES `users`(`id`)
);

CREATE INDEX `activity_company_id__index` ON `activity` (`company_id`);
CREATE INDEX `activity_company_id_due_start_date_status__index` ON `activity` (`company_id`, `due_start_date`, `status`);

CREATE TABLE IF NOT EXISTS `activity_user_filter` (
  `id` int(11) AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(55) NOT NULL,
  `columns` text DEFAULT NULL,
  `data` text DEFAULT NULL,
  `shared` tinyint(1) NOT NULL,
  `company_id` int(11) NOT NULL,
  `created_at` timestamp DEFAULT current_timestamp(),
  `updated_at` timestamp DEFAULT current_timestamp() ON update current_timestamp,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_activity_user_filter_company_id` FOREIGN KEY (`company_id`) REFERENCES `admin`(`id`),
  CONSTRAINT `fk_activity_user_filter_user_id` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

CREATE INDEX `activity_user_filter_company_id_user_id__index` on `activity_user_filter` (`company_id`, `user_id`);

ALTER TABLE `cm_leads` MODIFY `EnumStatus` ENUM('Junk', 'Open', 'Converted') default 'Open';

COMMIT;