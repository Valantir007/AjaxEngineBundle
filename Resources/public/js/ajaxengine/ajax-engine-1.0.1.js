(function($) {
    $.fn.ajaxEngine = function(options) {
        
        var $container = $(this),
            settings = $.extend({ //settings to override
                ajax: {
                    loader: '/bundles/ajaxengine/image/ajax-loader.gif',
                    backdrop: true
                }
            }, options),
                    
            methods = { //public methods
                destroy: function() {
                    $('.engine-on').removeClass('engine-on');
                    console.log('Ajax-engine destroyed');
                }
            };
        
        settings = $.extend(true, { //settings
            loaded: false,
            ajax: {
                loaderContainer: ''
            },
            offClass: 'no-engine',
            fleshMessageClass: 'flesh-message'
        }, settings);
        
        //klikniecie w link
        function onClick() {
            $('body').on('click', 'a.engine-on', function(e){
                var $this = $(this),
                    href = $this.attr('href');
                
                ajax({
                    url: href
                });
                return false;
            });
        }
        
        //wysylanie formularzy
        function onSubmit() {
            $('body').on('submit', 'form.engine-on', function(e){
                var $this = $(this);
                
                ajax({
                    url: $this.attr('action'),
                    data: $this.serialize(),
                    method: $this.attr('method')
                });
                
                return false;
            });
        }
        
        //checks if url is from current host
        function isCurrentHost(url) {
            var origin = window.location.origin;
            if (typeof url !== typeof undefined && url !== false && url !== '' && url.indexOf(origin) !== 0) {
                return false;
            }
            return true;
        }
        
        //eventy przeglądarki
        function onHistory() {
            window.onpopstate = function(event) {                
                ajax({
                    url: location.pathname,
                    history: true
                });
                
                return false;
            };
        }
        
        //main function - sends requests to server
        function ajax(data){
            data = $.extend(true, {
                url: data.url,
                type: (data.method) ? data.method : 'GET',
                beforeSend: function(){
                    settings.ajax.loaderContainer.removeClass('hide');
                }
            }, data);
            
            
            $.ajax(data)
                .done(function(response, status, xhr){
                    $container.trigger('beforeDone', [{'response': response, 'status': status, 'xhr': xhr}]);
                    $container.html(response);
                    $container.trigger('afterDone', [{'response': response, 'status': status, 'xhr': xhr}]);
                }).always(function(response, status, xhr){
                    $container.trigger('beforeAlways', [{'response': response, 'status': status, 'xhr': xhr}]);
                    settings.ajax.loaderContainer.addClass('hide');
                    
                    //if is not from history then pushState
                    if($('html').hasClass('history') && !data.history) {
                        history.pushState('', data.url, data.url);
                    }
                    
                    addEngineClass();
                    $container.trigger('afterAlways', [{'response': response, 'status': status, 'xhr': xhr}]);
                });
        };
        
        //prepares loader
        function buildLoader() {
            var $loader = $('<div><div class="engine-loader-wrapper"><img class="engine-loader" src="' + settings.ajax.loader + '" /></div></div>'),
                loaderBackdrop = (settings.ajax.backdrop) ? 'engine-backdrop' : '';
            
            $loader.addClass(loaderBackdrop + ' hide');
            
            $container.after($loader);
            
            settings.ajax.loaderContainer = $loader;
        }
        
        //call before initialization ajax engine
        function prependInit() {
            buildLoader();
            addEngineClass();
        }

        //adds engine-on class to forms and a tags if action and href attribute are from current host
        function addEngineClass() {
            $container.trigger('beforeAddClass');
            $('form:not(.' + settings.offClass + ')').each(function(index, element){
                var $this = $(element),
                    action = $this.attr('action');
                
                //jesli nie ma rodzica, ktory ma klase wylaczajaca silnik i form posiada aktualny host to dodajemy klase
                if($this.parents('.'+settings.offClass).length === 0) {   
                    if(isCurrentHost(action)) {
                        $this.addClass('engine-on');
                    }
                }
            });
            
            $('a:not(.' + settings.offClass + ')').each(function(index, element){
                var $this = $(element),
                    host = $this.prop('host'),
                    protocol = $this.prop('protocol');
                    
                //jesli nie ma rodzica, ktory ma klase wylaczajaca silnik i link posiada aktualny host to dodajemy klase
                if($this.parents('.'+settings.offClass).length === 0) {    
                    if(isCurrentHost(protocol + '//' + host)) {
                        $this.addClass('engine-on');
                    }
                }
            });
            $container.trigger('afterAddClass');
        }
        
        //inicjuje eventy
        function init() {
            console.log('Ajax-engine has loaded', settings);
            settings.loaded = true;
            onClick();
            onSubmit();
            onHistory();
        }
        
        return this.each(function() {
            //body of plugin
            if(methods[options]){   
                //call public method
                return methods[options].apply( this, arguments );
            } else if (typeof options === 'object' || ! options ){
                if($container.length > 0){
                    if(!settings.loaded) {
                        prependInit();
                        init();
                    }
                } else {
                    console.error('No container');
                }
            } else{
                $.error('ajax-engine: no method: '+ options);
            } 
        }); 
    };
})(jQuery);