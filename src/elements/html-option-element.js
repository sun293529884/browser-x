'use strict';

var CSSStyleDeclaration = require('cssstyle').CSSStyleDeclaration;
var Element = require('../element');

function HTMLOptionElement(document, name, namespaceURI) {
    Element.call(this, document, name, namespaceURI);
}

HTMLOptionElement.prototype = Object.create(Element.prototype, {
    lang: {
        get: function() {
            return this.getAttribute('lang');
        }
    },
    style: {
        get: function() {
            if (this._style) {
                return this._style;
            } else {
                var style = this._style = new CSSStyleDeclaration();
                var cssText = this.getAttribute('style');

                if (cssText) {
                    style.cssText = cssText;
                }

                return this._style;
            }
        }
    },
    index: {
        get: function() {
            var select = closest('SELECT');
            if (select) {
                return Array.prototype.indexOf.call(select.options, this);
            } else {
                return 0;
            }
        }
    },
    value: {
        get: function() {
            return this.hasAttribute('value') ? this.getAttribute('value') : this.innerHTML;
        }
    },
    selected: {
        // TODO 如果兄弟 option 标签也有 selected 属性，
        // 且 select 无 multiple 属性，则需要处理冲突
        get: function() {
            return this.hasAttribute('selected');
        }
    },
    defaultSelected: {
        get: function() {
            return this.selected;
        }
    },
    disabled: {
        get: function() {
            return this.hasAttribute('disabled');
        }
    },
    form: {
        get: function() {
            return closest('FORM');
        }
    }
});

HTMLOptionElement.prototype.constructor = HTMLOptionElement;


function closest(e, nodeName) {
    while (e) {
        if (e.nodeName === nodeName) {
            return e;
        }
        e = e.parentNode;
    }

    return null;
}


module.exports = HTMLOptionElement;