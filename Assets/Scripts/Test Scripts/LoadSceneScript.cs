using UnityEngine;
using System.Collections;

public class LoadSceneScript : MonoBehaviour {

	public void LoadScene()
	{
		// loads the scene passed in argument as a string
		Application.LoadLevel ("Touchscreen_test"); // but the scenesmust be present in the build!
	}

}
