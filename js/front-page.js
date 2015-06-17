$(function () {
    $(".live-input").liveInput({
            text: "Robin Smith",
            audioDir: "sounds"
    })

    var $el = $(".live-input")
    $el.attr({
        "data-placement": "top",
        "data-toggle": "tooltip",
        title: "Click me to edit!",
        //"data-html": true,
        //title: "<div class=\".tooltip\"><div class=\".tooltip-inner .header-tooltip-box\">Click me to edit</div></div>",
        //type: "button",
        animation: true
    })
    $el.tooltip()

    $el = $(".photo")
    $el.attr({
        "data-placement": "left",
        "data-toggle": "tooltip",
        title: "Contact me",
        //"data-html": true,
        //title: "<div class=\".tooltip\"><div class=\".tooltip-inner .header-tooltip-box\">Click me to edit</div></div>",
        //type: "button",
        animation: true
    })
    $el.tooltip()
})
