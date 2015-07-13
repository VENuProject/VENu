#pragma strict

function LoadNext(){
	var currentEvent = PlayerPrefs.GetString("File To Load");
	var dir = new DirectoryInfo(Application.streamingAssetsPath);
	var filesInfo = dir.GetFiles("*.json");
	var currentFile = dir.GetFiles(currentEvent)[0];
	var currentIndex = filesInfo.IndexOf(filesInfo, currentFile);
	
	if(currentIndex + 1 == filesInfo.length){
		//no more files!
		Debug.Log("No more files!");
	}
	else if(currentIndex == -1){
		//don't know where we are. did File To Load not get set?
		Debug.Log("file not found!");

	}
	else{
		Debug.Log(currentIndex);
		Debug.Log(currentEvent);
		Debug.Log(filesInfo);
		PlayerPrefs.SetString("File To Load", filesInfo[currentIndex + 1].Name);
		Debug.Log("loading file " + PlayerPrefs.GetString("File To Load"));
		//the file is loaded elsewhere. All that script needs is the name of the new file.
	}
	
}