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
    
    if (PlayerPrefs.HasKey("EventSource") && PlayerPrefs.GetString("EventSource") == "local") {
        //Enable next/previous event buttons
        nextEventButton.SetActive(true);
        prevEventButton.SetActive(true);
    }
    else {
        //Disable next/previous event buttons
        nextEventButton.SetActive(false);
        prevEventButton.SetActive(false);
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
    	if (Application.platform == RuntimePlatform.Android || Application.platform == RuntimePlatform.WebGLPlayer) {
    	    Debug.Log("Got to here at least 1.");
    	    var url="jar:file://" + Application.dataPath + "!/assets/" + fileName;
    	    var www : WWW = new WWW(url);
    	    yield www;
    	    jsonString = www.text;
    	    Debug.Log("Got to here at least 2.");
    	    Debug.Log("jsonString is " + jsonString);
    	}
    	else {
    	    var sr = new StreamReader(Application.streamingAssetsPath  + "/" + fileName);
    	    jsonString = sr.ReadToEnd();
    	    sr.Close();
    	}
    }

    // Overried previuos stuff with this (need to change in the future)
    //var stAssPath = GetStreamingAssetsPath() + "/" + fileName;

    //Debug.Log("<color=purple>stAssPath = </color>" + stAssPath);
    //var sr2 = new StreamReader(stAssPath);

    //Debug.Log("<color=purple>jsonstring before = </color>" + jsonString);
    //jsonString = sr2.ReadToEnd();
    //Debug.Log("<color=purple>jsonstring after  = </color>" + jsonString);



    //sr2.Close();
    //Debug.Log("<color=purple>Printing jsonString NOW = </color>" + jsonString);
    var node = JSONNode.Parse(jsonString);
    Debug.Log("<color=purple>Got to here at least 1 </color>");
    //Call the draw functions in the other scripts
    GetComponent(drawTracks).drawTracks(node);
    //Debug.Log("<color=purple>Got to here at least 2 </color>");
    //GetComponent(drawSpacePoints).drawPoints(node);
    Debug.Log("<color=purple>Got to here at least 2 </color>");
    Debug.Log("<color=purple>Got to here at least uuuuuu </color>");

   
}

function GetStreamingAssetsPath() {
	// This functions return the right StreamingAssets Path 
	// depending on the platform used.

	var path;

	#if UNITY_EDITOR
	path = Application.dataPath + "/StreamingAssets";
	#elif UNITY_ANDROID
	path = "jar:file://"+ Application.dataPath + "!/assets/";
	#elif UNITY_IOS
	path = Application.dataPath + "/Raw";
	#else
	//Desktop (Mac OS or Windows)
	path = Application.dataPath + "/StreamingAssets";
	#endif

	return path;

}

