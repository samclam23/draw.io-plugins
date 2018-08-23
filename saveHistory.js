/**
* A draw.io plugin for version control, possibly via overwriting the onboard save function
*/
Draw.loadPlugin(function (ui) {
    /* Finding assigned keys:
    
      * Open javascript console
      * Draw.valueOf()
      * Traverse to: Object > loadPlugin > <function scope> 
                    > ui > keyHandler > controlShiftKeys
      * The number here is ASCII character code 
    */

    // Adds resources for actions
    mxResources.parse('mySaveOverwrite=Save Using Version Control');

    ui.actions.addAction('mySaveOverwrite', function () {
        var theGraph = ui.editor.graph;
        if (theGraph.isEnabled() && !theGraph.isCellLocked(theGraph.getDefaultParent())) {
            var pos = theGraph.getInsertPoint();
            var newElement = new mxCell("",
                new mxGeometry(pos.x, pos.y, 80, 80),
                "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;overflow=auto");

            newElement.vertex = !0;
            theGraph.setSelectionCell(theGraph.addCell(newElement))
        }
    }, null, null, "Ctrl+S");

    ui.keyHandler.bindAction(84, !0, "mySaveOverwrite", !0);

    // Adds menu
    ui.menubar.addMenu('My Menu', function (menu, parent) {
        ui.menus.addMenuItem(menu, 'mySaveOverwrite');
    });

    // Reorders menubar
    ui.menubar.container
        .insertBefore(ui.menubar.container.lastChild,
            ui.menubar.container.lastChild.previousSibling.previousSibling);
});
