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

	if (Application.platform == RuntimePlatform.Android){
	
//		var jsonFilesPath = "jar:file://" + Application.dataPath + "!/assets";
//		    var www : WWW = new WWW(jsonFilesPath); //AMCLEAN add
//   			yield www; // AMCLEAN add

		//until I can get this working on android, hardcoded for now

		AddButton("prod_bnblike_proton_uboone.json");
		AddButton("prod_eminus_0.1-2.0GeV_isotropic.json");
		AddButton("prod_eminus_0.5-5.0GeV_25degf_uboone.json");
		AddButton("prodgenie_bnb_intrinsic_nue_uboone.json");
	}
	else {
	
		jsonFilesPath = Application.streamingAssetsPath; //this works fine on iOS
    	
		var dir = new DirectoryInfo(jsonFilesPath);
		var filesInfo = dir.GetFiles("*.json");
		for (file in filesInfo)
			AddButton(file.Name);
		Debug.Log("found " + filesInfo.Length + " json files");
	}
}

function AddButton (file : String){
	var newButton : GameObject;
	newButton = Instantiate(EventButton);
	newButton.transform.SetParent(ButtonsGroup.transform, false);
	newButton.GetComponentInChildren(UnityEngine.UI.Text).text = file;
	newButton.GetComponent(EventButtonScript).fileName = file;
	newButton.GetComponent(EventButtonScript).levelToLoad = displayLevel;
	//custom graphics for each file?
	//other button customization?
}