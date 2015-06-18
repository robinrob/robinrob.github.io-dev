(function ($) {
    $.fn.liveInput = function (options) {
        var defaults = {
            text: "<Text>",
            tabindex: -1,
            audioDir: "sounds",
            cursorFadeDuration: 500,
            initialDelay: 150,
            writeDelay: 150,
            editable: true,
            callback: function() {}
        }
        var params = $.extend({}, defaults, options)

        // Common variables
        var keySounds = [
            "keypress1.mp3",
            "keypress2.mp3",
            "keypress3.mp3"
        ]

        // Common functions
        function keySound() {
            return params.audioDir + "/" + keySounds[Math.round(Math.random() * (keySounds.length - 1))]
        }

        function keyPress() {
            var audio = document.createElement("audio");
            audio.src = keySound()
            audio.addEventListener("ended", function () {
                $(this).remove()
            }, false);
            audio.play();
        }

        function writeChar(char, $cursorObj) {
            var $char = $("<span />", {
                html: char,
                class: "char"
            });
            $($char).insertBefore($cursorObj)
            keyPress()
        }

        function writeText(text, $cursorObj, callback) {
            var char = text.substr(0, 1)
            text = text.slice(1)
            writeChar(char, $cursorObj)
            if (text.length == 0) {
                callback()
            }
            else if (text.length > 0) {
                setTimeout(function() {
                    writeText(text, $cursorObj, callback)
                }, params.writeDelay + Math.random() * params.writeDelay)
            }
        }

        function isValidChar(char) {
            var regex = /[-,.;:@& a-zA-Z0-9]/
            return regex.test(char)
        }

        function isPossibleKeyCode(keyCode) {
            return event.keyCode === 8 || isValidChar(String.fromCharCode(keyCode))
        }

        return this.each(function () {
            var $this = $(this)
            params.text = options.text || $this.attr('text') || defaults.text

            $this.attr("tabindex", params.tabindex)

            var $cursor = $("<span />", {
                text: "_",
                class: "cursor"
            });
            $this.append($cursor)

            play()

            $this.off()
            $this.on("focusin", function() {
                keyPress()
                showCursor(function() {setTimeout(toggleCursor, params.cursorFadeDuration)})
            })

            $this.on("focusout", function() {
                $cursor.stop(true)
                hideCursor()
            })

            $this.on("keydown", function (event) {
                if ($this.is(":focus") && event.keyCode === 8) { // backspace
                    event.type = "keyInput"
                    $(this).trigger(event)
                    event.preventDefault()
                }
            })

            $this.on("keypress", function (event) {
                if ($this.is(":focus")) {
                    event.type = "keyInput"
                    $(this).trigger(event)
                    event.preventDefault()
                }
            });

            $this.on("keyup", function (event) {
                if ($this.is(":focus") && event.keyCode == 8) {
                    keyPress()
                }
            })

            $this.on("keyInput", function (event) {
                var char = String.fromCharCode(event.keyCode)

                if (event.keyCode === 8) { //backspace
                    $this.children(".cursor").siblings().last().remove()
                }
                else if (isValidChar(char)) {
                    if (char == ' ') {
                        char = '&nbsp'
                    }
                    writeChar(char, $cursor)
                    keyPress()
                }
            });

            // Instance functions
            function play() {
                setTimeout(function () {
                    $cursor.siblings().remove()
                    writeText(params.text, $cursor, function() {
                        fadeOutCursor()
                        params.callback()
                    })
                }, params.initialDelay)
            }

            function toggleCursor() {
                var opacity = $cursor.css("opacity")
                var callback
                if (opacity == 0) {
                    fadeInCursor(params.cursorFadeDuration, toggleCursor)
                }
                else {
                    fadeOutCursor(params.cursorFadeDuration, toggleCursor)
                }
            }

            function fadeInCursor(duration, callback) {
                fadeCursor(1, duration, callback)
            }

            function fadeOutCursor(duration, callback) {
                fadeCursor(0, duration, callback)
            }

            function fadeCursor(opacity, duration, callback) {
                $cursor.animate(
                    {
                        opacity: opacity
                    },
                    {
                        duration: duration,
                        complete: callback
                    }
                )
            }

            function hideCursor(callback) {
                fadeOutCursor(0, callback)
            }

            function showCursor(callback) {
                fadeInCursor(0, callback)
            }
        })
    }
})(jQuery)