#AjaxEngineBundle

##Installation

### Step 1
To install bundle in your project, add below line to your composer.json file:

```
// composer.json
{
    // ...
    "require": {
        // ...
        "valantir/ajaxenginebundle": "dev-master"
    }
}
```
NOTE: Please replace dev-master with the latest stable version, for example 1.0.1.

Then install bundle by running update command:

```
$ php composer.phar update valantir/ajaxenginebundle
```

Now you need to add bundle to your AppKernel.php file:

```
<?php

// in AppKernel::registerBundles()
$bundles = array(
    // ...
    new Valantir\AjaxEngineBundle\AjaxEngineBundle(),
    // ...
);
```

### Step 2 (optional)

If you want to flash messages will be send to browser as header add below code to your config.yml file.
```
ajax_engine:
    flash_messages:
        type: header #header or html - if header then flash messages are in header "Flash-Messages" in json format
```

### Step 3

Now each template files need to extends layout.html.twig file existing in AjaxEngineBundle. Add this line to first line in your file

```
{% extends "AjaxEngineBundle::layout.html.twig" %}
```

All content need to be in content block like this:

```
{% block content %}
    {# your twig code #}
{% endblock content %}
```

## Support

Bundle uses jQuery 1.11.2 and modernizr in version 2.8.3.

Tested on :
 - Chrome 43, 
 - FireFox 38, 
 - Opera 30.0, 
 - Safari 5.1.7, 
 - IE 11

## Events

|Event name|Description|Parameters|
|:-----------|:------------|:----------|
|beforeAddClass | calls before engine add class "engine-on" to links and forms|-|
|afterAddClass | calls after engine add class "engine-on" to links and forms|-|
|beforeDone | calls before ajax done function - before data from request will be added to ajax-container|parameters = [{'response': response, 'status': status, 'xhr': xhr}]|
|afterDone | calls after ajax done function - after data from request will be added to ajax-container|parameters = [{'response': response, 'status': status, 'xhr': xhr}]|
|beforeAlways | calls before ajax always function|parameters = [{'response': response, 'status': status, 'xhr': xhr}]|
|afterAlways | calls after ajax always function|parameters = [{'response': response, 'status': status, 'xhr': xhr}]|
|beforeSend | calls before ajax beforeSend function|parameters = [{'xhr': xhr: 'settings': settings}]|