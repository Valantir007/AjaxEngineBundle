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
NOTE: Please replace dev-master with the latest stable version, for example 1.0.3.

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

### Step 4

Now you need to add class "ajax-container" to your container, which refers element of your page that will be updated.

## Support

Bundle uses jQuery 1.11.2 and modernizr in version 2.8.3.

Tested on :
 - Chrome 43, 
 - FireFox 38, 
 - Opera 30.0, 
 - Safari 5.1.7, 
 - IE 11