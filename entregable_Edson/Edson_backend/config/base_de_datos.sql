CREATE DATABASE nova_salud;
USE nova_salud;
CREATE TABLE productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre_producto VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio_venta DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    marca VARCHAR(100),
    codigo_barras VARCHAR(50) UNIQUE
);
INSERT INTO productos (nombre_producto, descripcion, precio_venta, stock, marca, codigo_barras)
VALUES
('Paracetamol 500mg', 'Analgésico y antipirético para alivio de dolor y fiebre.', 5.50, 150, 'Genfar', '7702001000101'),
('Ibuprofeno 400mg', 'Antiinflamatorio no esteroideo para el dolor y la inflamación.', 8.75, 120, 'FarmacoRx', '7702001000202'),
('Alcohol Antiséptico 70%', 'Alcohol etílico al 70% para desinfección de la piel.', 12.00, 80, 'BoticaSalud', '7702001000303'),
('Vitamina C 1000mg', 'Suplemento dietético para fortalecer el sistema inmune.', 25.00, 90, 'NaturVida', '7702001000404'),
('Termómetro Digital', 'Termómetro de lectura rápida para medir temperatura corporal.', 35.50, 40, 'MediCheck', '7702001000505'),
('Banditas Adhesivas (20 und)', 'Caja de 20 unidades de banditas adhesivas para pequeñas heridas.', 6.20, 200, 'Curita', '7702001000606'),
('Loratadina 10mg', 'Antihistamínico para alivio de alergias.', 15.75, 70, 'Alergix', '7702001000707'),
('Protector Solar SPF 50', 'Crema de protección solar de amplio espectro.', 65.00, 50, 'SolCare', '7702001000808'),
('Gel Antibacterial 250ml', 'Gel desinfectante de manos con alcohol.', 18.90, 110, 'HigieneTotal', '7702001000909'),
('Crema para Quemaduras', 'Alivia el dolor y promueve la cicatrización de quemaduras leves.', 22.00, 30, 'DermoHeal', '7702001001010'),
('Suero Fisiológico 0.9%', 'Solución estéril para limpieza de heridas y fosas nasales.', 10.50, 100, 'SalineSol', '7702001001111'),
('Venda Elástica 7.5cm', 'Venda elástica para soporte de esguinces y torceduras.', 9.80, 60, 'SportMed', '7702001001212'),
('Antiácido Menta', 'Alivia la acidez estomacal e indigestión.', 7.99, 85, 'DigestoFast', '7702001001313'),
('Bálsamo Labial Humectante', 'Protege y repara los labios secos y agrietados.', 11.50, 75, 'LipCare', '7702001001414'),
('Guantes de Látex (100 und)', 'Guantes desechables para higiene y protección.', 45.00, 30, 'SafeHand', '7702001001515'),
('Pastillas para la Garganta Miel y Limón', 'Alivia el dolor y la irritación de garganta.', 13.00, 55, 'GargantaFresca', '7702001001616'),
('Desodorante Roll-On 50ml', 'Desodorante antitranspirante de larga duración.', 19.50, 95, 'AromaFresh', '7702001001717'),
('Shampoo Anticaída 200ml', 'Fortalece el cabello y reduce la caída.', 38.00, 25, 'HairStrong', '7702001001818'),
('Cepillo Dental Suave', 'Cepillo de dientes con cerdas suaves para encías sensibles.', 9.00, 180, 'OralClean', '7702001001919'),
('Crema Hidratante Corporal 400ml', 'Hidratación profunda para piel seca.', 42.00, 65, 'HydraDerm', '7702001002020');
