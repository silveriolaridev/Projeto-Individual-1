CREATE DATABASE soultune;
USE soultune;

CREATE TABLE usuario (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(45));

CREATE TABLE quiz (
idQuiz INT AUTO_INCREMENT PRIMARY KEY,
resultado VARCHAR(250),
fkUsuario INT NOT NULL,
dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
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

SELECT count(resultado) as resultado FROM quiz;

SELECT 
CASE
WHEN resultado LIKE '%Kpop%' THEN 'Energético'
WHEN resultado LIKE '%Jazz%' THEN 'Tranquilo'
WHEN resultado LIKE '%Indie%' THEN 'Criativo'
WHEN resultado LIKE '%Rock%' THEN 'Único'
ELSE 'Sem resultado' END AS resultadoNome,
COUNT(resultado) AS quantidadeResultado
FROM quiz
GROUP BY resultadoNome
ORDER BY quantidadeResultado DESC
LIMIT 1;


SELECT 
CASE 
WHEN resultado LIKE '%Kpop%' THEN 'Energético'
WHEN resultado LIKE '%Jazz%' THEN 'Tranquilo'
WHEN resultado LIKE '%Indie%' THEN 'Criativo'
WHEN resultado LIKE '%Rock%' THEN 'Único'
ELSE 'Sem resultado'
END AS resultadoNome
FROM quiz
WHERE fkUsuario = 1
ORDER BY dataHora DESC LIMIT 1;