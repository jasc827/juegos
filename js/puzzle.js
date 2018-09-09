function rellenar(s){
	var x= aleatorio(s.piezas);
	for(var i=0; i<s.piezas; i++){
		s.tablero.append("<li><img class='pieza' src='../img/"+s.opcion+"/"+s.opcion+ +x[i]+".jpg'></li>");
	}
	$("#sortable li").addClass(s.clase);
	$("."+s.clase+" img").css("height", s.height);
}//rellenar

function aleatorio(x){
	var myArray = [];
	while(myArray.length < x ){
  		var numeroAleatorio = Math.ceil(Math.random()*x);
  		var existe = false;
  		for(var i=0;i<myArray.length;i++){
			if(myArray [i] == numeroAleatorio){
        		existe = true;
        		break;
    		}
  		}
  		if(!existe){
    		myArray[myArray.length] = numeroAleatorio;
  		}
	}
	return myArray;
}//aleatorio

function completado(piezas, dialog, contador, mensaje){
	var array=[], a=[];
	var x=1;
	var posicion;
		for(var i=0; i<piezas; i++){
			posicion=$("#sortable li img:eq("+i+")").attr("src");
			posicion=posicion.slice(posicion.length-6, posicion.length-4);
			if (/[a-z]/.test(posicion.charAt(0))){
			 	posicion = posicion.slice(1,2);
            }		
			array[i]=posicion;
			a[i]=x;
			x++;
		}

	x=0;

	while(array[x]==a[x]){
		x++;
		if(x==piezas){
		$(".pieza").removeClass("pieza");
		mensaje.html("");
		mensaje.append("<p>Felicidades haz completado correctamente el rompecabeza en <strong>"
		+contador.html()+"</strong> movimientos con un tiempo de: <strong>"+$('#horas').html()+":"
		+$('#minutos').html()+":"+$('#segundos').html()+"</strong></p>");
		dialog();
		break;
		}
	}
}//Completado


$(function(){
	var tablero= $("#sortable");
	var opcion = $("#opcion").val();
	var piezas;
	var tiempo={
		hora:0,
		minuto:0,
		segundo:0
	};

	var crono=null;
	var contador=$("#movi");
	var mensaje=$("#dialog");

	$("#piezas").on("change", function(){
		piezas=$("#piezas option:selected").val();
		$("#opcion").html("");
		if(piezas==9){
			$("#opcion").append("<option>Perro</option><option>Everest</option>"+
			"<option>Sagrada Familia</option><option>Estatua Libertad</option>");
		}

		else if(piezas==20){
			$("#opcion").append("<option>Golden State</option><option>Coliseo Roma</option>"+
			"<option>Machu Pichu</option><option>Rio Janeiro</option>");
		}


		else if(piezas==30){
			$("#opcion").append("<option>Playa del Carmen</option><option>Canal de Panama</option>"+
			"<option>Bariloche</option><option>Dubai</option>");
		}

		else if(piezas==40){
			$("#opcion").append("<option>Barcelona</option><option>Safari Africa</option>"+
			"<option>Isla de Margarita</option><option>Jerusalen</option>");
		}
	}); //Seleccionar numero de Piezas


	$("#aceptar").on("click", function(){
		opcion = $("#opcion").val();
		tablero.html("");
		$("#horas").html("00");
		$("#minutos").html("00");
		$("#segundos").html("00");
		contador.html("0");
		$(".temporizador").css("display", "block");

		var settings={
			tablero: tablero,
			opcion:"",
			piezas:piezas,
			clase:"tres",
			height:"200px"
		}

		switch(opcion){
			case "Perro":
				settings.opcion="Perro";
				rellenar(settings);
			break;

			case "Everest":
				settings.opcion="Everest"
				rellenar(settings);
			break;

			case "Sagrada Familia":
				settings.opcion="sagrada";
				rellenar(settings);
				break;

			case "Estatua Libertad":
				settings.opcion="estatua";
				rellenar(settings);
				break;

			case "Golden State":
				settings.opcion="Golden";
				settings.clase="cinco";
				settings.height="150px";
				rellenar(settings);
				break;

			case "Coliseo Roma":
				settings.opcion="Coliseo";
				settings.clase="cinco";
				settings.height="150px";
				rellenar(settings);
				break;

			case "Machu Pichu":
				settings.opcion="Machu"
				settings.clase="cinco";
				settings.height="150px";
				rellenar(settings);
				break;

			case "Rio Janeiro":
				settings.opcion="Rio";
				settings.clase="cinco";
				settings.height="150px";
				rellenar(settings);
				break;

			case "Playa del Carmen":
				settings.opcion="Carmen";
				settings.clase="seis";
				settings.height="100px";
				rellenar(settings);
				break;

			case "Canal de Panama":
				settings.opcion="Canal";
				settings.clase="seis";
				settings.height="100px";
				rellenar(settings);
				break;

			case "Bariloche":
				settings.opcion="Bariloche";
				settings.clase="seis";
				settings.height="100px";
				rellenar(settings);
				break;

			case "Dubai":
				settings.opcion="Dubai";
				settings.clase="seis";
				settings.height="100px";
				rellenar(settings);
				break;

			case "Barcelona":
				settings.opcion="Barcelona";
				settings.clase="ocho";
				settings.height="100px";
				rellenar(settings);
				break;

			case "Safari Africa":
				settings.opcion="Safari";
				settings.clase="ocho";
				settings.height="100px";
				rellenar(settings);
				break;

			case "Isla de Margarita":
				settings.opcion="Margarita";
				settings.clase="ocho";
				settings.height="100px";
				rellenar(settings);
				break;

			case "Jerusalen":
				settings.opcion="Jerusalen";
				settings.clase="ocho";
				settings.height="100px";
				rellenar(settings);
				break;
		}

	arrancar();

	}); //Aceptar


	tablero.sortable({
		stop: function(){
			contador.html(+contador.html() +1);
			completado(piezas, dialog, contador, mensaje);

		}
	});

	tablero.disableSelection();

	$( "#dialog" ).dialog({
      autoOpen: false,
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }
    });

	function dialog(){$( "#dialog" ).dialog("open");}

    function arrancar(){
    	tiempo.segundo=0;
    	tiempo.minuto=0;
    	tiempo.hora=0;
    	clearInterval(crono);
    	crono = setInterval(function(){
                // Segundos
                tiempo.segundo++;
                if(tiempo.segundo >= 60)
                {
                    tiempo.segundo = 0;
                    tiempo.minuto++;
                }      

                // Minutos
                if(tiempo.minuto >= 60)
                {
                    tiempo.minuto = 0;
                    tiempo.hora++;
                }

                $("#horas").text(tiempo.hora < 10 ? '0' + tiempo.hora : tiempo.hora);
                $("#minutos").text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
                $("#segundos").text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
            }, 1000);
    }

});//ready


