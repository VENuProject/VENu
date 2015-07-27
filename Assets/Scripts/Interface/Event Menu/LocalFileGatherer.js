#pragma strict

import System.IO;
import UnityEngine.WWW;
import UnityEngine.UI;

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
		for (file in filesInfo) {
		    var words = file.Name.Split("_"[0]);
		    var btnText : String;
		    for (word in words) {
		        if (!word.Contains(".json")) {
		            btnText += word + "\n";
		        }
		    }
			AddButton(btnText);
	    }
		Debug.Log("found " + filesInfo.Length + " json files");
	}
	
#if MOBILE_INPUT
	
	ButtonsGroup.GetComponent(GridLayoutGroup).cellSize = Vector2(120f, 120f);
	ButtonsGroup.GetComponent(GridLayoutGroup).spacing = Vector2(8, 8);
	
#else
	
	ButtonsGroup.GetComponent(GridLayoutGroup).cellSize = Vector2(75f, 75f);
	ButtonsGroup.GetComponent(GridLayoutGroup).spacing = Vector2(8, 8);
	
#endif
	
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