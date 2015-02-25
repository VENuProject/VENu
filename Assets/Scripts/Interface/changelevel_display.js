#pragma strict

var mySkin : GUISkin;

function Start () {

}

function OnGUI () {
	GUI.skin = mySkin;
	
	
	GUI.Box(Rect(0,0,Screen.width, Screen.height), "");
	
	if(GUI.Button (Rect (180,400,300,250), "Start")) {
	
		Application.LoadLevel("Level1");
		
		}
		
		if(GUI.Button (Rect(520,400,300,250), "Quit")){
		
			//Application.Load
}
}