-- Customers tables  
CREATE TABLE IF NOT EXISTS `customer_identifier` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone_number` varchar(255) NOT NULL,
  `customer_added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `customer_hash` varchar(255) NOT NULL,
  PRIMARY KEY (customer_id),
  UNIQUE (customer_email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `customer_info` (
  `customer_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL, 
  `customer_first_name` varchar(255) NOT NULL,
  `customer_last_name` varchar(255) NOT NULL,
  `active_customer_status` int(11) NOT NULL,
  PRIMARY KEY (customer_info_id),
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `customer_vehicle_info` (
  `vehicle_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL, 
  `vehicle_year` int(11) NOT NULL,
  `vehicle_make` varchar(255) NOT NULL,
  `vehicle_model` varchar(255) NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `vehicle_mileage` int(11) NOT NULL, 
  `vehicle_tag` varchar(255) NOT NULL,
  `vehicle_serial` varchar(255) NOT NULL,
  `vehicle_color` varchar(255) NOT NULL,
  PRIMARY KEY (vehicle_id),
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Company tables 
CREATE TABLE IF NOT EXISTS `company_roles` (
  `company_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_role_name` varchar(255) NOT NULL,
  PRIMARY KEY (company_role_id),
  UNIQUE (company_role_name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `common_services` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_name` varchar(255) NOT NULL,
  `Service_Price` int(11) NOT NULL,
  `service_description` TEXT,
  `active` int(11) NOT NULL,
  PRIMARY KEY (service_id)
) ENGINE=InnoDB;

-- Employee tables 
CREATE TABLE IF NOT EXISTS `employee` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_email` varchar(255) NOT NULL,
  `active_employee` int(11) NOT NULL,
  `added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `employee_image` varchar(255) NOT NULL,
  PRIMARY KEY (employee_id), 
  UNIQUE (employee_email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `employee_info` (
  `employee_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `employee_first_name` varchar(255) NOT NULL,
  `employee_last_name` varchar(255) NOT NULL,
  `employee_phone` varchar(255) NOT NULL,
  PRIMARY KEY (employee_info_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `employee_pass` (
  `employee_pass_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `employee_password_hashed` varchar(255) NOT NULL,
  PRIMARY KEY (employee_pass_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `employee_role` (
  `employee_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `company_role_id` int(11) NOT NULL,
  PRIMARY KEY (employee_role_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE,
  FOREIGN KEY (company_role_id) REFERENCES company_roles(company_role_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Order tables  
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `order_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `active_order` int(11) NOT NULL,
  `order_hash` varchar(255) NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE, 
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id) ON DELETE CASCADE,
  FOREIGN KEY (vehicle_id) REFERENCES customer_vehicle_info(vehicle_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Add the roles to the database 
INSERT INTO company_roles (company_role_id, company_role_name)
VALUES (1, 'Employee'), (2, 'Manager'), (3, 'Admin')
ON DUPLICATE KEY UPDATE company_role_name = VALUES(company_role_name);

-- Ensure admin employee exists
INSERT INTO employee (employee_id, employee_email, active_employee, added_date, employee_image)
VALUES (1, 'admin@admin.com', 1, CURRENT_TIMESTAMP, 'default.png')
ON DUPLICATE KEY UPDATE active_employee = VALUES(active_employee);

-- Ensure employee info is added
INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone)
VALUES (1, 'Admin', 'Admin', '555-555-5555')
ON DUPLICATE KEY UPDATE employee_first_name = VALUES(employee_first_name);

-- Ensure employee password exists (hashed password remains the same)
INSERT INTO employee_pass (employee_id, employee_password_hashed)
VALUES (1, '$2b$10$ceYuf8esgIge0dnr01SGO.Q8Qhn.c4q4kTg.TS4A40.oj0aSwbhG2')
ON DUPLICATE KEY UPDATE employee_password_hashed = VALUES(employee_password_hashed);

-- Ensure employee role is assigned
INSERT INTO employee_role (employee_id, company_role_id)
SELECT 1, 3 FROM DUAL WHERE EXISTS (SELECT 1 FROM employee WHERE employee_id = 1)
ON DUPLICATE KEY UPDATE company_role_id = VALUES(company_role_id);
