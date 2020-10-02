$(function(){
   var min, seg
   var idInterval =""

// Detener cualquier conteo anterior e iniciar el conteo a 2 min...

   $('button').on('click',function(){
       clearInterval(idInterval)
       min = 2, seg = 0
       idInterval=setInterval(function(){ timer() }, 1000)
   })

   function timer(){

//Conteo cada segundo...

       seg--
       if (seg == -1){
            min--
            seg = 59
        }

//Presentacion de los datos del reloj formato 00:00...

       if (seg <= 9)
          $('#timer').text( "0"+ min + ":" + "0"+seg)
       else
          $('#timer').text( "0"+ min + ":" + seg)

//Apaga el Timer y elimina elementos del tablero...

       if (min == 0 && seg == 0){
         clearInterval(idInterval)

//Animacion Final...

        $(".panel-tablero").hide();
        $('.time').hide();
        $(".panel-score").animate({width:"100%"}, 1000);
        $('.main-titulo').addClass('main-titulo2');
        $('<h4 class="juegoTerminado">Juego Terminado</h4>').prependTo($('.panel-score'));
       }
   }
});
