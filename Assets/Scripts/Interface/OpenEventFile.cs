using UnityEngine;
using System.Collections;

public class openEventFile : MonoBehaviour {

	void Start () 
	{
	
	}

	public string fileName;

	void Update () 
	{		
		string realPath = Application.persistentDataPath + "/Phone/VENu/" + fileName;
		
		if (!System.IO.File.Exists(realPath))
		{
			if (!System.IO.Directory.Exists(Application.persistentDataPath + "/Phone/VENu/"))
			{
				System.IO.Directory.CreateDirectory(Application.persistentDataPath + "/Phone/VENu/");
			}
			
			WWW reader = new WWW(Application.streamingAssetsPath + "/Phone/VENu/" + realPath);
			while ( ! reader.isDone) {}
			
			System.IO.File.WriteAllBytes(realPath, reader.bytes);
		}
		
		Application.OpenURL(realPath);

	}

}
