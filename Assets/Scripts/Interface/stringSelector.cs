using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class stringSelector : MonoBehaviour {

	public string playerPrefsString;
	public Text display;
	public string[] items = new string[1];
	public int currentItem;

	void Start () {
		updateString();
	}
	
	void updateString(){
		display.text = items[currentItem];
		PlayerPrefs.SetString(playerPrefsString, items[currentItem]);
	}

	public void NextItem(){
		currentItem++;
		if(currentItem >= items.Length)
			currentItem = 0;
		updateString();
	}

	public void PrevItem(){
		currentItem--;
		if(currentItem < 0)
			currentItem = items.Length - 1;
		updateString();
	}
}
