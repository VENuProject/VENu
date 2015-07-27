#pragma strict

import UnityEngine.UI;

var fileName : String;
public var levelToLoad : String;

public function OnClick(){

	//choose the .json file to be loaded
	PlayerPrefs.SetString("File To Load", fileName);
	Debug.Log("Loading event " + PlayerPrefs.GetString("File To Load"));
	Application.LoadLevel(levelToLoad); //replace with appropriate level?
}

public function SetData(file : String){
    fileName = file;
}

public function SetLevelToLoad(level : String){
    levelToLoad = level;
}

public function SetText(txt : String){
    GetComponentInChildren(Text).text = txt;
}

