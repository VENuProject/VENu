using UnityEngine;
using System.Collections;

public class InGameMenuScript: MonoBehaviour {

	private bool menuOut = false;
	public Animator anim;
	public string EventMenuScene;

	void Start () {
		anim.enabled = false;
	}

	void Update () {
		
	}

	void SlideMenu() {
		anim.enabled = true;
		if (!menuOut)
			anim.Play("InGameMenuSlideIn");
		else 
			anim.Play("InGameMenuSlideOut");
		menuOut = !menuOut;
	}

	public void ToEventMenu() {
		Application.LoadLevel (EventMenuScene);
	}
}
