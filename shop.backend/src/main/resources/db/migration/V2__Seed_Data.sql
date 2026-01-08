-- ---------------------------------------------------------
-- A. INSERT ANIMALS (Dimension 1)
-- ---------------------------------------------------------
INSERT INTO animal (name) VALUES 
('Chiens'), 
('Chats'), 
('Rongeurs'), 
('Oiseaux'), 
('Poissons'), 
('Reptiles');

-- ---------------------------------------------------------
-- B. INSERT PARENT CATEGORIES (The Main Tabs)
-- ---------------------------------------------------------
-- We force IDs here to ensure subcategories link correctly even if run multiple times on fresh DB
INSERT INTO category (id, name, parent_id) VALUES 
(1, 'Alimentation', NULL),
(2, 'Jouets', NULL),
(3, 'Accessoires', NULL),
(4, 'Habitat', NULL),
(5, 'Bien-être', NULL);

-- ---------------------------------------------------------
-- C. INSERT SUBCATEGORIES (Dimension 2)
-- ---------------------------------------------------------

-- 1. Subcategories for ALIMENTATION (Parent ID 1)
INSERT INTO category (name, parent_id) VALUES 
('Pâtée', 1),
('Croquettes', 1),
('Gourmet', 1),
('Friandises', 1),
('Petit prix', 1);

-- 4. Subcategories for HABITAT (Parent ID 4)
INSERT INTO category (name, parent_id) VALUES 
('Cages', 4),
('Aquariums', 4),
('Terrariums', 4),
('Niches', 4),
('Arbres à chat', 4),
('Paniers & Coussins', 4);
