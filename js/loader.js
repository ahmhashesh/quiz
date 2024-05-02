////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[{src:'assets/logo.png', id:'logo'},
			{src:'assets/brain_score.png', id:'brainScore'},
			{src:'assets/brain_result.png', id:'brainResult'},
			{src:'assets/icon_facebook.png', id:'iconFacebook'},
			{src:'assets/icon_twitter.png', id:'iconTwitter'},
			{src:'assets/icon_whatsapp.png', id:'iconWhatsapp'},
			{src:'assets/arrow.png', id:'arrow'},
			{src:'assets/loader_Spritesheet5x5.png', id:'loader'},
			{src:'assets/brainIdea_Spritesheet4x4.png', id:'brainCorrect'},
			{src:'assets/brainWrong_Spritesheet4x4.png', id:'brainWrong'},
			
			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/item_exit.png', id:'itemExit'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'}];
	
	if ( typeof addScoreboardAssets == 'function' ) { 
		addScoreboardAssets();
	}
	
	soundOn = true;
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}else{
		if(!enableDesktopSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/whoosh.ogg', id:'soundWhoosh'})
		manifest.push({src:'assets/sounds/select.ogg', id:'soundSelect'})
		manifest.push({src:'assets/sounds/selectAnswer.ogg', id:'soundSelectAnswer'})
		manifest.push({src:'assets/sounds/scoreBrainIdea.ogg', id:'soundScoreBrainIdea'})
		manifest.push({src:'assets/sounds/wrong.ogg', id:'soundWrong'})
		manifest.push({src:'assets/sounds/scoreBrain.ogg', id:'soundScoreBrain'})
		manifest.push({src:'assets/sounds/fail.ogg', id:'soundFail'})
		manifest.push({src:'assets/sounds/complete.ogg', id:'soundComplete'})
		manifest.push({src:'assets/sounds/musicMain.ogg', id:'musicMain'})
		manifest.push({src:'assets/sounds/musicGame.ogg', id:'musicGame'})
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}