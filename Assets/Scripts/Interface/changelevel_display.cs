using UnityEngine;
using System.Collections;

public class changelevel_display : MonoBehaviour {


	public void NextLevelButton(int index)
	{
				Application.LoadLevel (index);
	}

	public void NextLevelButton(string display)
	{
		Application.LoadLevel (display);
	}



}
