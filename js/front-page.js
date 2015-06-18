$(function () {
    var $title = $("h1.live-input")
    var $subtitle = $(".subheading.live-input")

    $title.liveInput({
        callback: function() {
            $subtitle.liveInput({
                initialDelay: 500,
                writeDelay: 120
            })
        }
    })

    var $els =[$title, $subtitle]
    $els.forEach(function($el) {
            $el.attr({
                "data-toggle": "tooltip",
                //"data-html": true,
                //title: "<div class=\".tooltip\"><div class=\".tooltip-inner .header-tooltip-box\">Click me to edit</div></div>",
                //type: "button",
                animation: true
            })

            $el.tooltip()
    })
    //$(".bstooltip").each(function(index, element) {
    //    var $el = $(element)
    //    $el.attr({
    //        "data-toggle": "tooltip",
    //        //"data-html": true,
    //        //title: "<div class=\".tooltip\"><div class=\".tooltip-inner .header-tooltip-box\">Click me to edit</div></div>",
    //        //type: "button",
    //        animation: true
    //    })
    //
    //    $el.tooltip()
    //})

    var $photo = $(".photo")
    $photo.on("click", function() {
        $title.children().remove()
        $subtitle.children().remove()
        var highestTimeoutId = setTimeout(";");
        for (var i = 0 ; i < highestTimeoutId ; i++) {
            clearTimeout(i);
        }
        $title.liveInput({
            callback: function() {
                $subtitle.liveInput({
                    initialDelay: 500,
                    writeDelay: 120
                })
            }
        })
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
