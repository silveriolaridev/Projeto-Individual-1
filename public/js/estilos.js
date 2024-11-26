function mostrarEstilo(estiloId, botaoId ) {

    let estilos = document.getElementsByClassName('estilo');
  
    for (var i = 0; i < estilos.length; i++) {
      estilos[i].style.display = 'none';
    }

    document.getElementById(estiloId).style.display = 'flex';

    let botoes = document.getElementsByClassName('botao-estilo');
  
    for (var i = 0; i < estilos.length; i++) {
      botoes[i].style.border = 'none';
    }

    document.getElementById(botaoId).style.border = 'solid 4px white';
  }
  