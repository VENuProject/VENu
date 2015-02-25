#pragma strict



var projectile : Rigidbody;
var speed : float = 40;
var force : float = 4;

function Update () {
    // Put this in your update function
    if (Input.GetButtonDown("Fire1")) {
 
    // Instantiate the projectile at the position and rotation of this transform
    var clone : Rigidbody;
    clone = Instantiate(projectile, transform.position, transform.rotation);
 
    // Add force to the cloned object in the object's forward direction
    clone.velocity = transform.TransformDirection(Vector3(0,0,speed));


	
	Destroy(clone.gameObject, 3);
    }
}