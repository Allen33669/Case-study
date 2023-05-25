<?php

namespace caseStudyWordPress;

add_action( 'init', 'caseStudyWordPress\cSWP_diaryTaxonomies' );

function cSWP_diaryTaxonomies() {

	register_taxonomy( 'diary-genre', 'diary', [

		// Taxonomy arguments.
		'public'            => true,
		'show_in_rest'      => true,
		'show_ui'           => true,
		'show_in_nav_menus' => true,
		'show_tagcloud'     => true,
		'show_admin_column' => true,
		'hierarchical'      => true,
		'query_var'         => 'diary-genre',

		// The rewrite handles the URL structure.
		'rewrite' => [
			'slug'         => 'diary-genre',
			'with_front'   => false,
			'hierarchical' => false,
			'ep_mask'      => EP_NONE
		],

		// Text labels.
		'labels'            => [
			'name'                       => 'Diary Genre',
			'singular_name'              => 'Diary Genre',
			'menu_name'                  => 'Diary Genre',
			'name_admin_bar'             => 'Diary Genre',
			'search_items'               => 'Search Diary Genres',
			'popular_items'              => 'Popular Diary Genres',
			'all_items'                  => 'All Diary Genres',
			'edit_item'                  => 'Edit Diary Genre',
			'view_item'                  => 'View Diary Genre',
			'update_item'                => 'Update Diary Genre',
			'add_new_item'               => 'Add New Diary Genre',
			'new_item_name'              => 'New Genre Diary Name',
			'not_found'                  => 'No Diary genres found.',
			'no_terms'                   => 'No Diary genres',
			'items_list_navigation'      => 'Diary Genres list navigation',
			'items_list'                 => 'Diary Genres list',

			// Hierarchical only.
			'select_name'                => 'Select Diary Genre',
			'parent_item'                => 'Parent Diary Genre',
			'parent_item_colon'          => 'Parent Diary Genre:'
		]
	] );
}

?>