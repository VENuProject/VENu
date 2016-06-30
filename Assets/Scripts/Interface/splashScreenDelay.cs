using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using UnityEngine.SceneManagement;

public class splashScreenDelay : MonoBehaviour {
	public float delayTime = 5.0f;

	IEnumerator Start()
	{

		yield return new WaitForSeconds(delayTime);
		float fadeTime = GameObject.Find ("Splash Screen").GetComponent<fading>().BeginFade (1);
		yield return new WaitForSeconds(fadeTime);

		//Application.LoadLevel (1);
		int i = Application.loadedLevel;
		Application.LoadLevel(i + 1);

	}

	void Update()
	{
		if (Input.GetMouseButtonDown (0)) {
			//Application.LoadLevel (1);
			int i = Application.loadedLevel;
			Application.LoadLevel (i + 1);
		}
	}
}
