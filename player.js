var player = $("#player");
player.on("ended", pop);

playlist = $("#playlist");
playlist.sortable({axis:'y'});
playlist.on("dragenter", dragenter);
playlist.on("dragover", dragover);
playlist.on("drop", drop);
playlist.on("sortupdate", play_top);

helper = $("<li style=\"visibility: hidden;\">potential</li>")

function pop() {
	console.log("song finished");
	playlist.children(":first").remove();
	play_top();
}

function play_top() {
	var url = playlist.find(":first").attr('src');
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

function updateList(target, name, url) {
	var element = $("<li src=\"" + url + "\">" + name + "</li>");
	insertBelow(target, element);
}

function drop(e) {  
	e.stopPropagation();  
	e.preventDefault();  
	e = e.originalEvent || e;
	window.URL = window.URL || window.webkitURL;
	
	var files = e.dataTransfer.files;  

	console.log(files)
	for(i=0;i<files.length;i++) {
		var name = files[i].name
		var target = e.target;
		var url = window.URL.createObjectURL(files[i]);
		updateList(target, name, url);
	}
	helper.detach();
	play_top();
}
