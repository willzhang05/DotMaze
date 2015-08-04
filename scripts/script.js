$(function() {
	for(var i = 0; i < 4; i++){
		var parent = document.getElementById("sidebar");
		var template = document.createElement("button");
		template.classList.add("menu-buttons");
		if(i == 0){
			template.setAttribute("onclick", "location.href='index.html'");
			template.innerHTML = "Home";
		} else if (i == 1){
			template.setAttribute("onclick", "location.href='help.html'");
			template.innerHTML = "Help";
		} else if (i == 2){
			template.setAttribute("onclick", "location.href='index.html'");
			template.innerHTML = "About";
		} else {
			template.setAttribute("onclick", "location.href='index.html'");
			template.innerHTML = "License";
		}
		parent.appendChild(template);
	}
	$("#toggle-button").click(function(){
    	$("#sidebar-wrapper").animate({left:'+=200'}, 'fast');
	});
	$("#toggle-button").focusout(function(){
		$("#sidebar-wrapper").animate({left:'-=200'}, 'fast');
	});
});