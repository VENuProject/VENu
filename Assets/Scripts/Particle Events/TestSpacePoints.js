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
static var _url2     : String;

var buttonAppear = false; 
static var _reload	= true ; 
static var _clicked   	= false;
static var _next	= false;
static var _previous 	= false;
static var _clear	= false;

var fileName : String;

//Event counter
static var _i = 0;
static var _j = 0;

var _urlArray = new Array() ;

static var elecButton = false; 
static var gammaButton = false; 

public var MenuItemStyle : GUIStyle  ;


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

        var www : WWW = new WWW(_url2) ; 
        //// Wait for the download to complete
        yield www;
        var jsonString = www.text;
//       P("Saving JSON string... ") ;

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
        var algoName : String =  "recob::SpacePoints_cluster3d__RecoStage1" ;
    
//        P("The event number is: ");
//        P(N["record"]["header"]["event"].ToString(""));
//        P("The first wire is: ");
//        P(N["record"]["spacepoints"][algoName][0]["xyz"][0].ToString("")) ;
    
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

}

function Update () {

    if(Input.GetMouseButtonDown(0) && _clicked )
    { 
      buttonAppear = true; 
      Test(); 
    }//If you wanna enable once as soon as you first click 


//    if(Input.GetKey("up") && _clicked )
    if ( _clear )
    { 
	P("up");
        Application.LoadLevel(Application.loadedLevel);
	_clear = false ;
    }

    if( _next ){ //Input.GetKeyDown("down") ){
	P("down");
	_i++;
	Test();
	_next = false ;
    }
    else if (_previous ){
	_i--;
	Test() ;
	_previous = false ;
	}
}

function Start()
{
//	Test();
}

function OnGUI()
{

//     MenuItemStyle = new GUIStyle(GUI.skin.button);
//     MenuItemStyle.normal.textColor = Color.white;
//     MenuItemStyle.hover.textColor  = Color.cyan;

//    GUIStyle myStyle = new GUIStyle(GUI.skin.brown) ;
//    myStyle.color = Color.yellow;

    if (GUI.Button (Rect (10, 20, 50, 30), "Proton")) 
    {
        _particle = "_bnblike_proton"; 
        _event    = "1831337_" ;
        _i 	      = 0;
	GUI.color = Color.gray;
    }
    if (GUI.Button (Rect (60, 20, 50, 30), "Pi0")) 
    {
        _particle = "_bnblike_pi0"; 
        _event    = "1691318_" ;
        _i 	      = 0;
	GUI.color = Color.gray;
    }
    if (GUI.Button (Rect (110, 20, 50, 30), "Muon")) 
    {
        _particle = "_bnblike_muminus"; 
        _event    = "1695054_" ;
        _i 	      = 0;
	GUI.color = Color.gray;
    }
    if (GUI.Button (Rect (160, 20, 60, 30), "Gamma")) 
    {
        _particle = "_bnblike_gamma"; 
        _event    = "1831485_" ;
        _i 	      = 0;
	gammaButton = true; 
    }

    if (GUI.Button (Rect (220, 20, 60, 30), "Electron")) 
    {
        _particle = "_bnblike_eminus"; 
        _event    = "1691317_" ;
        _i 	      = 0;
	elecButton = true; 
//	GetComponent(Button).colors.normalColor = Color.green;
    }
    
    if (GUI.Button (Rect (80, 280, 40, 30), "Next")){ _next = true; }

    if (GUI.Button (Rect (10, 280, 70, 30), "Previous")){ _previous = true; }

    if (GUI.Button (Rect (120, 280, 70, 30), "Clear")){ _clear = true; }

    if (_particle ){ _clicked = true ; }
    
    
        _url = "http://argo-microboone.fnal.gov/server/serve_event.cgi?entry=0&filename=%252Fpnfs%252Fuboone%252Fscratch%252Fuboonepro%252Fmcc6.0%252Fv04_06_01%252Freco1%252Fprod"+_particle+"_uboone%252F"+_event;//+"%252Fprod_*&options=_NoPreSpill_NoPostSpill__NORAW__NOCAL_";


	m_Position = GUILayout.BeginScrollView(m_Position);
	GUILayout.Label(m_InGameLog);
	GUILayout.EndScrollView();
}
