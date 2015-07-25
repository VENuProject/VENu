using UnityEngine;
using System.Collections;
using UnitySampleAssets.CrossPlatformInput;
using UnityEngine.UI;

public class ControlSwitcher : MonoBehaviour {
	
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
	
	void Start () {

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

		PlayerPrefs.SetFloat("LookSensitivity", 0.1f);
		PlayerPrefs.SetFloat("MoveSpeed", 0.2f);
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
