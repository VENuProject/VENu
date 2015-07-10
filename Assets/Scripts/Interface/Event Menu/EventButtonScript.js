#pragma strict

var fileName : String;
public var levelToLoad : String;

public function OnClick(){

	//choose the .json file to be loaded
	PlayerPrefs.SetString("File To Load", fileName);
	Debug.Log("Loading event " + PlayerPrefs.GetString("File To Load"));
	Application.LoadLevel(levelToLoad); //replace with appropriate level?
}
