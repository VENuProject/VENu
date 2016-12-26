using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class screenshotTaker : MonoBehaviour {

	[Tooltip("Select this to take a screenshot of size equal to the iPhone7 display landscape. This overwrites resWidth and resHeight settings. Press k to take the screenshot.")]
	public bool iPhone7Landscape = false;

	[Tooltip("Select this to take a screenshot of size equal to the iPhone7Plus display landscape. This overwrites resWidth and resHeight settings. Press k to take the screenshot.")]
	public bool iPhone7PlusLandscape = false;

	[Tooltip("Select this to take a screenshot of size equal to the iPad 12.9-Inch display landscape. This overwrites resWidth and resHeight settings. Press k to take the screenshot.")]
	public bool iPad12p9inLandscape = false;

	public int resWidth = 2550; 
	public int resHeight = 3300;

	private bool takeHiResShot = false;

	public static string ScreenShotName(int width, int height) {
		return string.Format("{0}/Screenshots/screen_{1}x{2}_{3}.png", 
			Application.dataPath, 
			width, height, 
			System.DateTime.Now.ToString("yyyy-MM-dd_HH-mm-ss"));
	}

	public void TakeHiResShot() {
		takeHiResShot = true;
	}

	void LateUpdate() {

		if (iPhone7Landscape) {
			resWidth = 1334; 
			resHeight = 750;
		}
		if (iPhone7PlusLandscape) {
			resWidth = 2208; 
			resHeight = 1242;
		}
		if (iPad12p9inLandscape) {
			resWidth = 2732; 
			resHeight = 2048;
		}

		takeHiResShot |= Input.GetKeyDown("k");
		if (takeHiResShot) {
			RenderTexture rt = new RenderTexture(resWidth, resHeight, 24);
			GetComponent<Camera>().GetComponentInChildren<Camera>().targetTexture = rt;
			Texture2D screenShot = new Texture2D(resWidth, resHeight, TextureFormat.RGB24, false);
			GetComponent<Camera>().GetComponentInChildren<Camera>().Render();
			RenderTexture.active = rt;
			screenShot.ReadPixels(new Rect(0, 0, resWidth, resHeight), 0, 0);
			GetComponent<Camera>().GetComponentInChildren<Camera>().targetTexture = null;
			RenderTexture.active = null; // JC: added to avoid errors
			Destroy(rt);
			byte[] bytes = screenShot.EncodeToPNG();
			string filename = ScreenShotName(resWidth, resHeight);
			System.IO.File.WriteAllBytes(filename, bytes);
			Debug.Log(string.Format("Took screenshot to: {0}", filename));
			takeHiResShot = false;
		}
	}

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}
