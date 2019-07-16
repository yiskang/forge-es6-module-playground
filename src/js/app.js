/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
//
// es6-module-playground
// by Eason Kang - Autodesk Developer Network (ADN)
//
/////////////////////////////////////////////////////////////////////

import $ from 'jquery';
import {
  launchViewer
} from './Utils';
import SelectionMonitorExt from './SelectionMonitorExt';

$(document).ready(() => {
  const viewerDiv = document.getElementById( 'viewer' );

  const urn = 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bGt3ZWo3eHBiZ3A2M3g0aGwzMzV5Nm0yNm9ha2dnb2YyMDE3MDUyOHQwMjQ3MzIzODZ6L3JhY19iYXNpY19zYW1wbGVfcHJvamVjdC5ydnQ';
  const token = 'YOUR_TOKEN';
  launchViewer( viewerDiv, urn, token )
    .then( ( { model, viewer } ) => {
      viewer.loadExtension( 'Autodesk.ADN.Extension.Monitor.Selection' );
    });
});