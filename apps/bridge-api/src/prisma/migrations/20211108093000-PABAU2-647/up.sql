ALTER TABLE
  `lab_requests`
ADD
  `assigned_to` INT(11) NULL DEFAULT NULL
AFTER
  `sent_date`,
ADD
  `report_viewed` DATETIME NULL DEFAULT NULL
AFTER
  `assigned_to`;

ALTER TABLE
  `lab_requests`
ADD
  CONSTRAINT `fk_assigned_to` FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
