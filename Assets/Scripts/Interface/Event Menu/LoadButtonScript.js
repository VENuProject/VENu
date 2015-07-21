#pragma strict

	public var LoadText : GameObject;
	public var LevelToLoad : String;

function Start(){
	LoadText.SetActive(false);
	//PlayerPrefs.DeleteKey("File To Load");
}

function loadEvent(){
	if (PlayerPrefs.HasKey("File To Load")){
		LoadText.SetActive(true);
		Debug.Log("Loading event " + PlayerPrefs.GetString("File To Load"));
		Application.LoadLevel(LevelToLoad); //replace with appropriate level?
	}
	else{
		Debug.Log("no file selected!");
	}
}