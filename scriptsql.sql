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
    resultado VARCHAR(45),
    fkUsuario INT NOT NULL,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(id_usuario)
);
alter table quiz modify column resultado varchar(250);
select * from quiz;






