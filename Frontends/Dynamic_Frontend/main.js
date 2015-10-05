function arg(arg_name, argument_list){
    this.arg_name =  arg_name
    this.argument_list = argument_list
}

dial_init = function(){
    $(".dial").knob({
	'font' : "AvenirNext-UltraLight",
	'change' : function(val) {
	    var final_message;
	    var name = this.$.attr("data-name");
	    var final_message_filt = name +" "+ parseInt(val);
	    socket.emit('chanmsg', final_message_filt);
	}
    }); //Dial handled here

}

parseOrcLineAndRender = function(str){
    var new_str = str.split(" ");
    var dial_str_head = '<div class="knob_container"><input type="text" value="0" class="dial" data-fgcolor="#0CA7DB" data-angleOffset="-125" data-angleArc="256" data-min="0" data-max="880" data-thickness="0.1" data-width="125" data-height="125" data-font-family="Avenir" data-font-weight="300" data-name='

    var dial_str_mid = '> <div class="knob_name"> '

    var dial_str_tail = "</div> </div>"

    if(new_str[1] == "chnget"){
	console.log("Rendering Channel Controller for this");
	var new_str = dial_str_head + new_str[2] + dial_str_mid + new_str[2] + dial_str_tail
	$(".parsed_knobs").append(new_str);
	dial_init();
    }

}
sanitize = function(orc_str){
    args_arr = [];
    args_start = orc_str.indexOf("[{");
    args_end = orc_str.indexOf("}]");
    args_str = orc_str.slice(args_start, args_end+2);
    args_arr = args_str.split("\n");
    str_arr = orc_str.split("\n");
    console.log(str_arr.indexOf("[{"));
    str_arr_final = str_arr.slice(0, str_arr.indexOf("[{"));
    console.log(str_arr_final.indexOf("[{"));
    console.log(args_str);
    console.log(args_arr);
    parseArgs(args_arr);
    return str_arr_final;
}

parseOrc = function(str_arr){
    $(".parsed_knobs").html(" ");
    console.log()
    for(var i =0; i < str_arr.length; i++){
	parseOrcLineAndRender(str_arr[i]);
    }
    $(".parsed_elements_container").fadeIn("fast");
}


$(document).ready(function(){
    var active = 0;
    var seq_list = [];

    $(".dial").knob({
	   'font' : "AvenirNext-UltraLight",
	   'change' : function(val) {
	       var final_message;
	       var name = this.$.attr("data-name");
	       var final_message_filt = name +" "+ parseInt(val);
	       socket.emit('chanmsg', final_message_filt);
	   }
    }); //Dial handled here

    $(".button").hover(function(){
	   $(this).transition({scale: 1.01});
    }); //Button hover

    $(".button").mouseout(function(){
	   $(this).transition({scale: 1.0});
    }); //Button hover 2
    $(".key").click(function(){
	console.log($(this).attr("data"));
	var final_mesg = "note_message " + ($(this).attr("data"));
	socket.emit('note_message', final_mesg);
    }); //Pressing the button

    $(".button").click(function(){
	$(this).transition({scale: 0.98}).transition({scale:1.0});
	if($(this).attr("data") == "compile"){
	    var orc = "instr 1\n " +
		"kFilt chnget \"freq\"\n" +
		"kReso chnget \"reso\"\n" +
		"a1 oscili 0.8, cpsmidinn(p4)\n" +
		"a2 butterbp a1, kFilt, kReso\n" +
		"outs a2*2,a2*2\n" +
		"endin"
	    socket.emit('orc', orc);
	} // Send a sample orchestra
	if($(this).attr("data") == "score"){
	    var score_event = "i 1 0 -1 60"
	    socket.emit('sco', score_event);
	    $(this).css("display", "none");
	} // Send a midi note 60 forever.
	if($(this).attr('data') == "stop"){
	    csound.Pause();
	} // Pause!
    });

    $(".seq_button").click(function(){
	   // Animation stuff here:
	   $(this).transition({scale: 0.98}).transition({scale:1.0});
	   //array stuff
	   if($(this).hasClass("active") == false){
		  seq_list.push(($(this).children(".midi_note").html()));
		  var final_mesg = "/note " + ($(this).children(".midi_note").html());
		  console.log(final_mesg);
		  socket.emit('message',final_mesg);
//		  $(this).addClass("active");
	   }else{
		  console.log(seq_list.indexOf($(this).children(".midi_note").html()));
		  var ind = seq_list.indexOf($(this).children(".midi_note").html());
		  seq_list.splice(ind,1);
//		  $(this).removeClass("active");
	   }
	   console.log(seq_list);
    });
    $(".help_button").click(function(){
	   $(".help_screen").fadeToggle(400);
    }); //Help screen.

    $(".send").click(function(){
	var string = $(".editor").val();
	parseOrc(string);
	socket.emit("orc", string)
    })
    $(".up").click(function(){
	$(".floating_keyboard").fadeToggle();
	$(this).toggleClass("rotate");
    });
    var clicked = 0;
    $(".slide_in").click(function(){
	console.log("Expansion of parsed_elements_container happens here!");
	$(this).toggleClass("rotate");
	if (clicked == 0){
	    $(".parsed_elements_container").transition({width: '100%'}, 'slow', 'ease');
	    $(".floating_keyboard").fadeIn("fast");
	    clicked = 1
	}else{
	    $(".parsed_elements_container").transition({width: '20%'});
	    $(".floating_keyboard").fadeOut("fast");
	    clicked = 0;
	}
    });
});
