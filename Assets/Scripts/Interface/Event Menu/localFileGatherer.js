//localFileGatherer.js
//Written by: Owen Crawford, Thomas Wester
//Handles event buttons and event button categories for offline (StreamingAssets) JSON files.

#pragma strict

import System.IO;
import UnityEngine.WWW;
import UnityEngine.UI;

public var jsonFilesPath;
public var EventButton : GameObject;
public var ButtonsGroup : GameObject;
public var displayLevel : String;

public var CategoryPrefab : GameObject;
public var categoriesGroup : GameObject; 

function Start () {

	if (Application.platform == RuntimePlatform.Android){
	
//		var jsonFilesPath = "jar:file://" + Application.dataPath + "!/assets";
//		    var www : WWW = new WWW(jsonFilesPath); //AMCLEAN add
//   			yield www; // AMCLEAN add

		//until I can get this working on android, hardcoded for now

        var androidCategory : GameObject;
        androidCategory = Instantiate(CategoryPrefab);
        androidCategory.GetComponentInChildren(Text).text = "Android Events";
        androidCategory.transform.SetParent(categoriesGroup.transform, false);

//		AddButton("prod" + "\n" + "bnblike" + "\n" + "proton" + "\n" + "uboone", "prod_bnblike_proton_uboone.json");
//        AddButton("prod" + "\n" + "eminus" + "\n" + "0.1-2.0GeV" + "\n" + "isotropic", "prod_eminus_0.1-2.0GeV_isotropic.json");
//        AddButton("prod" + "\n" + "eminus" + "\n" + "0.5-5.0GeV" + "\n" + "5degf" + "\n" + "uboone", "prod_eminus_0.5-5.0GeV_25degf_uboone.json");
//        AddButton("prodgenie" + "\n" + "bnb" + "\n" + "intrinsic" + "\n" + "nue" + "\n" + "uboone", "prodgenie_bnb_intrinsic_nue_uboone.json");
		AddButton("prod_bnblike_proton_uboone.json", 2, androidCategory);
		AddButton("prod_eminus_0.1-2.0GeV_isotropic.json", 2, androidCategory);
		AddButton("prod_eminus_0.5-5.0GeV_25degf_uboone.json", 2, androidCategory);
		AddButton("prodgenie_bnb_intrinsic_nue_uboone.json", 2, androidCategory);
	}
	else {
	
		jsonFilesPath = Application.streamingAssetsPath; //this works fine on iOS
           	
    	//Make some categories, hardcoded for now, until we have other categories to sort on.
    	var lessThan2MB : GameObject;
        lessThan2MB = Instantiate(CategoryPrefab);
        lessThan2MB.GetComponentInChildren(Text).text = "Small Events";
        lessThan2MB.transform.SetParent(categoriesGroup.transform, false);
        
        var between2and6MB : GameObject;
        between2and6MB = Instantiate(CategoryPrefab);
        between2and6MB.GetComponentInChildren(Text).text = "Medium Events";
        between2and6MB.transform.SetParent(categoriesGroup.transform, false);
        
        var moreThan6MB : GameObject;
        moreThan6MB = Instantiate(CategoryPrefab);
        moreThan6MB.GetComponentInChildren(Text).text = "Large Events";
        moreThan6MB.transform.SetParent(categoriesGroup.transform, false);
        
        // Stashed changes
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
            var cat : GameObject;
            if (file.Length / 1000000f < 2f) {
                cat = lessThan2MB;
            }
            else if (file.Length / 1000000f > 2f && file.Length / 1000000f < 6f) {
                cat = between2and6MB;
            }
            else {
                cat = moreThan6MB;
            }
            //btnText = btnText.Substring(0, btnText.Length - 1);
			//AddButton(btnText, file.Name);
			AddButton(file.Name, file.Length / 1000000f, cat);
			
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

function AddCategory (title : String) {
    
}

function AddButton (file : String, size : float, cat : GameObject){
	
	var newButton : GameObject;
    newButton = Instantiate(EventButton);
    newButton.transform.SetParent(cat.transform, false);
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