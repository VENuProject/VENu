#pragma strict

var fileName : String;

public function OnClick(){

	//choose the .json file to be loaded
	PlayerPrefs.SetString("File To Load", fileName);
	//Debug.Log("chose file " + fileName);
}
