
var projectile1 : Rigidbody;
var projectile2 : Rigidbody;
var speed : float = 40;


function OnTriggerEnter( other : Collider ) {

    GetComponent(MeshRenderer).enabled = false;
    GetComponent(Light).enabled = false;

    // Instantiate the projectile at the position and rotation of this transform
    var nu1 : Rigidbody;
    var nu2 : Rigidbody; 
    nu1 = Instantiate(projectile1, transform.position, transform.rotation);
    nu2 = Instantiate(projectile2, transform.position, transform.rotation);

    // Add force to the cloned object in the object's forward direction
    nu1.velocity = transform.TransformDirection(Vector3(normRand(),normRand(),speed/2));
    nu2.velocity = transform.TransformDirection(Vector3(normRand(),normRand(),speed/2));

    //Destroy(gameObject);
	
    Destroy(nu1.gameObject, 3);
    Destroy(nu2.gameObject, 3);
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






