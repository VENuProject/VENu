#pragma strict

import SimpleJSON;

var fileName : String;

function Start () {

	Debug.Log(Time.time);
	if(PlayerPrefs.HasKey("File To Load") && PlayerPrefs.GetString("File To Load") != "") {
        fileName = PlayerPrefs.GetString("File To Load");
    }
    else {
        Debug.Log("<color=purple>PlayerPrefs not Initialized. Using default event.</color>");
        fileName = "prod_eminus_0.1-2.0GeV_isotropic.json";
    }

	var jsonString="";

	//Check if the fileName is a url or a path
    if (fileName.Contains("http")) {
        var fileURL : WWW = new WWW(fileName) ; 
        //// Wait for the download to complete
        yield fileURL;
        jsonString = fileURL.text;
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
    Debug.Log(Time.time);
    GetComponent(DrawTracks).drawTracks(node);
    GetComponent(DrawSpacePoints).drawPoints(node);
    
}

