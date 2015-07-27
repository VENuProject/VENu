using UnityEngine;
using System.Collections;

public class UIController : MonoBehaviour
{
	public void Reset ()
	{
		transform.localScale = new Vector3 (0.005f, 0.005f, 0.005f);
		foreach (Transform child in transform)
		{
			if (child.name != "PMTEquipment")
			{
				child.GetComponent<MeshRenderer>().enabled = true;
			}
			else
			{
				Component[] children = child.GetComponentsInChildren<MeshRenderer>();
				foreach (MeshRenderer component in children)
				{
					component.enabled = true;
				}
			}
		}
	}

	public void Size (float scale)
	{
		transform.localScale = new Vector3 (scale, scale, scale);
	}

	public void Render (string part)
	{
		if (part == "Cryostat")
		{
			foreach (Transform child in transform)
			{
				if (child.name == part || child.name == "Endcap")
				{
					child.GetComponent<MeshRenderer>().enabled = !child.GetComponent<MeshRenderer>().enabled;
				}
			}
		}
		else if (part == "WirePlane")
		{
			foreach (Transform child in transform)
			{
				if (child.name == part || child.name == "Racks")
				{
					child.GetComponent<MeshRenderer>().enabled = !child.GetComponent<MeshRenderer>().enabled;
				}
				if (child.name == "PMTEquipment")
				{
					Component[] childComponents = child.GetComponentsInChildren<MeshRenderer>();
					foreach (MeshRenderer component in childComponents)
					{
						component.enabled = !component.enabled;
					}
				}
			}
		}
		else
		{
			foreach (Transform child in transform)
			{
				if (child.name == part)
				{
					child.GetComponent<MeshRenderer>().enabled = !child.GetComponent<MeshRenderer>().enabled;
				}
			}
		}
	}
}