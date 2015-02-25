using UnityEngine;
using System.Collections;

public class Menu : MonoBehaviour 
{
	private Animator _animator;
	private CanvasGroup _canvasGroup;

	public bool IsOpen {
				get { return _animator.GetBool ("IsOpen");}
				set { _animator.SetBool ("IsOpen", value);}
		}

	public void Awake()
	{
				_animator = GetComponent<Animator> ();
				_canvasGroup = GetComponent<CanvasGroup> ();

		}

	public void Update ()
	{
				if (!_animator.GetCurrentAnimatorStateInfo (0).IsName ("Open")) {
						_canvasGroup.blocksRaycasts = _canvasGroup.interactable = false;
				} else {
						_canvasGroup.blocksRaycasts = _canvasGroup.interactable = true;
				}
		}
}
