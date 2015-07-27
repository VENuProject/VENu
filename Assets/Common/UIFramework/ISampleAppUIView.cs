/*============================================================================== 
 * Copyright (c) 2012-2014 Qualcomm Connected Experiences, Inc. All Rights Reserved. 
 * ==============================================================================*/
using UnityEngine;
using System.Collections;

/// <summary>
/// All Views that wants to draw UI elements, must implement this Interface
/// </summary>
public interface ISampleAppUIView {
    
    void LoadView();
    void UnLoadView();
    void UpdateUI(bool tf);
}
