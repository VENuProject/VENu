#pragma strict

public var jsonFilesPath = "Assets/StreamingAssets";

function LoadNext(){
	var currentEvent = PlayerPrefs.GetString("fileToLoad");
	var dir = new DirectoryInfo(jsonFilesPath);
	var filesInfo = dir.GetFiles("*.json");
	if(filesInfo.IndexOf(filesInfo, currentEvent) +1 == filesInfo.length){
		//no next file!
		Debug.Log("no next file!");
	}
	else{
		Debug.Log(filesInfo.IndexOf(filesInfo, currentEvent));
		PlayerPrefs.SetString("fileToLoad", filesInfo[filesInfo.IndexOf(filesInfo, currentEvent) + 3].Name);
		Debug.Log("loading file " + PlayerPrefs.GetString("fileToLoad"));
	}
	
}