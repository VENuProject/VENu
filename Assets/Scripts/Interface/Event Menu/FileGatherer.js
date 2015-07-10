#pragma strict

//Attached to event menu canvas
//searches StreamingAssets folder for .json files and adds buttons to the menu

import System.IO;

public var jsonFilesPath;
public var EventButton : GameObject;
public var ButtonsGroup : GameObject;

function Start () {
 	jsonFilesPath = Application.streamingAssetsPath;
	var dir = new DirectoryInfo(jsonFilesPath);
	var filesInfo = dir.GetFiles("*.json");
	for (file in filesInfo){
		AddButton(file);
	}
	Debug.Log("found " + ButtonsGroup.transform.childCount + " json files");
}

function AddButton (file : FileInfo){
	var newButton : GameObject;
	newButton = Instantiate(EventButton);
	newButton.transform.SetParent(ButtonsGroup.transform, false);
	newButton.GetComponentInChildren(UnityEngine.UI.Text).text = file.Name;
	newButton.GetComponent(EventButtonScript).fileName = file.Name;
}