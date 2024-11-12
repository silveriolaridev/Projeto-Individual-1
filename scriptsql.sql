CREATE DATABASE soultune;
USE soultune;

CREATE TABLE usuario (
id_usuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(45));

CREATE TABLE experiencia_musical (
id_experiencia INT PRIMARY KEY AUTO_INCREMENT,
nivel_experiencia VARCHAR(45),
participou_aulas VARCHAR(45),
apresentacao_publica CHAR(3),
composicao_musicas CHAR(3),
pratica_freq VARCHAR(45),
estilo_fav VARCHAR(45),
fk_usuario INT, foreign key (fk_usuario) references usuario(id_usuario));

CREATE TABLE bem_estar (
id_bem_estar INT PRIMARY KEY AUTO_INCREMENT,
impacto_bem_estar CHAR(3),
reduz_estresse_ansiedade CHAR(3),
contribuicao_autoestima CHAR(3),
recomendacao_canto CHAR(3),
fk_usuario INT, foreign key (fk_usuario) references usuario(id_usuario));

select * from usuario;





