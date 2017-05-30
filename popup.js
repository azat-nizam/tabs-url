// Copyright (c) 2016 Azat Nizameev

function renderStatus(statusText) {
	document.getElementById('status').innerHTML += statusText + '<br />';
}

function openField() {
	document.getElementById('status').innerHTML = '';
	document.getElementById('urls-block').style = 'display:block';
	document.getElementById('go-but').addEventListener('click', function() {
		strLinks = document.getElementById('links').value;
		arStr = strLinks.split('\n');
		
		for (var i = 0; i < arStr.length; i++) {
			chrome.tabs.create({url:arStr[i]});
		}
	});
}

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('open-but').addEventListener('click', openField);
	
	chrome.tabs.query({currentWindow: true}, function(tabs) {
		// A tab is a plain object that provides information about the tab.
		// See https://developer.chrome.com/extensions/tabs#type-Tab

		for (var i = 0; i < tabs.length; i++) {
            renderStatus(tabs[i].url);
        };
	});
});
