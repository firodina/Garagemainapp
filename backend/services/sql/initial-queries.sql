-- Company Roles
CREATE TABLE IF NOT EXISTS company_roles (
  company_role_id INT AUTO_INCREMENT PRIMARY KEY,
  company_role_name VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- Employee Management
CREATE TABLE IF NOT EXISTS employee (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_email VARCHAR(255) NOT NULL UNIQUE,
  active_employee BOOLEAN NOT NULL DEFAULT TRUE,
  added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  employee_image VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS employee_info (
  employee_info_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  employee_first_name VARCHAR(255) NOT NULL,
  employee_last_name VARCHAR(255) NOT NULL,
  employee_phone VARCHAR(20) NOT NULL UNIQUE,
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS employee_pass (
  employee_pass_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  employee_password_hashed VARCHAR(255) NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS employee_role (
  employee_role_id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  company_role_id INT NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE,
  FOREIGN KEY (company_role_id) REFERENCES company_roles(company_role_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Customer Management
CREATE TABLE IF NOT EXISTS customer_identifier (
  customer_id INT AUTO_INCREMENT PRIMARY KEY,
  company_role_id INT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL UNIQUE,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (company_role_id) REFERENCES company_roles(company_role_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS customer_info (
  customer_info_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  address TEXT,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS customer_feedback (
  feedback_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  feedback_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS customer_interactions (
  interaction_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  interaction_type VARCHAR(100),
  interaction_details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
) ENGINE=InnoDB;

-- Vehicle Type Management
CREATE TABLE IF NOT EXISTS vehicle_types (
  vehicle_type_id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_type_name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS vehicles (
  vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  vehicle_type_id INT NOT NULL,
  make VARCHAR(100),
  model VARCHAR(100),
  year INT,
  VIN VARCHAR(50) UNIQUE,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id),
  FOREIGN KEY (vehicle_type_id) REFERENCES vehicle_types(vehicle_type_id)
) ENGINE=InnoDB;

-- Service Type Management
CREATE TABLE IF NOT EXISTS service_types (
  service_type_id INT AUTO_INCREMENT PRIMARY KEY,
  service_name VARCHAR(255) NOT NULL,
  description TEXT,
  duration INT NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS service_pricing (
  service_pricing_id INT AUTO_INCREMENT PRIMARY KEY,
  service_type_id INT NOT NULL,
  vehicle_type_id INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (service_type_id) REFERENCES service_types(service_type_id),
  FOREIGN KEY (vehicle_type_id) REFERENCES vehicle_types(vehicle_type_id)
) ENGINE=InnoDB;

-- Order Management
CREATE TABLE IF NOT EXISTS orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  vehicle_id INT NOT NULL,
  employee_id INT DEFAULT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_price DECIMAL(10,2) NOT NULL,
  slot_time TIME NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id),
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_status (
  order_status_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  status ENUM('Pending', 'In Progress', 'Completed', 'Canceled') NOT NULL DEFAULT 'Pending',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS tasks (
  task_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT DEFAULT NULL,
  assigned_to INT NOT NULL,
  task_details TEXT NOT NULL,
  task_status ENUM('Pending', 'In Progress', 'Completed') NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (assigned_to) REFERENCES employee(employee_id)
) ENGINE=InnoDB;

-- Service Appointment Management
CREATE TABLE IF NOT EXISTS appointments (
  appointment_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  service_type_id INT NOT NULL,
  vehicle_type_id INT NOT NULL,
  service_date DATETIME NOT NULL,
  time_slot TIME NOT NULL,
  status ENUM('Booked', 'Rescheduled', 'Canceled') NOT NULL DEFAULT 'Booked',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id),
  FOREIGN KEY (service_type_id) REFERENCES service_types(service_type_id),
  FOREIGN KEY (vehicle_type_id) REFERENCES vehicle_types(vehicle_type_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS appointment_notifications (
  notification_id INT AUTO_INCREMENT PRIMARY KEY,
  appointment_id INT NOT NULL,
  message TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('Sent', 'Pending', 'Failed') NOT NULL DEFAULT 'Pending',
  type ENUM('Email', 'SMS', 'Push Notification') NOT NULL,
  FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
) ENGINE=InnoDB;

-- Payment Management
CREATE TABLE IF NOT EXISTS payments (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  tx_ref VARCHAR(255) UNIQUE,
  chapa_status VARCHAR(50) DEFAULT 'Pending',
  approval_status ENUM('Not Approved', 'Approved') DEFAULT 'Not Approved',
  payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payment_status (
  payment_status_id INT AUTO_INCREMENT PRIMARY KEY,
  payment_id INT NOT NULL,
  status ENUM('Successful', 'Failed') NOT NULL DEFAULT 'Successful',
  FOREIGN KEY (payment_id) REFERENCES payments(payment_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payment_method (
  method_id INT AUTO_INCREMENT PRIMARY KEY,
  payment_id INT NOT NULL,
  method_name VARCHAR(50) NOT NULL,
  FOREIGN KEY (payment_id) REFERENCES payments(payment_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payment_receipts (
  receipt_id INT AUTO_INCREMENT PRIMARY KEY,
  payment_id INT NOT NULL,
  receipt_details TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (payment_id) REFERENCES payments(payment_id)
) ENGINE=InnoDB;


-- Notifications
CREATE TABLE IF NOT EXISTS sms_notifications (
  sms_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  message TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
) ENGINE=InnoDB;

-- Online Receipt Generation
CREATE TABLE IF NOT EXISTS receipts (
  receipt_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  receipt_content TEXT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
) ENGINE=InnoDB;

-- Reporting
CREATE TABLE IF NOT EXISTS reports (
  report_id INT AUTO_INCREMENT PRIMARY KEY,
  report_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS report_data (
  report_data_id INT AUTO_INCREMENT PRIMARY KEY,
  report_id INT NOT NULL,
  data TEXT NOT NULL,
  FOREIGN KEY (report_id) REFERENCES reports(report_id)
) ENGINE=InnoDB;

-- Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  action TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES employee(employee_id)
) ENGINE=InnoDB;

-- Intermediary table for order and payment relations
CREATE TABLE IF NOT EXISTS order_payments (
  order_payment_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  payment_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (payment_id) REFERENCES payments(payment_id)
) ENGINE=InnoDB;

-- Resource Scheduling
CREATE TABLE IF NOT EXISTS resources (
  resource_id INT AUTO_INCREMENT PRIMARY KEY,
  resource_name VARCHAR(255) NOT NULL,
  resource_type VARCHAR(100),
  resource_description TEXT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS resource_schedules (
  schedule_id INT AUTO_INCREMENT PRIMARY KEY,
  resource_id INT NOT NULL,
  schedule_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  FOREIGN KEY (resource_id) REFERENCES resources(resource_id)
) ENGINE=InnoDB;

-- Payment Flexibility
CREATE TABLE IF NOT EXISTS payment_installments (
  installment_id INT AUTO_INCREMENT PRIMARY KEY,
  payment_id INT NOT NULL,
  installment_amount DECIMAL(10,2) NOT NULL,
  due_date TIMESTAMP NOT NULL,
  FOREIGN KEY (payment_id) REFERENCES payments(payment_id)
) ENGINE=InnoDB;

-- Service Role Permissions
CREATE TABLE IF NOT EXISTS role_permissions (
  role_permission_id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  permission VARCHAR(255) NOT NULL,
  FOREIGN KEY (role_id) REFERENCES company_roles(company_role_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS customer_pass (
  customer_pass_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  customer_password_hashed VARCHAR(255) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Vehicle Type Management
CREATE TABLE IF NOT EXISTS vehicle_types (
  vehicle_type_id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_type_name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS vehicles (
  vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  vehicle_type_id INT NOT NULL,
  make VARCHAR(100),
  model VARCHAR(100),
  year INT,
  VIN VARCHAR(50) UNIQUE,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id),
  FOREIGN KEY (vehicle_type_id) REFERENCES vehicle_types(vehicle_type_id)
) ENGINE=InnoDB;

-- Vehicle Service History
CREATE TABLE IF NOT EXISTS vehicle_service_history (
  service_id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_id INT NOT NULL,
  service_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  service_type VARCHAR(255) NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  vehicle_type_id INT NOT NULL,
  service_pricing_id INT NOT NULL,
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id),
  FOREIGN KEY (vehicle_type_id) REFERENCES vehicle_types(vehicle_type_id),
  FOREIGN KEY (service_pricing_id) REFERENCES service_pricing(service_pricing_id)
) ENGINE=InnoDB;

-- Order Services
CREATE TABLE IF NOT EXISTS order_services (
  order_service_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  service_type_id INT NOT NULL,
  service_status ENUM('Pending', 'In Progress', 'Completed') DEFAULT 'Pending',
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (service_type_id) REFERENCES service_types(service_type_id)
) ENGINE=InnoDB;

-- Service Status Updates
CREATE TABLE IF NOT EXISTS service_status_updates (
  status_update_id INT AUTO_INCREMENT PRIMARY KEY,
  order_service_id INT NOT NULL,
  status ENUM('Inspection', 'Repair', 'Quality Check', 'Completed') NOT NULL,
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_service_id) REFERENCES order_services(order_service_id)
) ENGINE=InnoDB;

--house service request 
CREATE TABLE IF NOT EXISTS house_service_requests (
  request_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  vehicle_id INT NOT NULL,
  service_type_id INT NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  assigned_employee_id INT DEFAULT NULL,
  status ENUM('Requested', 'Assigned', 'In Progress', 'Completed', 'Canceled') DEFAULT 'Requested',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id),
  FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id),
  FOREIGN KEY (service_type_id) REFERENCES service_types(service_type_id),
  FOREIGN KEY (assigned_employee_id) REFERENCES employee(employee_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- Predefined roles for the company
INSERT INTO company_roles (company_role_name) VALUES
('Employee'), ('Manager'), ('Admin'), ('Customer')
ON DUPLICATE KEY UPDATE company_role_name = company_role_name;
-- Insert Admin
INSERT INTO employee (employee_email, active_employee, added_date, employee_image)
VALUES ('rowdahassan49@gmail.com', 1, CURRENT_TIMESTAMP, 'https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=');

SET @admin_id = LAST_INSERT_ID();

INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone)
VALUES (@admin_id, 'Admin', 'Admin', '0960574644');

INSERT INTO employee_pass (employee_id, employee_password_hashed)
VALUES (@admin_id, '$2b$10$ceYuf8esgIge0dnr01SGO.Q8Qhn.c4q4kTg.TS4A40.oj0aSwbhG2');

INSERT INTO employee_role (employee_id, company_role_id)
VALUES (@admin_id, 3); 

-- Insert Manager
INSERT INTO employee (employee_email, active_employee, added_date, employee_image)
VALUES ('manager@manager.com', 1, CURRENT_TIMESTAMP, 'https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=');

SET @manager_id = LAST_INSERT_ID();

INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone)
VALUES (@manager_id, 'Manager', 'Manager', '666-666-6666');

INSERT INTO employee_pass (employee_id, employee_password_hashed)
VALUES (@manager_id, '$2b$10$ceYuf8esgIge0dnr01SGO.Q8Qhn.c4q4kTg.TS4A40.oj0aSwbhG2');

INSERT INTO employee_role (employee_id, company_role_id)
VALUES (@manager_id, 2);
