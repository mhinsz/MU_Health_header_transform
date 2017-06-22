$(document).ready(function(){
	
	$('.podDesc a, a[href="http://yesfindsaway.com"]').click(function(){
		var url = $(this).attr('href');
		ga('send', 'event', 'External Link', 'Click', url);
	});
	
	setTimeout(function(){
		$('.tagline1').animate({opacity:'0'},1000);
		$('.tagline2').delay(500).animate({opacity:'0'},1000, function(){
			$('.tagline2').html('can do anything.').animate({opacity:'1'},1000);
		});
	}, 2400);
	
	$('.info-box .button').click(function(){
		if($(window).width() > 794){
			ga('send', 'event', 'Button', 'Click', 'What is YES');
			$(this).addClass('clicked');
			$('.info-box p').fadeOut(function(){
				$('.info-box').animate({right:'50%',width:'50%',height:'516px',marginTop:'0'},1000);
				$('#main-holder').animate({'margin-top':'0px'},1000);
				$('.pod-container').animate({'margin-top':'50px'},1000);
				$('.big.white').animate({marginRight:'85px',fontSize:'20vw',marginTop:'50px',right:'50%'}, 1000);
				$('.info-box .big').animate({right:'85px',fontSize:'20vw',marginTop:'50px'},1000,function(){
					
					$('.option-box').show().animate({'top':'0px'},1500);
					
					$('.main_copy').css({'padding':'15px 90px'}).fadeIn(1000, function(){

					});
				});
			});
		}
	});

	$('.socialNav').click(function(){
		$('.mobile-nav').fadeOut();
		$('.social_posts').fadeToggle();
	});

	$('.hmbgr').click(function(){
		$('.social_posts').fadeOut();
		$('.mobile-nav').fadeToggle();
	});

	$('.overlay').hover(function(){
			$('.overlay').removeClass('hot');
			$(this).addClass('hot');
			dataOption = $(this).attr('data-option');
			$('.snipit').fadeOut(500);
			setTimeout(function(){
				$('.snipit.'+dataOption).fadeIn();
			}, 500);
		}, function(){
	});

	$('.podImg img').click(function(){
		//$('body').prepend('<div class="overlay-bg"><div class="overlay-content popup1"><div class="close-button">+</div></div></div>');
		$('body').prepend('<div class="overlay-bg"><div class="close-button">+</div></div>');
		var imgPath = $(this).attr('data-src');
		ga('send', 'event', 'Video', 'Video started', '_vid/'+imgPath);
        var flash =  '<object type="application/x-shockwave-flash" data="_vid/'+imgPath+'.swf?autostart=true" width="1080" height="600">';
			flash += '<param name="movie" value="_vid/'+imgPath+'.swf?autostart=true" />';
			flash += '<param name="allowFullScreen" value="true" />';
			flash += '<param name="wmode" value="transparent" />';
			flash += '<param name="flashVars" value="controlbar=over&amp;file=_vid/'+imgPath+'.swf&amp;autostart=true" />';
			flash += '</object>';

		$('.overlay-bg').append('<video id="popupvideo" name="popupvideo" autoplay controls="controls"><source src="_vid/'+imgPath+'.webm" type="video/webm" /><source src="_vid/'+imgPath+'.mov" />'+flash+'video not supported</video>');
		$('.close-button').css('right','10px');
		$('.overlay-bg').fadeIn();
		
		
		
		if (/Mobi/.test(navigator.userAgent)) {
			$('#popupvideo').addClass('video-mobile');
		} else {
			$('#popupvideo').addClass('video-desk');
			$('#popupvideo').center('both');
		}

		$('body').on('click', '.close-button', function() {
			$('.overlay-bg').fadeOut(function(){
				var curtime = $('#popupvideo')[0].currentTime;
				var url = $('#popupvideo').children('source').attr('src');
				ga('send', 'event', 'Video', 'Ended at ' + Math.round(curtime) + ' seconds', url);
				$('.overlay-bg').remove();
			});
			
		});
		document.getElementById('popupvideo').addEventListener('ended',myHandler,false);
		
		$('#video').bind('play ended', function () { //should trigger once on any play and ended event
			$('.playbtn').addClass('pausebtn'); //might also be $('#playbtn') ???
		});
	});

	$('#main-holder .pod').hover(function(){
			//$(this).children('.podDesc').animate({'margin-top': '0'}, 500 );
			$(this).addClass('hot');
		}, function(){
			//$(this).children('.podDesc').animate({'margin-top': '222px'}, 500 );
			$(this).removeClass('hot');
	});
	
	$('.yesOverlay').click(function(){
		var url = $(this).next('.podDesc').children('a').attr('href');
		ga('send', 'event', 'External Link', 'Click', url);
		window.open(url, '_blank');
	});

});

function myHandler(e) {
	if(window.console) console.log('close!: ');
	$('.overlay-bg').fadeOut(function(){
		var url = $('#popupvideo').children('source').attr('src');
		ga('send', 'event', 'Video', 'Completed', url);
		$(this).remove();
	});
}

//=== Extend jquery ============================================================

/********************************************************************************
* jQuery.center()
* PURPOSE:  Centers an element vertically and/or horizontally
* accepts 'vert', 'hor', or 'both'
********************************************************************************/

jQuery.fn.center = function(posToCenter) {
	this.css("position","absolute");
	if(posToCenter == 'vert' || posToCenter == 'both' ){
		this.css("top", Math.max(20, ( ( $(window).height() - $(this).height() ) / 2))  + "px");
	}
	if(posToCenter == 'hor' || posToCenter == 'both' ){
		this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth())  / 2) + $(window).scrollLeft()) + "px");
		//if(window.console) console.log('hor: win: '+$(window).width() +' outer: '+ $(this).outerWidth() +' scroll: '+$(window).scrollLeft());
	}

	//var widthCur = Math.max(0, (($(window).width() - $(this).outerWidth())  / 2) + $(window).scrollLeft());
	//if(window.console) console.log('widthCur: '+widthCur);

	return this;
}