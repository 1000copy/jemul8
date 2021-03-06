/**
 * jemul8 - JavaScript x86 Emulator
 * http://jemul8.com/
 *
 * Copyright 2013 jemul8.com (http://github.com/asmblah/jemul8)
 * Released under the MIT license
 * http://jemul8.com/MIT-LICENSE.txt
 */

/*global define */
define([
    "js/util",
    "js/Emulator",
    "js/MemoryAllocator",
    "js/Factory/System"
], function (
    util,
    Emulator,
    MemoryAllocator,
    SystemFactory
) {
    "use strict";

    describe("ROMBIOS POST acceptance tests", function () {
        describe("when the boot uses the default setup, handled by emulator.init()", function () {
            var emulator,
                system;

            beforeEach(function (done) {
                system = new SystemFactory(new MemoryAllocator()).create({
                    "cmos": {
                        "bios": "docs/bochs-20100605/bios/BIOS-bochs-legacy"
                    },
                    "vga": {
                        "bios": "docs/bochs-20100605/bios/VGABIOS-lgpl-latest"
                    }
                });
                emulator = new Emulator(system);

                emulator.init().done(function () {
                    done();
                });
            });

            it("should complete the POST by executing INT 0x19", function (done) {
                // Allow extra time, as we are running a full ROMBIOS POST
                describe.setSlowTimeout(20000);
                this.timeout(20000);

                // Run the emulator, wait for INT 0x19 "Boot Load Service Entry Point"
                system.on("interrupt", [0x19], function () {
                    emulator.pause();
                    describe.restoreSlowTimeout();
                    done();
                }).run();
            });
        });
    });
});
