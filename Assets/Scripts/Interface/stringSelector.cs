//stringSelector.cs
//Written by Owen Crawford, Thomas Wester
//Purpose: Controls the track and spacepoint algorithm selectors in the settings panel.

using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class stringSelector : MonoBehaviour {

	public string playerPrefsString;
	public Text display;
	public string[] items = new string[1];
	public int currentItem;

	void Start () {
		//Make sure the settings panel remembers the settings the user entered.
		if (PlayerPrefs.HasKey(playerPrefsString)) {
			//Get the index of the playerpref string
			for (int i = 0; i < items.Length; i++) {
				if (items[i] == PlayerPrefs.GetString(playerPrefsString)) {
					currentItem = i;
					break;
				}
			}
			updateString(PlayerPrefs.GetString(playerPrefsString));
		}
		else {
			currentItem = 0;
			updateString(items[currentItem]);
		}
	}

	string parseAlgo(string algo) {

		string newAlgo = "";

		string[] words = algo.Split(new char[] {'_'}, System.StringSplitOptions.RemoveEmptyEntries);
		for (int i = 1; i < words.Length; i++) {
			newAlgo += words[i] + "\n";
		}
		newAlgo = newAlgo.Remove(newAlgo.Length - 1);

		return newAlgo;
	}

	void updateString(string algo){
		display.text = parseAlgo(algo); //items[currentItem]);
		PlayerPrefs.SetString(playerPrefsString, algo); //items[currentItem]);
	}

	public void NextItem(){
		currentItem++;
		if(currentItem >= items.Length)
			currentItem = 0;
		updateString(items[currentItem]);
	}

	public void PrevItem(){
		currentItem--;
		if(currentItem < 0)
			currentItem = items.Length - 1;
		updateString(items[currentItem]);
	}
}
