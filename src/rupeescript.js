define( [
  "./core",
  "./var/documentElement",
  "./ajax"
], function( jQuery, documentElement ) {
"use strict";

new window.MutationObserver( function( mutations ) {
  mutations.forEach( function( mutation ) {
    mutation.addedNodes.forEach( function( node ) {
      if ( node instanceof window.HTMLScriptElement && node.type === "text/rupeescript" ) {
        if ( node.src ) {
          jQuery.get( node.src, evalRupeeScript, "text" );
        } else {
          evalRupeeScript( node.innerText );
        }
      }
    } );
  } );
} ).observe( documentElement, {
  childList: true,
  subtree: true
} );

function evalRupeeScript( text ) {
  try {
    eval( text.split( /₹(?=[\(\.])/ ).join( "window['₹']" ) );
  } catch ( e ) {
    var err = new Error( e.message );
    err.stack = "";
    throw err;
  }
}

} );
