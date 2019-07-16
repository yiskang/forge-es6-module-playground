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

import Autodesk from 'forge-viewer';

export const launchViewer = ( container, urn, accessToken ) => {
  return new Promise( ( resolve, reject ) => {
    try {
      function onDocumentLoadSuccess( doc ) {
        const rootItem = doc.getRoot();
        const filter = { type: 'geometry', role: '3d' };
        const viewables = rootItem.search( filter );

        if( viewables.length === 0 ) {
          console.error( 'Document contains no viewables.' );
          return;
        }

        const viewer = new Autodesk.Viewing.Private.GuiViewer3D( container );

        const initialViewable = viewables[0];
        viewer.startWithDocumentNode( doc, initialViewable )
          .then( ( model ) => resolve( { model, viewer } ) )
          .catch( ( error ) => reject( error ) );
      }

      function onDocumentLoadFailure( viewerErrorCode ) {
        console.error( `onDocumentLoadFailure() - errorCode:${viewerErrorCode}` );
      }

      const options = {
        env: 'AutodeskProduction',
        accessToken
      };
    
      const documentId = 'urn:' + urn;
      Autodesk.Viewing.Initializer( options, () => {
        Autodesk.Viewing.Document.load( documentId, onDocumentLoadSuccess, onDocumentLoadFailure );
      });
    } catch( ex ) {
      reject( ex );
    }
  });
};