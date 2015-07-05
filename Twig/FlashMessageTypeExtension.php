<?php

namespace AjaxEngineBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class adds function to check ajax engine flash message parameter
 *
 * @author Kamil
 */
class FlashMessageTypeExtension extends \Twig_Extension {
    
    protected $container;
    
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }
    
    public function getFunctions() {
        return array(
            new \Twig_SimpleFunction('flashMessageType', array($this, 'flashMessageType')),
        );
    }

    public function flashMessageType() {
        if($this->container->hasParameter('ajax_engine')) {
            $ajaxEngine = $this->container->getParameter('ajax_engine');
            if(isset($ajaxEngine['flash_messages']['type'])) {
                return $ajaxEngine['flash_messages']['type'];
            }
        }
        
        return 'html';
    }

    public function getName() {
        return 'flash_message_type';
    }
}
