var Widget2 = {
    init: function(width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null
    },
    insert: function($where) {
        if (this.$elem) {
            this.$elem.css({
                width: this.width + "px",
                height: this.height + "px"
            }).appendTo($where)
        }
    }
}

var Button2 = Object.create(Widget2);

Button2.setup = function(width, height, label) {
    this.init(width, height);
    this.label = label || "Default";

    this.$elem = $("<button>").text(this.label);
}

Button2.build = function($where) {
    this.insert($where);
    this.$elem.click(this.onClick.bind(this));
}

Button2.onClick = function(evt) {
    console.log("Button '" + this.label + "' clicked!");
}

$(document).ready(function() {
    let $body = $(document.body);

    let btn1 = Object.create(Button2);
    btn1.setup(125, 30, "Hello");

    let btn2 = Object.create(Button2);
    btn2.setup(150, 40, " World!");

    btn1.build($body);
    btn2.build($body);
})