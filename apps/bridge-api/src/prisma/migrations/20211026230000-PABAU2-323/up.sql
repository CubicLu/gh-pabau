/*
UPDATE admin SET slug = (SELECT slug FROM company_details WHERE company_id = admin.id LIMIT 1)
*/
START TRANSACTION;
ALTER TABLE `salon_bookings` CHANGE `status` `status` VARCHAR(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'Waiting';
ALTER TABLE `salon_bookings` CHANGE `estimated_cost` `estimated_cost` DECIMAL(8,2) NULL DEFAULT NULL;
ALTER TABLE `salon_bookings` CHANGE `tips` `tips` DECIMAL(8,2) NULL DEFAULT NULL;
ALTER TABLE `salon_bookings` CHANGE `discounts` `discounts` DECIMAL(8,2) NULL DEFAULT NULL;
ALTER TABLE `salon_bookings` CHANGE `where` `where` VARCHAR(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL;
ALTER TABLE `salon_bookings` CHANGE `booking_id` `booking_id` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `package_id` `package_id` BIGINT(20) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `cancel_take` `cancel_take` TINYINT(4) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `book_take` `book_take` TINYINT(4) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `class_master_id` `class_master_id` BIGINT(20) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `unavailable` `unavailable` TINYINT(4) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `coupon_claim_id` `coupon_claim_id` VARCHAR(185) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL;
ALTER TABLE `salon_bookings` CHANGE `related_id` `related_id` BIGINT(20) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `rebook` `rebook` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `requested` `requested` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `sent_sms` `sent_sms` INT(11) NOT NULL DEFAULT '0' COMMENT '0=None;1=Scheduled;2=Sent.';
ALTER TABLE `salon_bookings` CHANGE `sent_email` `sent_email` INT(11) NOT NULL DEFAULT '0' COMMENT 'sent_sms 0=None;1=Scheduled;2=Sent.';
ALTER TABLE `salon_bookings` CHANGE `sent_survey` `sent_survey` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `custom_contact_id` `custom_contact_id` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `custom_user_id` `custom_user_id` VARCHAR(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '';
ALTER TABLE `salon_bookings` CHANGE `custom_service_id` `custom_service_id` VARCHAR(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '';
ALTER TABLE `salon_bookings` CHANGE `imported` `imported` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `client_confirmed` `client_confirmed` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `hold_guid` `hold_guid` VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '';
ALTER TABLE `salon_bookings` CHANGE `created_by_uid` `created_by_uid` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `marketing_source` `marketing_source` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `resource_id` `resource_id` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `custom_created_by_user_name` `custom_created_by_user_name` VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '';
ALTER TABLE `salon_bookings` CHANGE `modified_by_uid` `modified_by_uid` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `disable_locations` `disable_locations` INT(11) NULL DEFAULT NULL;
ALTER TABLE `salon_bookings` CHANGE `participant_slave_uids` `participant_slave_uids` VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `participant_slave_booking_ids` `participant_slave_booking_ids` VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `external_guest_ids` `external_guest_ids` VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '';
ALTER TABLE `salon_bookings` CHANGE `description` `description` TEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL;
ALTER TABLE `salon_bookings` CHANGE `issued_to` `issued_to` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `salon_bookings` CHANGE `contract_id` `contract_id` INT(11) NOT NULL DEFAULT '0';
ALTER TABLE `cm_contacts` CHANGE `MarketingSource` `MarketingSource` INT(11) NULL DEFAULT NULL;
UPDATE `cm_staff_general` SET Birthdate = NULL WHERE Birthdate = '0000-00-00'
UPDATE `cm_staff_general` SET HireDate = NULL WHERE HireDate = '0000-00-00'
COMMIT;
