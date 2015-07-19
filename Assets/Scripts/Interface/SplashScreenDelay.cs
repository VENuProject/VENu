using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class SplashScreenDelay : MonoBehaviour {
	public float delayTime = 5.0f;

	IEnumerator Start()
	{

		yield return new WaitForSeconds(delayTime);
		float fadeTime = GameObject.Find ("Splash Screen").GetComponent<Fading>().BeginFade (1);
		yield return new WaitForSeconds(fadeTime);

		Application.LoadLevel (1);

	}

}
