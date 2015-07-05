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
        
        //click event
        function onClick() {
            $('body').on('click', 'a:not(.' + settings.offClass + ')', function(e){
                var $this = $(this),
                    href = $this.attr('href'),
                    host = $this.prop('host'),
                    protocol = $this.prop('protocol');
                    
                if(!isCurrentHost(protocol + '//' + host)) {
                    return true;
                }
                
                if($this.parents('.'+settings.offClass).length === 0) {
                    ajax({
                        url: href
                    });
                    return false;
                }
                
            });
        }
        
        //submit event
        function onSubmit(event) {
            $('body').on('submit', 'form:not(.' + settings.offClass + ')', function(e){
                var $this = $(this),
                    action = $this.attr('action');
                
                if(!isCurrentHost(action)) {
                    return true;
                }
                
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
            if (typeof url !== typeof undefined && url !== false) {
                if(url !== '' && url.indexOf(origin) !== 0) {
                    return false;
                }
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
                .done(function(response){
                    $container.html(response);
                }).always(function(response, status, xhr){
                    
                    settings.ajax.loaderContainer.addClass('hide');
                    
                    //if is not from history then pushState
                    if($('html').hasClass('history') && !data.history) {
                        history.pushState('', data.url, data.url);
                    }
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
        
        //odpalana przed zainicjowaniem ajaxa
        function prependInit() {
            buildLoader();
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
                    prependInit();
                    init();
                } else {
                    console.error('No container');
                }
            } else{
                $.error('ajax-engine: no method: '+ options);
            } 
        }); 
    };
})(jQuery);