#pragma strict
public var tog1 : Toggle;
function Start () {

}

function togEnable () 
{
	if(tog1.isOn == true)
	{
		gameObject.SetActive(true);
	}
	else 
	{
		gameObject.SetActive(false);
	}
}
