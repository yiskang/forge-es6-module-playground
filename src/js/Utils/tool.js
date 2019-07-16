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

/**
 * Check input is a RFC4122 v4 GUID.
 * @param {string} guid Check target.
 * @return {bool} Return true if input is a GUID.
 */
export const isGUID = ( guid ) => {
  const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return pattern.test( guid );
};

/**
 * Check input is a Autodesk Revit Unique Element GUID.
 * @param {string} guid Check target.
 * @return {bool} Return true if input is a GUID.
 */
export const isRevitUniqueId = ( guid ) => {
  const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}-[0-9a-f]{8}$/i;
  return pattern.test( guid );
};