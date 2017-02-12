using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class trackAnimation : MonoBehaviour {

	public float secBeforeStart = 2.5f;
	public float step = 0.5f;
	public float speed = 0.05f;
	public float pmtTime = 0.1f;

	Vector3[] position_v = new Vector3[1000];

	private ParticleSystem ps;

	private ParticleSystem sc;
	Light[] lt = new Light[6];
	GameObject panel = new GameObject();



	// Use this for initialization
	void Start () {

		Debug.Log ("start is called");

		Vector3 start = new Vector3(-5,-1,5);
		Vector3 end   = new Vector3(0,0,20);
		Color color = new Color (0.2F, 0.3F, 0.4F);

		// Get the PMTs
		GameObject pointLigth = GameObject.Find ("PMTLight");
		//lt = pointLigth.GetComponent<Light>();
		foreach (Transform child in pointLigth.transform){
			if (child.name == "Point light"){
				lt[0] = child.gameObject.GetComponent<Light>();;
			}
			if (child.name == "Point light (1)"){
				lt[1] = child.gameObject.GetComponent<Light>();;
			}
			if (child.name == "Point light (2)"){
				lt[2] = child.gameObject.GetComponent<Light>();;
			}
			if (child.name == "Point light (3)"){
				lt[3] = child.gameObject.GetComponent<Light>();;
			}
			if (child.name == "Point light (4)"){
				lt[4] = child.gameObject.GetComponent<Light>();;
			}
			if (child.name == "Point light (5)"){
				lt[5] = child.gameObject.GetComponent<Light>();;
			}
		}


		// Get the TEXT
		GameObject canvas = GameObject.Find ("Canvas");
		foreach (Transform child in canvas.transform) {
			if (child.name == "Panel") {
				panel = child.gameObject;
			}
		}
			
		DrawLine (start, end, color, 10f);

		Debug.Log ("after calling draw line");
	}
	
	// Update is called once per frame
	void Update () {
		
	}


	void DrawLine(Vector3 start, Vector3 end, Color color, float duration = 0.2f) {
			
		// To synch with the particle system
		transform.position = end;



		GameObject ps = gameObject;

		foreach (Transform child in transform){
			if (child.name == "Particle System"){
				ps = child.gameObject;
				Debug.Log ("FOUND");
			}
		}

		float middlePoint_x = (start.x + end.x) / 2 ;
		float middlePoint_y = (start.y + end.y) / 2 ;
		float middlePoint_z = (start.z + end.z) / 2 ;

		Vector3 middlePoint = new Vector3 (end.z-start.z, start.x-end.x, start.y-end.y);
		//ps.transform.position = middlePoint;



		sc = ps.GetComponent<ParticleSystem>();

		Vector3 base_x = new Vector3 (1, 0, 0);
		Vector3 base_y = new Vector3 (0, 1, 0);
		Vector3 base_z = new Vector3 (0, 0, 1);

		Vector3 direction = (end - start);

		Vector3 temp = new Vector3 (0, direction.y, direction.z);
		float angle_x = Vector3.Angle (base_z, temp);

		float sign = +1;
		if (direction.z < 0)
			sign = -1;

		temp = new Vector3 (0, direction.y, sign*direction.z);
		float angle_y = sign*Vector3.Angle (temp, base_z);

		temp = new Vector3 (direction.x,0 , sign*direction.z);
		float angle_z = sign*Vector3.Angle (temp, base_z);

		//Debug.Log ("angle_x is " + angle_x);
		Debug.Log ("angle_y is " + angle_y);
		Debug.Log ("angle_z is " + angle_z);

		ps.transform.localRotation = Quaternion.Euler(0, angle_y, -angle_z);


		// Particle system properties
		ParticleSystemShapeType shapeType = ParticleSystemShapeType.SingleSidedEdge;
		var shape = sc.shape;
		shape.shapeType = shapeType;
		shape.radius = (end - start).magnitude;

		var emission = sc.emission;
		emission.rateOverTime = 0f;

		var main = sc.main;
		//main.startSpeed = 0.1f;
		main.startSize = 0.1f;
		//main.startLifetime = 1.0f;



		Debug.Log ("before coro ps.transform.position.x is " + ps.transform.position.x);

		GameObject myLine = new GameObject();
		myLine.transform.SetParent (transform);

		StartCoroutine(PlacePoints(myLine, color, start, end));

		Debug.Log ("after coro ps.transform.position.x is " + ps.transform.position.x);

		//GameObject.Destroy(myLine, duration);
	}

	IEnumerator PlacePoints(GameObject myLine, Color color, Vector3 start, Vector3 end) {

		// Wait for 2 seconds, then remove the text
		yield return new WaitForSeconds (2f);
		panel.SetActive (false);

		yield return new WaitForSeconds (secBeforeStart);

		myLine.AddComponent<LineRenderer>();
		LineRenderer lr = myLine.GetComponent<LineRenderer>();
		//lr.material = new Material(Shader.Find("Particles/Alpha Blended Premultiply"));
		lr.SetColors(color, color);
		lr.SetWidth(0.1f, 0.1f);

		lr.SetPosition(0, start);

		float distance = (end - start).magnitude;
		int nstep = UnityEngine.Mathf.RoundToInt( (float) distance / step);
		Debug.Log ("nstep is " + nstep);

		Vector3 direction = (end - start).normalized;

		Vector3 old_pos = start;

		for (int pt = 1; pt < nstep; pt++) {
			Vector3 new_pos = old_pos + direction;
			position_v[pt] = new_pos;
			//Debug.Log ("this position is " + new_pos.x + " " + new_pos.y + " " + new_pos.z );
			old_pos = new_pos;
		}

		print(Time.time);
		for (int pt = 1; pt < nstep; pt++) {
			lr.SetPosition (1, position_v[pt]);
			yield return new WaitForSeconds (speed);
		}
		print(Time.time);


		// Now activate PMTs
		SetPMTIntensity(3);
		yield return new WaitForSeconds (pmtTime);
		for (float intensity = 3f; true; intensity -= 0.1f) {
			yield return new WaitForSeconds (0.01f);
			if (intensity < 0f) {
				SetPMTIntensity(0f);
				break;
			} else {
				SetPMTIntensity(intensity);
			}
		}

		// Now activate particle system
		var emission = sc.emission;
		emission.rateOverTime = 500f;
	}



	void SetPMTIntensity(float intensity) {

		for (int pmt = 0; pmt < 6; pmt++) {
			lt [pmt].intensity = intensity;
		}
	}
}
