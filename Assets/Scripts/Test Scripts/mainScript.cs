using UnityEngine;
using System.Collections;

public class mainScript : MonoBehaviour {
	private Touch initialTouch = new Touch();
	private float distance = 0;
	private bool hasSwiped = false;

	void fixedUpdate()
	{
		foreach (Touch t in Input.touches) {
			if (t.phase == TouchPhase.Began) 
			{
				initialTouch = t;
			} 
			else if (t.phase == TouchPhase.Moved && !hasSwiped) 
			{
				float deltaX = initialTouch.position.x - t.position.x;
				float deltaY = initialTouch.position.y - t.position.y;
				distance = Mathf.Sqrt ((deltaX * deltaX) + (deltaY * deltaY));
				bool swipedSideways = Mathf.Abs(deltaX) > Mathf.Abs (deltaY);
				//distance formula

				//direction
			} 
			else if (t.phase == TouchPhase.Ended) 
			{
				initialTouch = new Touch();
			}
		}
	}

}
