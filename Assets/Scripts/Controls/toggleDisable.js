#pragma strict
import UnityEngine.UI;

public var tog1 : Toggle;
public var tog2 : Toggle;

function Start () {

}

function tog1Enable()
{
	tog1.isOn = true;
	tog2.isOn = false;
}

function tog2Enable()
{
	tog2.isOn = true;
	tog1.isOn = false;

}