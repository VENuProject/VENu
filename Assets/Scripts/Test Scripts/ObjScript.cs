using UnityEngine;
using System.Collections;

public class ObjScript : MonoBehaviour {

	public string dataString;

	void Awake()
	{
		DontDestroyOnLoad (this);
	}

}
