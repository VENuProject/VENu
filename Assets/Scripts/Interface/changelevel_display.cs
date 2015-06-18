using UnityEngine;
using System.Collections;

public class changelevel_display : MonoBehaviour {

	public void Menu()
	{
		Application.LoadLevel (0);
	}

	public void Event1()
	{
			Application.LoadLevel (1);
	}

	public void Event2()
	{
			Application.LoadLevel (2);
	}



}
