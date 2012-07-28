var player = $("#player");
player.on("ended", pop);

playlist = $("#playlist");
playlist.sortable({'axis':'Y'});
playlist.on("dragenter", dragenter);
playlist.on("dragover", dragover);
playlist.on("drop", drop);
playlist.on("sortupdate", play_top);

helper = $("<li style=\"visibility: hidden;\"></li>")

function pop() {
	playlist.children(":first").remove();
	play_top();
}

function play_top() {
	var url = playlist.find("li:first a").attr('href');
	if(player.attr('src') != url) {
		player.attr('src', url);	
	}
}

function insertBelow(el, node) {
	var target = $(el);
	if(target.is(playlist)) {
		playlist.append(node);
	} else if(target.is(node)) {
		console.log("locking...");
	} else {
		target.after(node);
	}
}

function dragenter(e) { 
	insertBelow(e.target, helper);
	e.preventDefault();
	e.stopPropagation();	
}  

function dragover(e) {  
	e.preventDefault();  
	e.stopPropagation();
}

function updateList(target, name) {
	return function(ev) {
		ev.target.result;
		var element = $("<li><a href=\"" + ev.target.result + "\">" + name + "</a></li>");
		insertBelow(target, element);
		play_top();
	}
}

function drop(e) {  
	e.stopPropagation();  
	e.preventDefault();  
	e = e.originalEvent || e;

	
	var files = e.dataTransfer.files;  

	console.log(files)
	for(i=0;i<files.length;i++) {
		var name = files[i].name
		var target = e.target;
		fr = new FileReader();
		fr.onload = updateList(target, name);
		fr.readAsDataURL(files[i]);
	}
	helper.detach();
}
