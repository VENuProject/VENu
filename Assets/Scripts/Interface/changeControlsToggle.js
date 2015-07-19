#pragma strict
import UnityEngine.UI;


public var toggle : Toggle;
public var defaultControls : GameObject;
public var freeRoamControls : GameObject;
public var freeRoamController : GameObject;


function Start () {

}

function Update () {
	if(toggle.isOn == true)
	{
		freeRoamControls.SetActive(false);
		freeRoamController.SetActive(false);
		defaultControls.SetActive(true);
	
	}
	else
	{
		defaultControls.SetActive(false);
		freeRoamController.SetActive(true);
		freeRoamControls.SetActive(true);	
	}
	
	
}