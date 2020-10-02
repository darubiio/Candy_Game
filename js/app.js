$(function(){

//Cambios del color del titulo...

  colorA();
  function colorA(){
    $(".main-titulo").animate(
    {
      color:"#DCFF0E"
    },800,colorB);
  };
  function colorB(){
    $(".main-titulo").animate(
      {
        color:"#b500ff"
      },800,colorC);
    };
  function colorC(){
    $(".main-titulo").animate(
      {
        color:"#ffffff"
      },800,colorD);
    };
  function colorD(){
    $(".main-titulo").animate(
      {
        color:"#ff5c00"
      },800,colorA);
  };

//Iniciar temporizador y ejecutar funcion al finalizar...

    $(".btn-reinicio").click(function(){
      $(".btn-reinicio").text("Reiniciar");
      $(".panel-tablero").show();
      $(".timer").remove();
      $(".juegoTerminado").remove();
      $(".panel-score").css("width", "25%");
      $('.time').show()
      $(".main-titulo").removeClass('main-titulo2');
      puntuacion = 0;
      movimientos = 0;
      $("#movimientos-text").text(movimientos);
      $("#score-text").text(puntuacion);
      $('div[class^="col"]').children().each(function(){$(this).remove()});
      adDulces(1);
      validadulces();
      $('img.eliminar').hide('pulsate', 1000);

      setTimeout(function () {
        $('img.eliminar').remove();
      }, 1101);

      setInterval(function(){
        adDulces(1);
        validadulces();
        $('img.eliminar').hide('pulsate', 1000);
      setTimeout(function () {
          $('img.eliminar').remove();
        }, 1101);
      }, 1200);

    });

//Variables...

var elementoDrag = "";
var elementoDrop = "";
var movimientos = 0;
var columnas = $(".panel-tablero div");
const cantidaddulces = 7;
var puntuacion = 0;

//Adicionar dulces...

function adDulces() {
    for (var i = 0; i < columnas.length; i++) {
        var siguienteDulce = true;
        var cantidad = $(columnas[i]).children().length;
        for (var j = 0; j < cantidaddulces - cantidad; j++) {
            num = numerosAleatorios(1, 5);
            var dulce = $("<img src='image/" + num + ".png' class='elemento' width='100px' height='100px'>");
            dulce.css({display: 'none'}).prependTo(columnas[i]);
            var width = dulce.width();
            var height = dulce.height();
            dulce.css({
              width: width,
              height: height,
              display: 'none',
              top: '0px',
              position: 'absolute'
            }).delay(10 * j)
            .fadeIn()
            .animate({ top: ((cantidaddulces - cantidad - j - 1) * 100) + 'px'},
            { duration: 1,
            queue: true,
            complete: function(){
              $(this).addClass("displayed");
              $(this).css({ position: 'relative', top: 'unset' });
              siguienteDulce = true;
              j++;
            }
          }, 1000);
        };
      };

// Drag and Drop...

  $(".elemento").draggable({
    disabled: false,
    revert: true,
    containment: ".panel-tablero",
    scroll: false,
    snap: true,
    revertDuration: 1,
    stack: ".elemento",
    opacity: 0.80,
    });

  $(".elemento").droppable({
    disabled: false,
    revert: true,
    containment: ".panel-tablero",
    grid: [100, 100],
    accept: ".elemento",
    drop: function (event, ui) {
      var drop = $(this);
      var drag = $(ui.draggable);
      var colpadredrop = drop.parent().index();
      var colpadredrag = drag.parent().index();
      var indicedrop = drop.index();
      var indicedrag = drag.index();
      if (((colpadredrop - colpadredrag) == 1 || (colpadredrop - colpadredrag) == -1 || (colpadredrop - colpadredrag) == 0) &&
      ((indicedrop - indicedrag) == 1 || (indicedrop - indicedrag) == -1 || (indicedrop - indicedrag) == 0)) {
        elementoDrop = drop.attr("src");
        elementoDrag = drag.attr("src");
        movimientos++;
        $("#movimientos-text").text(movimientos);
        $(ui.draggable).attr("src", elementoDrop);
        $(this).attr("src", elementoDrag);
        validadulces();
      }
    }
  });
};

// Numeros aleatorios para poner los dulces...

function numerosAleatorios(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//Validar si hay dulces iguales y romper en filas y columnas...

function validadulces() {
      for (var i = 1; i <= 7; i++) {
        for (var z = 0; z <= 6; z++) {

          var dulcec1 = $($('.col-' + [i]).find("img")[z]);
          var dulcec2 = $($('.col-' + [i]).find("img")[z + 1]);
          var dulcec3 = $($('.col-' + [i]).find("img")[z + 2]);
          if (dulcec1.attr('src') == dulcec2.attr('src') && dulcec2.attr('src') == dulcec3.attr('src')) {
            if(movimientos > 0){
              dulcec1.addClass("eliminar");
              dulcec2.addClass("eliminar");
              dulcec3.addClass("eliminar");
              puntuacion = puntuacion+50;
              $("#score-text").text(puntuacion);
            }else{
              dulcec1.addClass("eliminar");
              dulcec2.addClass("eliminar");
              dulcec3.addClass("eliminar");
            };
          };

          var dulcef1 = $($('.col-' + [i]).find("img")[z]);
          var dulcef2 = $($('.col-' + [i + 1]).find("img")[z]);
          var dulcef3 = $($('.col-' + [i + 2]).find("img")[z]);
          if (dulcef1.attr('src') == dulcef2.attr('src') && dulcef2.attr('src') == dulcef3.attr('src')) {
            if(movimientos > 0){
              dulcef1.addClass("eliminar");
              dulcef2.addClass("eliminar");
              dulcef3.addClass("eliminar");
              puntuacion += 50;
              $("#score-text").text(puntuacion);
            }else {
              dulcef1.addClass("eliminar");
              dulcef2.addClass("eliminar");
              dulcef3.addClass("eliminar");
            };
          };
        };
      };
    };
  });
