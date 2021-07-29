ALTER TABLE `cm_contacts` ADD IF NOT EXISTS `preferred_language` VARCHAR(50) AFTER `contact_type`;

CREATE TABLE IF NOT EXISTS `cm_label` (
   `id` int auto_increment,
   `name` varchar(200) NOT NULL unique,
   `color` varchar(100),
   `company_id` int,
   `created_at` timestamp default current_timestamp,
   `updated_at` timestamp default current_timestamp on update current_timestamp,
   PRIMARY KEY (`id`),
   CONSTRAINT `fk_label_company_id` FOREIGN KEY (`company_id`) REFERENCES `admin`(`id`)
)

CREATE INDEX `cm_label_name_company_id__index` ON `cm_label` (`name`,`company_id`);

CREATE TABLE IF NOT EXISTS `cm_contact_label` (
   `id` int auto_increment,
   `company_id` int,
   `contact_id` int unsigned,
   `label_id` int,
   PRIMARY KEY (`id`),
   CONSTRAINT `fk_contact_label_company_id` FOREIGN KEY (`company_id`) REFERENCES `admin`(`id`),
   CONSTRAINT `fk_contact_label_contact_id` FOREIGN KEY (`contact_id`) REFERENCES `cm_contacts`(`ID`),
   CONSTRAINT `fk_contact_label_label_id` FOREIGN KEY (`label_id`) REFERENCES `cm_label`(`id`)
)

CREATE INDEX `cm_contact_label_contact_id_company_id__index` ON `cm_contact_label` (`contact_id`,`company_id`);
