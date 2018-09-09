$(function(){

	if(!sessionStorage.getItem('ingreso')){
		$(".jumbotron").css("display","block");
	}
	else{
	$(".jumbotron").remove();
	$(".container nav").css("display", "flex");
	$("#carouselExampleIndicators").css("display", "block");
	}

$("#boton").on("click", function() {

    $(".jumbotron").remove();
	$(".container nav").css("display", "flex");
	$("#carouselExampleIndicators").css("display", "block");
    sessionStorage.setItem('ingreso',2); 
	
});
});