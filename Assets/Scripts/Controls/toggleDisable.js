#pragma strict
import UnityEngine.UI;

public var tog1 : Toggle;
function Start () {

}

function togDisable() 
{
	if(tog1.isOn == true)
	{
		gameObject.SetActive(false);
	}
	else 
	{
		gameObject.SetActive(true);
	}
}

