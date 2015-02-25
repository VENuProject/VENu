#pragma strict



var projectile : Rigidbody;
var speed : float = 40;
var force : float = 4;
var flavor : int = 0;
static var tzero = 0;
static var mintime = 1;

function FixedUpdate () {
    // Put this in your update function
    if (Input.GetKeyDown(KeyCode.F)) {
 
    // Instantiate the projectile at the position and rotation of this transform
    var nu1 : Rigidbody;
    var nu2 : Rigidbody;
    particle1 = nu1; 
    particle1 = Instantiate(projectile, transform.position, transform.rotation);
 
    // Add force to the cloned object in the object's forward direction
    nu1.velocity = transform.TransformDirection(Vector3(0,0,speed));
		function Transtime {
		if (Time.deltaTime > mintime){
		
		flavor = return Math.floor(Math.random()*(2)+1);
		
		if (flavor == 1) {
		particle1 = nu2;
		}
		
		else {
		particle1 = nu1;
		}
	}
		
	
	
	}
	Destroy(clone.gameObject, 3);
    }
}