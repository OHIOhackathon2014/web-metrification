/*			     		 		 try {
    Components.classes['@mozilla.org/alerts-service;1'].
              getService(Components.interfaces.nsIAlertsService).
              showAlertNotification(null, "vrot", "shmok", false, '', null);
  } catch(e) {
    // prevents runtime error on platforms that don't implement nsIAlertsService
  }

*/



if ("undefined" == typeof(LipoEnglishEnglishDictionary)) 
 {  
   var LipoEnglishEnglishDictionary= { 
        
     open_local_window:function()
      {
    	
	   //The code of the Tokbox client-side
	   //begin snipet
	   var focusedWindow = document.commandDispatcher.focusedWindow;

       //we put the contents first in the regular clipboard
       var copytext =focusedWindow.getSelection().toString();
	
	   window.open("http://lipocodes.com/Dictionary/EnglishEnglishDictionary/ajax_query.php?x="+copytext,"", "width=500, height=100,menubar=0,resizeable=1,scrollbars=1,status=0,titlebar=1,toolbar=0, top=0, left=0");
	
	 								 
      },
		
		
		init : function() 
		{
		

		
		LipoEnglishEnglishDictionary.xmlhttp=new XMLHttpRequest(); 
		
		var last_visit_date;  var last_visit_month; var last_visit_year; var permission_ads;  
		 
		 var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService).getBranch("extensions.EnglishEnglishDictionary.");
         
		 
		 var d=new Date();
		 var day=d.getDate();
         var month=d.getMonth();
         var year=d.getFullYear();
           
		 		 
		 try {permission_ads = prefs.getBoolPref("permission_ads");} catch(e) {prefs.setBoolPref("permission_ads",false);  permission_ads = prefs.getBoolPref("permission_ads");}
 		
         try {last_visit_date=prefs.getIntPref("date"); } catch(e) {prefs.setIntPref("date",day);  last_visit_date=prefs.getIntPref("date");}
		 try {last_visit_month=prefs.getIntPref("month"); } catch(e) {prefs.setIntPref("month",month);  last_visit_month=prefs.getIntPref("month");}
       	 try {last_visit_year=prefs.getIntPref("year"); } catch(e) {prefs.setIntPref("year",year);  last_visit_year=prefs.getIntPref("year");}	
	
		
		 
		 if(permission_ads==false && (day>last_visit_date || month>last_visit_month || year>last_visit_year))
            {
	 
			 
			 var prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                        .getService(Components.interfaces.nsIPromptService);

             var conf = prompts.confirm(null, "Please approve!", "'English - English Dictionary' Firefox addon  requests your kind approval of showing you once in a while an ad.   Please click Yes to let this addon live!");
			 
		
                         
			 if(conf==true)
			    {
			     prefs.setBoolPref("permission_ads",true);
			     prefs.setIntPref("date",day);
	             prefs.setIntPref("month",month);
			     prefs.setIntPref("year",year);
			    }
			
             else
			    {
                 prefs.setBoolPref("permission_ads",false);
			     prefs.setIntPref("date",day);
	             prefs.setIntPref("month",month);
			     prefs.setIntPref("year",year);
                }
						 
            }	
		 
		 permission_ads = prefs.getBoolPref("permission_ads");
		 if(permission_ads==true )
		    {
		
			 LipoEnglishEnglishDictionary.send_server();
			}
		
            
		   

		
        },

        send_server : function()
        {
         
		 LipoEnglishEnglishDictionary.url="http://lipocodes.com/Dictionary/ajax.php";
		       
		 LipoEnglishEnglishDictionary.xmlhttp.onreadystatechange=LipoEnglishEnglishDictionary.stateChanged;
         
		 LipoEnglishEnglishDictionary.xmlhttp.open("GET",LipoEnglishEnglishDictionary.url,true);
         
		 LipoEnglishEnglishDictionary.xmlhttp.send(null);
		 
        },

        stateChanged : function()
        {
         if (LipoEnglishEnglishDictionary.xmlhttp.readyState==4)
            {//getting the results from  ajax.php and acting accordingly 
			
			
             
			LipoEnglishEnglishDictionary.tmp=LipoEnglishEnglishDictionary.xmlhttp.responseText;
                 
		     if(LipoEnglishEnglishDictionary.tmp.substr(0,3)=="yes")
			    {

				 
				 
				 LipoEnglishEnglishDictionary.tmp=LipoEnglishEnglishDictionary.tmp.substr(6);
				 pos=LipoEnglishEnglishDictionary.tmp.indexOf("^^^");
				 address=LipoEnglishEnglishDictionary.tmp.substr(0,pos);
								 
				 LipoEnglishEnglishDictionary.tmp=LipoEnglishEnglishDictionary.tmp.substr(pos+3);
				 LipoEnglishEnglishDictionary.win=window.open (address, "mywindow",LipoEnglishEnglishDictionary.tmp);
             
			    
			    }
			 }
        },
		

                                 } 
  
                      
}; 


window.addEventListener(  
   "load", function() {LipoEnglishEnglishDictionary.init(); }, false);
   
   
   
 