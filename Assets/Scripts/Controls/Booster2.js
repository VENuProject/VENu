#pragma strict



var projectile : Rigidbody;
var speed : float = 40;
private var idleTimer : float = 0.0;
private var lastPos : Vector3;
function Start (){
  	lastPos = transform.position;

}

function Update () {
  	var nu1 : Rigidbody;
    var nu2 : Rigidbody;
    var vel: float = Vector3.Distance(transform.position, lastPos)/Time.deltaTime;
  	lastPos = transform.position; // update lastPos
  
  if (vel > 0.001){ // if vel slightly greater than zero...
    idleTimer = 0.0; // reset timer
  } 
  
  else { // if zero or too near to zero...
    idleTimer += Time.deltaTime; // count time in idleTimer
  }

	if (idleTimer >= 4){
	
	nu1 = Instantiate(projectile, transform.position, transform.rotation);
 
    // Add force to the cloned object in the object's forward direction
    nu1.velocity = transform.TransformDirection(Vector3(normRand(),normRand(),speed));

	idleTimer = 0.0;
	}

    // Put this in your update function
    else if (Input.GetKeyDown(KeyCode.F)) {
 
    // Instantiate the projectile at the position and rotation of this transform
; 
    nu1 = Instantiate(projectile, transform.position, transform.rotation);
 
    // Add force to the cloned object in the object's forward direction
    nu1.velocity = transform.TransformDirection(Vector3(normRand(),normRand(),speed));


	
	Destroy(nu1.gameObject, 4);
    }
}










/*
 *  normRand: returns normally distributed random numbers
 */
function normRand() {
var x1 : float; 
var x2 : float; 
var rad : float;
var c : float; 
    do {
        x1 = 2 * Random.value - 1;
        x2 = 2 * Random.value - 1;
        rad = x1 * x1 + x2 * x2;
    } while(rad >= 1 || rad == 0);
 
    c = Mathf.Sqrt(-2 * Mathf.Log(rad) / rad);
 
    return x1 * c;
};

