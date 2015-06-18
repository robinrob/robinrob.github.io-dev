$(function () {
    var $title = $("h1.live-input")
    var $subtitle = $(".subheading.live-input")

    $(".bstooltip").each(function(index, element) {
        var $el = $(element)
        $el.attr({
            "data-toggle": "tooltip",
            //"data-html": true,
            //title: "<div class=\".tooltip\"><div class=\".tooltip-inner .header-tooltip-box\">Click me to edit</div></div>",

            //type: "button",
            animation: true
        })
        $el.tooltip()

        $el.on("click", function(event) {
            $el.siblings(".tooltip").hide()
        })
    })

    function playTitles() {
        $title.liveInput({
            writeDelay: 120,
            callback: function() {
                $subtitle.liveInput({
                    initialDelay: 500,
                    writeDelay: 110,
                })
            }
        })
    }

    playTitles()

    var $photo = $(".photo")
    $photo.on("click", function() {
        // Although this happens in the query qode - it only
        // happens when the plugin runs for each element.
        // We want all elements cleared before start.
        $title.children(".char").remove()
        $subtitle.children(".char").remove()
        var highestTimeoutId = setTimeout(";");
        for (var i = 0 ; i < highestTimeoutId ; i++) {
            clearTimeout(i);
        }

        playTitles()
    })

    //$el = $(".photo")
    //$el.attr({
    //    "data-placement": "left",
    //    "data-toggle": "tooltip",
    //    title: "Contact me",
    //    animation: true
    //})
    //$el.tooltip()
})
