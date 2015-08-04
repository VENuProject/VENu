#pragma strict

import UnityEngine.UI;
//import UnityEngine.iOS;
var fileName : String;
public var levelToLoad : String;
//public var sizeMin : float;
public var sizeMax : float;
//public var smallColor : Color;
//public var medColor : Color;
//public var largeColor : Color;
//var oldDevices  : ArrayList = new ArrayList([DeviceGeneration.iPhone, DeviceGeneration.iPhone3G, DeviceGeneration.iPhone3GS, 
//	DeviceGeneration.iPhone4, DeviceGeneration.iPhone4S]);

function Start(){
	sizeMax = 10f;
//#if UNITY_IOS
//	if(Application.platform == RuntimePlatform.IPhonePlayer){
//		if(oldDevices.Contains(Device.generation)){
//			sizeMax = 6f;
//		}
//	}
//	else{
//		sizeMax = 10f;
//	}
//#else
//
//#endif
	
}

public function OnClick(){
	//choose the .json file to be loaded
	PlayerPrefs.SetString("File To Load", fileName);
	Debug.Log("Loading event " + PlayerPrefs.GetString("File To Load"));
	Application.LoadLevel(2); //replace with appropriate level?
}

public function SetData(file : String){
    fileName = file;
}

public function SetLevelToLoad(level : String){
    levelToLoad = level;
}

public function SetText(txt : String){
    GetComponentInChildren(Text).text = txt;
}

public function SetFileSize(size : float){
//	if(size <= sizeMin)
//		GetComponent(Button).image.color = smallColor;
//	else if(size >= sizeMax)
//		GetComponent(Button).image.color = largeColor;
//	else
//		GetComponent(Button).image.color = medColor;
	if(size > sizeMax){
		gameObject.SetActive(false);
	}

}

