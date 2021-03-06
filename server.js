/**
 * jemul8 - JavaScript x86 Emulator
 * http://jemul8.com/
 *
 * Copyright 2013 jemul8.com (http://github.com/asmblah/jemul8)
 * Released under the MIT license
 * http://jemul8.com/MIT-LICENSE.txt
 */

/*global define */
define({
    "paths": {
        "js": "./js",
        "vendor": "./vendor"
    }
}, [
    "js/Server"
], function (
    Server
) {
    "use strict";

    return new Server();
});
