START TRANSACTION;
DELETE FROM `cm_contacts_custom` 
WHERE
    `id` NOT IN (SELECT 
        `MaxRecordID`
    FROM
        (SELECT 
            MAX(`id`) AS `MaxRecordID`
        FROM
            `cm_contacts_custom`
        GROUP BY `custom_field_id` , `occupier` , `contact_id`) AS c);
        
ALTER TABLE `cm_contacts_custom`
ADD CONSTRAINT `unique_company_id_contact_id_custom_field_id` UNIQUE (`occupier`, `contact_id`, `custom_field_id`);
COMMIT;