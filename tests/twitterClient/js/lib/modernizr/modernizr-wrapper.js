/**
 * Modernizr wrapper
 */
define(["lib/modernizr/modernizr"], function() {
    
    /**
     * ADD TEST for defineProperty
     * based on https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
     * 
     * @author Esteban S. Abait <esteban.abait@globant.com>
     */
    Modernizr.addTest('defineproperty', function () {
        // ES5 15.2.3.6
        // http://es5.github.com/#x15.2.3.6

        // Patch for WebKit and IE8 standard mode
        // Designed by hax <hax.github.com>
        // related issue: https://github.com/kriskowal/es5-shim/issues#issue/5
        // IE8 Reference:
        //      http://msdn.microsoft.com/en-us/library/dd282900.aspx
        //      http://msdn.microsoft.com/en-us/library/dd229916.aspx
        // WebKit Bugs:
        //      https://bugs.webkit.org/show_bug.cgi?id=36423

        function doesDefinePropertyWork(object) {
            try {
                Object.defineProperty(object, "sentinel", {});
                return "sentinel" in object;
            } catch (exception) {
                // returns falsy
            };
        };

        // check whether defineProperty works if it's given. Otherwise,
        // shim partially.
        if (Object.defineProperty) {
            var definePropertyWorksOnObject = doesDefinePropertyWork({});
            var definePropertyWorksOnDom = typeof document == "undefined" ||
            doesDefinePropertyWork(document.createElement("div"));
            if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
                var definePropertyFallback = Object.defineProperty;
            };
        };
        return Object.defineProperty && !definePropertyFallback;
    });
    
    return window.Modernizr;
});