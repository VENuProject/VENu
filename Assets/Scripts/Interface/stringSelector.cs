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

	string parseAlgo(string algo) {

		string newAlgo = "";

		string[] words = algo.Split(new char[] {'_'}, System.StringSplitOptions.RemoveEmptyEntries);
		for (int i = 1; i < words.Length; i++) {
			newAlgo += words[i] + "\n";
		}
		newAlgo = newAlgo.Remove(newAlgo.Length - 1);

		return newAlgo;
	}

	void updateString(){
		display.text = parseAlgo(items[currentItem]);
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
