ALTER TABLE
  `inventory_discrepancy` CHANGE `shortage` `shortage` DECIMAL(11, 2) NOT NULL;

ALTER TABLE
  `inventory_discrepancy` CHANGE `overage` `overage` DECIMAL(11, 2) NOT NULL;
