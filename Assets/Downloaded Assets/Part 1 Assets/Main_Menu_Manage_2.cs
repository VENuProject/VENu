using UnityEngine;
using System.Collections;


	public class Main_Menu_manager_2 : MonoBehaviour 
	{
		public Main_Menu_2 CurrentMenu;
		public void Start()
		{
			ShowMenu (CurrentMenu);
		}
		
		public void ShowMenu(Main_Menu_2 menu)
		{
			if (CurrentMenu != null) 
				CurrentMenu.IsOpen = false;
			
			CurrentMenu = menu;
			CurrentMenu.IsOpen = true;
			
		}
	}
