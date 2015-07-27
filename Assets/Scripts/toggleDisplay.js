#pragma strict
import UnityEngine.UI;

public var cryoTog : Toggle;
public var slidr : Slider;
public var cryostat : GameObject;


function Start () {

}

function Update () {

}

function Tog ()
{
	if(cryoTog.isOn)
	{
		cryostat.SetActive(false);
	}
	else
	{
		cryostat.SetActive(true);
	}
}

function scaleSize()
{
	cryostat.transform.localScale = Vector3(slidr.value, slidr.value, slidr.value);
}