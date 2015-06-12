using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class changeimagecolor : MonoBehaviour 
{
	Image image;
	void Start()
	{
		image = GetComponent<Image>();
			}

	public void red(){
		image.color = Color.red;
	}

	public void blue(){
		image.color = Color.blue;
	}


}
