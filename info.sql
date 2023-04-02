create database car_db;

\ c car_db;

DROP TABLE IF EXISTS USERS;

CREATE TABLE USERS(
  id VARCHAR(50) UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,
  user_age INT NOT NULL,
  email_id VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  company_id VARCHAR(50),
  user_role VARCHAR(50) NOT NULL
);

ALTER TABLE
  USERS
ADD
  CONSTRAINT fk_email_id FOREIGN KEY (email_id) REFERENCES EMAIL(id);

ALTER TABLE
  USERS
ADD
  CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES COMPANY(id);

INSERT INTO
  users(
    name,
    user_age,
    email_id,
    password,
    company_id,
    user_role
  )
VALUES
  (
    'ali',
    23,
    'examppasword',
    'fdg',
    'admin',
    'sad'
  );

/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / DROP TABLE IF EXISTS EMAIL;

CREATE TABLE EMAIL(
  id VARCHAR(50) UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  title VARCHAR(50) NOT NULL
);

INSERT INTO
  EMAIL(title)
VALUES
  (
    'odilxon'
  );

/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / DROP TABLE IF EXISTS COMPANY;

CREATE TABLE COMPANY(
  id VARCHAR(50) UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  title VARCHAR(50) NOT NULL,
  email_id VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  created_by VARCHAR(50) NOT NULL
);

ALTER TABLE
  COMPANY
ADD
  CONSTRAINT fk_email_id FOREIGN KEY (email_id) REFERENCES EMAIL(id);

ALTER TABLE
  COMPANY
ADD
  CONSTRAINT fk_user_id FOREIGN KEY (created_by) REFERENCES USERS(id);

/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / DROP TABLE IF EXISTS CAR;

CREATE TABLE CAR(
  id VARCHAR(50) UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  car_title VARCHAR(50) NOT NULL,
  car_price VARCHAR(50) NOT NULL,
  car_color VARCHAR(50) NOT NULL,
  car_brand VARCHAR(50) NOT NULL,
  created_by VARCHAR(50) NOT NULL,
  company_id VARCHAR(30) NOT NULL
);

ALTER TABLE session  DROP COLUMN start_at;
ALTER TABLE users  DROP COLUMN user_role;


ALTER TABLE users  
ADD COLUMN user_role date;

ALTER TABLE users ADD COLUMN user_role;
ALTER TABLE session ADD end_at TIMESTAMP;

ALTER TABLE users ALTER COLUMN user_role SET DEFAULT 'users';

ALTER TABLE
  CAR
ADD
  CONSTRAINT fk_user_id FOREIGN KEY (created_by) REFERENCES USERS(id);

ALTER TABLE
  CAR
ADD
  CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES COMPANY(id);

/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / DROP TABLE IF EXISTS CUSTOMERS;

CREATE TABLE CUSTOMERS(
  id VARCHAR(50) UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  user_id VARCHAR(50) NOT NULL,
  car_id VARCHAR(50) NOT NULL,
  company_id VARCHAR(30) NOT NULL,
  created_at DATE DEFAULT CURRENT_DATE
);

ALTER TABLE
  CUSTOMERS
ADD
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES USERS(id);

ALTER TABLE
  CUSTOMERS
ADD
  CONSTRAINT fk_car_id FOREIGN KEY (company_id) REFERENCES COMPANY(id);

ALTER TABLE
  CUSTOMERS
ADD
  CONSTRAINT fk_company_id FOREIGN KEY (company_id) REFERENCES COMPANY(id);

/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / DROP TABLE IF EXISTS SESSION;

CREATE TABLE SESSION(
  id VARCHAR(50) UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  user_id VARCHAR(50) NOT NULL,
  srart_at Date,
  end_at Date
);

CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES USERS(id)
ALTER TABLE
  SESSION
ADD
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES USERS(id);

/ / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / ON users(username);

CREATE INDEX idx_email ON users(user_email);

SELECT
  *
FROM
  pg_indexes
WHERE
  tablename = 'users';

select
  *
from
  users
INSERT INTO
  users(username, password, email, age)
VALUES
  (
    'Sohibjon',
    'user1999999',
    'sohibjon44@gmail.com',
    23
  );

delete from
  users
where
  user_id = ''
update
from
  users
set
  username = '',
  email = '',
  password = '',
  age = 12
where
  user_id = '' 

alter table users 
add column user_role text;

ALTER TABLE CUSTOMERS DROP COLUMN created_at;
ALTER TABLE CUSTOMERS  
ADD COLUMN created_at;

ALTER TABLE CUSTOMERS 
ADD COLUMN created_at TIMESTAMP;

ALTER TABLE CUSTOMERS  
ADD COLUMN created_at Date;

alter table users alter column user_role set default 'user';

  ALTER TABLE CUSTOMERS
ALTER COLUMN created_at set default now();

SELECT * FROM email e
LEFT JOIN users u ON e.id = u.email_id
WHERE e.id = "23cf12cc-b6cc-4298-b7a6-f521a24baf8f";


SELECT * FROM CUSTOMERS c 
JOIN users u ON c.user_id = u.id 
WHERE c.user_id = 'db99f0f1-2d8e-4c6a-843c-1ad6bd14d128';

SELECT * FROM SESSION s
JOIN users u ON s.user_id = u.id 
WHERE s.user_id = 'b3545527-5ad6-4078-9807-6d0a78cf096a';

/*
  APIS
     - CUSTOMERS TABLE USER_ID  KELGANDA USHBU USERGA TEGISHLI
                              - USER    -> ALL
                              - CAR_TITLE
                              - COMPENY_TITLE

      - SESSION TABLE USER_ID KELGANDA USHBU USERGA TEGISHLI
                              - USER  -> ALL
                              - START_AT
                              - END_AT

     
     - USERS TABLE  COMPANY_ID KELGANDA USHBU COMPANY_ID TEGISHLI
                              - USERS -> ALL

     - CARS TABLE COMPANY_ID KELGANDA USHBU COMPANY_ID TEGISHLI
                              - CAR  -> ALL

     - COMPANY TABLE EMAIL_ID KELGANDA USHBU EMAIL_ID TEGISHLI
                              - EMAIL_TITLE
                              - COMPANY -> ALL

     - CARS TABLE  ID KELGANDA USHBU ID TEGISHLI
                              - CAR_TITLE
                              - COMPANY_TITLE


*/

SELECT * FROM car c
    JOIN company o ON o.id = c.company_id
    WHERE c.company_id = 'e355db18-a862-4cfd-9d71-2d915f71aaaa';



    select u.name, c.car_title, o.title as company_title, e.title as user_email, b.title as company_email from car c 
    JOIN users u on c.created_by = u.id
    JOIN company o on o.id = c.company_id
    JOIN email e on e.id = u.email_id
    JOIN email b on b.id = o.email_id
    where c.id = 'acaa9315-c36f-46c5-975d-0e616b2ba406';



    select c.car_title, o.title as company_name from car c 
    JOIN company o on o.id = c.company_id
    where c.company_id = 'e355db18-a862-4cfd-9d71-2d915f71aaaa';