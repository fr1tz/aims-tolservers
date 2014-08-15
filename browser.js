/*
    Copyright (C) 2014  SylvieLorxu <sylvie@contracode.nl>

    Released under the Creative Commons Zero 1.0 license
*/

var servers = []

var getServerList = function() {
    // Download the server list and save the data in a global array
    // Format: servers[IP][datapoint]
    // Datapoint can be any of the following:
    // name, type, map, ping, players, info
    //
    // This function also updates the table displayed on the page
    $.get("http://aims.wasted.ch/var/tolservers", function(serverlist) {
        serverline = serverlist.split('\n');
        $.each(serverline, function(){
            serverline = this.substr(6);
            serverdata = serverline.split(" ");
            IP = serverdata[0];
            type = serverdata[1];
            data = serverdata.slice(2).join(" ");
            if (!servers[IP]) { servers[IP] = []; };
            servers[IP][type] = data;
        });
        var htmltoadd = "";
        for (server_ip in servers) {
            if (!server_ip) { continue; };
            htmltoadd += "<tr>";
            datatypes = ["name", "type", "map", "players", "info"]
            for (datapart in datatypes) {
                datapart = datatypes[datapart];
                htmltoadd += "<td>" + servers[server_ip][datapart] + "</td>";
            };
            htmltoadd += "</tr>";
        };
        $("#serverlist").html(htmltoadd);
        updateAlerts();
    }, "text");
};
