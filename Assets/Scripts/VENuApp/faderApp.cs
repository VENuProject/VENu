using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class faderApp : MonoBehaviour {

	public float alphaColor = 1;
	public float fadeSpeed = 0.3f;

	public GameObject myText;

	private float fadeDir = -1;


	//private GUIText myGuiText;


	// Use this for initialization
	void Start () {

	}

	void OnGUI() {

		alphaColor += fadeDir * fadeSpeed * Time.deltaTime;

		myText.GetComponent<Text>().color = new Color (GUI.color.r, GUI.color.g, GUI.color.b, alphaColor);

		if (alphaColor < 0)
			fadeDir = +1;
		if (alphaColor > 1)
			fadeDir = -1;

	}
	
	// Update is called once per frame
	void Update () {

	}
}
