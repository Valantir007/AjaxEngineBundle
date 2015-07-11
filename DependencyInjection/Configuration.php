<?php

namespace Valantir\AjaxEngineBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html#cookbook-bundles-extension-config-class}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('ajax_engine');
        $rootNode
            ->children()
                ->arrayNode('flash_messages')
                    ->children()
                        ->scalarNode('type')
                            ->defaultValue('html')
                            ->validate()
                                ->ifNotInArray(array('html', 'header'))
                                ->thenInvalid('The %s type of messages is not supported')
                            ->end()
                        ->end()
                    ->end()
                ->end()
            ->end()
        ;

        return $treeBuilder;
    }
}
