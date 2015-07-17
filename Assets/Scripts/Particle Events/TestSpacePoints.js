#pragma strict
import SimpleJSON;
import System.IO;
import System.Linq;



var dotss : GameObject;
//var LoaderElement : GameObject = GameObject.FindGameObjectWithTag("Loader");
private var m_InGameLog = "";
private var m_Position  = Vector2.zero;

var inputString : String; 
static var _particle : String;
static var _event    : String;
static var _url      : String;
private var _url2     : String;
var buttonAppear = false; 

var fileName : String;

//Event counter
static var _i = 0;

var _urlArray = new Array() ;


function Awake()
{

	if(PlayerPrefs.HasKey("File To Load"))
	{
		fileName = PlayerPrefs.GetString("File To Load");
	}
	else
	{
		Debug.Log("<color=red>No Event Loaded</color>");
	}
	//Loader = GameObject.FindGameObjectWithTag("Loader");
	//Script = Loader.GetComponent(LoaderScript);
}
function P( aText : String)
{
	m_InGameLog += aText + "\n";
}

function Test()
{

    // Leave full url in for now because don't know how to deal with android stuff yet
    var url = "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=0&filename=%252Fpnfs%252Fuboone%252Fscratch%252Fuboonepro%252Fmcc6.0%252Fv04_06_01%252Freco1%252Fprod"+_particle+"_uboone%252F"+_event+"%252Fprod_*&options=_NoPreSpill_NoPostSpill__NORAW__NOCAL_";

    _url2 = _url + _i.ToString()+"%252Fprod_*&options=_NoPreSpill_NoPostSpill__NORAW__NOCAL_";

    P("\n\n\nHold up...");

    //Create array of all particles for one set of evenst
//    for(var i=0; i<100; i++){
//	_url2 = _url + i.ToString()+"%252Fprod_*&options=_NoPreSpill_NoPostSpill__NORAW__NOCAL_";
//	_urlArray.Push(_url2);
//	}

  //  for( var i = 0 ; i < urlArray.length; i++){

        var www : WWW = new WWW(_url2) ; //urlArray[i]);
        //// Wait for the download to complete
        yield www;
        var jsonString = www.text;
//        P("Saving JSON string... ") ;
        
        if(Application.platform==RuntimePlatform.Android)
        {
        url="jar:file://" + Application.dataPath + "!/assets/"+ fileName;
        Debug.Log(Application.platform+"\n"+url);
        var www2 : WWW = new WWW(url);
        Debug.Log("Reading URL");
        
        yield www2;
        jsonString=www2.text;
    
        }
        
        var N = JSONNode.Parse(jsonString);
        var DP = "cluster3d" ;
        var Stage = "RecoStage1" ;
    
        var algoName : String =  "recob::SpacePoints_cluster3d__RecoStage1" ;
    
    //    P("The event number is: ");
    //    P(N["record"]["header"]["event"].ToString(""));
    //    P("The first wire is: ");
    //    P(N["record"]["spacepoints"][algoName][0]["xyz"][0].ToString("")) ;
    
    
        var spacePointsArray = new Array ();
    
        for(var key : int = 0; key < N["record"]["spacepoints"][algoName].Count; key+=10){
    
    	 var clone : GameObject;
    	 clone = Instantiate(dotss , transform.position, transform.rotation);
         clone.transform.position = transform.position + Vector3(0.1*N["record"]["spacepoints"][algoName][key]["xyz"][0].AsFloat,
        	       0.1*N["record"]["spacepoints"][algoName][key]["xyz"][1].AsFloat,
        	       -0.1*N["record"]["spacepoints"][algoName][key]["xyz"][2].AsFloat);
        clone.transform.localScale = Vector3(0.05,0.05,0.05);
    	spacePointsArray.Push(clone);	
        }

//    P("URL: ");
//    P(_url2);

//    }
}

function Start()
{
	//fileName = PlayerPrefs.GetString("File To Load");
	//Resources.Load("complicated_event.json"); //AMCLEAN added
    
//	Test();
//	Debug.Log("Test results:\n" + m_InGameLog);
}

function OnGUI()
{
	if (GUI.Button (Rect (10, 20, 50, 30), "Proton")) 
	{
	    _particle = "_bnblike_proton"; 
	    _event    = "1831337_" ;
	    _i 	      = 0;
	}
	if (GUI.Button (Rect (60, 20, 50, 30), "Pi0")) 
	{
	    _particle = "_bnblike_pi0"; 
	    _event    = "1691318_" ;
	    _i 	      = 0;
	}
	if (GUI.Button (Rect (110, 20, 50, 30), "Muon")) 
	{
	    _particle = "_bnblike_muminus"; 
	    _event    = "1695054_" ;
	    _i 	      = 0;
	}
	if (GUI.Button (Rect (160, 20, 60, 30), "Gamma")) 
	{
	    _particle = "_bnblike_gamma"; 
	    _event    = "1831485_" ;
	    _i 	      = 0;
	}
	if (GUI.Button (Rect (220, 20, 60, 30), "Electron")) 
	{
	    _particle = "_bnblike_eminus"; 
	    _event    = "1691317_" ;
	    _i 	      = 0;
	}

	

	    _url = "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=0&filename=%252Fpnfs%252Fuboone%252Fscratch%252Fuboonepro%252Fmcc6.0%252Fv04_06_01%252Freco1%252Fprod"+_particle+"_uboone%252F"+_event;//+"%252Fprod_*&options=_NoPreSpill_NoPostSpill__NORAW__NOCAL_";


	m_Position = GUILayout.BeginScrollView(m_Position);
	GUILayout.Label(m_InGameLog);
	GUILayout.EndScrollView();
}


function Update () {
    if(Input.GetMouseButtonDown(0))
    { 
      buttonAppear = true; 
      Test(); 
    }//If you wanna enable once as soon as you first click 

    if(Input.GetKeyDown("up"))
    { 
//	Application.LoadLevel(0);
//	P("particle and event: "+_particle+", "+ _event+", "+_i);
	_i++;
	Test();
    }

    //// Put this in your update function
    //if (Input.GetKeyDown(KeyCode.N)) {
	//private var fileName = "serve_event.cgi";
	//var N = JSON.Parse("the_JSON_string");
	//var Event = N["record"]["header"]["event"].AsFloat;
    //}

}

