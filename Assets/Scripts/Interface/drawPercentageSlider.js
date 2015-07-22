#pragma strict
import UnityEngine.UI;

var scrollbar : UnityEngine.UI.Slider;
var perc : float;

function Start () 
{
	
}

function Update()
{
	perc = scrollbar.value;
	
}

function changePerc () 
{
	PlayerPrefs.SetFloat("DrawPercentage",perc);
}