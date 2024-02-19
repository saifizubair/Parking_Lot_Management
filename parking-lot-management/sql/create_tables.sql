-- SQL script to create the necessary tables

-- Parking Building Table
CREATE TABLE IF NOT EXISTS parking_building (
    building_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Floor Table
CREATE TABLE IF NOT EXISTS floor (
    floor_id INT AUTO_INCREMENT PRIMARY KEY,
    building_id INT,
    floor_number INT,
    total_slots INT,
    small_slots INT,
    medium_slots INT,
    large_slots INT,
    xl_slots INT,
    FOREIGN KEY (building_id) REFERENCES parking_building(building_id)
);

-- Parking Slots Table
CREATE TABLE IF NOT EXISTS parking_slots (
    slot_id INT AUTO_INCREMENT PRIMARY KEY,
    floor_id INT,
    slot_number INT,
    size ENUM('Small', 'Medium', 'Large', 'XLarge'),
    status ENUM('Occupied', 'Free'),
    FOREIGN KEY (floor_id) REFERENCES floor(floor_id)
);
