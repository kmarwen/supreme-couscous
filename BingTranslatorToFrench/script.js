// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


// The onClicked callback function.
function onClickHandler(selection, tab) {
  
	console.log(selection.menuItemId + " was clicked !");
	
    console.log("tab: " + JSON.stringify(tab));  
    console.log(JSON.stringify(selection));
	
	
	
	// Setup the callback function to show the translation
	window.translatecallback = function(response) {alert(response); };
	
	var appId = "66A8CA727C20371BED579D93DC7E476479EAC832";  //--- Replace your own Bing API code here. Register at http://go.microsoft.com/?linkid=9782667
    var toLanguage = "fr";
	var from = "en", to = "fr";
    
    // Encode the text and build the AJAX URL
    var textToTranslate = selection.selectionText;
    var translateUrl = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate" +
                "?appId=" + encodeURIComponent(appId) +
                //"&from=" + encodeURIComponent(from) +
                "&to=" + encodeURIComponent(to) +
                "&text=" + encodeURIComponent(textToTranslate); // + "&oncomplete=callbackTraduction";
	console.log(translateUrl);


	
	var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() { 
        if (xhr.readyState == 4 && xhr.status == 200)
            callback(xhr.responseText);
		else 
		{
			callback(err);
		}
    }
    xhr.open("GET", translateUrl, true); // true for asynchronous 
    xhr.send(null);
	
	var callback = function (data)
	{
		alert (data);
	}
	
}


//chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
    
    var context = "selection";
    var title = "BingTranslatorConextMenuSelection" ;
    var id = chrome.contextMenus.create({"title": "Traduire avec Bing", "contexts":[context], "id": title+"ID", onclick: onClickHandler});
    console.log("'" + context + "' item:" + id + " bien créeeeee  !");
	
	//window.getSelection().toString()

	
});