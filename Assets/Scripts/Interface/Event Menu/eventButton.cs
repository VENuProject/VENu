using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class eventButton : MonoBehaviour {

	string fileName;

	public eventButton(string file, string text){
		fileName = file;
		GetComponentInChildren<Text>().text = text;

	}

	void OnClick(){
		PlayerPrefs.SetString("File To Load", fileName);
		Debug.Log("Loading event " + fileName);
		Application.LoadLevel(2); //Display
	}
	
}
