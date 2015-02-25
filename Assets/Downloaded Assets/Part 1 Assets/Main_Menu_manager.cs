using UnityEngine;
using System.Collections;

public class Main_Menu_manager : MonoBehaviour 
{
	public Main_Menu CurrentMenu;
	public void Start()
	{
		ShowMenu (CurrentMenu);
	}
	
	public void ShowMenu(Main_Menu menu)
	{
		if (CurrentMenu != null) 
			CurrentMenu.IsOpen = false;
		
		CurrentMenu = menu;
		CurrentMenu.IsOpen = true;
		
	}
}
