CREATE DATABASE soultune;
USE soultune;

CREATE TABLE usuario (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(45));

select * from usuario;

CREATE TABLE quiz (
    idQuiz INT AUTO_INCREMENT PRIMARY KEY,
    resultado VARCHAR(250),
    fkUsuario INT NOT NULL,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id_usuario)
);

SELECT 
CASE 
WHEN resultado LIKE '%Kpop%' THEN 'Energético'
WHEN resultado LIKE '%Jazz%' THEN 'Tranquilo'
WHEN resultado LIKE '%Indie%' THEN 'Criativo'
WHEN resultado LIKE '%Rock%' THEN 'Único'
ELSE 'Sem resultado'
END AS resultados, count(resultado) as Quantidade
from quiz
group by resultado;



