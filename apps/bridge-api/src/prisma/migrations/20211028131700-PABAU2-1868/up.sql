ALTER TABLE `cp_steps` CHANGE `step` `step` ENUM('questionnaire','consent','treatment','prescription','lab','recall','aftercare','timeline','summary','video','photo','details','pinscreen','studio','draw','payment','splash') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
