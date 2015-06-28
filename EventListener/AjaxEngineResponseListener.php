<?php

namespace AjaxEngineBundle\EventListener;

use Symfony\Component\HttpKernel\Event\FilterResponseEvent;
use Symfony\Component\HttpKernel\HttpKernel;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Description of ResponseListener
 * @author Kamil
 */
class AjaxEngineResponseListener {
    
    protected $container;
    protected $session;
    
    public function __construct($container, $session) {
        $this->container = $container;
        $this->session = $session;
    }
    
    public function onKernelResponse(FilterResponseEvent $event) {
//        $referer = $event->getRequest()->headers->get('referer');
//        
////        wypluj($this->session->getFlashBag());
//        if($event->isMasterRequest()) {
//            $event->getResponse()->headers->set('Custom-Referer', ($referer) ? $referer : '');
////            $flashMessages = $event->getRequest()->getSession()->getFlashBag()->all();
////            var_dump($event->getRequest()->getSession()->getFlashBag());die;
////            $event->getRequest()->getSession()->getFlashBag()->get('notice', 'Message sent!');
////            $event->getResponse()->headers->set('Flash-Messages', json_encode($flashMessages));
//        }
    }
}
