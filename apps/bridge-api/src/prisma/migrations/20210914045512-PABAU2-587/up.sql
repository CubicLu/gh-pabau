START TRANSACTION;
ALTER TABLE `cm_contacts_custom`
ADD CONSTRAINT `unique_company_id_contact_id_custom_field_id` UNIQUE (`occupier`, `contact_id`, `custom_field_id`);
COMMIT;