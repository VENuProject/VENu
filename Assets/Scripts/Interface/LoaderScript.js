#pragma strict
//public var file1 : String;
//public var file2 : String;

public var fileToLoad : String;
var inputField : UnityEngine.UI.InputField;

function Awake () 
{
//	DontDestroyOnLoad(this);	
}

function Update ()
{
	fileToLoad = inputField.text;
}

function AssignEvent ()
{
	PlayerPrefs.SetString("File To Load",fileToLoad);
}

function Button1Assign(fileToLoad : String)
{
	PlayerPrefs.SetString("File To Load",fileToLoad);
}


function Button2Assign(fileToLoad : String)
{
	PlayerPrefs.SetString("File To Load",fileToLoad);
}