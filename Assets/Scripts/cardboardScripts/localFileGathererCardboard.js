//localFileGatherer.js
//Written by: Owen Crawford, Thomas Wester
//Handles event buttons and event button categories for offline (StreamingAssets) JSON files.

#pragma strict

import System.IO;
import System.Collections;
import UnityEngine;
import UnityEngine.WWW;
import UnityEngine.UI;
import UnityEngine.Sprite;

public class localFileGathererCardboard extends MonoBehaviour {
    
    public var jsonFilesPath;
    //public var path;
    public var EventButton : GameObject;
    public var ButtonsGroup : GameObject;
    public var displayLevel : String;
    
    public var CategoryPrefab : GameObject;
    public var categoriesGroup : GameObject;
    public var localFileImage : Sprite;
    
    public var fileType : float;
    // 0: small; 1: medium; 2: large

    public var maxButtons : int;


    function Start() {

    }

    function StartGathering () {

        var buttonCounter : int;
        buttonCounter = 0;

        // Marco: just removing this piece
        if (Application.platform == RuntimePlatform.Android){
        //if (false) { 
            //		var jsonFilesPath = "jar:file://" + Application.dataPath + "!/assets";
            //		    var www : WWW = new WWW(jsonFilesPath); //AMCLEAN add
            //   			yield www; // AMCLEAN add
            
            //until I can get this working on android, hardcoded for now
     /*       
            var androidCategory : GameObject;
            androidCategory = Instantiate(CategoryPrefab);
            // androidCategory.GetComponentInChildren(Text).text = "Android Events";
            androidCategory.GetComponent(Text).text = "Android Events";
            androidCategory.transform.SetParent(categoriesGroup.transform, false);
            
            //		AddButton("prod" + "\n" + "bnblike" + "\n" + "proton" + "\n" + "uboone", "prod_bnblike_proton_uboone.json");
            //        AddButton("prod" + "\n" + "eminus" + "\n" + "0.1-2.0GeV" + "\n" + "isotropic", "prod_eminus_0.1-2.0GeV_isotropic.json");
            //        AddButton("prod" + "\n" + "eminus" + "\n" + "0.5-5.0GeV" + "\n" + "5degf" + "\n" + "uboone", "prod_eminus_0.5-5.0GeV_25degf_uboone.json");
            //        AddButton("prodgenie" + "\n" + "bnb" + "\n" + "intrinsic" + "\n" + "nue" + "\n" + "uboone", "prodgenie_bnb_intrinsic_nue_uboone.json");
            AddButton("prod_bnblike_proton_uboone.json", 2, androidCategory);
            AddButton("prod_eminus_0.1-2.0GeV_isotropic.json", 2, androidCategory);
            AddButton("prod_eminus_0.5-5.0GeV_25degf_uboone.json", 2, androidCategory);
            AddButton("prodgenie_bnb_intrinsic_nue_uboone.json", 2, androidCategory);
            */



            var lessThan2MB_2 : GameObject;
            lessThan2MB_2 = Instantiate(CategoryPrefab);
            // lessThan2MB.GetComponent(Text).text = "Small Events";
            lessThan2MB_2.GetComponentInChildren(Text,true).text = "Small Events";
            lessThan2MB_2.GetComponentInChildren(Text,true).color = Color.red;
            //lessThan2MB.GetComponentInChildren(Text,true).fontSize = 17;
            lessThan2MB_2.GetComponentInChildren(Text,true).alignment = TextAnchor.LowerCenter;
            lessThan2MB_2.transform.SetParent(categoriesGroup.transform, false);

             var cat_2 : GameObject;
             cat_2 = lessThan2MB_2;
             AddButton("prod_bnblike_proton_uboone.json", 2, cat_2);
             AddButton("prodgenie_bnb_nu_cosmic_uboone_10.json", 2, cat_2);

        }
        else {

            #if UNITY_EDITOR
			jsonFilesPath = Application.dataPath + "/StreamingAssets";
			#elif UNITY_ANDROID
			//path = "jar:file://" + Application.dataPath + "!/assets";
			//var www = new WWW (path);
			//yield  www;
			//jsonFilesPath = www.text;
			//jsonFilesPath = "jar:file://" + Application.dataPath + "!/assets";

			/*var path = Application.streamingAssetsPath;
			jsonFilesPath = "";
			if (path.Contains("://")) {
			  var www = new WWW (path);
			  yield www;
			  jsonFilesPath = www.text;
			}
			else
		      jsonFilesPath = System.IO.File.ReadAllText(path);
		    Debug.Log("MARCO, just after.  " + jsonFilesPath);

		    */
			#elif UNITY_IOS
			//path = Application.dataPath + "/Raw";
			jsonFilesPath = Application.streamingAssetsPath; //this works fine on iOS
			#else
			//Desktop (Mac OS or Windows)
			//path = "hello";
			jsonFilesPath = Application.dataPath + "/StreamingAssets";
			#endif


            //Make some categories, hardcoded for now, until we have other categories to sort on.
            if (fileType == 0) {
                var lessThan2MB : GameObject;
                lessThan2MB = Instantiate(CategoryPrefab);
                // lessThan2MB.GetComponent(Text).text = "Small Events";
                lessThan2MB.GetComponentInChildren(Text,true).text = "Small Events";
                lessThan2MB.GetComponentInChildren(Text,true).color = Color.red;
                //lessThan2MB.GetComponentInChildren(Text,true).fontSize = 17;
                lessThan2MB.GetComponentInChildren(Text,true).alignment = TextAnchor.LowerCenter;
                lessThan2MB.transform.SetParent(categoriesGroup.transform, false);
             } else if (fileType == 1) {
                var between2and6MB : GameObject;
                between2and6MB = Instantiate(CategoryPrefab);
                // between2and6MB.GetComponentInChildren(Text).text = "Medium Events";
                between2and6MB.GetComponentInChildren(Text,true).text = "Medium Events";
                between2and6MB.GetComponentInChildren(Text,true).color = Color.red;
                //between2and6MB.GetComponentInChildren(Text,true).fontSize = 17;
                between2and6MB.GetComponentInChildren(Text,true).alignment = TextAnchor.LowerCenter;
                between2and6MB.transform.SetParent(categoriesGroup.transform, false);
                } else if (fileType == 2) {
                var moreThan6MB : GameObject;
                moreThan6MB = Instantiate(CategoryPrefab);
                // moreThan6MB.GetComponentInChildren(Text).text = "Large Events";
                moreThan6MB.GetComponentInChildren(Text,true).text = "Large Events";
                moreThan6MB.GetComponentInChildren(Text,true).color = Color.red;
                //moreThan6MB.GetComponentInChildren(Text,true).fontSize = 17;
                moreThan6MB.GetComponentInChildren(Text,true).alignment = TextAnchor.LowerCenter;
                moreThan6MB.transform.SetParent(categoriesGroup.transform, false);
                }
            
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
                if (file.Length / 1000000f <= 2f) {
                    if (fileType == 0 && buttonCounter < maxButtons) {
                        cat = lessThan2MB;
                        AddButton(file.Name, file.Length / 1000000f, cat);
                        buttonCounter ++;
                    }
                }
                else if (file.Length / 1000000f > 2f && file.Length / 1000000f <= 6f) {
                    if (fileType == 1 && buttonCounter < maxButtons) {
                        cat = between2and6MB;
                        AddButton(file.Name, file.Length / 1000000f, cat);
                        buttonCounter ++;
                    }
                }
                else {
                    if (fileType == 2 && buttonCounter < maxButtons) {
                        cat = moreThan6MB;
                        AddButton(file.Name, file.Length / 1000000f, cat);
                        buttonCounter ++;
                    }
                }
                //btnText = btnText.Substring(0, btnText.Length - 1);
                //AddButton(btnText, file.Name);
                //AddButton(file.Name, file.Length / 1000000f, cat);
                
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
    newButton.SendMessage("SetImage", localFileImage);;
    newButton.SendMessage("SetFileSize", size);
    newButton.GetComponentInChildren(Text,true).color = Color(0,0.8,0,1);
    newButton.SetActive(true);
    Debug.Log("Button added");
    
}