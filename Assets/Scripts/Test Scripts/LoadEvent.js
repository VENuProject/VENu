#pragma strict
//import Menu_Event_Select;	

var eventName : String;
var inputField : UnityEngine.UI.InputField;
var eventNameDisplay : UnityEngine.UI.Text;


function EventInput()
{
	eventName = inputField.text;
	eventNameDisplay.text = eventName;
}

function Start () {

}

function Update () {

}