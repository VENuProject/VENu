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

//		AddButton("prod" + "\n" + "bnblike" + "\n" + "proton" + "\n" + "uboone", "prod_bnblike_proton_uboone.json");
//        AddButton("prod" + "\n" + "eminus" + "\n" + "0.1-2.0GeV" + "\n" + "isotropic", "prod_eminus_0.1-2.0GeV_isotropic.json");
//        AddButton("prod" + "\n" + "eminus" + "\n" + "0.5-5.0GeV" + "\n" + "5degf" + "\n" + "uboone", "prod_eminus_0.5-5.0GeV_25degf_uboone.json");
//        AddButton("prodgenie" + "\n" + "bnb" + "\n" + "intrinsic" + "\n" + "nue" + "\n" + "uboone", "prodgenie_bnb_intrinsic_nue_uboone.json");
		AddButton("prod_bnblike_proton_uboone.json", 2);
	}
	else {
	
		jsonFilesPath = Application.streamingAssetsPath; //this works fine on iOS
    	
		var dir = new DirectoryInfo(jsonFilesPath);
		var filesInfo = dir.GetFiles("*.json");
		for (file in filesInfo) {
//		    var words = file.Name.Split("_"[0]);
//		    var btnText : String;
//		    for (word in words) {
//		        if (!word.Contains(".json")) {
//		            btnText += word + "\n";
//		        }
//                
//		    }
            //btnText = btnText.Substring(0, btnText.Length - 1);
			//AddButton(btnText, file.Name);
			AddButton(file.Name, file.Length / 1000000f);
			
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

function AddButton (file : String, size : float){
	
	var newButton : GameObject;
    newButton = Instantiate(EventButton);
    newButton.transform.SetParent(ButtonsGroup.transform, false);
    newButton.SendMessage("SetData", file);
    newButton.SendMessage("SetLevelToLoad", displayLevel);
    var words = file.Split("_"[0]);
    var btnText : String;
    for (word in words)
        if (!word.Contains(".json"))
            btnText += word + "\n";
    btnText = btnText.Substring(0, btnText.Length - 1);
    newButton.SendMessage("SetText", btnText);
	newButton.SendMessage("SetFileSize", size);
}