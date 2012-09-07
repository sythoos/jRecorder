/*
 * jRecorder Plugin for jQuery JavaScript Library (Alpha)
 * http://www.sajithmr.me/jrecorder
 *
 * Copyright (c) 2011 - 2013 Sajithmr.ME
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Author: Sajith Amma
 * Version: 1.1
 * Date: 14 December 2011
 */

/* Code is not verified using http://www.jshint.com/ */


(function ($){
	
	
	var methods = {
    	play : function( options ) { 
					
					alert(options);
				
	 			},
    	pause : function( ) { }
    
  	};

	
	var jRecorderSettings = {} ;
	
	$.jRecorder = function( options, element ) {
		// allow instantiation without initializing for simple inheritance
		
		
		if(typeof(options) == "string")
		{
			if ( methods[options] ) 
			{
				return methods[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
				
			}
			return false;
		}
		
		//if the element to be appended is not defind, append to body
		if(element == undefined)
		{
			element = $("body");
		}
			
		//default settings
						var settings = {
		
						'rec_width': '300',
						'rec_height': '200',
						'rec_top': '0px',
						'rec_left': '0px',
						'recorderlayout_id' : 'flashrecarea',
						'recorder_id' : 'audiorecorder',
						'recorder_name': 'audiorecorder',
						'wmode' : 'transparent',
						'bgcolor': '#ff0000',
						'swf_path': 'jRecorder.swf',
						'host': 'acceptfile.php?filename=hello.wav',
						'callback_started_recording' : function(){},
						'callback_finished_recording' : function(){},
						'callback_stopped_recording': function(){},
						'callback_error_recording' : function(){},
						'callback_activityTime': function(time){},
						'callback_activityLevel' : function(level){}
						
						
						
		
		
						};
	
	
						//if option array is passed, merget the values
						if ( options ) { 
					        $.extend( settings, options );
					     }
		
						jRecorderSettings = settings;
						
						
						
							if($.browser.msie && Number($.browser.version) <= 8) {
							var objStr = '<object  name="'+ settings['recorder_name'] +'" id="' + settings['recorder_id'] + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+ settings['rec_width'] +'" height="'+ settings['rec_height']+'"></object>';

							var paramStr = [
								'<param name="movie" value="'+ settings['swf_path'] + '?host=' + settings['host'] +  '" />',
								
								'<param name="allowScriptAccess" value="always" />',
								'<param name="bgcolor" value="' + settings['bgcolor'] + '" />',
								'<param name="wmode" value="' +  settings['wmode'] + '" />'
							];

							htmlObj = document.createElement(objStr);
							for(var i=0; i < paramStr.length; i++) {
								htmlObj.appendChild(document.createElement(paramStr[i]));
							}
							
							
							//var divStr = ' <div id="'+ settings['recorderlayout_id'] +'" style="position:absolute;top:0px;left:0px;z-index:-1" ></div>';
							//var divObj = document.createElement(divStr);
							
							
						} else {
							var createParam = function(el, n, v) {
								var p = document.createElement("param");
								p.setAttribute("name", n);	
								p.setAttribute("value", v);
								el.appendChild(p);
							};

							htmlObj = document.createElement("object");
							htmlObj.setAttribute("id", settings['recorder_id'] );
							htmlObj.setAttribute("name", settings['recorder_name'] );
							htmlObj.setAttribute("data",  settings['swf_path'] + '?host=' + settings['host'] );
							htmlObj.setAttribute("type", "application/x-shockwave-flash");
							htmlObj.setAttribute("width", settings['rec_width']); // Non-zero
							htmlObj.setAttribute("height", settings['rec_height']); // Non-zero
							
							createParam(htmlObj, "allowscriptaccess", "always");
							createParam(htmlObj, "bgcolor", settings['bgcolor']);
							createParam(htmlObj, "wmode", settings['wmode'] );
							
							
							
							
						}


						var divObj = document.createElement("div");
						
						divObj.setAttribute("id", settings['recorderlayout_id']);
						divObj.setAttribute("style", "position:absolute;top:"+ settings['rec_top'] +";left:"+ settings['rec_left'] +";z-index:-1");
						
						divObj.appendChild(htmlObj);
						
						
						element.append(divObj);
						
		
		
		
		
		
		
		
	};
	
	//function call to start a recording
	$.jRecorder.record = function(max_time){
		
		
								//change z-index to make it top
								$(  '#' + jRecorderSettings['recorderlayout_id'] ).css('z-index', 1000);
								getFlashMovie(jRecorderSettings['recorder_name']).jStartRecording(max_time);
							
							
		
						} 

	//function call to stop recording					
	$.jRecorder.stop = function(){
					
		getFlashMovie(jRecorderSettings['recorder_name']).jStopRecording();
							
	} 
		
	//function call to send wav data to server url from the init configuration					
	$.jRecorder.sendData = function(){
					
		getFlashMovie(jRecorderSettings['recorder_name']).jSendFileToServer();
							
	} 
	
	$.jRecorder.callback_started_recording = function(){
		
	
		jRecorderSettings['callback_started_recording']();
		
	}
	
	
	$.jRecorder.callback_finished_recording  = function(){
		
		jRecorderSettings['callback_finished_recording']();
		
	}
	
	$.jRecorder.callback_error_recording = function(){
		
		jRecorderSettings['callback_error_recording']();
		
	}
	
	$.jRecorder.callback_stopped_recording = function(){
		
		jRecorderSettings['callback_stopped_recording']();
	}
	
	
	$.jRecorder.callback_finished_sending = function(){
		
		jRecorderSettings['callback_finished_sending']();
		
	}
	
	$.jRecorder.callback_activityLevel = function(level){
		
		jRecorderSettings['callback_activityLevel'](level);	
		
	}
	
	$.jRecorder.callback_activityTime = function(time){
		
		//put back flash while recording
		$(  '#' + jRecorderSettings['recorderlayout_id'] ).css('z-index', -1);
		
		jRecorderSettings['callback_activityTime'](time);
		
	}
	
		
					
	
	//function to return flash object from name
	function getFlashMovie(movieName) {
       var isIE = navigator.appName.indexOf("Microsoft") != -1;
       return (isIE) ? window[movieName] : document[movieName];
     }


	
})(jQuery);



