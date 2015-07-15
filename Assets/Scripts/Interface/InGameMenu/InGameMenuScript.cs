using UnityEngine;
using System.Collections;
using System.IO;


public class InGameMenuScript: MonoBehaviour {
	
	public string EventMenuScene;
	
	//for animation
	private enum menuState {isIn, slidingOut, isOut, slidingIn};
	private menuState state;
	private float inPos;
	private float outPos;
	private float startTime;
	private RectTransform me;
	const float slideSpeed = 3;


	void Start () {
		me = GetComponent<RectTransform>();
		state = menuState.isIn;
		inPos = -(me.rect.width / 2);
		outPos = (me.rect.width / 2);
		me.anchoredPosition = new Vector2(inPos, 0);

	}

	void Update () {

		if(state == menuState.slidingOut){
			me.anchoredPosition = Vector2.Lerp (new Vector2(inPos, 0), new Vector2(outPos, 0), (Time.time - startTime) * slideSpeed);
			if (me.anchoredPosition == new Vector2(outPos, 0))
				state = menuState.isOut;
		}
		else if(state == menuState.slidingIn){
			me.anchoredPosition = Vector2.Lerp (new Vector2(outPos, 0), new Vector2(inPos, 0), (Time.time - startTime) * slideSpeed);
			if (me.anchoredPosition == new Vector2(inPos, 0))
				state = menuState.isIn;
		}

	}

	void SlideMenu() {
		if(state == menuState.isIn){
			state = menuState.slidingOut;
			startTime = Time.time;
		}
		else if(state == menuState.isOut){
			state = menuState.slidingIn;
			startTime = Time.time;
		}
	}
	
	public void ToEventMenu() {
		Application.LoadLevel (EventMenuScene);
	}

	public void LoadNext(){
		string currentEvent = PlayerPrefs.GetString("File To Load");
		DirectoryInfo dir = new DirectoryInfo(Application.streamingAssetsPath);
		FileInfo[] filesInfo = dir.GetFiles("*.json");
		int currentIndex = -1;

		for(int i = 0; i < filesInfo.Length; i++)
			if(filesInfo[i].Name == currentEvent)
				currentIndex = i;
		
		if(currentIndex == filesInfo.Length - 1){
			//no more files!
			Debug.Log("No more files!");
		}
		else if(currentIndex == -1){
			//don't know where we are. did File To Load not get set?
			Debug.Log("file not found!");
			
		}
		else{
			PlayerPrefs.SetString("File To Load", filesInfo[currentIndex +1].Name);
			Debug.Log("loading file " + PlayerPrefs.GetString("File To Load"));
			Application.LoadLevel(Application.loadedLevel);
			//the file is loaded elsewhere. All that script needs is the name of the new file.
		}
	}
}
