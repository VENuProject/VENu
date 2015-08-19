using UnityEngine;
using System.Collections;
using System.IO;
using UnityEngine.UI;


public class inGameMenuScript: MonoBehaviour {
	
	public string EventMenuScene;
	
	//for animation
	private enum menuState {isIn, slidingOut, isOut, slidingIn};
	private menuState state;
	private float inPos;
	private float outPos;
	private float startTime;
	private RectTransform me;
	const float slideSpeed = 3;
	public RectTransform buttonsGroup;
	public GameObject slideButton;
	
	
	void Start () {
		
		me = GetComponent<RectTransform>();
		
		#if MOBILE_INPUT
		me.sizeDelta = new Vector2(360, me.sizeDelta.y);
		foreach(LayoutElement child in buttonsGroup.GetComponentsInChildren<LayoutElement>()){
			child.minHeight = 75;
		}
		#else
		me.sizeDelta = new Vector2(320, me.sizeDelta.y);
		foreach(LayoutElement child in transform.GetComponentsInChildren<LayoutElement>()){
			child.minHeight = 70;
		}
		#endif
		
		state = menuState.isIn;
		inPos = -(me.rect.width / 2);
		outPos = (me.rect.width / 2);
		me.anchoredPosition = new Vector2(inPos, 0);
		
	}
	
	void Update () {
		
		if(state == menuState.slidingOut){
			me.anchoredPosition = Vector2.Lerp (new Vector2(inPos, 0), new Vector2(outPos, 0), (Time.time - startTime) * slideSpeed);
			//slideButton.GetComponent<RectTransform>().eulerAngles = Vector3.Lerp(new Vector3(0, 0, 0), new Vector3(0, 180, 0), (Time.time - startTime) * slideSpeed);
			if (me.anchoredPosition == new Vector2(outPos, 0))
				state = menuState.isOut;
		}
		else if(state == menuState.slidingIn){
			me.anchoredPosition = Vector2.Lerp (new Vector2(outPos, 0), new Vector2(inPos, 0), (Time.time - startTime) * slideSpeed);
			//slideButton.GetComponent<RectTransform>().eulerAngles = Vector3.Lerp(new Vector3(0, 180, 0), new Vector3(0, 0, 0), (Time.time - startTime) * slideSpeed);
			if (me.anchoredPosition == new Vector2(inPos, 0))
				state = menuState.isIn;
		}
		
	}
	
	public void SlideMenu() {
		if(state == menuState.isIn){
			state = menuState.slidingOut;
			slideButton.GetComponent<RectTransform>().eulerAngles = new Vector3(0, 0, 0); //AMCLEAN changed (0,0,180) to (0,0,0)
			startTime = Time.time;
		}	
		else if(state == menuState.isOut){
			state = menuState.slidingIn;
			slideButton.GetComponent<RectTransform>().eulerAngles = new Vector3(0, 0, 0);
			startTime = Time.time;
		}
	}
	
	public void ToEventMenu() {
		Application.LoadLevel(EventMenuScene);
	}
	
	public void LoadNext(){
		string currentEvent = PlayerPrefs.GetString("File To Load");
		DirectoryInfo dir = new DirectoryInfo(Application.streamingAssetsPath);
		FileInfo[] filesInfo = dir.GetFiles("*.json");
		int currentIndex = -1;
		
		for(int i = 0; i < filesInfo.Length; i++)
			if(filesInfo[i].Name == currentEvent)
				currentIndex = i;
		
		//if(currentIndex == filesInfo.Length - 1){
		//	//no more files!
		//	Debug.Log("No more files!");
		//}
		if(currentIndex == -1){
			//don't know where we are. did File To Load not get set?
			Debug.Log("file not found!");
			
		}
		else{
			PlayerPrefs.SetString("File To Load", filesInfo[(currentIndex + 1) % filesInfo.Length].Name);
			Debug.Log("loading file " + PlayerPrefs.GetString("File To Load"));
			Application.LoadLevel(Application.loadedLevel);
			//the file is loaded elsewhere. All that script needs is the name of the new file.
		}
	}
	
	public void LoadPrevious(){
		string currentEvent = PlayerPrefs.GetString("File To Load");
		DirectoryInfo dir = new DirectoryInfo(Application.streamingAssetsPath);
		FileInfo[] filesInfo = dir.GetFiles("*.json");
		int currentIndex = -1;
		
		for(int i = 0; i < filesInfo.Length; i++)
			if(filesInfo[i].Name == currentEvent)
				currentIndex = i;
		
		//if(currentIndex == filesInfo.Length - 1){
		//	//no more files!
		//	Debug.Log("No more files!");
		//}
		if(currentIndex == -1){
			//don't know where we are. did File To Load not get set?
			Debug.Log("file not found!");
			
		}
		else{
			PlayerPrefs.SetString("File To Load", filesInfo[(currentIndex -1) % filesInfo.Length].Name);
			Debug.Log("loading file " + PlayerPrefs.GetString("File To Load"));
			Application.LoadLevel(Application.loadedLevel);
			//the file is loaded elsewhere. All that script needs is the name of the new file.
		}
	}
}
