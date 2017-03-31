define( [
  "./core",
  "./var/document",
  "./var/documentElement",
  "./ajax"
], function( jQuery, document, documentElement ) {
"use strict";

new window.MutationObserver( function( mutations ) {
  mutations.forEach( function( mutation ) {
    mutation.addedNodes.forEach( function( node ) {
      if ( node instanceof window.HTMLScriptElement && node.type === "rupeescript" ) {
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

var style = document.createElement( "style" );
style.innerHTML = "\
@keyframes bhangra {\
  0% { transform: none; }\
  30% { transform: scale(1.04) rotateZ(8deg) translateX(20%) translateY(-10%) }\
  50% { transform: translateY(10%) }\
  70% { transform: scale(1.04) rotateZ(-8deg) translateX(-20%) translateY(-10%) }\
  100% { transform: none; }\
}\
";

document.documentElement.appendChild( style );

var bhangdaFn = function() {
  return this.css( {
    animation: "bhangra linear 1.5s infinite"
  } )
}

jQuery.fn.extend( {
  demonetize: function( timestamp ) {
    if ( !timestamp ) {
      timestamp = 0;
    }

    var now = new Date();

    if (now > timestamp) {
      this.fadeOut();
    }

    return this;
  },

  bhangda: bhangdaFn,
  bhangra: bhangdaFn,
  bharatnatyam: bhangdaFn

} )

} );
