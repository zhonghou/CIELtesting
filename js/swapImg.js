//Developed By
//Ted Lai - www.mynameisted.com
//Nanyang Polytechnic
(function($){
	$.fn.extend({ 
		setDelay: function (callFunction, delayTime){
			var fireDelay = setTimeout(callFunction, delayTime);
			//function callFunction(){
				//Add animation class after delay
				//animationTarget.addClass(animationType);
			//}
		},

		//plugin name - swapImg
		swapImg: function(options) {
			//Settings list and the default values
			var defaults = {
				delayTime: 0,
				oldPic:"",		//old pic class
				newPic: "",		//new pic class
				swapSpeed: 250,		//speed of fadeIn/Out animation for image swap
				callBack: $.noop
			};
			//setting the received parameters to overwrite default settings if applicable
			var options = $.extend(defaults, options);
			
    		return this.each(function() {
    			//Assign current element to variable
				var obj = $(this);
				//setting options to variable	
				var o =options;
				 //$(o.newPic).fadeOut(0);

//				obj.setDelay(function(){
					//fade out current picture
					$(o.oldPic).fadeOut(o.swapSpeed,function(){
    					//while hidden, change src to new image
    					//fade image back in
    						$(o.newPic).fadeIn(o.swapSpeed, function(){
		    					//set opacity and visibility to true
		    					$(o.newPic).css({"opacity":"1","visibility":"visible"});
		    					if($.isFunction(o.callBack)) {
					        		// call user provided method
					            	o.callBack.call();
				        		}
	    					});
    					
    									
    				});
				// }, o.delayTime)
				
    		});
    	}
	});
})(jQuery);