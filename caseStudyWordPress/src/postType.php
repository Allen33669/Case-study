<?php

namespace caseStudyWordPress;

add_action( 'init', 'caseStudyWordPress\cSWP_diaryPostType' );

function cSWP_diaryPostType() {

	register_post_type( 'diary', [

		// Post type arguments.
		'public'              => true,
		'publicly_queryable'  => true,
		'show_in_rest'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'exclude_from_search' => false,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_icon'           => 'dashicons-book-alt',
		'hierarchical'        => false,
		'has_archive'         => 'diary',
		'query_var'           => 'diary',
		'map_meta_cap'        => true,

		// The rewrite handles the URL structure.
		'rewrite' => [
			'slug'       => 'diary',
			'with_front' => false,
			'pages'      => true,
			'feeds'      => true,
			'ep_mask'    => EP_PERMALINK,
		],

		// Features the post type supports.
		'supports' => [
			'title',
			'editor',
			'revisions',
			'trackbacks',
			'author',
			'excerpt',
			'page-attributes',
			'thumbnail',
			'custom-fields',
			'post-formats'
		],

		// Text labels.
		'labels'              => [
			'name'                     => 'Diary',
			'singular_name'            => 'Diary',
			'add_new'                  => 'Add New Diary',
			'add_new_item'             => 'Add New Diary',
			'edit_item'                => 'Edit Diary',
			'new_item'                 => 'New Diary',
			'view_item'                => 'View Diary',
			'view_items'               => 'View Diarys',
			'search_items'             => 'Search Diarys',
			'not_found'                => 'No Diary found.',
			'not_found_in_trash'       => 'No Diary found in Trash.',
			'all_items'                => 'All Diarys',
			'archives'                 => 'Diary Archives',
			'attributes'               => 'Diary Attributes',
			'insert_into_item'         => 'Insert into Diary',
			'uploaded_to_this_item'    => 'Uploaded to this Diary',
			'featured_image'           => 'Diary Image',
			'set_featured_image'       => 'Set Diary image',
			'remove_featured_image'    => 'Remove Diary image',
			'use_featured_image'       => 'Use as Diary image',
			'filter_items_list'        => 'Filter Diarys list',
			'items_list_navigation'    => 'Diarys list navigation',
			'items_list'               => 'Diarys list',
			'item_published'           => 'Diary published.',
			'item_published_privately' => 'Diary published privately.',
			'item_reverted_to_draft'   => 'Diary reverted to draft.',
			'item_scheduled'           => 'Diary scheduled.',
			'item_updated'             => 'Diary updated.'
		]
	] );
}

add_filter('pre_get_posts', 'caseStudyWordPress\cSWP_diaryAppearHomePage');

function cSWP_diaryAppearHomePage($query) {
    if (is_home() && $query->is_main_query())
        $query->set('post_type', array('post', 'diary'));
    return $query;
}


?>