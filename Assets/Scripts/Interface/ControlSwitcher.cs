using UnityEngine;
using System.Collections;

public class ControlSwitcher : MonoBehaviour {
	
	public enum ControlSchemes {OneJoy, TwoJoy, Minimap};
	public ControlSchemes scheme;
	public GameObject OneJoyRig;
	public GameObject TwoJoyRig;
	public GameObject MinimapRig;
	
	void Start () {
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
			Debug.Log ("This can't be happening!");
			break;
		}
		
		PlayerPrefs.SetFloat("LookSensitivity", 0.1f);
		PlayerPrefs.SetFloat("MoveSpeed", 0.2f);
		PlayerPrefs.SetFloat("PlayerHeight", 0);
	}
	
	public void ChangeScheme(){
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
			Debug.Log ("This can't be happening!");
			break;
		}
	}
	
	public void OneJoyMode(){
		TwoJoyRig.SetActive(false);
		MinimapRig.SetActive(false);
		OneJoyRig.SetActive(true);
		scheme = ControlSchemes.OneJoy;
	}
	
	public void TwoJoyMode(){
		OneJoyRig.SetActive(false);
		MinimapRig.SetActive(false);
		TwoJoyRig.SetActive(true);
		scheme = ControlSchemes.TwoJoy;
	}
	
	public void MinimapMode(){
		TwoJoyRig.SetActive(false);
		OneJoyRig.SetActive(false);
		MinimapRig.SetActive(true);
		scheme = ControlSchemes.Minimap;
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
