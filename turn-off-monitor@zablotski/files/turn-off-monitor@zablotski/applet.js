const Applet = imports.ui.applet;
const Util = imports.misc.util;
const GLib = imports.gi.GLib;
const PopupMenu = imports.ui.popupMenu;
const Mainloop = imports.mainloop;

const APPLET_PATH = GLib.get_home_dir() + "/.local/share/cinnamon/applets/turn-off-monitor@zablotski";
const ICON_PATH = APPLET_PATH + "/icon.png";

const setTimeout = function (timeout, callback) {
    Mainloop.timeout_add(timeout, callback);
};

function MyApplet(orientation, panel_height, instance_id) {
    this._init(orientation, panel_height, instance_id);
}

MyApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,

    _init: function(orientation, panel_height, instance_id) {
        Applet.IconApplet.prototype._init.call(this, orientation, panel_height, instance_id);

        this.set_applet_icon_path(ICON_PATH);
        this.set_applet_tooltip(_("Turn off monitor"));

        this.menuManager = new PopupMenu.PopupMenuManager(this);
        this.menu = new Applet.AppletPopupMenu(this, orientation);
        this.menuManager.addMenu(this.menu);


        this.menu.addAction(_("Turn off after 5 sec"), setTimeout(5000, turnOffMonitor));


        this.menu.addAction(_("Open Web Dir"), function(event) {
            Util.spawn("gedit ~/txt".split(' '));

        });
    },

    on_applet_clicked: function() {
        this.menu.toggle();
        setTimeout(1000, turnOffMonitor);
        // turnOffMonitor();
    }


};

function main(metadata, orientation, panel_height, instance_id) {
    return new MyApplet(orientation, panel_height, instance_id);
}

function turnOffMonitor() {
    Util.spawn('xset dpms force off'.split(' '));
}