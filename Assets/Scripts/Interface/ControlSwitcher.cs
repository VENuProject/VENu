using UnityEngine;
using System.Collections;
using UnitySampleAssets.CrossPlatformInput;

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
	public GameObject SwitcherButton;
	
	void Start () {

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
		case ControlSchemes.MouseMode:
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
	
	public void OneJoyMode(){
		TwoJoyRig.SetActive(false);
		MinimapRig.SetActive(false);
		OneJoyRig.SetActive(true);
		MouseRig.SetActive(false);
		MoveJoy.SetActive(true);
		LookJoy.SetActive(false);
		HeightSlider.SetActive(true);
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
