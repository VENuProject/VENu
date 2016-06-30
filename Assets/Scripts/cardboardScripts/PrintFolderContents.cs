using UnityEngine;
using System;
using System.IO;

public class PrintFolderContents : MonoBehaviour {

	void ProcessFolder(string f) {

		Debug.Log("Folder: " + f);

		var txtFiles = Directory.GetFiles(f);
		foreach (string currentFile in txtFiles) {
			Debug.Log("File: " + currentFile);
		}

		string[] subs = Directory.GetDirectories(f);
		foreach(string sub in subs)
			ProcessFolder(sub);
	}

	// Use this for initialization
	void Start () {
		ProcessFolder(Application.dataPath);
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
