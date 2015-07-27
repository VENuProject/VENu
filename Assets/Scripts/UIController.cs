using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class UIController : MonoBehaviour
{
	public GameObject Cryostat;
	public GameObject Feedthroughs1;
	public GameObject Feedthroughs2;
	public GameObject Endcap;
	public Slider slidr; 
	
	public void Size ()
	{
		float scale = slidr.value;
		transform.localScale = new Vector3 (scale, scale, scale);
	}
	
	public void ToggleCryostat ()
	{
		Cryostat.GetComponent<MeshRenderer>().enabled = !Cryostat.GetComponent<MeshRenderer>().enabled ;
		Endcap.GetComponent<MeshRenderer>().enabled = !Endcap.GetComponent<MeshRenderer>().enabled ;
		Feedthroughs1.GetComponent<MeshRenderer>().enabled = !Feedthroughs1.GetComponent<MeshRenderer>().enabled ;
		Feedthroughs2.GetComponent<MeshRenderer>().enabled = !Feedthroughs2.GetComponent<MeshRenderer>().enabled ;
	}
}