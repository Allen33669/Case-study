<?php
/**
 * Plugin Name: Case study WordPress
 * Description: Case study WordPress, diary for location, weather, tasks, daily routines, mood, what happened, and etc.
 * Version:     1.0.0
 * Author:      Case study WordPress
 */



namespace caseStudyWordPress;

//plugin activation, deactivation hooks
register_activation_hook( __FILE__, function() {
    require_once (plugin_dir_path( __FILE__ ) . 'src/Activation.php');
    Activation::activate();
} );

register_deactivation_hook( __FILE__, function() {
    require_once plugin_dir_path( __FILE__ ) . 'src/Deactivation.php';
    Deactivation::deactivate();
} );



require_once plugin_dir_path( __FILE__ ) . 'src/postType.php';
require_once plugin_dir_path( __FILE__ ) . 'src/taxonomies.php';
require_once plugin_dir_path( __FILE__ ) . 'src/blockType.php';
require_once plugin_dir_path( __FILE__ ) . 'src/footer.php';
require_once plugin_dir_path( __FILE__ ) . 'src/setting.php';



?>