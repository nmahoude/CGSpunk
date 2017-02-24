'use strict';

var g_optionsResponseFunc;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getBatchRunOptions') {
        g_optionsResponseFunc = sendResponse;
        showBatchRunOptionsWindow(request.numPlayerSlots, request.inArena);
        return true;
    } else if (request.action === 'sendBatchOptionSelections') {
        g_optionsResponseFunc(request.options);
    } else if (request.action === 'showResultsWindow') {
        showResultsWindow(request.instanceNum, sender.tab.id);
    } else if (request.action === 'showMatchStderr') {
        showStderrWindow(request.stderr);
    } else if (request.action === 'showMatchCrashInfo') {
        showCrashInfoWindow(request.crashInfo);
    } else if (request.action === 'showBatchData') {
        showBatchDataWindow(request.data);
    } else if (request.action === 'getLastStderr') {
        sendResponse(g_lastStderr);
    } else if (request.action === 'getLastCrashInfo') {
        sendResponse(g_lastCrashInfo);
    } else if (request.action === 'getLastBatchData') {
        sendResponse(g_lastBatchData);
    }
});

function showBatchRunOptionsWindow(numPlayerSlots, inArena) {
    chrome.windows.create({
        url: 'dialogs/batchRunOptions.html?numPlayerSlots=' + numPlayerSlots +
             '&inArena=' + inArena,
        type: 'popup',
        width: 600,
        height: 700
    });
}

function showResultsWindow(instanceNum, tabId) {
    chrome.windows.create({
        url: `dialogs/batchRunResults.html?instanceNum=${instanceNum}&tabId=${tabId}`,
        type: 'popup',
        width: 700,
        height: 600
    });
}

var g_lastStderr;

function showStderrWindow(stderr) {
    g_lastStderr = stderr;
    chrome.windows.create({
        url: 'dialogs/matchStderr.html',
        type: 'popup',
        width: 600,
        height: 600
    });
}

var g_lastCrashInfo;

function showCrashInfoWindow(info) {
    g_lastCrashInfo = info;
    chrome.windows.create({
        url: 'dialogs/matchCrashInfo.html',
        type: 'popup',
        width: 600,
        height: 600
    });
}

var g_lastBatchData;

function showBatchDataWindow(data) {
    g_lastBatchData = data;
    chrome.windows.create({
        url: 'dialogs/batchData.html',
        type: 'popup',
        width: 700,
        height: 700
    });
}
