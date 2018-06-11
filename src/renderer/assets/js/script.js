window.onload=function(){
	$(".main").css("opacity","1");
	$(".pre_load").css("display","none");
   
    
    $(".page4 .list ul li").click(function(){
    	$(".pop").show();
    	var index=$(this).index();
    	$(".pop").eq(index).show();    	
    })
    $(".page4 .close").click(function(){
    	$(".pop").hide()
    })
        
    $(".page6 .list-text ul li").click(function(){
    	var index=$(this).index();
    	$(".pop").show();    	
    })
    $(".page6 .pop .back").click(function(){
    	$(".pop").hide()
    })
    
    $(".page7 .list-text ul li").click(function(){
    	var index=$(this).index();
    	$(".pop").show();    	
    })
    $(".page7 .pop .back").click(function(){
    	$(".pop").hide()
    })
    
    $(".page8 .list-text ul li").click(function(){
    	var index=$(this).index();
    	$(".pop").show();    	
    })
    $(".page8 .pop .back").click(function(){
    	$(".pop").hide()
    })
    
    $(".page1 .imag img").click(function(){
    	$(".popBox").show();
    	var index=$(this).index();
    	$(".pop").eq(index).show();    	
    })
    $(".page1 .close").click(function(){
    	$(".popBox").hide();
    	$(".pop").hide()
    })
}		