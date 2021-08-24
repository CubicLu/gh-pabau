ALTER TABLE `cm_leads`
MODIFY COLUMN `DOB` date NULL,
MODIFY COLUMN `ConvertDate` date NULL ,
MODIFY COLUMN `first_interaction` date NULL,
MODIFY COLUMN `latest_interaction` date NULL;
