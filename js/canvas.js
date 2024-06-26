////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.framerate = 60;
	createjs.Ticker.addEventListener("tick", tick);	
}

var canvasContainer, mainContainer, categoryContainer, gameContainer, questionContainer, editContainer, resultContainer;
var bg, logo, startButton, arrowLeft, arrowRight, categoryTxt, categoryTitleTxt, categoryContinueTxt, questionTxt, scoreTxt, timerBar, brainScore, brainResult, buttonReplay, resultDescTxt, resultScoreTxt, iconFacebook, iconTwitter, iconWhatsapp, resultShareTxt, loaderData, loaderAnimate, brainCorrectData, brainCorrectAnimate, brainWrongData, brainWrongAnimate;
$.question={};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	touchAreaContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	categoryContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	editContainer = new createjs.Container();
	questionContainer = new createjs.Container();
	imageContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	bg = new createjs.Shape();
	bg.graphics.beginFill(backgroundColour).drawRect(0, 0, canvasW, canvasH);
	
	logo = new createjs.Bitmap(loader.getResult('logo'));
	
	startButton = new createjs.Text();
	startButton.font = "50px bariol_regularregular";
	startButton.color = "#ffffff";
	startButton.text = loadingText;
	startButton.textAlign = "center";
	startButton.textBaseline='alphabetic';
	startButton.x = canvasW/2;
	startButton.y = canvasH/100*83;
	
	arrowLeft = new createjs.Bitmap(loader.getResult('arrow'));
	arrowRight = new createjs.Bitmap(loader.getResult('arrow'));
	centerReg(arrowLeft);
	centerReg(arrowRight);
	
	arrowLeft.x = canvasW/100 * 10;
	arrowRight.x = canvasW/100 * 90;
	arrowLeft.scaleX = -1;
	arrowLeft.y = arrowRight.y = canvasH/2;
	
	createHitarea(arrowLeft);
	createHitarea(arrowRight);
	
	categoryTxt = new createjs.Text();
	categoryTxt.font = "70px bariol_regularregular";
	categoryTxt.color = "#ffffff";
	categoryTxt.text = '';
	categoryTxt.textAlign = "center";
	categoryTxt.textBaseline='alphabetic';
	categoryTxt.x = canvasW/2;
	categoryTxt.y = canvasH/100*30;
	
	categoryTitleTxt = new createjs.Text();
	categoryTitleTxt.font = "140px bariol_regularregular";
	categoryTitleTxt.color = "#ffffff";
	categoryTitleTxt.text = 'RIDDLE';
	categoryTitleTxt.textAlign = "center";
	categoryTitleTxt.textBaseline='alphabetic';
	categoryTitleTxt.x = canvasW/2;
	categoryTitleTxt.y = canvasH/100 * 58;
	
	categoryContinueTxt = new createjs.Text();
	categoryContinueTxt.font = "50px bariol_regularregular";
	categoryContinueTxt.color = "#ffffff";
	categoryContinueTxt.text = categoryContinueText;
	categoryContinueTxt.textAlign = "center";
	categoryContinueTxt.textBaseline='alphabetic';
	categoryContinueTxt.x = canvasW/2;
	categoryContinueTxt.y = canvasH/100 * 83;
	
	var _frameW=96;
	var _frameH=33;
	var _frame = {"regX": (_frameW/2), "regY": (_frameH/2), "height": _frameH, "count": 25, "width": _frameW};
	var _animations = {static:{frames: [0]},
						loading:{frames: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], speed: 1, next:'loading'}};
						
	loaderData = new createjs.SpriteSheet({
		"images": [loader.getResult("loader").src],
		"frames": _frame,
		"animations": _animations
	});
	
	loaderAnimate = new createjs.Sprite(loaderData, "static");
	loaderAnimate.framerate = 20;
	loaderAnimate.x = canvasW/2;
	loaderAnimate.y = canvasH/2;
	
	var _frameW=260;
	var _frameH=250;
	var _frame = {"regX": (_frameW/2), "regY": (_frameH/2), "height": _frameH, "count": 15, "width": _frameW};
	var _animations = {static:{frames: [0]},
						correct:{frames: [1,2,3,4,5,6,7,8,9,10,11,12,13,14], speed: 1, next:'complete'},
						complete:{frames:[14]}};
	//game
	brainCorrectData = new createjs.SpriteSheet({
		"images": [loader.getResult("brainCorrect").src],
		"frames": _frame,
		"animations": _animations
	});
	
	brainCorrectAnimate = new createjs.Sprite(brainCorrectData, "static");
	brainCorrectAnimate.framerate = 20;
	brainCorrectAnimate.x = canvasW/2;
	brainCorrectAnimate.y = canvasH/2;
	
	var _frameW=260;
	var _frameH=250;
	var _frame = {"regX": (_frameW/2), "regY": (_frameH/2), "height": _frameH, "count": 15, "width": _frameW};
	var _animations = {static:{frames: [0]},
						wrong:{frames: [1,2,3,4,5,6,7,8,9,10,11,12,13,14], speed: 1, next:'complete'},
						complete:{frames:[14]}};
	//game
	brainWrongData = new createjs.SpriteSheet({
		"images": [loader.getResult("brainWrong").src],
		"frames": _frame,
		"animations": _animations
	});
	
	brainWrongAnimate = new createjs.Sprite(brainWrongData, "static");
	brainWrongAnimate.framerate = 20;
	brainWrongAnimate.x = canvasW/2;
	brainWrongAnimate.y = canvasH/2;
	
	questionTxt = new createjs.Text();
	questionTxt.font = "70px bariol_regularregular";
	questionTxt.color = questionTextColour;
	questionTxt.textAlign = 'left';
	questionTxt.textBaseline='alphabetic';
	questionTxt.x = canvasW/100 * 5;
	questionTxt.y = canvasH/100 * 10;
	
	scoreTxt = new createjs.Text();
	scoreTxt.font = "70px bariol_regularregular";
	scoreTxt.color = questionTextColour;
	scoreTxt.textAlign = 'right';
	scoreTxt.textBaseline='alphabetic';
	scoreTxt.text = 0;
	scoreTxt.x = canvasW/100 * 47;
	scoreTxt.y = canvasH/100 * 10;
	
	timerBar = new createjs.Shape();
	
	brainScore = new createjs.Bitmap(loader.getResult('brainScore'));
	centerReg(brainScore);
	brainScore.x = canvasW/100 * 54;
	brainScore.y = canvasH/100 * 6.5;
	
	brainResult = new createjs.Bitmap(loader.getResult('brainResult'));
	centerReg(brainResult);
	brainResult.x = canvasW/2;
	brainResult.y = canvasH/100 * 25;
	
	resultDescTxt = new createjs.Text();
	resultDescTxt.font = "60px bariol_regularregular";
	resultDescTxt.color = "#ffffff";
	resultDescTxt.text = resultTitleText;
	resultDescTxt.textAlign = "center";
	resultDescTxt.textBaseline='alphabetic';
	resultDescTxt.x = canvasW/2;
	resultDescTxt.y = canvasH/100*44;
	
	resultScoreTxt = new createjs.Text();
	resultScoreTxt.font = "110px bariol_regularregular";
	resultScoreTxt.color = "#ffffff";
	resultScoreTxt.text = 0;
	resultScoreTxt.textAlign = "center";
	resultScoreTxt.textBaseline='alphabetic';
	resultScoreTxt.x = canvasW/2;
	resultScoreTxt.y = canvasH/100*57;
	
	resultShareTxt = new createjs.Text();
	resultShareTxt.font = "30px bariol_regularregular";
	resultShareTxt.color = "#ffffff";
	resultShareTxt.text = shareText;
	resultShareTxt.textAlign = "center";
	resultShareTxt.textBaseline='alphabetic';
	resultShareTxt.x = canvasW/2;
	resultShareTxt.y = canvasH/100*75;
	
	iconFacebook = new createjs.Bitmap(loader.getResult('iconFacebook'));
	iconTwitter = new createjs.Bitmap(loader.getResult('iconTwitter'));
	iconWhatsapp = new createjs.Bitmap(loader.getResult('iconWhatsapp'));
	centerReg(iconFacebook);
	createHitarea(iconFacebook);
	centerReg(iconTwitter);
	createHitarea(iconTwitter);
	centerReg(iconWhatsapp);
	createHitarea(iconWhatsapp);
	iconFacebook.x = canvasW/100*40;
	iconTwitter.x = canvasW/2;
	iconWhatsapp.x = canvasW/100*60;
	iconFacebook.y = iconTwitter.y = iconWhatsapp.y = canvasH/100 * 83;
	
	buttonReplay = new createjs.Text();
	buttonReplay.font = "50px bariol_regularregular";
	buttonReplay.color = "#ffffff";
	buttonReplay.text = buttonReplayText;
	buttonReplay.textAlign = "center";
	buttonReplay.textBaseline='alphabetic';
	buttonReplay.x = canvasW/2;
	buttonReplay.y = canvasH/100*65;
	buttonReplay.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-200, -30, 400, 40));
	
	confirmContainer = new createjs.Container();
	optionsContainer = new createjs.Container();
	
	//option
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
	optionsContainer.visible = false;
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
	centerReg(itemExit);
	itemExit.x = canvasW/2;
	itemExit.y = canvasH/2;
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	createHitarea(buttonConfirm)
	buttonConfirm.x = canvasW/100* 35;
	buttonConfirm.y = canvasH/100 * 63;
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);
	createHitarea(buttonCancel)
	buttonCancel.x = canvasW/100 * 65;
	buttonCancel.y = canvasH/100 * 63;
	
	confirmMessageTxt = new createjs.Text();
	confirmMessageTxt.font = "50px bariol_regularregular";
	confirmMessageTxt.lineHeight = 65;
	confirmMessageTxt.color = "#fff";
	confirmMessageTxt.textAlign = "center";
	confirmMessageTxt.textBaseline='alphabetic';
	confirmMessageTxt.text = exitMessage;
	confirmMessageTxt.x = canvasW/2;
	confirmMessageTxt.y = canvasH/100 *44;
	
	confirmContainer.addChild(itemExit, buttonConfirm, buttonCancel, confirmMessageTxt);
	confirmContainer.visible = false;
	
	touchAreaContainer.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, canvasW, canvasH));
	mainContainer.addChild(logo, startButton);
	categoryContainer.addChild(arrowLeft, arrowRight, categoryTitleTxt, categoryContinueTxt);
	gameContainer.addChild(loaderAnimate, editContainer, questionContainer, questionTxt, brainScore, scoreTxt, timerBar, brainCorrectAnimate, brainWrongAnimate);
	resultContainer.addChild(brainResult, resultDescTxt, resultScoreTxt, buttonReplay);
	if(shareEnable){
		resultContainer.addChild(iconFacebook, iconTwitter, iconWhatsapp, resultShareTxt);
	}
	canvasContainer.addChild(bg, mainContainer, categoryContainer, touchAreaContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings);
	stage.addChild(canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		buttonSettings.x = (canvasW - offset.x) - 60;
		buttonSettings.y = offset.y + 45;
		
		var distanceNum = 75;
		var nextCount = 0;
		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;

			if (typeof buttonMusicOn != "undefined") {
				buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				buttonMusicOn.x = buttonMusicOff.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				nextCount = 2;
			}else{
				nextCount = 1;
			}
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;

			if (typeof buttonMusicOn != "undefined") {
				buttonMusicOn.x = buttonMusicOff.x = buttonSettings.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				buttonMusicOn.x = buttonMusicOff.x;
				buttonMusicOn.y = buttonMusicOff.y = buttonSettings.y+(distanceNum*2);
				nextCount = 2;
			}else{
				nextCount = 1;
			}
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*(nextCount+1));
			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*(nextCount+2));
		}
	}
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}