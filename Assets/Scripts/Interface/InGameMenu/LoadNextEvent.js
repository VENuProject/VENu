#pragma strict

function LoadNext(){
	var currentEvent = PlayerPrefs.GetString("File To Load");
	var dir = new DirectoryInfo(Application.streamingAssetsPath);
	var filesInfo = dir.GetFiles("*.json");
	var currentIndex : int;
	
	for(var i = 0; i < filesInfo.length; i++)
		if(filesInfo[i].Name == currentEvent)
			currentIndex = i;
	
	if(currentIndex == filesInfo.length - 1){
		//no more files!
		Debug.Log("No more files!");
	}
	else if(currentIndex == -1){
		//don't know where we are. did File To Load not get set?
		Debug.Log("file not found!");

	}
	else{
		PlayerPrefs.SetString("File To Load", filesInfo[currentIndex +1].Name);
		Debug.Log("loading file " + PlayerPrefs.GetString("File To Load"));
		Application.LoadLevel(Application.loadedLevel);
		//the file is loaded elsewhere. All that script needs is the name of the new file.
	}
	
}