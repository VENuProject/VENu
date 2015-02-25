using UnityEngine;
using System.Collections;

public class XTranslateCamera : MonoBehaviour {

void Start () {

}

void Update () {
		transform.Translate(Vector3.left*2*Time.deltaTime +Vector3.back*2*Time.deltaTime);
}

}
