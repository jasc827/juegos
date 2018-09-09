var puzzlepiece = {
            width: 0,
            height: 0,
            length: 0,
            random: 0,
            scrammbled: new Array(),
            bgX: new Array(),
            bgY: new Array(),
            position: {
                top: new Array(),
                left: new Array()
            },
            all: null
        };

function rompecabeza(options){
	var settings={
		rows: options.rows,
		columns: options.columns,
        slideSpeed: 300
	}

	inicializar(settings);
}

function inicializar(opciones){

	var imageholder = $("#contenedor-img");
    var image = $("#imagen");
	var currleft;
    var currtop;
	puzzlepiece.width = parseInt(image.width() / opciones.columns);
    puzzlepiece.height = parseInt(image.height() / opciones.rows);
    var puzzle = document.createElement('ul');
    puzzle.id = "jspuzzle";
	imageholder.append(puzzle);
	for(var i=0; i < opciones.rows; i++){
		var top = (i == 0 ? 0 : top += puzzlepiece.height);

		for(var j=0; j < opciones.columns; j++){
			var left = (j == 0 ? 0 : left += puzzlepiece.width);
            var newPuzzlePiece= document.createElement('li');

			//Dejar el ultimo cuadro vacio
			if ((i == opciones.rows - 1) && (j == opciones.columns - 1)) {
            	newPuzzlePiece.id = "ppempty";
                newPuzzlePiece.style.background = "#AAA";
                newPuzzlePiece.style.zIndex = -1;
                newPuzzlePiece.style.backgroundImage = "url()";
            }
            else {
            	newPuzzlePiece.id = "pp" + i + j;
               	newPuzzlePiece.style.backgroundImage = "url(\"" + image.attr("src") + "\")";
            }

            currleft = (j == 0 ? 0 : (0 - left));
            currtop = (i == 0 ? 0 : (0 - top));
            puzzlepiece.bgX.push(currleft);
            puzzlepiece.bgY.push(currtop);
            puzzlepiece.position.left.push(currleft);
            puzzlepiece.position.top.push(currtop);
            $(puzzle).append(newPuzzlePiece);

            newPuzzlePiece = $(newPuzzlePiece);
            newPuzzlePiece.addClass("jspuzzlepiece");
            newPuzzlePiece.css("top", top);
            newPuzzlePiece.css("left", left);
            newPuzzlePiece.css("position", "absolute");
            newPuzzlePiece.css("cursor", "pointer");
            newPuzzlePiece.width(puzzlepiece.width);
            newPuzzlePiece.height(puzzlepiece.height);
            newPuzzlePiece.css("background-position", (j == 0 ? 0 : (0 - left)) + "px " + (i == 0 ? 0 : (0 - top)) + "px");
            newPuzzlePiece.click(function (e) { click(e, opciones); });
		}
	}
           
    puzzlepiece.all = $(".jspuzzlepiece");
    puzzlepiece.length = puzzlepiece.all.length;
    image.css("position", "absolute");
    image.hide();
    scramble(opciones);
                
	
}//inicializar

function scramble(settings){
	var iindex = 0;
    for (var i = 0; i < ((settings.columns * settings.rows) - 1); i++) {
        do {
            puzzlepiece.random = Math.floor(Math.random() * (settings.rows * settings.columns));
        }
        while ($.inArray(puzzlepiece.random, puzzlepiece.scrammbled) != -1)
      	if (puzzlepiece.random == ((settings.columns * settings.rows) - 1)) {
             do {
                puzzlepiece.random = Math.floor(Math.random() * (settings.rows * settings.columns));
            }
           	while (puzzlepiece.random == ((settings.columns * settings.rows) - 1))
        }
                        
        try {
            puzzlepiece.scrammbled.push(puzzlepiece.random);
            var randomTop = $(puzzlepiece.all[puzzlepiece.random]).position().top;
            var iindexTop = $(puzzlepiece.all[iindex]).position().top;
            var randomLeft = $(puzzlepiece.all[puzzlepiece.random]).position().left;
            var iindexLeft = $(puzzlepiece.all[iindex]).position().left;
            $(puzzlepiece.all[iindex]).css("top", randomTop);
            $(puzzlepiece.all[iindex]).css("left", randomLeft);
            $(puzzlepiece.all[puzzlepiece.random]).css("top", iindexTop);
            $(puzzlepiece.all[puzzlepiece.random]).css("left", iindexLeft);
    
            iindex += 1;
        }
        catch (e) {
            var ex = e;
        }
    }

}// scramble

function click (e, settings) {
   	var ppempty = $("#ppempty");
    var srcE = (e.srcElement != undefined ? e.srcElement : e.target);
   	var element = $((srcE != undefined ? srcE : "#" + e.id));
   	if (((element.position().top + element.height()) == ppempty.position().top) && element.position().left == ppempty.position().left) {
        var emptypiece = ppempty.position().top;
       	var clickedpiece = element.position().top;
        element.animate({ top: emptypiece }, settings.slideSpeed);
       	ppempty.animate({ top: clickedpiece }, settings.slideSpeed);
    }
   	
   	else if (((element.position().left + element.width()) == ppempty.position().left) && element.position().top == ppempty.position().top) {
    	var emptypiece = ppempty.position().left;
  		var clickedpiece = element.position().left;
    	element.animate({ left: emptypiece }, settings.slideSpeed);
    	ppempty.animate({ left: clickedpiece }, settings.slideSpeed);
    }
    
    else if (((ppempty.position().top + ppempty.height()) == element.position().top) && element.position().left == ppempty.position().left) {
    	var emptypiece = ppempty.position().top;
   		var clickedpiece = element.position().top;
    	element.animate({ top: emptypiece }, settings.slideSpeed);
   		ppempty.animate({ top: clickedpiece }, settings.slideSpeed);
    }
    
    else if (((ppempty.position().left + ppempty.width()) == element.position().left) && element.position().top == ppempty.position().top) {
       	var emptypiece = ppempty.position().left;
        var clickedpiece = element.position().left;
       	element.animate({ left: emptypiece }, settings.slideSpeed);
        ppempty.animate({ left: clickedpiece }, settings.slideSpeed);
    }


    //Completado
    var perfect = puzzlepiece.all.length;
    puzzlepiece.all.each(function (i) {
    if (($(puzzlepiece.all[i]).position().left != puzzlepiece.position.left[i]) || ($(puzzlepiece.all[i]).position().top != puzzlepiece.position.top[i])) {
        perfect -= 1;
        }
    });

   	if (perfect == puzzlepiece.all.length)
   	alert("Congratulations you just won a ticket to the sun!!!");
}//click



$(function(){
	var opcion = $("#opcion").val();
	var rows, columns;

	$("#piezas").on("change", function(){
		piezas=$("#piezas option:selected").val();
		$("#opcion").html("");
		if(piezas=="3x3"){
			$("#opcion").append("<option>Ultima Cena</option><option>Bogota</option>"+
			"<option>Iberia</option><option>Panama City</option>");
		}

		else if(piezas=="4x5"){
			$("#opcion").append("<option>Barquisimeto</option><option>Atenas</option>"+
			"<option>Camp Nou</option><option>Lleida</option>");
		}


		else if(piezas=="6x5"){
			$("#opcion").append("<option>Cañon Colorado</option><option>Torre Eiffel</option>"+
			"<option>Piramides Egipto</option><option>Merida</option>");
		}

		else if(piezas=="8x5"){
			$("#opcion").append("<option>Buenos Aires</option><option>Niagara Falls</option>"+
			"<option>Venecia</option><option>Teotihuacan</option>");
		}
	}); //Seleccionar numero de Piezas


	$("#aceptar").on("click", function(){
		$("#contenedor-img").html("");
		opcion = $("#opcion").val();

		switch(opcion){
			case "Ultima Cena":
				opcion="UltimaCena";
				rows=3;
				columns=3;
			break;

			case "Bogota":
				opcion="Bogota";
				rows=3;
				columns=3;
			break;

			case "Iberia":
				opcion="Iberia";
				rows=3;
				columns=3;
				break;

			case "Panama City":
				opcion="Panama";
				rows=3;
				columns=3;
				break;

			case "Barquisimeto":
				opcion="Barquisimeto";
				rows=4;
				columns=5;
				break;

			case "Atenas":
				opcion="Atenas";
				rows=4;
				columns=5;
				break;

			case "Camp Nou":
				opcion="Camp";
				rows=4;
				columns=5;
				break;

			case "Lleida":
				opcion="Lleida";
				rows=4;
				columns=5;
				break;

			case "Cañon Colorado":
				opcion="Colorado";
				rows=5;
				columns=6;
				break;

			case "Torre Eiffel":
				opcion="Eiffel";
				rows=5;
				columns=6;
				break;

			case "Piramides Egipto":
				opcion="Egipto";
				rows=5;
				columns=6;
				break;

			case "Merida":
				opcion="Merida";
				rows=5;
				columns=6;
				break;

			case "Buenos Aires":
				opcion="BuenosAires";
				rows=5;
				columns=8;
				break;

			case "Niagara Falls":
				opcion="Niagara";
				rows=5;
				columns=8;
				break;

			case "Venecia":
				opcion="Venecia";
				rows=5;
				columns=8;
				break;

			case "Teotihuacan":
				opcion="Teotihuacan";
				rows=5;
				columns=8;
				break;
		}
		$("#contenedor-img").append("<img id='imagen' src='../img/Puzzle-Click/"+opcion+".jpg'>");
		
		rompecabeza({rows:rows, columns:columns});
	}); //Aceptar

});//ready