using UnityEngine;
using System.Collections;

public class mobileOrStandalone : MonoBehaviour {

	public GameObject fieldCage;
	public GameObject feedthrough1;
	public GameObject feedthrough2;

	void Start () {
#if MOBILE_INPUT
		fieldCage.SetActive(false);
		feedthrough1.SetActive(false);
		feedthrough2.SetActive(false);
#else
		fieldCage.SetActive(true);
		feedthrough1.SetActive(true);
		feedthrough2.SetActive(true);
#endif
	}	
}
