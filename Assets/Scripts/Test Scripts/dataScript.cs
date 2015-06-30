using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class dataScript : MonoBehaviour {

	//stores data
	public string data;

	// to display data in textBox
	public Text txtBox;

	//loads script of the Obj
	public ObjScript LoaderScript;

	public void OnPress()
	{
		// puts data in the text box
		txtBox.text = data;

		// copy data into dataString variable of ObjScript
		LoaderScript.dataString = data;
	}
}
