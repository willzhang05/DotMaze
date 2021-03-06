"use strict";
var toggled = false;
for (var i = 0; i < 4; i++) {
    var parent = document.getElementById("sidebar");
    var template = document.createElement("button");
    template.classList.add("menu-buttons");
    if (i == 0) {
        template.setAttribute("onclick", "location.href='index.html'");
        template.innerHTML = "Home";
    } else if (i == 1) {
        template.setAttribute("onclick", "location.href='help.html'");
        template.innerHTML = "Help";
    } else if (i == 2) {
        template.setAttribute("onclick", "location.href='about.html'");
        template.innerHTML = "About";
    } else {
        template.setAttribute("onclick", "location.href='license.html'");
        template.innerHTML = "License";
    }
    parent.appendChild(template);
}
$(function() {
    $("#menu-toggle-button").click(function() {
        $("#sidebar-wrapper").animate({
            left: '+=200'
        }, 'fast');
		toggled = true;
    });
	$("body > *").not("#sidebar-wrapper, #sidebar, #menu-buttons").mousedown(function() {
		if(toggled) {
			$("#sidebar-wrapper").animate({
				left: '-=200'
			}, 'fast');
			toggled = false;
		}
	});
    $("#start-button").click(function() {
        $("#start-wrapper").fadeOut(500, function() {
            $("#start-wrapper").remove()
        });
    });
});