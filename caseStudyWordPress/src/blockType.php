<?php

namespace caseStudyWordPress;

add_action( 'init', 'caseStudyWordPress\cSWP_diaryRegisterBlock' );
add_action( 'enqueue_block_editor_assets', 'caseStudyWordPress\cSWP_diaryRegisterScript' );

// Register the diary block
function cSWP_diaryRegisterBlock() {
    register_block_type( 'cswp-diary/block1', [] );
}

// Register the script
function cSWP_diaryRegisterScript() {
    wp_register_script(
        'block1',
        plugins_url( 'block1.js', __FILE__ ),
        ['wp-blocks', 'wp-element', 'wp-components']
    );

    wp_enqueue_script( 'block1' );
}



?>