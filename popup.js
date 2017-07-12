// Copyright (c) 2016-2017 Azat Nizameev

function renderStatus(statusText) {
	document.getElementById('status').innerHTML += statusText + '<br />';
}

function getContentFromClipboard() {
	//pass
}

function clearTextArea() {
	document.getElementById('links').value = '';
}

function copyContentToClipboard(elementId) {
	var linksDiv = document.getElementById(elementId);
	var range = document.createRange();
	range.selectNode(linksDiv);
	window.getSelection().addRange(range);

	document.execCommand('copy');

	// uncomment the line if you need to clear selection
	// window.getSelection().removeRange(range);
}

document.addEventListener('DOMContentLoaded', function() {
/*
	// get the background page
	bg = chrome.extension.getBackgroundPage();
	bg.document.body.innerHTML= "";

	// add a DIV, contentEditable=true, to accept the paste action
	var helperdiv = bg.document.createElement("div");
	document.body.appendChild(helperdiv);
	helperdiv.contentEditable = true;

	// focus the helper div's content
	var range = document.createRange();
	range.selectNode(helperdiv);
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(range);
	helperdiv.focus();

	// trigger the paste action
	bg.document.execCommand("paste");

	// read the clipboard contents from the helperdiv
	var clipboardContents = helperdiv.innerHTML;
*/
/*
	// paste text from clipboard into textarea
	var textArea = document.getElementById('links');
	textArea.innerHTML = getContentFromClipboard();
*/
	document.getElementById('go-but').addEventListener('click', function() {
		strLinks = document.getElementById('links').value;
		arStr = strLinks.split('\n');

		for (var i = 0; i < arStr.length; i++) {
			arStr[i] = arStr[i].replace(/\!/g, '');
			chrome.tabs.create({url:arStr[i]});
		}
	});

	// copy all the text from block with tabs links
	document.getElementById('copy-but').addEventListener('click', function() {
		copyContentToClipboard('status');
	});

	// clear textarea
	document.getElementById('clear-but').addEventListener('click', function() {
		clearTextArea();
	});

	chrome.tabs.query({currentWindow: true}, function(tabs) {
		// A tab is a plain object that provides information about the tab.
		// See https://developer.chrome.com/extensions/tabs#type-Tab

		for (var i = 0; i < tabs.length; i++) {
            renderStatus(tabs[i].url);
        };
	});
});
