
/* 
 * For the slider in the settings panel
 * to control high/medium/low/none density settings
 * -Owen
 */

using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class pointDensitySlider : MonoBehaviour {

	int density;
	public Text txt;

	void Start () {
		UpdateDensity();
	}

	public void UpdateDensity(){
		density = (int)GetComponent<Slider>().value;
		switch(density){
		case 0:
			txt.text = "None";
			PlayerPrefs.SetFloat("maxSpacePoints", 0f);
			break;
		case 1:
			txt.text = "Low";
			PlayerPrefs.SetFloat("maxSpacePoints", 500f);
			break;
		case 2:
			txt.text = "Medium";
			PlayerPrefs.SetFloat("maxSpacePoints", 1500f);
			break;
		case 3:
			txt.text = "High";
			PlayerPrefs.SetFloat("maxSpacePoints", 3000f);
			break;
		default:
			txt.text = "???";
			PlayerPrefs.SetFloat("maxSpacePoints", 0f);
			break;
		}
	}
}
