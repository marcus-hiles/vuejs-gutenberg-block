<?php

add_action( 'enqueue_block_editor_assets', 'marcus_hiles_vuejs_gutenburg_block' );
function marcus_hiles_vuejs_gutenburg_block() {
    
    $dir = dirname( __FILE__ );
    $block_js = '/block.js';
    $style = '/block.css';

    wp_enqueue_script( 'marcus-hiles-blocks/vuejs-block', plugins_url( $block_js, __FILE__ ), array(
        'wp-blocks',
        'wp-i18n',
        'wp-element',
    ), filemtime( "$dir/$block_js" ) );
    wp_enqueue_style( 'marcus-hiles-blocks/vuejs-block', plugins_url( $style, __FILE__ ), array(
        'wp-blocks',
    ), filemtime( "$dir/$style" ) );
}
