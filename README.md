#AjaxEngineBundle
Bundle uses jQuery 1.11.2 and modernizr in version 2.8.3.

Tested on :
 - Chrome 43, 
 - FireFox 38, 
 - Opera 30.0, 
 - Safari 5.1.7, 
 - IE 11

If you want to flash messages will be send to browser as header add below code to your config.yml file.
```
ajax_engine:
    flash_messages:
        type: header #header or html - if header then flash messages are in header "Flash-Messages" in json format
```