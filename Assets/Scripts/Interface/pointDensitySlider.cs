
/* 
 * For the slider in the settings panel
 * to control high/medium/low/none density settings
 * -Owen
 */

using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class pointDensitySlider : MonoBehaviour {

	public int density;
	public Text txt;

	void Start () {
		UpdateDensity();
	}

	public void UpdateDensity(){
		density = (int)GetComponent<Slider>().value;
		PlayerPrefs.SetInt("Spacepoint Density", density);
		switch(density){
		case 0:
			txt.text = "None";
			break;
		case 1:
			txt.text = "Low";
			break;
		case 2:
			txt.text = "Medium";
			break;
		case 3:
			txt.text = "High";
			break;
		default:
			txt.text = "???";
			break;
		}
	}
}
