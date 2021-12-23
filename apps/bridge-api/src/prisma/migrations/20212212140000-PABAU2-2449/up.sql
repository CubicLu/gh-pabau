ALTER TABLE
  `company_services`
ADD
  `schedule_type` ENUM('sequence', 'sidebyside') NULL DEFAULT NULL
AFTER
  `no_overlapping`;

ALTER TABLE
  `company_services`
ADD
  `force_deposit` BOOLEAN NOT NULL DEFAULT FALSE
AFTER
  `schedule_type`;

ALTER TABLE
  `company_services`
ADD
  `apply_to` ENUM('all', 'online_bookings') NULL DEFAULT NULL
AFTER
  `force_deposit`;

ALTER TABLE
  `company_services` CHANGE `deposit_type` `deposit_type` ENUM(
    'amount',
    'percent',
    'free',
    'inherit',
    'optional',
    'full'
  ) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'inherit';
