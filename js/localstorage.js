var e;
var localStorage=window.localStorage;


function save(){
	localStorage.clear();
	for(var j=1;j<i;j++){
		localStorage.setItem(j,document.getElementById(j).value+")))((("+document.getElementById(j).style.left+","+document.getElementById(j).style.top);
		//")))((("기준 앞은 텍스트값, 뒤는 좌표값 ","기준으로 앞에는 x값, 뒤에는 y값
	}
}

function loading(){
	i=localStorage.length+1;
	for(var j=1;j<=localStorage.length;j++){
		document.getElementById("droptarget").innerHTML+="<textarea id="+j+" draggable=true></textarea>";
	}
	for(var j=1;j<=localStorage.length;j++){
		var text=localStorage.getItem(j);
		var valuetext=text.split(')))(((');
		var mouse_coordinate=valuetext[1].split(',');
		
		textarea=document.getElementById(j);
		textarea.style.position="absolute";
		textarea.style.left=(mouse_coordinate[0]);
		textarea.style.top=(mouse_coordinate[1]);
		textarea.value=valuetext[0];
		textarea.placeholder="메모내용을 적어주세요.";
		textarea.ondragstart=function dragstart(event,id){ event.dataTransfer.setData("Text",event.target.id);}
		textarea.ondrag=function drag(event,id){e=this.id;};
		textarea.ondrop=function drop(event,id){event.preventDefault();   data = event.dataTransfer.getData("Text");e=this.id};
		textarea.onmouseover=function mouseover(id){ var a = document.getElementById(this.id); a.style.color="red";};
		textarea.onmouseout=function mouseout(id){ var a = document.getElementById(this.id); a.style.color="black";};
	}
}
