function Widget(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
}

Widget.prototype.render = function($where) {
    if (this.$elem) {
        this.$elem.css({
            width: this.width + "px",
            height: this.height + "px"
        }).appendTo($where);
    }
}

function Button(width, height, label) {
    Widget.call(this, width, height);
    this.label = label || "Default";
    this.$elem = $("<button>").text(this.label);
}

Button.prototype = Object.create(Widget.prototype);

Button.prototype.render = function($where) {
    Widget.prototype.render.call(this, $where);
    this.$elem.click(this.onClick.bind(this));
}

Button.prototype.onClick = function(evt) {
    console.log("Button '" + this.label + "' clicked!");
}

$(document).ready(function() {
    var $body = $(document.body);
    var button1 = new Button(125, 30, "Hello");
    var button2 = new Button(150, 50, "World");
    button1.render($body);
    button2.render($body);
})