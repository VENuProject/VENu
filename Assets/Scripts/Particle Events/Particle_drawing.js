	#pragma strict
import SimpleJSON;
import System.IO;

var drawingdot : Rigidbody;
var spacepoint : Vector3;
var referencepoint : Vector3;
referencepoint = transform.position;

function P( aText : String)
{

}

function Start () {

}
/*
function Update () {
	if(Input.GetButtonDown("H")){
	Test();
	}
}



function Test() {

    // To read in from the Argo web interface
    var url = "http://argo-microboone.fnal.gov/server/serve_event.cgi?filename=%2Fuboone%2Fdata%2Fuboonepro%2F%2Freco%2Fv1_00_04_ub01%2Fprod_muminus_0.5-5.0GeV_25degf_3window_uboone%2F15565231_0%2Fprod_muminus_0.5-5.0GeV_25degf_3window_uboone_15319004_3_gen_15321872_3_g4_15342660_3_detsim_tpc_15370973_2_reco2D_15387746_1_reco3D_merged.root&selection=1&entry=0&options=_NoPreSpill_NoPostSpill__NORAW__NOCAL_&download";
    var www : WWW = new WWW(url);
    // Wait for the download to complete
    yield www;
    var jsonString = www.data;
/*
    // To read in from a file **LEAVE THIS COMMENTED OUT FOR NOW**
    var sr = new StreamReader(Application.dataPath + "/" + fileName);
    var jsonString = sr.ReadToEnd();
    sr.Close();

    //var N = JSONNode.Parse(jsonString);
    var N = JSONNode.Parse(jsonString);

    P("The event number is: ");
    P(N["record"]["header"]["event"].ToString(""));

    P("The first wire is: ");
    P(N["record"]["hits"]["recob::Hits_cccluster__Reco2D"][0]["wire"].ToString(""));

    P("The first spacepoint xyz is: ");
    P(N["record"]["spacepoints"]["recob::SpacePoints_spacepointfinder__Reco3D"][0]["xyz"][0].ToString()  
    + "," + N["record"]["spacepoints"]["recob::SpacePoints_spacepointfinder__Reco3D"][0]["xyz"][1].ToString()
    + "," + N["record"]["spacepoints"]["recob::SpacePoints_spacepointfinder__Reco3D"][0]["xyz"][2].ToString());
	
	
	var i : int;
	var clone: Rigidbody;
	i = 1;
	var imax : int = 1700;
	var xs = new Array ();
	var ys = new Array ();
	var zs = new Array ();
	var istring = new Array();
	
	var x = new Array ();
	var y = new Array ();
	var z = new Array ();
	
	for (i=0; i<imax; i++) {
		istring = i.ToString();
		//Creating the positions for each in-game spacepoint
		//xs[i] = (P(N["record"]["spacepoints"]["recob::SpacePoints_spacepointfinder__Reco3D"][istring]["xyz"][0]).ToString());
		xs[i] = ((N(["record"]["spacepoints"]["recob::SpacePoints_spacepointfinder__Reco3D"][istring]["xyz"][0])).ToString());
		//ys[i] = (P(N["record"]["spacepoints"]["recob::SpacePoints_spacepointfinder__Reco3D"][istring]["xyz"][1]).ToString());
        y[i] = ((N(["record"]["spacepoints"]["recob::SpacePoints_spacepointfinder__Reco3D"][istring]["xyz"][1])).ToString());
        //zs[i] = (P(N["record"]["spacepoints"]["recob::SpacePoints_spacepointfinder__Reco3D"][istring]["xyz"][2]).ToString());
    	zs[i] = ((N( ["record"]["spacepoints"]["recob::SpacePoints_spacepointfinder__Reco3D"][istring]["xyz"][2])).ToString());
    	
    	x[i] = float.Parse(xs[i]);
    	y[i] = float.Parse(ys[i]);
    	z[i] = float.Parse(zs[i]);
    	
    	spacepoint = referencepoint + Vector3(x[i],y[i],z[i]);
    	
    	clone = clInstantiate(drawingdot, spacepoint, 1);
        
	 } 
}
*/
