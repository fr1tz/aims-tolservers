/* This file is released under CC0 */

var addAlert = function() {
  var html = "";
  html += '<form class="alert">'
  html += '<input name="remove" type="button" value="X">';
  html += ' Name: <input name="name" type="text" size="5" value="">';
  html += ' Type: <input name="type" type="text" size="5" value="">';
  html += ' Map: <input name="map" type="text" size="5" value="">';
  html += ' Info: <input name="info" type="text" size="5" value="">';  
  html += ' Players: <input name="players" type="text" size="1" value="1">';
  html += ' <input name="muted" type="checkbox" value="muted">Mute';
  html += ' <img class="icon_running" src="images/running.gif" width="16" height="16">';
  html += ' <img class="icon_ringing" src="images/ringing.gif" width="16" height="16">';
  html += '</form>';
  $("#alerts").append(html);
  $("#alerts").children().last().children(".icon_running").hide();
  $("#alerts").children().last().children(".icon_ringing").hide();    
  $("#alerts").children().last().children("input:button[name=remove]").click( function(){
    $(this).parent().remove();
  });   
  updateAlerts();
};

var updateAlerts = function() {
  var playAlert = false;
  $( ".alert" ).each(function(index) {
    var name = $(this).children("input:text[name=name]").val();  
    var type = $(this).children("input:text[name=type]").val();
    var map = $(this).children("input:text[name=map]").val();
    var info = $(this).children("input:text[name=info]").val();    
    var players = $(this).children("input:text[name=players]").val();
    var muted = $(this).children("input:checkbox[name=muted]").is(':checked');
    for(server_ip in servers) {
      if(!server_ip) { continue; };
      var n = 0;
      if(name) n++;
      if(type) n++;
      if(map) n++;
      if(info) n++;
      if(players) n++;
      if(name && servers[server_ip]["name"].indexOf(name) != -1) n--;    
      if(type && servers[server_ip]["type"].indexOf(type) != -1) n--;    
      if(map && servers[server_ip]["map"].indexOf(map) != -1) n--;    
      if(info && servers[server_ip]["info"].indexOf(info) != -1) n--;                
      if(players && servers[server_ip]["players"].split(" ")[0] >= players) n--;
      if(n == 0) {
        if(!muted)
          playAlert = true;
        $(this).children(".icon_running").hide();
        $(this).children(".icon_ringing").show();
      }
      else
      {
        $(this).children(".icon_running").show();
        $(this).children(".icon_ringing").hide();      
      }
    };
    $(this).children("span.status").text(status);
  });
  if(playAlert)
    playAlertSound();
};

var playAlertSound = function() {
  var sound = $("#alertsound").val();
  var audio = document.getElementById("sound_"+sound);
  if(audio)
  {
    audio.pause();
    audio.currentTime = 0;
    audio.play();  
  }
  else
    log("Unable to play sound!");	  
}
