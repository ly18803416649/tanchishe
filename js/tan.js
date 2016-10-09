$(function(){
	var contain = $('.contain');
	console.log(contain);

	for(var i=0;i<20;i++){
       for(var j=0;j<20;j++){
		   $('<div>').addClass('block')
			   .attr('id',i+'_'+j)
			   .appendTo(contain);
	   }
	}

    var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	var shebiao={'0_0':true,'0_1':true,'0_2':true};

	function findDiv(x,y) {
		return $('#'+x+'_'+y);
	}

	$.each(she,function (i,v) {
		findDiv(v.x,v.y).addClass('she');
	})

	function fangshiwu() {
		do{
			var x = Math.floor(Math.random()*19);
			var y = Math.floor(Math.random()*19);
		}while (shebiao[x+'_'+y])

		findDiv(x,y).addClass('food');
		return({x:x,y:y});
	}
    shiwu = fangshiwu();
	derection = 'you';

	function move() {
		var jiutou = she[she.length-1];


		if(derection=='you'){
			var xintou = {x:jiutou.x,y:jiutou.y+1};
		}
		if(derection=='zuo'){
			var xintou = {x:jiutou.x,y:jiutou.y-1};
		}
		if(derection=='shang'){
			var xintou = {x:jiutou.x-1,y:jiutou.y};
		}
		if(derection=='xia'){
			var xintou = {x:jiutou.x+1,y:jiutou.y};
		}

        if(xintou.x<0||xintou.x>19||xintou.y<0||xintou.y>19){
            clearInterval(t);
			alert('撞墙了');
			return;
		}

		if(shebiao[xintou.x+'_'+xintou.y]){
			clearInterval(t);
			alert('撞到自己了');
			return;
		}

        she.push(xintou);
		shebiao[xintou.x+'_'+xintou.y]=true;
		findDiv(xintou.x,xintou.y).addClass('she');

		if(xintou.x==shiwu.x&&xintou.y==shiwu.y){
			findDiv(shiwu.x,shiwu.y).removeClass('food');
			shiwu = fangshiwu();
		}else{
			var weiba = she.shift();
			delete shebiao[weiba.x+'_'+weiba.y];
			findDiv(weiba.x,weiba.y).removeClass('she');
		}


	}

	var t = setInterval(move,100);

	$(document).on('keyup',function (e) {
		var biao={37:'zuo',38:'shang',39:'you',40:'xia'}
		var fanbiao={'zuo':37,'shang':38,'you':39,'xia':40};
		if(Math.abs(e.keyCode-fanbiao[derection])==2){
			return;
		}
		if(biao[e.keyCode]){
			derection = biao[e.keyCode];
			// console.log(derection);
		}
	})
})