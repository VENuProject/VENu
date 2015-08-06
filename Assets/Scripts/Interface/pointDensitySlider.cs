
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
	public Slider slide;
	public const int lowPoints = 500;
	public const int medPoints = 1500;
	public const int highPoints = 3000;

	void Start () {
		if(slide == null)
			slide = GetComponent<Slider>();

		if(PlayerPrefs.HasKey("maxSpacePoints")){
			int max = PlayerPrefs.GetInt("maxSpacePoints");
			switch(max){
			case 0:
				slide.value = 0;
				break;
			case lowPoints:
				slide.value = 1;
				break;
			case medPoints:
				slide.value = 2;
				break;
			case highPoints:
				slide.value = 3;
				break;
			default:
				slide.value = 2;
				break;
			}
		}
		UpdateDensity();
	}

	public void UpdateDensity(){
		density = (int)slide.value;
		switch(density){
		case 0:
			txt.text = "None";
			PlayerPrefs.SetInt("maxSpacePoints", 0);
			break;
		case 1:
			txt.text = "Low";
			PlayerPrefs.SetInt("maxSpacePoints", lowPoints);
			break;
		case 2:
			txt.text = "Medium";
			PlayerPrefs.SetInt("maxSpacePoints", medPoints);
			break;
		case 3:
			txt.text = "High";
			PlayerPrefs.SetInt("maxSpacePoints", highPoints);
			break;
		default:
			txt.text = "???";
			PlayerPrefs.SetInt("maxSpacePoints", 0);
			break;
		}
	}
}
