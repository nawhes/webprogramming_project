var i=1;
var e;
var mouse_x;
var mouse_y;

function drag(event,id){ //드래그 중 이벤트 발생
	e=this.id;
}

function dragstart(event){ //드래그 시작할 때 이벤트 발생
	event.dataTransfer.setData("Text",event.target.id); //드래그 데이터 전달 
}

function allowdrop(event,id){ //드롭 할 수 있게 allow, 드롭 지점 위에 있을시 이벤트 발생
	event.preventDefault();
	var a = document.getElementById(id);
	 if(id=="deleteMemo"){
      a.src='src/can_o.png';
   }

}

function dragend(){
	var a=document.getElementById("deleteMemo");
	a.src='src/can_s.png';
}

function drop(event,id){ //드롭 시 이벤트 발생
	event.preventDefault();
	var data = event.dataTransfer.getData("Text");
	var Textarea = document.createElement('textarea'); // 드롭 될 때마다 동적 생성
		if(event.target.id=="droptarget"){ //메모 공간에 드롭할 시
			if(data=="newMemo"){//droptarget에 drop된 포스트잇이  또 다시 droptarget 영역에 drop되는걸 방지하기 위한 flag
				Textarea.id=i;//동적 id 설정
				Textarea.draggable="true";
				Textarea.ondragstart=function dragstart(event,id){ event.dataTransfer.setData("Text",event.target.id);};
				Textarea.ondrag=function drag(event,id){e=this.id;};
				Textarea.ondrop=function drop(event,id){event.preventDefault();   data = event.dataTransfer.getData("Text");e=this.id};
				Textarea.onmouseover=function mouseover(id){ var a = document.getElementById(this.id); a.style.color="red";};
				Textarea.onmouseout=function mouseout(id){ var a = document.getElementById(this.id); a.style.color="black";};
				Textarea.placeholder="메모내용을 적어주세요.";
				Textarea.style.backgroundImage="url('src/notebbg.png')";
				event.target.appendChild(Textarea);//만들어진 객체를 droptarget의 자식 노드로 설정
				move(i);
				i++;//id값 증가
			}
			else if(data!="newMemo"){
				move(data);
			}
		}
	else if(event.target.id=="deleteMemo"){ //휴지통에 드롭할 시 
		var a = document.getElementById(event.target.id);
		a.src='src/can_s.png';
		if(data!="newMemo"){//data는 새로운 메모를 만들 때 전송받는 id값(새로운 메모가 deletememo로 바로 갈 시 data==newMemo , datatarget 거쳐서 갈 시 data == data(i) 따라서, data값이 newmemo가 아니라 data(i)일경우 삭제) (index값이 줄어들지 않기 위해서 사용)
			var parent = document.getElementById('droptarget');//droptarget에 있는 자식 노드 검색 하기 위해 사용
			var nodes = parent.childNodes;//droptarget에 있는 자식노드들 구함
			for(a=1; a<nodes.length;a++){//deletememo에 drop 될 시 drop된 포스트잇의 id값과 droptarget에 있는 자식들 모두 비교
				if(nodes.item(a).id == e){//자식 노드에 존재 할 때
					var f = document.getElementById(parseInt(e)+1);//마지막 노드일 경우를 확인
					parent.removeChild(document.getElementById(nodes.item(a).id));
					if(f==null){//마지막 노드로서 나보다 높은 인덱스를 가진 노드는 없다. 따라서 null일 경우
						i-=1;//새로운 포스트 잇 만들 때 부여하는 id값 하나 감소
					}
					else{//마지막 노드가 아닐 경우 지워진 포스트잇 기준으로 높은 인덱스를 가진 노드의 id값 하나씩 감소
						for(var a=parseInt(e)+1;a<=nodes.length;a++){
							document.getElementById(a).setAttribute('id',a-1);
						}
						i-=1;//새로운 포스트 잇 만들 때 부여하는 id값 하나 감소 
					}
				}
			}
		}
		else if(data=="newMemo"){
			alert("메모를 작성하고 휴지통으로 보내주세요.");
		}
	}
}

function move(data){
	e=window.event;
	mouse_x = e.clientX;
	mouse_y = e.clientY;
	document.getElementById(data).style.position = "absolute";
	document.getElementById(data).style.left = (mouse_x-60) + "px";
	document.getElementById(data).style.top = (mouse_y-60) + "px";
}

