//  ----------------
//  - drawEvent.js -
//  ----------------
//  Parses the JSON files and then calls the drawTracks and drawSpacepoint scripts.

#pragma strict

import SimpleJSON;
import UnityEngine.UI;

var fileName : String;
var loadingText : GameObject;
var nextEventButton : GameObject;
var prevEventButton : GameObject;

function Start () {

	if(PlayerPrefs.HasKey("File To Load") && PlayerPrefs.GetString("File To Load") != "") {
        fileName = PlayerPrefs.GetString("File To Load");
    }
    else {
        Debug.Log("<color=purple>PlayerPrefs not Initialized. Using default event.</color>");
        fileName = "prod_eminus_0.1-2.0GeV_isotropic.json";
    }
    
    if(PlayerPrefs.HasKey("EventSource")) {
        if (PlayerPrefs.GetString("EventSource") == "local") {
          //Enable next/previous event buttons
          nextEventButton.SetActive(true);
          prevEventButton.SetActive(true);
        }
        else {
          //Disable next/previous event buttons
          nextEventButton.SetActive(false);
          prevEventButton.SetActive(false);
        }
    }

	var jsonString="";

	//Check if the fileName is a url or a path
    if (fileName.Contains("http")) {
    	
        var fileURL : WWW = new WWW(fileName) ; 
        //// Wait for the download to complete
        loadingText.SetActive(true);
        yield fileURL;
        jsonString = fileURL.text;
        loadingText.SetActive(false);
        
    }
    else{
    	if (Application.platform == RuntimePlatform.Android) {
    	    var url="jar:file://" + Application.dataPath + "!/assets/" + fileName;
    	    var www : WWW = new WWW(url);
    	    yield www;
    	    jsonString = www.text;
    	}
    	else {
    	    var sr = new StreamReader(Application.streamingAssetsPath  + "/" + fileName);
    	    jsonString = sr.ReadToEnd();
    	    sr.Close();
    	}
    }
    
    var node = JSONNode.Parse(jsonString);
    //Call the draw functions in the other scripts
        GetComponent(drawTracks).drawTracks(node);
    GetComponent(drawSpacePoints).drawPoints(node);
   
}

