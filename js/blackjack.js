var mazo=[];
var mano_casa=[];
var mano_jugador=[];
var contador=0;
var ace_j=0;
var ace_c=0;
var suma_jugador=0;
var suma_casa=0;

$(function(){
	inicializar();
	
	$("#btn-jugador-mas").on("click", function(){
		agregar_carta();
	});

	$("#btn-jugador-quedarse").on("click", function(){
		quedarse();
	});

	$("#btn-jugador-reiniciar").on("click", function(){

		reiniciar();
	});

});

function inicializar(){
	barajear();
	mostrar();
}

function barajear(){
	var carta={	id:"",
				nombre:"",
				valor:0};

	while(mazo.length < 52 ){
	  	var numeroAleatorio = Math.ceil(Math.random()*13);
	  	var figuraAleatoria= Math.ceil(Math.random()*4);
	  	var figura;
	  	var existe = false;
	  	var carta={	id:"",
				nombre:"",
				valor:0,
				imagen:""};
		if(figuraAleatoria==1){
			figura="E";
			carta.nombre="Espada"
		}
		else if (figuraAleatoria==2){
			figura="C";
			carta.nombre="Corazon"
		}
		else if (figuraAleatoria==3){
			figura="T";
			carta.nombre="Trebol"
		}
		else if (figuraAleatoria==4){
			figura="D";
			carta.nombre="Diamante"
		}
	  	for(var i=0;i<mazo.length;i++){
			if(mazo[i].id == figura+numeroAleatorio){
	        	existe = true;
	        	break;
	    	}
	  	}
	  	if(!existe){
	  		if(numeroAleatorio<11 && numeroAleatorio!==1){
	  			carta.id=figura+numeroAleatorio;
	  			carta.nombre=numeroAleatorio+" "+carta.nombre;
	  			carta.valor=numeroAleatorio;
	  			carta.imagen="../img/cartas/"+carta.id+".jpg";
	    		mazo[mazo.length] = carta;
	    	}

	    	else if (numeroAleatorio==1) {
	    		carta.id=figura+numeroAleatorio;
	  			carta.nombre=numeroAleatorio+" "+carta.nombre;
	  			carta.valor=numeroAleatorio+10;
	  			carta.imagen="../img/cartas/"+carta.id+".jpg";
	    		mazo[mazo.length] = carta;
	    	}
	    	else if(numeroAleatorio==11){
	    		carta.id=figura+11;
	  			carta.nombre="J "+carta.nombre;
	  			carta.valor=10;
	    		mazo[mazo.length] = carta;
	    	}

	    	else if(numeroAleatorio==12){
	    		carta.id=figura+12;
	  			carta.nombre="Q "+carta.nombre;
	  			carta.valor=10;
	    		mazo[mazo.length] = carta;
	    	}

	    	else if(numeroAleatorio==13){
	    		carta.id=figura+13;
	  			carta.nombre="K "+carta.nombre;
	  			carta.valor=10;
	    		mazo[mazo.length] = carta;
	    	}

	  	}
	}
}

function mostrar(){
	for(var i=0; i<4; i++){

		if(i%2==0){
			$(".mano_casa").append("<div class='carta' id='"+mazo[contador].id+"'></div>");
			$("#"+mazo[contador].id).css("background-image","url(../img/cartas/naipe.png)");
			mano_casa.push(mazo[contador]);
		}
		else{
			$(".mano_jugador").append("<div class='carta' id='"+mazo[contador].id+"'></div>");
			$("#"+mazo[contador].id).css("background-image","url(../img/cartas/"+mazo[contador].id+".png)");
			mano_jugador.push(mazo[contador]);	
		}
		contador++;
	}
}

function quedarse(){
	
	ace_c=0;
	ace_j=0;
	
	if(suma_casa==0){
		for(var i=0; i<mano_casa.length; i++){
			suma_casa=suma_casa+mano_casa[i].valor;
		}
	}

	while(suma_casa<18){
		$(".mano_casa").append("<div class='carta' id='"+mazo[contador].id+"'></div>");
		$("#"+mazo[contador].id).css("background-image","url(../img/cartas/naipe.png)");
		mano_casa.push(mazo[contador]);
		suma_casa=suma_casa+mazo[contador].valor;
		contador++;
		for(var i=0; i<mano_casa.length; i++){
			if (mano_casa[i].id.substr(1,2)=="1"){
				ace_c++;
			}
		}	
	}

	if(suma_jugador==0){
		for(var i=0; i<mano_jugador.length; i++){
			if (mano_jugador[i].id.substr(1,2)=="1"){
					ace_j++;
				}
			suma_jugador=suma_jugador+mano_jugador[i].valor;
		}
	}

	if(suma_jugador>21 && suma_casa<=21){
		if(ace_j>0){
				suma_jugador=suma_jugador-(ace_j*10);
		}
		else{
			alert("Casa Gana");
			voltear_carta();
			esconder_botones();
		}
	}

	else if (suma_casa>21 && suma_jugador<=21) {
		if(ace_c>0){
			suma_casa=suma_casa-(ace_c*10);
			
		}
		else{
			alert("Jugador Gana");
			voltear_carta();
			esconder_botones();
		}
	}

	else if(suma_casa==suma_jugador){
		alert("Empate");
		voltear_carta();
		esconder_botones();
	}

	else if(suma_casa>21 && suma_jugador>21){
		if(ace_c>0){
			suma_casa=suma_casa-(ace_c*10);
		}

		if(ace_j>0){
			suma_jugador=suma_jugador-(ace_j*10);
		}

		else{
			alert("Nadie Gana");
			voltear_carta();
			esconder_botones();
		}
	}

	else if(suma_casa>suma_jugador){
		alert("Casa Gana");
		voltear_carta();
		esconder_botones();
		
	}

	else if(suma_jugador>suma_casa){
		alert("Jugador Gana");
		voltear_carta();
		esconder_botones();
	}

}

function agregar_carta(){
		ace_c=0;
		ace_j=0;
	
		if(suma_casa==0){
			for(var i=0; i<mano_casa.length; i++){
				suma_casa=suma_casa+mano_casa[i].valor;
			}
		}

		while(suma_casa<18){
			$(".mano_casa").append("<div class='carta' id='"+mazo[contador].id+"'></div>");
			$("#"+mazo[contador].id).css("background-image","url(../img/cartas/naipe.png)");
			mano_casa.push(mazo[contador]);
			suma_casa=suma_casa+mazo[contador].valor;
			contador++;
			for(var i=0; i<mano_casa.length; i++){
				if (mano_casa[i].id.substr(1,2)=="1"){
					ace_c++;
				}
			}
			
		}

		$(".mano_jugador").append("<div class='carta' id='"+mazo[contador].id+"'></div>");
		$("#"+mazo[contador].id).css("background-image","url(../img/cartas/"+mazo[contador].id+".png)");
		mano_jugador.push(mazo[contador]);
		contador++;
	
		if(suma_jugador==0){
			for(var i=0; i<mano_jugador.length; i++){
				if (mano_jugador[i].id.substr(1,2)=="1"){
					ace_j++;
				}
				suma_jugador=suma_jugador+mano_jugador[i].valor;
			}
		}

		else{
			suma_jugador=suma_jugador+mazo[contador-1].valor;
		}

		if(suma_jugador>21 && suma_casa<=21){
			if(ace_j>0){
				suma_jugador=suma_jugador-(ace_j*10);
			}
			else{
				alert("Perdiste");
				voltear_carta();
				esconder_botones();
			}
		}

		else if(suma_casa>21 && suma_jugador<=21){
			if(ace_c>0){
				suma_casa=suma_casa-(ace_c*10);
			}
		}

		else if (suma_casa>21 && suma_jugador>21){
			if(ace_c>0){
				suma_casa=suma_casa-(ace_c*10);
			}

			if(ace_j>0){
				suma_jugador=suma_jugador-(ace_j*10);
			}

			if(ace_j==0 && ace_c==0){
				alert("Nadie Gana");
				voltear_carta();
				esconder_botones();
			}
		}
}

function reiniciar(){
	mazo=[];
	mano_casa=[];
 	mano_jugador=[];
	contador=0;
	ace_j=0;
	ace_c=0;
	suma_jugador=0;
	suma_casa=0;
	$(".mano_casa").html("");
	$(".mano_jugador").html("");
	inicializar();
	$(".mesa button").css("display", "inline");
	$("#btn-jugador-reiniciar").css("display", "none");
}

function esconder_botones(){
	$(".mesa button").css("display", "none");
	$("#btn-jugador-reiniciar").css("display", "inline");

}

function voltear_carta(){

	$(".mano_casa").html("");
	for(var i=0; i<mano_casa.length; i++){
		$(".mano_casa").append("<div class='carta' id='"+mano_casa[i].id+"'></div>");
		$("#"+mano_casa[i].id).css("background-image","url(../img/cartas/"+mano_casa[i].id+".png)");
	}

}