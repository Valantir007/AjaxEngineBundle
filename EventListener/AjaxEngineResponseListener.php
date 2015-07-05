<?php

namespace AjaxEngineBundle\EventListener;

use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * ResponseListener checks flash_message type parameter
 * if is set 'header' then event listener sets header with flash messages
 * 
 * @author Kamil
 */
class AjaxEngineResponseListener {
    
    protected $container;
    protected $session;
    
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }
    
    public function onKernelResponse(FilterResponseEvent $event) {
        $ajaxEngineConfig = $this->container->getParameter('ajax_engine');
        
        if(isset($ajaxEngineConfig['flash_messages']['type']) && $ajaxEngineConfig['flash_messages']['type'] == 'header' && $event->isMasterRequest()) {
            $flashMessages = $event->getRequest()->getSession()->getFlashBag()->all();
            $event->getResponse()->headers->set('Flash-Messages', json_encode($flashMessages));
        }
    }
}
