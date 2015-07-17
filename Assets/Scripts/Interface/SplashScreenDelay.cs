using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class SplashScreenDelay : MonoBehaviour {
	public float delayTime = 3.5f;

	IEnumerator Start()
	{
		yield return new WaitForSeconds(delayTime);

		Application.LoadLevel (1);

	}

}
