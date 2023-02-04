class Widget1 {
    constructor(width, height) {
        this.width = width || 50;
        this.height = height || 50;
        this.$elem = null;
    }
    render($where) {
        if (this.$elem) {
            this.$elem.css({
                width: this.width + "px",
                height: this.height + "px"
            }).appendTo($where);
        }
    }
}

class Button1 extends Widget1 {
    constructor(width, height, label) {
        super(width, height);
        this.label = label || "Default";
        this.$elem = $("<button>").text(this.label);
    }

    render($where) {
        super.render($where);
        this.$elem.click(this.onClick.bind(this));
    }

    onClick(evt) {
        console.log("Button '" + this.label + "' clicked!");
    }
}

$(document).ready(function() {
    let $body = $(document.body);
    let btn1 = new Button1(130, 40, "1Hello");
    let btn2 = new Button1(160, 50, "2World!");
    btn1.render($body);
    btn2.render($body);
});