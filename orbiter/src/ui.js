rss.ui = {}

rss.ui.linewidth = 2

rss.ui.button = function(sprites) {
    var btn = new CompositeSprite(["#button_outer.png", sprites[0], sprites[1]])
    btn.setColor(rss.colors.white)
    btn.setChildColor(0, rss.colors.black)
    btn.setChildColor(1, rss.colors.white)
    return btn
}

rss.ui.buttons = function(sprites) {
    var buttons = {
        normal: rss.ui.button(sprites[0]),
        selected: rss.ui.button(sprites[1])
    }

    return buttons
}

rss.ui.restartButton = function() {
    return rss.ui.buttons(
        [
            ["button_n_inner.png", "restart_n_text.png"],
            ["button_s_inner.png", "restart_s_text.png"]
        ]
    )
}

rss.ui.startButton = function() {
    return rss.ui.buttons(
        [
            ["button_n_inner.png", "start_n_text.png"],
            ["button_s_inner.png", "start_s_text.png"]
        ]
    )
}