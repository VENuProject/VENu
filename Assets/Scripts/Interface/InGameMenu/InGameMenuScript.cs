using UnityEngine;
using System.Collections;


public class InGameMenuScript: MonoBehaviour {

	private bool menuOut = false;
	public Animator anim;
	public string EventMenuScene;
	private enum menuState {isIn, slidingOut, isOut, slidingIn};
	private menuState state;
	private float inPos;
	private float outPos;
	private RectTransform me;


	void Start () {
		anim.enabled = false;

		me = GetComponent<RectTransform>();
		state = menuState.isIn;
		inPos = -(me.rect.width / 2);
		outPos = (me.rect.width / 2);
		Debug.Log (inPos);
		Debug.Log (outPos);

	}

	void Update () {
		//Debug.Log (me.position);
		Debug.Log (transform.position);
		//Debug.Log(state);

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
