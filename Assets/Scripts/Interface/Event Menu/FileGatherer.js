#pragma strict

//Attached to event menu canvas
//searches StreamingAssets folder for .json files and adds buttons to the menu

import System.IO;
import UnityEngine.WWW;

public var jsonFilesPath;
public var EventButton : GameObject;
public var ButtonsGroup : GameObject;
public var displayLevel : String;

function Start () {

	//I don't know how Android's WWW works, and I can't find any documentation on it
	//Maybe this will work, but I'll have to have one of you explain it to me.
	// -Owen
	if (Application.platform == RuntimePlatform.Android){
		var jsonFilesPath = "jar:file://" + Application.dataPath + "!/assets";
		    var www : WWW = new WWW(jsonFilesPath); //AMCLEAN add
   			yield www; // AMCLEAN add
   			//jsonString=www.text;
		/*
		
		    var url="jar:file://" + Application.dataPath + "!/assets/"+ fileName;
    Debug.Log(Application.platform+"\n"+url);
    var www : WWW = new WWW(url);
    yield www;
    jsonString=www.text;
		
		*/
	}
	else jsonFilesPath = Application.streamingAssetsPath; //this works fine on iOS
    
 		
	var dir = new DirectoryInfo(jsonFilesPath);
	var filesInfo = dir.GetFiles("*.json");
	for (file in filesInfo)
		AddButton(file);
	Debug.Log("found " + filesInfo.Length + " json files");
}

function AddButton (file : FileInfo){
	var newButton : GameObject;
	newButton = Instantiate(EventButton);
	newButton.transform.SetParent(ButtonsGroup.transform, false);
	newButton.GetComponentInChildren(UnityEngine.UI.Text).text = file.Name;
	newButton.GetComponent(EventButtonScript).fileName = file.Name;
	newButton.GetComponent(EventButtonScript).levelToLoad = displayLevel;
	//custom graphics for each file?
	//other button customization?
}