using UnityEngine;
using System.Collections;
using UnitySampleAssets.CrossPlatformInput;
using UnityEngine.UI;

public class controlSwitcher : MonoBehaviour {
	
	public enum ControlSchemes {OneJoy, TwoJoy, Minimap, Mouse};
	public ControlSchemes scheme;
	public GameObject OneJoyRig;
	public GameObject TwoJoyRig;
	public GameObject MinimapRig;
	public GameObject MouseRig;
	public GameObject MoveJoy;
	public GameObject LookJoy;
	public GameObject HeightSlider;
	public GameObject uiLabel;
	public GameObject inGameMenu;
	public GameObject minimapOrthoCamera;
	public GameObject tooltip;
	public bool ttVisible;
	public bool uiShown;

	public Slider moveSpeedSlider;
	public Slider lookSpeedSlider;

#if !MOBILE_INPUT
	void Update(){
		if(Input.GetKeyDown(KeyCode.H)){
			uiShown = !uiShown;
			inGameMenu.SetActive(uiShown);
			minimapOrthoCamera.SetActive(uiShown);
			MoveJoy.SetActive(uiShown && (scheme == ControlSchemes.OneJoy || scheme == ControlSchemes.TwoJoy));
			LookJoy.SetActive(uiShown && (scheme == ControlSchemes.TwoJoy));
			HeightSlider.SetActive(uiShown);
			if(!uiShown)
				ttVisible = tooltip.activeInHierarchy;
			tooltip.SetActive(uiShown && ttVisible);

		}
	}
#endif

	void Start () {

		if (PlayerPrefs.HasKey ("LookSensitivity")) {
			Debug.Log ("Getting LookSensitivity from PlayerPrefs, which is: " + PlayerPrefs.GetFloat ("LookSensitivity"));
			lookSpeedSlider.value = PlayerPrefs.GetFloat ("LookSensitivity");
		}
		else
			lookSpeedSlider.value = 0.05f; // was 0.4
//			PlayerPrefs.SetFloat("LookSensitivity", 0.2f);

		if(PlayerPrefs.HasKey("MoveSpeed"))
			moveSpeedSlider.value = PlayerPrefs.GetFloat("MoveSpeed");
		else
			moveSpeedSlider.value = 0.3f;

		if(PlayerPrefs.HasKey("ControlScheme"))
			SetScheme(PlayerPrefs.GetInt("ControlScheme"));
		else
			SetScheme((int)ControlSchemes.Minimap);

		SetMoveSpeed(moveSpeedSlider.value);
		SetSensitivity(lookSpeedSlider.value);

		uiShown = true;
		Physics.IgnoreLayerCollision(0, 11);
		Physics.IgnoreLayerCollision(0, 12);

		GameObject dummyRig = new GameObject("dummyRig");
		if(OneJoyRig == null)
			OneJoyRig = dummyRig;
		if(TwoJoyRig == null)
			TwoJoyRig = dummyRig;
		if(MinimapRig == null)
			MinimapRig = dummyRig;
		if(MouseRig == null)
			MouseRig = dummyRig;
		if(MoveJoy == null)
			MoveJoy = dummyRig;
		if(LookJoy == null)
			LookJoy = dummyRig;
		if(HeightSlider == null)
			HeightSlider = dummyRig;
		if(uiLabel == null)
			uiLabel = dummyRig;

#if !MOBILE_INPUT
		switch (scheme){
		case ControlSchemes.Minimap:
			MinimapMode();
			break;
		case ControlSchemes.Mouse:
			MouseMode();
			break;
		default:
			MinimapMode();
			break;
		}
#else
		switch (scheme){
		case ControlSchemes.OneJoy:
			OneJoyMode();
			break;
		case ControlSchemes.TwoJoy:
			TwoJoyMode();
			break;
		case ControlSchemes.Minimap:
			MinimapMode();
			break;
		default:
			MinimapMode();
			break;
		}
#endif
		PlayerPrefs.SetFloat("PlayerHeight", 0);
	}


	public void ChangeScheme(){

#if MOBILE_INPUT
		switch (scheme){
		case ControlSchemes.OneJoy:
			TwoJoyMode();
			break;
		case ControlSchemes.TwoJoy:
			MinimapMode();
			break;
		case ControlSchemes.Minimap:
			OneJoyMode();
			break;
		default:
			MinimapMode();
			break;
		}
#else
		switch (scheme){
		case ControlSchemes.Mouse:
			MinimapMode();
			break;
		case ControlSchemes.Minimap:
			MouseMode();
			break;
		default:
			MinimapMode();
			break;
		}
#endif
		PlayerPrefs.SetInt("ControlScheme", (int)scheme);

	}
	
	public void NextScheme(){
		int newScheme = (int)scheme + 1;
#if MOBILE_INPUT
		if (newScheme == 3)
			newScheme = 0;
#else
		if (newScheme == 4)
			newScheme = 2;
#endif
		SetScheme(newScheme);
	}


	public void PrevScheme(){
		int newScheme = (int)scheme - 1;
		#if MOBILE_INPUT
		if (newScheme == -1)
			newScheme = 2;
		#else
		if (newScheme == 1)
			newScheme = 3;
		#endif
		SetScheme(newScheme);
	}

	public void SetScheme(int newScheme){
		switch(newScheme){
		case 0:
			OneJoyMode();
			break;
		case 1:
			TwoJoyMode();
			break;
		case 2:
			MinimapMode();
			break;
		case 3:
			MouseMode();
			break;
		}
		PlayerPrefs.SetInt("ControlScheme", (int)scheme);
	}

	public void OneJoyMode(){
		TwoJoyRig.SetActive(false);
		MinimapRig.SetActive(false);
		OneJoyRig.SetActive(true);
		MouseRig.SetActive(false);
		MoveJoy.SetActive(true);
		LookJoy.SetActive(false);
		HeightSlider.SetActive(true);
		uiLabel.GetComponent<Text>().text = "One Joy";
		scheme = ControlSchemes.OneJoy;
	}
	
	public void TwoJoyMode(){
		OneJoyRig.SetActive(false);
		MinimapRig.SetActive(false);
		TwoJoyRig.SetActive(true);
		MouseRig.SetActive(false);
		MoveJoy.SetActive(true);
		LookJoy.SetActive(true);
		HeightSlider.SetActive(true);
		uiLabel.GetComponent<Text>().text = "Two Joy";
		scheme = ControlSchemes.TwoJoy;
	}
	
	public void MinimapMode(){
		TwoJoyRig.SetActive(false);
		OneJoyRig.SetActive(false);
		MinimapRig.SetActive(true);
		MouseRig.SetActive(false);
		MoveJoy.SetActive(false);
		LookJoy.SetActive(false);
		HeightSlider.SetActive(true);
		uiLabel.GetComponent<Text>().text = "Minimap";
		scheme = ControlSchemes.Minimap;
	}

	public void MouseMode(){
		TwoJoyRig.SetActive(false);
		MinimapRig.SetActive(false);
		OneJoyRig.SetActive(false);
		MouseRig.SetActive(true);
		MoveJoy.SetActive(false);
		LookJoy.SetActive(false);
		HeightSlider.SetActive(true);
		uiLabel.GetComponent<Text>().text = "W A S D";
		scheme = ControlSchemes.Mouse;
	}
	
	public void SetSensitivity(float val){
		PlayerPrefs.SetFloat("LookSensitivity", val);
	}
	
	public void SetMoveSpeed(float val){
		PlayerPrefs.SetFloat("MoveSpeed", val);
	}
	
	public void SetHeight(float val){
		PlayerPrefs.SetFloat("PlayerHeight", val);
	}
	
	public void SetPrecision(float val){
		PlayerPrefs.SetFloat("DrawPrecision", val);
	}
}
