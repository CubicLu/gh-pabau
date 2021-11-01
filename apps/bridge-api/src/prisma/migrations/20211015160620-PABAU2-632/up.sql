CREATE VIEW `invoices` AS
SELECT
    c.ID as customer_id,
    a.id,
    a.guid,
    a.date,
    sum(a.total) as amount,
    sum(a.paid_amount) as paid_amount,
    sum(a.discount_amount) as discount_amount,
    sum(a.inv_total) as inv_total,
    sum(a.tip) as tip,
    if(sum(a.total)>sum(a.paid_amount), 'unpaid', 'paid') as status,
    l.name as location_name,
    group_concat(Distinct b.name) as billers,
    if(i.id is null, concat(fname,' ',lname),i.insurer_name) as issue_to
 FROM inv_sales a
    INNER JOIN cm_contacts c ON a.customer_id=c.ID
    LEFT JOIN company_branches l ON a.location_id=l.id
    LEFT JOIN inv_billers b ON a.biller_id=b.id
    LEFT JOIN insurance_details i ON a.insurer_contract_id=i.id
where guid!=''
group by guid
