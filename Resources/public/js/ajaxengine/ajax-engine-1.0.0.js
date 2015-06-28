(function($) {
    $.fn.ajaxEngine = function(options) {
        
        var $container = $(this),
            settings = $.extend({ //ustawienia do nadpisania
                ajax: {
                    loader: '/bundles/ajaxengine/image/ajax-loader.gif',
                    backdrop: true
                }
            }, options),
                    
            methods = { //metody publiczne
                destroy: function() {
                    console.log('Ajax-engine destroyed');
                }
            };
        
        settings = $.extend(true, { //ustawienia i dane pluginu
            loaded: false,
            ajax: {
                loaderContainer: ''
            },
            offClass: 'no-engine',
            fleshMessageClass: 'flesh-message'
        }, settings);
        
        //event klikniecia
        function onClick() {
            $('body').on('click', 'a:not(.' + settings.offClass + ')', function(e){
                var $this = $(this);
                
                if($this.parents('.'+settings.offClass).length === 0) {
                    ajax({
                        url: $this.attr('href')
                    });
                    return false;
                }
                
            });
        }
        
        //event submit'u
        function onSubmit(event) {
            $('body').on('submit', 'form:not(.' + settings.offClass + ')', function(e){
                var $this = $(this),
                    action = $this.attr('action'),
                    origin = window.location.origin;
                
                if (typeof action !== typeof undefined && action !== false) {
                    if(action !== '' && action.indexOf(origin) !== 0) {
                        return true;
                    }
                }
                
                ajax({
                    url: $this.attr('action'),
                    data: $this.serialize(),
                    method: $this.attr('method')
                });
                
                return false;
            });
        }
        
        //eventy przeglądarki
        function onHistory() {
            window.onpopstate = function(event) {                
                ajax({
                    url: location.pathname, //po nasłuchu w location.pathname jest aktualny url z historii
                    history: true
                });
                
                return false;
            };
        }
        
        //ajax - data - tablica z parametrami
        function ajax(data){
            data = $.extend(true, {
                url: data.url,
                type: (data.method) ? data.method : 'GET',
                beforeSend: function(){
                    console.log(settings.ajax.loaderContainer);
                    settings.ajax.loaderContainer.removeClass('hide');
                }
            }, data);
            
            
            $.ajax(data)
                .done(function(response){
                    $container.html(response);
                }).always(function(response, status, xhr){
                    
                    settings.ajax.loaderContainer.addClass('hide');
                    
                    //Jeśli nie jest to akcja pochodząca z historii, to wywolujemy pushState
                    if($('html').hasClass('history') && !data.history) {
                        history.pushState('', data.url, data.url);
                    }
                });
        };
        
        //przygotowuje loader na potrzeby ajaxa
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
            //ciało naszego pluginu
            if(methods[options]){   
                //wywołana metoda publiczna
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