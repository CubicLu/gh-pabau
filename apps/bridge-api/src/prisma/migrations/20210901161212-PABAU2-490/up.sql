START TRANSACTION;
CREATE TABLE IF NOT EXISTS `contact_preferences` (
   `id` int auto_increment,
   `company_id` int NOT NULL,
   `contact_id` int unsigned NOT NULL,
   `family` int NOT NULL,
   `emergency_contact` int NOT NULL,
   `next_of_kin` int NOT NULL,
   `insurance_provider` int NOT NULL,
   `gp` int NOT NULL,
   `company` int NOT NULL,
   `book_appointments` int NOT NULL,
   `book_class` int NOT NULL,
   `loyalty` int NOT NULL,
   `my_packages` int NOT NULL,
   `purchase_package` int NOT NULL,
   `payments` int NOT NULL,
   `appointments` int NOT NULL,
   `class` int NOT NULL,
   `documents` int NOT NULL,
   `medications` int NOT NULL,
   `allergies` int NOT NULL,
   `gp_details` int NOT NULL,
   `share_link` varchar(200) NOT NULL,
   `access_code` varchar(6) NOT NULL,
   `created_at` timestamp default current_timestamp,
   `updated_at` timestamp default current_timestamp on update current_timestamp,
   PRIMARY KEY (`id`),
   CONSTRAINT `fk_contact_preferences_company_id` FOREIGN KEY (`company_id`) REFERENCES `admin`(`id`),
   CONSTRAINT `fk_contact_preferences_contact_id` FOREIGN KEY (`contact_id`) REFERENCES `cm_contacts`(`ID`),
   CONSTRAINT `unique_company_id_contact_id` UNIQUE (`contact_id`,`company_id`)
);
CREATE INDEX `contact_preferences_contact_id_company_id__index` ON `contact_preferences` (`contact_id`,`company_id`);
COMMIT;
