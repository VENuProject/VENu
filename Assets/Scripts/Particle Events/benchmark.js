//Script for drawing sprites

#pragma strict

import SimpleJSON;
import System.IO;
import System.Linq;

var fileName : String;

function createArrayFromJSON() {

    //Read in from a file (different paths for different platforms)
    var jsonString="";

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
    //Stores the JSON data
    Debug.Log(Time.realtimeSinceStartup);
    var N = JSONNode.Parse(jsonString);
    Debug.Log(Time.realtimeSinceStartup);
  
    
  
} 

function Awake() {
   if(PlayerPrefs.HasKey("File To Load") && PlayerPrefs.GetString("File To Load") != "") {
        fileName = PlayerPrefs.GetString("File To Load");
    }
    else {
        Debug.Log("<color=orange>PlayerPrefs not Initialized. Using default event.</color>");
        fileName = "complicated_event.json";
    }
}


function Start() {
    createArrayFromJSON();
}

function OnGUI() {

}
